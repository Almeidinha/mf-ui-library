import { Borders, Focused, Gap, Padding, Surface } from "@foundations";
import { IconMinor } from "components/icon";
import { Button } from "components/molecules/button";
import { Heading2 } from "components/typography";
import { ReactNode, useId } from "react";
import styled from "styled-components";

import { ModalBase, ModalBaseProps } from "./modal-base";

const ModalHeader = styled.header`
  min-height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Padding.m};
  border-bottom: 1px solid ${Borders.Default.Subdued};
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
    outline: 2px solid ${Focused.Default};
  }
`;

const ModalContent = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${Padding.m};
`;

const ModalFooter = styled.footer`
  width: 100%;
  padding: ${Padding.m};
  border-top: 1px solid ${Borders.Default.Subdued};
  box-sizing: border-box;
  display: flex;
  gap: ${Gap.xs};
  justify-content: flex-end;
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
      {title && (
        <ModalHeader>
          <Heading2 id={titleId} default>
            {title}
          </Heading2>
          <CloseButton onClick={onClose} aria-label={closeAriaLabel}>
            <IconMinor.Xmark />
          </CloseButton>
        </ModalHeader>
      )}

      <ModalContent>{children}</ModalContent>

      {hasFooter && (
        <ModalFooter>
          {customFooter ?? (
            <>
              {secondaryButtonLabel && (
                <Button
                  plain
                  subtle
                  onClick={onSecondaryAction}
                  name="modal-secondary-button"
                >
                  {secondaryButtonLabel}
                </Button>
              )}

              {closeButtonLabel && (
                <Button
                  onClick={onClose}
                  name="modal-close-button"
                  disabled={isPrimaryActionLoading}
                >
                  {closeButtonLabel}
                </Button>
              )}

              {primaryButtonLabel && (
                <Button
                  primary
                  onClick={onPrimaryAction}
                  name="modal-primary-button"
                  disabled={isPrimaryButtonDisabled || isPrimaryActionLoading}
                  loading={isPrimaryActionLoading}
                >
                  {primaryButtonLabel}
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      )}
    </ModalBase>
  );
}
