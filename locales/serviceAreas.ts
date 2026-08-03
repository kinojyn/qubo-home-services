import type { Locale } from "@/types/locale";

export interface ServiceAreasPageContent {
  breadcrumbLabel: string;
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  heroCtaLabel: string;
  heroCoverageTitle: string;
  heroSteps: readonly [string, string, string];
  gridEyebrow: string;
  gridTitle: string;
  gridDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchHint: string;
  locationsCountLabel: string;
  locationsDirectoryLabel: string;
  locationsDirectoryTitle: string;
  locationsDirectoryDescription: string;
  distanceLabel: string;
  travelFeeLabel: string;
  selectCityLabel: string;
  municipalityTypeLabel: string;
  localityTypeLabel: string;
  dataSourceLabel: string;
  referenceAreasTitle: string;
  nearbyLocationsLabel: string;
  noResultsTitle: string;
  noResultsDescription: string;
  requestCoverageLabel: string;
  cardLinkLabel: string;
  coverageNote: string;
}

export interface ServiceAreaDetailContent {
  breadcrumbLabel: string;
  breadcrumbHomeLabel: string;
  breadcrumbAreasLabel: string;
  heroEyebrow: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  coverageLabel: string;
  coverageRegion: string;
  availabilityNote: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  serviceLinkLabel: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  localEyebrow: string;
  localTitle: string;
  nearbyTitle: string;
  nearbyDescription: string;
  relatedAreasTitle: string;
}

export const SERVICE_AREAS_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "Zone servite in Friuli Venezia Giulia",
    description:
      "Scopri le zone servite da QUBO in Friuli Venezia Giulia e verifica la disponibilità per piccoli lavori, installazioni e riparazioni domestiche.",
    path: "/zone-servite",
  },
  en: {
    title: "Service areas in Friuli Venezia Giulia",
    description:
      "Discover the areas served by QUBO in Friuli Venezia Giulia and check availability for small jobs, installations, and household repairs.",
    path: "/service-areas",
  },
  de: {
    title: "Servicegebiete in Friaul Julisch Venetien",
    description:
      "Entdecken Sie die von QUBO in Friaul Julisch Venetien bedienten Gebiete und prüfen Sie die Verfügbarkeit für kleine Arbeiten, Installationen und Haushaltsreparaturen.",
    path: "/service-areas",
  },
};

