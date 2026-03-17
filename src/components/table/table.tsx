import {
  Checkbox,
  CheckboxProps,
  CheckboxPropsThreeState,
} from "components/checkbox";
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
import { Margin, Padding } from "foundation/spacing";
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
} from "react";
import styled, { css } from "styled-components";

type TableHeadSelectProps = Omit<CheckboxPropsThreeState, "indeterminate">;
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
}

export interface ITableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  fitContent?: boolean;
}

export const Table = styled.table<{
  $bordered?: boolean;
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
  overflow: hidden;
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
`;

export const TableBody = styled.tbody`
  tr:nth-child(odd):not([aria-selected="true"]) {
    background-color: ${Surface.Default.Default};
  }

  tr:nth-child(even):not([aria-selected="true"]) {
    background-color: ${Surface.Default.Subdued};
  }
`;

export const TableHeaderFrame = styled.th.attrs({ scope: "col" })<{
  $bordered?: boolean;
}>`
  text-align: left;
  padding: ${Padding.m};
  border-top: ${({ $bordered = true }) =>
    $bordered ? "none" : `1px solid ${Borders.Default.Subdued}`};
  border-bottom: 1px solid ${Borders.Default.Subdued};
  background-color: ${Surface.Default.Subdued};
`;

const TableBodyCellFrame = styled.td<{ $fitContent?: boolean }>`
  padding: ${Padding.m};
  ${Typography.Body}

  ${({ $fitContent }) =>
    is($fitContent)
      ? css`
          white-space: nowrap;
          width: 1%;
        `
      : css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
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

const ActionsCell = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Menu = styled(SimpleMenu)`
  position: absolute;
  top: ${Margin.xs};
  width: max-content;
  right: 0;
  margin: ${Margin.none};
  z-index: 10;
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
  children,
  ...htmlProps
}) {
  const isSorted = isDefined(sort) && sort !== "NONE";
  const isSortedDesc = sort === "DESC";

  const content = (
    <Flex>
      {isString(children) ? (
        <Label strong subdued>
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
  ...props
}) {
  return <TableBodyCellFrame {...props} $fitContent={fitContent} />;
};

const TableHeadSelect: FC<TableHeadSelectProps> = function TableHeadSelect({
  style,
  ...rest
}: TableHeadSelectProps) {
  return (
    <TableHeaderFrame style={style}>
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
    <TableBodyCell {...tdProps}>
      <ActionsCell ref={clickOutsideRef}>
        <Button
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
          <Menu>{items}</Menu>
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
