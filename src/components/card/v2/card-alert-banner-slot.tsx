import { Margin } from "@foundations";
import { SlotComponent } from "@helpers";
import { AlertBanner, AlertBannerProps } from "components/alert-banner";
import styled from "styled-components";

const CardAlertBanner = styled(AlertBanner)`
  margin: ${Margin.l} ${Margin.l} ${Margin.none} ${Margin.l};
`;

export const CardAlertBannerSlot: SlotComponent<AlertBannerProps> = (props) => {
  return <CardAlertBanner {...props}>{props.children}</CardAlertBanner>;
};

CardAlertBannerSlot.__slot = true;
