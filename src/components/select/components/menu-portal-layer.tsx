import {
  computeAnchoredPosition,
  FixedPos,
  Placement,
} from "helpers/portal-position";
import { useRepositionOnScroll } from "hooks/useRepositionOnScroll";
import {
  CSSProperties,
  ReactNode,
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type MenuPortalLayerProps = {
  open: boolean;
  disablePortal?: boolean;
  portalContainer?: HTMLElement;
  anchorRef?: RefObject<HTMLElement | null>;
  placement: Placement;
  offset: number;
  viewportPadding?: number;
  matchAnchorWidth?: boolean;
  children: ReactNode;
};

type MeasuredSize = {
  width: number;
  height: number;
};

type PortalLayout = FixedPos & {
  width?: number;
};

export function MenuPortalLayer({
  open,
  disablePortal = true,
  portalContainer,
  anchorRef,
  placement,
  offset,
  viewportPadding = 8,
  matchAnchorWidth = true,
  children,
}: MenuPortalLayerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [measured, setMeasured] = useState<MeasuredSize | null>(null);
  const [layout, setLayout] = useState<PortalLayout>({
    top: viewportPadding,
    left: viewportPadding,
    width: undefined,
  });

  const setPanelRef = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
  }, []);

  const updatePosition = useCallback(() => {
    if (!open || disablePortal) {
      return;
    }

    const anchorEl = anchorRef?.current ?? null;

    if (!anchorEl) {
      setLayout({
        top: viewportPadding,
        left: viewportPadding,
        width: undefined,
      });
      return;
    }

    const anchorRect = anchorEl.getBoundingClientRect();
    const anchorWidth = Math.round(anchorRect.width) || undefined;

    const panelEl = panelRef.current;
    const rect = panelEl?.getBoundingClientRect();

    const panelWidth =
      (measured?.width ?? Math.round(rect?.width ?? 0)) || anchorWidth || 1;

    const panelHeight =
      (measured?.height ?? Math.round(rect?.height ?? 0)) || undefined;

    const next = computeAnchoredPosition({
      anchorEl,
      placement,
      offset,
      panelWidth: matchAnchorWidth && anchorWidth ? anchorWidth : panelWidth,
      panelHeight,
      viewportPadding,
    });

    setLayout({
      ...next,
      width: matchAnchorWidth ? anchorWidth : undefined,
    });
  }, [
    open,
    disablePortal,
    anchorRef,
    measured,
    placement,
    offset,
    viewportPadding,
    matchAnchorWidth,
  ]);

  useLayoutEffect(() => {
    if (!open || disablePortal) {
      return;
    }

    const element = panelRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const next = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };

    setMeasured((prev) =>
      prev && prev.width === next.width && prev.height === next.height
        ? prev
        : next,
    );
  }, [open, disablePortal]);

  useLayoutEffect(() => {
    if (!open || disablePortal) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      updatePosition();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open, disablePortal, measured, updatePosition]);

  useRepositionOnScroll({
    enabled: open && !disablePortal,
    onReposition: updatePosition,
  });

  const portalStyle: CSSProperties | undefined = disablePortal
    ? undefined
    : {
        position: "fixed",
        top: layout.top,
        left: layout.left,
        width: layout.width,
        zIndex: 1300,
        boxSizing: "border-box",
      };

  const content = (
    <div ref={setPanelRef} style={portalStyle}>
      {children}
    </div>
  );

  if (disablePortal) {
    return content;
  }

  const target =
    portalContainer ?? (typeof document !== "undefined" ? document.body : null);

  if (!target) {
    return null;
  }

  return createPortal(content, target);
}
