"use client";

import { CheckCircle2, Clock, MessageSquare, Search, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";

const COPY = {
  it: {
    eyebrow: "Preventivo gratuito",
    title: "Richiedi un",
    accent: "preventivo",
    description:
      "Rispondi ad alcune semplici domande e ricevi subito una stima del costo per il tuo intervento. Senza impegno, in pochi minuti.",
    how: "Come funziona",
    stepsLabel: "6 passaggi",
    steps: [
      ["Scegli categoria e servizio", "Seleziona il tipo di lavoro"],
      ["Rispondi ad alcune domande", "Fornisci i dettagli necessari"],
      ["Ricevi il preventivo stimato", "Subito, senza impegno"],
    ],
    start: "Inizia qui",
    heading: "Raccontaci cosa ti serve.",
    intro:
      "Bastano pochi dettagli: prepareremo una stima chiara e ti ricontatteremo senza impegno.",
    why: "Perché sceglierci",
    benefits: [
      "Preventivo gratuito e senza impegno",
      "Risposta in 24 ore lavorative",
      "Professionisti verificati e assicurati",
      "Assistenza via telefono e WhatsApp",
    ],
    faq: "Domande frequenti",
    questions: [
      [
        "Devo pagare per il preventivo?",
        "No, il preventivo è completamente gratuito e senza impegno.",
      ],
      [
        "Quanto tempo ci vuole?",
        "Riceverai una stima immediata. Ti ricontatteremo entro 24 ore per confermare.",
      ],
      [
        "Come posso pagare?",
        "Accettiamo bonifico, carta di credito e contante. La fattura è sempre inclusa.",
      ],
    ],
  },
  en: {
    eyebrow: "Free quote",
    title: "Request a",
    accent: "quote",
    description:
      "Answer a few simple questions and receive an immediate cost estimate for your job. No commitment, in just a few minutes.",
    how: "How it works",
    stepsLabel: "6 steps",
    steps: [
      ["Choose a category and service", "Select the type of work"],
      ["Answer a few questions", "Provide the necessary details"],
      ["Receive an estimated quote", "Immediately, with no obligation"],
    ],
    start: "Start here",
    heading: "Tell us what you need.",
    intro:
      "Just a few details are enough: we will prepare a clear estimate and contact you with no obligation.",
    why: "Why choose us",
    benefits: [
      "Free, no-obligation quote",
      "Response within 24 business hours",
      "Verified and insured professionals",
      "Support by phone and WhatsApp",
    ],
    faq: "Frequently asked questions",
    questions: [
      [
        "Do I have to pay for the quote?",
        "No, the quote is completely free and comes with no obligation.",
      ],
      [
        "How long does it take?",
        "You will receive an immediate estimate. We will contact you within 24 hours to confirm it.",
      ],
      [
        "How can I pay?",
        "We accept bank transfer, credit card and cash. An invoice is always included.",
      ],
    ],
  },
  de: {
    eyebrow: "Kostenloses Angebot",
    title: "Angebot",
    accent: "anfordern",
    description:
      "Beantworten Sie ein paar einfache Fragen und erhalten Sie sofort eine Kostenschätzung für Ihren Auftrag. Unverbindlich und in wenigen Minuten.",
    how: "So funktioniert es",
    stepsLabel: "6 Schritte",
    steps: [
      ["Kategorie und Dienstleistung wählen", "Wählen Sie die Art der Arbeit"],
      ["Einige Fragen beantworten", "Geben Sie die benötigten Details an"],
      ["Kostenschätzung erhalten", "Sofort und unverbindlich"],
    ],
    start: "Hier starten",
    heading: "Sagen Sie uns, was Sie brauchen.",
    intro:
      "Ein paar Details genügen: Wir erstellen eine klare Schätzung und kontaktieren Sie unverbindlich.",
    why: "Warum QUBO",
    benefits: [
      "Kostenloses, unverbindliches Angebot",
      "Antwort innerhalb von 24 Arbeitsstunden",
      "Geprüfte und versicherte Fachkräfte",
      "Support per Telefon und WhatsApp",
    ],
    faq: "Häufige Fragen",
    questions: [
      [
        "Muss ich für das Angebot bezahlen?",
        "Nein, das Angebot ist vollständig kostenlos und unverbindlich.",
      ],
      [
        "Wie lange dauert es?",
        "Sie erhalten sofort eine Schätzung. Zur Bestätigung kontaktieren wir Sie innerhalb von 24 Stunden.",
      ],
      [
        "Wie kann ich bezahlen?",
        "Wir akzeptieren Überweisung, Kreditkarte und Bargeld. Eine Rechnung ist immer enthalten.",
      ],
    ],
  },
} as const;

const STEP_ICONS = [Search, MessageSquare, Sparkles] as const;
const BENEFIT_ICONS = [CheckCircle2, Clock, ShieldCheck, MessageSquare] as const;

export function QuotePageHero() {
  const { locale } = useLocale();
  const content = COPY[locale];

  return (
    <section className="relative isolate overflow-clip bg-background-primary pb-20 pt-30 tablet:pb-24 tablet:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 size-96 rounded-full opacity-[var(--ds-opacity-subtle)] blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--ds-color-orange-soft), transparent 70%)",
        }}
      />
      <Container size="wide">
        <div className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-end laptop:gap-8">
          <div className="col-span-4 tablet:col-span-7 laptop:col-span-7">
            <p className="mb-4 flex items-center gap-2 text-label font-semibold tracking-wide text-accent uppercase">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent shadow-[var(--ds-shadow-accent-glow)]"
              />
              {content.eyebrow}
            </p>
            <h1 className="max-w-reading text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-text-primary tablet:text-5xl laptop:text-6xl">
              {content.title}{" "}
              <span className="bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
                {content.accent}
              </span>
            </h1>
            <p className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </div>
          <div className="col-span-4 tablet:col-span-7 laptop:col-span-5">
            <aside
              className="relative overflow-hidden rounded-2xl border border-white/10 p-8 text-background-primary shadow-lg shadow-black/20 laptop:p-10"
              style={{
                background:
                  "linear-gradient(145deg, var(--ds-color-neutral-900), var(--ds-color-neutral-950))",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full blur-2xl opacity-[var(--ds-opacity-subtle)]"
                style={{
                  background:
                    "radial-gradient(circle, var(--ds-color-orange-glow), transparent 70%)",
                }}
              />
              <p className="relative text-label font-semibold tracking-wide text-accent uppercase">
                {content.how}
                <span className="ml-2 text-background-primary/40">{content.stepsLabel}</span>
              </p>
              <div className="relative mt-6 grid gap-0">
                {content.steps.map(([label, desc], index) => {
                  const Icon = STEP_ICONS[index];
                  return (
                    <div
                      key={label}
                      className="flex items-start gap-3 border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${index < content.steps.length - 1 ? "bg-accent/15 text-accent" : "bg-accent text-on-accent"}`}
                      >
                        <Icon size={16} strokeWidth={2.5} />
                      </span>
                      <div className="pt-0.5">
                        <span className="text-sm font-medium text-background-primary">{label}</span>
                        <p className="text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function QuotePageIntro() {
  const { locale } = useLocale();
  const content = COPY[locale];
  return (
    <div className="mb-8 max-w-reading">
      <p className="text-label font-semibold tracking-wide text-accent uppercase">
        {content.start}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-text-primary tablet:text-3xl">
        {content.heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary tablet:text-base">
        {content.intro}
      </p>
    </div>
  );
}

export function QuotePageAside() {
  const { locale } = useLocale();
  const content = COPY[locale];
  return (
    <aside className="hidden min-w-0 space-y-6 desktop:block">
      <div className="min-w-0 overflow-hidden rounded-xl border border-border-default bg-surface p-6 shadow-xs">
        <h2 className="text-label font-semibold tracking-wide text-accent uppercase">
          {content.why}
        </h2>
        <ul className="mt-5 grid gap-4">
          {content.benefits.map((text, index) => {
            const Icon = BENEFIT_ICONS[index];
            return (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-accent">
                  <Icon size={16} strokeWidth={2.5} />
                </span>
                <span className="min-w-0 break-words text-sm leading-snug text-text-secondary">
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="min-w-0 overflow-hidden rounded-xl border border-border-default bg-surface p-6 shadow-xs">
        <h2 className="text-label font-semibold tracking-wide text-accent uppercase">
          {content.faq}
        </h2>
        <dl className="mt-5 grid min-w-0 gap-4 break-words text-sm">
          {content.questions.map(([question, answer]) => (
            <div key={question}>
              <dt className="font-medium text-text-primary">{question}</dt>
              <dd className="mt-1 leading-relaxed text-text-secondary">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
