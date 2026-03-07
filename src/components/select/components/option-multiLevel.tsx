import { IconMinor } from "components/icon";
import { Label } from "components/typography";
import { Typography } from "foundation/typography";
import { If } from "helpers/nothing";
import { is, isNilOrEmpty } from "helpers/safe-navigation";
import { JSX, memo, useCallback } from "react";
import { areEqual } from "react-window";
import styled from "styled-components";

import { IOption, SelectLabelComponent } from "../types";
import { getOptionState } from "../utils";
import { CheckIcon, OptionItem } from "./helpers";

type OptionMultiLevelComponentProps<T> = {
  option: IOption<T>;
  active?: boolean;
  selected?: boolean;
  height?: number;
  search?: string;
  className?: string;
  labelComponent?: SelectLabelComponent<T>;
  onSelect: (value: T, option: IOption<T>) => void;
  onExpand?: (option: IOption<T>) => void;
  onReturn?: () => void;
  multi?: boolean;
};

const ParentLabel = styled.div`
  ${Typography.Label};
  text-align: left;
  width: 100%;
  font-weight: 700;
`;

// eslint-disable-next-line comma-spacing
const OptionMultiLevelComponentImp = <T,>(
  props: OptionMultiLevelComponentProps<T>,
) => {
  const { active, selected, labelComponent = Label, option, height } = props;

  const SelectLabel: SelectLabelComponent<T> = labelComponent;

  const onClick = useCallback(() => {
    if (is(option.isParent)) {
      props.onReturn?.();
    } else if (!isNilOrEmpty(option?.options)) {
      props.onExpand?.(option);
    } else {
      props.onSelect(option.value, option);
    }
  }, [option, props]);

  const className = [
    "option",
    props.className,
    is(selected) ? "selected" : "",
    is(active) ? "active" : "",
  ].filter(Boolean);

  return (
    <OptionItem
      className={className.join(" ")}
      data-role="option"
      center
      state={getOptionState(active, selected)}
      height={height}
      onClick={onClick}
    >
      <If is={is(option.isParent)}>
        <IconMinor.ChevronLeftSolid />
        <ParentLabel>{option.label}</ParentLabel>
      </If>

      <If is={!is(option.isParent)}>
        <SelectLabel type="option" active={is(active)} {...option}>
          {option.label}
        </SelectLabel>

        {is(active) && <CheckIcon />}
        {!isNilOrEmpty(option?.options) && <IconMinor.ChevronRightSolid />}
      </If>
    </OptionItem>
  );
};

export const OptionMultiLevelComponent = memo(
  OptionMultiLevelComponentImp,
  areEqual,
) as <T>(props: OptionMultiLevelComponentProps<T>) => JSX.Element;
