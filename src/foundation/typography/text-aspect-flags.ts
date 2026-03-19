import { MappedEnum, PropsWithChildren, RequireOnlyOne } from "@helpers";

import { Text } from "../colors";

export const enum TextAspects {
  Default = 1,
  Muted = 2,
  Soft = 4,
  Critical = 8,
  Success = 16,
  OnPrimary = 32,
  OnCritical = 64,
}

type TextAspectsFlags<T> = {
  default?: T;
  muted?: T;
  soft?: T;
  critical?: T;
  success?: T;
  onPrimary?: T;
  onCritical?: T;
};

export type TextAspectProps = Partial<
  RequireOnlyOne<TextAspectsFlags<boolean>>
> &
  PropsWithChildren;

type TextOptions<T> = MappedEnum<typeof TextAspects, T>;

const TextAspectColors = {
  [TextAspects.Default]: Text.Default,
  [TextAspects.Muted]: Text.Muted,
  [TextAspects.Soft]: Text.Soft,
  [TextAspects.OnPrimary]: Text.OnPrimary,
  [TextAspects.OnCritical]: Text.OnCritical,
  [TextAspects.Success]: Text.Success,
  [TextAspects.Critical]: Text.Critical,
};

export type TransientTextOptions = Omit<
  TextOptions<boolean>,
  "onCritical" | "onPrimary"
> & {
  $onCritical?: boolean;
  $onPrimary?: boolean;
};

export type ITransientTextAspectProps = Partial<
  RequireOnlyOne<TransientTextOptions>
> &
  PropsWithChildren;

function getTextAspectFromProps(props: TextAspectProps): TextAspects {
  if (props.default) {
    return TextAspects.Default;
  }
  if (props.muted) {
    return TextAspects.Muted;
  }
  if (props.soft) {
    return TextAspects.Soft;
  }
  if (props.critical) {
    return TextAspects.Critical;
  }
  if (props.success) {
    return TextAspects.Success;
  }
  if (props.onPrimary) {
    return TextAspects.OnPrimary;
  }
  if (props.onCritical) {
    return TextAspects.OnCritical;
  }
  return TextAspects.Default;
}

export function getTextAspect(
  props: TextAspectProps & ITransientTextAspectProps,
) {
  return TextAspectColors[getTextAspectFromProps(props)];
}

export const TYPOGRAPHY_BLOCKED_PROPS = new Set([
  "onDefault",
  "onMuted",
  "onHighlight",
  "onSuccess",
  "onWarning",
  "onDanger",
  "onInfo",
  "muted",
  "soft",
  "critical",
  "success",
  "onCritical",
  "onPrimary",
  "$onCritical",
  "$onPrimary",
  "textColorDisabled",
  "isLoading",
  "active",
  "default",
  "subtle",
  "strong",
  "onItemSelect",
  "labelPosition",
]);

export const defaultValidatorFn = (prop: string) =>
  !TYPOGRAPHY_BLOCKED_PROPS.has(prop);
