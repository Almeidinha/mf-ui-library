import { ReactNode } from "react";

export type NodeProps = {
  label: string;
  value: string;
  helpfulMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  children?: NodeProps[];
};

export type FlattenNodeProps = NodeProps & {
  parent?: NodeProps;
  isChild: boolean;
  isParent: boolean;
  isLeaf: boolean;
  treeDepth: number;
  index: number;
  checked: boolean;
  checkState: number;
  expanded: boolean;
};

export type TreeViewProps = {
  checkedList: string[];
  nodes: NodeProps[];
  expanded?: string[];
  className?: string;
  title?: string;
  useCardContainer?: boolean;
  showChildCount?: boolean;
  expandDisabled?: boolean;
  onCheck: (checked: string[], node?: CheckNodeProps) => void;
  onClick?: (node: CheckNodeProps) => void;
  onExpand?: (expanded: string[], node?: ExpandNodeProps) => void;
};

export type TreeNodeProps = {
  checkState: number;
  disabled: boolean;
  expanded: boolean;
  isParent: boolean;
  isLeaf: boolean;
  expandDisabled: boolean;
  label: string;
  value: string;
  children: ReactNode;
  treeId: string;
  invalid: boolean;
  childCount: number;
  showChildCount: boolean;
  helpfulMessage?: string;
  onCheck: (node: CheckNodeProps) => void;
  onClick: (node: CheckNodeProps) => void;
  onExpand: (node: ExpandNodeProps) => void;
};

export type CheckNodeProps = NodeProps & {
  checked: boolean;
};

export type ExpandNodeProps = NodeProps & {
  expanded: boolean;
};

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}
