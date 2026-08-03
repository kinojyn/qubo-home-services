export const IMAGE_UPLOAD_CONFIG = {
  acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFileSizeBytes: 5 * 1024 * 1024,
} as const;

export const IMAGE_UPLOAD_CONTENT = {
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
} as const;
