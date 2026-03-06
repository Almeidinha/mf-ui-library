import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  PureComponent,
  ReactElement,
  ReactNode,
} from "react";

import { FC, PropsWithChildren } from "./generic-types";
import { isDefined, isFunction } from "./safe-navigation";

/**
 * Old class-based slot constructor shape:
 *   class MySlot extends Slot<Props> {}
 */
export type SlotClass<P = unknown> = typeof Slot<P>;

/**
 * New function-based slot shape:
 *   const MySlot: SlotComponent<Props> = (props) => ...
 */
export type SlotComponent<P = unknown> = FC<PropsWithChildren<P>> & {
  __slot?: true;
};

/**
 * Accept both during migration.
 */
export type AnySlotType<P = unknown> = SlotClass<P> | SlotComponent<P>;

function hasOwn(obj: unknown, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isReactElement(obj: unknown): obj is ReactElement {
  return isValidElement(obj);
}

/**
 * Old base Slot class, kept for backward compatibility.
 */
export class Slot<T = unknown> extends PureComponent<PropsWithChildren<T>> {
  static __slot = true;

  override render() {
    return this.props.children;
  }
}

/**
 * Old stylable slot class, also kept for backward compatibility.
 */
export class StylableSlot extends Slot<{
  className?: string;
  style?: CSSProperties;
}> {
  override render() {
    return <div {...this.props}>{this.props.children}</div>;
  }
}

/**
 * New function-slot factory base.
 * Optional to use, but supported.
 */
// eslint-disable-next-line comma-spacing
export const FunctionSlot = (<T,>(props: PropsWithChildren<T>) => {
  return <>{props.children}</>;
}) as SlotComponent;

FunctionSlot.__slot = true;

export const FunctionStylableSlot = (<
  T extends {
    className?: string;
    style?: CSSProperties;
  },
>(
  props: PropsWithChildren<T>,
) => {
  return <div {...props}>{props.children}</div>;
}) as SlotComponent<{
  className?: string;
  style?: CSSProperties;
}>;

FunctionStylableSlot.__slot = true;

/**
 * Handles wrapped components that expose `.target`
 * and normal direct types.
 */
function getWrappedType(type: unknown): unknown {
  if (!isDefined(type)) {
    return undefined;
  }

  if (hasOwn(type, "target")) {
    return (type as { target?: unknown }).target;
  }

  return type;
}

function isSlotType(type: unknown): boolean {
  const resolved = getWrappedType(type) as { __slot?: boolean } | undefined;
  return resolved?.__slot === true;
}

export const isSlotOfType =
  <T extends AnySlotType>(type: T | FC) =>
  (obj?: unknown): obj is ReactElement => {
    if (!isReactElement(obj) || !isDefined(obj.type)) {
      return false;
    }

    const currentType = getWrappedType(obj.type);
    const expectedType = getWrappedType(type);

    return currentType === expectedType;
  };

const findSlotByType = <T extends AnySlotType>(
  type: T,
  children?: ReactNode,
): ReactElement | undefined => {
  return Children.toArray(children).find(isSlotOfType(type));
};

const filterSlotByType = <T extends AnySlotType>(
  type: T,
  children?: ReactNode,
): ReactElement[] => {
  return Children.toArray(children).filter(isSlotOfType(type));
};

export function getOtherChildren(children?: ReactNode): ReactNode[] {
  return Children.toArray(children).filter((child) => {
    if (!isReactElement(child)) {
      return true;
    }
    return !isSlotType(child.type);
  });
}

export function getSlots<T extends AnySlotType>(
  slot: T,
  children?: ReactNode,
): ReactElement[] {
  return filterSlotByType(slot, children);
}

export function getSlot<P = unknown, T extends AnySlotType = AnySlotType>(
  slot: T,
  children?: ReactNode,
): ReactElement<P> | undefined {
  return findSlotByType(slot, children) as ReactElement<P> | undefined;
}

export function getOptionalSlot<T extends AnySlotType>(
  slot: T,
  children?: ReactNode,
): ReactElement | null {
  return findSlotByType(slot, children) ?? null;
}

export function hasSlot<T extends AnySlotType>(
  slot: T,
  children?: ReactNode,
): boolean {
  return !!findSlotByType(slot, children);
}

export function applyProps<P extends object>(
  element: ReactElement<P>,
  nextProps: Partial<P> | ((props: P) => Partial<P>),
): ReactElement<P> {
  const resolvedProps = isFunction(nextProps)
    ? nextProps(element.props)
    : nextProps;

  return cloneElement(element, resolvedProps);
}

export function applyStyle<P extends { style?: CSSProperties }>(
  element: ReactElement<P>,
  style: CSSProperties,
): ReactElement<P> {
  const nextProps = {
    ...element.props,
    style: {
      ...(element.props.style ?? {}),
      ...style,
    },
  } as P;

  return cloneElement(element, nextProps);
}
