import { Actions, Borders, Icons, Interactive, Text } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { PropsWithChildren, RequireOnlyOne } from "helpers/generic-types";

export const enum ButtonType {
  Basic = 1,
  Primary = 2,
  Destructive = 4,
  DestructivePrimary = 6,
  Outline = 8,
  Plain = 16,
  Subtle = 32,
  PlainSubtle = 48,
}

const enum ButtonSize {
  Default = 1,
  Small = 2,
  Large = 4,
}

const enum ButtonDisabledType {
  Enabled = 1,
  Disabled = 2,
}

type ButtonTypeFlags<T> = {
  basic?: T;
  primary?: T;
  destructive?: T;
  destructivePrimary?: T;
  outline?: T;
  plain?: T;
  subtle?: T;
  plainSubtle?: T;
};

type ButtonSizeFlags<T> = {
  default?: T;
  small?: T;
  large?: T;
};

type ButtonDisabledTypeFlags<T> = {
  enabled?: T;
  disabled?: T;
};

export type ButtonTypeProps = Partial<ButtonTypeFlags<boolean>> &
  PropsWithChildren;

export type ButtonSizeProps = Partial<
  RequireOnlyOne<ButtonSizeFlags<boolean>>
> &
  PropsWithChildren;

export type ButtonDisabledTypeProps = Partial<
  RequireOnlyOne<ButtonDisabledTypeFlags<boolean>>
> &
  PropsWithChildren;

function getTypeFromProps(props: ButtonTypeProps): ButtonType {
  if ((props.primary && props.destructive) || props.destructivePrimary) {
    return ButtonType.DestructivePrimary;
  }
  if ((props.subtle && props.plain) || props.plainSubtle) {
    return ButtonType.PlainSubtle;
  }
  if (props.basic) {
    return ButtonType.Basic;
  }
  if (props.primary) {
    return ButtonType.Primary;
  }
  if (props.destructive) {
    return ButtonType.Destructive;
  }
  if (props.outline) {
    return ButtonType.Outline;
  }
  if (props.plain) {
    return ButtonType.Plain;
  }
  return ButtonType.Basic;
}

function getSizeFromProps(props: ButtonSizeProps): ButtonSize {
  if (props.small) {
    return ButtonSize.Small;
  }
  if (props.large) {
    return ButtonSize.Large;
  }
  return ButtonSize.Default;
}

function getDisabledFromProps(
  props: ButtonDisabledTypeProps,
): ButtonDisabledType {
  if (props.enabled) {
    return ButtonDisabledType.Enabled;
  }
  if (props.disabled) {
    return ButtonDisabledType.Disabled;
  }
  return ButtonDisabledType.Enabled;
}

const ButtonBackgroundColorValues = {
  [ButtonType.Basic]: Actions.Secondary.Default,
  [ButtonType.Primary]: Actions.Primary.Default,
  [ButtonType.DestructivePrimary]: Actions.Critical.Default,
  [ButtonType.Destructive]: "none",
  [ButtonType.Outline]: "none",
  [ButtonType.Plain]: "none",
  [ButtonType.Subtle]: "none",
  [ButtonType.PlainSubtle]: "none",
};

const ButtonBackgroundColorDisabledValues = {
  [ButtonType.Basic]: Actions.Secondary.Disabled,
  [ButtonType.Primary]: Actions.Primary.Disabled,
  [ButtonType.DestructivePrimary]: Actions.Critical.Disabled,
  [ButtonType.Destructive]: Actions.Secondary.Disabled,
  [ButtonType.Outline]: "none",
  [ButtonType.Plain]: "none",
  [ButtonType.Subtle]: Actions.Secondary.Disabled,
  [ButtonType.PlainSubtle]: "none",
};

const ButtonBackgroundColorHoverValues = {
  [ButtonType.Basic]: Actions.Secondary.Hover,
  [ButtonType.Primary]: Actions.Primary.Hover,
  [ButtonType.DestructivePrimary]: Actions.Critical.Hover,
  [ButtonType.Destructive]: Actions.Critical.Hover,
  [ButtonType.Outline]: Actions.Secondary.Hover,
  [ButtonType.Plain]: "",
  [ButtonType.Subtle]: Actions.Secondary.Hover,
  [ButtonType.PlainSubtle]: "",
};

