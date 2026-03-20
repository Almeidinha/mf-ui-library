import { CSSProperties, PointerEvent, ReactNode, RefObject } from "react";

export type DrawerAnchor = "left" | "right" | "top" | "bottom";
export type DrawerVariant = "temporary" | "persistent";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;

  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;

  children: ReactNode;

  anchor?: DrawerAnchor;
  variant?: DrawerVariant;

  container?: HTMLElement | null | (() => HTMLElement | null);

  swipeable?: boolean;
  swipeEdgeSize?: number;

  keepMounted?: boolean;

  mini?: boolean;
  miniSize?: number | string;
  size?: number | string;

  overlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;

  transitionDuration?: number;
  transitionOffset?: number;

  zIndex?: number;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;

  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type PersistentDrawerProps = {
  open: boolean;
  anchor: DrawerAnchor;
  swipeable: boolean;
  keepMounted: boolean;
  miniActive: boolean;
  size: number | string;
  miniSize: number | string;
  sizeCss: string;
  miniSizeCss: string;
  zIndex: number;
  duration: number;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  children: ReactNode;
};

export type TemporaryDrawerProps = {
  open: boolean;
  onRequestClose: () => void;
  onRequestOpen: () => void;
  anchor: DrawerAnchor;
  container?: DrawerProps["container"];
  swipeable: boolean;
  swipeEdgeSize: number;
  keepMounted: boolean;
  overlay: boolean;
  closeOnOverlayClick: boolean;
  lockScroll: boolean;
  closeOnEsc: boolean;
  zIndex: number;
  duration: number;
  transitionOffset: number;
  size: number | string;
  miniActive: boolean;
  miniSize: number | string;
  sizeCss: string;
  miniSizeCss: string;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
};

export type TemporaryDrawerContentProps = {
  id: string;
  open: boolean;
  onRequestClose: () => void;
  onRequestOpen: () => void;
  anchor: DrawerAnchor;
  swipeable: boolean;
  swipeEdgeSize: number;
  overlay: boolean;
  closeOnOverlayClick: boolean;
  sizeCss: string;
  miniSizeCss: string;
  dragOffset: number;
  duration: number;
  transitionOffset: number;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  contentRef: RefObject<HTMLDivElement | null>;
  handlePointerDown: (
    mode: "open" | "close",
  ) => (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  endGesture: () => void;
  children: ReactNode;
};

export type DrawerSurfaceProps = {
  open: boolean;
  anchor: DrawerAnchor;
  temporary: boolean;
  sizeCss: string;
  miniSizeCss: string;
  miniCollapsed: boolean;
  dragOffset: number;
  duration: number;
  swipeable: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  style?: CSSProperties;
  contentRef?: RefObject<HTMLDivElement | null>;
  onPointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel?: () => void;
  children: ReactNode;
};
