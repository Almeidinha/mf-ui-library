import { FC } from "@helpers";
import { Borders } from "foundation/colors";
import { toCssSize } from "helpers/css-helpers";
import styled from "styled-components";

export type DividerDirection = "horizontal" | "vertical";

const DividerLine = styled.div.attrs<{
  $color: string;
  $direction: DividerDirection;
  $width?: string;
  $height?: string;
}>(({ $color, $width, $height }) => ({
  style: {
    background: $color,
    width: $width,
    height: $height,
    alignSelf: "stretch",
  },
}))`
  margin: 0;
  flex-shrink: 0;
  width: ${({ $direction }) => ($direction === "horizontal" ? "100%" : "1px")};
  height: ${({ $direction }) => ($direction === "horizontal" ? "1px" : "auto")};
  min-width: ${({ $direction }) => ($direction === "horizontal" ? "0" : "1px")};
  min-height: ${({ $direction }) => ($direction === "horizontal" ? "1px" : "0")};
`;

export type DividerProps = {
  className?: string;
  muted?: boolean;
  direction?: DividerDirection;
  width?: number | string;
  height?: number | string;
};

function getColor(muted?: boolean): string {
  return muted ? Borders.Default.Muted : Borders.Default.Default;
}

export const Divider: FC<DividerProps> = ({
  className,
  muted,
  direction = "horizontal",
  width,
  height,
}) => {
  return (
    <DividerLine
      role="separator"
      aria-orientation={direction}
      className={className}
      $color={getColor(muted)}
      $direction={direction}
      $width={toCssSize(width) || undefined}
      $height={toCssSize(height) || undefined}
      data-testid="divider-test"
    />
  );
};
