import { clamp } from "@helpers";

export type ViewportPadding = number;

export type Placement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end"
  | "right-start"
  | "left-start";

export type FixedPos = {
  top: number;
  left: number;
  maxHeight?: number;
};

export function computeAnchoredPosition(args: {
  anchorEl: HTMLElement;
  placement: Placement;
  offset: number;
  panelWidth: number;
  panelHeight?: number;
  viewportPadding?: ViewportPadding;
  maxHeight?: number;
}): FixedPos {
  const {
    anchorEl,
    placement,
    offset,
    panelWidth,
    panelHeight,
    viewportPadding = 8,
  } = args;

  const a = anchorEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = 0;
  let top = 0;

  const startLeft = a.left;
  const endLeft = a.right - panelWidth;

  const belowTop = a.bottom + offset;
  const aboveTop = a.top - offset - (panelHeight ?? 0);

  switch (placement) {
    case "bottom-start":
      left = startLeft;
      top = belowTop;
      break;
    case "bottom-end":
      left = endLeft;
      top = belowTop;
      break;
    case "top-start":
      left = startLeft;
      top = aboveTop;
      break;
    case "top-end":
      left = endLeft;
      top = aboveTop;
      break;
    case "right-start":
      left = a.right + offset;
      top = a.top;
      break;
    case "left-start":
      left = a.left - offset - panelWidth;
      top = a.top;
      break;
  }

  const clampedLeft = clamp(
    left,
    viewportPadding,
    vw - viewportPadding - panelWidth,
  );

  const minTop = viewportPadding;
  const maxTop = panelHeight
    ? vh - viewportPadding - panelHeight
    : vh - viewportPadding - 40;

  const clampedTop = clamp(top, minTop, Math.max(minTop, maxTop));

  return { top: Math.round(clampedTop), left: Math.round(clampedLeft) };
}
