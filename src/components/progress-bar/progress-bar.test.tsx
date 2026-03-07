import { render, screen } from "@testing-library/react";

import { ProgressBar } from "./index";

describe("ProgressBar", () => {
  it("renders with default (medium) size and progress aria", () => {
    render(<ProgressBar progress={10} aria-label="Progress" />);

    const track = screen.getByRole("progressbar", { name: "Progress" });
    const fill = track.firstElementChild as HTMLElement | null;

    expect(track).toBeInTheDocument();
    expect(track).toHaveStyle("height: 16px");
    expect(track).toHaveAttribute("aria-valuenow", "10");
    expect(track).toHaveAttribute("aria-valuetext", "10%");

    expect(fill).not.toBeNull();
    expect(fill as HTMLElement).toHaveStyle("width: 10%");
  });

  it("renders with large size", () => {
    render(<ProgressBar progress={4} size="large" aria-label="Progress" />);

    const track = screen.getByRole("progressbar", { name: "Progress" });
    expect(track).toBeInTheDocument();
    expect(track).toHaveStyle("height: 32px");
  });

  it("renders with small size", () => {
    render(<ProgressBar progress={4} size="small" aria-label="Progress" />);

    const track = screen.getByRole("progressbar", { name: "Progress" });
    expect(track).toBeInTheDocument();
    expect(track).toHaveStyle("height: 8px");
  });

  it("sets fill width based on clamped progress", () => {
    render(<ProgressBar progress={120} size="large" aria-label="Progress" />);

    const track = screen.getByRole("progressbar", { name: "Progress" });
    const fill = track.firstElementChild as HTMLElement | null;

    expect(track).toHaveAttribute("aria-valuenow", "100");
    expect(track).toHaveAttribute("aria-valuetext", "100%");

    expect(fill).not.toBeNull();
    expect(fill as HTMLElement).toHaveStyle("width: 100%");
  });
});
