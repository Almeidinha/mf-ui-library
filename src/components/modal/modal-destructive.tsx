import { Button } from "components/molecules/button";
import { Gap, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import styled from "styled-components";

import { ModalBase, ModalBaseProps } from "./modal-base";

const ModalContent = styled.div`
  padding: ${Padding.xl} ${Padding.xl} ${Padding.none};
`;

const ModalFooter = styled.footer`
  width: 100%;
  padding: ${Padding.m} ${Padding.xl} ${Padding.xl};
  box-sizing: border-box;
  display: flex;
  gap: ${Gap.xs};
  justify-content: flex-end;
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
      modalSize="critical"
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
