import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SiteChrome } from "./SiteChrome";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname }));

afterEach(cleanup);

describe("site shell isolation", () => {
  it("excludes the shared chrome only on the advertising page", () => {
    usePathname.mockReturnValue("/pubblicita");
    render(
      <SiteChrome>
        <nav>Existing navigation</nav>
      </SiteChrome>,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it.each(["/", "/contatti", "/contact", "/services", null])(
    "preserves the existing chrome for %s",
    (pathname) => {
      usePathname.mockReturnValue(pathname);
      const { container } = render(
        <SiteChrome>
          <nav>Existing navigation</nav>
        </SiteChrome>,
      );
      expect(container.innerHTML).toBe("<nav>Existing navigation</nav>");
    },
  );
});
