import { IconMinor } from "components/icon";
import { Icons } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { is } from "helpers/safe-navigation";
import styled, { keyframes } from "styled-components";

import { getValuesBySize, SpinnerSizeProps } from "./spinner-size-flags";

const spinAnimation = keyframes`
  to { transform: rotate(360deg); }
`;

const Spin = styled.div<{
  $size: string;
  $onPrimary: boolean;
  $onCritical: boolean;
}>`
  --icon-color: ${({ $onPrimary, $onCritical }) =>
    $onCritical
      ? Icons.OnCritical
      : $onPrimary
        ? Icons.OnPrimary
        : Icons.Default};
  color: var(--icon-color);

  i,
  svg {
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
  }

  svg {
    transform-origin: 50% 50%;
    animation: ${spinAnimation} 1s linear infinite;
  }

  /* robust: cover more than just path */
  svg path,
  svg circle,
  svg rect,
  svg ellipse,
  svg polygon {
    fill: currentColor;
  }
`;

type IProps = SpinnerSizeProps & {
  onPrimary?: boolean;
  onCritical?: boolean;
  className?: string;
};

export const Spinner: FC<IProps> = ({
  onPrimary,
  onCritical,
  className,
  ...props
}) => {
  const size = getValuesBySize(props);

  return (
    <Spin
      role="status"
      aria-label="Loading"
      $onPrimary={is(onPrimary)}
      $onCritical={is(onCritical)}
      $size={size}
      className={className}
    >
      <IconMinor.Spinner aria-hidden="true" />
    </Spin>
  );
};
