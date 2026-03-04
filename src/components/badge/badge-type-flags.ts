import { Surface } from "@foundations";
import { Hex, PropsWithChildren } from "@helpers";

const enum BadgeType {
  Neutral = 1,
  Info = 2,
  Success = 4,
  Warning = 8,
  Critical = 16,
}

type BadgeTypeFlags<T> = {
  neutral?: T;
  info?: T;
  success?: T;
  warning?: T;
  critical?: T;
};

export type BadgeTypeProps = Partial<RequireOnlyOne<BadgeTypeFlags<boolean>>> &
  PropsWithChildren;

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type MappedEnum<E, T> = {
  [key in keyof E]: T;
};

const BadgeTypeColors = {
  [BadgeType.Neutral]: Surface.Neutral.Default,
  [BadgeType.Info]: Surface.Highlight.Default,
  [BadgeType.Success]: Surface.Success.Default,
  [BadgeType.Warning]: Surface.Warning.Default,
  [BadgeType.Critical]: Surface.Critical.Default,
};

function getColorFromProps(props: BadgeTypeProps): BadgeType {
  if (props.info) {
    return BadgeType.Info;
  }
  if (props.success) {
    return BadgeType.Success;
  }
  if (props.warning) {
    return BadgeType.Warning;
  }
  if (props.critical) {
    return BadgeType.Critical;
  }
  return BadgeType.Neutral;
}

export function getColor(props: BadgeTypeProps): Hex {
  return BadgeTypeColors[getColorFromProps(props)];
}
