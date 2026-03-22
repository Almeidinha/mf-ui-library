import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from "react";

export type DrawerAnchor = "left" | "right" | "top" | "bottom";
export type DrawerVariant = "temporary" | "persistent";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  anchor?: DrawerAnchor;
  variant?: DrawerVariant;
  containerRef?: RefObject<HTMLElement | null>;
  keepMounted?: boolean;
  mini?: boolean;
  miniSize?: number;
  size?: number | string;
  overlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  transitionDuration?: number;
  zIndex?: number;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type SwipeableDrawerProps = DrawerProps & {
  onOpen?: () => void;
  swipeAreaWidth?: number;
  disableSwipeToOpen?: boolean;
  disableDiscovery?: boolean;
  allowSwipeInChildren?: boolean | ((target: HTMLElement) => boolean);
};

export type DrawerSurfaceProps = {
  open: boolean;
  anchor: DrawerAnchor;
  temporary: boolean;
  sizeCss: string;
  miniSizeCss: string;
  miniCollapsed: boolean;
  dragOffset?: number;
  duration: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  style?: CSSProperties;
  contentRef?: RefObject<HTMLDivElement | null>;
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerCancel?: () => void;
  children: ReactNode;
};

export type SharedDrawerRenderProps = {
  open: boolean;
  anchor: DrawerAnchor;
  variant: DrawerVariant;
  containerRef?: RefObject<HTMLElement | null>;
  keepMounted: boolean;
  miniActive: boolean;
  overlay: boolean;
  closeOnOverlayClick: boolean;
  lockScroll: boolean;
  closeOnEsc: boolean;
  zIndex: number;
  duration: number;
  sizeCss: string;
  miniSizeCss: string;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  dragOffset?: number;
  onRequestClose: () => void;
  surfacePointerHandlers?: {
    onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerUp?: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerCancel?: () => void;
  };
};

export type SwipeAreaProps = {
  anchor: DrawerAnchor;
  swipeAreaWidth: number;
  discoverySize: number;
  visible: boolean;
  disableDiscovery: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
};