export const SERVICE_AREAS_PAGE_CONTENT: Record<Locale, ServiceAreasPageContent> = {
  it: {
    breadcrumbLabel: "Percorso pagina",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Zone servite",
    eyebrow: "Presenza locale",
    title: "Piccoli lavori di casa in Friuli Venezia Giulia, anche nei comuni vicini.",
    description:
      "I nostri punti di riferimento sono Udine, Trieste, Pordenone e Gorizia, con copertura anche in numerose località vicine. Verifichiamo sempre zona, disponibilità e tipo di intervento prima di confermare.",
    heroCtaLabel: "Trova il tuo comune",
    heroCoverageTitle: "Dal comune al preventivo in pochi passaggi",
    heroSteps: ["Cerca la località", "Seleziona il comune", "Continua con i dati già compilati"],
    gridEyebrow: "Dove interveniamo",
    gridTitle: "Cerca il tuo comune, frazione o località.",
    gridDescription:
      "Il catalogo comprende tutti i 215 comuni del Friuli Venezia Giulia e migliaia di piccoli centri abitati. Scrivi il nome per trovare subito la tua zona.",
    searchLabel: "Cerca comune, frazione o località",
    searchPlaceholder: "Es. Ruda, Villesse, Perteole...",
    searchHint:
      "Supplemento calcolato a circa €1,20/km da Cervignano del Friuli, arrotondato ai €5 più vicini, minimo €10. La disponibilità finale viene sempre confermata.",
    locationsCountLabel: "località nel catalogo",
    locationsDirectoryLabel: "Copertura consultabile",
    locationsDirectoryTitle: "Comuni e località disponibili nel preventivo.",
    locationsDirectoryDescription:
      "Mostriamo le località più richieste. Usa la ricerca per trovare qualsiasi comune, frazione o piccolo centro del FVG.",
    distanceLabel: "da Cervignano del Friuli",
    travelFeeLabel: "Supplemento viaggio",
    selectCityLabel: "Scegli questa località",
    municipalityTypeLabel: "Comune",
    localityTypeLabel: "Frazione o località",
    dataSourceLabel: "Dati territoriali: Istat e GeoNames",
    referenceAreasTitle: "Approfondisci le quattro aree di riferimento",
    nearbyLocationsLabel: "Comuni vicini",
    noResultsTitle: "La tua località non compare nell'elenco?",
    noResultsDescription:
      "Inviaci comunque la richiesta: verifichiamo volentieri copertura, tempi e fattibilità.",
    requestCoverageLabel: "Verifica la copertura",
    cardLinkLabel: "Scopri i servizi a",
    coverageNote:
      "Non trovi il tuo comune? Invia comunque la richiesta: verificheremo la copertura prima di confermare l'intervento.",
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Service areas",
    eyebrow: "Local presence",
    title: "Small home jobs across Friuli Venezia Giulia, including nearby municipalities.",
    description:
      "Our reference hubs are Udine, Trieste, Pordenone, and Gorizia, with coverage in many nearby localities. We always confirm the area, availability, and type of job before proceeding.",
    heroCtaLabel: "Find your municipality",
    heroCoverageTitle: "From municipality to quote in just a few steps",
    heroSteps: [
      "Search for your location",
      "Select the municipality",
      "Continue with the details pre-filled",
    ],
    gridEyebrow: "Where we work",
    gridTitle: "Search for your municipality, hamlet, or locality.",
    gridDescription:
      "The catalogue includes all 215 municipalities of Friuli Venezia Giulia and thousands of smaller settlements. Type a name to immediately find your area.",
    searchLabel: "Search municipality, hamlet, or locality",
    searchPlaceholder: "E.g. Ruda, Villesse, Perteole...",
    searchHint:
      "Travel is calculated at approximately €1.20/km from Cervignano del Friuli, rounded to the nearest €5, with a €10 minimum. Final availability is always confirmed.",
    locationsCountLabel: "locations in the catalogue",
    locationsDirectoryLabel: "Searchable coverage",
    locationsDirectoryTitle: "Municipalities and localities available in the quote form.",
    locationsDirectoryDescription:
      "Popular locations are shown below. Use search to find any municipality, hamlet, or small settlement in FVG.",
    distanceLabel: "from Cervignano del Friuli",
    travelFeeLabel: "Travel surcharge",
    selectCityLabel: "Choose this location",
    municipalityTypeLabel: "Municipality",
    localityTypeLabel: "Hamlet or locality",
    dataSourceLabel: "Territorial data: Istat and GeoNames",
    referenceAreasTitle: "Explore the four reference areas",
    nearbyLocationsLabel: "Nearby municipalities",
    noResultsTitle: "Can't find your locality in the list?",
    noResultsDescription:
      "Send us your request anyway: we will gladly check coverage, timing, and feasibility.",
    requestCoverageLabel: "Check coverage",
    cardLinkLabel: "Discover services in",
    coverageNote:
      "Can't find your municipality? Submit your request anyway: we'll check coverage before confirming the job.",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "Servicegebiete",
    eyebrow: "Lokale Präsenz",
    title: "Kleine Hausarbeiten in Friaul Julisch Venetien, auch in nahegelegenen Gemeinden.",
    description:
      "Unsere Referenzstandorte sind Udine, Triest, Pordenone und Görz; wir sind auch in vielen nahegelegenen Orten tätig. Gebiet, Verfügbarkeit und Art der Arbeit bestätigen wir immer vorab.",
    heroCtaLabel: "Gemeinde finden",
    heroCoverageTitle: "In wenigen Schritten von der Gemeinde zum Angebot",
    heroSteps: ["Ort suchen", "Gemeinde auswählen", "Mit vorausgefüllten Angaben fortfahren"],
    gridEyebrow: "Wo wir arbeiten",
    gridTitle: "Suchen Sie Ihre Gemeinde, Ihren Ortsteil oder Wohnort.",
    gridDescription:
      "Der Katalog enthält alle 215 Gemeinden Friaul-Julisch Venetiens und Tausende kleinerer Siedlungen. Geben Sie einen Namen ein, um Ihr Gebiet zu finden.",
    searchLabel: "Gemeinde, Ortsteil oder Wohnort suchen",
    searchPlaceholder: "Z. B. Ruda, Villesse, Perteole...",
    searchHint:
      "Die Anfahrt wird mit ca. 1,20 €/km ab Cervignano del Friuli berechnet, auf die nächsten 5 € gerundet, mindestens 10 €. Die Verfügbarkeit wird vorab bestätigt.",
    locationsCountLabel: "Orte im Katalog",
    locationsDirectoryLabel: "Durchsuchbares Gebiet",
    locationsDirectoryTitle: "Gemeinden und Orte im Angebotsformular.",
    locationsDirectoryDescription:
      "Unten sehen Sie häufig angefragte Orte. Über die Suche finden Sie jede Gemeinde, jeden Ortsteil und jede kleine Siedlung im FVG.",
    distanceLabel: "von Cervignano del Friuli",
    travelFeeLabel: "Fahrtkostenzuschlag",
    selectCityLabel: "Diesen Ort auswählen",
    municipalityTypeLabel: "Gemeinde",
    localityTypeLabel: "Ortsteil oder Wohnort",
    dataSourceLabel: "Gebietsdaten: Istat und GeoNames",
    referenceAreasTitle: "Die vier Referenzgebiete entdecken",
    nearbyLocationsLabel: "Nahegelegene Gemeinden",
    noResultsTitle: "Ihr Ort ist nicht in der Liste?",
    noResultsDescription:
      "Senden Sie uns trotzdem Ihre Anfrage: Wir prüfen gerne Abdeckung, Zeitplan und Machbarkeit.",
    requestCoverageLabel: "Abdeckung prüfen",
    cardLinkLabel: "Entdecken Sie Dienstleistungen in",
    coverageNote:
      "Ihre Gemeinde nicht dabei? Senden Sie trotzdem Ihre Anfrage: Wir prüfen die Abdeckung vor der Bestätigung.",
  },
};

