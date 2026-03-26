import {
  Checkbox,
  CheckboxProps,
  CheckboxPropsThreeState,
} from "components/checkbox";
import { DataTableCellOverflow } from "components/data-table/types";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import {
  SimpleMenu,
  SimpleMenuItem,
  useSimpleMenuState,
} from "components/molecules";
import { Button } from "components/molecules/button";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { If, Nothing } from "helpers/nothing";
import { is, isDefined, isString } from "helpers/safe-navigation";
import {
  Children,
  cloneElement,
  ComponentType,
  isValidElement,
  ReactElement,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useRef,
} from "react";
import styled, { css } from "styled-components";

type TableHeadSelectProps = Omit<CheckboxPropsThreeState, "indeterminate"> & {
  dividerRight?: boolean;
};
type TableBodySelectProps = CheckboxProps & { selected?: boolean };
type TableBodyActionProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: ComponentType;
}>;

type TableHeaderCellProps = FC<ITableHeadProps> & {
  Select: FC<TableHeadSelectProps>;
  Actions: FC<ITableHeadProps>;
};

type TableBodyCellProps = FC<ITableCellProps> & {
  Select: FC<TableBodySelectProps>;
  Actions: FC<ITableCellProps>;
  Action: FC<TableBodyActionProps>;
};

export interface ITableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  isPlaceholder?: boolean;
  sort?: "ASC" | "DESC" | "NONE";
  onSortClick?: () => void;
  dividerRight?: boolean;
}

export interface ITableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  fitContent?: boolean;
  allowOverflow?: boolean;
  overflow?: DataTableCellOverflow;
}

function getCellOverflowStyles(overflow: DataTableCellOverflow) {
  if (overflow === "wrap") {
    return css`
      overflow: visible;
      text-overflow: clip;
      white-space: normal;
      overflow-wrap: anywhere;
    `;
  }

  if (overflow === "visible") {
    return css`
      overflow: visible;
      text-overflow: clip;
      white-space: nowrap;
    `;
  }

  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
}

export const Table = styled.table<{
  $bordered?: boolean;
  $cellBorders?: "all" | "horizontal";
  $width?: number | string;
  $minWidth?: number | string;
}>`
  width: ${({ $width }) =>
    $width ? (typeof $width === "number" ? `${$width}px` : $width) : "100%"};
  min-width: ${({ $minWidth }) =>
    $minWidth
      ? typeof $minWidth === "number"
        ? `${$minWidth}px`
        : $minWidth
      : "auto"};
  border-spacing: 0;
  table-layout: fixed;
  word-break: break-word;
  border: ${({ $bordered = true }) =>
    $bordered ? `1px solid ${Borders.Default.Default}` : "none"};

  ${({ $bordered = true }) =>
    $bordered
      ? css`
          ${shadowMd}
        `
      : ""}

  ${({ $cellBorders }) => {
    if ($cellBorders === "all") {
      return css`
        thead th:not(:last-child) {
          border-right: 1px solid ${Borders.Default.Muted};
        }

        tbody td {
          border-right: 1px solid ${Borders.Default.Muted};
          border-bottom: 1px solid ${Borders.Default.Muted};
          box-sizing: border-box;
        }

        tbody td:last-child {
          border-right: none;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }
      `;
    }

    if ($cellBorders === "horizontal") {
      return css`
        tbody td {
          border-bottom: 1px solid ${Borders.Default.Muted};
          box-sizing: border-box;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }
      `;
    }

    return "";
  }}
`;

export const TableBody = styled.tbody<{
  $striped?: boolean;
}>`
  ${({ $striped = true }) =>
    $striped
      ? css`
          tr:nth-child(odd):not([aria-selected="true"]) {
            background-color: ${Surface.Default.Default};
          }

          tr:nth-child(even):not([aria-selected="true"]) {
            background-color: ${Surface.Default.Muted};
          }
        `
      : css`
          tr:not([aria-selected="true"]) {
            background-color: ${Surface.Default.Default};
          }
        `}
`;

export const TableHeaderFrame = styled.th.attrs({ scope: "col" })<{
  $bordered?: boolean;
  $dividerRight?: boolean;
}>`
  text-align: left;
  padding: ${Padding.m};
  position: relative;
  border-top: ${({ $bordered = true }) =>
    $bordered ? "none" : `1px solid ${Borders.Default.Muted}`};
  border-bottom: 1px solid ${Borders.Default.Muted};
  background-color: ${Surface.Default.Muted};

  ${({ $dividerRight }) =>
    $dividerRight &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: ${Padding.s};
        right: 0;
        bottom: ${Padding.s};
        width: 1px;
        background: ${Borders.Default.Muted};
      }
    `}
`;

const TableBodyCellFrame = styled.td<{
  $fitContent?: boolean;
  $allowOverflow?: boolean;
  $overflow?: DataTableCellOverflow;
}>`
  padding: ${Padding.m};
  ${Typography.Body}
  position: relative;

  ${({ $fitContent }) =>
    is($fitContent)
      ? css`
          white-space: nowrap;
          width: 1%;
        `
      : ""}

  ${({ $allowOverflow, $overflow = "ellipsis" }) =>
    $allowOverflow
      ? css`
          overflow: visible;
        `
      : getCellOverflowStyles($overflow)}
