import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Accordion } from "./Accordion";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { Select } from "./Select";
import { Tabs } from "./Tabs";
import { Textarea } from "./Textarea";

describe("component accessibility", () => {
  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <main>
        <Button>Continue</Button>
        <Badge>Available</Badge>
        <Input hint="Enter your full name." label="Name" />
        <Textarea label="Details" />
        <Select label="Service" options={[{ label: "Electrical", value: "electrical" }]} />
        <Checkbox label="I agree" />
        <Accordion items={[{ content: "Answer", id: "question", title: "Question" }]} />
        <Tabs
          items={[{ content: "Panel content", id: "tab", label: "Tab" }]}
          label="Example tabs"
        />
      </main>,
    );

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });

  it("announces inline validation errors", () => {
    render(
      <>
        <Input error="Enter a name" label="Name" />
        <Textarea error="Enter details" label="Details" />
        <Select
          error="Choose a service"
          label="Service"
          options={[{ label: "Electrical", value: "electrical" }]}
        />
        <Checkbox error="Consent is required" label="I agree" />
      </>,
    );

    expect(screen.getAllByRole("alert")).toHaveLength(4);
  });
});
