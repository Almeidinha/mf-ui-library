import { Padding } from "@foundations";
import { FC } from "@helpers";
import { Center } from "components/layout";
import { Label } from "components/typography";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { SliderComponent } from "./components/slider-component";
import { SliderInputs } from "./components/slider-inputs";
import { SliderType } from "./types";

export type SliderProps = {
  min?: number;
  max: number;
  value: number;
  prefix?: string;
  editable?: boolean;
  onChange?: (value: number) => void;
  onKeyUp?: (value: number) => void;
};

const ComponentWrapper = styled(Center)`
  gap: 12px;
  flex-wrap: nowrap;
`;

const SlideWrapper = styled(Center)`
  gap: 12px;
  width: 100%;
`;

const SliderLabel = styled(Label)`
  width: 52px;
  padding: ${Padding.none} ${Padding.xxxs};
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const Slider: FC<SliderProps> = (props) => {
  const {
    min = 0,
    max,
    value,
    prefix = "",
    onChange,
    editable = false,
    onKeyUp,
  } = props;

  const domain = useMemo<readonly [number, number]>(() => {
    return [min, max];
  }, [min, max]);

  const safeValue = useMemo(() => {
    return clamp(value, min, max);
  }, [value, min, max]);

  const handleChange = useCallback(
    (newValues: readonly number[]): void => {
      const nextValue = newValues[0];
      if (typeof nextValue === "number" && nextValue !== safeValue) {
        onChange?.(nextValue);
      }
    },
    [onChange, safeValue],
  );

  const handleInputsChange = useCallback(
    (range: number[]): void => {
      const nextValue = range[0];
      if (typeof nextValue === "number") {
        onChange?.(nextValue);
      }
    },
    [onChange],
  );

  return (
    <ComponentWrapper>
      {prefix ? <Label>{prefix}</Label> : null}

      <SlideWrapper>
        <SliderComponent
          domain={domain}
          values={[safeValue]}
          type={SliderType.SLIDER}
          onChange={handleChange}
          getHandleAriaLabel={() => "Value"}
          getHandleAriaValueText={(currentValue) =>
            prefix ? `${prefix} ${currentValue}` : `${currentValue}`
          }
        />

        {editable ? (
          <SliderInputs
            type={SliderType.SLIDER}
            range={domain}
            minValue={min}
            maxValue={safeValue}
            onChange={handleInputsChange}
            onKeyUp={onKeyUp}
          />
        ) : (
          <SliderLabel>{safeValue}</SliderLabel>
        )}
      </SlideWrapper>
    </ComponentWrapper>
  );
};
