import { Label } from "components/typography";
import { Padding } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import styled from "styled-components";

import { BadgeTypeProps, getColor } from "./badge-type-flags";

const BadgeFrame = styled(Label)<{ color: string }>`
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  padding: ${Padding.xxxs} ${Padding.xs};
  border-radius: 10px;
  height: fit-content;
  max-width: fit-content;
  white-space: nowrap;
`;

type IBadgeProps = BadgeTypeProps & PropsWithChildren<{ className?: string }>;

export const Badge: FC<IBadgeProps> = (props) => {
  const color = getColor(props);

  return (
    <BadgeFrame className={props.className} color={color}>
      {props.children}
    </BadgeFrame>
  );
};
