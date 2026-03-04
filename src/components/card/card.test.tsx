import { Margin } from "@foundations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import styled from "styled-components";
import { vi } from "vitest";

import { Card } from "./card";

describe("Card", () => {
  it("renders with the heading", () => {
    render(<Card heading="Heading">Contents</Card>);

    expect(screen.getByRole("region", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("Heading")).toBeInTheDocument();
    expect(screen.getByText("Contents")).toBeInTheDocument();
  });

  it("renders without the heading", () => {
    render(<Card>Contents</Card>);

    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.getByText("Contents")).toBeInTheDocument();
  });

  /**
   * this test just ensures that the programmer did not
   * forget to add className? to the props and then pass
   * it to the wrapping element so that users downstream
   * can style the component
   */
  it("accepts styles", () => {
    const NiceCard = styled(Card)`
      margin-bottom: ${Margin.l};
    `;

    const { container } = render(<NiceCard>Contents</NiceCard>);

    expect(container.firstChild).toHaveStyle(`margin-bottom: ${Margin.l}`);
    expect(screen.getByText("Contents")).toBeInTheDocument();
  });

  describe("slots", () => {
    it("renders no regions if it has no headings", () => {
      render(<Card>Contents</Card>);

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
      expect(screen.getByText("Contents")).toBeInTheDocument();
    });

    it("renders one region if the card has a heading", () => {
      render(<Card heading="Heading">Contents</Card>);

      expect(screen.getByRole("region")).toBeInTheDocument();
      expect(screen.getAllByRole("region").length).toBe(1);
      expect(screen.getByText("Contents")).toBeInTheDocument();
    });

    it("renders one region per heading", () => {
      render(
        <Card heading="Heading">
          <Card.Section heading="Subheading 1">Section 1</Card.Section>
          <Card.Section heading="Subheading 2">Section 2</Card.Section>
          <Card.Section>Section 3</Card.Section>
          <Card.Section>Section 4</Card.Section>
        </Card>,
      );

      expect(screen.getAllByRole("region").length).toBe(3);
    });

    it("renders all the given sections", () => {
      render(
        <Card heading="Heading">
          <Card.Section heading="Subheading 1">Section 1</Card.Section>
          <Card.Section heading="Subheading 2">Section 2</Card.Section>
          <Card.Section>Section 3</Card.Section>
          <Card.Section>Section 4</Card.Section>
        </Card>,
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Section 3")).toBeInTheDocument();
      expect(screen.getByText("Section 4")).toBeInTheDocument();
    });

    it("does not render plain children if you give it sections", () => {
      render(
        <Card>
          <Card.Section>Section 1</Card.Section>
          <div data-testid="plain-children">PLAIN CHILDREN</div>
        </Card>,
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.queryByTestId("plain-children")).not.toBeInTheDocument();
    });

    it("renders the heading actions if there is a heading", () => {
      render(
        <Card heading="Heading">
          <Card.Section>Section 1</Card.Section>
          <Card.HeadingAction>
            <button>Click Me</button>
          </Card.HeadingAction>
        </Card>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not render heading actions if there is no heading", () => {
      render(
        <Card>
          <Card.Section>Section 1</Card.Section>
          <Card.HeadingAction>
            <button>Click Me</button>
          </Card.HeadingAction>
        </Card>,
      );

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders the controls when they are provided", () => {
      render(
        <Card heading="Heading">
          <Card.Section>Section 1</Card.Section>
          <Card.Controls>
            <button>Click Me</button>
          </Card.Controls>
        </Card>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not stop the user from clicking the controls", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card heading="Heading">
          <Card.Section>Section 1</Card.Section>
          <Card.Controls>
            <button onClick={handleClick}>Click Me</button>
          </Card.Controls>
        </Card>,
      );

      await user.click(screen.getByText("Click Me"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
