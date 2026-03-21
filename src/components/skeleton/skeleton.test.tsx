import { render } from "@testing-library/react";

import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("renders the default text skeleton", () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.firstChild;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ display: "block" });
    expect(skeleton).toHaveStyle({ width: "100%" });
    expect(skeleton).toHaveStyle({ height: "1em" });
    expect(skeleton).toHaveStyle({ borderRadius: "4px" });
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a circular skeleton with explicit dimensions", () => {
    const { container } = render(
      <Skeleton variant="circular" width={40} height={40} />,
    );

    const skeleton = container.firstChild;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "40px" });
    expect(skeleton).toHaveStyle({ height: "40px" });
    expect(skeleton).toHaveStyle({ borderRadius: "50%" });
  });

  it("renders a rounded skeleton with custom string dimensions", () => {
    const { container } = render(
      <Skeleton variant="rounded" width="12rem" height="3rem" />,
    );

    const skeleton = container.firstChild;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "12rem" });
    expect(skeleton).toHaveStyle({ height: "3rem" });
    expect(skeleton).toHaveStyle({ borderRadius: "8px" });
  });

  it("disables animation styles when animation is false", () => {
    const { container } = render(<Skeleton animation={false} width={120} />);

    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton.style.animation).toBe("");
  });
});
