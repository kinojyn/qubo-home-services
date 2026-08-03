import type { Locale } from "@/types/locale";

export interface EstimateContent {
  eyebrow: string;
  title: string;
  description: string;
  formLabel: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHint: string;
  emailLabel: string;
  emailPlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  detailsLabel: string;
  detailsPlaceholder: string;
  detailsHint: string;
  consentLabel: string;
  consentDescription: string;
  submitLabel: string;
  loadingLabel: string;
  demoNotice: string;
  successTitle: string;
  successMessage: string;
  newRequestLabel: string;
  errorTitle: string;
  errorMessage: string;
  retryLabel: string;
}

export interface EstimateServiceOption {
  label: string;
  value: string;
}

export const ESTIMATE_CONTENT: Record<Locale, EstimateContent> = {
  it: {
    eyebrow: "Richiedi un preventivo",
    title: "Raccontaci cosa serve.",
    description:
      "Bastano pochi dettagli per preparare la richiesta e capire quali piccoli lavori vuoi organizzare.",
    formLabel: "Dettagli della richiesta di preventivo",
    fullNameLabel: "Nome e cognome",
    fullNamePlaceholder: "Come possiamo chiamarti?",
    phoneLabel: "Numero di telefono",
    phonePlaceholder: "+39 000 000 0000",
    phoneHint: "Inserisci un numero sul quale possiamo ricontattarti.",
    emailLabel: "Email (facoltativa)",
    emailPlaceholder: "nome@esempio.it",
    serviceLabel: "Tipo di intervento",
    servicePlaceholder: "Seleziona un servizio",
    detailsLabel: "Cosa dobbiamo sistemare?",
    detailsPlaceholder: "Descrivi i lavori, le priorità e qualsiasi dettaglio utile.",
    detailsHint: "Non inserire informazioni sensibili non necessarie.",
    consentLabel: "Accetto di essere ricontattato in merito a questa richiesta.",
    consentDescription: "I dati saranno utilizzati esclusivamente per gestire la richiesta.",
    submitLabel: "Prepara la richiesta",
    loadingLabel: "Preparazione in corso",
    demoNotice: "I dati vengono utilizzati esclusivamente per preparare il tuo preventivo.",
    successTitle: "La simulazione è completata.",
    successMessage: "La richiesta di preventivo è stata inviata. Ti ricontatteremo al più presto.",
    newRequestLabel: "Prepara un'altra richiesta",
    errorTitle: "Qualcosa non ha funzionato.",
    errorMessage: "I dati non sono stati inviati. Puoi controllarli e riprovare.",
    retryLabel: "Riprova",
  },
  en: {
    eyebrow: "Request an estimate",
    title: "Tell us what you need.",
    description:
      "Just a few details to prepare the request and understand which small jobs you'd like to organise.",
    formLabel: "Estimate request details",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "What should we call you?",
    phoneLabel: "Phone number",
    phonePlaceholder: "+39 000 000 0000",
    phoneHint: "Enter a number where we can reach you.",
    emailLabel: "Email (optional)",
    emailPlaceholder: "name@example.com",
    serviceLabel: "Type of job",
    servicePlaceholder: "Select a service",
    detailsLabel: "What needs fixing?",
    detailsPlaceholder: "Describe the jobs, priorities, and any useful details.",
    detailsHint: "Do not enter unnecessary sensitive information.",
    consentLabel: "I agree to be contacted regarding this request.",
    consentDescription: "The data will be used exclusively to manage the request.",
    submitLabel: "Prepare the request",
    loadingLabel: "Preparing",
    demoNotice: "Your details are used only to prepare your estimate.",
    successTitle: "The simulation is complete.",
    successMessage: "Your estimate request has been sent. We will get back to you shortly.",
    newRequestLabel: "Prepare another request",
    errorTitle: "Something didn't work.",
    errorMessage: "The data was not sent. You can check it and try again.",
    retryLabel: "Try again",
  },
  de: {
    eyebrow: "Kostenvoranschlag anfordern",
    title: "Erzählen Sie uns, was gebraucht wird.",
    description:
      "Nur wenige Angaben, um die Anfrage vorzubereiten und zu verstehen, welche kleinen Arbeiten Sie organisieren möchten.",
    formLabel: "Details der Kostenvoranschlagsanfrage",
    fullNameLabel: "Vor- und Nachname",
    fullNamePlaceholder: "Wie sollen wir Sie nennen?",
    phoneLabel: "Telefonnummer",
    phonePlaceholder: "+39 000 000 0000",
    phoneHint: "Geben Sie eine Nummer ein, unter der wir Sie erreichen können.",
    emailLabel: "E-Mail (optional)",
    emailPlaceholder: "name@example.com",
    serviceLabel: "Art der Arbeit",
    servicePlaceholder: "Wählen Sie einen Service",
    detailsLabel: "Was muss erledigt werden?",
    detailsPlaceholder: "Beschreiben Sie die Arbeiten, Prioritäten und alle nützlichen Details.",
    detailsHint: "Geben Sie keine unnötigen sensiblen Informationen ein.",
    consentLabel: "Ich bin damit einverstanden, bezüglich dieser Anfrage kontaktiert zu werden.",
    consentDescription: "Die Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet.",
    submitLabel: "Anfrage vorbereiten",
    loadingLabel: "Wird vorbereitet",
    demoNotice:
      "Deine Angaben werden ausschließlich zur Erstellung deines Kostenvoranschlags verwendet.",
    successTitle: "Die Simulation ist abgeschlossen.",
    successMessage: "Deine Anfrage wurde gesendet. Wir melden uns schnellstmöglich.",
    newRequestLabel: "Weitere Anfrage vorbereiten",
    errorTitle: "Etwas hat nicht funktioniert.",
    errorMessage:
      "Die Daten wurden nicht gesendet. Sie können sie überprüfen und erneut versuchen.",
    retryLabel: "Erneut versuchen",
  },
};

export const ESTIMATE_SERVICE_OPTIONS: Record<Locale, readonly EstimateServiceOption[]> = {
  it: [
    { label: "Riparazioni elettriche", value: "electrical" },
    { label: "Piccoli interventi idraulici", value: "plumbing" },
    { label: "Montaggio mobili", value: "furniture" },
    { label: "TV e tende", value: "installation" },
    { label: "Porte e serrature", value: "doors" },
    { label: "Pittura e lavori tuttofare", value: "handyman" },
    { label: "Più lavori diversi", value: "multiple" },
  ],
  en: [
    { label: "Electrical repairs", value: "electrical" },
    { label: "Small plumbing jobs", value: "plumbing" },
    { label: "Furniture assembly", value: "furniture" },
    { label: "TV and blinds", value: "installation" },
    { label: "Doors and locks", value: "doors" },
    { label: "Painting and handyman", value: "handyman" },
    { label: "Multiple different jobs", value: "multiple" },
  ],
  de: [
    { label: "Elektroreparaturen", value: "electrical" },
    { label: "Kleine Sanitärarbeiten", value: "plumbing" },
    { label: "Möbelmontage", value: "furniture" },
    { label: "TV und Vorhänge", value: "installation" },
    { label: "Türen und Schlösser", value: "doors" },
    { label: "Malerei und Handwerksarbeiten", value: "handyman" },
    { label: "Mehrere verschiedene Arbeiten", value: "multiple" },
  ],
};
