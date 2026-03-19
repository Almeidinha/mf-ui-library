import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Label } from "components/typography";
import { Borders, Icons, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import styled from "styled-components";

import { DEFAULT_ROW_HEIGHT, menuPositionType } from "../types";

interface IOptionItemProps {
  state?: "default" | "active" | "selected";
  height?: number;
}

export const OptionItem = styled(Flex).attrs({
  justify: "space-between",
})<IOptionItemProps>`
  height: ${({ height = DEFAULT_ROW_HEIGHT }) => height}px;
  min-width: 0;
  cursor: pointer;
  box-sizing: border-box;
  margin: ${Margin.xxs};
  border-radius: 4px;
  background-clip: content-box;

  background-color: ${({ state }) => {
    switch (state) {
      case "active":
        return Surface.Selected.Default;
      case "selected":
        return Surface.Default.Hover;
      default:
        return Surface.Default.Default;
    }
  }};

  & > div {
    padding: ${Padding.none} ${Padding.xs};
  }

  &:hover {
    background-color: ${({ state }) => {
      switch (state) {
        case "active":
          return Surface.Selected.Hover;
        case "selected":
          return Surface.Default.Hover;
        default:
          return Surface.Default.Hover;
      }
    }};
  }

  &:active {
    background-color: ${({ state }) => {
      switch (state) {
        case "active":
          return Surface.Selected.Pressed;
        case "selected":
          return Surface.Default.Pressed;
        default:
          return Surface.Default.Pressed;
      }
    }};
  }
`;

export const EmptyOptionItem = styled(OptionItem)<{
  $menuPosition?: "top" | "bottom";
}>`
  padding-left: ${Padding.xs};
  border: 1px solid ${Borders.Default.Muted};
  background-color: ${Surface.Default.Default};
  position: absolute;
  margin: ${Margin.none};
  width: 100%;
  height: 54px;
  box-shadow: ${({ $menuPosition }) =>
    $menuPosition === menuPositionType.BOTTOM
      ? "0px 2px 10px 0px rgba(0, 0, 0, 0.10)"
      : "0px -2px 10px 0px rgba(0, 0, 0, 0.10)"};
  &:hover {
    background-color: ${Surface.Default.Default};
  }
`;

export const SelectLabel = styled(Label)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  box-sizing: border-box;
`;

export const CheckIcon = styled(IconMinor.Check)`
  padding: 0 ${Padding.xs};
  color: ${Icons.Highlight};
`;
