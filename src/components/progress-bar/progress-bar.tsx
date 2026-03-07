import { Actions, Surface } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { clamp } from "helpers/numbers";
import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
`;

const Track = styled.div<{ $size: string }>`
  width: 100%;
  height: ${({ $size }) => $size};
  background-color: ${Surface.Neutral.Default};
  border-radius: 999px;
  overflow: hidden;
`;

const Fill = styled.div<{ $progress: number; $pulse?: boolean }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${Actions.Primary.Default};
  border-radius: inherit;
  position: relative;
  overflow: hidden; /* ensures overlay stays clipped */

  ${({ $pulse }) =>
    $pulse &&
    css`
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        /* a moving highlight that reads as “forward motion” */
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.22) 50%,
          transparent 100%
        );
        transform: translateX(-120%);
        animation: ${shimmer} 1.2s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        &::after {
          animation: none;
        }
      }
    `}
`;

type ProgressBarSize = "small" | "medium" | "large";

const SIZE_MAP: Record<ProgressBarSize, string> = {
  small: "8px",
  medium: "16px",
  large: "32px",
};

export type ProgressBarProps = {
  progress: number;
  size?: ProgressBarSize;
  pulse?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  size = "medium",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  pulse = false,
  ...rest
}) => {
  const safeProgress = clamp(progress, 0, 100);

  return (
    <Track
      $size={SIZE_MAP[size]}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuetext={`${safeProgress}%`}
      {...rest}
    >
      <Fill $progress={safeProgress} $pulse={pulse && safeProgress < 100} />
    </Track>
  );
};
