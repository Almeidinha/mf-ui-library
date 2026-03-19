import { IconMinor } from "components/icon";
import { Button } from "components/molecules/button";
import { Heading2 } from "components/typography";
import { Borders, Focus, Surface } from "foundation/colors";
import { Gap, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import { ReactNode, useId } from "react";
import styled from "styled-components";

import { ModalBase, ModalBaseProps } from "./modal-base";

const ModalHeader = styled.header`
  min-height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Padding.m};
  border-bottom: 1px solid ${Borders.Default.Muted};
  flex-shrink: 0;
`;

const CloseButton = styled.button.attrs({ type: "button" })`
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 4px;

  &:hover {
    background-color: ${Surface.Default.Hover};
  }

  &:active {
    background-color: ${Surface.Default.Pressed};
  }

  &:focus-visible {
    outline: 2px solid ${Focus.Default};
  }
`;

const ModalContent = styled.div`
  padding: ${Padding.m};
  overflow-x: hidden;

  [data-scroll="paper"] &,
  [data-fullscreen="true"] & {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }

  [data-scroll="body"] & {
    overflow-y: visible;
  }
`;

const ModalFooter = styled.footer`
  width: 100%;
  padding: ${Padding.m};
  border-top: 1px solid ${Borders.Default.Muted};
  box-sizing: border-box;
  display: flex;
  gap: ${Gap.xs};
  justify-content: flex-end;
  flex-shrink: 0;
`;

export type ModalProps = ModalBaseProps & {
  title?: string;
  primaryButtonLabel?: string;
  closeButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  isPrimaryButtonDisabled?: boolean;
  isPrimaryActionLoading?: boolean;
  customFooter?: ReactNode;
  closeAriaLabel?: string;
};

export function Modal({
  title,
  children,
  primaryButtonLabel,
  closeButtonLabel,
  secondaryButtonLabel,
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  isPrimaryButtonDisabled,
  isPrimaryActionLoading = false,
  customFooter,
  closeAriaLabel = "Close modal",
  ...baseProps
}: ModalProps) {
  const titleId = useId();
  const hasFooter =
    !!customFooter ||
    !!secondaryButtonLabel ||
    !!closeButtonLabel ||
    !!primaryButtonLabel;

  return (
    <ModalBase
      {...baseProps}
      onClose={onClose}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : "Modal"}
    >
      <If is={isDefined(title)}>
        <ModalHeader>
          <Heading2 id={titleId} default>
            {title}
          </Heading2>
          <CloseButton onClick={onClose} aria-label={closeAriaLabel}>
            <IconMinor.Xmark />
          </CloseButton>
        </ModalHeader>
      </If>

      <ModalContent>{children}</ModalContent>

      <If is={hasFooter}>
        <ModalFooter>
          {customFooter ?? (
            <>
              <If is={isDefined(secondaryButtonLabel)}>
                <Button
                  plain
                  subtle
                  onClick={onSecondaryAction}
                  name="modal-secondary-button"
                >
                  {secondaryButtonLabel}
                </Button>
              </If>

              <If is={isDefined(closeButtonLabel)}>
                <Button
                  onClick={onClose}
                  name="modal-close-button"
                  disabled={isPrimaryActionLoading}
                >
                  {closeButtonLabel}
                </Button>
              </If>

              <If is={isDefined(primaryButtonLabel)}>
                <Button
                  primary
                  onClick={onPrimaryAction}
                  name="modal-primary-button"
                  disabled={isPrimaryButtonDisabled || isPrimaryActionLoading}
                  loading={isPrimaryActionLoading}
                >
                  {primaryButtonLabel}
                </Button>
              </If>
            </>
          )}
        </ModalFooter>
      </If>
    </ModalBase>
  );
}
