import { Borders, Margin, Padding } from "@foundations";
import {
  getOptionalSlot,
  getOtherChildren,
  If,
  PropsWithChildren,
  SlotComponent,
  toKebabCase,
} from "@helpers";
import { SpaceBetween } from "components/layout";
import { Heading4 } from "components/typography";
import { HTMLAttributes, useId } from "react";
import styled from "styled-components";

export const CardHeadingActionSlot: SlotComponent = (props) => {
  return <>{props.children}</>;
};

CardHeadingActionSlot.__slot = true;

export interface ICardSectionProps
  extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  heading?: string;
}

const Subheading = styled(Heading4)`
  margin: ${Margin.none};
`;

const SectionFrame = styled.section`
  padding: ${Padding.l};

  & + & {
    border-top: 1px solid ${Borders.Default.Subdued};
  }
`;

const SubheadingFrame = styled(SpaceBetween)`
  margin: ${Margin.none} ${Margin.none} ${Margin.m} ${Margin.none};
`;

function joinIds(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export const CardSectionSlot: SlotComponent<ICardSectionProps> = (props) => {
  const {
    heading,
    children: rawChildren,
    "aria-labelledby": ariaLabelledBy,
    ...htmlProps
  } = props;

  const reactId = useId();
  const headingAction = getOptionalSlot(CardHeadingActionSlot, rawChildren);
  const children = getOtherChildren(rawChildren);

  const headingId = heading
    ? `card-section-${toKebabCase(heading)}-${reactId}`
    : undefined;

  return (
    <SectionFrame
      {...htmlProps}
      aria-labelledby={joinIds(ariaLabelledBy, headingId)}
    >
      <If is={heading}>
        <SubheadingFrame>
          <Subheading id={headingId}>{heading}</Subheading>
          <If is={headingAction}>{headingAction}</If>
        </SubheadingFrame>
      </If>

      {children}
    </SectionFrame>
  );
};

CardSectionSlot.__slot = true;
