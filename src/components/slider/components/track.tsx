import { Actions } from "foundation/colors";
import { FC } from "helpers/generic-types";
import React, { memo } from "react";
import { GetTrackProps, SliderItem } from "react-compound-slider";
import styled from "styled-components";

interface ITrackComponent {
  source: SliderItem;
  target: SliderItem;
  trackHeight: number;
  thumbHeight: number;
  getTrackProps: GetTrackProps;
}

const Track = styled.div<{
  $left: number;
  $width: number;
  $trackHeight: number;
}>`
  background-color: ${Actions.Primary.Default};
  height: ${({ $trackHeight }) => $trackHeight}px;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $width }) => `${$width}%`};
  border-radius: 999px;
`;

const TrackHotSpot = styled.div<{
  $left: number;
  $width: number;
  $thumbHeight: number;
}>`
  height: ${({ $thumbHeight }) => $thumbHeight}px;
  top: ${({ $thumbHeight }) => $thumbHeight * -0.5}px;
  position: absolute;
  cursor: pointer;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $width }) => `${$width}%`};
`;

export const TrackComponent: FC<ITrackComponent> = memo((props) => {
  const { source, target, trackHeight, thumbHeight, getTrackProps } = props;

  const left = source.percent;
  const width = target.percent - source.percent;

  return (
    <React.Fragment>
      <Track
        $trackHeight={trackHeight}
        $left={left}
        $width={width}
        aria-hidden="true"
      />
      <TrackHotSpot
        $thumbHeight={thumbHeight}
        $left={left}
        $width={width}
        {...getTrackProps()}
      />
    </React.Fragment>
  );
});

TrackComponent.displayName = "TrackComponent";
