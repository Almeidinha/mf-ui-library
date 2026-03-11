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
    docs: {
      description: {
        component: `
Tree View displays hierarchical data with optional checkbox selection and keyboard navigation.

## How to use

\`\`\`tsx
import { TreeView } from "./index";

<TreeView
  title="Countries"
  nodes={[{ id: "root", label: "Root", children: [{ id: "leaf", label: "Leaf" }] }]}
  onCheck={(checkedIds, node) => console.log(checkedIds, node)}
  onExpand={(expandedIds, node) => console.log(expandedIds, node)}
/>
\`\`\`

### Accessibility

- The tree uses \`role="tree"\` and supports arrow-key navigation.
- \`ariaLabel\` falls back to \`title\`, then "Tree view".
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    checkedList: [],
    nodes: countryNodes,
    expanded: [],
    title: "Countries",
    useCardContainer: true,
    showChildCount: true,
    expandDisabled: false,
    showExpandAllControls: true,
    expandAllLabel: "Open all",
    collapseAllLabel: "Close all",
    labelAction: "expand",
    icons: {
      parentExpanded: <IconMinor.Eye />,
      parentCollapsed: <IconMinor.EyeSlash />,
      leaf: <IconMinor.CircleInfo />,
    },
  },
  argTypes: {
    nodes: {
      description:
        "Tree data. Each node must have a unique `id` and a `label`. Parents use `children`.",
      control: { disable: true },
      table: {
        type: { summary: "TreeNodeData[]" },
      },
    },
    className: {
      description: "Optional class applied to the root container.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    title: {
      description: "Title displayed at the top of the tree view.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    ariaLabel: {
      description:
        'ARIA label for the tree element. If omitted, it falls back to `title`, then "Tree view".',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "title ?? 'Tree view'" },
      },
    },
    useCardContainer: {
      description:
        "Wraps the tree in a Card with the `title` as the heading when true.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    showChildCount: {
      description: "Shows the number of direct children next to parent nodes.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    expandDisabled: {
      description:
        "Disables expanding/collapsing parent nodes (including expand/collapse all controls).",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checkedList: {
      description:
        "Controlled list of checked leaf node ids. Provide this to fully control checked state.",
      control: { type: "object" },
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "undefined" },
      },
    },
    defaultCheckedList: {
      description:
        "Initial checked ids when uncontrolled (i.e., when `checkedList` is undefined).",
      control: { type: "object" },
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "[]" },
      },
    },
    expanded: {
      description:
        "Controlled list of expanded parent node ids. Provide this to fully control expansion.",
      control: { type: "object" },
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "undefined" },
      },
    },
    defaultExpanded: {
      description:
        "Initial expanded ids when uncontrolled (i.e., when `expanded` is undefined).",
      control: { type: "object" },
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "[]" },
      },
    },
    onCheck: {
      description:
        "Called after a check/uncheck interaction. Only leaf nodes are tracked as checked ids.",
      action: "check",
      table: {
        type: {
          summary:
            "(checkedIds: string[], node: { id; label; checked }) => void",
        },
      },
    },
    onExpand: {
      description:
        "Called after a parent expand/collapse interaction, and also when using Expand all / Collapse all controls.",
      action: "expand",
      table: {
        type: {
          summary:
            "(expandedIds: string[], node?: { id; label; expanded }) => void",
        },
      },
    },
    onNodeClick: {
      description:
        "Called when a node label is clicked (or labelAction resolves to click).",
      action: "nodeClick",
      table: {
        type: { summary: "(node: { id; label }) => void" },
      },
    },
    onNodeFocus: {
      description:
        "Called when a node receives focus (mouse or keyboard navigation).",
      action: "nodeFocus",
      table: {
        type: { summary: "(node: { id; label }) => void" },
      },
    },
    renderNodeContent: {
      description:
        "Custom renderer for the node row content. Use this to add custom icons, badges, or extra text based on node state.",
      control: { disable: true },
      table: {
        type: {
          summary:
            "(args: { node: TreeNodeMeta; expanded: boolean; checkState: CheckboxState; focused: boolean }) => ReactNode",
        },
        defaultValue: { summary: "undefined" },
      },
    },
    icons: {
      description:
        "Optional icons for parent expanded/collapsed and leaf nodes. Values are ReactNode.",
      control: { disable: true },
      table: {
        type: {
          summary:
            "{ parentExpanded?: ReactNode; parentCollapsed?: ReactNode; leaf?: ReactNode }",
        },
        defaultValue: { summary: "undefined" },
      },
    },
    showExpandAllControls: {
      description: "Shows Expand all / Collapse all controls above the tree.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    expandAllLabel: {
      description: "Label for the Expand all button.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Expand all" },
      },
    },
    collapseAllLabel: {
      description: "Label for the Collapse all button.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Collapse all" },
      },
    },
    labelAction: {
      description:
        "Defines what happens when clicking a node label. `expand` toggles parent expansion (or clicks leaf), `check` toggles check, `select` triggers click.",
      options: ["expand", "check", "select"],
      control: { type: "radio" },
      table: {
        type: { summary: "'expand' | 'check' | 'select'" },
        defaultValue: { summary: "expand" },
      },
    },
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<TreeViewProps>();
    return (
      <TreeView
        {...args}
        isRichTreeView
        onCheck={(nextChecked, node) => {
          updateArgs({ checkedList: nextChecked });
          args.onCheck?.(nextChecked, node);
        }}
        onExpand={(nextExpanded, node) => {
          updateArgs({ expanded: nextExpanded });
          args.onExpand?.(nextExpanded, node);
        }}
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

export const SimpleTree: Story = {
  render: function Render() {
    return (
      <div style={{ width: 250 }}>
        <TreeView
          isRichTreeView={false}
          useCardContainer={false}
          nodes={multilevel}
          icons={{
            parentExpanded: <IconMinor.FolderOpen />,
            parentCollapsed: <IconMinor.Folder />,
            leaf: <IconMinor.CircleInfo />,
          }}
          labelAction="expand"
          onExpand={(expanded, node) =>
            console.log("Expanded: ", expanded, "Node: ", node)
          }
          onNodeClick={(node) => console.log("Clicked node: ", node)}
        />
      </div>
    );
  },
};
