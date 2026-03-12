import {
  FC,
  getOptionalSlot,
  If,
  PropsWithChildren,
  SlotComponent,
  toKebabCase,
} from "@helpers";
import { leftRightLayoutGenerator } from "components/layout";
import { useId } from "react";

import { Card, ICardProps } from "./card";

const { Layout } = leftRightLayoutGenerator();

const Right: SlotComponent = (props) => props.children;
Right.__slot = true;

const Controls: SlotComponent<PropsWithChildren> = (props) => props.children;
Controls.__slot = true;

type SubComponents = {
  Right: typeof Right;
  Controls: typeof Controls;
};

interface ILeftRightCardProps extends ICardProps {
  helpText?: string;
  className?: string;
}

export const LeftRightCard: FC<ILeftRightCardProps, SubComponents> = ({
  children,
  heading,
  helpText,
  className,
  ...cardProps
}) => {
  const reactId = useId();
  const right = getOptionalSlot(Right, children);
  const controls = getOptionalSlot(Controls, children);

  const headingId = heading
    ? `left-right-card-heading-${toKebabCase(heading)}-${reactId}`
    : undefined;

  const helpTextId = helpText
    ? `left-right-card-help-${toKebabCase(helpText)}-${reactId}`
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

      <If is={controls}>
        <Card.Controls>{controls}</Card.Controls>
      </If>
    </Card>
  );
};

LeftRightCard.Right = Right;
LeftRightCard.Controls = Controls;
