import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { isNilOrEmpty, safeArray } from "helpers/safe-navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { IOption, MenuComponentProps } from "../select/types";
import { ROW_HEIGHT } from "./helper";
import { OptionMultiLevelExpandedComponent } from "./option-multilevel-expanded";

export const MenuListFrame = styled.div<{ height?: number }>`
  border: 1px solid ${Borders.Default.Subdued};
  background-color: ${Surface.Default.Default};
  height: ${({ height }) => height}px;
  max-height: ${({ height }) => height}px;
  width: -moz-available;
  width: -webkit-fill-available;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    min-height: 50px;
    border: 2px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 1em;
    background-color: ${Surface.Neutral.Default};
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ${shadowMd};
`;

function buildPathIndex<T>(
  options: IOption<T>[],
  getKey: (v: T) => string,
): Map<string, string[]> {
  const index = new Map<string, string[]>();

  const dfs = (opts: IOption<T>[], path: string[]) => {
    for (const opt of opts) {
      const k = getKey(opt.value);
      const nextPath = [...path, k];
      index.set(k, nextPath);

      if (!isNilOrEmpty(opt.options)) {
        dfs(safeArray(opt.options), nextPath);
      }
    }
  };

  dfs(options, []);
  return index;
}

// eslint-disable-next-line comma-spacing
export const MenuListExpanded = <T,>(
  props: MenuComponentProps<T> & { width?: number },
) => {
  const baseOptions = useMemo(() => safeArray(props.options), [props.options]);

  const { value, getOptionKey } = props;

  const height = useMemo(() => {
    const fallback = baseOptions.length * ROW_HEIGHT + 2;
    return props.menuHeight ?? fallback;
  }, [props.menuHeight, baseOptions.length]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const pathIndex = useMemo(
    () => buildPathIndex(baseOptions, getOptionKey),
    [baseOptions, getOptionKey],
  );

  const expandAlongOption = useCallback(
    (option: IOption<T>) => {
      const key = getOptionKey(option.value);
      const pathKeys = pathIndex.get(key) ?? [];
      setExpandedKeys(new Set(pathKeys));
    },
    [getOptionKey, pathIndex],
  );

  const handleOnExpand = useCallback(
    (option: IOption<T>) => {
      expandAlongOption(option);
      props.onExpand?.(option);
    },
    [expandAlongOption, props],
  );

  const handleOnSelect = useCallback(
    (value: T, option: IOption<T>) => {
      expandAlongOption(option);
      props.onSelect(value, option);
    },
    [expandAlongOption, props],
  );

  const selectedValues = useMemo<T[]>(() => {
    if (props.multi && Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null || Array.isArray(value)) {
      return [];
    }
    return [value];
  }, [value, props.multi]);

  const handleOnReturn = useCallback(() => {
    props.onReturn?.();
  }, [props]);

  return (
    <MenuListFrame ref={containerRef} height={height}>
      {baseOptions.map((opt, index) => (
        <OptionMultiLevelExpandedComponent
          key={getOptionKey(opt.value)}
          option={baseOptions[index]}
          labelComponent={props.labelComponent}
          height={props.rowHeight}
          width={props.width}
          selectedValues={selectedValues}
          selected={props.selectedIndex === index}
          onSelect={handleOnSelect}
          onExpand={handleOnExpand}
          onReturn={handleOnReturn}
          getOptionKey={getOptionKey}
          expandedKeys={expandedKeys}
          containerRef={containerRef}
        />
      ))}
    </MenuListFrame>
  );
};
