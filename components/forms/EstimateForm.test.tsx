import { act, fireEvent, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { ESTIMATE_CONTENT } from "@/locales/estimate";
import { renderWithLocale } from "@/tests/test-utils";

import { EstimateForm } from "./EstimateForm";

const CONTENT = ESTIMATE_CONTENT.it;

function completeValidForm() {
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.fullNameLabel }), {
    target: { value: "Mario Rossi" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.phoneLabel }), {
    target: { value: "+39 320 123 4567" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.emailLabel }), {
    target: { value: "mario@example.it" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: CONTENT.serviceLabel }), {
    target: { value: "multiple" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: CONTENT.detailsLabel }), {
    target: { value: "Vorrei sistemare una porta e montare due mensole." },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: CONTENT.consentLabel }));
}

describe("EstimateForm", () => {
  it("shows helpful inline validation for required and invalid fields", async () => {
    renderWithLocale(<EstimateForm />);

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    expect(await screen.findByText("Inserisci il tuo nome e cognome.")).toBeInTheDocument();
    expect(screen.getByText("Inserisci il tuo numero di telefono.")).toBeInTheDocument();
    expect(screen.getByText("Seleziona il tipo di intervento.")).toBeInTheDocument();
    expect(screen.getByText("Descrivi il lavoro con almeno 10 caratteri.")).toBeInTheDocument();
    expect(screen.getByText("Conferma che possiamo ricontattarti.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: CONTENT.fullNameLabel })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("disables submission while loading and shows an honest success state", async () => {
    let resolveSubmission: (() => void) | undefined;
    const submitEstimate = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    renderWithLocale(<EstimateForm submitEstimate={submitEstimate} />);
    completeValidForm();

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    await waitFor(() => expect(submitEstimate).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: /Prepara la richiesta/ })).toBeDisabled();
    expect(screen.getByText(CONTENT.loadingLabel)).toBeInTheDocument();

    await act(async () => resolveSubmission?.());

    expect(await screen.findByText(CONTENT.successTitle)).toBeInTheDocument();
    expect(screen.getByText(CONTENT.successMessage)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("status")).toHaveFocus());
    expect(screen.queryByRole("form", { name: CONTENT.formLabel })).not.toBeInTheDocument();
  });

  it("keeps the entered data and offers a retry after an unexpected failure", async () => {
    const submitEstimate = vi.fn().mockRejectedValue(new Error("Internal failure"));
    renderWithLocale(<EstimateForm submitEstimate={submitEstimate} />);
    completeValidForm();

    fireEvent.submit(screen.getByRole("form", { name: CONTENT.formLabel }));

    const alert = await screen.findByRole("alert");
    expect(within(alert).getByText(CONTENT.errorTitle)).toBeInTheDocument();
    expect(within(alert).getByText(CONTENT.errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: CONTENT.fullNameLabel })).toHaveValue("Mario Rossi");
    expect(screen.getByRole("button", { name: CONTENT.retryLabel })).toBeEnabled();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<EstimateForm />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
