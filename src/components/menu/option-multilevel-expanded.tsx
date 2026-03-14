import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Slide } from "components/transitions";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { If } from "helpers/nothing";
import { clamp } from "helpers/numbers";
import { isNilOrEmpty, safeArray } from "helpers/safe-navigation";
import { useRepositionOnScroll } from "hooks";
import React, {
  JSX,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { OptionItem } from "../select/components/helpers";
import { IOption, SelectLabelComponent } from "../select/types";
import { getOptionState } from "../select/utils";
import { ROW_HEIGHT } from "./helper";

type OptionMultiLevelExpandedProps<T> = {
  option: IOption<T>;
  selectedValues: T[];
  selected?: boolean;
  height?: number;
  width?: number;
  className?: string;
  labelComponent?: SelectLabelComponent<T>;

  getOptionKey: (value: T) => string;
  onSelect: (value: T, option: IOption<T>) => void;
  onExpand?: (option: IOption<T>) => void;
  onReturn?: () => void;

  expandedKeys: Set<string>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

type FixedPos = { top: number; left: number; maxHeight: number };

const PortalMenuFrame = styled.div<{
  $top: number;
  $left: number;
  $maxHeight: number;
  $width?: number;
}>`
  border: 1px solid ${Borders.Default.Subdued};
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${Surface.Default.Default};
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
`;

function computeSubmenuPosition(args: {
  anchorEl: HTMLElement;
  containerEl?: HTMLElement | null;
  menuWidth: number;
  offset: number;
}): FixedPos {
  const { anchorEl, containerEl, menuWidth, offset } = args;

  const anchorRect = anchorEl.getBoundingClientRect();
  const containerRect = containerEl?.getBoundingClientRect();

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const rightLeft = anchorRect.right + offset;
  const leftLeft = anchorRect.left - offset - menuWidth;

  const fitsRight = rightLeft + menuWidth <= viewportW;
  const left = fitsRight ? rightLeft : leftLeft;

  const baseTop = containerRect?.top ?? anchorRect.top;

  const topMin = 0;
  const topMax = Math.max(topMin, viewportH - ROW_HEIGHT);
  const top = clamp(baseTop, topMin, topMax);

  const maxHeight = Math.max(ROW_HEIGHT, viewportH - top);

  return { top, left, maxHeight };
}

// eslint-disable-next-line comma-spacing
const OptionMultiLevelExpandedComponentImpl = <T,>({
  selected,
  labelComponent: CustomLabel,
  option,
  height,
  width,
  selectedValues,
  expandedKeys,
  containerRef,
  onExpand,
  onSelect,
  onReturn,
  getOptionKey,
}: OptionMultiLevelExpandedProps<T>) => {
  const active = useMemo(
    () =>
      selectedValues.some(
        (v) => getOptionKey(v) === getOptionKey(option.value),
      ),
    [selectedValues, option.value, getOptionKey],
  );

  const optionKey = useMemo(
    () => getOptionKey(option.value),
    [option.value, getOptionKey],
  );

  const isExpanded = expandedKeys.has(optionKey);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<FixedPos>({
    top: 0,
    left: 0,
    maxHeight: 300,
  });

  const hasChildren = !isNilOrEmpty(option?.options);

  const onClick = useCallback(() => {
    if (hasChildren) {
      onExpand?.(option);
    } else {
      onSelect(option.value, option);
    }
  }, [hasChildren, option, onExpand, onSelect]);

  const updatePosition = useCallback(() => {
    const anchorEl = anchorRef.current;
    if (!anchorEl) {
      return;
    }

    const menuWidth =
      width ?? anchorRef.current?.getBoundingClientRect().width ?? 250;

    setPos(
      computeSubmenuPosition({
        anchorEl,
        containerEl: containerRef.current,
        menuWidth,
        offset: 8,
      }),
    );
  }, [containerRef, width]);

  useLayoutEffect(() => {
    if (!isExpanded) {
      return;
    }
    updatePosition();
  }, [isExpanded, updatePosition]);

  useRepositionOnScroll({
    enabled: isExpanded,
    onReposition: updatePosition,
    scrollContainerRef: containerRef,
  });

  return (
    <>
      <OptionItem
        ref={anchorRef}
        data-role="option"
        center
        state={getOptionState(active, selected)}
        height={height}
        onClick={onClick}
      >
        {CustomLabel ? (
          <CustomLabel type="option" active={active} {...option}>
            <Flex>
              {option.icon}
              {option.label}
            </Flex>
          </CustomLabel>
        ) : (
          <Label>
            <Flex>
              {option.icon}
              {option.label}
            </Flex>
          </Label>
        )}

        <If is={hasChildren}>
          <IconMinor.ChevronRightSolid />
        </If>
      </OptionItem>

      {createPortal(
        <Slide
          in={isExpanded === true && hasChildren}
          direction="right"
          mountOnEnter
          unmountOnExit
        >
          <PortalMenuFrame
            $top={pos.top}
            $left={pos.left}
            $width={width}
            $maxHeight={pos.maxHeight}
          >
            {safeArray(option?.options).map((subOption) => (
              <OptionMultiLevelExpandedComponent<T>
                key={getOptionKey(subOption.value)}
                option={subOption}
                labelComponent={CustomLabel}
                height={height}
                width={width}
                selectedValues={selectedValues}
                onSelect={onSelect}
                onExpand={onExpand}
                onReturn={onReturn}
                getOptionKey={getOptionKey}
                expandedKeys={expandedKeys}
                containerRef={containerRef}
              />
            ))}
          </PortalMenuFrame>
        </Slide>,
        document.body,
      )}
    </>
  );
};

export const OptionMultiLevelExpandedComponent = memo(
  OptionMultiLevelExpandedComponentImpl,
) as <T>(props: OptionMultiLevelExpandedProps<T>) => JSX.Element;
