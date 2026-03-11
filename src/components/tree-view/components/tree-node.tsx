import { Checkbox } from "components/checkbox";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { Label } from "components/typography";
import { Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import React from "react";
import styled, { css } from "styled-components";

import { hasCustomParentIcons, runLabelAction } from "../helper";
import { CheckboxState, TreeItemProps } from "../types";

const ListItem = styled.li<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.75;
    `}
`;

const ItemWrapper = styled(Flex)<{
  $focused: boolean;
  $disabled: boolean;
  $level: number;
}>`
  align-items: center;
  gap: 8px;
  padding: ${Padding.xxs};
  padding-left: ${({ $level }) => 24 * ($level - 1)}px;
  border-radius: 4px;
  background: ${({ $focused }) =>
    $focused ? Surface.Selected.Default : "transparent"};

  ${({ $disabled, $focused }) =>
    !$disabled &&
    css`
      &:hover {
        background: ${$focused
          ? Surface.Selected.Hover
          : Surface.Default.Hover};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const ItemMain = styled.div`
  display: flex;
  padding-left: ${Padding.xxs};
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const LabelButton = styled.button<{ $interactive: boolean }>`
  all: unset;
  flex: 1;
  min-width: 0;
  cursor: ${({ $interactive }) => ($interactive ? "pointer" : "default")};
`;

const NodeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

const CollapseButton = styled(Button)`
  align-self: center;
  border: 0;
  padding: ${Padding.none};
  gap: 0;
  min-width: 20px;
  background: transparent;

  &:hover {
    background: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const HelpfulMessage = styled(Label)`
  display: block;
  margin-left: ${Margin.xl};
  user-select: none;
`;

const ChildGroup = styled.ol`
  margin: ${Margin.xs} 0 0 0;
  padding: ${Padding.none};
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TreeNode = ({
  treeId,
  node,
  expanded,
  checkState,
  expandDisabled,
  showChildCount,
  focused,
  tabIndex,
  describedById,
  children,
  defaultIcons,
  onCheck,
  onExpand,
  onClick,
  onFocus,
  onKeyDown,
  renderNodeContent,
  labelAction,
  isRichTreeView,
}: TreeItemProps) => {
  const checkboxChecked =
    checkState === CheckboxState.INDETERMINATE
      ? undefined
      : checkState === CheckboxState.CHECKED;

  const checkboxIndeterminate =
    checkState === CheckboxState.INDETERMINATE ? true : undefined;

  const treeItemId = `${treeId}-treeitem-${node.id}`;
  const rowId = `${treeId}-row-${node.id}`;
  const labelId = `${treeId}-label-${node.id}`;
  const messageId = describedById ?? `${treeId}-message-${node.id}`;

  const displayText =
    showChildCount && node.isParent
      ? `${node.label} (${node.childCount})`
      : node.label;

  const resolvedIcon = node.icon
    ? node.icon
    : node.isLeaf
      ? defaultIcons?.leaf
      : expanded
        ? defaultIcons?.parentExpanded
        : defaultIcons?.parentCollapsed;

  const showLeftDisclosure =
    !isRichTreeView &&
    node.isParent &&
    !hasCustomParentIcons(
      defaultIcons?.parentExpanded,
      defaultIcons?.parentCollapsed,
    );

  const showRightDisclosure = isRichTreeView && node.isParent;

  const handleLabelClick = () => {
    runLabelAction({
      id: node.id,
      isParent: node.isParent,
      disabled: node.disabled,
      labelAction,
      onCheck,
      onExpand,
      onClick,
    });
  };

  const handleExpand = (event?: React.MouseEvent) => {
    event?.stopPropagation();

    if (node.disabled || expandDisabled || !node.isParent) {
      return;
    }

    onExpand(node.id);
  };

  const content = renderNodeContent?.({
    node,
    expanded,
    checkState,
    focused,
  }) ?? <Label>{displayText}</Label>;

  const disclosureIcon = expanded
    ? IconMinor.ChevronDownSolid
    : IconMinor.ChevronRightSolid;

  return (
    <ListItem
      role="treeitem"
      id={treeItemId}
      aria-labelledby={labelId}
      aria-describedby={node.helpfulMessage ? messageId : undefined}
      aria-disabled={node.disabled || undefined}
      aria-expanded={node.isParent ? expanded : undefined}
      aria-checked={
        isRichTreeView
          ? checkState === CheckboxState.INDETERMINATE
            ? "mixed"
            : checkState === CheckboxState.CHECKED
          : undefined
      }
      aria-level={node.level}
      aria-posinset={node.posInSet}
      aria-setsize={node.setSize}
      $disabled={node.disabled}
    >
      <ItemWrapper
        id={rowId}
        $level={node.level}
        $focused={focused}
        $disabled={node.disabled}
        tabIndex={tabIndex}
        onFocus={() => onFocus(node.id)}
        onKeyDown={(event) => onKeyDown(event, node.id)}
      >
        {showLeftDisclosure ? (
          <CollapseButton
            tabIndex={-1}
            subtle
            type="button"
            disabled={node.disabled || expandDisabled}
            onClick={handleExpand}
            aria-label={expanded ? "Collapse node" : "Expand node"}
            aria-controls={`${treeId}-group-${node.id}`}
            IconSuffix={disclosureIcon}
          />
        ) : null}

        <ItemMain>
          {isRichTreeView ? (
            <Checkbox
              tabIndex={-1}
              checked={checkboxChecked}
              indeterminate={checkboxIndeterminate}
              disabled={node.disabled}
              error={node.invalid}
              id={`${treeId}-checkbox-${node.id}`}
              onClick={() => onCheck?.(node.id)}
              onChange={() => void 0}
              aria-labelledby={labelId}
              aria-describedby={node.helpfulMessage ? messageId : undefined}
            />
          ) : null}

          {resolvedIcon ? (
            <NodeIcon aria-hidden>{resolvedIcon}</NodeIcon>
          ) : null}

          <LabelButton
            tabIndex={-1}
            id={labelId}
            type="button"
            $interactive={!node.disabled}
            onClick={handleLabelClick}
          >
            {content}
          </LabelButton>
        </ItemMain>

        {showRightDisclosure ? (
          <CollapseButton
            tabIndex={-1}
            subtle
            type="button"
            disabled={node.disabled || expandDisabled}
            onClick={handleExpand}
            aria-label={expanded ? "Collapse node" : "Expand node"}
            aria-controls={`${treeId}-group-${node.id}`}
            IconSuffix={disclosureIcon}
          />
        ) : null}
      </ItemWrapper>

      {node.helpfulMessage ? (
        <HelpfulMessage subdued id={messageId}>
          {node.helpfulMessage}
        </HelpfulMessage>
      ) : null}

      {node.isParent && expanded ? (
        <ChildGroup role="group" id={`${treeId}-group-${node.id}`}>
          {children}
        </ChildGroup>
      ) : null}
    </ListItem>
  );
};
