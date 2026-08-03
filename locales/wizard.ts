import type { Locale } from "@/types/locale";

export interface WizardContent {
  steps: {
    category: string;
    service: string;
    questions: string;
    quote: string;
    details: string;
    confirm: string;
  };
  back: string;
  next: string;
  stepCounter: (current: number, total: number) => string;
  successTitle: string;
  successMessage: string;
  successCta: string;
  categoryPrompt: string;
  servicePrompt: string;
  questionsPrompt: string;
  detailsPrompt: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  privacyText: string;
  privacyLink: string;
  required: string;
  noServiceSelected: string;
  noCategorySelected: string;
  confirmDetails: string;
  confirmSummary: string;
}

export const WIZARD_CONTENT: Record<Locale, WizardContent> = {
  it: {
    steps: {
      category: "Categoria",
      service: "Servizio",
      questions: "Domande",
      quote: "Preventivo",
      details: "Dati",
      confirm: "Conferma",
    },
    back: "Indietro",
    next: "Avanti",
    stepCounter: (current, total) => `Passo ${current} di ${total}`,
    successTitle: "Richiesta Inviata!",
    successMessage:
      "Grazie per averci contattato. Ti riceverai una risposta via email o SMS entro 24 ore.",
    successCta: "Torna alla home",
    categoryPrompt: "Cosa ti serve?",
    servicePrompt: "Quale servizio desideri?",
    questionsPrompt: "Rispondi a queste domande",
    detailsPrompt: "I tuoi dati",
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email",
    emailPlaceholder: "mario.rossi@email.com",
    phoneLabel: "Telefono",
    phonePlaceholder: "+39 333 123 4567",
    addressLabel: "Indirizzo",
    addressPlaceholder: "Via Roma 1, 33100 Udine",
    notesLabel: "Note aggiuntive",
    notesPlaceholder: "Descrivi brevemente il problema o le tue esigenze...",
    privacyText: "Acconsento al trattamento dei dati personali secondo la",
    privacyLink: "Privacy Policy",
    required: "Obbligatorio",
    noServiceSelected: "Seleziona un servizio",
    noCategorySelected: "Seleziona una categoria",
    confirmDetails: "Conferma i tuoi dati",
    confirmSummary: "Riepilogo richiesta",
  },
  en: {
    steps: {
      category: "Category",
      service: "Service",
      questions: "Questions",
      quote: "Quote",
      details: "Details",
      confirm: "Confirm",
    },
    back: "Back",
    next: "Next",
    stepCounter: (current, total) => `Step ${current} of ${total}`,
    successTitle: "Request Submitted!",
    successMessage:
      "Thank you for contacting us. You will receive a response via email or SMS within 24 hours.",
    successCta: "Back to home",
    categoryPrompt: "What do you need?",
    servicePrompt: "Which service would you like?",
    questionsPrompt: "Answer these questions",
    detailsPrompt: "Your details",
    nameLabel: "Full name",
    namePlaceholder: "John Smith",
    emailLabel: "Email",
    emailPlaceholder: "john.smith@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+39 333 123 4567",
    addressLabel: "Address",
    addressPlaceholder: "Via Roma 1, 33100 Udine",
    notesLabel: "Additional notes",
    notesPlaceholder: "Briefly describe the problem or your needs...",
    privacyText: "I consent to the processing of personal data according to the",
    privacyLink: "Privacy Policy",
    required: "Required",
    noServiceSelected: "Select a service",
    noCategorySelected: "Select a category",
    confirmDetails: "Confirm your details",
    confirmSummary: "Request summary",
  },
  de: {
    steps: {
      category: "Kategorie",
      service: "Dienstleistung",
      questions: "Fragen",
      quote: "Angebot",
      details: "Details",
      confirm: "Bestätigen",
    },
    back: "Zurück",
    next: "Weiter",
    stepCounter: (current, total) => `Schritt ${current} von ${total}`,
    successTitle: "Anfrage gesendet!",
    successMessage:
      "Vielen Dank für Ihren Kontakt. Sie erhalten eine Antwort per E-Mail oder SMS innerhalb von 24 Stunden.",
    successCta: "Zurück zur Startseite",
    categoryPrompt: "Was brauchen Sie?",
    servicePrompt: "Welche Dienstleistung möchten Sie?",
    questionsPrompt: "Beantworten Sie diese Fragen",
    detailsPrompt: "Ihre Daten",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "Mario Rossi",
    emailLabel: "E-Mail",
    emailPlaceholder: "mario.rossi@email.com",
    phoneLabel: "Telefon",
    phonePlaceholder: "+39 333 123 4567",
    addressLabel: "Adresse",
    addressPlaceholder: "Via Roma 1, 33100 Udine",
    notesLabel: "Zusätzliche Notizen",
    notesPlaceholder: "Beschreiben Sie kurz das Problem oder Ihre Bedürfnisse...",
    privacyText: "Ich stimme der Verarbeitung personenbezogener Daten gemäß der",
    privacyLink: "Datenschutzrichtlinie",
    required: "Erforderlich",
    noServiceSelected: "Dienstleistung auswählen",
    noCategorySelected: "Kategorie auswählen",
    confirmDetails: "Bestätigen Sie Ihre Daten",
    confirmSummary: "Anfragezusammenfassung",
  },
};
