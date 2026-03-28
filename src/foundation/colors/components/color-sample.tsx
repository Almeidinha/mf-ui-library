import { Flex } from "@components";
import { FC, isDefined } from "@helpers";
import { Caption, Label } from "components/typography";
import styled from "styled-components";

import { Margin } from "../../spacing";
import { GRAY, WHITE } from "../base-palette";

function isPale(color: string) {
  return color === WHITE || color === GRAY[50] || color === GRAY[100];
}

/** a ColorSample is a rectangular area with a uniform color */
const ColorSample = styled.div<{ color: string; border?: string }>`
  ${({ border, color }) =>
    isDefined(border) ? "" : `background-color: ${color};`}
  ${({ border, color }) =>
    isDefined(border) ? `border: 1px solid ${color};` : ""}
  ${({ border, color }) =>
    !isDefined(border) && isPale(color)
      ? `border: 1px solid ${GRAY[200]};`
      : ""}

  height: 40px;
  border-radius: 4px;
`;

const RectangularColorSample = styled(ColorSample)`
  max-width: 122px;
  margin-bottom: ${Margin.xxs};
`;

const SquareColorSample = styled(ColorSample)`
  width: 40px;
  flex-shrink: 0;
  margin-right: ${Margin.s};
  border-radius: 6px;

  ${({ border, color }) =>
    isDefined(border)
      ? `background-color: ${border};`
      : `background-color: ${color};`}
  ${({ border, color }) =>
    isDefined(border)
      ? `border: 1px solid ${color};`
      : `border: 2px solid ${WHITE};`}
`;

interface IColorRectangleProps {
  name: string;
  hex: string;
  border?: string;
}

export const ColorRectangle: FC<IColorRectangleProps> = ({
  name,
  hex,
  border,
}) => {
  return (
    <div>
      <RectangularColorSample color={hex} border={border} />
      <Flex justify="space-between">
        <Caption>{name}</Caption>
        <Caption muted>{hex}</Caption>
      </Flex>
    </div>
  );
};

const ColorFrame = styled(Flex)`
  margin-bottom: ${Margin.l};
  margin-right: ${Margin.xxl};
`;

const Details = styled(Flex)`
  justify-content: center;
`;

const ColorName = styled(Label)`
  white-space: nowrap;
  margin-bottom: ${Margin.xxxs};
`;

const ColorId = styled(Caption)`
  white-space: nowrap;
`;

interface IColorSquareProps {
  name: string;
  colorId: string;
  hex: string;
  border?: string;
}

export const ColorSquare: FC<IColorSquareProps> = ({
  name,
  colorId,
  hex,
  border,
}) => {
  return (
    <ColorFrame>
      <SquareColorSample color={hex} border={border} />
      <Details column>
        <ColorName strong>{name}</ColorName>
        <ColorId muted>{colorId}</ColorId>
      </Details>
    </ColorFrame>
  );
};
