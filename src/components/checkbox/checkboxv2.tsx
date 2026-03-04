import {
  Actions,
  Borders,
  Focused,
  Interactive,
  Margin,
  Surface,
} from "@foundations";
import { useMergedRefs } from "hooks";
import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";

import { checkSvg, indeterminateSvg } from "./helpers";
import { CheckedState, useCheckbox } from "./useCheckbox";

export type CheckboxProps<T extends boolean = false> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked" | "onChange"
> & {
  error?: boolean;
  indeterminate?: T;
  checked?: CheckedState<T>;
  defaultChecked?: CheckedState<T>;
  onChange?: (next: CheckedState<T>) => void;
};

type CheckboxComponent = {
  <T extends boolean = false>(
    props: CheckboxProps<T> & React.RefAttributes<HTMLInputElement>,
  ): React.ReactElement | null;
  displayName?: string;
};

const StyledCheckbox = styled.input<{ $error?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 22px;
  height: 22px;
  margin: ${Margin.none};
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid
      ${({ $error }) =>
        $error ? Borders.Critical.Default : Interactive.Default.Disabled};
    background: ${({ $error }) =>
      $error ? Surface.Critical.Subdued : Surface.Default.Default};
  }

  &:checked::before,
  &:indeterminate::before {
    background: ${({ $error }) =>
      $error ? Actions.Critical.Default : Interactive.Default.Default};
    border-color: ${({ $error }) =>
      $error ? Actions.Critical.Default : Interactive.Default.Default};
  }

  &:checked::after {
    content: "";
    position: absolute;
    background-image: url("${checkSvg}");
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    left: 3px;
    top: 4px;
  }

  &:indeterminate::after {
    content: "";
    position: absolute;
    background-image: url("${indeterminateSvg}");
    background-repeat: no-repeat;
    width: 14px;
    height: 16px;
    left: 4px;
    top: 8px;
  }

  &:focus-visible::before {
    outline: 2px solid ${Focused.Default};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled::before {
    background: ${Surface.Default.Subdued};
    border-color: ${Borders.Default.Default};
  }

  &:disabled:checked::before,
  &:disabled:indeterminate::before {
    background: ${Interactive.Default.Disabled};
    border-color: ${Borders.Default.Dark};
  }
`;

const CheckboxImpl = <T extends boolean = false>(
  props: CheckboxProps<T>,
  forwardedRef: React.Ref<HTMLInputElement>,
) => {
  const {
    error,
    indeterminate,
    checked: controlledChecked,
    defaultChecked,
    disabled,
    onChange,
    ...rest
  } = props;

  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(internalRef, forwardedRef);
  const isThreeState = indeterminate === true;

  const { checked, toggle } = useCheckbox<T>({
    indeterminate,
    checked: controlledChecked,
    defaultChecked,
    disabled,
    onChange,
  });

  // Set DOM indeterminate flag only when 3-state is enabled and checked is undefined
  useEffect(() => {
    const elelemt = internalRef.current;
    if (!elelemt) {
      return;
    }
    elelemt.indeterminate = isThreeState && checked === undefined;
  }, [checked, isThreeState]);

  return (
    <StyledCheckbox
      {...rest}
      ref={mergedRef}
      type="checkbox"
      checked={checked === true}
      disabled={disabled}
      aria-checked={
        checked === undefined ? "mixed" : checked ? "true" : "false"
      }
      $error={error}
      onChange={toggle}
    />
  );
};

export const Checkbox = forwardRef(CheckboxImpl) as CheckboxComponent;

Checkbox.displayName = "Checkbox";
