import { Center } from "components/layout";
import { Label } from "components/typography";
import { Margin, Padding } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { BarChartComponent } from "./components/bar-chart";
import { SliderComponent } from "./components/slider-component";
import { SliderInputs } from "./components/slider-inputs";
import { FieldContainer, SliderType } from "./types";

export type RangeSliderProps = {
  data?: number[];
  editable?: boolean;
  prefix?: string;
  min?: number;
  max?: number;
  graphHeight?: number;
  maxLabel?: string;
  minLabel?: string;
  values: number[];
  onChange?: (value: number[]) => void;
  onKeyUp?: (value: number) => void;
};

const GridContainer = styled(Center)`
  margin-top: ${Margin.s};
  justify-content: space-around;
  width: 100%;
  flex-wrap: nowrap;
  gap: 24px;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValueLabel = styled(Label)`
  width: 52px;
  padding: ${Padding.none} ${Padding.xxxs};
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const SlideWrapper = styled(Center)`
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ChartContainer = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
`;

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const getDomainFromData = (data: number[]): readonly [number, number] => {
  let currentMin = data[0];
  let currentMax = data[0];

  for (let i = 1; i < data.length; i += 1) {
    const value = data[i];
    if (value < currentMin) {
      currentMin = value;
    }
    if (value > currentMax) {
      currentMax = value;
    }
  }

  return [currentMin, currentMax];
};

const normalizeRangeValues = (
  values: number[],
  range: readonly [number, number],
): readonly [number, number] => {
  const [rangeMin, rangeMax] = range;
  const rawMin = values[0] ?? rangeMin;
  const rawMax = values[1] ?? rangeMax;

  const nextMin = clamp(Math.min(rawMin, rawMax), rangeMin, rangeMax);
  const nextMax = clamp(Math.max(rawMin, rawMax), rangeMin, rangeMax);

  return [nextMin, nextMax];
};

const normalizeUpdateValues = (
  values: ReadonlyArray<number>,
  range: readonly [number, number],
): readonly [number, number] => {
  const [rangeMin, rangeMax] = range;
  const rawMin = values[0] ?? rangeMin;
  const rawMax = values[1] ?? rangeMax;

  return normalizeRangeValues([rawMin, rawMax], range);
};

type RangeValuesProps = {
  editable: boolean;
  range: readonly [number, number];
  safeValues: readonly [number, number];
  prefix: string;
  minLabel?: string;
  maxLabel?: string;
  onChange: (values: readonly number[]) => void;
  onKeyUp?: (value: number) => void;
};

const RangeValues = memo((props: RangeValuesProps) => {
  const {
    editable,
    range,
    safeValues,
    prefix,
    minLabel,
    maxLabel,
    onChange,
    onKeyUp,
  } = props;

  return (
    <GridContainer>
      {editable ? (
        <SliderInputs
          type={SliderType.Range}
          range={range}
          minValue={safeValues[0]}
          maxValue={safeValues[1]}
          prefix={prefix}
          minLabel={minLabel}
          maxLabel={maxLabel}
          onChange={(rangeValues) => onChange(rangeValues)}
          onKeyUp={onKeyUp}
        />
      ) : (
        <>
          <FieldContainer $align="right">
            <ValueLabel>
              {prefix ? `${prefix} ${safeValues[0]}` : safeValues[0]}
            </ValueLabel>
          </FieldContainer>

          <FieldContainer $align="left">
            <ValueLabel>
              {prefix ? `${prefix} ${safeValues[1]}` : safeValues[1]}
            </ValueLabel>
          </FieldContainer>
        </>
      )}
    </GridContainer>
  );
});

RangeValues.displayName = "RangeValues";

export const RangeSlider: FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  values,
  prefix = "",
  graphHeight = 100,
  editable = false,
  data,
  maxLabel,
  minLabel,
  onChange,
  onKeyUp,
}) => {
  const hasData = Array.isArray(data) && data.length > 0;

  const range = useMemo<readonly [number, number]>(() => {
    if (hasData && data) {
      return getDomainFromData(data);
    }

    return [min, max];
  }, [data, hasData, min, max]);

  const safeValues = useMemo(() => {
    return normalizeRangeValues(values, range);
  }, [values, range]);

  const [previewValues, setPreviewValues] = useState<
    readonly [number, number] | null
  >(null);

  const rafIdRef = useRef<number | null>(null);
  const pendingPreviewValuesRef = useRef<readonly [number, number] | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const highlight = useMemo<readonly number[]>(() => {
    return previewValues ?? safeValues;
  }, [previewValues, safeValues]);

  const schedulePreviewUpdate = useCallback(
    (nextValues: readonly [number, number]): void => {
      if (!hasData) {
        return;
      }

      pendingPreviewValuesRef.current = nextValues;

      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const pending = pendingPreviewValuesRef.current;
        pendingPreviewValuesRef.current = null;
        if (pending) {
          setPreviewValues(pending);
        }
      });
    },
    [hasData],
  );

  const handleChange = useCallback(
    (newValues: readonly number[]): void => {
      const nextValues = normalizeUpdateValues(newValues, range);
      setPreviewValues(null);
      onChange?.([nextValues[0], nextValues[1]]);
    },
    [onChange, range],
  );

  const handleUpdate = useCallback(
    (newValues: readonly number[]): void => {
      if (!hasData) {
        return;
      }

      const nextValues = normalizeUpdateValues(newValues, range);
      schedulePreviewUpdate(nextValues);
    },
    [hasData, range, schedulePreviewUpdate],
  );

  if (!hasData && (!Number.isFinite(min) || !Number.isFinite(max))) {
    return null;
  }

  return (
    <ComponentWrapper>
      {hasData && data ? (
        <ChartContainer $height={graphHeight} aria-hidden="true">
          <BarChartComponent data={data} highlight={highlight} domain={range} />
        </ChartContainer>
      ) : null}

      <SlideWrapper>
        <SliderComponent
          domain={range}
          values={safeValues}
          type={SliderType.Range}
          onChange={handleChange}
          onUpdate={hasData ? handleUpdate : undefined}
          getHandleAriaLabel={(index) =>
            index === 0 ? "Minimum value" : "Maximum value"
          }
          getHandleAriaValueText={(currentValue) =>
            prefix ? `${prefix} ${currentValue}` : `${currentValue}`
          }
        />

        <RangeValues
          editable={editable}
          range={range}
          safeValues={safeValues}
          prefix={prefix}
          minLabel={minLabel}
          maxLabel={maxLabel}
          onChange={handleChange}
          onKeyUp={onKeyUp}
        />
      </SlideWrapper>
    </ComponentWrapper>
  );
};
