export const ESTIMATE_CONTENT = {
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
  demoNotice:
    "Versione dimostrativa: nessun dato viene inviato o salvato finché il backend non sarà collegato.",
  successTitle: "La simulazione è completata.",
  successMessage:
    "Il modulo funziona correttamente. Nessun dato è stato inviato: il collegamento al servizio sarà aggiunto in una fase successiva.",
  newRequestLabel: "Prepara un'altra richiesta",
  errorTitle: "Qualcosa non ha funzionato.",
  errorMessage: "I dati non sono stati inviati. Puoi controllarli e riprovare.",
  retryLabel: "Riprova",
} as const;

export const ESTIMATE_SERVICE_OPTIONS = [
  { label: "Riparazioni elettriche", value: "electrical" },
  { label: "Piccoli interventi idraulici", value: "plumbing" },
  { label: "Montaggio mobili", value: "furniture" },
  { label: "TV e tende", value: "installation" },
  { label: "Porte e serrature", value: "doors" },
  { label: "Pittura e lavori tuttofare", value: "handyman" },
  { label: "Più lavori diversi", value: "multiple" },
] as const;
