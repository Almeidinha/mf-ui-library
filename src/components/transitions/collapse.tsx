import {
  CSSProperties,
  forwardRef,
  ReactElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CollapseProps } from "./types";
import { useTransitionState } from "./use-transition-state";
import {
  mergeRefs,
  normalizeEasing,
  normalizeTimeout,
  toCssUnit,
} from "./utils";

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
      children,
      onEnter,
      onEntered,
      onExit,
      onExited,
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    const { status, isMounted, isReducedMotion } = useTransitionState({
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
        return;
      }

      const expanded = `${contentSize}px`;

      if (status === "pre-enter") {
        setInlineSize(collapsedSizeCss);
        return;
      }

      if (status === "entering") {
        setInlineSize(expanded);
        return;
      }

      if (status === "entered") {
        setInlineSize("auto");
        return;
      }

      if (status === "exiting") {
        setInlineSize(expanded);
        requestAnimationFrame(() => {
          setInlineSize(collapsedSizeCss);
        });
        return;
      }

      if (status === "exited") {
        setInlineSize(collapsedSizeCss);
      }
    }, [collapsedSizeCss, contentSize, isMounted, status]);

    if (!isMounted) {
      return null;
    }

    const currentDuration = isReducedMotion
      ? 0
      : status === "exiting"
        ? timeouts.exit
        : timeouts.enter;

    const currentEasing =
      status === "exiting" ? easingByMode.exit : easingByMode.enter;

    const wrapperStyle: CSSProperties = {
      overflow: inlineSize === "auto" ? "visible" : "hidden",
      opacity: status === "entering" || status === "entered" ? 1 : 0,
      transitionProperty: `${sizeProperty}, opacity`,
      transitionDuration: `${currentDuration}ms`,
      transitionTimingFunction: currentEasing,
      willChange: `${sizeProperty}, opacity`,
      [sizeProperty]: inlineSize,
    };

    const innerStyle: CSSProperties =
      orientation === "horizontal"
        ? { display: "inline-block", width: "max-content" }
        : {};

    return (
      <div
        ref={mergeRefs(wrapperRef, forwardedRef)}
        style={wrapperStyle}
        aria-hidden={!inProp}
      >
        <div ref={innerRef} style={innerStyle}>
          {children}
        </div>
      </div>
    );
  },
);
