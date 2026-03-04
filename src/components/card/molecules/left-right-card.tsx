import {
  FC,
  getSlot,
  If,
  isDefined,
  PropsWithChildren,
  Slot,
  toKebabCase,
} from "@helpers";
import { leftRightLayoutGenerator } from "components/layout";

import { Card, ICardProps } from "../card";

const { Layout } = leftRightLayoutGenerator();

class Right extends Slot {}
class Controls extends Slot<PropsWithChildren> {}

type SubComponents = {
  Right: typeof Right;
  Controls: typeof Controls;
};

interface ILeftRightCardProps extends ICardProps {
  helpText?: string;
  className?: string;
}

export const LeftRightCard: FC<ILeftRightCardProps, SubComponents> = (
  props,
) => {
  const { children, heading, helpText, className, ...cardProps } = props;

  const right = getSlot(Right, children);
  const controls = getSlot(Controls, children);

  const headingId = isDefined(heading)
    ? `left-right-card-heading-${toKebabCase(heading)}`
    : undefined;

  const helpTextId = isDefined(helpText)
    ? `left-right-card-help-${toKebabCase(helpText)}`
    : undefined;

  return (
    <Card className={className} {...cardProps}>
      <Card.Section aria-labelledby={headingId}>
        <Layout>
          <Layout.Left>
            <If is={heading}>
              <Layout.HeadingText id={headingId}>{heading}</Layout.HeadingText>
            </If>

            <If is={helpText}>
              <Layout.HelpText id={helpTextId}>{helpText}</Layout.HelpText>
            </If>
          </Layout.Left>

          <Layout.Right>
            <div aria-describedby={helpTextId}>{right}</div>
          </Layout.Right>
        </Layout>
      </Card.Section>

      <Card.Controls>{controls}</Card.Controls>
    </Card>
  );
};

LeftRightCard.Right = Right;
LeftRightCard.Controls = Controls;
