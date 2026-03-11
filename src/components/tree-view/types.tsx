import type { ReactNode } from "react";
import React from "react";

export type LabelAction = "expand" | "check" | "select";
export type SimpleTreeLabelAction = Exclude<LabelAction, "check">;

export type TreeNodeData = {
  id: string;
  label: string;
  helpfulMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  icon?: ReactNode;
  /**
   * Marks the node as expandable even when children are not yet loaded.
   * Useful for lazy-loading trees.
   */
  hasChildren?: boolean;
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
  hasChildren: boolean;
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
  checkState?: CheckboxState;
  focused: boolean;
  isLoading: boolean;
};

export type TreeIcons = {
  parentExpanded?: ReactNode;
  parentCollapsed?: ReactNode;
  leaf?: ReactNode;
};

type BaseTreeViewProps = {
  nodes: TreeNodeData[];
  className?: string;
  title?: string;
  ariaLabel?: string;
  useCardContainer?: boolean;
  showChildCount?: boolean;
  expandDisabled?: boolean;

  expanded?: string[];
  defaultExpanded?: string[];
  onExpand?: (expandedIds: string[], node?: ExpandNodePayload) => void;

  onNodeClick?: (node: ClickNodePayload) => void;
  onNodeFocus?: (node: ClickNodePayload) => void;

  renderNodeContent?: (args: RenderNodeArgs) => ReactNode;

  icons?: TreeIcons;
  showExpandAllControls?: boolean;
  expandAllLabel?: string;
  collapseAllLabel?: string;

  /**
   * Lazy loading
   */
  loadChildren?: (node: TreeNodeData) => Promise<TreeNodeData[]>;
  onLoadChildrenError?: (node: TreeNodeData, error: unknown) => void;
};

export type RichTreeViewProps = BaseTreeViewProps & {
  isRichTreeView?: true;
  checkedList?: string[];
  defaultCheckedList?: string[];
  onCheck?: (checkedIds: string[], node: CheckNodePayload) => void;
  labelAction?: LabelAction;
};

export type SimpleTreeViewProps = BaseTreeViewProps & {
  isRichTreeView: false;
  checkedList?: never;
  defaultCheckedList?: never;
  onCheck?: never;
  labelAction?: SimpleTreeLabelAction;
};

export type TreeViewProps = RichTreeViewProps | SimpleTreeViewProps;

export type TreeItemProps = {
  treeId: string;
  node: TreeNodeMeta;
  expanded: boolean;
  checkState?: CheckboxState;
  expandDisabled: boolean;
  showChildCount: boolean;
  focused: boolean;
  isLoading: boolean;
  tabIndex: number;
  describedById?: string;
  children?: ReactNode;
  defaultIcons?: TreeIcons;
  onCheck?: (id: string) => void;
  onExpand: (id: string) => void;
  onClick: (id: string) => void;
  onFocus: (id: string) => void;
  onKeyDown: (event: React.KeyboardEvent, id: string) => void;
  renderNodeContent?: (args: RenderNodeArgs) => ReactNode;
  labelAction: LabelAction | SimpleTreeLabelAction;
  isRichTreeView: boolean;
};
