import { Interactive } from "foundation/colors";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { AnchorHTMLAttributes } from "react";
import styled, { css } from "styled-components";

export const HTMLAnchor = styled.a<{
  $disabled: boolean;
  $initialColor: string;
  $interactionColor: string;
  $pressedColor: string;
}>`
  color: ${({ $initialColor }) => $initialColor};
  text-decoration: underline;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  --icon-color: ${({ $disabled }) =>
    $disabled ? Interactive.Default.Disabled : Interactive.Default.Default};
  svg {
    color: var(--icon-color);
  }

  ${({ $disabled, $interactionColor, $pressedColor }) =>
    !$disabled &&
    css`
      &:hover {
        text-decoration: none;
        color: ${$interactionColor};
      }

      &:active {
        text-decoration: underline;
        color: ${$pressedColor};
      }
    `}
`;

export type ActionLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    subtle?: boolean;
    disabled?: boolean;
    newTab?: boolean;
  }
>;

const getInitialColor = ({
  subtle,
  disabled,
}: Pick<ActionLinkProps, "subtle" | "disabled">) => {
  if (disabled) {
    return Interactive.Default.Disabled;
  }

  return subtle ? Interactive.Subtle.Default : Interactive.Default.Default;
};

const getInteractionColor = ({ subtle }: Pick<ActionLinkProps, "subtle">) => {
  return subtle ? Interactive.Subtle.Hover : Interactive.Default.Hover;
};

const getPressedColor = ({ subtle }: Pick<ActionLinkProps, "subtle">) => {
  return subtle ? Interactive.Subtle.Pressed : Interactive.Default.Pressed;
};

export const ActionLink: FC<ActionLinkProps> = ({
  children,
  disabled = false,
  subtle,
  href,
  onClick,
  tabIndex,
  newTab = false,
  ...rest
}) => {
  const initialColor = getInitialColor({ subtle, disabled });
  const interactionColor = getInteractionColor({ subtle });
  const pressedColor = getPressedColor({ subtle });

  return (
    <HTMLAnchor
      {...rest}
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      target={newTab ? "_blank" : rest.target}
      rel={newTab ? "noopener noreferrer" : rest.rel}
      $disabled={disabled}
      $initialColor={initialColor}
      $interactionColor={interactionColor}
      $pressedColor={pressedColor}
    >
      {children}
    </HTMLAnchor>
  );
};
