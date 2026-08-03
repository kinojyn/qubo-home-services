import type { Locale } from "@/types/locale";

export interface LegalContent {
  reviewDate: string;
  backLabel: string;
  noticeTitle: string;
  noticeDescription: string;
}

export const LEGAL_CONTENT: Record<Locale, LegalContent> = {
  it: {
    reviewDate: "19 luglio 2026",
    backLabel: "Torna indietro",
    noticeTitle: "Avviso",
    noticeDescription:
      "Il contenuto di questa pagina ha valore informativo e può essere soggetto ad aggiornamenti.",
  },
  en: {
    reviewDate: "19 July 2026",
    backLabel: "Go back",
    noticeTitle: "Notice",
    noticeDescription:
      "The content of this page is for informational purposes and may be subject to updates.",
  },
  de: {
    reviewDate: "19. Juli 2026",
    backLabel: "Zurück",
    noticeTitle: "Hinweis",
    noticeDescription:
      "Der Inhalt dieser Seite dient Informationszwecken und kann Aktualisierungen unterliegen.",
  },
};
