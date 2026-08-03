import type { Locale } from "@/types/locale";

export interface ContactPageContent {
  breadcrumbLabel: string;
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  optionsEyebrow: string;
  optionsTitle: string;
  questionTitle: string;
  questionDescription: string;
  estimateTitle: string;
  estimateDescription: string;
  areaLabel: string;
  areaName: string;
  areaNote: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  formLabel: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  messageHint: string;
  consentLabel: string;
  consentDescription: string;
  submitLabel: string;
  loadingLabel: string;
  demoNotice: string;
  successTitle: string;
  successMessage: string;
  newMessageLabel: string;
  errorTitle: string;
  errorMessage: string;
  retryLabel: string;
}

export interface ContactSubjectOption {
  label: string;
  value: string;
}

export const CONTACT_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "Contatti per lavori di casa in Friuli",
    description:
      "Contatta QUBO per domande su piccoli lavori e riparazioni domestiche in Friuli Venezia Giulia, oppure richiedi un preventivo.",
    path: "/contact",
  },
  en: {
    title: "Contact for home jobs in Friuli",
    description:
      "Contact QUBO for questions about small jobs and household repairs in Friuli Venezia Giulia, or request an estimate.",
    path: "/contact",
  },
  de: {
    title: "Kontakt für Hausarbeiten in Friaul",
    description:
      "Kontaktieren Sie QUBO bei Fragen zu kleinen Arbeiten und Haushaltsreparaturen in Friaul Julisch Venetien oder fordern Sie einen Kostenvoranschlag an.",
    path: "/contact",
  },
};

export const CONTACT_PAGE_CONTENT: Record<Locale, ContactPageContent> = {
  it: {
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
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Contact",
    eyebrow: "Contact",
    title: "Let's talk about what your home needs.",
    description:
      "Have a general question or a small job to organise? Choose the simplest path and tell us what you need.",
    primaryCtaLabel: "Write to us",
    primaryCtaHref: "#contatti",
    secondaryCtaLabel: "Request an estimate",
    secondaryCtaHref: "/#preventivo",
    optionsEyebrow: "Where to start",
    optionsTitle: "Choose the right contact.",
    questionTitle: "Have a question?",
    questionDescription: "Use the contact form below for general information.",
    estimateTitle: "Already have a job in mind?",
    estimateDescription: "The estimate form lets you describe the job in more detail.",
    areaLabel: "Service area",
    areaName: "Friuli Venezia Giulia, Italy",
    areaNote: "Area and availability are always verified before confirmation.",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "Kontakt",
    eyebrow: "Kontakt",
    title: "Sprechen wir darüber, was Ihr Zuhause braucht.",
    description:
      "Haben Sie eine allgemeine Frage oder eine kleine Arbeit zu organisieren? Wählen Sie den einfachsten Weg und erzählen Sie uns, was Sie brauchen.",
    primaryCtaLabel: "Schreiben Sie uns",
    primaryCtaHref: "#contatti",
    secondaryCtaLabel: "Kostenvoranschlag anfordern",
    secondaryCtaHref: "/#preventivo",
    optionsEyebrow: "Wo anfangen",
    optionsTitle: "Wählen Sie den richtigen Kontakt.",
    questionTitle: "Haben Sie eine Frage?",
    questionDescription: "Nutzen Sie das Kontaktformular unten für allgemeine Informationen.",
    estimateTitle: "Haben Sie bereits eine Arbeit im Sinn?",
    estimateDescription:
      "Das Kostenvoranschlagsformular ermöglicht es Ihnen, die Arbeit genauer zu beschreiben.",
    areaLabel: "Servicegebiet",
    areaName: "Friaul Julisch Venetien, Italien",
    areaNote: "Gebiet und Verfügbarkeit werden vor der Bestätigung immer geprüft.",
  },
};

