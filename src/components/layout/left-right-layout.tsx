import { Margin } from "@foundations";
import { FC, PropsWithChildren } from "@helpers";
import { Body, Heading3 } from "components/typography";
import styled from "styled-components";

interface ILeftRightLayoutGeneratorProps {
  columns?: number;
  columnGutter?: number;
  rowGutter?: number;
}

const DEFAULT: ILeftRightLayoutGeneratorProps = {
  columns: 12,
  columnGutter: 24,
  rowGutter: 0,
};

const LayoutFrame = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["columns", "columnGutter", "rowGutter"].includes(prop),
})<{
  columns?: number;
  columnGutter?: number;
  rowGutter?: number;
}>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-column-gap: ${({ columnGutter }) => columnGutter}px;
  grid-row-gap: ${({ rowGutter }) => rowGutter}px;
`;

const Left = styled.div`
  grid-column: 1 / span 4;
  grid-row: third-line / 4;
`;

const Right = styled.div`
  grid-column: 5 / span 8;
  grid-row: third-line / 4;
`;

const HeadingText = styled(Heading3)`
  margin-bottom: ${Margin.m};
`;

export function leftRightLayoutGenerator(
  layoutProps: ILeftRightLayoutGeneratorProps = {},
) {
  const options = {
    ...DEFAULT,
    ...layoutProps,
  };

  const BodyText = Body;

  const Slots = {
    Left,
    Right,
    HeadingText,
    HelpText: Body,
    BodyText,
  };

  const Layout = ((props: PropsWithChildren) => {
    return (
      <LayoutFrame
        columns={options.columns}
        columnGutter={options.columnGutter}
        rowGutter={options.rowGutter}
      >
        {props.children}
      </LayoutFrame>
    );
  }) as FC<PropsWithChildren, typeof Slots>;

  Layout.Left = Left;
  Layout.Right = Right;
  Layout.HeadingText = Slots.HeadingText;
  Layout.BodyText = Slots.BodyText;
  Layout.HelpText = Slots.HelpText;

  return {
    LeftRightLayout: Layout,
    Layout,
    Left,
    Right,
  };
}
