import { InputField } from "components/input-field";
import { Padding } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import {
  FocusEvent,
  Fragment,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import { FieldContainer, SliderType, ValueType } from "../types";

interface ISliderInputs {
  onChange: (range: number[]) => void;
  onKeyUp?: (value: number) => void;
  range: readonly [number, number];
  minValue: number;
  maxValue: number;
  maxLabel?: string;
  minLabel?: string;
  type: SliderType;
  prefix?: string;
}

const Input = styled(InputField)`
  width: 52px;
  padding: ${Padding.none} ${Padding.xs};
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const getNextCommittedValue = (
  rawValue: string,
  valueType: ValueType,
  props: ISliderInputs,
): number => {
  const { type, range, minValue, maxValue } = props;
  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return valueType === ValueType.MIN ? minValue : maxValue;
  }

  if (type === SliderType.SLIDER) {
    return clamp(parsedValue, range[0], range[1]);
  }

  if (valueType === ValueType.MIN) {
    return clamp(parsedValue, range[0], maxValue);
  }

  return clamp(parsedValue, minValue, range[1]);
};

const SliderInputsBase: FC<ISliderInputs> = (props) => {
  const {
    type,
    minValue,
    maxValue,
    prefix = "",
    maxLabel = "Max",
    minLabel = "Min",
    onChange,
    onKeyUp,
    range,
  } = props;

  const [minDraft, setMinDraft] = useState<string>(String(minValue));
  const [maxDraft, setMaxDraft] = useState<string>(String(maxValue));

  useEffect(() => {
    setMinDraft(String(minValue));
  }, [minValue]);

  useEffect(() => {
    setMaxDraft(String(maxValue));
  }, [maxValue]);

  const notifyKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const value = event.currentTarget.valueAsNumber;
      if (!Number.isNaN(value)) {
        onKeyUp?.(value);
      }
    },
    [onKeyUp],
  );

  const commitValue = useCallback(
    (valueType: ValueType) => {
      if (type === SliderType.SLIDER) {
        const nextValue = getNextCommittedValue(maxDraft, ValueType.MAX, props);
        setMaxDraft(String(nextValue));

        if (nextValue !== maxValue) {
          onChange([nextValue]);
        }

        return;
      }

      if (valueType === ValueType.MIN) {
        const nextMin = getNextCommittedValue(minDraft, ValueType.MIN, props);
        const nextRange: [number, number] = [
          nextMin,
          Math.max(nextMin, maxValue),
        ];

        setMinDraft(String(nextRange[0]));
        setMaxDraft(String(nextRange[1]));

        if (nextRange[0] !== minValue || nextRange[1] !== maxValue) {
          onChange(nextRange);
        }

        return;
      }

      const nextMax = getNextCommittedValue(maxDraft, ValueType.MAX, props);
      const nextRange: [number, number] = [
        Math.min(minValue, nextMax),
        nextMax,
      ];

      setMinDraft(String(nextRange[0]));
      setMaxDraft(String(nextRange[1]));

      if (nextRange[0] !== minValue || nextRange[1] !== maxValue) {
        onChange(nextRange);
      }
    },
    [maxDraft, maxValue, minDraft, minValue, onChange, props, type],
  );

  const handleBlur =
    (valueType: ValueType) =>
    (event: FocusEvent<HTMLInputElement>): void => {
      event.currentTarget.blur();
      commitValue(valueType);
    };

  const handleKeyDown =
    (valueType: ValueType) =>
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === "Enter") {
        commitValue(valueType);
      }
    };

  if (type === SliderType.RANGE_SLIDER) {
    return (
      <Fragment>
        <FieldContainer $align="right">
          <Input
            type="number"
            label={minLabel}
            aria-label="Minimum value"
            prefix={prefix}
            inputMode="numeric"
            min={range[0]}
            max={range[1]}
            step={1}
            value={minDraft}
            onChange={(event) => {
              setMinDraft(event.currentTarget.value);
            }}
            onBlur={handleBlur(ValueType.MIN)}
            onKeyDown={handleKeyDown(ValueType.MIN)}
            onKeyUp={notifyKeyUp}
          />
        </FieldContainer>

        <FieldContainer $align="left">
          <Input
            type="number"
            label={maxLabel}
            aria-label="Maximum value"
            prefix={prefix}
            inputMode="numeric"
            min={range[0]}
            max={range[1]}
            step={1}
            value={maxDraft}
            onChange={(event) => {
              setMaxDraft(event.currentTarget.value);
            }}
            onBlur={handleBlur(ValueType.MAX)}
            onKeyDown={handleKeyDown(ValueType.MAX)}
            onKeyUp={notifyKeyUp}
          />
        </FieldContainer>
      </Fragment>
    );
  }

  return (
    <Input
      type="number"
      aria-label="Slider value"
      inputMode="numeric"
      min={range[0]}
      max={range[1]}
      step={1}
      value={maxDraft}
      onChange={(event) => {
        setMaxDraft(event.currentTarget.value);
      }}
      onBlur={handleBlur(ValueType.MAX)}
      onKeyDown={handleKeyDown(ValueType.MAX)}
      onKeyUp={notifyKeyUp}
    />
  );
};

export const SliderInputs = memo(SliderInputsBase);

SliderInputs.displayName = "SliderInputs";
