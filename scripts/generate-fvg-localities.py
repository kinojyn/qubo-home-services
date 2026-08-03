"""Generate the FVG locality catalogue used by the public quote experience.

Sources:
- ISTAT current Italian municipalities:
  https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.xlsx
- GeoNames Italy gazetteer:
  https://download.geonames.org/export/dump/IT.zip

GeoNames data is licensed under CC BY 4.0.
"""

from __future__ import annotations

import json
import math
import os
import tempfile
import unicodedata
import urllib.request
import zipfile
from pathlib import Path

from openpyxl import load_workbook


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "fvg-localities.json"
ISTAT_URL = (
    "https://www.istat.it/storage/codici-unita-amministrative/"
    "Elenco-comuni-italiani.xlsx"
)
GEONAMES_URL = "https://download.geonames.org/export/dump/IT.zip"
FVG_REGION_CODE = "06"
ORIGIN_LATITUDE = 45.82076
ORIGIN_LONGITUDE = 13.33929
SUPPORTED_FEATURE_CODES = {
    "PPL",
    "PPLA",
    "PPLA2",
    "PPLA3",
    "PPLL",
    "PPLX",
    "PPLCH",
}

MANUAL_DISTANCE = {
    "Cervignano del Friuli": 0,
    "Palmanova": 10,
    "Aquileia": 13,
    "Terzo d'Aquileia": 7,
    "San Giorgio di Nogaro": 16,
    "Latisana": 28,
    "Grado": 28,
    "Monfalcone": 24,
    "Gorizia": 37,
    "Udine": 39,
    "Cividale del Friuli": 49,
    "Trieste": 57,
    "Codroipo": 48,
    "Pordenone": 65,
    "Spilimbergo": 69,
    "San Daniele del Friuli": 61,
    "Gemona del Friuli": 66,
    "Tolmezzo": 84,
    "Tarvisio": 128,
}


def normalize(value: str) -> str:
    return "".join(
        char
        for char in unicodedata.normalize("NFKD", value.casefold())
        if not unicodedata.combining(char)
    ).strip()


def download(url: str, destination: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": "QUBO-locality-generator/1.0"})
    with urllib.request.urlopen(request) as response, destination.open("wb") as output:
        output.write(response.read())


def load_municipalities(path: Path) -> dict[str, dict[str, str]]:
    workbook = load_workbook(path, read_only=True, data_only=True)
    worksheet = workbook.active
    municipalities: dict[str, dict[str, str]] = {}

    for row in worksheet.iter_rows(min_row=2, values_only=True):
        if row[0] != FVG_REGION_CODE:
            continue
        code = str(row[4])
        municipalities[code] = {
            "name": str(row[6] or row[5]),
            "province": str(row[14]),
        }
    workbook.close()
    return municipalities


def haversine_km(latitude: float, longitude: float) -> int:
    radius = 6371
    lat1 = math.radians(ORIGIN_LATITUDE)
    lat2 = math.radians(latitude)
    delta_lat = math.radians(latitude - ORIGIN_LATITUDE)
    delta_lon = math.radians(longitude - ORIGIN_LONGITUDE)
    value = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2) ** 2
    )
    straight_line = radius * 2 * math.atan2(math.sqrt(value), math.sqrt(1 - value))
    return max(0, round(straight_line * 1.18))


def estimate_fee(distance: int) -> int:
    raw_fee = distance * 1.2
    rounded_fee = math.floor(raw_fee / 5 + 0.5) * 5
    return max(10, rounded_fee)


