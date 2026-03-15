import { Button } from "components/molecules/button";
import { Gap, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import styled from "styled-components";

import { ModalBase, ModalBaseProps } from "./modal-base";

const ModalContent = styled.div`
  padding: ${Padding.xl} ${Padding.xl} ${Padding.none};
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
  padding: ${Padding.m} ${Padding.xl} ${Padding.xl};
  box-sizing: border-box;
  display: flex;
  gap: ${Gap.xs};
  justify-content: flex-end;
  flex-shrink: 0;
`;

const CustomButton = styled(Button)`
  width: calc(50% - 4px);
`;

export interface ModalDestructiveProps extends ModalBaseProps {
  primaryButtonLabel?: string;
  closeButtonLabel: string;
  onPrimaryAction: () => void;
}

export function ModalDestructive({
  children,
  primaryButtonLabel,
  closeButtonLabel,
  onPrimaryAction,
  onClose,
  ...baseProps
}: ModalDestructiveProps) {
  return (
    <ModalBase
      {...baseProps}
      onClose={onClose}
      maxWidth="sm"
      aria-label="Confirmation dialog"
    >
      <ModalContent>{children}</ModalContent>

      <ModalFooter>
        <CustomButton onClick={onClose}>{closeButtonLabel}</CustomButton>

        <If is={isDefined(primaryButtonLabel)}>
          <CustomButton primary destructive onClick={onPrimaryAction}>
            {primaryButtonLabel}
          </CustomButton>
        </If>
      </ModalFooter>
    </ModalBase>
  );
}
