"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.digest) {
      console.error(`Application error reference: ${error.digest}`);
    }
  }, [error.digest]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent uppercase">Errore temporaneo</p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-text-primary">
        Qualcosa non ha funzionato.
      </h1>
      <p className="mt-5 max-w-reading text-text-secondary">
        I tuoi dati non sono stati confermati come inviati. Riprova oppure contattaci
        telefonicamente.
      </p>
      <button
        className="mt-8 min-h-touch-target rounded-xl bg-accent px-6 py-3 font-semibold text-on-accent"
        onClick={reset}
        type="button"
      >
        Riprova
      </button>
    </main>
  );
}
