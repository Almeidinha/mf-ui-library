import { Flex } from "components/layout";
import { Heading4 } from "components/typography";
import { Borders } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { PropsWithChildren } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import { getOtherChildren, getSlot, Slot } from "helpers/slots";
import { toKebabCase } from "helpers/strings";
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
    border-top: 1px solid ${Borders.Default.Muted};
  }
  ${Typography.Body}
`;

const SubheadingFrame = styled(Flex).attrs({ justify: "space-between" })`
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
