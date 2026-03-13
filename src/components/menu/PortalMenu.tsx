import { Nothing } from "@helpers";
import { IOption } from "components/select";
import { Slide } from "components/transitions";
import { useRepositionOnScroll } from "hooks";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import {
  computeAnchoredPosition,
  FixedPos,
  Placement,
} from "../../helpers/portal-position";
import { ROW_HEIGHT } from "./helper";
import { MenuListExpanded } from "./menu-list-expanded";

type MenuItem = IOption<unknown> & { onItemSelect?: () => void };

export type PortalMenuProps = {
  items: MenuItem[];
  open: boolean;

  anchorRef?: React.RefObject<HTMLElement | null>;

  placement?: Placement;
  offset?: number;
  viewportPadding?: number;
  width?: number;

  getOptionKey: (value: unknown) => string;

  invalid?: boolean;
  multi?: boolean;
  emptyText?: string;
  search?: string;
  label?: string;
  menuTitle?: string;
  multiLevel?: boolean;
  menuHeight?: number;

  onSelect?: (item: MenuItem) => void;
};

const PortalFrame = styled.div<{
  $top: number;
  $left: number;
  $width?: number;
}>`
  z-index: 9999;
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  overflow: hidden;
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
`;

export const PortalMenu = ({
  items,
  open,
  anchorRef,
  placement = "bottom-start",
  offset = 4,
  width,
  menuHeight,
  emptyText,
  multi,
  invalid,
  search,
  label,
  menuTitle,
  multiLevel,
  getOptionKey,
  viewportPadding = 4,
  onSelect,
}: PortalMenuProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [measured, setMeasured] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [pos, setPos] = useState<FixedPos>(() => ({
    top: viewportPadding,
    left: viewportPadding,
  }));

  const computedMenuHeight = useMemo(() => {
    const h = items.length * ROW_HEIGHT + 4;
    return menuHeight ?? h;
  }, [items.length, menuHeight]);

  const updatePosition = useCallback(() => {
    if (!open) {
      return;
    }

    const anchorEl = anchorRef?.current ?? null;

    if (!anchorEl) {
      setPos({ top: viewportPadding, left: viewportPadding });
      return;
    }

    const panelEl = panelRef.current;
    const anchorRect = anchorEl.getBoundingClientRect();
    const fallbackWidth = Math.round(anchorRect.width) || 1;

    const rect = panelEl?.getBoundingClientRect();
    const width =
      (measured?.width ?? Math.round(rect?.width ?? 0)) || fallbackWidth;
    const height =
      (measured?.height ?? Math.round(rect?.height ?? 0)) || undefined;

    const next = computeAnchoredPosition({
      anchorEl,
      placement,
      offset,
      panelWidth: width,
      panelHeight: height,
      viewportPadding,
    });

    setPos(next);
  }, [open, anchorRef, placement, offset, viewportPadding, measured]);

  useLayoutEffect(() => {
    if (!open) {
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
  }, [open, items.length]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      updatePosition();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open, measured, updatePosition]);

  useRepositionOnScroll({
    enabled: open,
    onReposition: updatePosition,
  });

  if (!open) {
    return <Nothing />;
  }

  const handleSelect = (_: unknown, item: MenuItem) => {
    item?.onItemSelect?.();
    onSelect?.(item);
  };

  return createPortal(
    <Slide in={open} mountOnEnter unmountOnExit>
      <PortalFrame
        ref={panelRef}
        $top={pos.top}
        $left={pos.left}
        $width={width}
      >
        <MenuListExpanded
          options={items}
          value={[]}
          emptyText={emptyText ?? ""}
          multi={multi ?? true}
          menuHeight={computedMenuHeight}
          invalid={invalid ?? false}
          open={open}
          search={search ?? ""}
          label={label ?? ""}
          menuTitle={menuTitle ?? ""}
          multiLevel={multiLevel ?? true}
          getOptionKey={getOptionKey}
          onSelect={handleSelect}
          width={width}
        />
      </PortalFrame>
    </Slide>,

    document.body,
  );
};
