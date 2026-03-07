import { forwardRef, isDefined, isEmpty, Nothing } from "@helpers";
import type { CheckboxProps } from "components/checkbox";
import { Checkbox } from "components/checkbox";
import { Label } from "components/typography";
import { Margin } from "foundation/spacing";
import React from "react";
import styled from "styled-components";

const Text = styled(Label)`
  margin-left: ${Margin.xs};
  user-select: none;
  flex: 1;
`;

const Wrapper = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
`;

export type InputCheckboxProps = CheckboxProps & {
  label: string;
};

const InputCheckboxImpl = (
  props: InputCheckboxProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const { label = "", name, ...rest } = props;

  if (isEmpty(label)) {
    return <Nothing />;
  }

  return (
    <Wrapper>
      <Checkbox {...rest} ref={ref} name={isDefined(name) ? name : label} />
      <Text>{label}</Text>
    </Wrapper>
  );
};

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  InputCheckboxImpl,
);

InputCheckbox.displayName = "InputCheckbox";
