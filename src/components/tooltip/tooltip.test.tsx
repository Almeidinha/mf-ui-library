import { fireEvent, render, screen } from "@testing-library/react";

import { Tooltip } from "./index";

describe("Tooltip Tests", () => {
  it("should render the Tooltip", () => {
    render(<Tooltip content="Tooltip Content">Text For Tooltip</Tooltip>);

    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();

    fireEvent.mouseOver(screen.getByText("Text For Tooltip"));

    expect(screen.queryByText("Tooltip Content")).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
