import { Borders, Surface } from "@foundations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { TextArea } from "./index";

function normalizeColor(color: string) {
  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);
  const normalized = getComputedStyle(el).color;
  document.body.removeChild(el);
  return normalized;
}

describe("TextArea Component", () => {
  it("should render TextArea with given Text", () => {
    render(<TextArea value="Bob" />);

    const textArea = screen.getByRole("textbox");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("Bob");
  });
  it("should handle onChange event", async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    render(<TextArea data-testid="text-area" onChange={onChangeMock} />);
    const textArea = screen.getByRole("textbox");

    expect(textArea).toBeInTheDocument();
    await user.type(textArea, "Doug");

    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenLastCalledWith("Doug");
  });
  it("should display a label when provided", () => {
    const labelText = "Ted";
    render(<TextArea label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("associates the label with the textbox", () => {
    render(<TextArea label="Description" />);
    expect(
      screen.getByRole("textbox", { name: "Description" }),
    ).toBeInTheDocument();
  });

  it("should apply invalid styles when invalid prop is true", () => {
    render(<TextArea invalid />);

    const textArea = screen.getByRole("textbox");
    const styles = getComputedStyle(textArea);

    expect(styles.borderTopColor).toBe(
      normalizeColor(Borders.Critical.Default),
    );
    expect(styles.backgroundColor).toBe(
      normalizeColor(Surface.Critical.Muted),
    );
    expect(textArea).toHaveAttribute("aria-invalid", "true");
  });
});
