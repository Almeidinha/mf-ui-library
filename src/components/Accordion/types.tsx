import { SlideProps } from "components/transitions/types";
import { HTMLAttributes, ReactNode } from "react";

export type AccordionValue = string;
export type AccordionType = "single" | "multiple";
export type AccordionVariant = "outlined" | "filled" | "ghost";
export type AccordionSize = "sm" | "md" | "lg";
export type IconPosition = "start" | "end";

export type AccordionContextValue = {
  rootId: string;
  type: AccordionType;
  disabled: boolean;
  readOnly: boolean;
  collapsible: boolean;
  iconPosition: IconPosition;
  size: AccordionSize;
  variant: AccordionVariant;
  unmountOnExit: boolean;
  transitionProps?: Omit<SlideProps, "children" | "in">;
  isItemExpanded: (value: AccordionValue) => boolean;
  isItemDisabled: (value: AccordionValue, itemDisabled?: boolean) => boolean;
  toggleItem: (value: AccordionValue, itemDisabled?: boolean) => void;
  registerHeader: (
    value: AccordionValue,
    node: HTMLButtonElement | null,
    disabled: boolean,
  ) => void;
  focusAdjacentHeader: (
    currentValue: AccordionValue,
    direction: "next" | "prev" | "first" | "last",
  ) => void;
};

export type AccordionItemContextValue = {
  value: AccordionValue;
  disabled: boolean;
  expanded: boolean;
  headerId: string;
  panelId: string;
};

type AccordionCommonProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  unmountOnExit?: boolean;
  iconPosition?: IconPosition;
  variant?: AccordionVariant;
  size?: AccordionSize;
  hasDividers?: boolean;
  transitionProps?: Omit<SlideProps, "children" | "in">;
};

type AccordionSingleProps = AccordionCommonProps & {
  type?: "single";
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onValueChange?: (value: AccordionValue | undefined) => void;
  collapsible?: boolean;
};

type AccordionMultipleProps = AccordionCommonProps & {
  type: "multiple";
  value?: AccordionValue[];
  defaultValue?: AccordionValue[];
  onValueChange?: (value: AccordionValue[]) => void;
  collapsible?: never;
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
