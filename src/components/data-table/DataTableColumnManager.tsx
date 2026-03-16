import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { InputCheckbox } from "components/molecules";
import { Button } from "components/molecules/button";
import { Label } from "components/typography";
import { Background, Borders, Surface } from "foundation/colors";
import { Gap, Margin, Padding } from "foundation/spacing";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import {
  DragEvent,
  RefCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
};

const Root = styled.div`
  position: relative;
`;

const TriggerRow = styled(Flex)`
  width: 100%;
  justify-content: flex-end;
`;

const Backdrop = styled.button`
  position: fixed;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  z-index: 999;
`;

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(420px, 100vw);
  background: ${Surface.Default.Default};
  border-left: 1px solid ${Borders.Default.Default};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.22s ease;

  ${({ $open }) =>
    $open &&
    css`
      transform: translateX(0);
    `}
`;

const Header = styled.div`
  padding: ${Padding.l};
  border-bottom: 1px solid ${Borders.Default.Default};
  position: sticky;
  top: 0;
  background: ${Surface.Default.Default};
  z-index: 1;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${Padding.l};
`;

const Footer = styled.div`
  padding: ${Padding.l};
  border-top: 1px solid ${Borders.Default.Default};
  background: ${Surface.Default.Default};
  position: sticky;
  bottom: 0;
`;

const SectionTitle = styled(Label)`
  display: block;
  margin-bottom: ${Margin.s};
`;

const ColumnCard = styled.div<{ $dragging?: boolean; $dragOver?: boolean }>`
  border: 1px solid
    ${({ $dragOver }) =>
      $dragOver ? Borders.Default.Default : Borders.Default.Default};
  border-radius: 8px;
  background: ${Background.Default};
  padding: ${Padding.m};
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

const PinGroup = styled.div`
  display: inline-flex;
  gap: ${Gap.xs};
`;

const DragHandle = styled.div<{ $disabled?: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? "default" : "grab")};
  user-select: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`;

const ResetRow = styled(Flex)`
  flex-wrap: wrap;
