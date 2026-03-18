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

const Wrapper = styled.label<{ $fullWidth: boolean }>`
  display: flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  align-items: center;
`;

export type InputCheckboxProps = CheckboxProps & {
  label: string;
  fullWidth?: boolean;
};

const InputCheckboxImpl = (
  { label = "", fullWidth = true, name, ...rest }: InputCheckboxProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  if (isEmpty(label)) {
    return <Nothing />;
  }

  return (
    <Wrapper $fullWidth={fullWidth}>
      <Checkbox {...rest} ref={ref} name={isDefined(name) ? name : label} />
      <Text>{label}</Text>
    </Wrapper>
  );
};

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  InputCheckboxImpl,
);

InputCheckbox.displayName = "InputCheckbox";