def load_geonames(path: Path, municipalities: dict[str, dict[str, str]]) -> list[dict]:
    columns = [
        "geonameid",
        "name",
        "asciiname",
        "alternatenames",
        "latitude",
        "longitude",
        "feature_class",
        "feature_code",
        "country_code",
        "cc2",
        "admin1_code",
        "admin2_code",
        "admin3_code",
        "admin4_code",
        "population",
        "elevation",
        "dem",
        "timezone",
        "modification_date",
    ]
    selected: dict[tuple[str, str], dict] = {}
    municipality_coordinates: dict[str, tuple[int, int, float, float]] = {}

    with path.open("r", encoding="utf-8") as source:
        for line in source:
            values = line.rstrip("\n").split("\t")
            if len(values) != len(columns):
                continue
            row = dict(zip(columns, values, strict=True))
            municipality_code = row["admin3_code"]
            if (
                row["admin1_code"] != FVG_REGION_CODE
                or row["feature_class"] != "P"
                or row["feature_code"] not in SUPPORTED_FEATURE_CODES
                or municipality_code not in municipalities
            ):
                continue

            latitude = float(row["latitude"])
            longitude = float(row["longitude"])
            municipality = municipalities[municipality_code]
            is_municipality = normalize(row["name"]) == normalize(municipality["name"])
            coordinate_priority = {
                "PPLA3": 4,
                "PPLA2": 3,
                "PPLA": 2,
                "PPL": 1,
            }.get(row["feature_code"], 0)
            coordinate_candidate = (
                coordinate_priority,
                int(row["population"] or 0),
                latitude,
                longitude,
            )
            if coordinate_candidate > municipality_coordinates.get(
                municipality_code, (-1, -1, ORIGIN_LATITUDE, ORIGIN_LONGITUDE)
            ):
                municipality_coordinates[municipality_code] = coordinate_candidate

            distance = haversine_km(latitude, longitude)
            manual_distance = (
                MANUAL_DISTANCE.get(row["name"]) if is_municipality else None
            )
            if manual_distance is not None:
                distance = manual_distance
            fee = estimate_fee(distance)
            aliases = []
            seen_aliases = {normalize(row["name"])}
            for alias in [row["asciiname"], *row["alternatenames"].split(",")]:
                clean_alias = alias.strip()
                normalized_alias = normalize(clean_alias)
                if (
                    not clean_alias
                    or normalized_alias in seen_aliases
                    or len(clean_alias) > 100
                ):
                    continue
                seen_aliases.add(normalized_alias)
                aliases.append(clean_alias)

            item = {
                "id": row["geonameid"],
                "name": row["name"],
                "aliases": aliases[:16],
                "municipality": municipality["name"],
                "municipalityCode": municipality_code,
                "province": municipality["province"],
                "kind": "municipality" if is_municipality else "locality",
                "latitude": round(latitude, 5),
                "longitude": round(longitude, 5),
                "distance": distance,
                "fee": fee,
                "population": int(row["population"] or 0),
            }
            key = (municipality_code, normalize(row["name"]))
            previous = selected.get(key)
            if previous is None or (
                item["kind"] == "municipality",
                item["population"],
            ) > (
                previous["kind"] == "municipality",
                previous["population"],
            ):
                selected[key] = item

    present_municipalities = {
        item["municipalityCode"]
        for item in selected.values()
        if item["kind"] == "municipality"
    }
    for code, municipality in municipalities.items():
        if code in present_municipalities:
            continue
        _, _, latitude, longitude = municipality_coordinates.get(
            code, (-1, -1, ORIGIN_LATITUDE, ORIGIN_LONGITUDE)
        )
        distance = haversine_km(latitude, longitude)
        manual_distance = MANUAL_DISTANCE.get(municipality["name"])
        if manual_distance is not None:
            distance = manual_distance
        fee = estimate_fee(distance)
        selected[(code, normalize(municipality["name"]))] = {
            "id": f"istat-{code}",
            "name": municipality["name"],
            "aliases": [],
            "municipality": municipality["name"],
            "municipalityCode": code,
            "province": municipality["province"],
            "kind": "municipality",
            "latitude": round(latitude, 5),
            "longitude": round(longitude, 5),
            "distance": distance,
            "fee": fee,
            "population": 0,
        }

    return sorted(
        selected.values(),
        key=lambda item: (
            item["kind"] != "municipality",
            normalize(item["name"]),
            normalize(item["municipality"]),
        ),
    )


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="qubo-fvg-") as temp_directory:
        temp = Path(temp_directory)
        istat_path = temp / "municipalities.xlsx"
        geonames_zip = temp / "IT.zip"
        download(ISTAT_URL, istat_path)
        download(GEONAMES_URL, geonames_zip)
        with zipfile.ZipFile(geonames_zip) as archive:
            archive.extract("IT.txt", temp)

        municipalities = load_municipalities(istat_path)
        localities = load_geonames(temp / "IT.txt", municipalities)
        payload = {
            "generatedAt": "2026-07-29",
            "sources": {
                "istat": ISTAT_URL,
                "geonames": GEONAMES_URL,
                "geonamesLicense": "CC BY 4.0",
            },
            "municipalityCount": len(municipalities),
            "localityCount": len(localities),
            "localities": localities,
        }
        OUTPUT.write_text(
            json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )
        print(
            f"Wrote {len(localities)} localities across "
            f"{len(municipalities)} municipalities to {OUTPUT}"
        )


if __name__ == "__main__":
    main()
