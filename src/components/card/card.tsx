import { SpaceBetween } from "components/layout";
import { CardFrame } from "components/shared-styled-components";
import { Heading3 } from "components/typography";
import { Margin, Padding } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { isDefined, isEmpty } from "helpers/safe-navigation";
import { getOtherChildren, getSlot, getSlots } from "helpers/slots";
import { toKebabCase } from "helpers/strings";
import { HTMLAttributes } from "react";
import styled from "styled-components";

import {
  CardAlertBannerSlot,
  CardControlsSlot,
  CardHeadingActionSlot,
  CardSectionSlot,
} from "./components";

const CardHeading = styled(SpaceBetween)`
  margin: ${Margin.none} ${Margin.l} ${Margin.none} ${Margin.l};
  padding-top: ${Padding.l};
`;

const CardHeadingText = styled(Heading3)`
  margin-bottom: ${Margin.none};
`;

function joinIds(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export interface ICardProps
  extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  heading?: string;
}

type SubComponents = {
  Section: typeof CardSectionSlot;
  Controls: typeof CardControlsSlot;
  HeadingAction: typeof CardHeadingActionSlot;
  AlertBanner: typeof CardAlertBannerSlot;
};

export const Card: FC<ICardProps, SubComponents> = (props) => {
  const {
    children,
    heading,
    "aria-labelledby": ariaLabelledBy,
    ...htmlProps
  } = props;

  const sections = getSlots(CardSectionSlot, children);
  const controls = getSlot(CardControlsSlot, children);
  const headingAction = getSlot(CardHeadingActionSlot, children);
  const alertBanners = getSlots(CardAlertBannerSlot, children);
  const otherChildren = getOtherChildren(children);

  const headingId = isDefined(heading)
    ? `card-${toKebabCase(heading)}`
    : undefined;

  const hasSections = !isEmpty(sections);

  return (
    <CardFrame
      column
      {...htmlProps}
      aria-labelledby={joinIds(ariaLabelledBy, heading ? headingId : undefined)}
    >
      <If is={alertBanners}>{alertBanners}</If>

      <If is={heading}>
        <CardHeading>
          <CardHeadingText id={headingId}>{heading}</CardHeadingText>
          <If is={headingAction}>{headingAction}</If>
        </CardHeading>
      </If>

      {hasSections ? (
        sections
      ) : (
        <CardSectionSlot>{otherChildren}</CardSectionSlot>
      )}

      <If is={controls}>{controls}</If>
    </CardFrame>
  );
};

Card.Section = CardSectionSlot;
Card.Controls = CardControlsSlot;
Card.HeadingAction = CardHeadingActionSlot;
Card.AlertBanner = CardAlertBannerSlot;
