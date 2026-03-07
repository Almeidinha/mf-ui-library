import { Margin } from "@foundations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import styled from "styled-components";

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

  it("does not render the unselected tabs", () => {
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

    expect(screen.getByText("ONE")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("TWO")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("ONE")).not.toBeVisible();
    expect(screen.getByText("TWO")).not.toBeVisible();
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
    const handleChange = jest.fn();

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

    await userEvent.click(screen.getByText("Two"));

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(screen.getByText("ONE")).toBeVisible();
    expect(screen.getByText("TWO")).not.toBeVisible();
  });
});