export const SERVICE_AREA_DETAIL_CONTENT: Record<Locale, ServiceAreaDetailContent> = {
  it: {
    breadcrumbLabel: "Percorso pagina",
    breadcrumbHomeLabel: "Home",
    breadcrumbAreasLabel: "Zone servite",
    heroEyebrow: "Servizi per la casa",
    primaryCtaLabel: "Richiedi un preventivo",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Scopri i servizi",
    secondaryCtaHref: "/services",
    coverageLabel: "Area di riferimento",
    coverageRegion: "Friuli Venezia Giulia",
    availabilityNote:
      "Copertura e disponibilità vengono confermate dopo aver valutato località e richiesta.",
    servicesEyebrow: "Servizi disponibili",
    servicesTitle: "Un solo contatto per diversi piccoli lavori.",
    servicesDescription:
      "Seleziona il servizio per vedere ambito, situazioni gestite e informazioni utili prima della richiesta.",
    serviceLinkLabel: "Scopri",
    benefitsEyebrow: "Vantaggi locali",
    benefitsTitle: "Una richiesta organizzata intorno alla tua casa.",
    localEyebrow: "Conoscere la zona",
    localTitle: "Come prepariamo l'intervento.",
    nearbyTitle: "Comuni vicini da indicare nella richiesta",
    nearbyDescription:
      "La presenza di un comune in questo elenco non garantisce disponibilità automatica: verifichiamo sempre zona e tipo di lavoro.",
    relatedAreasTitle: "Altre città servite",
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbAreasLabel: "Service areas",
    heroEyebrow: "Home services",
    primaryCtaLabel: "Request an estimate",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Discover services",
    secondaryCtaHref: "/services",
    coverageLabel: "Reference area",
    coverageRegion: "Friuli Venezia Giulia",
    availabilityNote:
      "Coverage and availability are confirmed after evaluating location and request.",
    servicesEyebrow: "Available services",
    servicesTitle: "One contact for several small jobs.",
    servicesDescription:
      "Select a service to see scope, managed situations, and useful information before requesting.",
    serviceLinkLabel: "Discover",
    benefitsEyebrow: "Local benefits",
    benefitsTitle: "A request organised around your home.",
    localEyebrow: "Getting to know the area",
    localTitle: "How we prepare the job.",
    nearbyTitle: "Nearby municipalities to include in your request",
    nearbyDescription:
      "A municipality being on this list does not guarantee automatic availability: we always verify the area and type of work.",
    relatedAreasTitle: "Other cities served",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbAreasLabel: "Servicegebiete",
    heroEyebrow: "Hausdienstleistungen",
    primaryCtaLabel: "Kostenvoranschlag anfordern",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Dienstleistungen entdecken",
    secondaryCtaHref: "/services",
    coverageLabel: "Referenzgebiet",
    coverageRegion: "Friaul Julisch Venetien",
    availabilityNote:
      "Abdeckung und Verfügbarkeit werden nach Prüfung des Standorts und der Anfrage bestätigt.",
    servicesEyebrow: "Verfügbare Dienstleistungen",
    servicesTitle: "Ein Ansprechpartner für mehrere kleine Arbeiten.",
    servicesDescription:
      "Wählen Sie eine Dienstleistung, um Umfang, betreute Situationen und nützliche Informationen vor der Anfrage zu sehen.",
    serviceLinkLabel: "Entdecken",
    benefitsEyebrow: "Lokale Vorteile",
    benefitsTitle: "Eine Anfrage, organisiert rund um Ihr Zuhause.",
    localEyebrow: "Die Region kennenlernen",
    localTitle: "Wie wir den Einsatz vorbereiten.",
    nearbyTitle: "Nahegelegene Gemeinden für Ihre Anfrage",
    nearbyDescription:
      "Die Auflistung einer Gemeinde garantiert keine automatische Verfügbarkeit: Wir prüfen stets Gebiet und Art der Arbeit.",
    relatedAreasTitle: "Weitere bediente Städte",
  },
};