export const CONTACT_CONTENT: Record<Locale, ContactContent> = {
  it: {
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
    demoNotice: "I dati vengono utilizzati esclusivamente per gestire la tua richiesta.",
    successTitle: "Il messaggio è pronto.",
    successMessage: "La richiesta è stata inviata. Ti ricontatteremo al più presto.",
    newMessageLabel: "Prepara un altro messaggio",
    errorTitle: "Qualcosa non ha funzionato.",
    errorMessage:
      "Il messaggio non è stato inviato. I dati inseriti sono ancora qui: puoi riprovare.",
    retryLabel: "Riprova",
  },
  en: {
    eyebrow: "Contact",
    title: "Have a question? Write to us.",
    description:
      "Tell us what you'd like to know. We'll help you understand the most suitable service, in simple words and without obligation.",
    formLabel: "Contact message",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "What should we call you?",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Select a subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your question here.",
    messageHint: "Do not enter unnecessary sensitive information.",
    consentLabel: "I agree to be contacted regarding this message.",
    consentDescription: "The data will be used exclusively to manage the request.",
    submitLabel: "Prepare the message",
    loadingLabel: "Preparing",
    demoNotice: "Your details are used only to handle your request.",
    successTitle: "The message is ready.",
    successMessage: "Your request has been sent. We will get back to you shortly.",
    newMessageLabel: "Prepare another message",
    errorTitle: "Something didn't work.",
    errorMessage:
      "The message was not sent. The data you entered is still here: you can try again.",
    retryLabel: "Try again",
  },
  de: {
    eyebrow: "Kontakt",
    title: "Haben Sie eine Frage? Schreiben Sie uns.",
    description:
      "Erzählen Sie uns, was Sie wissen möchten. Wir helfen Ihnen, den passenden Service zu finden, in einfachen Worten und unverbindlich.",
    formLabel: "Kontaktnachricht",
    fullNameLabel: "Vor- und Nachname",
    fullNamePlaceholder: "Wie sollen wir Sie nennen?",
    emailLabel: "E-Mail",
    emailPlaceholder: "name@example.com",
    subjectLabel: "Betreff",
    subjectPlaceholder: "Wählen Sie einen Betreff",
    messageLabel: "Nachricht",
    messagePlaceholder: "Schreiben Sie hier Ihre Frage.",
    messageHint: "Geben Sie keine unnötigen sensiblen Informationen ein.",
    consentLabel: "Ich bin damit einverstanden, bezüglich dieser Nachricht kontaktiert zu werden.",
    consentDescription: "Die Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet.",
    submitLabel: "Nachricht vorbereiten",
    loadingLabel: "Wird vorbereitet",
    demoNotice: "Deine Angaben werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.",
    successTitle: "Die Nachricht ist bereit.",
    successMessage: "Deine Anfrage wurde gesendet. Wir melden uns schnellstmöglich.",
    newMessageLabel: "Weitere Nachricht vorbereiten",
    errorTitle: "Etwas hat nicht funktioniert.",
    errorMessage:
      "Die Nachricht wurde nicht gesendet. Die eingegebenen Daten sind noch hier: Sie können es erneut versuchen.",
    retryLabel: "Erneut versuchen",
  },
};

export const CONTACT_SUBJECT_OPTIONS: Record<Locale, readonly ContactSubjectOption[]> = {
  it: [
    { label: "Domanda sui servizi", value: "services" },
    { label: "Informazioni su un intervento", value: "job" },
    { label: "Collaborazioni", value: "partnership" },
    { label: "Altro", value: "other" },
  ],
  en: [
    { label: "Question about services", value: "services" },
    { label: "Information about a job", value: "job" },
    { label: "Partnerships", value: "partnership" },
    { label: "Other", value: "other" },
  ],
  de: [
    { label: "Frage zu Dienstleistungen", value: "services" },
    { label: "Informationen zu einer Arbeit", value: "job" },
    { label: "Kooperationen", value: "partnership" },
    { label: "Sonstiges", value: "other" },
  ],
};
