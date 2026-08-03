import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import quotesConfig from "@/data/quotes-config.json";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { findFvgLocality } from "@/data/fvgLocalities";

import { ServiceWizard, type QuotesConfig } from "./ServiceWizard";

function renderWizard() {
  return render(
    <LocaleProvider>
      <ServiceWizard initialData={quotesConfig as QuotesConfig} />
    </LocaleProvider>,
  );
}

function renderWizardForLocality(initialLocality: string) {
  return render(
    <LocaleProvider>
      <ServiceWizard initialLocality={initialLocality} initialData={quotesConfig as QuotesConfig} />
    </LocaleProvider>,
  );
}

describe("ServiceWizard", () => {
  it("renders a six-step form that submits through the site API", () => {
    const { container } = renderWizard();

    expect(screen.getByRole("form")).not.toHaveAttribute("action");
    expect(screen.getByRole("form")).toHaveAttribute("novalidate");
    expect(container.querySelectorAll('input[name="wizard_step"]')).toHaveLength(6);
    expect(container.querySelector('input[value="riparazione-rubinetto"]')).toBeInTheDocument();
    expect(container.querySelector("#category-altro")).toHaveAttribute(
      "value",
      "Altro / Richiesta personalizzata",
    );
    expect(container.querySelector("#quote-city")).toBeRequired();
    expect(container.querySelector('button[type="submit"]')).toHaveTextContent(
      "Invia richiesta di preventivo",
    );
  });

  it("shows the selected service and travel cost in the estimate", () => {
    const ruda = findFvgLocality("Ruda");
    if (!ruda) throw new Error("Ruda is missing from the FVG catalogue");
    const { container } = renderWizardForLocality(ruda.id);

    const service = container.querySelector('input[value="riparazione-rubinetto"]');
    if (!(service instanceof HTMLInputElement)) throw new Error("Quote service is missing");

    fireEvent.click(service);

    expect(screen.getByText(/Stima del preventivo:/)).toHaveTextContent("€60");
  });

  it("preselects a valid locality passed from the service areas page", () => {
    const perteole = findFvgLocality("Perteole");
    if (!perteole) throw new Error("Perteole is missing from the FVG catalogue");
    const { container } = renderWizardForLocality(perteole.id);
    const city = container.querySelector("#quote-city");
    if (!(city instanceof HTMLInputElement)) throw new Error("Locality field is missing");

    expect(screen.getByText("Località già selezionata")).toBeInTheDocument();
    expect(screen.getAllByText("Perteole — Ruda", { exact: true }).length).toBeGreaterThan(0);
    expect(city.value).toBe("Perteole — Ruda");
  });

  it("suggests and selects municipalities while the visitor types", () => {
    const { container } = renderWizard();
    const city = container.querySelector("#quote-city");
    if (!(city instanceof HTMLInputElement)) throw new Error("Locality field is missing");

    fireEvent.change(city, { target: { value: "Villesse" } });
    const option = screen.getByText("Villesse", { exact: true }).closest('[role="option"]');
    if (!(option instanceof HTMLElement)) throw new Error("Villesse suggestion is missing");
    fireEvent.mouseDown(option);

    expect(city.value).toBe("Villesse");
    expect(screen.getByText("Località selezionata: Villesse")).toBeInTheDocument();
  });
  it("localizes quote categories and services in English", async () => {
    window.localStorage.setItem("qubo-locale", "en");
    renderWizard();

    expect((await screen.findAllByText("Electrical work"))[0]).toBeInTheDocument();
    expect(screen.getByText("Switch or socket repair")).toBeInTheDocument();
    expect(screen.getByText("Wall painting")).toBeInTheDocument();

    window.localStorage.removeItem("qubo-locale");
  });
});
