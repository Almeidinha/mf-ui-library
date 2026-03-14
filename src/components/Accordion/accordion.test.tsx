import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import {
  Accordion,
  AccordionActions,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  type AccordionProps,
} from ".";

type SingleAccordionTestProps = Omit<
  Extract<AccordionProps, { type?: "single" }>,
  "children"
>;
type MultipleAccordionTestProps = Omit<
  Extract<AccordionProps, { type: "multiple" }>,
  "children"
>;
type RenderAccordionProps =
  | SingleAccordionTestProps
  | MultipleAccordionTestProps;

function getPanelForHeader(header: HTMLElement) {
  const panelId = header.getAttribute("aria-controls");

  expect(panelId).toBeTruthy();

  return document.getElementById(panelId as string);
}

const accordionItems = (
  <>
    <AccordionItem value="overview">
      <AccordionHeader
        subtitle="Summary, owners, and business context"
        actions={<span>Beta</span>}
      >
        Overview
      </AccordionHeader>
      <AccordionPanel>
        Overview content
        <AccordionActions>
          <button type="button">Panel action</button>
        </AccordionActions>
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem value="implementation">
      <AccordionHeader subtitle="API boundaries and rollout">
        Implementation
      </AccordionHeader>
      <AccordionPanel>Implementation content</AccordionPanel>
    </AccordionItem>

    <AccordionItem value="support" disabled>
      <AccordionHeader subtitle="Disabled item example">
        Support
      </AccordionHeader>
      <AccordionPanel>Support content</AccordionPanel>
    </AccordionItem>
  </>
);

function renderAccordion(props: RenderAccordionProps = {}) {
  if (props.type === "multiple") {
    return render(<Accordion {...props}>{accordionItems}</Accordion>);
  }

  return render(
    <Accordion type="single" {...props}>
      {accordionItems}
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("should render headers and collapse panels by default", () => {
    renderAccordion();

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const implementationHeader = screen.getByRole("button", {
      name: /implementation/i,
    });

    expect(overviewHeader).toBeInTheDocument();
    expect(implementationHeader).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Panel action")).toBeInTheDocument();
    expect(getPanelForHeader(overviewHeader)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("should open and close items in single mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({ onValueChange });

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const overviewPanel = getPanelForHeader(overviewHeader);

    await user.click(overviewHeader);

    expect(overviewHeader).toHaveAttribute("aria-expanded", "true");
    expect(overviewPanel).toHaveAttribute("aria-hidden", "false");
    expect(onValueChange).toHaveBeenCalledWith("overview");

    await user.click(overviewHeader);

    expect(overviewHeader).toHaveAttribute("aria-expanded", "false");
    expect(overviewPanel).toHaveAttribute("aria-hidden", "true");
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
  });

  it("should keep the open item expanded when collapsible is false", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({
      defaultValue: "overview",
      collapsible: false,
      onValueChange,
    });

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const overviewPanel = getPanelForHeader(overviewHeader);

    expect(overviewHeader).toHaveAttribute("aria-expanded", "true");
    expect(overviewHeader).toHaveAttribute("aria-disabled", "true");

    await user.click(overviewHeader);

    expect(overviewHeader).toHaveAttribute("aria-expanded", "true");
    expect(overviewPanel).toHaveAttribute("aria-hidden", "false");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("should allow multiple items to stay open in multiple mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({ type: "multiple", onValueChange });

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const implementationHeader = screen.getByRole("button", {
      name: /implementation/i,
    });

    await user.click(overviewHeader);
    await user.click(implementationHeader);

    expect(getPanelForHeader(overviewHeader)).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(getPanelForHeader(implementationHeader)).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(onValueChange).toHaveBeenNthCalledWith(1, ["overview"]);
    expect(onValueChange).toHaveBeenNthCalledWith(2, [
      "overview",
      "implementation",
    ]);
  });

  it("should ignore clicks when the accordion is readOnly or the item is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({ readOnly: true, onValueChange });

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const supportHeader = screen.getByRole("button", { name: /support/i });

    await user.click(overviewHeader);

    expect(overviewHeader).toHaveAttribute("aria-expanded", "false");
    expect(overviewHeader).toHaveAttribute("aria-disabled", "true");
    expect(onValueChange).not.toHaveBeenCalled();

    expect(supportHeader).toBeDisabled();
    await user.click(supportHeader);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("should move focus between enabled headers with keyboard navigation", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const overviewHeader = screen.getByRole("button", { name: /overview/i });
    const implementationHeader = screen.getByRole("button", {
      name: /implementation/i,
    });

    overviewHeader.focus();
    expect(overviewHeader).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(implementationHeader).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(overviewHeader).toHaveFocus();

    await user.keyboard("{End}");
    expect(implementationHeader).toHaveFocus();

    await user.keyboard("{Home}");
    expect(overviewHeader).toHaveFocus();
  });

  it("should keep panel content unmounted until opened when unmountOnExit is enabled", async () => {
    const user = userEvent.setup();
    renderAccordion({ unmountOnExit: true });

    expect(screen.queryByText("Overview content")).not.toBeInTheDocument();

    const overviewHeader = screen.getByRole("button", { name: /overview/i });

    await user.click(overviewHeader);
    expect(screen.getByText("Overview content")).toBeInTheDocument();
  });
});
