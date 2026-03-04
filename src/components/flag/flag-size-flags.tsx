import { PropsWithChildren, RequireOnlyOne } from "@helpers";

export const enum FlagSize {
  Small = 1,
  Medium = 2,
  Large = 4,
}

type FlagSizeFlags<T> = {
  small?: T;
  medium?: T;
  large?: T;
};

export type FlagProps = Partial<RequireOnlyOne<FlagSizeFlags<boolean>>> &
  PropsWithChildren;

function getSizeFromProps(props: FlagProps): FlagSize {
  if (props.small) {
    return FlagSize.Small;
  }
  if (props.medium) {
    return FlagSize.Medium;
  }
  if (props.large) {
    return FlagSize.Large;
  }
  return FlagSize.Medium;
}

export const FlagWidthValues = {
  [FlagSize.Small]: 20,
  [FlagSize.Medium]: 20,
  [FlagSize.Large]: 32,
};

export const FlagHeightValues = {
  [FlagSize.Small]: 20,
  [FlagSize.Medium]: 20,
  [FlagSize.Large]: 24,
};

export function getHeightBySize(size: FlagSize): string {
  return FlagHeightValues[size].toString();
}

export function getWidthBySize(size: FlagSize): string {
  return FlagWidthValues[size].toString();
}

export function getFlagSize(props: FlagProps) {
  return getSizeFromProps(props);
}
