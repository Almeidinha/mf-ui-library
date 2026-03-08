import { Margin } from "@foundations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import styled from "styled-components";
import { vi } from "vitest";

import { Tab, Tabs } from "./index";

describe("Tabs", () => {
  it("renders both tabs and the currently selected content", () => {
    render(
      <Tabs selected={0}>
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("ONE");
  });

  it("hides the unselected panels", () => {
    render(
      <Tabs selected={2}>
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
        <Tabs.Content>THREE</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);

    const one = screen.getByText("ONE");
    const two = screen.getByText("TWO");
    const three = screen.getByText("THREE");

    expect(one).not.toBeVisible();
    expect(two).not.toBeVisible();
    expect(three).toBeVisible();

    expect(one).toHaveStyle({ display: "none" });
    expect(two).toHaveStyle({ display: "none" });
  });

  /**
   * this test just ensures that the programmer did not
   * forget to add className? to the props and then pass
   * it to the wrapping element so that users downstream
   * can style the component
   */
  it("accepts styles", () => {
    const NiceTab = styled(Tab)`
      margin-bottom: ${Margin.l};
    `;

    const { container } = render(<NiceTab>Contents</NiceTab>);

    expect(container.firstChild).toHaveStyle(`margin-bottom: ${Margin.l}`);
    expect(screen.getByText("Contents")).toBeInTheDocument();
  });

  it("calls onChange when a tab is clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs selected={0} onChange={handleChange}>
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(1);

    // Tabs is controlled: selected stays 0 unless the parent updates it.
    expect(screen.getByText("ONE")).toBeVisible();
    expect(screen.getByText("TWO")).not.toBeVisible();
  });

  it("does not call onChange when clicking the already selected tab", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs selected={0} onChange={handleChange}>
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "One" }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("clamps selected index to available tabs", () => {
    render(
      <Tabs selected={99}>
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
        <Tabs.Content>THREE</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByText("THREE")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("wires up ids via idPrefix (aria-controls / aria-labelledby)", () => {
    render(
      <Tabs selected={0} idPrefix="mytabs">
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    const tabOne = screen.getByRole("tab", { name: "One" });
    const panelOne = screen.getByRole("tabpanel");

    expect(tabOne).toHaveAttribute("id", "mytabs-tab-0");
    expect(tabOne).toHaveAttribute("aria-controls", "mytabs-panel-0");

    expect(panelOne).toHaveAttribute("id", "mytabs-panel-0");
    expect(panelOne).toHaveAttribute("aria-labelledby", "mytabs-tab-0");
  });

  it("keyboard navigation (auto): ArrowRight focuses next and activates", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs selected={0} onChange={handleChange} activationMode="auto">
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("keyboard navigation (manual): ArrowRight moves focus, Enter activates", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs selected={0} onChange={handleChange} activationMode="manual">
        <Tabs.TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
      </Tabs>,
    );

    screen.getByRole("tab", { name: "One" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    expect(handleChange).not.toHaveBeenCalled();

    await user.keyboard("{Enter}");
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("skips disabled tabs during keyboard navigation", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs selected={1} onChange={handleChange} activationMode="auto">
        <Tabs.TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab disabled>Tab 3</Tab>
          <Tab>Tab 4</Tab>
        </Tabs.TabList>
        <Tabs.Content>ONE</Tabs.Content>
        <Tabs.Content>TWO</Tabs.Content>
        <Tabs.Content>THREE</Tabs.Content>
        <Tabs.Content>FOUR</Tabs.Content>
      </Tabs>,
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const tab4 = screen.getByRole("tab", { name: "Tab 4" });

    expect(tab3).toHaveAttribute("aria-disabled", "true");
    expect(tab3).toHaveAttribute("tabindex", "-1");

    tab2.focus();
    await user.keyboard("{ArrowRight}");

    expect(tab4).toHaveFocus();
    expect(handleChange).toHaveBeenCalledWith(3);
  });
});
