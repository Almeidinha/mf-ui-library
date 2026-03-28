import { render, screen } from "@testing-library/react";
import { FontWeight, LineHeight } from "foundation/typography/constants";

import {
  Body,
  BodyLarge,
  Caption,
  Display,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Label,
} from "./typography";

describe("Typography", () => {
  it("should render Display successfully", () => {
    const { baseElement } = render(<Display>My Text Here</Display>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Heading1 successfully", () => {
    render(<Heading1>My Text Here</Heading1>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Heading2 successfully", () => {
    render(<Heading2>My Text Here</Heading2>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Heading3 successfully", () => {
    render(<Heading3>My Text Here</Heading3>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Heading4 successfully", () => {
    render(<Heading4>My Text Here</Heading4>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render large successfully", () => {
    render(<BodyLarge>My Text Here</BodyLarge>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
    expect(screen.getByText("My Text Here")).toHaveStyle(
      `line-height: ${LineHeight.d}`,
    );
    expect(screen.getByText("My Text Here")).toHaveStyle(
      `font-weight: ${FontWeight.Regular}`,
    );
  });

  it("should render Body successfully", () => {
    render(<Body>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Muted successfully", () => {
    render(<Body muted>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Soft successfully", () => {
    render(<Body soft>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Neutral successfully", () => {
    render(<Body neutral>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Highlight successfully", () => {
    render(<Body highlight>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render White successfully", () => {
    render(<Body onPrimary>My Text Here</Body>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Caption successfully", () => {
    render(<Caption>My Text Here</Caption>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Label successfully", () => {
    render(<Label>My Text Here</Label>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
  });

  it("should render Label Strong successfully", () => {
    render(<Label strong>My Text Here</Label>);

    expect(screen.getByText("My Text Here")).toBeTruthy();
    expect(screen.getByText("My Text Here")).toHaveStyle(
      `line-height: ${LineHeight.b}`,
    );
    expect(screen.getByText("My Text Here")).toHaveStyle(
      `font-weight: ${FontWeight.Medium}`,
    );
  });
});
