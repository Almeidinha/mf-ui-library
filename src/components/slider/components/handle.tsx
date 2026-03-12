import { Actions } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { HTMLAttributes, memo } from "react";
import styled from "styled-components";

type SliderItem = {
  id: string;
  value: number;
  percent: number;
};

type GetHandleProps = (id: string) => HTMLAttributes<HTMLDivElement>;

const HandleContainer = styled.div<{ $left: number; $thumbHeight: number }>`
  background-color: ${Actions.Primary.Default};
  margin-left: ${({ $thumbHeight }) => `${$thumbHeight / -2}px`};
  margin-top: ${({ $thumbHeight }) => `${($thumbHeight - 4) / -2}px`};
  width: ${({ $thumbHeight }) => $thumbHeight}px;
  height: ${({ $thumbHeight }) => $thumbHeight}px;
  border: 0;
  border-radius: 50%;
  white-space: nowrap;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  left: ${({ $left }) => `${$left}%`};

  &:focus-visible {
    outline: 2px solid ${Actions.Primary.Default};
    outline-offset: 2px;
  }
`;

interface IHandleComponent {
  domain: readonly [number, number];
  handle: SliderItem;
  thumbHeight: number;
  getHandleProps: GetHandleProps;
  ariaLabel?: string;
  ariaValueText?: string;
}

const HandleComponentBase: FC<IHandleComponent> = ({
  domain,
  handle,
  thumbHeight,
  getHandleProps,
  ariaLabel,
  ariaValueText,
}) => {
  const [min, max] = domain;

  return (
    <HandleContainer
      $left={handle.percent}
      $thumbHeight={thumbHeight}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={handle.value}
      aria-valuetext={ariaValueText}
      {...getHandleProps(handle.id)}
    />
  );
};

export const HandleComponent = memo<IHandleComponent>(HandleComponentBase);

HandleComponent.displayName = "HandleComponent";
