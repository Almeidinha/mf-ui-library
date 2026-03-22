import { toCssSize } from "helpers/css-helpers";
import { useControllableState } from "hooks/useControllableState";
import { useCallback } from "react";

import {
  DEFAULT_MINI_SIZE,
  DEFAULT_SIZE,
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_Z_INDEX,
} from "./constants";
import { SharedDrawerRenderer, shouldUseMini } from "./internal";
import { DrawerProps } from "./types";

export function Drawer({
  open: openProp,
  defaultOpen = false,
  onClose,
  onOpenChange,
  children,
  anchor = "left",
  variant = "temporary",
  containerRef,
  keepMounted = true,
  mini = false,
  miniSize = DEFAULT_MINI_SIZE,
  size = DEFAULT_SIZE,
  overlay = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  zIndex = DEFAULT_Z_INDEX,
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  className,
  contentClassName,
  style,
  contentStyle,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: DrawerProps) {
  const [open, setOpen] = useControllableState<boolean, false>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const miniActive = shouldUseMini(variant, mini);
  const sizeCss = toCssSize(size, DEFAULT_SIZE);
  const miniSizeCss = toCssSize(miniSize, DEFAULT_MINI_SIZE);

  const handleRequestClose = useCallback(() => {
    if (!open) {
      return;
    }

    setOpen(false);
    onClose?.();
  }, [onClose, open, setOpen]);

  return (
    <SharedDrawerRenderer
      open={open}
      anchor={anchor}
      variant={variant}
      containerRef={containerRef}
      keepMounted={keepMounted}
      miniActive={miniActive}
      overlay={overlay}
      closeOnOverlayClick={closeOnOverlayClick}
      lockScroll={lockScroll}
      closeOnEsc={closeOnEsc}
      zIndex={zIndex}
      duration={transitionDuration}
      sizeCss={sizeCss}
      miniSizeCss={miniSizeCss}
      className={className}
      contentClassName={contentClassName}
      style={style}
      contentStyle={contentStyle}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      onRequestClose={handleRequestClose}
    >
      {children}
    </SharedDrawerRenderer>
  );
}
