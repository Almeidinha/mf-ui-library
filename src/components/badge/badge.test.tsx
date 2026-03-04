import { render } from "@testing-library/react";

import { Badge } from "./badge";

describe("Badge", () => {
  it("should render Neutral Badge successfully", () => {
    const { baseElement } = render(<Badge neutral>Neutral</Badge>);
    expect(baseElement).toBeTruthy();
  });

  it("should render Informational Badge successfully", () => {
    const { baseElement } = render(<Badge info>Informational</Badge>);
    expect(baseElement).toBeTruthy();
  });

  it("should render Warning Badge successfully", () => {
    const { baseElement } = render(<Badge warning>Warning</Badge>);
    expect(baseElement).toBeTruthy();
  });

  it("should render Success Badge successfully", () => {
    const { baseElement } = render(<Badge success>Success</Badge>);
    expect(baseElement).toBeTruthy();
  });

  it("should render Critical Badge successfully", () => {
    const { baseElement } = render(<Badge critical>Critical</Badge>);
    expect(baseElement).toBeTruthy();
  });
});
