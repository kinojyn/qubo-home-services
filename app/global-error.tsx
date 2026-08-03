"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="it">
      <body>
        <main
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h1>Il sito è temporaneamente indisponibile.</h1>
          <p>Riprova tra qualche istante. Nessun invio è stato confermato.</p>
          <button onClick={reset} style={{ marginTop: 16, padding: "12px 24px" }} type="button">
            Riprova
          </button>
        </main>
      </body>
    </html>
  );
}