`;

export const TableRow = styled.tr.attrs<{ selected?: boolean }>(
  ({ selected }) => ({
    "aria-selected": selected ? "true" : undefined,
  }),
)`
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${Surface.Selected.Default};
    `}
`;

export const TableHead = styled.thead``;

const TableCellSelectSelectFrame = styled.td`
  padding: ${Padding.m};
`;

const Controls = styled(IconMinor.EllipsisVertical)`
  display: block;
`;

const ActionsCell = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  z-index: ${({ $isOpen }) => ($isOpen ? 20 : "auto")};
`;

const Menu = styled(SimpleMenu)`
  width: max-content;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 31;
`;

const SortButton = styled(Button).attrs({
  type: "button",
  plain: true,
  subtle: true,
})`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: ${Padding.xs};
  cursor: pointer;
`;

function isTDActionElement(
  child: unknown,
): child is ReactElement<TableBodyActionProps> {
  return isValidElement(child) && child.type === TableCellAction;
}

export const TableHeaderCell: TableHeaderCellProps = function TableHeaderCell({
  sort,
  isPlaceholder,
  onSortClick,
  dividerRight,
  children,
  ...htmlProps
}) {
  const isSorted = isDefined(sort) && sort !== "NONE";
  const isSortedDesc = sort === "DESC";

  const content = (
    <Flex>
      {isString(children) ? (
        <Label strong muted>
          {children}
        </Label>
      ) : (
        children
      )}
      {isSorted ? (
        isSortedDesc ? (
          <IconMinor.ChevronDownSolid />
        ) : (
          <IconMinor.ChevronUpSolid />
        )
      ) : (
        <Nothing />
      )}
    </Flex>
  );

  return (
    <TableHeaderFrame
      {...htmlProps}
      $dividerRight={dividerRight}
      aria-sort={
        sort === "ASC" ? "ascending" : sort === "DESC" ? "descending" : "none"
      }
    >
      <If is={!is(isPlaceholder)}>
        {isDefined(sort) ? (
          <SortButton onClick={onSortClick}>{content}</SortButton>
        ) : (
          content
        )}
      </If>
    </TableHeaderFrame>
  );
};

export const TableBodyCell: TableBodyCellProps = function TableBodyCell({
  fitContent,
  allowOverflow,
  overflow,
  ...props
}) {
  return (
    <TableBodyCellFrame
      {...props}
      $fitContent={fitContent}
      $allowOverflow={allowOverflow}
      $overflow={overflow}
    />
  );
};

const TableHeadSelect: FC<TableHeadSelectProps> = function TableHeadSelect({
  style,
  dividerRight,
  ...rest
}: TableHeadSelectProps) {
  return (
    <TableHeaderFrame style={style} $dividerRight={dividerRight}>
      <Checkbox {...rest} indeterminate />
    </TableHeaderFrame>
  );
};

const TableCellSelect: FC<CheckboxProps & { selected?: boolean }> =
  function TableCellSelect({ style, selected, checked: checkedProp, ...rest }) {
    const checked = is(checkedProp) || is(selected);

    return (
      <TableCellSelectSelectFrame style={style}>
        <Checkbox {...rest} checked={checked} />
      </TableCellSelectSelectFrame>
    );
  };

const TableHeadActions: FC<ITableHeadProps> = function TableHeadActions(
  props: ITableHeadProps,
) {
  return <TableHeaderCell {...props}></TableHeaderCell>;
};

const TableCellAction: FC<TableBodyActionProps> = function TableCellAction({
  children,
  icon,
  disabled,
  onClick,
  destructive,
}) {
  return (
    <SimpleMenuItem
      onClick={onClick}
      disabled={disabled}
      IconPrefix={icon}
      destructive={destructive}
    >
      {children}
    </SimpleMenuItem>
  );
};

const TableCellActions: FC<ITableCellProps> = function TableCellActions({
  children,
  ...tdProps
}: ITableCellProps) {
  const { clickOutsideRef, isOpen, onItemSelect, toggle } = useSimpleMenuState({
    closeOnItemSelect: true,
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const items = Children.map(children, (child) => {
    if (!isTDActionElement(child)) {
      return child;
    }

    const { onClick, disabled } = child.props;

    return cloneElement(child, {
      onClick: () => {
        if (disabled) {
          return;
        }
        onClick?.();
        onItemSelect();
      },
    });
  });

  return (
    <TableBodyCell
      {...tdProps}
      fitContent
      allowOverflow
      style={{
        ...tdProps.style,
        zIndex: isOpen ? 30 : tdProps.style?.zIndex,
      }}
    >
      <ActionsCell ref={clickOutsideRef} $isOpen={isOpen}>
        <Button
          ref={triggerRef}
          plain
          subtle
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          <Controls />
        </Button>

        <If is={isOpen}>
          <Menu
            usePortal
            open={isOpen}
            onClose={close}
            anchorRef={triggerRef}
            position="bottom-end"
            zIndex={4000}
          >
            {items}
          </Menu>
        </If>
      </ActionsCell>
    </TableBodyCell>
  );
};

TableHeaderCell.Select = TableHeadSelect;
TableHeaderCell.Actions = TableHeadActions;
TableBodyCell.Select = TableCellSelect;
TableBodyCell.Actions = TableCellActions;
TableBodyCell.Action = TableCellAction;
