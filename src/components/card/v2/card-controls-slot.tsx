import { Padding } from "@foundations";
import { PropsWithChildren, SlotComponent } from "@helpers";
import { Flex } from "components/layout";
import styled from "styled-components";

const ControlsFrame = styled(Flex)`
  justify-content: end;
  gap: ${Padding.m};
  padding: ${Padding.none} ${Padding.l} ${Padding.l} ${Padding.l};
`;

export const CardControlsSlot: SlotComponent<PropsWithChildren> = (props) => {
  return <ControlsFrame>{props.children}</ControlsFrame>;
};

CardControlsSlot.__slot = true;
