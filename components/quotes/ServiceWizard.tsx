"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, MapPin, Send } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

import { LocalityCombobox } from "@/components/quotes/LocalityCombobox";
import { useLocale } from "@/contexts/LocaleContext";
import { findFvgLocality, formatFvgLocality, type FvgLocality } from "@/data/fvgLocalities";
import { calculatePrice } from "@/lib/quotes/ruleEngine";
import { PRIVACY_POLICY_VERSION } from "@/constants/privacy";
import { localizeQuotesData } from "@/locales/quotes";
import type { QuoteCategory, QuoteService, QuoteSubmission } from "@/types/quotes";

export type QuotesConfig = {
  categories: QuoteCategory[];
  services: QuoteService[];
};

const fieldClass =
  "min-h-12 w-full min-w-0 max-w-full rounded-xl border border-border-default bg-surface px-4 py-3 text-base text-text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10";

const backButtonClass =
  "inline-flex min-h-12 max-w-full cursor-pointer items-center justify-center gap-2 whitespace-normal rounded-full border border-border-strong bg-surface px-4 py-3 text-center font-semibold text-text-primary shadow-xs transition tablet:px-5 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const nextButtonClass =
  "wizard-next inline-flex min-h-12 max-w-full cursor-pointer items-center justify-center gap-2 whitespace-normal rounded-full bg-accent px-5 py-3 text-center font-semibold text-on-accent shadow-md shadow-accent/20 transition tablet:px-7 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const UI = {
  it: {
    form: "Richiesta di preventivo",
    progress: "Avanzamento preventivo",
    goStep: (n: number) => `Vai al passaggio ${n}`,
    step: (n: number) => `Passaggio ${n} di 6`,
    next: "Avanti",
    back: "Indietro",
    review: "Controlla",
    categoryTitle: "Cosa ti serve?",
    categoryText: "Seleziona una categoria.",
    categoryLegend: "Categoria richiesta",
    other: "Altro",
    custom: "Richiesta personalizzata",
    serviceTitle: "Quale servizio desideri?",
    serviceText: "Seleziona il lavoro più vicino alle tue esigenze.",
    from: "da",
    detailsTitle: "Descrivi il lavoro",
    detailsText: "Aggiungi i dettagli utili per preparare una stima precisa.",
    description: "Descrizione",
    descriptionPlaceholder:
      "Spiega cosa bisogna fare, eventuali problemi, misure o informazioni utili...",
    address: "Indirizzo dell'intervento",
    addressPlaceholder: "Via, numero civico",
    locationTitle: "Dove serve l'intervento?",
    locationText:
      "Digita il tuo comune, frazione o località. Il supplemento viaggio parte dall'ufficio di Cervignano del Friuli.",
    city: "Comune, frazione o località",
    cityPlaceholder: "Inizia a scrivere, es. Ruda o Perteole...",
    cityEmpty:
      "Nessuna località trovata. Controlla il nome o contattaci per verificare la copertura.",
    citySelectionError: "Seleziona una località valida dall'elenco dei suggerimenti.",
    clearCity: "Cancella la località",
    municipalityKind: "Comune",
    localityKind: "Frazione o località",
    selectedLocation: "Località selezionata",
    preselectedCity: "Località già selezionata",
    contactsTitle: "I tuoi contatti",
    contactsText: "Ti ricontatteremo per confermare i dettagli del preventivo.",
    name: "Nome e cognome",
    phone: "Telefono",
    confirmTitle: "Tutto pronto",
    confirmText: "Controlla di aver compilato tutti i passaggi e invia la richiesta.",
    estimate: "Stima del preventivo",
    customQuote: "Preventivo personalizzato",
    estimateDetails: (price: number, travel: number) =>
      `Servizio €${price}${travel ? ` + viaggio €${travel}` : ""}. La stima sarà confermata dopo la verifica.`,
    customDetails: "Riceveremo i dettagli per preparare un preventivo su misura.",
    privacy:
      "Accetto l'informativa sulla privacy e autorizzo il trattamento dei dati per essere ricontattato in merito al preventivo.",
    submit: "Invia richiesta di preventivo",
    sending: "Invio in corso...",
    success: "Richiesta inviata correttamente. Ti ricontatteremo presto.",
    requiredError: "Completa tutti i campi obbligatori prima di inviare la richiesta.",
    selectionError: "Seleziona una categoria e un servizio prima di inviare la richiesta.",
    unavailable: "La configurazione di invio non è disponibile.",
    failed: "Invio non riuscito. Riprova.",
    deliveryWarning:
      "La richiesta è stata registrata, ma la notifica email non è partita. Contattaci telefonicamente per conferma.",
    travel: "Supplemento viaggio",
    discountApplied: "Sconto applicato per oltre 100 m²",
  },
  en: {
    form: "Quote request",
    progress: "Quote progress",
    goStep: (n: number) => `Go to step ${n}`,
    step: (n: number) => `Step ${n} of 6`,
    next: "Next",
    back: "Back",
    review: "Review",
    categoryTitle: "What do you need?",
    categoryText: "Select a category.",
    categoryLegend: "Request category",
    other: "Other",
    custom: "Custom request",
    serviceTitle: "Which service do you need?",
    serviceText: "Choose the service that best matches your needs.",
    from: "from",
    detailsTitle: "Describe the job",
    detailsText: "Add useful details so we can prepare an accurate estimate.",
    description: "Description",
    descriptionPlaceholder:
      "Explain what needs to be done, any issues, measurements or useful information...",
    address: "Job address",
    addressPlaceholder: "Street and house number",
    locationTitle: "Where is the job needed?",
    locationText:
      "Type your municipality, hamlet, or locality. The travel surcharge is calculated from our office in Cervignano del Friuli.",
    city: "Municipality, hamlet, or locality",
    cityPlaceholder: "Start typing, e.g. Ruda or Perteole...",
    cityEmpty: "No locality found. Check the name or contact us to confirm coverage.",
    citySelectionError: "Select a valid locality from the suggestions.",
    clearCity: "Clear locality",
    municipalityKind: "Municipality",
    localityKind: "Hamlet or locality",
    selectedLocation: "Selected locality",
    preselectedCity: "Locality already selected",
    contactsTitle: "Your contact details",
    contactsText: "We will contact you to confirm the quote details.",
    name: "Full name",
    phone: "Phone",
    confirmTitle: "All set",
    confirmText: "Check that you have completed every step and send your request.",
    estimate: "Estimated quote",
    customQuote: "Custom quote",
    estimateDetails: (price: number, travel: number) =>
      `Service €${price}${travel ? ` + travel €${travel}` : ""}. The estimate will be confirmed after review.`,
    customDetails: "We will use the details to prepare a tailored quote.",
    privacy:
      "I accept the privacy notice and authorize the processing of my data so I can be contacted about this quote.",
    submit: "Send quote request",
    sending: "Sending...",
    success: "Your request was sent successfully. We will contact you soon.",
    requiredError: "Complete all required fields before sending your request.",
    selectionError: "Select a category and a service before sending your request.",
    unavailable: "The sending configuration is not available.",
    failed: "Unable to send the form right now. Please try again.",
    deliveryWarning:
      "Your request was saved, but the email notification could not be sent. Please call us to confirm.",
    travel: "Travel surcharge",
    discountApplied: "6% discount applied for areas over 100 m²",
  },
  de: {
    form: "Angebotsanfrage",
    progress: "Fortschritt der Angebotsanfrage",
    goStep: (n: number) => `Zu Schritt ${n} gehen`,
    step: (n: number) => `Schritt ${n} von 6`,
    next: "Weiter",
    back: "Zurück",
    review: "Prüfen",
    categoryTitle: "Was brauchen Sie?",
    categoryText: "Wählen Sie eine Kategorie.",
    categoryLegend: "Kategorie der Anfrage",
    other: "Sonstiges",
    custom: "Individuelle Anfrage",
    serviceTitle: "Welche Dienstleistung benötigen Sie?",
    serviceText: "Wählen Sie die Leistung, die am besten zu Ihrem Bedarf passt.",
    from: "ab",
    detailsTitle: "Arbeit beschreiben",
    detailsText:
      "Fügen Sie hilfreiche Details hinzu, damit wir eine genaue Schätzung erstellen können.",
    description: "Beschreibung",
    descriptionPlaceholder:
      "Beschreiben Sie die Arbeit, mögliche Probleme, Maße oder weitere wichtige Informationen...",
    address: "Einsatzadresse",
    addressPlaceholder: "Straße und Hausnummer",
    locationTitle: "Wo wird der Einsatz benötigt?",
    locationText:
      "Geben Sie Ihre Gemeinde, Ihren Ortsteil oder Wohnort ein. Der Fahrtkostenzuschlag wird ab Cervignano del Friuli berechnet.",
    city: "Gemeinde, Ortsteil oder Wohnort",
    cityPlaceholder: "Tippen Sie z. B. Ruda oder Perteole...",
    cityEmpty: "Kein Ort gefunden. Prüfen Sie den Namen oder fragen Sie die Abdeckung bei uns an.",
    citySelectionError: "Wählen Sie einen gültigen Ort aus den Vorschlägen.",
    clearCity: "Ort löschen",
    municipalityKind: "Gemeinde",
    localityKind: "Ortsteil oder Wohnort",
    selectedLocation: "Ausgewählter Ort",
    preselectedCity: "Ort bereits ausgewählt",
    contactsTitle: "Ihre Kontaktdaten",
    contactsText: "Wir kontaktieren Sie, um die Angebotsdetails zu bestätigen.",
    name: "Vollständiger Name",
    phone: "Telefon",
    confirmTitle: "Alles bereit",
    confirmText: "Prüfen Sie alle Schritte und senden Sie Ihre Anfrage.",
    estimate: "Geschätztes Angebot",
    customQuote: "Individuelles Angebot",
    estimateDetails: (price: number, travel: number) =>
      `Leistung €${price}${travel ? ` + Fahrt €${travel}` : ""}. Die Schätzung wird nach der Prüfung bestätigt.`,
    customDetails: "Wir verwenden Ihre Angaben, um ein individuelles Angebot zu erstellen.",
    privacy:
      "Ich akzeptiere die Datenschutzhinweise und ermächtige die Verarbeitung meiner Daten, damit ich zu diesem Angebot kontaktiert werden kann.",
    submit: "Angebotsanfrage senden",
    sending: "Wird gesendet...",
    success: "Ihre Anfrage wurde erfolgreich gesendet. Wir kontaktieren Sie in Kürze.",
    requiredError: "Bitte füllen Sie alle Pflichtfelder aus, bevor Sie die Anfrage senden.",
    selectionError: "Wählen Sie vor dem Senden eine Kategorie und eine Dienstleistung aus.",
    unavailable: "Die Versandkonfiguration ist nicht verfügbar.",
    failed: "Das Formular kann derzeit nicht gesendet werden. Bitte versuchen Sie es erneut.",
    deliveryWarning:
      "Ihre Anfrage wurde gespeichert, aber die E-Mail-Benachrichtigung konnte nicht gesendet werden. Bitte rufen Sie uns zur Bestätigung an.",
    travel: "Fahrtkostenzuschlag",
    discountApplied: "6 % Rabatt für Flächen über 100 m²",
  },
} as const;

