import { render, screen } from "@testing-library/react";
import { Interactive } from "foundation/colors";
import { Padding } from "foundation/spacing/spacing-guidelines";

import { InputField } from "../../input-field";
import { Button } from "../button";
import { ButtonGroup } from "./button-group";

describe("ButtonGroup", () => {
  it("renders buttons and inputs in the same group", () => {
    render(
      <ButtonGroup data-testid="button-group">
        <InputField aria-label="Query" />
        <Button>Search</Button>
      </ButtonGroup>,
    );

    expect(screen.getByTestId("button-group")).toBeInTheDocument();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Query" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("uses a column layout when orientation is vertical", () => {
    render(
      <ButtonGroup data-testid="button-group" orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    expect(screen.getByTestId("button-group")).toHaveStyle(
      "flex-direction: column",
    );
  });

  it("fills the available width when fullWidth is enabled", () => {
    render(
      <ButtonGroup data-testid="button-group" fullWidth>
        <InputField aria-label="Email" />
        <Button primary>Invite</Button>
      </ButtonGroup>,
    );

    expect(screen.getByTestId("button-group")).toHaveStyle("width: 100%");
  });

  it("renders grouped buttons as plain subtle when outlined is enabled", () => {
    render(
      <ButtonGroup outlined>
        <Button primary>Primary action</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole("button", { name: "Primary action" });
    const buttonLabel = screen.getByText("Primary action");

    expect(button).toHaveStyle("background: none");
    expect(buttonLabel).toHaveStyle(`color: ${Interactive.Subtle.Default}`);
  });

  it("applies the shared size to grouped buttons", () => {
    render(
      <ButtonGroup size="large">
        <Button>Back</Button>
        <Button primary>Save</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("button", { name: "Back" })).toHaveStyle(
      `padding: ${Padding.s} ${Padding.l}`,
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveStyle(
      `padding: ${Padding.s} ${Padding.l}`,
    );
  });

  it("preserves an explicit button size over the group size", () => {
    render(
      <ButtonGroup size="large">
        <Button small>Back</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("button", { name: "Back" })).toHaveStyle(
      `padding: ${Padding.xxs} ${Padding.s}`,
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveStyle(
      `padding: ${Padding.s} ${Padding.l}`,
    );
  });
});
