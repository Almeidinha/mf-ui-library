import { Borders, Surface, Text } from "foundation/colors";
import { clamp } from "helpers/numbers";
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

const MobileRoot = styled.div<{
  $position: "static" | "sticky" | "fixed";
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: ${Surface.Neutral.Default};
  border-top: 1px solid ${Borders.Default.Default};
  border-bottom: 1px solid ${Borders.Default.Default};

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

const MobileCenter = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextIndicator = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
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
    $active ? Surface.Selected.Default : Surface.Default.Default};
`;

const ProgressTrack = styled.div`
  width: 100%;
  max-width: 160px;
  height: 6px;
  border-radius: 999px;
  background: ${Surface.Default.Default};
  overflow: hidden;
`;

const ProgressFill = styled.div<{
  $percent: number;
}>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: ${Surface.Selected.Default};
  transition: width 0.2s ease;
`;

const NavButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 6px 8px;
  border-radius: 6px;
  font: inherit;
  color: ${Text.Active};
  cursor: pointer;

  &:disabled {
    color: ${Text.Subdued};
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${Borders.Highlight.Default};
    outline-offset: 2px;
  }
`;

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
      <div>
        {backButton ?? (
          <NavButton type="button" onClick={onBack} disabled={isFirstStep}>
            Back
          </NavButton>
        )}
      </div>

      <MobileCenter>
        {variant === "text" && (
          <TextIndicator>
            {safeActiveStep + 1} / {safeSteps}
          </TextIndicator>
        )}

        {variant === "dots" && <Dots aria-hidden="true">{dots}</Dots>}

        {variant === "progress" && (
          <ProgressTrack aria-hidden="true">
            <ProgressFill $percent={progressPercent} />
          </ProgressTrack>
        )}
      </MobileCenter>

      <div>
        {nextButton ?? (
          <NavButton type="button" onClick={onNext} disabled={isLastStep}>
            Next
          </NavButton>
        )}
      </div>
    </MobileRoot>
  );
};