const ButtonTextDecorationHoverValues = {
  [ButtonType.Basic]: "",
  [ButtonType.Primary]: "",
  [ButtonType.DestructivePrimary]: "",
  [ButtonType.Destructive]: "",
  [ButtonType.Outline]: "",
  [ButtonType.Plain]: "underline",
  [ButtonType.Subtle]: "",
  [ButtonType.PlainSubtle]: "underline",
};

const ButtonBackgroundColorPressedValues = {
  [ButtonType.Basic]: Actions.Secondary.Pressed,
  [ButtonType.Primary]: Actions.Primary.Pressed,
  [ButtonType.DestructivePrimary]: Actions.Critical.Pressed,
  [ButtonType.Destructive]: Actions.Critical.Pressed,
  [ButtonType.Outline]: Actions.Secondary.Pressed,
  [ButtonType.Plain]: Actions.Secondary.Hover,
  [ButtonType.Subtle]: Actions.Secondary.Pressed,
  [ButtonType.PlainSubtle]: Actions.Secondary.Hover,
};

const ButtonTextColorValues = {
  [ButtonType.Basic]: Text.Default,
  [ButtonType.Primary]: Text.OnPrimary,
  [ButtonType.DestructivePrimary]: Text.OnCritical,
  [ButtonType.Destructive]: Text.Default,
  [ButtonType.Outline]: Text.Default,
  [ButtonType.Plain]: Interactive.Default.Default,
  [ButtonType.Subtle]: Text.Default,
  [ButtonType.PlainSubtle]: Interactive.Subtle.Default,
};

const IconTextColorValues = {
  [ButtonType.Basic]: Icons.Default,
  [ButtonType.Primary]: Icons.OnPrimary,
  [ButtonType.DestructivePrimary]: Icons.OnCritical,
  [ButtonType.Destructive]: Icons.Default,
  [ButtonType.Outline]: Icons.Default,
  [ButtonType.Plain]: Interactive.Default.Default,
  [ButtonType.Subtle]: Icons.Default,
  [ButtonType.PlainSubtle]: Icons.Default,
};

const ButtonTextColorHoverValues = {
  [ButtonType.Basic]: Text.Default,
  [ButtonType.Primary]: Text.OnPrimary,
  [ButtonType.DestructivePrimary]: Text.OnCritical,
  [ButtonType.Destructive]: Text.OnCritical,
  [ButtonType.Outline]: Text.Default,
  [ButtonType.Plain]: Interactive.Default.Hover,
  [ButtonType.Subtle]: Text.Default,
  [ButtonType.PlainSubtle]: Interactive.Subtle.Hover,
};

const IconColorHoverValues = {
  [ButtonType.Basic]: Icons.Default,
  [ButtonType.Primary]: Icons.OnPrimary,
  [ButtonType.DestructivePrimary]: Icons.OnCritical,
  [ButtonType.Destructive]: Icons.OnCritical,
  [ButtonType.Outline]: Icons.Default,
  [ButtonType.Plain]: Interactive.Default.Hover,
  [ButtonType.Subtle]: Icons.Default,
  [ButtonType.PlainSubtle]: Interactive.Subtle.Hover,
};

const ButtonBorderValues = {
  [ButtonType.Basic]: `1px solid ${Borders.Default.Default}`,
  [ButtonType.Primary]: "none",
  [ButtonType.DestructivePrimary]: "none",
  [ButtonType.Destructive]: `1px solid ${Borders.Default.Default}`,
  [ButtonType.Outline]: `1px solid ${Borders.Default.Default}`,
  [ButtonType.Plain]: "none",
  [ButtonType.Subtle]: `1px solid ${Borders.Default.Default}`,
  [ButtonType.PlainSubtle]: "none",
};

