import { Margin } from "@foundations";
import { render, screen } from "@testing-library/react";
import styled from "styled-components";

import { LeftRightCard } from "./left-right-card";

describe("LeftRightCard", () => {
  it("renders the content in the Right slot", () => {
    render(
      <LeftRightCard>
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render other children", () => {
    render(
      <LeftRightCard>
        <div>Other Children</div>
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.queryByText("Other Children")).not.toBeInTheDocument();
  });

  it("renders a region labelled by the given heading", () => {
    render(
      <LeftRightCard heading="Heading">
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getByLabelText("Heading")).toBeInTheDocument();
    expect(screen.getByLabelText("Heading")).toHaveTextContent("Content");
  });

  it("renders no region without a heading", () => {
    render(
      <LeftRightCard>
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Heading")).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("describes the children by the given help text", () => {
    render(
      <LeftRightCard helpText="Helpful Text">
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.getByText("Helpful Text")).toBeInTheDocument();
    expect(screen.getByText("Content")).toHaveAccessibleDescription(
      "Helpful Text",
    );
  });

  it("still renders without the helpful text, but it is not as helpful", () => {
    render(
      <LeftRightCard>
        <LeftRightCard.Right>Content</LeftRightCard.Right>
      </LeftRightCard>,
    );

    expect(screen.queryByText("Helpful Text")).not.toBeInTheDocument();
    expect(screen.getByText("Content")).not.toHaveAccessibleDescription(
      "Helpful Text",
    );
  });

  /**
   * this test just ensures that the programmer did not
   * forget to add className? to the props and then pass
   * it to the wrapping element so that users downstream
   * can style the component
   */
  it("accepts styles", () => {
    const Component = styled(LeftRightCard)`
      margin-bottom: ${Margin.l};
    `;

    const { container } = render(<Component>Contents</Component>);

    expect(container.firstChild).toHaveStyle(`margin-bottom: ${Margin.l}`);
  });
});
