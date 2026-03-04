import { PropsWithChildren, RequireOnlyOne } from "@helpers";
import { Body, Display, Label } from "components/typography";
import React from "react";

const enum AvatarSize {
  Small = 1,
  Medium = 2,
  Large = 4,
}

type AvatarSizeFlags<T> = {
  small?: T;
  medium?: T;
  large?: T;
};

export type AvatarSizesProps = Partial<
  RequireOnlyOne<AvatarSizeFlags<boolean>>
> &
  PropsWithChildren;

const AvatarSizeValues = {
  [AvatarSize.Small]: "32px",
  [AvatarSize.Medium]: "40px",
  [AvatarSize.Large]: "60px",
};

const AvatarSizeNodes = {
  [AvatarSize.Small]: Label,
  [AvatarSize.Medium]: Body,
  [AvatarSize.Large]: Display,
};

function getSizeFromProps(props: AvatarSizesProps): AvatarSize {
  if (props.small) {
    return AvatarSize.Small;
  }
  if (props.medium) {
    return AvatarSize.Medium;
  }
  if (props.large) {
    return AvatarSize.Large;
  }

  return AvatarSize.Medium;
}

export type AvatarSizeProps = Partial<
  RequireOnlyOne<AvatarSizeFlags<boolean>>
> &
  PropsWithChildren;

export function getValuesBySize(props: AvatarSizeProps): string {
  return AvatarSizeValues[getSizeFromProps(props)];
}

export function getNodeToRenderText(props: AvatarSizeProps): React.ElementType {
  return AvatarSizeNodes[getSizeFromProps(props)];
}
