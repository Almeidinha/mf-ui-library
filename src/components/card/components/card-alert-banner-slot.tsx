import { AlertBanner, AlertBannerProps } from "components/alert-banner";
import { Margin } from "foundation/spacing";
import { Slot } from "helpers/slots";
import styled from "styled-components";

const CardAlertBanner = styled(AlertBanner)`
  margin: ${Margin.l} ${Margin.l} ${Margin.none} ${Margin.l};
`;

export class CardAlertBannerSlot extends Slot<AlertBannerProps> {
  override render() {
    return (
      <CardAlertBanner {...this.props}>{this.props.children}</CardAlertBanner>
    );
  }
}
