import { Surface } from "foundation/colors";
import { Margin } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { memo, ReactNode } from "react";
import styled from "styled-components";

type SliderItem = {
  value: number;
  percent: number;
};

interface ITickComponent {
  tick: SliderItem;
  count: number;
  format?: (value: number) => ReactNode;
}

const TickItem = styled.div<{ $percent: number }>`
  position: absolute;
  margin-top: ${Margin.s};
  width: 1px;
  height: 5px;
  background-color: ${Surface.Default.Subdued};
  left: ${({ $percent }) => `${$percent}%`};
`;

const TickContainer = styled.div<{ $count: number; $percent: number }>`
  position: absolute;
  margin-top: ${Margin.l};
  text-align: center;
  margin-left: ${({ $count }) => `${-(100 / $count) / 2}%`};
  width: ${({ $count }) => `${100 / $count}%`};
  left: ${({ $percent }) => `${$percent}%`};
`;

export const TickComponent: FC<ITickComponent> = memo((props) => {
  const { tick, count, format = (value: number) => value } = props;

  return (
    <div aria-hidden="true">
      <TickItem $percent={tick.percent} />
      <TickContainer $count={count} $percent={tick.percent}>
        {format(tick.value)}
      </TickContainer>
    </div>
  );
});

TickComponent.displayName = "TickComponent";
