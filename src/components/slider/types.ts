import styled, { css } from "styled-components";

export enum SliderType {
  Single,
  Range,
}

export enum ValueType {
  MIN,
  MAX,
}

export type FieldAlign = "left" | "right";

export const FieldContainer = styled.div<{ $align: FieldAlign }>`
  ${({ $align }) =>
    $align === "right"
      ? css`
          margin-right: auto;
        `
      : css`
          margin-left: auto;
        `}
`;
