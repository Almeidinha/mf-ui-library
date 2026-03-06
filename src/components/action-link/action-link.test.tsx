import { Interactive } from "@foundations";
import { render, screen } from "@testing-library/react";

import { ActionLink } from ".";

describe("ActionLink", () => {
  it("should render the component ActionLink with default color", () => {
    render(
      <ActionLink aria-label="red" href="https://app.edvisor.io/">
        Click Me
      </ActionLink>,
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveStyle(
      `color: ${Interactive.Default.Default}`,
    );
  });
  it("should render the component Link with subtle color", () => {
    render(
      <ActionLink href="https://app.edvisor.io/" subtle>
        Click Me
      </ActionLink>,
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveStyle(
      `color: ${Interactive.Subtle.Default}`,
    );
  });
  it("should render the component Link with disabled color even if it has default or subtle attributes color", () => {
    render(
      <ActionLink subtle disabled href="https://app.edvisor.io/">
        Click Me
      </ActionLink>,
    );

    const anchor = screen.getByText("Click Me");
    expect(anchor).toBeInTheDocument();
    expect(anchor.tagName).toBe("A");

    // Disabled ActionLink removes `href`, so it is no longer an accessible "link".
    expect(anchor).not.toHaveAttribute("href");
    expect(anchor).toHaveAttribute("aria-disabled", "true");
    expect(anchor).toHaveAttribute("tabindex", "-1");
    expect(anchor).toHaveStyle(`color: ${Interactive.Default.Disabled}`);
  });
});
