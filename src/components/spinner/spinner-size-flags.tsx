import { PropsWithChildren, RequireOnlyOne } from "@helpers";

const enum SpinnerSize {
  Small = 1,
  Medium = 2,
  Large = 4,
}

type SpinnerSizeFlags<T> = {
  small?: T;
  medium?: T;
  large?: T;
};

export type SpinnerSizeProps = Partial<
  RequireOnlyOne<SpinnerSizeFlags<boolean>>
> &
  PropsWithChildren;

const SpinnerValues = {
  [SpinnerSize.Small]: "18px",
  [SpinnerSize.Medium]: "40px",
  [SpinnerSize.Large]: "60px",
};

function getSpinnerSizeFromProps(props: SpinnerSizeProps): SpinnerSize {
  if (props.small) {
    return SpinnerSize.Small;
  }
  if (props.medium) {
    return SpinnerSize.Medium;
  }
  if (props.large) {
    return SpinnerSize.Large;
  }
  return SpinnerSize.Medium;
}

export function getValuesBySize(props: SpinnerSizeProps): string {
  return SpinnerValues[getSpinnerSizeFromProps(props)];
}
