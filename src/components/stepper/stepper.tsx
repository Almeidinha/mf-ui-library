import { Flex } from "components/layout";
import { Borders, Surface, TextColors } from "foundation/colors";
import { Gap, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { clamp } from "helpers/numbers";
import React from "react";
import styled, { css } from "styled-components";

type StepStatus = "inactive" | "active" | "completed" | "error";
export type StepperOrientation = "horizontal" | "vertical";

export type StepItem = {
  label: React.ReactNode;
  description?: React.ReactNode;
  optional?: React.ReactNode;
  completed?: boolean;
  disabled?: boolean;
  error?: boolean;
  content?: React.ReactNode;
  icon?: React.ReactNode;
};

export type StepperProps = {
  steps: StepItem[];
  activeStep: number;
  orientation?: StepperOrientation;
  alternativeLabel?: boolean;
  nonLinear?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  "aria-label"?: string;
};

const Root = styled(Flex)<{
  $orientation: StepperOrientation;
  $alternativeLabel: boolean;
}>`
  width: 100%;
  padding: ${Padding.none} ${Padding.m};

  ${({ $orientation, $alternativeLabel }) =>
    $orientation === "horizontal"
      ? css`
          flex-direction: row;
          align-items: ${$alternativeLabel ? "flex-start" : "center"};
          gap: ${$alternativeLabel ? Gap.none : Gap.none};
        `
      : css`
          flex-direction: column;
          align-items: stretch;
          gap: ${Gap.xs};
        `}
`;

const StepRoot = styled(Flex)<{
  $orientation: StepperOrientation;
  $alternativeLabel: boolean;
}>`
  position: relative;
  min-width: 0;

  ${({ $orientation, $alternativeLabel }) =>
    $orientation === "horizontal"
      ? $alternativeLabel
        ? css`
            flex: 1 1 0;
            flex-direction: column;
            align-items: stretch;
          `
        : css`
            flex: 0 0 auto;
            flex-direction: column;
            align-items: stretch;
          `
      : css`
          flex-direction: row;
          align-items: flex-start;
        `}
`;

const HorizontalHeader = styled(Flex)<{
  $alternativeLabel: boolean;
}>`
  width: 100%;
  min-width: 0;
  align-items: center;

  ${({ $alternativeLabel }) =>
    $alternativeLabel
      ? css`
          justify-content: center;
        `
      : css`
          justify-content: flex-start;
        `}
`;

const VerticalHeader = styled(Flex)`
  align-items: flex-start;
  min-width: 0;
`;

const StepTrigger = styled.button<{
  $clickable: boolean;
  $disabled: boolean;
  $alternativeLabel: boolean;
}>`
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  color: inherit;
  text-align: inherit;
  cursor: ${({ $clickable, $disabled }) =>
    $clickable && !$disabled ? "pointer" : "default"};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  display: flex;

  ${({ $alternativeLabel }) =>
    $alternativeLabel
      ? css`
          width: 100%;
          flex: 1 1 auto;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        `
      : css`
          width: auto;
          flex: 0 0 auto;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        `}

  &:focus-visible {
    outline: 2px solid ${Borders.Highlight.Default};
    outline-offset: 4px;
    border-radius: 8px;
  }
`;

const HorizontalVisual = styled(Flex)`
  width: auto;
  align-items: center;
  gap: 8px;
`;

const AlternativeVisualRow = styled(Flex)`
  width: 100%;
  align-items: center;
  min-width: 0;
`;

const AlternativeConnector = styled.div<{
  $completed: boolean;
  $hidden?: boolean;
}>`
  flex: 1 1 0;
  min-width: 0;
  height: 2px;
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  background: ${({ $completed }) =>
    $completed ? Surface.Success.Default : Surface.Default.Active};
`;

const AlternativeIconWrap = styled(Flex)`
  flex: 0 0 auto;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
`;

const VerticalVisual = styled(Flex)`
  align-items: center;
  flex-shrink: 0;
  margin-right: 12px;
`;

const IconCircle = styled.div<{
  $status: StepStatus;
}>`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  font-size: 14px;
  font-weight: 700;

  ${({ $status }) => {
    switch ($status) {
      case "completed":
        return css`
          background: ${Surface.Success.Default};
          border-color: ${Borders.Success.Active};
          color: ${TextColors.Default};
        `;
      case "active":
        return css`
          background: ${Surface.Selected.Default};
          border-color: ${Borders.Highlight.Active};
          color: ${TextColors.Default};
        `;
      case "error":
        return css`
          background: ${Surface.Critical.Default};
          border-color: ${Borders.Critical.Default};
          color: ${TextColors.Default};
        `;
      default:
        return css`
          background: ${Surface.Default.Default};
          border-color: ${Borders.Default.Default};
          color: ${TextColors.Default};
        `;
    }
  }}
`;

const HorizontalConnector = styled.div<{
  $completed: boolean;
}>`
  flex: 1 1 0;
  min-width: 24px;
  align-self: center;
  height: 2px;
  margin: 0 12px;
  background: ${({ $completed }) =>
    $completed ? Surface.Success.Default : Surface.Default.Active};
`;

const VerticalConnector = styled.div<{
  $completed: boolean;
}>`
  width: 2px;
  min-height: 32px;
  margin-top: 8px;
  background: ${({ $completed }) =>
    $completed ? Surface.Success.Default : Surface.Default.Active};
`;

const LabelBlock = styled(Flex)<{
  $alternativeLabel: boolean;
  $orientation: StepperOrientation;
}>`
  min-width: 0;

  ${({ $orientation, $alternativeLabel }) =>
    $orientation === "horizontal"
      ? css`
          margin-top: ${$alternativeLabel ? "12px" : "0"};
          align-items: ${$alternativeLabel ? "center" : "flex-start"};
          text-align: ${$alternativeLabel ? "center" : "left"};
          width: ${$alternativeLabel ? "100%" : "auto"};
        `
      : css`
          align-items: flex-start;
          text-align: left;
          padding-bottom: 16px;
        `}
`;

const Label = styled.span<{
  $status: StepStatus;
}>`
  ${TypographyStyles.Label};
  font-weight: ${({ $status }) => ($status === "active" ? 700 : 600)};
  color: ${({ $status }) =>
    $status === "error" ? TextColors.Critical : TextColors.Default};
`;

const OptionalText = styled.span`
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: ${TextColors.Muted};
`;

const Description = styled.span`
  ${TypographyStyles.Caption};
  color: ${TextColors.Muted};
`;

const VerticalContent = styled.div`
  margin-left: 44px;
  margin-top: -4px;
  padding: 0 0 20px 0;
`;

function getStepStatus(
  step: StepItem,
  index: number,
  activeStep: number,
): StepStatus {
  if (step.error) {
    return "error";
  }
  if (step.completed) {
    return "completed";
  }
  if (index === activeStep) {
    return "active";
  }
  return "inactive";
}

function isStepDisabled(
  step: StepItem,
  index: number,
  activeStep: number,
  nonLinear: boolean,
) {
  if (step.disabled) {
    return true;
  }
  if (nonLinear) {
    return false;
  }
  return index > activeStep;
}

function getStepKey(step: StepItem, index: number) {
  if (typeof step.label === "string" || typeof step.label === "number") {
    return `step-${step.label}`;
  }

  if (
    typeof step.description === "string" ||
    typeof step.description === "number"
  ) {
    return `step-${step.description}`;
  }

  return `step-item-${index + 1}`;
}

function DefaultStepIcon({
  index,
  status,
}: {
  index: number;
  status: StepStatus;
}) {
  if (status === "completed") {
    return <span aria-hidden="true">✓</span>;
  }
  if (status === "error") {
    return <span aria-hidden="true">!</span>;
  }
  return <span aria-hidden="true">{index + 1}</span>;
}

export const Stepper = ({
  steps,
  activeStep,
  orientation = "horizontal",
  alternativeLabel = false,
  nonLinear = false,
  onStepClick,
  className,
  "aria-label": ariaLabel = "Progress",
}: StepperProps) => {
  const safeActiveStep = clamp(activeStep, 0, Math.max(steps.length - 1, 0));

  return (
    <Root
      className={className}
      $orientation={orientation}
      $alternativeLabel={alternativeLabel}
      aria-label={ariaLabel}
      role="list"
    >
      {steps.map((step, index) => {
        const status = getStepStatus(step, index, safeActiveStep);
        const disabled = isStepDisabled(step, index, safeActiveStep, nonLinear);
        const clickable = typeof onStepClick === "function";
        const isLast = index === steps.length - 1;
        const showVerticalContent =
          orientation === "vertical" &&
          index === safeActiveStep &&
          step.content;

        const triggerProps = {
          type: "button" as const,
          onClick: () => {
            if (!disabled && onStepClick) {
              onStepClick(index);
            }
          },
          "aria-current":
            index === safeActiveStep ? ("step" as const) : undefined,
          "aria-disabled": disabled || undefined,
          tabIndex: disabled ? -1 : 0,
        };

        const stepKey = getStepKey(step, index);

        const stepNode = (
          <StepRoot
            $orientation={orientation}
            $alternativeLabel={alternativeLabel}
            role="listitem"
          >
            {orientation === "horizontal" ? (
              alternativeLabel ? (
                <HorizontalHeader $alternativeLabel>
                  <StepTrigger
                    {...triggerProps}
                    $clickable={clickable}
                    $disabled={disabled}
                    $alternativeLabel
                  >
                    <AlternativeVisualRow>
                      <AlternativeConnector
                        $hidden={index === 0}
                        $completed={index <= safeActiveStep - 1}
                      />

                      <AlternativeIconWrap>
                        <IconCircle $status={status}>
                          {step.icon ?? (
                            <DefaultStepIcon index={index} status={status} />
                          )}
                        </IconCircle>
                      </AlternativeIconWrap>

                      <AlternativeConnector
                        $hidden={isLast}
                        $completed={Boolean(
                          step.completed || index < safeActiveStep,
                        )}
                      />
                    </AlternativeVisualRow>

                    <LabelBlock
                      column
                      $alternativeLabel
                      $orientation="horizontal"
                    >
                      <Label $status={status}>{step.label}</Label>
                      {step.optional ? (
                        <OptionalText>{step.optional}</OptionalText>
                      ) : null}
                      {step.description ? (
                        <Description>{step.description}</Description>
                      ) : null}
                    </LabelBlock>
                  </StepTrigger>
                </HorizontalHeader>
              ) : (
                <HorizontalHeader $alternativeLabel={false}>
                  <StepTrigger
                    {...triggerProps}
                    $clickable={clickable}
                    $disabled={disabled}
                    $alternativeLabel={false}
                  >
                    <HorizontalVisual>
                      <IconCircle $status={status}>
                        {step.icon ?? (
                          <DefaultStepIcon index={index} status={status} />
                        )}
                      </IconCircle>

                      <LabelBlock
                        column
                        $alternativeLabel={false}
                        $orientation="horizontal"
                      >
                        <Label $status={status}>{step.label}</Label>
                        {step.optional ? (
                          <OptionalText>{step.optional}</OptionalText>
                        ) : null}
                        {step.description ? (
                          <Description>{step.description}</Description>
                        ) : null}
                      </LabelBlock>
                    </HorizontalVisual>
                  </StepTrigger>
                </HorizontalHeader>
              )
            ) : (
              <VerticalHeader>
                <StepTrigger
                  {...triggerProps}
                  $clickable={clickable}
                  $disabled={disabled}
                  $alternativeLabel={false}
                >
                  <VerticalVisual column>
                    <IconCircle $status={status}>
                      {step.icon ?? (
                        <DefaultStepIcon index={index} status={status} />
                      )}
                    </IconCircle>

                    {!isLast ? (
                      <VerticalConnector
                        $completed={Boolean(
                          step.completed || index < safeActiveStep,
                        )}
                      />
                    ) : null}
                  </VerticalVisual>

                  <LabelBlock
                    column
                    $alternativeLabel={false}
                    $orientation="vertical"
                  >
                    <Label $status={status}>{step.label}</Label>
                    {step.optional ? (
                      <OptionalText>{step.optional}</OptionalText>
                    ) : null}
                    {step.description ? (
                      <Description>{step.description}</Description>
                    ) : null}
                  </LabelBlock>
                </StepTrigger>
              </VerticalHeader>
            )}

            {showVerticalContent ? (
              <VerticalContent>{step.content}</VerticalContent>
            ) : null}
          </StepRoot>
        );

        if (orientation === "horizontal" && !alternativeLabel && !isLast) {
          return (
            <React.Fragment key={stepKey}>
              {stepNode}
              <HorizontalConnector
                $completed={Boolean(
                  steps[index + 1]?.completed || index < safeActiveStep,
                )}
              />
            </React.Fragment>
          );
        }

        return React.cloneElement(stepNode, { key: stepKey });
      })}
    </Root>
  );
};
