import { act, fireEvent, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { CONTACT_CONTENT } from "@/locales/contact";
import { renderWithLocale } from "@/tests/test-utils";

import { ContactForm } from "./ContactForm";

const CONTENT = CONTACT_CONTENT.it;

function completeValidForm() {
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.fullNameLabel }), {
    target: { value: "Mario Rossi" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.emailLabel }), {
    target: { value: "mario@example.it" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: CONTENT.subjectLabel }), {
    target: { value: "services" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.messageLabel }), {
    target: { value: "Vorrei sapere quali zone servite." },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: CONTENT.consentLabel }));
}

describe("ContactForm", () => {
  it("shows helpful inline validation and focuses the first invalid field", async () => {
    renderWithLocale(<ContactForm />);

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    const fullName = screen.getByRole("textbox", { name: CONTENT.fullNameLabel });
    expect(await screen.findByText("Inserisci il tuo nome e cognome.")).toBeInTheDocument();
    expect(screen.getByText("Inserisci il tuo indirizzo email.")).toBeInTheDocument();
    expect(screen.getByText("Seleziona l'argomento del messaggio.")).toBeInTheDocument();
    expect(screen.getByText("Scrivi un messaggio di almeno 10 caratteri.")).toBeInTheDocument();
    expect(screen.getByText("Conferma che possiamo ricontattarti.")).toBeInTheDocument();
    expect(fullName).toHaveAttribute("aria-invalid", "true");
    await waitFor(() => expect(fullName).toHaveFocus());
  });

  it("disables submission while loading and shows an honest success state", async () => {
    let resolveSubmission: (() => void) | undefined;
    const submitContact = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    renderWithLocale(<ContactForm submitContact={submitContact} />);
    completeValidForm();

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    await waitFor(() => expect(submitContact).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: /Prepara il messaggio/ })).toBeDisabled();
    expect(screen.getByText(CONTENT.loadingLabel)).toBeInTheDocument();

    await act(async () => resolveSubmission?.());

    expect(await screen.findByText(CONTENT.successTitle)).toBeInTheDocument();
    expect(screen.getByText(CONTENT.successMessage)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("status")).toHaveFocus());
  });

  it("keeps the entered data and offers a retry after an unexpected failure", async () => {
    const submitContact = vi.fn().mockRejectedValue(new Error("Internal failure"));
    renderWithLocale(<ContactForm submitContact={submitContact} />);
    completeValidForm();

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    const alert = await screen.findByRole("alert");
    expect(within(alert).getByText(CONTENT.errorTitle)).toBeInTheDocument();
    expect(within(alert).getByText(CONTENT.errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: CONTENT.fullNameLabel })).toHaveValue("Mario Rossi");
    expect(screen.getByRole("button", { name: CONTENT.retryLabel })).toBeEnabled();
    await waitFor(() => expect(alert).toHaveFocus());
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<ContactForm />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
