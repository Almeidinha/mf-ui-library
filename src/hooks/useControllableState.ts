import { useCallback, useEffect, useRef, useState } from "react";

const READ_ONLY_WARNING =
  "Warning: You provided a `value` prop to a component without an `onChange` handler. This will render a read-only component. If the component should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`";

const UNCONTROLLED_TO_CONTROLLED =
  "Warning: A component is changing an uncontrolled component to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled component for the lifetime of the component.";

const CONTROLLED_TO_UNCONTROLLED =
  "Warning: A component is changing a controlled component to be uncontrolled. This is likely caused by the value changing from a defined value to undefined, which should not happen. Decide between using a controlled or uncontrolled component for the lifetime of the component.";

type MaybeUndefined<
  T,
  CanBeUndefined extends boolean,
> = CanBeUndefined extends true ? T | undefined : T;

type ControllableState<T, CanBeUndefined extends boolean> = [
  MaybeUndefined<T, CanBeUndefined>,
  (nextValue: MaybeUndefined<T, CanBeUndefined>) => void,
];

type UseControllableStateProps<T, CanBeUndefined extends boolean> = {
  value?: MaybeUndefined<T, CanBeUndefined>;
  defaultValue?: MaybeUndefined<T, CanBeUndefined>;
  onChange?: (nextValue: MaybeUndefined<T, CanBeUndefined>) => void;
  readOnly?: boolean;
};

export function useControllableState<T, CanBeUndefined extends boolean = true>({
  value,
  defaultValue,
  onChange,
  readOnly,
}: UseControllableStateProps<T, CanBeUndefined>): ControllableState<
  T,
  CanBeUndefined
> {
  const isControlled = value !== undefined;
  const wasControlled = useRef(isControlled);

  const [internalValue, setInternalValue] = useState<
    MaybeUndefined<T, CanBeUndefined>
  >(defaultValue as MaybeUndefined<T, CanBeUndefined>);

  useEffect(() => {
    if (wasControlled.current !== isControlled) {
      console.error(
        wasControlled.current
          ? CONTROLLED_TO_UNCONTROLLED
          : UNCONTROLLED_TO_CONTROLLED,
      );
    }
  }, [isControlled]);

  useEffect(() => {
    if (isControlled && !onChange && !readOnly) {
      console.error(READ_ONLY_WARNING);
    }
  }, [isControlled, onChange, readOnly]);

  const currentValue = isControlled ? value : internalValue;
  const setValue = useCallback(
    (nextValue: MaybeUndefined<T, CanBeUndefined>) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue];
}
