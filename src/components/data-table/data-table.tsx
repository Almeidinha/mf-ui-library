import { InputText } from "components/input-field";
import { Flex, SpaceBetween } from "components/layout";
import { Pagination } from "components/pagination";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components/table";
import { Label } from "components/typography";
import { Gap } from "foundation/spacing";
import { If } from "helpers/nothing";

import { DataTableColumn, DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";

function getTextAlign(
  align?: DataTableColumn<Record<string, unknown>>["align"],
) {
  return align ?? "left";
}

function isActionsColumn<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
): column is Extract<DataTableColumn<T>, { type: "actions" }> {
  return column.type === "actions";
}

function resolveActionFlag<T extends Record<string, unknown>>(
  value: boolean | ((row: T) => boolean) | undefined,
  row: T,
) {
  if (typeof value === "function") {
    return value(row);
  }
  return Boolean(value);
}

export function DataTable<T extends Record<string, unknown>>(
  props: DataTableProps<T>,
) {
  const {
    columns,
    searchable = false,
    searchPlaceholder = "Search...",
    checkboxSelection = false,
    emptyMessage = "No rows found.",
  } = props;

  const {
    search,
    setSearch,

    sortField,
    sortDirection,
    toggleSort,

    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizeOptions,
    paginated,
    totalRows,
    totalPages,

    visibleRows,

    selectedKeys,
    allVisibleSelected,
    someVisibleSelected,
    toggleRow,
    toggleAllVisible,

    getRowKey,
    getColumnRawValue,
  } = useDataTable(props);

  const colSpan = columns.length + (checkboxSelection ? 1 : 0);

  return (
    <Flex column gap={Gap.l}>
      {searchable ? (
        <InputText
          value={search}
          onChange={setSearch}
          placeholder={searchPlaceholder}
        />
      ) : null}

      <Table>
        <TableHead>
          <TableRow>
            {checkboxSelection ? (
              <TableHeaderCell.Select
                checked={
                  allVisibleSelected
                    ? true
                    : someVisibleSelected
                      ? undefined
                      : false
                }
                onChange={toggleAllVisible}
              />
            ) : null}

            {columns.map((column) => {
              const field = String(column.field);
              const currentSort = sortField === field ? sortDirection : "NONE";
              const sortable = !isActionsColumn(column) && column.sortable;

              return (
                <TableHeaderCell
                  key={field}
                  sort={sortable ? currentSort : undefined}
                  onSortClick={() => toggleSort(field, sortable)}
                  style={{
                    width: column.width,
                    textAlign: getTextAlign(column.align),
                  }}
                  title={column.description}
                >
                  {column.headerName ?? ""}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {visibleRows.length === 0 ? (
            <TableRow>
              <TableBodyCell colSpan={colSpan}>
                <Label subdued>{emptyMessage}</Label>
              </TableBodyCell>
            </TableRow>
          ) : (
            visibleRows.map((row) => {
              const key = getRowKey(row);
              const isSelected = selectedKeys.includes(key);

              return (
                <TableRow key={key} selected={isSelected}>
                  {checkboxSelection ? (
                    <TableBodyCell.Select
                      selected={isSelected}
                      onChange={() => toggleRow(row)}
                    />
                  ) : null}

                  {columns.map((column) => {
                    if (isActionsColumn(column)) {
                      const actions = column
                        .getActions(row)
                        .filter(
                          (action) => !resolveActionFlag(action.hidden, row),
                        );

                      return (
                        <TableBodyCell.Actions
                          key={column.field}
                          fitContent={column.fitContent ?? true}
                          style={{ textAlign: getTextAlign(column.align) }}
                        >
                          {actions.map((action) => {
                            const isDisabled = resolveActionFlag(
                              action.disabled,
                              row,
                            );

                            return (
                              <TableBodyCell.Action
                                key={`${String(column.field)}-${action.key}`}
                                onClick={() => action.onClick(row)}
                                disabled={isDisabled}
                                destructive={action.destructive}
                                icon={action.icon}
                              >
                                {action.label}
                              </TableBodyCell.Action>
                            );
                          })}
                        </TableBodyCell.Actions>
                      );
                    }

                    const rawValue = getColumnRawValue(row, column);
                    const content = column.renderCell
                      ? column.renderCell(row, rawValue)
                      : rawValue;

                    return (
                      <TableBodyCell
                        key={String(column.field)}
                        fitContent={column.fitContent}
                        style={{ textAlign: getTextAlign(column.align) }}
                      >
                        {content}
                      </TableBodyCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <If is={paginated}>
        <SpaceBetween align="center">
          <Label subdued>
            {totalRows === 0
              ? "0 results"
              : `${page * pageSize + 1}-${Math.min(
                  (page + 1) * pageSize,
                  totalRows,
                )} of ${totalRows}`}
          </Label>

          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onChange={(nextPage) => setPage(nextPage - 1)}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            showPageSizeSelector
            pageSizeOptions={pageSizeOptions}
          />
        </SpaceBetween>
      </If>
    </Flex>
  );
}
