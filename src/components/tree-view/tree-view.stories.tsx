import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { TreeView } from "./tree-view";
import {
  CheckNodeProps,
  ExpandNodeProps,
  NodeProps,
  TreeViewProps,
} from "./types";

const multilevel: NodeProps[] = [
  {
    value: "item 1",
    label: "item_1",
    children: [
      {
        value: "item 1.1",
        label: "item_1.1",
        children: [
          {
            value: "item 1.1.1",
            label: "item_1.1.1",
          },
          {
            value: "item 1.1.2",
            label: "item_1.1.2",
          },
          {
            value: "item 1.1.3",
            label: "item_1.1.3",
          },
          {
            value: "item 1.1.4",
            label: "item_1.1.4",
          },
          {
            value: "item 1.1.5",
            label: "item_1.1.5",
          },
        ],
      },
      {
        value: "item 1.2",
        label: "item_1.2",
      },
      {
        value: "item 1.3",
        label: "item_1.3",
      },
      {
        value: "item 1.4",
        label: "item_1.4",
        children: [
          {
            value: "item 1.4.1",
            label: "item_1.4.1",
          },
          {
            value: "item 1.4.2",
            label: "item_1.4.2",
          },
          {
            value: "item 1.4.3",
            label: "item_1.4.3",
            children: [
              {
                value: "item 1.4.3.1",
                label: "item_1.4.3.1",
              },
              {
                value: "item 1.4.3.2",
                label: "item_1.4.3.2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: "item 2",
    label: "item_2",
    children: [
      {
        value: "item 2.1",
        label: "item_2.1",
      },
      {
        value: "item 2.2",
        label: "item_2.2",
      },
      {
        value: "item 2.3",
        label: "item_2.3",
        children: [
          {
            value: "item 2.3.1",
            label: "item_2.3.1",
          },
          {
            value: "item 2.3.2",
            label: "item_2.3.2",
          },
        ],
      },
    ],
  },
  {
    value: "item 3",
    label: "item_3",
    children: [
      {
        value: "item 3.1",
        label: "item_3.1",
      },
      {
        value: "item 3.2",
        label: "item_3.2",
      },
      {
        value: "item 3.3",
        label: "item_3.3",
      },
      {
        value: "item 3.4",
        label: "item_3.4",
      },
      {
        value: "item 3.5",
        label: "item_3.5",
      },
    ],
  },
  {
    value: "item 4",
    label: "item_4",
  },
  {
    value: "item 5",
    label: "item_5",
  },
  {
    value: "item 6",
    label: "item_6",
  },
];

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
      {
        value: "chile",
        label: "Chile",
      },
      {
        value: "venezuela",
        label: "Venezuela",
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
  {
    value: "europe",
    label: "Europe",
    children: [
      {
        value: "uk",
        label: "United Kingdom",
      },
      {
        value: "france",
        label: "France",
      },
      {
        value: "portugal",
        label: "Portugal",
      },
      {
        value: "spain",
        label: "Spain",
      },
      {
        value: "ireland",
        label: "Ireland",
      },
    ],
  },
  {
    value: "africa",
    label: "Africa",
    children: [
      {
        value: "somalia",
        label: "Somalia",
      },
      {
        value: "uganda",
        label: "Uganda",
      },
      {
        value: "egypt",
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
    onCheck: (checked: string[], node?: CheckNodeProps) =>
      console.log("Checked: ", checked, "Node: ", node),
    onClick: (node: CheckNodeProps) => console.log("Clicked node: ", node),
    onExpand: (expanded: string[], node?: ExpandNodeProps) =>
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
        onCheck={(checked) => updateArgs({ checkedList: checked })}
      />
    );
  },
};
