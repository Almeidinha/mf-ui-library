import { forwardRef, isDefined } from "@helpers";
import {
  Actions,
  Borders,
  Focused,
  Interactive,
  Surface,
} from "foundation/colors";
import { Margin } from "foundation/spacing";
import { useMergedRefs } from "hooks";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

import { checkSvg, indeterminateSvg } from "./helpers";

type BaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked" | "onChange"
> & {
  error?: boolean;
};

export type CheckboxPropsTwoState = BaseProps & {
  indeterminate?: false | undefined;
  checked?: boolean;
  onChange?: (next: boolean) => void;
};

export type CheckboxPropsThreeState = BaseProps & {
  indeterminate: true;
  checked?: boolean | undefined;
  onChange?: (next: boolean | undefined) => void;
};

export type CheckboxProps = CheckboxPropsTwoState | CheckboxPropsThreeState;

const StyledCheckbox = styled.input.withConfig({
  shouldForwardProp: (prop) => !["indeterminate"].includes(prop),
})<{
  $error?: boolean;
}>`
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

  &:disabled::after {
    opacity: 0.7;
  }
`;

function isThreeStateProps(
  props: CheckboxProps,
): props is CheckboxPropsThreeState {
  return props.indeterminate === true;
}

const getNextThreeStateValue = (
  current: boolean | undefined,
): boolean | undefined => {
  if (current === false) {
    return true;
  }
  if (current === true) {
    return undefined;
  }
  return false;
};

const CheckboxImpl = (
  { error, disabled, checked, ...rest }: CheckboxProps,
  forwardedRef: React.Ref<HTMLInputElement>,
) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(internalRef, forwardedRef);
  const isThreeState = isThreeStateProps(rest);

  useEffect(() => {
    const element = internalRef.current;
    if (!element) {
      return;
    }

    element.indeterminate = isThreeState && checked === undefined;
  }, [checked, isThreeState]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || !isDefined(rest.onChange)) {
        return;
      }

      if (isThreeState) {
        rest.onChange(getNextThreeStateValue(checked));
      } else {
        rest.onChange(e.target.checked);
      }
    },
    [disabled, rest, isThreeState, checked],
  );

  const ariaChecked: React.AriaAttributes["aria-checked"] = isThreeState
    ? checked === undefined
      ? "mixed"
      : checked
        ? "true"
        : "false"
    : checked
      ? "true"
      : "false";

  return (
    <StyledCheckbox
      {...rest}
      ref={mergedRef}
      type="checkbox"
      checked={checked === true}
      disabled={disabled}
      aria-checked={ariaChecked}
      $error={error}
      onChange={handleChange}
    />
  );
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  CheckboxImpl,
);

Checkbox.displayName = "Checkbox";
