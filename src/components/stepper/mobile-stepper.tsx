import { Container, Flex } from "components/layout";
import { Button } from "components/molecules";
import { ProgressBar } from "components/progress-bar";
import { Borders, Surface, Text } from "foundation/colors";
import { Typography } from "foundation/typography";
import { If } from "helpers/nothing";
import { clamp } from "helpers/numbers";
import { defaultTo } from "helpers/safe-navigation";
import type { ReactNode } from "react";
import styled, { css } from "styled-components";

export type MobileStepperVariant = "text" | "dots" | "progress";

export type MobileStepperProps = {
  steps: number;
  activeStep: number;
  variant?: MobileStepperVariant;
  onBack?: () => void;
  onNext?: () => void;
  backButton?: ReactNode;
  nextButton?: ReactNode;
  position?: "static" | "sticky" | "fixed";
  className?: string;
  "aria-label"?: string;
};

const MobileRoot = styled(Flex)<{
  $position: "static" | "sticky" | "fixed";
}>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: ${Surface.Neutral.Default};
  border-top: 1px solid ${Borders.Default.Default};
  border-bottom: 1px solid ${Borders.Default.Default};

  > :nth-child(1),
  > :nth-child(3) {
    flex: 1; /* 25% each */
  }

  > :nth-child(2) {
    flex: 2; /* 50% */
  }

  > *:last-child {
    display: flex;
    justify-content: flex-end;
  }

  ${({ $position }) =>
    $position === "sticky"
      ? css`
          position: sticky;
          bottom: 0;
        `
      : $position === "fixed"
        ? css`
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
          `
        : css`
            position: static;
          `}
`;

const MobileCenter = styled(Flex)`
  min-width: 0;
  justify-content: center;
  align-items: center;
`;

const TextIndicator = styled.div`
  ${Typography.Label}
  color: ${Text.Default};
`;

const Dots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span<{
  $active: boolean;
}>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? Surface.Selected.Active : Surface.Default.Default};
`;

const NavButton = styled(Button).attrs({
  small: true,
  outline: true,
  plainSubtle: true,
})``;

export const MobileStepper = ({
  steps,
  activeStep,
  variant = "dots",
  onBack,
  onNext,
  backButton,
  nextButton,
  position = "static",
  className,
  "aria-label": ariaLabel = "Mobile progress",
}: MobileStepperProps) => {
  const safeSteps = Math.max(steps, 1);
  const safeActiveStep = clamp(activeStep, 0, safeSteps - 1);
  const isFirstStep = safeActiveStep === 0;
  const isLastStep = safeActiveStep === safeSteps - 1;
  const progressPercent =
    safeSteps <= 1 ? 100 : ((safeActiveStep + 1) / safeSteps) * 100;
  const dots = Array.from({ length: safeSteps }, (_, index) => {
    const stepNumber = index + 1;

    return (
      <Dot
        key={`mobile-step-${stepNumber}`}
        $active={stepNumber - 1 === safeActiveStep}
      />
    );
  });

  return (
    <MobileRoot
      className={className}
      $position={position}
      aria-label={ariaLabel}
    >
      <Container disableGutters>
        {defaultTo(
          backButton,
          <NavButton onClick={onBack} disabled={isFirstStep}>
            Back
          </NavButton>,
        )}
      </Container>

      <MobileCenter>
        <If is={variant === "text"}>
          <TextIndicator>
            {safeActiveStep + 1} / {safeSteps}
          </TextIndicator>
        </If>
        <If is={variant === "dots"}>
          <Dots aria-hidden="true">{dots}</Dots>
        </If>
        <If is={variant === "progress"}>
          <ProgressBar size="small" pulse progress={progressPercent} />
        </If>
      </MobileCenter>

      <Container disableGutters style={{ textAlign: "right" }}>
        {defaultTo(
          nextButton,
          <NavButton onClick={onNext} disabled={isLastStep}>
            Next
          </NavButton>,
        )}
      </Container>
    </MobileRoot>
  );
};
