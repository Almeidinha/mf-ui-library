import { IconMinor } from "components/icon";
import { TransformIconWrapper } from "components/shared-styled-components";
import { Slide } from "components/transitions/slide";
import { Typography } from "components/typography";
import { Borders, Focus, Surface } from "foundation/colors";
import { useControllableState } from "hooks/useControllableState";
import React, {
  ButtonHTMLAttributes,
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
} from "react";
import styled, { css, RuleSet } from "styled-components";

import {
  AccordionContextValue,
  AccordionItemContextValue,
  AccordionProps,
  AccordionSize,
  AccordionType,
  AccordionValue,
  AccordionVariant,
  IconPosition,
} from "./types";

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function isAccordionItemElement(
  child: ReactNode,
): child is React.ReactElement<AccordionItemProps, typeof AccordionItem> {
  return React.isValidElement(child) && child.type === AccordionItem;
}

function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "Accordion compound components must be used inside <Accordion />",
    );
  }

  return context;
}

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "AccordionHeader and AccordionPanel must be used inside <AccordionItem />",
    );
  }

  return context;
}

const SIZE_STYLES_MAP: Record<AccordionSize, RuleSet<object>> = {
  sm: css`
    --accordion-header-padding-y: 10px;
    --accordion-header-padding-x: 12px;
    --accordion-panel-padding-bottom: 12px;
    --accordion-title-font-size: 14px;
    --accordion-subtitle-font-size: 12px;
    --accordion-icon-size: 16px;
  `,
  md: css`
    --accordion-header-padding-y: 14px;
    --accordion-header-padding-x: 16px;
    --accordion-panel-padding-bottom: 16px;
    --accordion-title-font-size: 15px;
    --accordion-subtitle-font-size: 13px;
    --accordion-icon-size: 18px;
  `,
  lg: css`
    --accordion-header-padding-y: 18px;
    --accordion-header-padding-x: 20px;
    --accordion-panel-padding-bottom: 20px;
    --accordion-title-font-size: 16px;
    --accordion-subtitle-font-size: 14px;
    --accordion-icon-size: 20px;
  `,
};

const VARIANT_STYLES_MAP: Record<AccordionVariant, RuleSet<object>> = {
  filled: css`
    background: ${Surface.Default.Default};
    border: 1px solid ${Borders.Default.Default};
  `,
  ghost: css`
    background: transparent;
    border: 0;
  `,
  outlined: css`
    background: transparent;
    border: 1px solid ${Borders.Default.Default};
  `,
};

const Root = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["type", "value", "defaultValue", "onValueChange", "collapsible"].includes(
      prop,
    ),
})<{
  $size: AccordionSize;
  $variant: AccordionVariant;
}>`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;

  ${({ $size }) => SIZE_STYLES_MAP[$size]}
  ${({ $variant }) => VARIANT_STYLES_MAP[$variant]}
`;

