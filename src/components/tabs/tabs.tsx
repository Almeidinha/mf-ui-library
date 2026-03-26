import { Flex } from "components/layout";
import { Borders } from "foundation/colors";
import { Margin } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { isReactElementOfType } from "helpers/isReactElementOfType";
import { clamp } from "helpers/numbers";
import { is, safeCallback } from "helpers/safe-navigation";
import { Slot, StylableSlot } from "helpers/slots";
import React, {
  Children,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";

import { Tab as TabBase, TabProps } from "./components";
import { useRovingTabListKeyDown } from "./hooks/useRovingTabListKeyDown";

// Keep styled wrapper so you can style Tab from the parent (TabList)
const Tab = styled(TabBase)``;

const TabList = styled(Flex)`
  ${Tab} {
    margin-bottom: -1px;
    flex-shrink: 0;
  }
`;

const TabListSecondary = styled(TabList)`
  ${Tab} {
    margin-right: ${Margin.xs};
  }
`;

const TabListPrimary = styled(TabList)`
  border-bottom: 1px solid ${Borders.Default.Muted};
`;

class Content extends StylableSlot {}
class Navigation extends Slot {}

type SubComponents = {
  Content: typeof Content;
  TabList: typeof Navigation;
  Tab: typeof Tab;
};

export type TabsProps = PropsWithChildren<{
  secondary?: boolean;
  selected: number;
  onChange?: (selected: number) => void;
  activationMode?: "auto" | "manual";
  idPrefix?: string;
  className?: string;
}>;

const isTab = isReactElementOfType(Tab);
const isTabList = isReactElementOfType(Navigation);
const isContent = isReactElementOfType(Content);

function tabId(prefix: string, i: number) {
  return `${prefix}-tab-${i}`;
}

function panelId(prefix: string, i: number) {
  return `${prefix}-panel-${i}`;
}

function decorateContent(
  child: ReactElement<React.HTMLAttributes<HTMLDivElement>>,
  args: { index: number; selected: number; idPrefix: string },
) {
  const { index, selected, idPrefix = "tabs" } = args;
  const isActive = index === selected;

  return React.cloneElement(child, {
    id: panelId(idPrefix, index),
    role: "tabpanel",
    "aria-labelledby": tabId(idPrefix, index),
    style: {
      ...(child.props.style ?? {}),
      display: isActive ? undefined : "none",
    },
  });
}

const isDisabledTab = (t: ReactElement<TabProps>) =>
  Boolean(t.props.disabled) || t.props["aria-disabled"] === "true";

export const Tabs: FC<TabsProps, SubComponents> = (props) => {
  const {
    className,
    selected,
    onChange,
    secondary,
    activationMode = "auto",
    idPrefix = "tabs",
    ...rest
  } = props;

  const tabTotal = useMemo(() => {
    return Children.toArray(props.children)
      .filter(isTabList)
      .reduce<number>(
        (count, list) =>
          count + Children.toArray(list.props.children).filter(isTab).length,
        0,
      );
  }, [props.children]);

  const safeSelected = useMemo(() => {
    if (tabTotal <= 0) {
      return 0;
    }
    return clamp(selected, 0, tabTotal - 1);
  }, [selected, tabTotal]);

  const safeOnChange = useCallback(
    (next: number) => {
      if (tabTotal <= 0) {
        return;
      }
      const clamped = clamp(next, 0, tabTotal - 1);
      if (clamped !== safeSelected) {
        onChange?.(clamped);
      }
    },
    [onChange, safeSelected, tabTotal],
  );

  const onTabListKeyDown = useRovingTabListKeyDown({
    selectedIndex: safeSelected,
    onActivate: safeOnChange,
    activationMode,
    itemSelector: '[role="tab"]',
  });

  const decoratedChildren: ReactNode = useMemo(() => {
    let contentIndex = 0;
    let tabIndex = 0;

    return Children.map(props.children, (child) => {
      if (isContent(child)) {
        const idx = contentIndex++;
        return decorateContent(child, {
          index: idx,
          selected: safeSelected,
          idPrefix,
        });
      }

      if (isTabList(child)) {
        const tabs = Children.map(child.props.children, (t) => {
          if (!isTab(t)) {
            return t;
          }

          const idx = tabIndex++;
          return decorateTab(t, {
            index: idx,
            selected: safeSelected,
            secondary: !!secondary,
            idPrefix,
            onChange: safeOnChange,
            activationMode,
          });
        });

        const commonProps = {
          className,
          role: "tablist" as const,
          onKeyDown: onTabListKeyDown,
        };

        if (is(secondary) && secondary === true) {
          return <TabListSecondary {...commonProps}>{tabs}</TabListSecondary>;
        }

        return <TabListPrimary {...commonProps}>{tabs}</TabListPrimary>;
      }

      return child;
    });
  }, [
    props.children,
    className,
    idPrefix,
    onTabListKeyDown,
    safeOnChange,
    safeSelected,
    secondary,
    activationMode,
  ]);

  void rest;

  return decoratedChildren;
};

function decorateTab(
  tab: ReactElement<TabProps>,
  args: {
    index: number;
    selected: number;
    secondary: boolean;
    idPrefix: string;
    onChange: (selected: number) => void;
    activationMode: "auto" | "manual";
  },
) {
  const { index, selected, secondary, idPrefix, onChange } = args;

  const isSelected = is(tab.props.selected)
    ? !!tab.props.selected
    : index === selected;

  const id = tab.props.id ?? tabId(idPrefix, index);
  const controls = tab.props["aria-controls"] ?? panelId(idPrefix, index);

  const disabled = isDisabledTab(tab);

  return (
    <Tab
      {...tab.props}
      data-index={index}
      id={id}
      aria-controls={controls}
      secondary={secondary}
      disabled={disabled}
      selected={isSelected}
      tabIndex={disabled ? -1 : isSelected ? 0 : -1}
      onClick={(e) => {
        safeCallback(tab.props.onClick, e);
        if (disabled) {
          return;
        }
        if (!isSelected) {
          onChange(index);
        }
      }}
      onFocus={(e) => {
        safeCallback(tab.props.onFocus, e);
      }}
    >
      {tab.props.children}
    </Tab>
  );
}

Tabs.Content = Content;
Tabs.TabList = Navigation;
Tabs.Tab = Tab;

export { Tab } from "./components";
