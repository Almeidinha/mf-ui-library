import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";
import { useArgs } from "storybook/internal/preview-api";

import { TreeView } from "./tree-view";
import { TreeNodeData, TreeViewProps } from "./types";

const multilevel: TreeNodeData[] = [
  {
    id: "item 1",
    label: "item_1",
    children: [
      {
        id: "item 1.1",
        label: "item_1.1",
        children: [
          {
            id: "item 1.1.1",
            label: "item_1.1.1",
          },
          {
            id: "item 1.1.2",
            label: "item_1.1.2",
          },
          {
            id: "item 1.1.3",
            label: "item_1.1.3",
          },
          {
            id: "item 1.1.4",
            label: "item_1.1.4",
          },
          {
            id: "item 1.1.5",
            label: "item_1.1.5",
          },
        ],
      },
      {
        id: "item 1.2",
        label: "item_1.2",
      },
      {
        id: "item 1.3",
        label: "item_1.3",
      },
      {
        id: "item 1.4",
        label: "item_1.4",
        children: [
          {
            id: "item 1.4.1",
            label: "item_1.4.1",
          },
          {
            id: "item 1.4.2",
            label: "item_1.4.2",
          },
          {
            id: "item 1.4.3",
            label: "item_1.4.3",
            children: [
              {
                id: "item 1.4.3.1",
                label: "item_1.4.3.1",
              },
              {
                id: "item 1.4.3.2",
                label: "item_1.4.3.2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "item 2",
    label: "item_2",
    children: [
      {
        id: "item 2.1",
        label: "item_2.1",
      },
      {
        id: "item 2.2",
        label: "item_2.2",
      },
      {
        id: "item 2.3",
        label: "item_2.3",
        children: [
          {
            id: "item 2.3.1",
            label: "item_2.3.1",
          },
          {
            id: "item 2.3.2",
            label: "item_2.3.2",
          },
        ],
      },
    ],
  },
  {
    id: "item 3",
    label: "item_3",
    children: [
      {
        id: "item 3.1",
        label: "item_3.1",
      },
      {
        id: "item 3.2",
        label: "item_3.2",
      },
      {
        id: "item 3.3",
        label: "item_3.3",
      },
      {
        id: "item 3.4",
        label: "item_3.4",
      },
      {
        id: "item 3.5",
        label: "item_3.5",
      },
    ],
  },
  {
    id: "item 4",
    label: "item_4",
  },
  {
    id: "item 5",
    label: "item_5",
  },
  {
    id: "item 6",
    label: "item_6",
  },
];

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
      {
        id: "chile",
        label: "Chile",
      },
      {
        id: "venezuela",
        label: "Venezuela",
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
  {
    id: "europe",
    label: "Europe",
    children: [
      {
        id: "uk",
        label: "United Kingdom",
      },
      {
        id: "france",
        label: "France",
      },
      {
        id: "portugal",
        label: "Portugal",
      },
      {
        id: "spain",
        label: "Spain",
      },
      {
        id: "ireland",
        label: "Ireland",
      },
    ],
  },
  {
    id: "africa",
    label: "Africa",
    children: [
      {
        id: "somalia",
        label: "Somalia",
      },
      {
        id: "uganda",
        label: "Uganda",
      },
      {
        id: "egypt",
        label: "Egypt",
      },
    ],
  },
];

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  args: {
    checkedList: [],
    nodes: countryNodes,
    expanded: [],
    className: "",
    title: "Countries",
    useCardContainer: true,
    showChildCount: true,
    expandDisabled: false,
    showExpandAllControls: true,
    expandAllLabel: "Open all",
    collapseAllLabel: "Close all",
    icons: {
      parentExpanded: <IconMinor.Eye />,
      parentCollapsed: <IconMinor.EyeSlash />,
      leaf: <IconMinor.CircleInfo />,
    },
    onCheck: (checked, node) =>
      console.log("Checked: ", checked, "Node: ", node),
    onNodeClick: (node) => console.log("Clicked node: ", node),
    onExpand: (expanded, node) =>
      console.log("Expanded: ", expanded, "Node: ", node),
  },
  argTypes: {},
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<TreeViewProps>();
    return (
      <TreeView
        {...args}
        onCheck={(nextChecked) => updateArgs({ checkedList: nextChecked })}
        onExpand={(nextExpanded) => updateArgs({ expanded: nextExpanded })}
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <TreeView
        nodes={multilevel}
        onCheck={(checked, node) =>
          console.log("Checked: ", checked, "Node: ", node)
        }
        onExpand={(expanded, node) =>
          console.log("Expanded: ", expanded, "Node: ", node)
        }
        onNodeClick={(node) => console.log("Clicked node: ", node)}
      />
    );
  },
};
