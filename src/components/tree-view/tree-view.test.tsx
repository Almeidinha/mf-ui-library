import { fireEvent, render, screen } from "@testing-library/react";

import { TreeView } from "./index";
import { NodeProps } from "./types";

describe("TreeView Tests", () => {
  const countryNodes: NodeProps[] = [
    {
      value: "south_america",
      label: "South America",
      children: [
        {
          value: "brasil",
          label: "Brasil",
        },
        {
          value: "argentina",
          label: "Argentina",
        },
        {
          value: "uruguay",
          label: "Uruguay",
        },
        {
          value: "peru",
          label: "Peru",
        },
      ],
    },
    {
      value: "north_america",
      label: "North America",
      children: [
        {
          value: "canada",
          label: "Canada",
        },
        {
          value: "usa",
          label: "USA",
        },
        {
          value: "mexico",
          label: "Mexico",
        },
      ],
    },
  ];

  it("should render the Tree", () => {
    const { container } = render(
      <TreeView checkedList={[]} onCheck={() => void 0} nodes={countryNodes} />,
    );

    const treeView = screen.getByRole("tree");

    expect(treeView).toBeInTheDocument();
    expect(container.getElementsByTagName("li").length).toBe(2);
  });

  it("Should expand the nodes on click", () => {
    const { container } = render(
      <TreeView checkedList={[]} onCheck={() => void 0} nodes={countryNodes} />,
    );

    const southAmericaNode = screen.getByText("South America");
    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();

    fireEvent(
      southAmericaNode,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(screen.queryByText("Brasil")).toBeInTheDocument();
    expect(container.getElementsByTagName("li").length).toBe(6);
  });

  it("Should check by default", () => {
    const checked = ["south_america"];
    render(
      <TreeView
        checkedList={checked}
        onCheck={() => void 0}
        nodes={countryNodes}
      />,
    );

    const nodes = screen.getAllByRole("treeitem");
    const checkBox = nodes[0].getElementsByTagName("input")[0];

    expect(checkBox).toBeChecked();
  });

  it("Should Rende the Tree with a Title", () => {
    render(
      <TreeView
        nodes={countryNodes}
        checkedList={[]}
        onCheck={() => void 0}
        title="Tree Node Selection"
      />,
    );

    const tree = screen.getByText("Tree Node Selection");
    expect(tree).toBeInTheDocument();
  });

  it("Should Return Checked values on Check", () => {
    const handleCheck = jest.fn();

    const { container } = render(
      <TreeView
        nodes={countryNodes}
        onCheck={handleCheck}
        checkedList={[]}
        title="Tree Node Selection"
      />,
    );

    const checkBox = container.getElementsByTagName("input")[1];

    fireEvent(
      checkBox,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleCheck).toBeCalled();
    expect(handleCheck).toBeCalledWith(["canada", "usa", "mexico"], {
      checked: true,
      label: "North America",
      value: "north_america",
    });
  });
});
