import { IconMinor } from "components/icon";
import { InputText } from "components/input-field";
import { Box, Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { type IOption, Select } from "components/select";
import { CloseButton } from "components/shared-styled-components";
import { Slide } from "components/transitions";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import { uniqueId } from "helpers/safe-navigation";
import useDebounce from "hooks/useDebounce";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useEffect, useMemo, useState } from "react";
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
  searchDebounce?: number;
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
  searchDebounce = 250,
}: DataTableAdvancedFiltersProps<T>) {
  const [open, setOpen] = useState(false);
  const [draftValues, setDraftValues] = useState<Record<string, string>>(() =>
    filters.reduce<Record<string, string>>((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {}),
  );
  const debouncedDraftValues = useDebounce(draftValues, searchDebounce);
  const rootRef = useOnClickOutside((event) => {
    const target = event.target as HTMLElement | null;

    if (target?.closest?.(".select-menu")) {
      return;
    }

    setOpen(false);
  });

  useEffect(() => {
    const nextFilters = filters.map((filter) => {
      const nextValue = debouncedDraftValues[filter.id];

      if (nextValue === undefined || nextValue === filter.value) {
        return filter;
      }

      return {
        ...filter,
        value: nextValue,
      };
    });

    const changed = nextFilters.some((filter, index) => filter !== filters[index]);

    if (changed) {
      onChange(nextFilters);
    }
  }, [debouncedDraftValues, filters, onChange]);

  const columnOptions = useMemo(
    () =>
      searchableColumns.map((column) => ({
        value: getColumnId(column),
        label: getAdvancedFilterColumnLabel(column),
      })) satisfies IOption<string>[],
    [searchableColumns],
  );

  const connectorOptions = useMemo(
    () =>
      DATA_TABLE_ADVANCED_FILTER_CONNECTOR_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })) satisfies IOption<DataTableAdvancedFilterConnector>[],
    [],
  );

  const operatorOptions = useMemo(
    () =>
      DATA_TABLE_ADVANCED_FILTER_OPERATOR_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })) satisfies IOption<DataTableAdvancedFilterOperator>[],
    [],
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
      const nextFilter = createFilter();
      setDraftValues((current) => ({
        ...current,
        [nextFilter.id]: nextFilter.value,
      }));
      onChange([nextFilter]);
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
    setDraftValues((current) => {
      const nextValues = { ...current };
      delete nextValues[id];
      return nextValues;
    });
    onChange(filters.filter((filter) => filter.id !== id));
  };

  const addFilter = () => {
    const nextFilter = createFilter("and");
    setDraftValues((current) => ({
      ...current,
      [nextFilter.id]: nextFilter.value,
    }));
    onChange([...filters, nextFilter]);
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
                      <Select
                        ariaLabel={`Filter ${index + 1} connector`}
                        value={filter.connector}
                        options={connectorOptions}
                        disablePortal={false}
                        onChange={(value) => {
                          updateFilter(filter.id, {
                            connector: value,
                          });
                        }}
                      />
                    </Box>
                  </If>

                  <FieldGrid>
                    <div>
                      <FieldLabel muted>Column</FieldLabel>
                      <Select
                        ariaLabel={`Filter ${index + 1} column`}
                        value={filter.field}
                        options={columnOptions}
                        disablePortal={false}
                        onChange={(value) => {
                          updateFilter(filter.id, {
                            field: value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <FieldLabel muted>Operator</FieldLabel>
                      <Select
                        ariaLabel={`Filter ${index + 1} operator`}
                        value={filter.operator}
                        options={operatorOptions}
                        disablePortal={false}
                        onChange={(value) => {
                          updateFilter(filter.id, {
                            operator: value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <If is={valueRequired}>
                        <FieldLabel muted>Value</FieldLabel>
                        <InputText
                          aria-label={`Filter ${index + 1} value`}
                          value={draftValues[filter.id] ?? filter.value}
                          onChange={(value) =>
                            setDraftValues((current) => ({
                              ...current,
                              [filter.id]: value,
                            }))
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
                onClick={() => {
                  setDraftValues({});
                  onChange([]);
                }}
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
