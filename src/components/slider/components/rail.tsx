import { Surface } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { Fragment, memo } from "react";
import { GetRailProps } from "react-compound-slider";
import styled from "styled-components";

interface IRailComponent {
  getRailProps: GetRailProps;
  trackHeight: number;
  thumbHeight: number;
}

const RailContainer = styled.div<{ $trackHeight: number }>`
  background-color: ${Surface.Neutral.Default};
  width: 100%;
  height: ${({ $trackHeight }) => $trackHeight}px;
  position: absolute;
  pointer-events: none;
  border-radius: 999px;
`;

const RailHotSpot = styled.div<{ $thumbHeight: number }>`
  width: 100%;
  height: ${({ $thumbHeight }) => $thumbHeight * 2}px;
  top: ${({ $thumbHeight }) => $thumbHeight * -1}px;
  position: absolute;
  cursor: pointer;
`;

export const RailComponent: FC<IRailComponent> = memo((props) => {
  const { trackHeight, thumbHeight, getRailProps } = props;

  return (
    <Fragment>
      <RailHotSpot $thumbHeight={thumbHeight} {...getRailProps()} />
      <RailContainer $trackHeight={trackHeight} aria-hidden="true" />
    </Fragment>
  );
});

RailComponent.displayName = "RailComponent";