const ButtonBorderDisabledValues = {
  [ButtonType.Basic]: `1px solid ${Borders.Default.Muted}`,
  [ButtonType.Primary]: "none",
  [ButtonType.DestructivePrimary]: "none",
  [ButtonType.Destructive]: `1px solid ${Borders.Default.Muted}`,
  [ButtonType.Outline]: `1px solid ${Borders.Default.Default}`,
  [ButtonType.Plain]: "none",
  [ButtonType.Subtle]: `1px solid ${Borders.Default.Muted}`,
  [ButtonType.PlainSubtle]: "none",
};

const ButtonTextColorDisabled = {
  [ButtonDisabledType.Enabled]: "",
  [ButtonDisabledType.Disabled]: Text.Disabled,
};

const ButtonCursor = {
  [ButtonDisabledType.Enabled]: "pointer",
  [ButtonDisabledType.Disabled]: "not-allowed",
};

const ButtonSizeValues = {
  [ButtonSize.Small]: `${Padding.xxs} ${Padding.s}`,
  [ButtonSize.Default]: `${Padding.xs} ${Padding.m}`,
  [ButtonSize.Large]: `${Padding.s} ${Padding.l}`,
};

const ButtonSizeValuesByType = {
  [ButtonType.Basic]: "",
  [ButtonType.Primary]: "",
  [ButtonType.DestructivePrimary]: "",
  [ButtonType.Destructive]: "",
  [ButtonType.Outline]: "",
  [ButtonType.Plain]: `${Padding.xxxs} ${Padding.xxs}`,
  [ButtonType.Subtle]: "",
  [ButtonType.PlainSubtle]: `${Padding.xxxs} ${Padding.xxs}`,
};

export const BUTTON_FRAME_BLOCKED_PROPS = new Set([
  "backgroundColor",
  "buttonSize",
  "cursor",
  "backgroundHover",
  "textDecorationHover",
  "backgroundPressed",
  "textColorHover",
  "buttonBorder",
  "isDisabled",
  "iconColor",
  "iconColorHover",
  "subtle",
  "basic",
  "primary",
  "destructive",
  "outline",
  "plain",
  "small",
  "large",
]);

export function getBackgroundColorByType(type: ButtonType): string {
  return ButtonBackgroundColorValues[type];
}

export function getBackgroundColorHoverByType(type: ButtonType): string {
  return ButtonBackgroundColorHoverValues[type];
}

export function getTextDecorationHoverByType(type: ButtonType): string {
  return ButtonTextDecorationHoverValues[type];
}

export function getBackgroundColorDisabledByType(type: ButtonType): string {
  return ButtonBackgroundColorDisabledValues[type];
}

export function getBackgroundColorPressedByType(type: ButtonType): string {
  return ButtonBackgroundColorPressedValues[type];
}

export function getTextColorByType(type: ButtonType): string {
  return ButtonTextColorValues[type];
}

export function getIconColorByType(type: ButtonType): string {
  return IconTextColorValues[type];
}

export function getTextColorOnHoverByType(type: ButtonType): string {
  return ButtonTextColorHoverValues[type];
}

export function getIconColorOnHoverByType(type: ButtonType): string {
  return IconColorHoverValues[type];
}

export function getBorderByType(type: ButtonType): string {
  return ButtonBorderValues[type];
}

export function getBorderDisabledByType(type: ButtonType): string {
  return ButtonBorderDisabledValues[type];
}

export function getPaddingBySize(props: ButtonSizeProps): string {
  return ButtonSizeValues[getSizeFromProps(props)];
}

export function getPaddingByType(type: ButtonType): string {
  return ButtonSizeValuesByType[type];
}

export function getTextColorIfDisabled(props: ButtonDisabledTypeProps): string {
  return ButtonTextColorDisabled[getDisabledFromProps(props)];
}

export function getCursor(props: ButtonDisabledTypeProps): string {
  return ButtonCursor[getDisabledFromProps(props)];
}

export function getIsDisabled(props: ButtonDisabledTypeProps): boolean {
  return getDisabledFromProps(props) === ButtonDisabledType.Disabled;
}

export function getButtonType(props: ButtonTypeProps): ButtonType {
  return getTypeFromProps(props);
}
