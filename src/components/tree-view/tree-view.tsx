import { Margin, Padding } from "@foundations";
import { Card } from "components/card";
import { Button } from "components/molecules/button";
import { useControllableState } from "hooks/useControllableState";
import React, { JSX, useEffect, useId, useMemo, useState } from "react";
import styled from "styled-components";

import { TreeNode } from "./components/tree-node";
import {
  createNodeMap,
  findTreeNode,
  flattenNodes,
  getExpandableNodeIds,
  getFirstChildId,
  getNodeCheckState,
  getVisibleNodeIds,
  isNodeExpanded,
  runLabelAction,
  toggleCheckedState,
  toggleExpandedState,
  toIdList,
  toNodeMeta,
  updateNodeChildren,
} from "./helper";
import {
  CheckboxState,
  CheckNodePayload,
  ClickNodePayload,
  ExpandNodePayload,
  FlattenNode,
  TreeNodeData,
  TreeViewProps,
} from "./types";

const RootTree = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: ${Margin.none};
  padding-left: ${Padding.none};
  list-style: none;
`;

const Container = styled.div<{ $useCardContainer: boolean }>`
  display: block;
  margin: ${Margin.none};
  padding: ${({ $useCardContainer }) =>
    $useCardContainer ? Padding.none : Padding.xs};
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${Margin.s};
`;

export const TreeView = ({
  nodes,
  className,
  title,
  ariaLabel,
  useCardContainer = true,
  showChildCount = false,
  expandDisabled = false,
  expanded,
  defaultExpanded = [],
  icons,
  checkedList: propCheckList,
  defaultCheckedList: propDefaultCheckedList,
  isRichTreeView,
  showExpandAllControls = false,
  expandAllLabel = "Expand all",
  labelAction,
  collapseAllLabel = "Collapse all",
  loadChildren,
  onExpand,
  onNodeClick,
  onNodeFocus,
  renderNodeContent,
  onLoadChildrenError,
  onLoadChildrenStart,
  onLoadChildrenEnd,
  onCheck: propOnCheck,
}: TreeViewProps) => {
  const treeId = useId();
  const isRich = isRichTreeView !== false;

  const checkedList = isRich ? propCheckList : undefined;
  const defaultCheckedList = isRich ? propDefaultCheckedList : undefined;
  const onCheck = isRich ? propOnCheck : undefined;
  const resolvedLabelAction = labelAction ?? "expand";

  const [treeNodes, setTreeNodes] = useState<TreeNodeData[]>(nodes);
  const [loadingNodeIds, setLoadingNodeIds] = useState<string[]>([]);
  const [failedNodeIds, setFailedNodeIds] = useState<string[]>([]);

  useEffect(() => {
    setTreeNodes(nodes);
    setLoadingNodeIds([]);
    setFailedNodeIds([]);
  }, [nodes]);

  const [checkedIds, setCheckedIds] = useControllableState<string[], false>({
    value: checkedList,
    defaultValue: defaultCheckedList ?? [],
    readOnly: true,
  });

  const [expandedIds, setExpandedIds] = useControllableState<string[], false>({
    value: expanded,
    defaultValue: defaultExpanded ?? [],
    readOnly: true,
  });

  const flatNodes = useMemo<FlattenNode[]>(
    () => flattenNodes(treeNodes),
    [treeNodes],
  );

  const nodeMap = useMemo(() => createNodeMap(flatNodes), [flatNodes]);

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);
  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);
  const loadingNodeIdSet = useMemo(
    () => new Set(loadingNodeIds),
    [loadingNodeIds],
  );
  const failedNodeIdSet = useMemo(
    () => new Set(failedNodeIds),
    [failedNodeIds],
  );

  const visibleIds = useMemo(
    () => getVisibleNodeIds(flatNodes, expandedSet, nodeMap),
    [flatNodes, expandedSet, nodeMap],
  );

  const expandableIds = useMemo(
    () => getExpandableNodeIds(flatNodes),
    [flatNodes],
  );

  const childrenByParentId = useMemo(() => {
    const map = new Map<string | undefined, FlattenNode[]>();

    flatNodes.forEach((node) => {
      const key = node.parentId;
      const current = map.get(key) ?? [];
      current.push(node);
      map.set(key, current);
    });

    return map;
  }, [flatNodes]);

  const allExpanded =
    expandableIds.length > 0 &&
    expandableIds.every((id) => expandedSet.has(id));

  const firstVisibleId = visibleIds[0];
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined);

  const visibleIdSet = useMemo(() => new Set(visibleIds), [visibleIds]);

  const effectiveFocusedId =
    focusedId && visibleIdSet.has(focusedId) ? focusedId : firstVisibleId;

  const emitCheck = (payload: CheckNodePayload, nextCheckedIds: string[]) => {
    onCheck?.(nextCheckedIds, payload);
  };

  const emitExpand = (
    payload: ExpandNodePayload,
    nextExpandedIds: string[],
  ) => {
    onExpand?.(nextExpandedIds, payload);
  };

  const emitClick = (payload: ClickNodePayload) => {
    onNodeClick?.(payload);
  };

  const handleCheck = (id: string) => {
    if (!isRich) {
      return;
    }

    const node = nodeMap.get(id);

    if (!node || node.disabled) {
      return;
    }

    const nextCheckedSet = toggleCheckedState(nodeMap, checkedSet, id);
    const nextCheckedIds = toIdList(nextCheckedSet);
    const nextState = getNodeCheckState(nodeMap, nextCheckedSet, id);

    setCheckedIds(nextCheckedIds);

    emitCheck(
      {
        id: node.id,
        label: node.label,
        checked: nextState === CheckboxState.CHECKED,
      },
      nextCheckedIds,
    );
  };

  const handleExpand = async (id: string) => {
    const node = nodeMap.get(id);

    if (
      !node ||
      node.disabled ||
      loadingNodeIdSet.has(id) ||
      !node.isParent ||
      expandDisabled
    ) {
      return;
    }

    const isExpanded = expandedSet.has(id);

    if (
      !isExpanded &&
      loadChildren &&
      node.hasChildren &&
      node.children.length === 0
    ) {
      const sourceNode = findTreeNode(treeNodes, id);

      if (sourceNode) {
        setFailedNodeIds((prev) => prev.filter((nodeId) => nodeId !== id));
        setLoadingNodeIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        onLoadChildrenStart?.(sourceNode);

        try {
          const loadedChildren = await loadChildren(sourceNode);

          setTreeNodes((prev) => updateNodeChildren(prev, id, loadedChildren));
          onLoadChildrenEnd?.(sourceNode, "success");
        } catch (error) {
          setFailedNodeIds((prev) =>
            prev.includes(id) ? prev : [...prev, id],
          );
          onLoadChildrenError?.(sourceNode, error);
          onLoadChildrenEnd?.(sourceNode, "error");
          return;
        } finally {
          setLoadingNodeIds((prev) => prev.filter((nodeId) => nodeId !== id));
        }
      }
    }

    const nextExpandedSet = toggleExpandedState(nodeMap, expandedSet, id);
    const nextExpandedIds = toIdList(nextExpandedSet);
    const nextExpanded = nextExpandedSet.has(id);

    setExpandedIds(nextExpandedIds);

    emitExpand(
      {
        id: node.id,
        label: node.label,
        expanded: nextExpanded,
      },
      nextExpandedIds,
    );
  };

  const handleExpandAll = () => {
    if (expandDisabled) {
      return;
    }

    const nextExpandedIds = expandableIds;
    setExpandedIds(nextExpandedIds);
    onExpand?.(nextExpandedIds);
  };

  const handleCollapseAll = () => {
    const nextExpandedIds: string[] = [];
    setExpandedIds(nextExpandedIds);
    onExpand?.(nextExpandedIds);
  };

  const handleClick = (id: string) => {
    const node = nodeMap.get(id);

    if (!node || node.disabled) {
      return;
    }

    setFocusedId(id);

    emitClick({
      id: node.id,
      label: node.label,
    });
  };

  const handleLabelAction = (id: string) => {
    const node = nodeMap.get(id);

    if (!node) {
      return;
    }

    runLabelAction({
      id,
      isParent: node.isParent,
      disabled: node.disabled || loadingNodeIdSet.has(id),
      labelAction: resolvedLabelAction,
      onCheck: isRich ? handleCheck : undefined,
      onExpand: (nodeId) => {
        void handleExpand(nodeId);
      },
      onClick: handleClick,
    });
  };

  const handleFocus = (id: string) => {
    const node = nodeMap.get(id);

    if (!node) {
      return;
    }

    setFocusedId(id);

    onNodeFocus?.({
      id: node.id,
      label: node.label,
    });
  };

  const focusById = (id: string | undefined) => {
    if (!id) {
      return;
    }

    setFocusedId(id);

    requestAnimationFrame(() => {
      const element = document.getElementById(`${treeId}-row-${id}`);

      if (element instanceof HTMLElement) {
        element.focus();
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    const currentIndex = visibleIds.indexOf(id);
    const node = nodeMap.get(id);

    if (!node) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusById(visibleIds[currentIndex + 1] ?? id);
        break;

      case "ArrowUp":
        event.preventDefault();
        focusById(visibleIds[currentIndex - 1] ?? id);
        break;

      case "Home":
        event.preventDefault();
        focusById(visibleIds[0]);
        break;

      case "End":
        event.preventDefault();
        focusById(visibleIds[visibleIds.length - 1]);
        break;

      case "ArrowRight":
        event.preventDefault();

        if (
          node.isParent &&
          !isNodeExpanded(expandedSet, id) &&
          !expandDisabled
        ) {
          void handleExpand(id);
          return;
        }

        if (node.isParent && isNodeExpanded(expandedSet, id)) {
          focusById(getFirstChildId(flatNodes, id));
        }
        break;

      case "ArrowLeft":
        event.preventDefault();

        if (node.isParent && isNodeExpanded(expandedSet, id)) {
          void handleExpand(id);
          return;
        }

        if (node.parentId) {
          focusById(node.parentId);
        }
        break;

      case "Enter":
        event.preventDefault();
        handleLabelAction(id);
        break;

      case " ":
        event.preventDefault();

        if (isRich) {
          handleCheck(id);
        } else {
          handleLabelAction(id);
        }
        break;

      default:
        break;
    }
  };

  const renderTreeNodes = (parentId?: string): JSX.Element[] => {
    const siblingNodes = childrenByParentId.get(parentId) ?? [];

    return siblingNodes.map((node) => {
      const expanded = isNodeExpanded(expandedSet, node.id);
      const checkState = isRich
        ? getNodeCheckState(nodeMap, checkedSet, node.id)
        : undefined;
      const focused = effectiveFocusedId === node.id;
      const isLoading = loadingNodeIdSet.has(node.id);
      const hasLoadError = failedNodeIdSet.has(node.id);

      return (
        <TreeNode
          key={node.id}
          treeId={treeId}
          node={toNodeMeta(node)}
          expanded={expanded}
          checkState={checkState}
          expandDisabled={expandDisabled}
          showChildCount={showChildCount}
          focused={focused}
          isLoading={isLoading}
          hasLoadError={hasLoadError}
          tabIndex={focused ? 0 : -1}
          describedById={
            node.helpfulMessage ? `${treeId}-message-${node.id}` : undefined
          }
          defaultIcons={icons}
          onCheck={isRich ? handleCheck : undefined}
          onExpand={(nodeId) => {
            void handleExpand(nodeId);
          }}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          renderNodeContent={renderNodeContent}
          labelAction={resolvedLabelAction}
          isRichTreeView={isRich}
        >
          {node.isParent && expanded ? renderTreeNodes(node.id) : null}
        </TreeNode>
      );
    });
  };

  if (!treeNodes.length) {
    return null;
  }

  const tree = (
    <Container className={className} $useCardContainer={useCardContainer}>
      {showExpandAllControls ? (
        <Controls>
          <Button
            type="button"
            subtle
            disabled={expandDisabled || allExpanded}
            onClick={handleExpandAll}
          >
            {expandAllLabel}
          </Button>

          <Button
            type="button"
            subtle
            disabled={expandableIds.length === 0 || expandedIds.length === 0}
            onClick={handleCollapseAll}
          >
            {collapseAllLabel}
          </Button>
        </Controls>
      ) : null}

      <RootTree role="tree" aria-label={ariaLabel ?? title ?? "Tree view"}>
        {renderTreeNodes(undefined)}
      </RootTree>
    </Container>
  );

  return useCardContainer ? (
    <Card heading={title}>
      <Card.Section>{tree}</Card.Section>
    </Card>
  ) : (
    tree
  );
};
