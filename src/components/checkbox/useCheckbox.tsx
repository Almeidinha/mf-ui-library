import { useControllableState } from "hooks";
import { useCallback } from "react";

export type CheckedState<T extends boolean> = T extends true
  ? boolean | undefined
  : boolean;

type UseCheckboxOptions<T extends boolean> = {
  indeterminate?: T;
  checked?: CheckedState<T>;
  defaultChecked?: CheckedState<T>;
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

  const triState = useControllableState<boolean, true>({
    value: controlledChecked,
    defaultValue: (defaultChecked ?? false) as boolean | undefined,
    onChange: onChange as ((next: boolean | undefined) => void) | undefined,
  });

  const biState = useControllableState<boolean, false>({
    value: controlledChecked,
    defaultValue: defaultChecked ?? false,
    onChange: onChange as ((next: boolean) => void) | undefined,
  });

  const [checked, setChecked] = isThreeState ? triState : biState;

  const computeNext = useCallback((): CheckedState<T> => {
    if (isThreeState) {
      return (
        checked === false ? true : checked === true ? undefined : false
      ) as CheckedState<T>;
    }

    return !checked as CheckedState<T>;
  }, [checked, isThreeState]);

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    setChecked(computeNext() as never);
  }, [computeNext, disabled, setChecked]);

  return {
    checked: checked as CheckedState<T>,
    toggle,
  };
}
