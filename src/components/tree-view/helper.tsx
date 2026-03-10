import { defaultTo, is, isDefined, isEmpty, isNil, safeArray } from "@helpers";

import { CheckboxState, FlattenNodeProps, NodeProps } from "./types";

export const flattenNodes = (
  flattenList: FlattenNodeProps[],
  nodes: NodeProps[],
  parent?: NodeProps,
  depth = 0,
): void => {
  safeArray(nodes).forEach((node, index) => {
    const isParent = nodeHasChildren(node);

    flattenList.push({
      label: node.label,
      value: node.value,
      children: node.children,
      parent,
      isChild: isDefined(parent) && isDefined(parent.value),
      isParent,
      isLeaf: !isParent,
      disabled: getDisabledState(node, parent),
      treeDepth: depth,
      index,
      checked: false,
      checkState: 0,
      expanded: false,
    });
    flattenNodes(flattenList, safeArray(node.children), node, depth + 1);
  });
};

export const getNode = (
  nodes: FlattenNodeProps[],
  value: string,
): FlattenNodeProps | undefined => {
  return nodes.find((node) => node.value === value);
};

const nodeHasChildren = (node: NodeProps): boolean => {
  return (
    isDefined(node.children) &&
    Array.isArray(node.children) &&
    !isEmpty(node.children)
  );
};

const getDisabledState = (node: NodeProps, parent?: NodeProps): boolean => {
  if (isDefined(parent) && is(parent.disabled)) {
    return true;
  }

  return is(node.disabled);
};

export const deserializeList = (
  flatNodes: FlattenNodeProps[],
  lists: {
    checked: string[];
    expanded: string[];
  },
): void => {
  flatNodes.forEach((flatNode) => {
    if (lists.checked.includes(flatNode.value)) {
      flatNode.checked = true;

      if (flatNode.isParent) {
        checkAllChildren(flatNodes, flatNode);
      }
    }
    if (lists.expanded.includes(flatNode.value)) {
      flatNode.expanded = true;
    }
  });
};

const checkAllChildren = (
  flatNodes: FlattenNodeProps[],
  flatNode: FlattenNodeProps,
): void => {
  defaultTo(flatNode.children, []).forEach((node: NodeProps) => {
    const _flatoNode = getNode(flatNodes, node.value);
    if (isDefined(_flatoNode)) {
      _flatoNode.checked = true;
    }
  });
};

export const serializeList = (
  flatNodes: FlattenNodeProps[],
  key: string,
): string[] => {
  const list: string[] = [];

  flatNodes.forEach((node: FlattenNodeProps) => {
    if (key === "expanded") {
      if (node.expanded) {
        list.push(node.value);
      }
    }

    if (key === "checked") {
      if (node.checked) {
        list.push(node.value);
      }
    }
  });

  return list;
};

export const expandAllNodes = (
  flatNodes: FlattenNodeProps[],
  expand: boolean,
): void => {
  flatNodes.forEach((node: FlattenNodeProps) => {
    if (node.isParent) {
      node.expanded = expand;
    }
  });
};

export const toggleChecked = (
  flatNodes: FlattenNodeProps[],
  node: NodeProps,
  isChecked: boolean,
): void => {
  const flatNode = getNode(flatNodes, node.value);

  if (isNil(flatNode)) {
    return;
  }

  if (flatNode.isLeaf) {
    if (is(node.disabled)) {
      return;
    }

    toggleNode(flatNodes, node.value, "checked", isChecked);
  } else {
    if (isDefined(flatNode.children) && flatNode.children.length === 0) {
      toggleNode(flatNodes, node.value, "checked", isChecked);
    }

    safeArray(flatNode.children).forEach((child: NodeProps) => {
      toggleChecked(flatNodes, child, isChecked);
    });
  }
};

export const toggleNode = (
  flatNodes: FlattenNodeProps[],
  nodeValue: string,
  key: string,
  toggleValue: boolean,
): void => {
  const node = flatNodes.find(
    (_node: FlattenNodeProps) => _node.value === nodeValue,
  );

  if (isDefined(node)) {
    key === "checked"
      ? (node.checked = toggleValue)
      : (node.expanded = toggleValue);
  }
};

export const getNodeCheckState = (
  flattenNodeList: FlattenNodeProps[],
  node: NodeProps,
): CheckboxState => {
  const flatNode = getNode(flattenNodeList, node.value);

  if (
    is(flatNode?.isLeaf) ||
    (isDefined(node.children) && node.children.length === 0)
  ) {
    return is(flatNode?.checked)
      ? CheckboxState.CHECKED
      : CheckboxState.UNCHECKED;
  }

  if (is(isEveryChildChecked(flattenNodeList, node))) {
    return CheckboxState.CHECKED;
  }

  if (is(isSomeChildChecked(flattenNodeList, node))) {
    return CheckboxState.INDETERMINATE;
  }

  return CheckboxState.UNCHECKED;
};

const isEveryChildChecked = (
  flattenNodeList: FlattenNodeProps[],
  node: NodeProps,
): boolean => {
  return safeArray(node.children).every((child: NodeProps) => {
    const _node = getNode(flattenNodeList, child.value);
    return isDefined(_node) && _node.checkState === 1;
  });
};

const isSomeChildChecked = (
  flattenNodeList: FlattenNodeProps[],
  node: NodeProps,
): boolean => {
  return safeArray(node.children).some((child: NodeProps) => {
    const _node = getNode(flattenNodeList, child.value);
    return isDefined(_node) && _node.checkState > 0;
  });
};
