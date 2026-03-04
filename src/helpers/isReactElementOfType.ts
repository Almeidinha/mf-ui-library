import { PureComponent, ReactElement } from "react";
import type { IStyledComponent } from "styled-components";

import { FC, PropsWithChildren } from "./generic-types";
import { isDefined } from "./safe-navigation";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getProp = (value: unknown, prop: string): unknown =>
  isRecord(value) ? value[prop] : undefined;

export const isReactElementOfType =
  <P extends PropsWithChildren>(
    component: (IStyledComponent<"web", P> | FC<P> | typeof PureComponent) & {
      target?: unknown;
    },
  ) =>
  (element?: unknown): element is ReactElement<P> => {
    const elementType = getProp(element, "type");
    const elementTypeTarget = getProp(elementType, "target");
    const componentTarget = getProp(component, "target");

    if (elementType === component) {
      return true;
    } else if (elementTypeTarget === component) {
      return true;
    } else if (isDefined(componentTarget) && elementType === componentTarget) {
      return true;
    } else if (
      isDefined(componentTarget) &&
      elementTypeTarget === componentTarget
    ) {
      return true;
    }

    return false;
  };
