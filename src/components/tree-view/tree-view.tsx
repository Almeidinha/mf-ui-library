import { Margin, Padding } from "@foundations";
import { Card } from "components/card";
import { Button } from "components/molecules/button";
import React, { JSX, useId, useMemo, useState } from "react";
import styled from "styled-components";

import { TreeNode } from "./components/tree-node";
import {
  createNodeMap,
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
} from "./helper";
import {
  CheckboxState,
  CheckNodePayload,
  ClickNodePayload,
  ExpandNodePayload,
  FlattenNode,
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

function useControllableListState(
  controlledValue: string[] | undefined,
  defaultValue: string[] | undefined,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
    defaultValue ?? [],
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = (next: string[]) => {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
  };

  return [value, setValue] as const;
}

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
  onExpand,
  onNodeClick,
  onNodeFocus,
  renderNodeContent,
  icons,
  showExpandAllControls = false,
  expandAllLabel = "Expand all",
  collapseAllLabel = "Collapse all",
  labelAction,
  isRichTreeView = true,
  ...rest
}: TreeViewProps) => {
  const treeId = useId();
  const isRich = isRichTreeView !== false;

  const checkedList = isRich ? rest.checkedList : undefined;
  const defaultCheckedList = isRich ? rest.defaultCheckedList : undefined;
  const onCheck = isRich ? rest.onCheck : undefined;

  const resolvedLabelAction = labelAction ?? (isRich ? "expand" : "expand");

  const [checkedIds, setCheckedIds] = useControllableListState(
    checkedList,
    defaultCheckedList,
  );
  const [expandedIds, setExpandedIds] = useControllableListState(
    expanded,
    defaultExpanded,
  );

  const flatNodes = useMemo<FlattenNode[]>(() => flattenNodes(nodes), [nodes]);
  const nodeMap = useMemo(() => createNodeMap(flatNodes), [flatNodes]);

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);
  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);

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

  const handleExpand = (id: string) => {
    const node = nodeMap.get(id);

    if (!node || node.disabled || !node.isParent || expandDisabled) {
      return;
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
      disabled: node.disabled,
      labelAction: resolvedLabelAction,
      onCheck: isRich ? handleCheck : undefined,
      onExpand: handleExpand,
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
          handleExpand(id);
          return;
        }

        if (node.isParent && isNodeExpanded(expandedSet, id)) {
          focusById(getFirstChildId(flatNodes, id));
        }
        break;

      case "ArrowLeft":
        event.preventDefault();

        if (node.isParent && isNodeExpanded(expandedSet, id)) {
          handleExpand(id);
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
          tabIndex={focused ? 0 : -1}
          describedById={
            node.helpfulMessage ? `${treeId}-message-${node.id}` : undefined
          }
          defaultIcons={icons}
          onCheck={isRich ? handleCheck : undefined}
          onExpand={handleExpand}
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

  if (!nodes.length) {
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
