import { Divider } from "components/divider";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { ButtonGroup, InputCheckbox } from "components/molecules";
import { Button } from "components/molecules/button";
import { Overlay } from "components/overlay";
import { Label } from "components/typography";
import { Background, Borders, Surface } from "foundation/colors";
import { Gap, Padding } from "foundation/spacing";
import { toCssSize } from "helpers/css-helpers";
import { If } from "helpers/nothing";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useWindowEvent } from "hooks/useWindowEvent";
import React, {
  DragEvent,
  memo,
  RefCallback,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import {
  DataTableColumn,
  DataTableColumnVisibility,
  DataTablePin,
  DataTablePinnedColumns,
} from "./types";

function getColumnId<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  return String(column.field);
}

function getColumnHeaderLabel<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  if (typeof column.headerName === "string") {
    return column.headerName;
  }

  return String(column.field);
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export type DataTableColumnManagerMode = "portal" | "inline";

type DataTableColumnManagerProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  columnVisibility: DataTableColumnVisibility;
  toggleColumnVisibility: (field: string) => void;
  resetColumnVisibility: () => void;

  pinnedColumns: DataTablePinnedColumns;
  pinColumn: (field: string, pin: DataTablePin | null) => void;
  resetPinnedColumns: () => void;

  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
  resetColumnOrder: () => void;

  mode?: DataTableColumnManagerMode;
  width?: number | string;
  inlineMaxHeight?: number | string;
  showBackdrop?: boolean;
  inlineContainerRef?: React.RefObject<HTMLElement | null>;
};

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const TriggerRow = styled(Flex)`
  width: 100%;
  justify-content: flex-end;
`;

const InlineBackdrop = styled.button`
  position: absolute;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  z-index: 9;
`;

const drawerBaseStyles = css<{ $width: string }>`
  background: ${Surface.Default.Default};
  display: flex;
  flex-direction: column;
  border: none;
  border-left: 1px solid ${Borders.Default.Default};
  width: ${({ $width }) => $width};
`;

