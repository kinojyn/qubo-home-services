"use client";

import { Check, MapPin, X } from "lucide-react";
import { useId, useMemo, useState, type ChangeEvent, type KeyboardEvent } from "react";

import { formatFvgLocality, searchFvgLocalities, type FvgLocality } from "@/data/fvgLocalities";

import styles from "./LocalityCombobox.module.css";

type LocalityComboboxProps = {
  clearLabel: string;
  emptyLabel: string;
  id: string;
  localityLabel: string;
  municipalityLabel: string;
  onChange: (locality: FvgLocality | undefined) => void;
  placeholder: string;
  selectedLabel: string;
  value: FvgLocality | undefined;
};

export function LocalityCombobox({
  emptyLabel,
  clearLabel,
  id,
  localityLabel,
  municipalityLabel,
  onChange,
  placeholder,
  selectedLabel,
  value,
}: LocalityComboboxProps) {
  const listboxId = useId();
  const [query, setQuery] = useState(() => (value ? formatFvgLocality(value) : ""));
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const suggestions = useMemo(() => searchFvgLocalities(query, 10), [query]);

  function selectLocality(locality: FvgLocality) {
    onChange(locality);
    setQuery(formatFvgLocality(locality));
    setIsOpen(false);
    setActiveIndex(0);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    onChange(undefined);
    setIsOpen(true);
    setActiveIndex(0);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => Math.min(current + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && isOpen && suggestions[activeIndex]) {
      event.preventDefault();
      selectLocality(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function clearSelection() {
    setQuery("");
    onChange(undefined);
    setIsOpen(true);
    setActiveIndex(0);
  }

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <MapPin aria-hidden="true" className={styles.icon} size={19} />
        <input
          aria-activedescendant={
            isOpen && suggestions[activeIndex]
              ? `${listboxId}-${suggestions[activeIndex].id}`
              : undefined
          }
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          autoComplete="off"
          className={styles.input}
          id={id}
          onBlur={() => setIsOpen(false)}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required
          role="combobox"
          value={query}
        />
        {query && (
          <button
            aria-label={clearLabel}
            className={styles.clear}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearSelection}
            type="button"
          >
            <X aria-hidden="true" size={16} />
          </button>
        )}
      </div>

      <input name="city" type="hidden" value={value ? formatFvgLocality(value) : ""} />
      <input name="localityId" type="hidden" value={value?.id ?? ""} />

      {isOpen && (
        <div className={styles.dropdown}>
          {suggestions.length > 0 ? (
            <ul className={styles.list} id={listboxId} role="listbox">
              {suggestions.map((locality, index) => {
                const isSelected = value?.id === locality.id;
                const context =
                  locality.kind === "municipality"
                    ? `${municipalityLabel} · ${locality.province}`
                    : `${localityLabel} · ${locality.municipality} (${locality.province})`;

                return (
                  <li
                    aria-selected={isSelected}
                    className={[
                      styles.option,
                      index === activeIndex ? styles.optionActive : "",
                      isSelected ? styles.optionSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    id={`${listboxId}-${locality.id}`}
                    key={locality.id}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectLocality(locality);
                    }}
                    role="option"
                  >
                    <span className={styles.pin}>
                      <MapPin aria-hidden="true" size={16} />
                    </span>
                    <span>
                      <span className={styles.name}>{locality.name}</span>
                      <span className={styles.context}>{context}</span>
                    </span>
                    <span className={styles.distance}>{locality.distance} km</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.empty}>{emptyLabel}</p>
          )}
        </div>
      )}

      {value && (
        <p className={styles.selected}>
          <Check aria-hidden="true" size={14} strokeWidth={3} />
          {selectedLabel}: {formatFvgLocality(value)}
        </p>
      )}
    </div>
  );
}
