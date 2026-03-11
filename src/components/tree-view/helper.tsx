import { safeArray } from "helpers/safe-navigation";
import type { ReactNode } from "react";

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
    const hasChildren = Boolean(node.hasChildren) || children.length > 0;
    const isParent = hasChildren;

    const flattenedNode: FlattenNode = {
      id: node.id,
      label: node.label,
      helpfulMessage: node.helpfulMessage,
      disabled: Boolean(node.disabled),
      invalid: Boolean(node.invalid),
      icon: node.icon,
      hasChildren,
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

    if (children.length > 0) {
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

export const findTreeNode = (
  nodes: TreeNodeData[],
  id: string,
): TreeNodeData | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    const children = safeArray(node.children);

    if (children.length > 0) {
      const found = findTreeNode(children, id);

      if (found) {
        return found;
      }
    }
  }

  return undefined;
};

export const updateNodeChildren = (
  nodes: TreeNodeData[],
  parentId: string,
  children: TreeNodeData[],
): TreeNodeData[] => {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        hasChildren: children.length > 0,
        children,
      };
    }

    const nestedChildren = safeArray(node.children);

    if (nestedChildren.length === 0) {
      return node;
    }

    return {
      ...node,
      children: updateNodeChildren(nestedChildren, parentId, children),
    };
  });
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
    hasChildren: node.hasChildren,
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
  parentExpanded?: ReactNode,
  parentCollapsed?: ReactNode,
): boolean => {
  return Boolean(parentExpanded || parentCollapsed);
};
