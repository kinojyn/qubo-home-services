export const CONTACT_PAGE_METADATA = {
  title: "Contatti per lavori di casa in Friuli",
  description:
    "Contatta QUBO per domande su piccoli lavori e riparazioni domestiche in Friuli Venezia Giulia, oppure richiedi un preventivo.",
  path: "/contact",
} as const;

export const CONTACT_PAGE_CONTENT = {
  breadcrumbLabel: "Percorso pagina",
  breadcrumbHomeLabel: "Home",
  breadcrumbCurrentLabel: "Contatti",
  eyebrow: "Contatti",
  title: "Parliamo di ciò che serve alla tua casa.",
  description:
    "Hai una domanda generale o un piccolo lavoro da organizzare? Scegli il percorso più semplice e raccontaci di cosa hai bisogno.",
  primaryCtaLabel: "Scrivici",
  primaryCtaHref: "#contatti",
  secondaryCtaLabel: "Richiedi un preventivo",
  secondaryCtaHref: "/#preventivo",
  optionsEyebrow: "Da dove iniziare",
  optionsTitle: "Scegli il contatto giusto.",
  questionTitle: "Hai una domanda?",
  questionDescription: "Usa il modulo di contatto qui sotto per informazioni generali.",
  estimateTitle: "Hai già un lavoro in mente?",
  estimateDescription: "Il modulo preventivo ti permette di descrivere meglio l'intervento.",
  areaLabel: "Zona di servizio",
  areaName: "Friuli Venezia Giulia, Italia",
  areaNote: "Zona e disponibilità vengono sempre verificate prima della conferma.",
} as const;

export const CONTACT_CONTENT = {
  eyebrow: "Contatti",
  title: "Hai una domanda? Scrivici.",
  description:
    "Raccontaci cosa vuoi sapere. Ti aiuteremo a capire il servizio più adatto, con parole semplici e senza impegno.",
  formLabel: "Messaggio di contatto",
  fullNameLabel: "Nome e cognome",
  fullNamePlaceholder: "Come possiamo chiamarti?",
  emailLabel: "Email",
  emailPlaceholder: "nome@esempio.it",
  subjectLabel: "Argomento",
  subjectPlaceholder: "Seleziona un argomento",
  messageLabel: "Messaggio",
  messagePlaceholder: "Scrivi qui la tua domanda.",
  messageHint: "Non inserire informazioni sensibili non necessarie.",
  consentLabel: "Accetto di essere ricontattato in merito a questo messaggio.",
  consentDescription: "I dati saranno utilizzati esclusivamente per gestire la richiesta.",
  submitLabel: "Prepara il messaggio",
  loadingLabel: "Preparazione in corso",
  demoNotice:
    "Versione dimostrativa: nessun dato viene inviato o salvato finché il backend non sarà collegato.",
  successTitle: "Il messaggio è pronto.",
  successMessage:
    "La simulazione è completata. Nessun dato è stato inviato: il collegamento al servizio sarà aggiunto in una fase successiva.",
  newMessageLabel: "Prepara un altro messaggio",
  errorTitle: "Qualcosa non ha funzionato.",
  errorMessage:
    "Il messaggio non è stato inviato. I dati inseriti sono ancora qui: puoi riprovare.",
  retryLabel: "Riprova",
} as const;

export const CONTACT_SUBJECT_OPTIONS = [
  { label: "Domanda sui servizi", value: "services" },
  { label: "Informazioni su un intervento", value: "job" },
  { label: "Collaborazioni", value: "partnership" },
  { label: "Altro", value: "other" },
] as const;
