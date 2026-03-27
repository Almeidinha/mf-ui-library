import { IconMinor } from "components/icon";
import { InputText } from "components/input-field";
import { Box, Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { CloseButton, NativeSelect } from "components/shared-styled-components";
import { Slide } from "components/transitions";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { uniqueId } from "helpers/safe-navigation";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { getColumnId } from "./dataTable.shared";
import {
  DATA_TABLE_ADVANCED_FILTER_CONNECTOR_OPTIONS,
  DATA_TABLE_ADVANCED_FILTER_OPERATOR_OPTIONS,
  getAdvancedFilterColumnLabel,
  isAdvancedFilterComplete,
  isAdvancedFilterValueRequired,
} from "./dataTableAdvancedFilters.shared";
import type {
  DataTableAdvancedFilter,
  DataTableAdvancedFilterConnector,
  DataTableAdvancedFilterOperator,
  DataTableRegularColumn,
} from "./types";

type DataTableAdvancedFiltersProps<T extends Record<string, unknown>> = {
  searchableColumns: DataTableRegularColumn<T>[];
  filters: DataTableAdvancedFilter[];
  onChange: (filters: DataTableAdvancedFilter[]) => void;
};

const Root = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: min(560px, calc(100vw - 32px));
  border: 1px solid ${Borders.Default.Default};
  border-radius: 8px;
  background: ${Surface.Default.Default};
  ${shadowMd};
  z-index: 20;
`;

const PanelHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: ${Padding.xs} ${Padding.s};
  border-bottom: 1px solid ${Borders.Default.Default};
`;

const PanelBody = styled(Flex)`
  flex-direction: column;
  gap: ${Gap.s};
  padding: ${Padding.xs};
  max-height: min(70vh, 560px);
  overflow: auto;
`;

const RowCard = styled(Flex)`
  gap: ${Gap.xs};
  align-items: flex-end;
  border: 1px solid ${Borders.Default.Muted};
  border-radius: 8px;
  padding: ${Padding.xs};
  background: ${Surface.Default.Muted};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${Gap.xs};
`;

const FieldLabel = styled(Label)`
  display: block;
  margin-bottom: ${Padding.xxs};
`;

const TriggerRow = styled(Flex)`
  width: 100%;
  justify-content: flex-end;
`;

const createAdvancedFilterId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return uniqueId("filter-");
};

export function DataTableAdvancedFilters<T extends Record<string, unknown>>({
  searchableColumns,
  filters,
  onChange,
}: DataTableAdvancedFiltersProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useOnClickOutside(() => {
    setOpen(false);
  });

  const columnOptions = useMemo(
    () =>
      searchableColumns.map((column) => ({
        value: getColumnId(column),
        label: getAdvancedFilterColumnLabel(column),
      })),
    [searchableColumns],
  );

  const availableFields = useMemo(
    () => new Set(columnOptions.map((option) => option.value)),
    [columnOptions],
  );

  const activeFilterCount = useMemo(
    () =>
      filters.filter((filter) =>
        isAdvancedFilterComplete(filter, availableFields),
      ).length,
    [availableFields, filters],
  );

  const defaultField = columnOptions[0]?.value ?? "";

  if (!defaultField) {
    return null;
  }

  const createFilter = (
    connector: DataTableAdvancedFilterConnector = "and",
  ): DataTableAdvancedFilter => ({
    id: createAdvancedFilterId(),
    field: defaultField,
    operator: "contains",
    value: "",
    connector,
  });

  const openPanel = () => {
    if (!open && filters.length === 0) {
      onChange([createFilter()]);
    }

    setOpen((current) => !current);
  };

  const updateFilter = (
    id: string,
    patch: Partial<DataTableAdvancedFilter>,
  ) => {
    onChange(
      filters.map((filter) =>
        filter.id === id ? { ...filter, ...patch } : filter,
      ),
    );
  };

  const removeFilter = (id: string) => {
    onChange(filters.filter((filter) => filter.id !== id));
  };

  const addFilter = () => {
    onChange([...filters, createFilter("and")]);
  };

  return (
    <Root ref={rootRef}>
      <TriggerRow>
        <Button
          aria-label="Advanced filters"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={openPanel}
          IconPrefix={IconMinor.BarsFilter}
        >
          {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : "Filters"}
        </Button>
      </TriggerRow>

      <Slide in={open} direction="down" mountOnEnter unmountOnExit>
        <Panel role="dialog" aria-label="Advanced filters">
          <PanelHeader>
            <Label strong>Advanced filters</Label>
            <CloseButton
              aria-label="Close advanced filters"
              onClick={() => setOpen(false)}
            >
              <IconMinor.Xmark />
            </CloseButton>
          </PanelHeader>

          <PanelBody>
            {filters.map((filter, index) => {
              const valueRequired = isAdvancedFilterValueRequired(
                filter.operator,
              );

              return (
                <RowCard key={filter.id}>
                  <CloseButton
                    aria-label={`Remove filter ${index + 1}`}
                    onClick={() => removeFilter(filter.id)}
                    style={{ marginBottom: Padding.xs }}
                  >
                    <IconMinor.TrashCan />
                  </CloseButton>

                  <If is={index > 0}>
                    <Box>
                      <FieldLabel muted>Connector</FieldLabel>
                      <NativeSelect
                        aria-label={`Filter ${index + 1} connector`}
                        value={filter.connector}
                        onChange={(event) =>
                          updateFilter(filter.id, {
                            connector: event.target
                              .value as DataTableAdvancedFilterConnector,
                          })
                        }
                      >
                        {DATA_TABLE_ADVANCED_FILTER_CONNECTOR_OPTIONS.map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ),
                        )}
                      </NativeSelect>
                    </Box>
                  </If>

                  <FieldGrid>
                    <div>
                      <FieldLabel muted>Column</FieldLabel>
                      <NativeSelect
                        aria-label={`Filter ${index + 1} column`}
                        value={filter.field}
                        onChange={(event) =>
                          updateFilter(filter.id, {
                            field: event.target.value,
                          })
                        }
                      >
                        {columnOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </NativeSelect>
                    </div>

                    <div>
                      <FieldLabel muted>Operator</FieldLabel>
                      <NativeSelect
                        aria-label={`Filter ${index + 1} operator`}
                        value={filter.operator}
                        onChange={(event) =>
                          updateFilter(filter.id, {
                            operator: event.target
                              .value as DataTableAdvancedFilterOperator,
                          })
                        }
                      >
                        {DATA_TABLE_ADVANCED_FILTER_OPERATOR_OPTIONS.map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ),
                        )}
                      </NativeSelect>
                    </div>
                    <div>
                      <If is={valueRequired}>
                        <FieldLabel muted>Value</FieldLabel>
                        <InputText
                          aria-label={`Filter ${index + 1} value`}
                          value={filter.value}
                          onChange={(value) =>
                            updateFilter(filter.id, {
                              value,
                            })
                          }
                          placeholder="Enter a value"
                        />
                      </If>
                    </div>
                  </FieldGrid>
                </RowCard>
              );
            })}

            <Flex gap={Gap.xs} justify="space-between">
              <Button
                small
                primary
                aria-label="Add filter"
                onClick={addFilter}
                IconPrefix={IconMinor.Plus}
              >
                Add filter
              </Button>
              <Button
                small
                primary
                disabled={filters.length === 0}
                onClick={() => onChange([])}
              >
                Clear all
              </Button>
            </Flex>
          </PanelBody>
        </Panel>
      </Slide>
    </Root>
  );
}
