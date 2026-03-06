import { useEffect, useRef, useState } from "react";

const READ_ONLY_WARNING =
  "Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`";

const UNCONTROLLED_TO_CONTROLLED =
  "Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.";

const CONTROLLED_TO_UNCONTROLLED =
  "Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined value to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.";

type InputElementState<T> = [T | undefined, (nextValue: T) => void];

type UseInputElementStateProps<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (nextValue: T) => void;
  readOnly?: boolean;
};

export function useInputControllableState<T>({
  value,
  defaultValue,
  onChange,
  readOnly,
}: UseInputElementStateProps<T>): InputElementState<T> {
  const isControlled = value !== undefined;
  const wasControlled = useRef(isControlled);

  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );

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
  const setValue = onChange ?? setInternalValue;

  return [currentValue, setValue];
}
