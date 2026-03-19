import { Checkbox } from "components/checkbox";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { Spinner } from "components/spinner";
import { Collapse } from "components/transitions";
import { Label } from "components/typography";
import { Focus, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { is, isDefined } from "helpers/safe-navigation";
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
  $hasLoadError: boolean;
}>`
  align-items: center;
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

      &:focus-visible {
        outline: 2px solid ${Focus.Default};
        outline-offset: -2px;
        border-radius: 4px;
      }
    `}
`;

const ItemMain = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${Padding.xxs};
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

const HelpfulMessage = styled(Label)<{ $level: number }>`
  display: block;
  margin-left: ${({ $level }) => $level * 24}px;
  user-select: none;
`;

const ChildGroup = styled.ol`
  padding: ${Padding.none};
  padding-top: ${Margin.xxs};
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
  isLoading,
  hasLoadError,
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
  const errorMessageId = `${treeId}-load-error-${node.id}`;

  const displayText =
    showChildCount && node.isParent
      ? `${node.label} (${node.childCount})`
      : node.label;

  const hasCustomIcons = hasCustomParentIcons(
    defaultIcons?.parentExpanded,
    defaultIcons?.parentCollapsed,
  );

  const resolvedIcon =
    isLoading && node.isParent && hasCustomIcons ? (
      <Spinner aria-hidden />
    ) : node.icon ? (
      node.icon
    ) : node.isLeaf ? (
      defaultIcons?.leaf
    ) : expanded ? (
      defaultIcons?.parentExpanded
    ) : (
      defaultIcons?.parentCollapsed
    );

  const showLeftDisclosure =
    !isRichTreeView && node.isParent && !hasCustomIcons;

  const showRightDisclosure = isRichTreeView && node.isParent;

  const handleLabelClick = () => {
    runLabelAction({
      id: node.id,
      isParent: node.isParent,
      disabled: node.disabled || isLoading,
      labelAction,
      onCheck,
      onExpand,
      onClick,
    });
  };

  const handleExpand = (event?: React.MouseEvent) => {
    event?.stopPropagation();

    if (node.disabled || isLoading || expandDisabled || !node.isParent) {
      return;
    }

    onExpand(node.id);
  };

  const content = renderNodeContent?.({
    node,
    expanded,
    checkState,
    focused,
    isLoading,
    hasLoadError,
  }) ?? <Label>{displayText}</Label>;

  const disclosureIcon = expanded
    ? IconMinor.ChevronDownSolid
    : IconMinor.ChevronRightSolid;

  return (
    <ListItem
      role="treeitem"
      id={treeItemId}
      aria-labelledby={labelId}
      aria-describedby={
        node.helpfulMessage
          ? messageId
          : hasLoadError
            ? errorMessageId
            : undefined
      }
      aria-disabled={node.disabled || undefined}
      aria-expanded={node.isParent ? expanded : undefined}
      aria-busy={isLoading || undefined}
      aria-invalid={hasLoadError || undefined}
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
        $hasLoadError={hasLoadError}
        tabIndex={tabIndex}
        onFocus={() => onFocus(node.id)}
        onKeyDown={(event) => onKeyDown(event, node.id)}
      >
        <If is={showLeftDisclosure}>
          <CollapseButton
            tabIndex={-1}
            subtle
            loading={isLoading}
            type="button"
            disabled={node.disabled || isLoading || expandDisabled}
            onClick={handleExpand}
            aria-label={
              isLoading
                ? "Loading children"
                : expanded
                  ? "Collapse node"
                  : "Expand node"
            }
            aria-controls={`${treeId}-group-${node.id}`}
            IconSuffix={disclosureIcon}
          />
        </If>

        <ItemMain>
          <If is={isRichTreeView}>
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
          </If>
          <If is={isDefined(resolvedIcon)}>
            <NodeIcon aria-hidden>{resolvedIcon}</NodeIcon>
          </If>

          <LabelButton
            tabIndex={-1}
            id={labelId}
            type="button"
            $interactive={!node.disabled && !isLoading}
            onClick={handleLabelClick}
          >
            {content}
          </LabelButton>
        </ItemMain>

        <If is={showRightDisclosure}>
          <CollapseButton
            tabIndex={-1}
            subtle
            type="button"
            loading={isLoading}
            disabled={node.disabled || isLoading || expandDisabled}
            onClick={handleExpand}
            aria-label={
              isLoading
                ? "Loading children"
                : expanded
                  ? "Collapse node"
                  : "Expand node"
            }
            aria-controls={`${treeId}-group-${node.id}`}
            IconSuffix={disclosureIcon}
          />
        </If>
      </ItemWrapper>

      <If is={isDefined(node.helpfulMessage)}>
        <HelpfulMessage muted id={messageId} $level={node.level}>
          {node.helpfulMessage}
        </HelpfulMessage>
      </If>

      <If is={hasLoadError}>
        <HelpfulMessage muted id={errorMessageId} $level={node.level}>
          Failed to load. Try expanding again.
        </HelpfulMessage>
      </If>

      <Collapse
        in={is(node.isParent && expanded)}
        animateOpacity={false}
        timeout={{ enter: 120, exit: 100 }}
      >
        <ChildGroup role="group" id={`${treeId}-group-${node.id}`}>
          {children}
        </ChildGroup>
      </Collapse>
    </ListItem>
  );
};
