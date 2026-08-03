import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { Skeleton } from "./Skeleton";
import { Spinner } from "./Spinner";

describe("feedback and display primitives", () => {
  it("exposes a loading button state", () => {
    render(
      <Button isLoading loadingLabel="Saving">
        Save
      </Button>,
    );

    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
  });

  it("renders status and decorative primitives", () => {
    const { container } = render(
      <>
        <Badge>Available</Badge>
        <Avatar alt="DS team" initials="DS" />
        <Divider />
        <Spinner label="Loading content" />
        <Skeleton data-testid="skeleton" />
      </>,
    );

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "DS team" })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    expect(screen.getByRole("status")).toHaveTextContent("Loading content");
    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true");
    expect(container).not.toBeEmptyDOMElement();
  });
});
