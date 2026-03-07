import { Flex } from "components/layout";
import { Padding } from "foundation/spacing";
import { PropsWithChildren } from "helpers/generic-types";
import { SlotComponent } from "helpers/slots";
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
