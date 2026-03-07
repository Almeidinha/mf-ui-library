import { Tag } from "components/tag";
import { Padding } from "foundation/spacing";
import { JSX, memo } from "react";
import styled from "styled-components";

import { IValueComponentMultiProps, SelectLabelComponent } from "../types";
import { SelectLabel } from "./helpers";

const TagContainer = styled(Tag)`
  height: 20px;
  div:first-child {
    min-height: auto;
    padding: ${Padding.none} ${Padding.none} ${Padding.none} ${Padding.xxs};
  }
  div:last-child {
    padding: ${Padding.none};
  }
`;

// eslint-disable-next-line comma-spacing
const ValueComponentMultiImpl = <T,>(props: IValueComponentMultiProps<T>) => {
  const { option, onRemove, labelComponent = SelectLabel } = props;

  const LabelComponent: SelectLabelComponent<T> = labelComponent;

  const className = ["value-multi", props.className].filter(Boolean).join(" ");

  return (
    <TagContainer
      className={className}
      closable
      onClose={() => onRemove(option.value)}
    >
      <LabelComponent
        value={option.value}
        type="value-multi"
        active
        default
        disabled={option.disabled}
        label={option.label}
        icon={option.icon}
      >
        {option.label}
      </LabelComponent>
    </TagContainer>
  );
};

export default memo(ValueComponentMultiImpl) as <T>(
  props: IValueComponentMultiProps<T>,
) => JSX.Element;
