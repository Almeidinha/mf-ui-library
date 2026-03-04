import { useCallback, useEffect, useState } from "react";

export type CheckedState<T extends boolean> = T extends true
  ? boolean | undefined
  : boolean;

type UseCheckboxOptions<T extends boolean> = {
  indeterminate?: T;
  checked?: CheckedState<T>; // controlled
  defaultChecked?: CheckedState<T>; // uncontrolled initial
  disabled?: boolean;
  onChange?: (next: CheckedState<T>) => void;
};

type UseCheckboxResult<T extends boolean> = {
  checked: CheckedState<T>;
  toggle: () => void;
};

export function useCheckbox<T extends boolean = false>(
  options: UseCheckboxOptions<T> = {} as UseCheckboxOptions<T>,
): UseCheckboxResult<T> {
  const {
    indeterminate,
    checked: controlledChecked,
    defaultChecked,
    disabled,
    onChange,
  } = options;
  const isThreeState = indeterminate === true;

  const isControlled = Object.prototype.hasOwnProperty.call(options, "checked");

  const [uncontrolledChecked, setUncontrolledChecked] = useState<
    CheckedState<T>
  >(() => {
    if (isControlled) {
      return controlledChecked as CheckedState<T>;
    }
    if (defaultChecked !== undefined) {
      return defaultChecked;
    }
    return false as CheckedState<T>;
  });

  // TODO: Check if we really ned this effect
  // Keep internal state aligned if switching to controlled
  useEffect(() => {
    if (isControlled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUncontrolledChecked(controlledChecked as CheckedState<T>);
    }
  }, [isControlled, controlledChecked]);

  const checked = (
    isControlled ? controlledChecked : uncontrolledChecked
  ) as CheckedState<T>;

  const computeNext = useCallback((): boolean | undefined => {
    return isThreeState
      ? checked === false
        ? true
        : checked === true
          ? undefined
          : false
      : !checked;
  }, [checked, isThreeState]);

  const commit = useCallback(
    (next: CheckedState<T>) => {
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }
    commit(computeNext() as CheckedState<T>);
  }, [commit, computeNext, disabled]);

  return { checked, toggle };
}
