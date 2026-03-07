import { AlertBanner, AlertBannerProps } from "components/alert-banner";
import { Margin } from "foundation/spacing";
import { SlotComponent } from "helpers/slots";
import styled from "styled-components";

const CardAlertBanner = styled(AlertBanner)`
  margin: ${Margin.l} ${Margin.l} ${Margin.none} ${Margin.l};
`;

export const CardAlertBannerSlot: SlotComponent<AlertBannerProps> = (props) => {
  return <CardAlertBanner {...props}>{props.children}</CardAlertBanner>;
};

CardAlertBannerSlot.__slot = true;
