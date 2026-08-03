import type { Locale } from "@/types/locale";

export interface ImageUploadContent {
  inputLabel: string;
  dropTitle: string;
  dropActiveTitle: string;
  browseLabel: string;
  requirements: string;
  previewLabel: string;
  replaceLabel: string;
  removeLabel: string;
  loadingLabel: string;
  emptyFileError: string;
  fileTypeError: string;
  fileSizeError: string;
  fileCountError: string;
}

export const IMAGE_UPLOAD_CONTENT: Record<Locale, ImageUploadContent> = {
  it: {
    inputLabel: "Carica un'immagine",
    dropTitle: "Trascina qui un'immagine",
    dropActiveTitle: "Rilascia l'immagine",
    browseLabel: "oppure scegli un file",
    requirements: "JPEG, PNG o WebP. Massimo 5 MB.",
    previewLabel: "Immagine selezionata",
    replaceLabel: "Sostituisci immagine",
    removeLabel: "Rimuovi immagine",
    loadingLabel: "Elaborazione immagine",
    emptyFileError: "L'immagine selezionata è vuota. Scegli un altro file.",
    fileTypeError: "Formato non supportato. Scegli un'immagine JPEG, PNG o WebP.",
    fileSizeError: "L'immagine supera 5 MB. Scegli un file più piccolo.",
    fileCountError: "Carica un'immagine alla volta.",
  },
  en: {
    inputLabel: "Upload an image",
    dropTitle: "Drop an image here",
    dropActiveTitle: "Release the image",
    browseLabel: "or choose a file",
    requirements: "JPEG, PNG or WebP. Max 5 MB.",
    previewLabel: "Selected image",
    replaceLabel: "Replace image",
    removeLabel: "Remove image",
    loadingLabel: "Processing image",
    emptyFileError: "The selected image is empty. Choose another file.",
    fileTypeError: "Unsupported format. Choose a JPEG, PNG or WebP image.",
    fileSizeError: "The image exceeds 5 MB. Choose a smaller file.",
    fileCountError: "Upload one image at a time.",
  },
  de: {
    inputLabel: "Bild hochladen",
    dropTitle: "Bild hier ablegen",
    dropActiveTitle: "Bild loslassen",
    browseLabel: "oder Datei auswählen",
    requirements: "JPEG, PNG oder WebP. Maximal 5 MB.",
    previewLabel: "Ausgewähltes Bild",
    replaceLabel: "Bild ersetzen",
    removeLabel: "Bild entfernen",
    loadingLabel: "Bild wird verarbeitet",
    emptyFileError: "Das ausgewählte Bild ist leer. Wählen Sie eine andere Datei.",
    fileTypeError: "Nicht unterstütztes Format. Wählen Sie ein JPEG-, PNG- oder WebP-Bild.",
    fileSizeError: "Das Bild überschreitet 5 MB. Wählen Sie eine kleinere Datei.",
    fileCountError: "Laden Sie jeweils ein Bild hoch.",
  },
};
