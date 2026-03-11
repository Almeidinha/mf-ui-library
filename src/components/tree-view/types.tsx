import React, { ReactNode } from "react";

export type LabelAction = "expand" | "check" | "select";

export type TreeNodeData = {
  id: string;
  label: string;
  helpfulMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  icon?: ReactNode;
  children?: TreeNodeData[];
};

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type TreeNodeMeta = {
  id: string;
  label: string;
  helpfulMessage?: string;
  disabled: boolean;
  invalid: boolean;
  isParent: boolean;
  isLeaf: boolean;
  level: number;
  index: number;
  posInSet: number;
  setSize: number;
  childCount: number;
  parentId?: string;
  icon?: ReactNode;
};

export type FlattenNode = TreeNodeMeta & {
  children: TreeNodeData[];
};

export type CheckNodePayload = {
  id: string;
  label: string;
  checked: boolean;
};

export type ExpandNodePayload = {
  id: string;
  label: string;
  expanded: boolean;
};

export type ClickNodePayload = {
  id: string;
  label: string;
};

export type RenderNodeArgs = {
  node: TreeNodeMeta;
  expanded: boolean;
  checkState: CheckboxState;
  focused: boolean;
};

export type TreeIcons = {
  parentExpanded?: ReactNode;
  parentCollapsed?: ReactNode;
  leaf?: ReactNode;
};

export type TreeViewProps = {
  nodes: TreeNodeData[];
  className?: string;
  title?: string;
  ariaLabel?: string;
  useCardContainer?: boolean;
  showChildCount?: boolean;
  expandDisabled?: boolean;

  checkedList?: string[];
  defaultCheckedList?: string[];

  expanded?: string[];
  defaultExpanded?: string[];

  onCheck?: (checkedIds: string[], node: CheckNodePayload) => void;
  onExpand?: (expandedIds: string[], node?: ExpandNodePayload) => void;
  onNodeClick?: (node: ClickNodePayload) => void;
  onNodeFocus?: (node: ClickNodePayload) => void;

  renderNodeContent?: (args: RenderNodeArgs) => ReactNode;

  icons?: TreeIcons;
  showExpandAllControls?: boolean;
  expandAllLabel?: string;
  collapseAllLabel?: string;

  labelAction?: LabelAction;
};

export type TreeItemProps = {
  treeId: string;
  node: TreeNodeMeta;
  expanded: boolean;
  checkState: CheckboxState;
  expandDisabled: boolean;
  showChildCount: boolean;
  focused: boolean;
  tabIndex: number;
  describedById?: string;
  children?: ReactNode;
  defaultIcons?: TreeIcons;
  onCheck: (id: string) => void;
  onExpand: (id: string) => void;
  onClick: (id: string) => void;
  onFocus: (id: string) => void;
  onKeyDown: (event: React.KeyboardEvent, id: string) => void;
  renderNodeContent?: (args: RenderNodeArgs) => ReactNode;
  labelAction: LabelAction;
};
