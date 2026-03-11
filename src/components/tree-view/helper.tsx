import { safeArray } from "helpers/safe-navigation";
import React from "react";

import {
  CheckboxState,
  FlattenNode,
  LabelAction,
  SimpleTreeLabelAction,
  TreeNodeData,
  TreeNodeMeta,
} from "./types";

type FlattenContext = {
  level: number;
  parentId?: string;
  siblingCount: number;
};

type RunLabelActionArgs = {
  id: string;
  isParent: boolean;
  disabled: boolean;
  labelAction: LabelAction | SimpleTreeLabelAction;
  onCheck?: (id: string) => void;
  onExpand: (id: string) => void;
  onClick: (id: string) => void;
};

export const flattenNodes = (
  nodes: TreeNodeData[],
  context: FlattenContext = { level: 1, siblingCount: nodes.length },
): FlattenNode[] => {
  const flat: FlattenNode[] = [];

  safeArray(nodes).forEach((node, index) => {
    const children = safeArray(node.children);
    const isParent = children.length > 0;

    const flattenedNode: FlattenNode = {
      id: node.id,
      label: node.label,
      helpfulMessage: node.helpfulMessage,
      disabled: Boolean(node.disabled),
      invalid: Boolean(node.invalid),
      icon: node.icon,
      isParent,
      isLeaf: !isParent,
      level: context.level,
      index,
      posInSet: index + 1,
      setSize: context.siblingCount,
      childCount: children.length,
      parentId: context.parentId,
      children,
    };

    flat.push(flattenedNode);

    if (isParent) {
      flat.push(
        ...flattenNodes(children, {
          level: context.level + 1,
          parentId: node.id,
          siblingCount: children.length,
        }),
      );
    }
  });

  return flat;
};

export const createNodeMap = (
  nodes: FlattenNode[],
): Map<string, FlattenNode> => {
  return new Map(nodes.map((node) => [node.id, node]));
};

export const getDescendantIds = (
  nodeMap: Map<string, FlattenNode>,
  id: string,
): string[] => {
  const descendants: string[] = [];

  const visit = (parentId: string) => {
    const parent = nodeMap.get(parentId);

    if (!parent) {
      return;
    }

    parent.children.forEach((child) => {
      descendants.push(child.id);
      visit(child.id);
    });
  };

  visit(id);

  return descendants;
};

export const getLeafDescendantIds = (
  nodeMap: Map<string, FlattenNode>,
  id: string,
): string[] => {
  return getDescendantIds(nodeMap, id).filter((descendantId) => {
    const descendant = nodeMap.get(descendantId);
    return descendant?.isLeaf;
  });
};

export const getAncestorIds = (
  nodeMap: Map<string, FlattenNode>,
  id: string,
): string[] => {
  const ancestors: string[] = [];
  let current = nodeMap.get(id);

  while (current?.parentId) {
    ancestors.push(current.parentId);
    current = nodeMap.get(current.parentId);
  }

  return ancestors;
};

export const getVisibleNodeIds = (
  flatNodes: FlattenNode[],
  expandedSet: Set<string>,
  nodeMap: Map<string, FlattenNode>,
): string[] => {
  return flatNodes
    .filter((node) => {
      const ancestors = getAncestorIds(nodeMap, node.id);
      return ancestors.every((ancestorId) => expandedSet.has(ancestorId));
    })
    .map((node) => node.id);
};

export const isNodeExpanded = (
  expandedSet: Set<string>,
  id: string,
): boolean => {
  return expandedSet.has(id);
};

export const getNodeCheckState = (
  nodeMap: Map<string, FlattenNode>,
  checkedSet: Set<string>,
  id: string,
): CheckboxState => {
  const node = nodeMap.get(id);

  if (!node) {
    return CheckboxState.UNCHECKED;
  }

  if (node.isLeaf) {
    return checkedSet.has(id) ? CheckboxState.CHECKED : CheckboxState.UNCHECKED;
  }

  const leafDescendantIds = getLeafDescendantIds(nodeMap, id);

  if (leafDescendantIds.length === 0) {
    return CheckboxState.UNCHECKED;
  }

  const checkedLeafCount = leafDescendantIds.filter((leafId) =>
    checkedSet.has(leafId),
  ).length;

  if (checkedLeafCount === 0) {
    return CheckboxState.UNCHECKED;
  }

  if (checkedLeafCount === leafDescendantIds.length) {
    return CheckboxState.CHECKED;
  }

  return CheckboxState.INDETERMINATE;
};

export const toggleCheckedState = (
  nodeMap: Map<string, FlattenNode>,
  checkedSet: Set<string>,
  id: string,
): Set<string> => {
  const next = new Set(checkedSet);
  const node = nodeMap.get(id);

  if (!node || node.disabled) {
    return next;
  }

  const currentState = getNodeCheckState(nodeMap, checkedSet, id);
  const shouldCheck = currentState !== CheckboxState.CHECKED;

  if (node.isLeaf) {
    if (shouldCheck) {
      next.add(id);
    } else {
      next.delete(id);
    }

    return next;
  }

  const targetLeafIds = getLeafDescendantIds(nodeMap, id);

  targetLeafIds.forEach((leafId) => {
    const leafNode = nodeMap.get(leafId);

    if (!leafNode || leafNode.disabled) {
      return;
    }

    if (shouldCheck) {
      next.add(leafId);
    } else {
      next.delete(leafId);
    }
  });

  return next;
};

export const toggleExpandedState = (
  nodeMap: Map<string, FlattenNode>,
  expandedSet: Set<string>,
  id: string,
): Set<string> => {
  const next = new Set(expandedSet);
  const node = nodeMap.get(id);

  if (!node || !node.isParent || node.disabled) {
    return next;
  }

  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }

  return next;
};

export const getExpandableNodeIds = (flatNodes: FlattenNode[]): string[] => {
  return flatNodes.filter((node) => node.isParent).map((node) => node.id);
};

export const toIdList = (set: Set<string>): string[] => {
  return Array.from(set);
};

export const toNodeMeta = (node: FlattenNode): TreeNodeMeta => {
  return {
    id: node.id,
    label: node.label,
    helpfulMessage: node.helpfulMessage,
    disabled: node.disabled,
    invalid: node.invalid,
    icon: node.icon,
    isParent: node.isParent,
    isLeaf: node.isLeaf,
    level: node.level,
    index: node.index,
    posInSet: node.posInSet,
    setSize: node.setSize,
    childCount: node.childCount,
    parentId: node.parentId,
  };
};

export const runLabelAction = ({
  id,
  isParent,
  disabled,
  labelAction,
  onCheck,
  onExpand,
  onClick,
}: RunLabelActionArgs): void => {
  if (disabled) {
    return;
  }

  if (labelAction === "check") {
    onCheck?.(id);
    return;
  }

  if (labelAction === "expand") {
    if (isParent) {
      onExpand(id);
      return;
    }

    onClick(id);
    return;
  }

  onClick(id);
};

export const getFirstChildId = (
  flatNodes: FlattenNode[],
  parentId: string,
): string | undefined => {
  return flatNodes.find((node) => node.parentId === parentId)?.id;
};

export const hasCustomParentIcons = (
  parentExpanded?: React.ReactNode,
  parentCollapsed?: React.ReactNode,
): boolean => {
  return Boolean(parentExpanded || parentCollapsed);
};
