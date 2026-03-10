import { IconMinor } from "components/icon";
import { Button } from "components/molecules/button";
import { CardFrame } from "components/shared-styled-components";
import { Body } from "components/typography";
import { Gap, Padding } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { If, Nothing } from "helpers/nothing";
import { Hex } from "helpers/numbers";
import { is, isNilOrEmpty, safeCallback } from "helpers/safe-navigation";
import styled from "styled-components";

import {
  AlertLevelProps,
  getBackgroundColor,
  getBorderColor,
  getIcon,
} from "./alert-level-flags";

type AlertBannerProps = AlertLevelProps &
  PropsWithChildren<{
    dismissible?: boolean;
    className?: string;
    open?: boolean;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
    onClose?: () => void;
  }>;

const InCardFrame = styled(CardFrame).attrs({ as: "div" })<{
  background: Hex;
  border: Hex;
}>`
  display: flex;
  padding: ${Padding.m};
  position: relative;
  flex-wrap: wrap;
  background: ${({ background }) => background};
  border: 1px solid ${({ border }) => border};
`;

const IconContainer = styled.div<{ $iconColor: Hex }>`
  width: fit-content;
  display: flex;
  svg {
    --icon-color: ${({ $iconColor }) => $iconColor};
    position: initial;
    color: var(--icon-color);
  }
`;

const AlertFooter = styled.footer`
  width: 100%;
  padding: ${Padding.m} ${Padding.xl} ${Padding.none};
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  gap: ${Gap.xs};
`;

const Content = styled(Body)`
  padding-left: ${Padding.xs};
  flex: 1;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 3px;
  background: none;
  border: none;
  padding: ${Padding.xs};
  cursor: pointer;

  &:focus {
    outline: 2px solid Highlight;
  }
`;

export const AlertBanner: FC<AlertBannerProps> = (props) => {
  const {
    open = true,
    dismissible = false,
    primaryButtonLabel,
    secondaryButtonLabel,
    onPrimaryAction,
    onSecondaryAction,
    onClose,
  } = props;

  const background = getBackgroundColor(props);
  const border = getBorderColor(props);

  const { icon: LevelIcon, color: iconColor } = getIcon(props);

  const handleClose = () => {
    safeCallback(onClose);
  };

  if (!is(open)) {
    return <Nothing />;
  }

  return (
    <InCardFrame
      role="alert"
      background={background}
      border={border}
      className={props.className}
    >
      <IconContainer $iconColor={iconColor}>
        <LevelIcon></LevelIcon>
      </IconContainer>
      <Content>{props.children}</Content>
      <If is={dismissible}>
        <CloseButton aria-label="Close" onClick={handleClose}>
          <IconMinor.Xmark />
        </CloseButton>
      </If>
      <If
        is={
          !isNilOrEmpty(primaryButtonLabel) ||
          !isNilOrEmpty(secondaryButtonLabel)
        }
      >
        <AlertFooter>
          <If is={!isNilOrEmpty(primaryButtonLabel)}>
            <Button
              outline
              onClick={onPrimaryAction}
              name="alert-banner-primary-button"
            >
              {primaryButtonLabel}
            </Button>
          </If>
          <If is={!isNilOrEmpty(secondaryButtonLabel)}>
            <Button
              plain
              subtle
              onClick={onSecondaryAction}
              name="alert-banner-secondary-button"
            >
              {secondaryButtonLabel}
            </Button>
          </If>
        </AlertFooter>
      </If>
    </InCardFrame>
  );
};
