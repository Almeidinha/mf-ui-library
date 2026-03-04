import { useEffect, useState } from "react";

import { isDefined, isNil } from "../helpers/safe-navigation";

const READ_ONLY_WARNING =
  "Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`";
const UNCONTROLLED_TO_CONTROLLED =
  "Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components";
const CONTROLLED_TO_UNCONTROLLED =
  "Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components";

type IInputElementState<T> = [T | undefined, (change: T) => void];

/**
 *
 * This hook is to help implement a common pattern:
 *
 * <input onChange={doSomething} /> // uncontrolled
 * <input value={1} /> // should be marked read only
 * <input value={state} onChange={setState} /> // controlled
 *
 * const [state, setState] = useInputElementState({
 *   value: props.value,
 *   defaultValue: props.defaultValue, // the value to use if value is undefined
 *   onChange: props.onChange,
 * })
 *
 * if you give it nothing, you get state, setState for internal state management (uncontrolled input)
 * if you give it value only, you get a warning
 * if you give it value and onChange, state management if deferred to the parent (controlled input)
 */
export function useInputElementState<T>(props: {
  value?: T;
  defaultValue?: T;
  onChange?: (change: T) => void;
}): IInputElementState<T> {
  const [initialValue] = useState(props.value);
  const [state, setState] = useState(props.defaultValue);

  const { value = state, onChange = setState } = props;

  useEffect(() => {
    if (initialValue === undefined && props.value !== undefined) {
      console.error(UNCONTROLLED_TO_CONTROLLED);
    } else if (initialValue !== undefined && props.value === undefined) {
      console.error(CONTROLLED_TO_UNCONTROLLED);
    }
  }, [props.value, initialValue]);

  if (isDefined(props.value) && isNil(props.onChange)) {
    console.error(READ_ONLY_WARNING);
  }

  return [value, onChange];
}
