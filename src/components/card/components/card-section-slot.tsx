import { Borders, Margin, Padding, Typography } from "@foundations";
import {
  getOtherChildren,
  getSlot,
  If,
  isDefined,
  PropsWithChildren,
  Slot,
  toKebabCase,
} from "@helpers";
import { SpaceBetween } from "components/layout";
import { Heading4 } from "components/typography";
import { HTMLAttributes } from "react";
import styled from "styled-components";

export class CardHeadingActionSlot extends Slot {}

interface ICardSectionProps
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
  ${Typography.Body}
`;

const SubheadingFrame = styled(SpaceBetween)`
  margin: ${Margin.none} ${Margin.none} ${Margin.m} ${Margin.none};
`;

function joinIds(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export class CardSectionSlot extends Slot<ICardSectionProps> {
  override render() {
    const {
      heading,
      children: rawChildren,
      "aria-labelledby": ariaLabelledBy,
      ...htmlProps
    } = this.props;

    const headingAction = getSlot(CardHeadingActionSlot, rawChildren);
    const children = getOtherChildren(rawChildren);
    const headingId = isDefined(heading)
      ? `card-section-${toKebabCase(heading)}`
      : undefined;

    return (
      <SectionFrame
        {...htmlProps}
        aria-labelledby={joinIds(
          ariaLabelledBy,
          heading ? headingId : undefined,
        )}
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
  }
}
