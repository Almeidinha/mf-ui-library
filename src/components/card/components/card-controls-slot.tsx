import { Padding } from "@foundations";
import { PropsWithChildren, Slot } from "@helpers";
import { Flex } from "components/layout";
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
