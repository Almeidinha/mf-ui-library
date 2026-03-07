import { Flex } from "components/layout";
import { Padding } from "foundation/spacing";
import { PropsWithChildren } from "helpers/generic-types";
import { Slot } from "helpers/slots";
import styled from "styled-components";

const ControlsFrame = styled(Flex)`
  justify-content: end;
  gap: ${Padding.m};
  padding: ${Padding.none} ${Padding.l} ${Padding.l} ${Padding.l};
`;

export class CardControlsSlot extends Slot<PropsWithChildren> {
  override render() {
    return <ControlsFrame>{this.props.children}</ControlsFrame>;
  }
}
