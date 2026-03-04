import { Margin, Padding } from "@foundations";
import { FC, If, isSlotOfType, PropsWithChildren, toKebabCase } from "@helpers";
import { SpaceBetween } from "components/layout";
import { CardFrameV2 } from "components/shared-styled-components";
import { Heading3 } from "components/typography";
import {
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useId,
} from "react";
import styled from "styled-components";

import { CardAlertBannerSlot } from "./card-alert-banner-slot";
import { CardControlsSlot } from "./card-controls-slot";
import { CardHeadingActionSlot, CardSectionSlot } from "./card-section-slot";

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

function parseCardChildren(children?: ReactNode) {
  const items = Children.toArray(children);

  const sections: ReactElement[] = [];
  const alertBanners: ReactElement[] = [];
  const otherChildren: ReactNode[] = [];

  let controls: ReactElement | null = null;
  let headingAction: ReactElement | null = null;

  for (const child of items) {
    if (isSlotOfType(CardSectionSlot)(child)) {
      sections.push(child);
      continue;
    }

    if (isSlotOfType(CardAlertBannerSlot)(child)) {
      alertBanners.push(child);
      continue;
    }

    if (isSlotOfType(CardControlsSlot)(child)) {
      controls = child;
      continue;
    }

    if (isSlotOfType(CardHeadingActionSlot)(child)) {
      headingAction = child;
      continue;
    }

    if (!isSlotOfType(CardSectionSlot)(child)) {
      otherChildren.push(child);
    }
  }

  return {
    sections,
    alertBanners,
    controls,
    headingAction,
    otherChildren,
  };
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

  const reactId = useId();
  const { sections, controls, headingAction, alertBanners, otherChildren } =
    parseCardChildren(children);

  const headingId = heading
    ? `card-${toKebabCase(heading)}-${reactId}`
    : undefined;
  const hasSections = sections.length > 0;
  const hasLooseChildren = otherChildren.length > 0;

  return (
    <CardFrameV2
      column
      {...htmlProps}
      aria-labelledby={joinIds(ariaLabelledBy, headingId)}
    >
      <If is={alertBanners.length > 0}>{alertBanners}</If>

      <If is={heading}>
        <CardHeading>
          <CardHeadingText id={headingId}>{heading}</CardHeadingText>
          <If is={headingAction}>{headingAction}</If>
        </CardHeading>
      </If>

      <If is={hasSections}>{sections}</If>
      <If is={!hasSections && hasLooseChildren}>
        <CardSectionSlot>{otherChildren}</CardSectionSlot>
      </If>
      <If is={hasSections && hasLooseChildren}>
        <CardSectionSlot>{otherChildren}</CardSectionSlot>
      </If>

      <If is={controls}>{controls}</If>
    </CardFrameV2>
  );
};

Card.Section = CardSectionSlot;
Card.Controls = CardControlsSlot;
Card.HeadingAction = CardHeadingActionSlot;
Card.AlertBanner = CardAlertBannerSlot;
