import { Checkbox } from "components/checkbox";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { Label } from "components/typography";
import { Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { maybeRender } from "helpers/nothing";
import { is } from "helpers/safe-navigation";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import { CheckboxState, TreeNodeProps } from "../types";

const ListItem = styled.li<{ disabled: boolean }>`
  & ol {
    margin-top: ${Margin.xs};
  }
  ${({ disabled }) =>
    is(disabled) &&
    css`
      opacity: 0.75;
      cursor: not-allowed;
    `}
`;

const ItemWrapper = styled(Flex)`
  align-items: center;
  padding: ${Padding.xxxs} ${Padding.none};
  gap: 8px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const ClickableLabel = styled(Label)<{ $isParent: boolean }>`
  flex: 1;
  cursor: ${({ $isParent }) => ($isParent ? "pointer" : "initial")};
  &:hover {
    background: ${Surface.Default.Default};
  }

  &:focus {
    outline: 0;
    background: ${Surface.Default.Default};
  }
`;

const CollapseButton = styled(Button)`
  align-self: baseline;
  top: 10px;
  border: 0;
  cursor: pointer;
  padding: ${Padding.none};
  gap: 0;
  width: 8px;
  margin-left: auto;
  right: 8px;
  &:active {
    outline: none;
  }
`;

const InputWrapper = styled(Flex)`
  gap: 8px;
`;

const HelpfulMessage = styled(Label)`
  margin-left: ${Margin.xl};
  user-select: none;
`;

export const TreeNode: FC<PropsWithChildren<TreeNodeProps>> = (props) => {
  const { value, label, expanded } = props;

  const handleCheck = (): void => {
    const { onCheck } = props;
    onCheck({ label, value, checked: getCheckState({ toggle: true }) });
  };

  const handleClick = (): void => {
    const { onClick, isParent, expandDisabled } = props;

    if (isParent && !expandDisabled) {
      handleOnExpand();
    }
    onClick({ label, value, checked: getCheckState({ toggle: false }) });
  };

  const handleOnExpand = (): void => {
    const { onExpand } = props;
    onExpand({ value, label, expanded: !is(expanded) });
  };

  const getCheckState = ({ toggle }: { toggle: boolean }): boolean => {
    const { checkState } = props;

    if (checkState === Number(CheckboxState.UNCHECKED) && toggle) {
      return true;
    }

    if (checkState === Number(CheckboxState.CHECKED) && !toggle) {
      return true;
    }

    if (checkState === Number(CheckboxState.INDETERMINATE)) {
      return true;
    }

    return false;
  };

  const renderCollapseButton = (): ReactNode => {
    const { expandDisabled, isParent } = props;

    return maybeRender(
      isParent,
      <CollapseButton
        subtle
        disabled={expandDisabled}
        onClick={handleOnExpand}
        IconSuffix={
          expanded ? IconMinor.ChevronUpSolid : IconMinor.ChevronDownSolid
        }
      />,
    );
  };

  const renderCheckboxLabel = () => {
    const {
      checkState,
      disabled,
      treeId,
      childCount,
      isParent,
      invalid,
      showChildCount,
      helpfulMessage,
    } = props;

    const inputId = `${treeId}-${String(value).split(" ").join("_")}`;

    const displayText =
      showChildCount && isParent ? `${label} (${childCount})` : label;

    const checked =
      checkState === Number(CheckboxState.INDETERMINATE)
        ? undefined
        : checkState === Number(CheckboxState.CHECKED);

    return (
      <React.Fragment>
        <div>
          <InputWrapper center>
            <Checkbox
              checked={checked}
              indeterminate
              disabled={disabled}
              error={invalid}
              id={`input-${inputId}`}
              onClick={handleCheck}
              onChange={() => void 0}
            />
            <ClickableLabel
              $isParent={props.isParent}
              key={1}
              onClick={handleClick}
              role="link"
              tabIndex={0}
            >
              {displayText}
            </ClickableLabel>
          </InputWrapper>
          {maybeRender(
            helpfulMessage,
            <HelpfulMessage subdued id={`error-${inputId}`}>
              {helpfulMessage}
            </HelpfulMessage>,
          )}
        </div>
        {renderCollapseButton()}
      </React.Fragment>
    );
  };

  const { disabled } = props;

  return (
    <ListItem role="treeitem" disabled={disabled}>
      <ItemWrapper center>{renderCheckboxLabel()}</ItemWrapper>
      {expanded && props.children}
    </ListItem>
  );
};
