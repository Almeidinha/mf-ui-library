import { useMergedRefs } from "hooks/useMergedRefs";
import {
  CSSProperties,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CollapseProps } from "./types";
import { useTransitionState } from "./use-transition-state";
import { normalizeEasing, normalizeTimeout, toCssUnit } from "./utils";

function getContentSize(
  element: HTMLElement | null,
  orientation: "vertical" | "horizontal",
) {
  if (!element) {
    return 0;
  }

  return orientation === "vertical"
    ? element.scrollHeight
    : element.scrollWidth;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  function Collapse(props, forwardedRef) {
    const {
      in: inProp = false,
      appear = true,
      enter = true,
      exit = true,
      mountOnEnter = false,
      unmountOnExit = false,
      timeout = 200,
      easing = "ease-in-out",
      collapsedSize = 0,
      orientation = "vertical",
      animateOpacity = true,
      children,
      onEnter,
      onEntered,
      onExit,
      onExited,
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const prevInRef = useRef(inProp);

    const { isMounted, isReducedMotion } = useTransitionState({
      in: inProp,
      appear,
      enter,
      exit,
      mountOnEnter,
      unmountOnExit,
      timeout,
      onEnter,
      onEntered,
      onExit,
      onExited,
    });

    const timeouts = useMemo(() => normalizeTimeout(timeout), [timeout]);
    const easingByMode = useMemo(() => normalizeEasing(easing), [easing]);

    const sizeProperty = orientation === "vertical" ? "height" : "width";
    const collapsedSizeCss = toCssUnit(collapsedSize);

    const [contentSize, setContentSize] = useState(0);
    const [inlineSize, setInlineSize] = useState<string>(collapsedSizeCss);

    const mergedRef = useMergedRefs(wrapperRef, forwardedRef);

    useLayoutEffect(() => {
      const node = innerRef.current;
      if (!node) {
        return;
      }

      const update = () => {
        const next = getContentSize(node, orientation);
        setContentSize((prev) => (prev !== next ? next : prev));
      };

      update();

      if (typeof ResizeObserver === "undefined") {
        return;
      }

      const observer = new ResizeObserver(update);
      observer.observe(node);

      return () => observer.disconnect();
    }, [orientation, children]);

    useLayoutEffect(() => {
      if (!isMounted) {
        prevInRef.current = inProp;
        return;
      }

      const expanded = `${contentSize}px`;
      const wasOpen = prevInRef.current;
      const isOpening = !wasOpen && inProp;
      const isClosing = wasOpen && !inProp;
      const isStillOpen = wasOpen && inProp;

      if (isOpening) {
        setInlineSize(collapsedSizeCss);

        const frame = window.requestAnimationFrame(() => {
          setInlineSize(expanded);
        });

        prevInRef.current = inProp;

        return () => {
          window.cancelAnimationFrame(frame);
        };
      }

      if (isClosing) {
        setInlineSize(expanded);

        const frame = window.requestAnimationFrame(() => {
          setInlineSize(collapsedSizeCss);
        });

        prevInRef.current = inProp;

        return () => {
          window.cancelAnimationFrame(frame);
        };
      }

      if (isStillOpen) {
        if (inlineSize !== "auto") {
          setInlineSize(expanded);
        }
      } else {
        setInlineSize(collapsedSizeCss);
      }

      prevInRef.current = inProp;
    }, [collapsedSizeCss, contentSize, inProp, inlineSize, isMounted]);

    useLayoutEffect(() => {
      if (!isMounted || !inProp) {
        return;
      }

      if (isReducedMotion) {
        setInlineSize("auto");
        return;
      }

      const timer = window.setTimeout(() => {
        setInlineSize("auto");
      }, timeouts.enter);

      return () => {
        window.clearTimeout(timer);
      };
    }, [contentSize, inProp, isMounted, isReducedMotion, timeouts.enter]);

    if (!isMounted) {
      return null;
    }

    const currentDuration = isReducedMotion
      ? 0
      : inProp
        ? timeouts.enter
        : timeouts.exit;

    const currentEasing = inProp ? easingByMode.enter : easingByMode.exit;

    const wrapperStyle: CSSProperties = {
      overflow: inlineSize === "auto" ? "visible" : "hidden",
      transitionProperty: animateOpacity
        ? `${sizeProperty}, opacity`
        : sizeProperty,
      transitionDuration: `${currentDuration}ms`,
      transitionTimingFunction: currentEasing,
      willChange: animateOpacity ? `${sizeProperty}, opacity` : sizeProperty,
      [sizeProperty]: inlineSize,
    };

    if (animateOpacity) {
      wrapperStyle.opacity = inProp ? 1 : 0;
    }

    const innerStyle: CSSProperties =
      orientation === "horizontal"
        ? { display: "inline-block", width: "max-content" }
        : {};

    return (
      <div ref={mergedRef} style={wrapperStyle} aria-hidden={!inProp}>
        <div ref={innerRef} style={innerStyle}>
          {children}
        </div>
      </div>
    );
  },
);