export function ServiceWizard({
  initialLocality,
  initialData,
}: {
  initialLocality?: string;
  initialData: QuotesConfig;
}) {
  const { locale } = useLocale();
  const ui = UI[locale];
  const localizedData = useMemo(
    () => localizeQuotesData(initialData, locale),
    [initialData, locale],
  );
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string | number>>({});
  const initialTravel = useMemo(() => findFvgLocality(initialLocality), [initialLocality]);
  const [selectedLocality, setSelectedLocality] = useState<FvgLocality | undefined>(initialTravel);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const categories = localizedData.categories.filter((category) => category.id !== "altro");
  const selectedService = useMemo(
    () => localizedData.services.find((service) => service.id === selectedServiceId),
    [localizedData.services, selectedServiceId],
  );
  const selectedTravel = selectedLocality;
  const estimatedPrice = selectedService
    ? calculatePrice(selectedService.basePrice, selectedService.pricingRules, questionAnswers)
        .total + (selectedTravel?.fee ?? 0)
    : (selectedTravel?.fee ?? 0);
  const currentCalculation = selectedService
    ? calculatePrice(selectedService.basePrice, selectedService.pricingRules, questionAnswers)
    : { total: 0, breakdown: [] };
  const discountAmount = currentCalculation.breakdown
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);
  const serviceBeforeDiscount = currentCalculation.total - discountAmount;
  const categoryVisibilityCss = categories
    .map(
      (category) =>
        `.quote-native-wizard:has(#category-${category.id}:checked) .service-group[data-category="${category.id}"] { display: block; }`,
    )
    .join("\n");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setSubmitError(ui.requiredError);
      return;
    }

    const formData = new FormData(form);
    const categoryName = String(formData.get("Categoria") ?? "");
    const category =
      localizedData.categories.find((item) => item.name === categoryName) ??
      (categoryName === `${ui.other} / ${ui.custom}`
        ? { id: "altro", icon: "", name: categoryName, order: 999 }
        : undefined);
    const customRequest = category?.id === "altro";

    const answers = Object.fromEntries(
      (selectedService?.questions ?? []).map((question) => [
        question.key,
        question.type === "number"
          ? Number(formData.get(question.key) ?? 0)
          : String(formData.get(question.key) ?? ""),
      ]),
    );
    const calculatedService = selectedService
      ? calculatePrice(selectedService.basePrice, selectedService.pricingRules, answers)
      : { total: 0, breakdown: [] };

    if (!category || (!customRequest && !selectedService)) {
      setSubmitError(ui.selectionError);
      return;
    }
    if (!selectedTravel) {
      setSubmitError(ui.citySelectionError);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const submission: QuoteSubmission = {
      id: `Q${Date.now()}`,
      createdAt: Date.now(),
      categoryId: category.id,
      serviceId: selectedService?.id ?? "",
      answers: {
        categoria: categoryName,
        servizio: selectedService?.name ?? "Richiesta personalizzata",
        ...answers,
      },
      calculatedPrice: customRequest ? 0 : calculatedService.total + (selectedTravel?.fee ?? 0),
      priceBreakdown: [
        ...(selectedService
          ? [{ label: selectedService.name, amount: selectedService.basePrice }]
          : []),
        ...calculatedService.breakdown,
        ...(selectedTravel && selectedTravel.fee > 0
          ? [{ label: `${ui.travel} (${selectedTravel.name})`, amount: selectedTravel.fee }]
          : []),
      ],
      localityId: selectedTravel.id,
      travelFee: selectedTravel?.fee ?? 0,
      travelDistanceKm: selectedTravel?.distance ?? null,
      travelOffice: "Cervignano del Friuli",
      customerInfo: {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("Telefono") ?? ""),
        email: String(formData.get("email") ?? ""),
        city: formatFvgLocality(selectedTravel),
        address: String(formData.get("Indirizzo") ?? ""),
        zipCode: "",
        preferredDate: "",
        preferredTime: "",
        notes: String(formData.get("Descrizione del lavoro") ?? ""),
        photoPaths: [],
      },
      customRequest,
      customDescription: customRequest ? String(formData.get("Descrizione del lavoro") ?? "") : "",
      privacyConsent: true,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      consentAt: Date.now(),
      status: "new",
    };

    try {
      const response = await fetch("/api/quotes/submissions", {
        body: JSON.stringify({
          ...submission,
          website: String(formData.get("website") ?? ""),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json().catch(() => null)) as {
        delivered?: boolean;
        error?: string;
        id?: string;
        success?: boolean;
      } | null;
      if (!response.ok) throw new Error(result?.error ?? ui.failed);
      if (result?.delivered === false) {
        setSubmitError(ui.deliveryWarning);
      }
      setSubmitted(true);
      form.reset();
      form.querySelector<HTMLInputElement>('input[name="wizard_step"][value="6"]')?.click();
      setSelectedServiceId("");
      setQuestionAnswers({});
      setSelectedLocality(undefined);
    } catch {
      setSubmitError(ui.failed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={ui.form}
      className="quote-native-wizard w-full min-w-0 max-w-full overflow-hidden p-4 tablet:p-6 desktop:p-8"
    >
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
        <label htmlFor="quote-website">Website</label>
        <input autoComplete="off" id="quote-website" name="website" tabIndex={-1} />
      </div>
      <style>{`
        .quote-native-wizard {
          box-sizing: border-box;
          background: linear-gradient(145deg, rgb(255 255 255 / 96%), rgb(250 248 245 / 92%));
        }
        .quote-native-wizard *,
        .quote-native-wizard *::before,
        .quote-native-wizard *::after {
          box-sizing: border-box;
        }
        .quote-native-wizard .wizard-progress {
          width: 100%;
          min-width: 0;
          background: rgb(255 255 255 / 72%);
          border: 1px solid rgb(214 208 201 / 80%);
          box-shadow: inset 0 1px 0 rgb(255 255 255 / 80%);
        }
        .quote-native-wizard .wizard-panel,
        .quote-native-wizard fieldset {
          width: 100%;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .quote-native-wizard .wizard-panel > header {
          width: 100%;
          max-width: 44rem;
        }
        .quote-native-wizard .choice-card,
        .quote-native-wizard .service-card {
          width: 100%;
          min-width: 0;
          padding: 1rem 1.25rem;
          overflow: hidden;
        }
        .quote-native-wizard .choice-card {
          gap: 1rem;
        }
        .quote-native-wizard .service-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
        }
        .quote-native-wizard .service-copy {
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .quote-native-wizard .service-price {
          justify-self: end;
          white-space: nowrap;
        }
        .quote-native-wizard .wizard-actions {
          display: flex;
          width: 100%;
          min-width: 0;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .quote-native-wizard .wizard-actions.action-end {
          justify-content: flex-end;
        }
        .quote-native-wizard .wizard-next {
          min-width: 7.25rem;
          padding-inline: 1.5rem !important;
        }
        .quote-native-wizard .wizard-next > svg {
          flex: 0 0 auto;
        }
        .quote-native-wizard .wizard-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--color-accent, #c83f0a);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .quote-native-wizard .wizard-kicker::before {
          width: 1.35rem;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
          content: "";
        }
        .quote-native-wizard .wizard-panel { display: none; }
        .quote-native-wizard:has(#quote-step-1:checked) .wizard-panel[data-step="1"],
        .quote-native-wizard:has(#quote-step-2:checked) .wizard-panel[data-step="2"],
        .quote-native-wizard:has(#quote-step-3:checked) .wizard-panel[data-step="3"],
        .quote-native-wizard:has(#quote-step-4:checked) .wizard-panel[data-step="4"],
        .quote-native-wizard:has(#quote-step-5:checked) .wizard-panel[data-step="5"],
        .quote-native-wizard:has(#quote-step-6:checked) .wizard-panel[data-step="6"] {
          display: grid;
        }
        .quote-native-wizard .progress-dot {
          width: 36px;
          min-width: 36px;
          height: 36px;
          border-radius: 999px;
          transition: all 180ms ease;
        }
        .quote-native-wizard .progress-dot:hover {
          border-color: var(--color-accent, #c83f0a);
          color: var(--color-accent, #c83f0a);
        }
        .quote-native-wizard:has(#quote-step-1:checked) .progress-dot[for="quote-step-1"],
        .quote-native-wizard:has(#quote-step-2:checked) .progress-dot[for="quote-step-2"],
        .quote-native-wizard:has(#quote-step-3:checked) .progress-dot[for="quote-step-3"],
        .quote-native-wizard:has(#quote-step-4:checked) .progress-dot[for="quote-step-4"],
        .quote-native-wizard:has(#quote-step-5:checked) .progress-dot[for="quote-step-5"],
        .quote-native-wizard:has(#quote-step-6:checked) .progress-dot[for="quote-step-6"] {
          border-color: var(--color-accent, #c83f0a);
          background: var(--color-accent, #c83f0a);
          color: white;
          box-shadow: 0 8px 24px rgb(200 63 10 / 20%);
          transform: scale(1.08);
        }
        .quote-native-wizard input[type="radio"] + span svg {
          color: var(--color-text-muted, #77706a);
          opacity: 0.55;
          transition: all 180ms ease;
        }
        .quote-native-wizard input[type="radio"]:checked + span svg {
          color: var(--color-accent, #c83f0a);
          opacity: 1;
          transform: scale(1.08);
        }
        .quote-native-wizard .service-group { display: none; }
        ${categoryVisibilityCss}
        .quote-native-wizard .next-custom { display: none; }
        .quote-native-wizard:has(#category-altro:checked) .next-standard { display: none; }
        .quote-native-wizard:has(#category-altro:checked) .next-custom { display: inline-flex; }
        @media (max-width: 30rem) {
          .quote-native-wizard .wizard-progress {
            gap: 0;
            padding: 0.75rem 0.5rem;
          }
          .quote-native-wizard .progress-dot {
            width: 30px;
            min-width: 30px;
            height: 30px;
            font-size: 0.75rem;
          }
          .quote-native-wizard .wizard-progress > div > span {
            min-width: 0.25rem;
            margin-inline: 0.2rem;
          }
          .quote-native-wizard .choice-card,
          .quote-native-wizard .service-card {
            padding: 0.875rem 1rem;
          }
          .quote-native-wizard .service-card {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.75rem;
          }
          .quote-native-wizard .service-price {
            justify-self: start;
          }
          .quote-native-wizard .wizard-actions > label {
            flex: 1 1 auto;
          }
        }
      `}</style>

      {[1, 2, 3, 4, 5, 6].map((step) => (
        <input
          key={step}
          id={`quote-step-${step}`}
          type="radio"
          name="wizard_step"
          value={step}
          defaultChecked={step === 1}
          className="sr-only"
        />
      ))}

      {initialTravel && (
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-accent/25 bg-accent/5 px-4 py-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent shadow-sm shadow-accent/20">
            <MapPin aria-hidden="true" size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-wide text-accent uppercase">
              {ui.preselectedCity}
            </p>
            <p className="mt-0.5 truncate font-heading text-lg font-semibold text-text-primary">
              {formatFvgLocality(initialTravel)}
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-xs tablet:inline-flex">
            +€{initialTravel.fee}
          </span>
        </div>
      )}

      <div
        className="wizard-progress mb-9 grid grid-cols-6 items-center gap-2 rounded-2xl px-3 py-4 tablet:px-5"
        aria-label={ui.progress}
      >
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex items-center">
            <label
              htmlFor={`quote-step-${step}`}
              className="progress-dot flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-default bg-surface text-sm font-semibold text-text-secondary"
              aria-label={ui.goStep(step)}
            >
              {step}
            </label>
            {step < 6 && <span className="mx-2 h-px min-w-2 flex-1 bg-border-default" />}
          </div>
        ))}
      </div>

      <section data-step="1" className="wizard-panel gap-7" aria-labelledby="category-title">
        <header>
          <p className="wizard-kicker">{ui.step(1)}</p>
          <h3
            id="category-title"
            className="mt-2 font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
          >
            {ui.categoryTitle}
          </h3>
          <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.categoryText}</p>
        </header>

        <fieldset className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
          <legend className="sr-only">{ui.categoryLegend}</legend>
          {categories.map((category) => (
            <label key={category.id} className="block cursor-pointer">
              <input
                id={`category-${category.id}`}
                type="radio"
                name="Categoria"
                value={category.name}
                required
                className="peer sr-only"
              />
              <span className="choice-card flex min-h-24 items-center justify-between rounded-xl border border-border-default bg-surface shadow-xs transition hover:border-accent/60 hover:shadow-md peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-accent peer-checked:ring-2 peer-checked:ring-accent/20">
                <span className="min-w-0 break-words font-semibold">{category.name}</span>
                <CheckCircle2 size={20} className="opacity-35 peer-checked:opacity-100" />
              </span>
            </label>
          ))}
          <label className="block cursor-pointer">
            <input
              id="category-altro"
              type="radio"
              name="Categoria"
              value={`${ui.other} / ${ui.custom}`}
              required
              className="peer sr-only"
            />
            <span className="choice-card flex min-h-24 items-center justify-between rounded-xl border border-dashed border-border-strong bg-surface shadow-xs transition hover:border-accent peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-accent peer-checked:ring-2 peer-checked:ring-accent/20">
              <span className="min-w-0 break-words">
                <span className="block font-semibold">{ui.other}</span>
                <span className="mt-1 block text-sm text-text-secondary">{ui.custom}</span>
              </span>
              <CheckCircle2 size={20} className="opacity-35" />
            </span>
          </label>
        </fieldset>

        <div className="wizard-actions action-end border-t border-border-default pt-6">
          <label htmlFor="quote-step-2" className={`${nextButtonClass} next-standard`}>
            {ui.next}
            <ChevronRight size={18} />
          </label>
          <label htmlFor="quote-step-3" className={`${nextButtonClass} next-custom`}>
            {ui.next}
            <ChevronRight size={18} />
          </label>
        </div>
      </section>

      <section data-step="2" className="wizard-panel gap-7" aria-labelledby="service-title">
        <header>
          <p className="wizard-kicker">{ui.step(2)}</p>
          <h3
            id="service-title"
            className="mt-2 font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
          >
            {ui.serviceTitle}
          </h3>
          <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.serviceText}</p>
        </header>

        <div className="grid gap-5">
          {categories.map((category) => {
            const services = localizedData.services.filter(
              (service) => service.categoryId === category.id,
            );

            return (
              <fieldset key={category.id} data-category={category.id} className="service-group">
                <legend className="sr-only">{category.name}</legend>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <label key={service.id} className="block cursor-pointer">
                      <input
                        type="radio"
                        name="serviceId"
                        value={service.id}
                        onChange={() => {
                          setSelectedServiceId(service.id);
                          setQuestionAnswers({});
                        }}
                        className="peer sr-only"
                      />
                      <span className="service-card min-h-20 gap-4 rounded-xl border border-border-default bg-surface shadow-xs transition hover:border-accent/60 hover:shadow-md peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:ring-2 peer-checked:ring-accent/20">
                        <span className="service-copy">
                          <span className="block font-semibold leading-snug text-text-primary">
                            {service.name}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                            {service.description}
                          </span>
                        </span>
                        <span className="service-price shrink-0 rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                          {ui.from} €{service.basePrice}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="wizard-actions border-t border-border-default pt-6">
          <label htmlFor="quote-step-1" className={backButtonClass}>
            <ChevronLeft size={18} />
            {ui.back}
          </label>
          <label htmlFor="quote-step-3" className={nextButtonClass}>
            {ui.next}
            <ChevronRight size={18} />
          </label>
        </div>
      </section>

      <section data-step="3" className="wizard-panel gap-7" aria-labelledby="details-title">
        <header>
          <p className="wizard-kicker">{ui.step(3)}</p>
          <h3
            id="details-title"
            className="mt-2 font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
          >
            {ui.detailsTitle}
          </h3>
          <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.detailsText}</p>
        </header>

        <div className="grid gap-5">
          {selectedService?.questions.map((question) => (
            <div key={question.id}>
              <label
                htmlFor={`quote-${question.key}`}
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                {question.label}
              </label>
              <input
                id={`quote-${question.key}`}
                name={question.key}
                type={question.type === "number" ? "number" : "text"}
                min={question.type === "number" ? 1 : undefined}
                step={question.type === "number" ? 1 : undefined}
                required={question.required}
                onChange={(event) =>
                  setQuestionAnswers((current) => ({
                    ...current,
                    [question.key]:
                      question.type === "number" ? Number(event.target.value) : event.target.value,
                  }))
                }
                className={fieldClass}
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="quote-description"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              {ui.description}
            </label>
            <textarea
              id="quote-description"
              name="Descrizione del lavoro"
              rows={5}
              required
              placeholder={ui.descriptionPlaceholder}
              className={`${fieldClass} resize-y`}
            />
          </div>
          <div>
            <label
              htmlFor="quote-address"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              {ui.address}
            </label>
            <input
              id="quote-address"
              name="Indirizzo"
              type="text"
              required
              autoComplete="street-address"
              placeholder={ui.addressPlaceholder}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="wizard-actions border-t border-border-default pt-6">
          <label htmlFor="quote-step-2" className={backButtonClass}>
            <ChevronLeft size={18} />
            {ui.back}
          </label>
          <label htmlFor="quote-step-4" className={nextButtonClass}>
            {ui.next}
            <ChevronRight size={18} />
          </label>
        </div>
      </section>

      <section data-step="4" className="wizard-panel gap-7" aria-labelledby="location-title">
        <header>
          <p className="wizard-kicker">{ui.step(4)}</p>
          <div className="mt-2 flex items-start gap-3">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <MapPin size={19} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3
                id="location-title"
                className="font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
              >
                {ui.locationTitle}
              </h3>
              <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.locationText}</p>
            </div>
          </div>
        </header>

        <div>
          <label htmlFor="quote-city" className="mb-2 block text-sm font-medium text-text-primary">
            {ui.city}
          </label>
          <LocalityCombobox
            clearLabel={ui.clearCity}
            emptyLabel={ui.cityEmpty}
            id="quote-city"
            localityLabel={ui.localityKind}
            municipalityLabel={ui.municipalityKind}
            onChange={setSelectedLocality}
            placeholder={ui.cityPlaceholder}
            selectedLabel={ui.selectedLocation}
            value={selectedLocality}
          />
        </div>

        <div className="wizard-actions border-t border-border-default pt-6">
          <label htmlFor="quote-step-3" className={backButtonClass}>
            <ChevronLeft size={18} />
            {ui.back}
          </label>
          <label htmlFor="quote-step-5" className={nextButtonClass}>
            {ui.next}
            <ChevronRight size={18} />
          </label>
        </div>
      </section>

      <section data-step="5" className="wizard-panel gap-7" aria-labelledby="contacts-title">
        <header>
          <p className="wizard-kicker">{ui.step(5)}</p>
          <h3
            id="contacts-title"
            className="mt-2 font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
          >
            {ui.contactsTitle}
          </h3>
          <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.contactsText}</p>
        </header>

        <div className="grid gap-5">
          <div className="grid gap-4 tablet:grid-cols-2">
            <div>
              <label
                htmlFor="quote-name"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                {ui.name}
              </label>
              <input
                id="quote-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="quote-phone"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                {ui.phone}
              </label>
              <input
                id="quote-phone"
                name="Telefono"
                type="tel"
                required
                autoComplete="tel"
                className={fieldClass}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="quote-email"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Email
            </label>
            <input
              id="quote-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="wizard-actions border-t border-border-default pt-6">
          <label htmlFor="quote-step-4" className={backButtonClass}>
            <ChevronLeft size={18} />
            {ui.back}
          </label>
          <label htmlFor="quote-step-6" className={nextButtonClass}>
            {ui.review}
            <ChevronRight size={18} />
          </label>
        </div>
      </section>

      <section data-step="6" className="wizard-panel gap-6 pb-2" aria-labelledby="confirm-title">
        <header>
          <p className="wizard-kicker">{ui.step(6)}</p>
          <h3
            id="confirm-title"
            className="mt-2 font-heading text-2xl font-semibold text-text-primary tablet:text-3xl"
          >
            {ui.confirmTitle}
          </h3>
          <p className="mt-2 text-sm text-text-secondary tablet:text-base">{ui.confirmText}</p>
        </header>

        <div className="confirmation-card rounded-3xl border border-accent/20 bg-[linear-gradient(145deg,rgb(255_247_242),rgb(255_252_249))] p-6 shadow-[0_14px_40px_rgb(183_61_8_/_10%)] tablet:p-7">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent shadow-md shadow-accent/20">
              <CheckCircle2 size={23} strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                {ui.estimate}:{" "}
                {selectedService && <span className="sr-only">€{estimatedPrice}</span>}
              </p>
              {selectedService ? (
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {discountAmount < 0 && (
                    <span className="text-lg text-text-muted line-through decoration-2">
                      €{serviceBeforeDiscount}
                    </span>
                  )}
                  <span className="text-3xl font-bold tracking-tight text-text-primary">
                    €{estimatedPrice}
                  </span>
                  {discountAmount < 0 && (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      -6%
                    </span>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-2xl font-bold text-text-primary">{ui.customQuote}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {selectedService
                  ? `${selectedService.name}${selectedTravel?.fee ? ` · ${ui.travel} €${selectedTravel.fee}` : ""}${discountAmount < 0 ? ` · ${ui.discountApplied}` : ""}`
                  : ui.customDetails}
              </p>
            </div>
          </div>
        </div>

        <label className="group/consent flex cursor-pointer items-start gap-3 rounded-2xl border border-border-default bg-background-secondary p-4 shadow-xs transition-colors hover:border-accent/40 hover:bg-accent/[0.03] tablet:p-5">
          <input
            type="checkbox"
            name="Consenso privacy"
            value="Accettato"
            required
            className="peer sr-only"
          />
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border-2 border-border-strong bg-surface text-transparent shadow-xs transition-all peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/15 group-hover/consent:border-accent">
            <CheckCircle2 size={15} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0 break-words text-sm leading-relaxed text-text-secondary">
            {ui.privacy}
          </span>
        </label>

        {submitError && (
          <p
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            {submitError}
          </p>
        )}

        {submitted && (
          <p
            role="status"
            className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-800"
          >
            {ui.success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-14 w-full min-w-0 max-w-full cursor-pointer items-center justify-center gap-3 whitespace-normal rounded-2xl bg-[linear-gradient(135deg,#d84a0b_0%,#b93606_100%)] px-5 py-4 text-center text-base font-bold text-on-accent shadow-[0_12px_26px_rgb(185_54_6_/_22%)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgb(185_54_6_/_30%)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 tablet:px-6"
        >
          <Send size={19} aria-hidden="true" />
          {isSubmitting ? ui.sending : ui.submit}
        </button>

        <div className="wizard-actions border-t border-border-default pt-6">
          <label htmlFor="quote-step-5" className={backButtonClass}>
            <ChevronLeft size={18} />
            {ui.back}
          </label>
        </div>
      </section>
    </form>
  );
}
