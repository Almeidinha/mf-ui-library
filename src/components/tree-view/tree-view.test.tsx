import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import { TreeView } from "./tree-view";
import type { TreeNodeData } from "./types";

describe("TreeView Tests", () => {
  const countryNodes: TreeNodeData[] = [
    {
      id: "south_america",
      label: "South America",
      children: [
        {
          id: "brasil",
          label: "Brasil",
        },
        {
          id: "argentina",
          label: "Argentina",
        },
        {
          id: "uruguay",
          label: "Uruguay",
        },
        {
          id: "peru",
          label: "Peru",
        },
      ],
    },
    {
      id: "north_america",
      label: "North America",
      children: [
        {
          id: "canada",
          label: "Canada",
        },
        {
          id: "usa",
          label: "USA",
        },
        {
          id: "mexico",
          label: "Mexico",
        },
      ],
    },
  ];

  it("should render the Tree", () => {
    render(<TreeView checkedList={[]} nodes={countryNodes} />);

    expect(screen.getByRole("tree")).toBeInTheDocument();
    expect(screen.getAllByRole("treeitem")).toHaveLength(2);
  });

  it("Should expand the nodes on click", () => {
    render(<TreeView checkedList={[]} nodes={countryNodes} />);

    const southAmericaNode = screen.getByRole("button", {
      name: "South America",
    });
    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();

    fireEvent.click(southAmericaNode);

    expect(screen.queryByText("Brasil")).toBeInTheDocument();
    expect(screen.getAllByRole("treeitem")).toHaveLength(6);
  });

  it("Should check by default", () => {
    // TreeView tracks checked *leaf* ids; a parent is checked when all its leaf descendants are checked.
    const checked = ["brasil", "argentina", "uruguay", "peru"];
    render(<TreeView checkedList={checked} nodes={countryNodes} />);

    const southAmericaItem = screen.getByRole("treeitem", {
      name: "South America",
    });
    const checkbox = within(southAmericaItem).getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("Should Rende the Tree with a Title", () => {
    render(
      <TreeView
        nodes={countryNodes}
        checkedList={[]}
        title="Tree Node Selection"
      />,
    );

    const tree = screen.getByText("Tree Node Selection");
    expect(tree).toBeInTheDocument();

    expect(
      screen.getByRole("tree", { name: "Tree Node Selection" }),
    ).toBeInTheDocument();
  });

  it("Should Return Checked values on Check", () => {
    const handleCheck = vi.fn();

    render(
      <TreeView
        nodes={countryNodes}
        onCheck={handleCheck}
        checkedList={[]}
        title="Tree Node Selection"
      />,
    );

    const northAmericaItem = screen.getByRole("treeitem", {
      name: "North America",
    });

    fireEvent.click(within(northAmericaItem).getByRole("checkbox"));

    expect(handleCheck).toHaveBeenCalled();
    expect(handleCheck).toHaveBeenCalledWith(["canada", "usa", "mexico"], {
      checked: true,
      id: "north_america",
      label: "North America",
    });
  });

  it("supports uncontrolled defaultExpanded", () => {
    render(
      <TreeView nodes={countryNodes} defaultExpanded={["south_america"]} />,
    );

    expect(screen.getByText("Brasil")).toBeInTheDocument();
    expect(screen.getAllByRole("treeitem")).toHaveLength(6);
  });

  it("supports uncontrolled defaultCheckedList", () => {
    render(
      <TreeView
        nodes={countryNodes}
        defaultCheckedList={["canada", "usa", "mexico"]}
      />,
    );

    const northAmericaItem = screen.getByRole("treeitem", {
      name: "North America",
    });
    expect(within(northAmericaItem).getByRole("checkbox")).toBeChecked();
  });

  it("does not expand when expandDisabled is true", () => {
    render(
      <TreeView
        nodes={countryNodes}
        expandDisabled
        showExpandAllControls
        expandAllLabel="Open all"
        collapseAllLabel="Close all"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "South America",
      }),
    );

    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Open all" })).toBeDisabled();
  });

  it("labelAction='check' toggles check on label click", () => {
    const onCheck = vi.fn();

    render(
      <TreeView
        nodes={countryNodes}
        checkedList={[]}
        onCheck={onCheck}
        labelAction="check"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "North America",
      }),
    );

    expect(onCheck).toHaveBeenCalledWith(["canada", "usa", "mexico"], {
      checked: true,
      id: "north_america",
      label: "North America",
    });

    // Still collapsed (label click did not expand)
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
  });

  it("labelAction='select' calls onNodeClick without expanding", () => {
    const onNodeClick = vi.fn();

    render(
      <TreeView
        nodes={countryNodes}
        onNodeClick={onNodeClick}
        labelAction="select"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "South America",
      }),
    );

    expect(onNodeClick).toHaveBeenCalledWith({
      id: "south_america",
      label: "South America",
    });

    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();
  });

  it("uses ariaLabel when provided", () => {
    render(
      <TreeView
        nodes={countryNodes}
        ariaLabel="Countries tree"
        checkedList={[]}
      />,
    );

    expect(
      screen.getByRole("tree", { name: "Countries tree" }),
    ).toBeInTheDocument();
  });

  it("shows expand-all controls and emits onExpand", () => {
    const onExpand = vi.fn();

    render(
      <TreeView
        nodes={countryNodes}
        onExpand={onExpand}
        showExpandAllControls
        expandAllLabel="Open all"
        collapseAllLabel="Close all"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open all" }));

    expect(onExpand).toHaveBeenCalledWith(
      expect.arrayContaining(["south_america", "north_america"]),
    );

    expect(screen.getByText("Brasil")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close all" }));
    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
  });

  it("renderNodeContent overrides default label rendering", () => {
    render(
      <TreeView
        nodes={countryNodes}
        renderNodeContent={({ node }) => <span>{`Node: ${node.label}`}</span>}
      />,
    );

    expect(screen.getByText("Node: South America")).toBeInTheDocument();
    expect(screen.getByText("Node: North America")).toBeInTheDocument();
  });
});