const PortalDrawer = styled.aside<{ $width: string }>`
  ${drawerBaseStyles};
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 1000;
  transform: translateX(0);
  animation: slideInPortal 0.22s ease;

  @keyframes slideInPortal {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const InlineDrawer = styled.aside<{
  $width: string;
  $inlineMaxHeight: string;
}>`
  ${drawerBaseStyles};
  position: absolute;
  top: 0;
  right: 0;
  height: stretch;
  width: ${({ $width }) => $width};
  max-width: min(100%, ${({ $width }) => $width});
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  z-index: 10;
  transform: translateY(0);
  animation: slideInInline 0.18s ease;

  @keyframes slideInInline {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  padding: ${Padding.xs};
  border-bottom: 1px solid ${Borders.Default.Default};
  position: sticky;
  top: 0;
  background: ${Surface.Default.Default};
  z-index: 1;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${Padding.m};
`;

const ColumnCard = styled.div<{
  $dragging?: boolean;
  $dragOver?: boolean;
}>`
  border: 1px solid ${Borders.Default.Default};
  border-radius: 8px;
  background: ${Background.Default};
  padding: ${Padding.xs};
  opacity: ${({ $dragging }) => ($dragging ? 0.55 : 1)};
  transition:
    opacity 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
  will-change: transform;

  ${({ $dragging }) =>
    $dragging &&
    css`
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    `}

  ${({ $dragOver }) =>
    $dragOver &&
    css`
      box-shadow: 0 0 0 1px ${Borders.Default.Default};
    `}
`;

const DragHandle = styled.div<{ $disabled?: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? "default" : "grab")};
  user-select: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`;

type ColumnManagerItemProps = {
  label: string;
  isVisible: boolean;
  cannotHideLastVisible: boolean;
  pinState: DataTablePin | null;
  reorderDisabled: boolean;
  hideDisabled: boolean;
  pinDisabled: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  setItemRef: RefCallback<HTMLDivElement>;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onToggleVisible: () => void;
  onPinLeft: () => void;
  onPinNone: () => void;
  onPinRight: () => void;
};

const ColumnManagerItem = memo(function ColumnManagerItem({
  label,
  isVisible,
  cannotHideLastVisible,
  pinState,
  reorderDisabled,
  hideDisabled,
  pinDisabled,
  isDragging,
  isDragOver,
  setItemRef,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  onToggleVisible,
  onPinLeft,
  onPinNone,
  onPinRight,
}: ColumnManagerItemProps) {
  return (
    <ColumnCard
      ref={setItemRef}
      $dragging={isDragging}
      $dragOver={isDragOver}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Flex column gap={Gap.xs}>
        <Flex justify="space-between" align="center" gap={Gap.s}>
          <Flex align="center" gap={Gap.s}>
            <DragHandle
              $disabled={reorderDisabled}
              draggable={!reorderDisabled}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              aria-label={`Drag to reorder ${label}`}
              title="Drag to reorder"
            >
              <IconMinor.Drag />
            </DragHandle>

            <Label>{label}</Label>
          </Flex>

          <InputCheckbox
            fullWidth={false}
            checked={isVisible}
            disabled={hideDisabled || cannotHideLastVisible}
            onChange={onToggleVisible}
            label="Visible"
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center" gap={Gap.s}>
          <Label muted>Pin</Label>

          <ButtonGroup size="small">
            <Button
              primary={pinState === "left"}
              disabled={pinDisabled}
              onClick={onPinLeft}
            >
              Left
            </Button>

            <Button
              primary={pinState === null}
              disabled={pinDisabled}
              onClick={onPinNone}
            >
              None
            </Button>

            <Button
              primary={pinState === "right"}
              disabled={pinDisabled}
              onClick={onPinRight}
            >
              Right
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </ColumnCard>
  );
});

export function DataTableColumnManager<T extends Record<string, unknown>>({
  columns,
  columnVisibility,
  toggleColumnVisibility,
  resetColumnVisibility,
  pinnedColumns,
  pinColumn,
  resetPinnedColumns,
  columnOrder,
  setColumnOrder,
  resetColumnOrder,
  mode = "portal",
  width = 420,
  inlineMaxHeight = "70vh",
  showBackdrop,
  inlineContainerRef,
}: DataTableColumnManagerProps<T>) {
  const [open, setOpen] = useState(false);
  const [draggingField, setDraggingField] = useState<string | null>(null);
  const [dragOverField, setDragOverField] = useState<string | null>(null);
  const [previewOrder, setPreviewOrderState] = useState<string[] | null>(null);
  const [inlineMountNode, setInlineMountNode] = useState<HTMLElement | null>(
    null,
  );

  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previousPositionsRef = useRef<Record<string, number>>({});
  const shouldAnimateRef = useRef(false);

  const draggingFieldRef = useRef<string | null>(null);
  const dragOverFieldRef = useRef<string | null>(null);
  const previewOrderRef = useRef<string[] | null>(null);
  const didDropRef = useRef(false);

  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollDeltaRef = useRef(0);

  const pendingDragOverRef = useRef<string | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const lastDragClientYRef = useRef<number | null>(null);

  const isPortalMode = mode === "portal";
  const resolvedShowBackdrop = showBackdrop ?? isPortalMode;
  const drawerWidth = toCssSize(width, "420px");
  const inlineDrawerMaxHeight = toCssSize(inlineMaxHeight, "70vh");
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const contentId = React.useId();
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [open]);

  const setPreviewOrder = useCallback((next: string[] | null) => {
    previewOrderRef.current = next;
    setPreviewOrderState(next);
  }, []);

  const clearAutoScroll = useCallback(() => {
    if (autoScrollFrameRef.current != null) {
      cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
    autoScrollDeltaRef.current = 0;
  }, []);

  const clearPendingDragFrame = useCallback(() => {
    if (dragFrameRef.current != null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
    pendingDragOverRef.current = null;
    lastDragClientYRef.current = null;
  }, []);

  const clearDragState = useCallback(() => {
    clearAutoScroll();
    clearPendingDragFrame();

    draggingFieldRef.current = null;
    dragOverFieldRef.current = null;
    didDropRef.current = false;

    setDraggingField(null);
    setDragOverField(null);
    setPreviewOrder(null);
  }, [clearAutoScroll, clearPendingDragFrame, setPreviewOrder]);

  const openManager = React.useCallback(() => {
    if (!isPortalMode) {
      setInlineMountNode(inlineContainerRef?.current ?? null);
    }

    setOpen(true);
  }, [inlineContainerRef, isPortalMode]);

  const closeManager = React.useCallback(() => {
    clearDragState();
    setOpen(false);
    setInlineMountNode(null);
    triggerRef.current?.focus();
  }, [clearDragState]);

  const drawerRef = useOnClickOutside(closeManager);

  const renderOrder = previewOrder ?? columnOrder;

  const columnMap = useMemo(
    () => new Map(columns.map((column) => [getColumnId(column), column])),
    [columns],
  );

  const leftPinnedSet = useMemo(
    () => new Set(pinnedColumns.left),
    [pinnedColumns.left],
  );

  const rightPinnedSet = useMemo(
    () => new Set(pinnedColumns.right),
    [pinnedColumns.right],
  );

  const orderedColumns = useMemo(() => {
    return renderOrder
      .map((field) => columnMap.get(field))
      .filter(Boolean) as DataTableColumn<T>[];
  }, [columnMap, renderOrder]);

  const visibleColumnCount = useMemo(
    () =>
      orderedColumns.filter(
        (column) => columnVisibility[getColumnId(column)] !== false,
      ).length,
    [orderedColumns, columnVisibility],
  );

  const setItemRef = useCallback(
    (field: string): RefCallback<HTMLDivElement> =>
      (node) => {
        itemRefs.current[field] = node;
      },
    [],
  );

  const capturePositions = useCallback((fields: string[]) => {
    const nextPositions: Record<string, number> = {};

    fields.forEach((field) => {
      const node = itemRefs.current[field];
      if (!node) {
        return;
      }

      nextPositions[field] = node.getBoundingClientRect().top;
    });

    previousPositionsRef.current = nextPositions;
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollFrameRef.current != null) {
      return;
    }

    const tick = () => {
      const container = contentRef.current;
      if (!container) {
        clearAutoScroll();
        return;
      }

      const delta = autoScrollDeltaRef.current;

      if (delta === 0) {
        clearAutoScroll();
        return;
      }

      const previousScrollTop = container.scrollTop;
      container.scrollTop += delta;

      if (container.scrollTop === previousScrollTop) {
        clearAutoScroll();
        return;
      }

      autoScrollFrameRef.current = requestAnimationFrame(tick);
    };

    autoScrollFrameRef.current = requestAnimationFrame(tick);
  }, [clearAutoScroll]);

  const autoScrollContent = useCallback(
    (clientY: number) => {
      const container = contentRef.current;
      if (!container) {
        clearAutoScroll();
        return;
      }

      const rect = container.getBoundingClientRect();
      const threshold = 72;
      const minStep = 8;
      const maxStep = 28;

      let delta = 0;

      if (clientY < rect.top + threshold) {
        const distanceToEdge = clientY - rect.top;
        const intensity =
          1 - Math.max(0, Math.min(1, distanceToEdge / threshold));
        delta = -Math.round(minStep + (maxStep - minStep) * intensity);
      } else if (clientY > rect.bottom - threshold) {
        const distanceToEdge = rect.bottom - clientY;
        const intensity =
          1 - Math.max(0, Math.min(1, distanceToEdge / threshold));
        delta = Math.round(minStep + (maxStep - minStep) * intensity);
      }

      if (delta === 0) {
        clearAutoScroll();
        return;
      }

      autoScrollDeltaRef.current = delta;
      startAutoScroll();
    },
    [clearAutoScroll, startAutoScroll],
  );

  const flushDragOver = useCallback(() => {
    dragFrameRef.current = null;

    const targetField = pendingDragOverRef.current;
    const sourceField = draggingFieldRef.current;
    const clientY = lastDragClientYRef.current;

    if (!targetField || !sourceField || clientY == null) {
      return;
    }

    const sourceColumn = columnMap.get(sourceField);
    if (sourceColumn?.reorderable === false) {
      return;
    }

    const baseOrder = previewOrderRef.current ?? columnOrder;
    const fromIndex = baseOrder.indexOf(sourceField);
    const toIndex = baseOrder.indexOf(targetField);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
      if (dragOverFieldRef.current !== targetField) {
        dragOverFieldRef.current = targetField;
        setDragOverField(targetField);
      }
      return;
    }

    const node = itemRefs.current[targetField];
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const movingDown = fromIndex < toIndex;
    const crossedMidpoint = movingDown
      ? clientY > midpoint
      : clientY < midpoint;

    if (!crossedMidpoint) {
      if (dragOverFieldRef.current !== targetField) {
        dragOverFieldRef.current = targetField;
        setDragOverField(targetField);
      }
      return;
    }

    const nextOrder = moveItem(baseOrder, fromIndex, toIndex);
    const isSame =
      nextOrder.length === baseOrder.length &&
      nextOrder.every((value, index) => value === baseOrder[index]);

    if (dragOverFieldRef.current !== targetField) {
      dragOverFieldRef.current = targetField;
      setDragOverField(targetField);
    }

    if (isSame) {
      return;
    }

    capturePositions(baseOrder);
    shouldAnimateRef.current = true;
    setPreviewOrder(nextOrder);
  }, [capturePositions, columnMap, columnOrder, setPreviewOrder]);

  const scheduleDragOver = useCallback(
    (targetField: string, clientY: number) => {
      pendingDragOverRef.current = targetField;
      lastDragClientYRef.current = clientY;

      if (dragFrameRef.current != null) {
        return;
      }

      dragFrameRef.current = requestAnimationFrame(flushDragOver);
    },
    [flushDragOver],
  );

  useLayoutEffect(() => {
    if (!shouldAnimateRef.current) {
      return;
    }

    renderOrder.forEach((field) => {
      const node = itemRefs.current[field];
      if (!node) {
        return;
      }

      const previousTop = previousPositionsRef.current[field];
      if (previousTop == null) {
        return;
      }

      const nextTop = node.getBoundingClientRect().top;
      const deltaY = previousTop - nextTop;

      if (deltaY === 0) {
        return;
      }

      node.style.transition = "none";
      node.style.transform = `translateY(${deltaY}px)`;

      requestAnimationFrame(() => {
        node.style.transition = "transform 0.22s ease";
        node.style.transform = "translateY(0)";
      });

      const handleTransitionEnd = () => {
        node.style.transition = "";
        node.style.transform = "";
        node.removeEventListener("transitionend", handleTransitionEnd);
      };

      node.addEventListener("transitionend", handleTransitionEnd);
    });

    shouldAnimateRef.current = false;
  }, [renderOrder]);

  useWindowEvent(
    "dragend",
    () => {
      clearDragState();
    },
    open && Boolean(draggingField),
  );

  useWindowEvent(
    "drop",
    () => {
      requestAnimationFrame(() => {
        clearDragState();
      });
    },
    open && Boolean(draggingField),
  );

  useWindowEvent(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeManager();
      }
    },
    open,
  );

  const handleDragStart = useCallback(
    (field: string, disabled?: boolean) =>
      (event: DragEvent<HTMLDivElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        didDropRef.current = false;
        draggingFieldRef.current = field;
        setDraggingField(field);
        setPreviewOrder(columnOrder);

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", field);
      },
    [columnOrder, setPreviewOrder],
  );

  const handleDragOver = useCallback(
    (targetField: string) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      autoScrollContent(event.clientY);

      const sourceField =
        event.dataTransfer.getData("text/plain") || draggingFieldRef.current;

      if (!sourceField || sourceField === targetField) {
        return;
      }

      scheduleDragOver(targetField, event.clientY);
    },
    [autoScrollContent, scheduleDragOver],
  );

  const handleDrop = useCallback(
    (_targetField: string) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      didDropRef.current = true;

      const nextOrder = previewOrderRef.current;
      if (nextOrder) {
        setColumnOrder(nextOrder);
      }

      clearDragState();
    },
    [clearDragState, setColumnOrder],
  );

  const handleDragEnd = useCallback(() => {
    if (didDropRef.current) {
      didDropRef.current = false;
      clearAutoScroll();
      clearPendingDragFrame();
      return;
    }

    clearDragState();
  }, [clearAutoScroll, clearDragState, clearPendingDragFrame]);

  const drawerBody = (
    <>
      <Header>
        <Flex justify="space-between" align="center">
          <Label strong id={titleId}>
            Manage columns
          </Label>

          <Button
            ref={closeButtonRef}
            aria-label="Close column manager"
            onClick={closeManager}
            primary
            IconPrefix={IconMinor.Xmark}
          >
            Done
          </Button>
        </Flex>
      </Header>

      <Content ref={contentRef} id={contentId}>
        <Flex column gap={Gap.xxs}>
          <ButtonGroup
            style={{ margin: "auto", paddingBottom: Padding.xs }}
            size="small"
          >
            <Button small onClick={resetColumnVisibility}>
              Reset visibility
            </Button>

            <Button small onClick={resetPinnedColumns}>
              Reset pinning
            </Button>

            <Button small onClick={resetColumnOrder}>
              Reset order
            </Button>
          </ButtonGroup>

          {orderedColumns.map((column) => {
            const field = getColumnId(column);
            const label = getColumnHeaderLabel(column);
            const isVisible = columnVisibility[field] !== false;

            const cannotHideLastVisible =
              isVisible && visibleColumnCount <= 1 && column.hideable !== false;

            const pinState: DataTablePin | null = leftPinnedSet.has(field)
              ? "left"
              : rightPinnedSet.has(field)
                ? "right"
                : null;

            const reorderDisabled = column.reorderable === false;
            const hideDisabled = column.hideable === false;
            const pinDisabled = column.pinnable === false;

            return (
              <ColumnManagerItem
                key={field}
                label={label}
                isVisible={isVisible}
                cannotHideLastVisible={cannotHideLastVisible}
                pinState={pinState}
                reorderDisabled={reorderDisabled}
                hideDisabled={hideDisabled}
                pinDisabled={pinDisabled}
                isDragging={draggingField === field}
                isDragOver={dragOverField === field && draggingField !== field}
                setItemRef={setItemRef(field)}
                onDragOver={handleDragOver(field)}
                onDrop={handleDrop(field)}
                onDragStart={handleDragStart(field, reorderDisabled)}
                onDragEnd={handleDragEnd}
                onToggleVisible={() => toggleColumnVisibility(field)}
                onPinLeft={() =>
                  pinColumn(field, pinState === "left" ? null : "left")
                }
                onPinNone={() => pinColumn(field, null)}
                onPinRight={() =>
                  pinColumn(field, pinState === "right" ? null : "right")
                }
              />
            );
          })}
        </Flex>
      </Content>
    </>
  );

  const overlayContent = open ? (
    isPortalMode ? (
      <Overlay
        open={open}
        onOverlayClick={closeManager}
        lockBodyScroll={resolvedShowBackdrop}
        zIndex={999}
        transparent={!resolvedShowBackdrop}
        padded={false}
        scroll="none"
        fullScreen
      >
        <PortalDrawer
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={contentId}
          $width={drawerWidth}
        >
          {drawerBody}
        </PortalDrawer>
      </Overlay>
    ) : (
      <>
        <If is={resolvedShowBackdrop}>
          <InlineBackdrop
            aria-label="Close column manager"
            onClick={closeManager}
          />
        </If>

        <InlineDrawer
          ref={drawerRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={contentId}
          $width={drawerWidth}
          $inlineMaxHeight={inlineDrawerMaxHeight}
        >
          {drawerBody}
        </InlineDrawer>
      </>
    )
  ) : null;

  const portalOverlay =
    open && isPortalMode && typeof document !== "undefined"
      ? createPortal(overlayContent, document.body)
      : null;

  const inlineOverlay =
    open && !isPortalMode && inlineMountNode
      ? createPortal(overlayContent, inlineMountNode)
      : null;

  return (
    <Root>
      <TriggerRow>
        <Button
          ref={triggerRef}
          aria-label="Manage columns"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={openManager}
          IconPrefix={IconMinor.Gear}
        >
          Columns
        </Button>
      </TriggerRow>

      {isPortalMode ? portalOverlay : inlineOverlay}
    </Root>
  );
}
