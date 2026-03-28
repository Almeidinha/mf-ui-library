import { Borders, Icons, Surface } from "foundation/colors";
import { PropsWithChildren, RequireOnlyOne } from "helpers/generic-types";
import { ComponentType } from "react";

import { Icon } from "../icon";

const enum AlertLevel {
  Neutral = 1,
  Info = 2,
  Success = 4,
  Warning = 8,
  Critical = 16,
}

type AlertLevelFlags<T> = {
  neutral?: T;
  info?: T;
  success?: T;
  warning?: T;
  critical?: T;
};

export type AlertLevelProps = Partial<
  RequireOnlyOne<AlertLevelFlags<boolean>>
> &
  PropsWithChildren;

const AlertLevelBackgroundColors = {
  [AlertLevel.Neutral]: Surface.Neutral.Muted,
  [AlertLevel.Info]: Surface.Highlight.Muted,
  [AlertLevel.Success]: Surface.Success.Muted,
  [AlertLevel.Warning]: Surface.Warning.Muted,
  [AlertLevel.Critical]: Surface.Critical.Muted,
};

const AlertLevelBorderColors = {
  [AlertLevel.Neutral]: Borders.Default.Default,
  [AlertLevel.Info]: Borders.Highlight.Default,
  [AlertLevel.Success]: Borders.Success.Default,
  [AlertLevel.Warning]: Borders.Warning.Muted,
  [AlertLevel.Critical]: Borders.Critical.Muted,
};

const AlertLevelIcons = {
  [AlertLevel.Neutral]: { icon: Icon.CircleInfo, color: Icons.Default },
  [AlertLevel.Info]: { icon: Icon.CircleInfo, color: Icons.Highlight },
  [AlertLevel.Success]: { icon: Icon.CircleCheck, color: Icons.Success },
  [AlertLevel.Warning]: {
    icon: Icon.TriangleExclamation,
    color: Icons.Warning,
  },
  [AlertLevel.Critical]: {
    icon: Icon.DiamondExclamation,
    color: Icons.Critical,
  },
};

function getLevelFromProps(props: AlertLevelProps): AlertLevel {
  if (props.info) {
    return AlertLevel.Info;
  }
  if (props.success) {
    return AlertLevel.Success;
  }
  if (props.warning) {
    return AlertLevel.Warning;
  }
  if (props.critical) {
    return AlertLevel.Critical;
  }
  return AlertLevel.Neutral;
}

export function getBackgroundColor(props: AlertLevelProps): string {
  return AlertLevelBackgroundColors[getLevelFromProps(props)];
}

export function getBorderColor(props: AlertLevelProps): string {
  return AlertLevelBorderColors[getLevelFromProps(props)];
}

export function getIcon(props: AlertLevelProps): {
  icon: ComponentType;
  color: string;
} {
  return AlertLevelIcons[getLevelFromProps(props)];
}