const ItemRoot = styled.div<{ $hasDivider: boolean }>`
  ${({ $hasDivider }) =>
    $hasDivider &&
    css`
      & + & {
        border-top: 1px solid ${Borders.Default.Default};
      }
    `}

  &:has([data-slot="accordion-header"]:focus-visible) {
    z-index: 1;
    box-shadow: inset 0 0 0 2px ${Focus.Default};
  }

  &:has([data-slot="accordion-header"]:focus-visible):first-child {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  &:has([data-slot="accordion-header"]:focus-visible):last-child {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;

const HeaderButton = styled.button.attrs<{
  $expanded: boolean;
  $disabled: boolean;
  $iconPosition: IconPosition;
}>({
  type: "button",
})`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--accordion-header-padding-y) var(--accordion-header-padding-x);
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  ${({ $iconPosition }) =>
    $iconPosition === "start"
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: row-reverse;
        `}

  &:focus-visible {
    outline: none;
  }
`;

const HeaderMain = styled.span`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const HeaderTitle = styled(Typography)`
  font-size: var(--accordion-title-font-size);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
`;

const HeaderSubtitle = styled(Typography)`
  font-size: var(--accordion-subtitle-font-size);
  line-height: 1.3;
  opacity: 0.75;
`;

const HeaderActions = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const PanelRegion = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? "1fr" : "0fr")};
  transition: grid-template-rows 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PanelRegionInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;

const PanelContent = styled(Typography)`
  padding: 0 var(--accordion-header-padding-x)
    var(--accordion-panel-padding-bottom) var(--accordion-header-padding-x);
`;

const ActionsRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(props, ref) {
    const {
      children,
      disabled = false,
      readOnly = false,
      unmountOnExit = false,
      iconPosition = "end",
      variant = "outlined",
      size = "md",
      hasDividers = true,
      transitionProps,
      ...rest
    } = props;

    const isMultiple = props.type === "multiple";
    const type: AccordionType = isMultiple ? "multiple" : "single";
    const collapsible = isMultiple ? true : (props.collapsible ?? true);

    const rootId = useId();

    const singleProps = isMultiple ? undefined : props;
    const multipleProps = isMultiple ? props : undefined;

    const [singleValue, setSingleValue] = useControllableState<AccordionValue>({
      value: singleProps?.value,
      defaultValue: singleProps?.defaultValue,
      onChange: singleProps?.onValueChange,
      readOnly,
    });

    const [multipleValue, setMultipleValue] = useControllableState<
      AccordionValue[],
      false
    >({
      value: multipleProps?.value,
      defaultValue: multipleProps?.defaultValue ?? [],
      onChange: multipleProps?.onValueChange,
      readOnly,
    });

    const headersRef = useRef<
      Map<
        AccordionValue,
        {
          node: HTMLButtonElement;
          disabled: boolean;
          order: number;
        }
      >
    >(new Map());

    const orderRef = useRef(0);

    const isItemExpanded = useCallback(
      (itemValue: AccordionValue) => {
        if (type === "multiple") {
          return multipleValue.includes(itemValue);
        }

        return singleValue === itemValue;
      },
      [multipleValue, singleValue, type],
    );

    const isItemDisabled = useCallback(
      (_: AccordionValue, itemDisabled?: boolean) => {
        return Boolean(disabled || itemDisabled);
      },
      [disabled],
    );

    const toggleItem = useCallback(
      (itemValue: AccordionValue, itemDisabled?: boolean) => {
        if (disabled || readOnly || itemDisabled) {
          return;
        }

        if (type === "multiple") {
          const isOpen = multipleValue.includes(itemValue);

          setMultipleValue(
            isOpen
              ? multipleValue.filter(
                  (currentValue) => currentValue !== itemValue,
                )
              : [...multipleValue, itemValue],
          );

          return;
        }

        const isOpen = singleValue === itemValue;

        if (isOpen) {
          if (!collapsible) {
            return;
          }

          setSingleValue(undefined);
          return;
        }

        setSingleValue(itemValue);
      },
      [
        collapsible,
        disabled,
        multipleValue,
        readOnly,
        setMultipleValue,
        setSingleValue,
        singleValue,
        type,
      ],
    );

    const registerHeader = useCallback(
      (
        itemValue: AccordionValue,
        node: HTMLButtonElement | null,
        headerDisabled: boolean,
      ) => {
        if (!node) {
          headersRef.current.delete(itemValue);
          return;
        }

        const existing = headersRef.current.get(itemValue);

        headersRef.current.set(itemValue, {
          node,
          disabled: headerDisabled,
          order: existing?.order ?? orderRef.current++,
        });
      },
      [],
    );

    const focusAdjacentHeader = useCallback(
      (
        currentValue: AccordionValue,
        direction: "next" | "prev" | "first" | "last",
      ) => {
        const entries = [...headersRef.current.entries()]
          .sort(([, a], [, b]) => a.order - b.order)
          .filter(([, item]) => !item.disabled);

        if (!entries.length) {
          return;
        }

        const currentIndex = entries.findIndex(
          ([itemValue]) => itemValue === currentValue,
        );

        if (direction === "first") {
          entries[0]?.[1].node.focus();
          return;
        }

        if (direction === "last") {
          entries[entries.length - 1]?.[1].node.focus();
          return;
        }

        if (currentIndex === -1) {
          return;
        }

        if (direction === "next") {
          const nextIndex = (currentIndex + 1) % entries.length;
          entries[nextIndex]?.[1].node.focus();
          return;
        }

        const prevIndex = (currentIndex - 1 + entries.length) % entries.length;
        entries[prevIndex]?.[1].node.focus();
      },
      [],
    );

    const contextValue = useMemo<AccordionContextValue>(
      () => ({
        rootId,
        type,
        disabled,
        readOnly,
        collapsible,
        iconPosition,
        size,
        variant,
        unmountOnExit,
        transitionProps,
        isItemExpanded,
        isItemDisabled,
        toggleItem,
        registerHeader,
        focusAdjacentHeader,
      }),
      [
        rootId,
        type,
        disabled,
        readOnly,
        collapsible,
        iconPosition,
        size,
        variant,
        unmountOnExit,
        transitionProps,
        isItemExpanded,
        isItemDisabled,
        toggleItem,
        registerHeader,
        focusAdjacentHeader,
      ],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <Root
          ref={ref}
          $size={size}
          $variant={variant}
          data-slot="accordion"
          {...rest}
        >
          {React.Children.map(children, (child) => {
            if (!isAccordionItemElement(child)) {
              return child;
            }

            return React.cloneElement(child, {
              hasDividers,
            });
          })}
        </Root>
      </AccordionContext.Provider>
    );
  },
);

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: AccordionValue;
  disabled?: boolean;
  children: ReactNode;
  hasDividers?: boolean;
};

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(props, ref) {
    const {
      value,
      disabled = false,
      children,
      hasDividers = true,
      ...rest
    } = props;

    const { rootId, isItemExpanded } = useAccordionContext();

    const expanded = isItemExpanded(value);
    const internalId = useId();
    const baseId = `${rootId}-${value}-${internalId}`
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_:.]/g, "");

    const itemContextValue = useMemo<AccordionItemContextValue>(
      () => ({
        value,
        disabled,
        expanded,
        headerId: `${baseId}-header`,
        panelId: `${baseId}-panel`,
      }),
      [baseId, disabled, expanded, value],
    );

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <ItemRoot
          ref={ref}
          $hasDivider={hasDividers}
          data-slot="accordion-item"
          data-expanded={expanded ? "" : undefined}
          {...rest}
        >
          {children}
        </ItemRoot>
      </AccordionItemContext.Provider>
    );
  },
);

export type AccordionHeaderProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  subtitle?: ReactNode;
  expandIcon?: ReactNode;
  actions?: ReactNode;
  headingLevel?: "h1" | "h2" | "h3" | "h4";
};

export const AccordionHeader = forwardRef<
  HTMLButtonElement,
  AccordionHeaderProps
>(function AccordionHeader(props, ref) {
  const {
    children,
    subtitle,
    expandIcon,
    actions,
    headingLevel = "h3",
    onClick,
    onKeyDown,
    ...rest
  } = props;

  const {
    type,
    readOnly,
    disabled: accordionDisabled,
    collapsible,
    iconPosition,
    toggleItem,
    registerHeader,
    focusAdjacentHeader,
  } = useAccordionContext();

  const {
    value,
    disabled: itemDisabled,
    expanded,
    headerId,
    panelId,
  } = useAccordionItemContext();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const actualDisabled = accordionDisabled || itemDisabled;
  const collapseBlocked =
    type === "single" && expanded && !collapsible && !actualDisabled;
  const interactive = !actualDisabled && !readOnly && !collapseBlocked;

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      registerHeader(value, node, actualDisabled);

      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      ref.current = node;
    },
    [actualDisabled, ref, registerHeader, value],
  );

  const handleClick = useCallback<
    NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onClick"]>
  >(
    (event) => {
      onClick?.(event);

      if (event.defaultPrevented || !interactive) {
        return;
      }

      toggleItem(value, itemDisabled);
    },
    [interactive, itemDisabled, onClick, toggleItem, value],
  );

  const handleKeyDown = useCallback<
    NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onKeyDown"]>
  >(
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusAdjacentHeader(value, "next");
          break;
        case "ArrowUp":
          event.preventDefault();
          focusAdjacentHeader(value, "prev");
          break;
        case "Home":
          event.preventDefault();
          focusAdjacentHeader(value, "first");
          break;
        case "End":
          event.preventDefault();
          focusAdjacentHeader(value, "last");
          break;
        default:
          break;
      }
    },
    [focusAdjacentHeader, onKeyDown, value],
  );

  return (
    <HeaderButton
      {...rest}
      ref={setRefs}
      id={headerId}
      $expanded={expanded}
      $disabled={actualDisabled}
      $iconPosition={iconPosition}
      aria-expanded={expanded}
      aria-controls={panelId}
      aria-disabled={readOnly || collapseBlocked ? true : undefined}
      disabled={actualDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-slot="accordion-header"
    >
      <TransformIconWrapper $rotate={expanded} aria-hidden="true">
        {expandIcon ?? <IconMinor.ChevronDownSolid />}
      </TransformIconWrapper>

      <HeaderMain>
        <HeaderTitle variant={headingLevel}>{children}</HeaderTitle>
        {subtitle ? (
          <HeaderSubtitle variant="caption">{subtitle}</HeaderSubtitle>
        ) : null}
      </HeaderMain>

      {actions ? <HeaderActions>{actions}</HeaderActions> : null}
    </HeaderButton>
  );
});

export type AccordionPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  function AccordionPanel(props, ref) {
    const { children, ...rest } = props;

    const { unmountOnExit, transitionProps } = useAccordionContext();
    const { expanded, headerId, panelId } = useAccordionItemContext();

    return (
      <PanelRegion
        $expanded={expanded}
        data-slot="accordion-panel-region"
        data-expanded={expanded ? "" : undefined}
      >
        <PanelRegionInner>
          <div
            ref={ref}
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            aria-hidden={!expanded}
            {...rest}
          >
            <Slide
              in={expanded}
              mountOnEnter={unmountOnExit}
              unmountOnExit={unmountOnExit}
              appear={false}
              timeout={transitionProps?.timeout ?? 200}
              easing={transitionProps?.easing}
              direction={transitionProps?.direction ?? "down"}
              offset={transitionProps?.offset ?? 8}
              enter={transitionProps?.enter}
              exit={transitionProps?.exit}
            >
              <PanelContent variant="body" data-slot="accordion-panel-content">
                {children}
              </PanelContent>
            </Slide>
          </div>
        </PanelRegionInner>
      </PanelRegion>
    );
  },
);

export type AccordionActionsProps = HTMLAttributes<HTMLDivElement>;

export const AccordionActions = forwardRef<
  HTMLDivElement,
  AccordionActionsProps
>(function AccordionActions(props, ref) {
  const { children, ...rest } = props;

  return (
    <ActionsRoot ref={ref} data-slot="accordion-actions" {...rest}>
      {children}
    </ActionsRoot>
  );
});
