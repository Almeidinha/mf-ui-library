import { FC } from "helpers/generic-types";
import { CSSProperties, memo } from "react";
import {
  Handles,
  Rail,
  Slider as ReactSlider,
  Tracks,
} from "react-compound-slider";

import { SliderType } from "../types";
import { HandleComponent } from "./handle";
import { RailComponent } from "./rail";
import { TrackComponent } from "./track";

interface IProps {
  domain: readonly [number, number];
  values: ReadonlyArray<number>;
  type: SliderType;
  onChange: (values: ReadonlyArray<number>) => void;
  onUpdate?: (values: ReadonlyArray<number>) => void;
  getHandleAriaLabel?: (index: number) => string;
  getHandleAriaValueText?: (value: number, index: number) => string;
}

const sliderStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  top: "-1px",
};

const trackHeight = 4;
const thumbHeight = 16;

const SliderComponentBase: FC<IProps> = ({
  domain,
  values,
  type,
  onChange,
  onUpdate,
  getHandleAriaLabel,
  getHandleAriaValueText,
}) => {
  const mode = type === SliderType.Range ? 3 : 2;

  const handleOnChange = (newValues: ReadonlyArray<number>): void => {
    const hasChanged =
      values.length !== newValues.length ||
      values.some((value, index) => value !== newValues[index]);

    if (hasChanged) {
      onChange(newValues);
    }
  };

  return (
    <ReactSlider
      mode={mode}
      step={1}
      domain={domain}
      values={values}
      rootStyle={sliderStyle}
      onChange={handleOnChange}
      onUpdate={onUpdate}
    >
      <Rail>
        {({ getRailProps }) => (
          <RailComponent
            trackHeight={trackHeight}
            thumbHeight={thumbHeight}
            getRailProps={getRailProps}
          />
        )}
      </Rail>

      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle, index) => (
              <HandleComponent
                key={handle.id}
                handle={handle}
                domain={domain}
                thumbHeight={thumbHeight}
                getHandleProps={getHandleProps}
                ariaLabel={getHandleAriaLabel?.(index)}
                ariaValueText={getHandleAriaValueText?.(handle.value, index)}
              />
            ))}
          </div>
        )}
      </Handles>

      <Tracks left={type === SliderType.Single} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <TrackComponent
                key={id}
                trackHeight={trackHeight}
                thumbHeight={thumbHeight}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
    </ReactSlider>
  );
};

export const SliderComponent = memo(SliderComponentBase);

SliderComponent.displayName = "SliderComponent";
