import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageWrapper } from "@/components/layout/PageWrapper";

import { Container } from "./Container";
import { Grid } from "./Grid";
import { Section } from "./Section";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

describe("layout primitives", () => {
  it("preserves semantic page and section landmarks", () => {
    render(
      <PageWrapper>
        <Section aria-label="Services">
          <Container>
            <Grid>
              <Stack>
                <span>Content</span>
                <Spacer />
              </Stack>
            </Grid>
          </Container>
        </Section>
      </PageWrapper>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
