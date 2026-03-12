import { ReactNode } from "react";

import { FC, PropsWithChildren } from "./generic-types";
import { isReactElementOfType } from "./isReactElementOfType";
import { isNil } from "./safe-navigation";

export const Nothing: FC = () => null;

export const isNothing = isReactElementOfType(Nothing);

export function maybeRender<T>(prop: T, JSX: ReactNode) {
  return isNil(prop) || false === Boolean(prop) || isNothing(prop) ? (
    <Nothing />
  ) : (
    JSX
  );
}

interface IIfProps<T> {
  is: T;
}

// eslint-disable-next-line comma-spacing
export const If = <T,>({ is, children }: PropsWithChildren<IIfProps<T>>) => {
  return maybeRender<T>(is, children);
};