`;

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

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
}: DataTableColumnManagerProps<T>) {
  const [open, setOpen] = useState(false);
  const [draggingField, setDraggingField] = useState<string | null>(null);
  const [dragOverField, setDragOverField] = useState<string | null>(null);

  const drawerRef = useOnClickOutside(() => setOpen(false));

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previousPositionsRef = useRef<Record<string, number>>({});
  const isAnimatingRef = useRef(false);

  const orderedColumns = useMemo(() => {
    const map = new Map(columns.map((column) => [getColumnId(column), column]));

    return columnOrder
      .map((field) => map.get(field))
      .filter(Boolean) as DataTableColumn<T>[];
  }, [columns, columnOrder]);

  const visibleColumnCount = useMemo(
    () =>
      orderedColumns.filter(
        (column) => columnVisibility[getColumnId(column)] !== false,
      ).length,
    [orderedColumns, columnVisibility],
  );

  const setItemRef =
    (field: string): RefCallback<HTMLDivElement> =>
    (node) => {
      itemRefs.current[field] = node;
    };

  const capturePositions = () => {
    const nextPositions: Record<string, number> = {};

    columnOrder.forEach((field) => {
      const node = itemRefs.current[field];
      if (!node) {
        return;
      }

      nextPositions[field] = node.getBoundingClientRect().top;
    });

    previousPositionsRef.current = nextPositions;
  };

  useLayoutEffect(() => {
    if (!isAnimatingRef.current) {
      return;
    }

    columnOrder.forEach((field) => {
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

    isAnimatingRef.current = false;
  }, [columnOrder]);

  const handleDragStart =
    (field: string, disabled?: boolean) =>
    (event: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      setDraggingField(field);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", field);
    };

  const handleDragOver =
    (field: string) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (draggingField === field) {
        return;
      }

      event.dataTransfer.dropEffect = "move";
      setDragOverField(field);
    };

  const handleDrop = (field: string) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const sourceField =
      event.dataTransfer.getData("text/plain") || draggingField;

    if (!sourceField || sourceField === field) {
      setDraggingField(null);
      setDragOverField(null);
      return;
    }

    const fromIndex = columnOrder.indexOf(sourceField);
    const toIndex = columnOrder.indexOf(field);

    if (fromIndex === -1 || toIndex === -1) {
      setDraggingField(null);
      setDragOverField(null);
      return;
    }

    const sourceColumn = columns.find(
      (column) => getColumnId(column) === sourceField,
    );

    if (sourceColumn?.reorderable === false) {
      setDraggingField(null);
      setDragOverField(null);
      return;
    }

    capturePositions();
    isAnimatingRef.current = true;
    setColumnOrder(moveItem(columnOrder, fromIndex, toIndex));

    setDraggingField(null);
    setDragOverField(null);
  };

  const handleDragEnd = () => {
    setDraggingField(null);
    setDragOverField(null);
  };

  return (
    <Root>
      <TriggerRow>
        <Button
          aria-label="Manage columns"
          onClick={() => setOpen(true)}
          IconPrefix={IconMinor.Gear}
        >
          Columns
        </Button>
      </TriggerRow>

      {open ? (
        <Backdrop
          aria-label="Close column manager"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <Drawer
        ref={drawerRef}
        $open={open}
        aria-hidden={!open}
        aria-label="Column manager"
      >
        <Header>
          <Flex justify="space-between" center>
            <Label strong>Manage columns</Label>

            <Button
              aria-label="Close column manager"
              onClick={() => setOpen(false)}
              primary
              IconPrefix={IconMinor.Xmark}
            />
          </Flex>
        </Header>

        <Content>
          <Flex column gap={Gap.m}>
            <ResetRow gap={Gap.xs}>
              <Button small onClick={resetColumnVisibility}>
                Reset visibility
              </Button>

              <Button small onClick={resetPinnedColumns}>
                Reset pinning
              </Button>

              <Button small onClick={resetColumnOrder}>
                Reset order
              </Button>
            </ResetRow>

            {orderedColumns.map((column) => {
              const field = getColumnId(column);
              const label = getColumnHeaderLabel(column);
              const isVisible = columnVisibility[field] !== false;

              const cannotHideLastVisible =
                isVisible &&
                visibleColumnCount <= 1 &&
                column.hideable !== false;

              const pinState: DataTablePin | null = pinnedColumns.left.includes(
                field,
              )
                ? "left"
                : pinnedColumns.right.includes(field)
                  ? "right"
                  : null;

              const reorderDisabled = column.reorderable === false;

              return (
                <ColumnCard
                  key={field}
                  ref={setItemRef(field)}
                  $dragging={draggingField === field}
                  $dragOver={dragOverField === field}
                  onDragOver={handleDragOver(field)}
                  onDrop={handleDrop(field)}
                >
                  <Flex column gap={Gap.s}>
                    <Flex justify="space-between" center gap={Gap.s}>
                      <Flex center gap={Gap.s}>
                        <DragHandle
                          $disabled={reorderDisabled}
                          draggable={!reorderDisabled}
                          onDragStart={handleDragStart(field, reorderDisabled)}
                          onDragEnd={handleDragEnd}
                          aria-label={`Drag to reorder ${label}`}
                          title="Drag to reorder"
                        >
                          <IconMinor.Drag />
                        </DragHandle>

                        <Label>{label}</Label>
                      </Flex>

                      <InputCheckbox
                        checked={isVisible}
                        disabled={
                          column.hideable === false || cannotHideLastVisible
                        }
                        onChange={() => toggleColumnVisibility(field)}
                        label="Visible"
                      />
                    </Flex>

                    <Flex justify="space-between" center gap={Gap.s}>
                      <SectionTitle subdued>Pin</SectionTitle>

                      <PinGroup>
                        <Button
                          small
                          primary={pinState === "left"}
                          disabled={column.pinnable === false}
                          onClick={() =>
                            pinColumn(
                              field,
                              pinState === "left" ? null : "left",
                            )
                          }
                        >
                          Left
                        </Button>

                        <Button
                          small
                          primary={pinState === null}
                          disabled={column.pinnable === false}
                          onClick={() => pinColumn(field, null)}
                        >
                          None
                        </Button>

                        <Button
                          small
                          primary={pinState === "right"}
                          disabled={column.pinnable === false}
                          onClick={() =>
                            pinColumn(
                              field,
                              pinState === "right" ? null : "right",
                            )
                          }
                        >
                          Right
                        </Button>
                      </PinGroup>
                    </Flex>
                  </Flex>
                </ColumnCard>
              );
            })}
          </Flex>
        </Content>

        <Footer>
          <Flex justify="flex-end">
            <Button primary onClick={() => setOpen(false)}>
              Done
            </Button>
          </Flex>
        </Footer>
      </Drawer>
    </Root>
  );
}
