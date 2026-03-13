import { useMergedRefs } from "hooks/useMergedRefs";
import {
  CSSProperties,
  forwardRef,
  useCallback,
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

    const mergedRef = useMergedRefs(wrapperRef, forwardedRef);

    const setWrapperSize = useCallback(
      (value: string) => {
        const node = wrapperRef.current;
        if (!node) {
          return;
        }

        node.style[sizeProperty] = value;
      },
      [sizeProperty],
    );

    const setWrapperOverflow = useCallback(
      (value: CSSProperties["overflow"]) => {
        const node = wrapperRef.current;
        if (!node) {
          return;
        }

        node.style.overflow = value ?? "hidden";
      },
      [],
    );

    const setWrapperOpacity = useCallback(
      (value: string) => {
        const node = wrapperRef.current;
        if (!node || !animateOpacity) {
          return;
        }

        node.style.opacity = value;
      },
      [animateOpacity],
    );

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
        setWrapperOverflow("hidden");
        setWrapperSize(collapsedSizeCss);
        setWrapperOpacity("0");

        const frame = window.requestAnimationFrame(() => {
          setWrapperSize(expanded);
          setWrapperOpacity("1");
        });

        prevInRef.current = inProp;

        return () => {
          window.cancelAnimationFrame(frame);
        };
      }

      if (isClosing) {
        setWrapperOverflow("hidden");
        setWrapperSize(expanded);
        setWrapperOpacity("1");

        const frame = window.requestAnimationFrame(() => {
          setWrapperSize(collapsedSizeCss);
          setWrapperOpacity("0");
        });

        prevInRef.current = inProp;

        return () => {
          window.cancelAnimationFrame(frame);
        };
      }

      if (isStillOpen) {
        // Keep the open container in sync with content growth/shrink
        // without replaying the enter animation.
        if (wrapperRef.current?.style[sizeProperty] !== "auto") {
          setWrapperSize(expanded);
        }
        setWrapperOpacity("1");
      } else {
        setWrapperOverflow("hidden");
        setWrapperSize(collapsedSizeCss);
        setWrapperOpacity("0");
      }

      prevInRef.current = inProp;
    }, [
      collapsedSizeCss,
      contentSize,
      inProp,
      isMounted,
      setWrapperOpacity,
      setWrapperOverflow,
      setWrapperSize,
      sizeProperty,
    ]);

    useLayoutEffect(() => {
      if (!isMounted || !inProp) {
        return;
      }

      if (isReducedMotion) {
        setWrapperSize("auto");
        setWrapperOverflow("visible");
        setWrapperOpacity("1");
        return;
      }

      const timer = window.setTimeout(() => {
        setWrapperSize("auto");
        setWrapperOverflow("visible");
        setWrapperOpacity("1");
      }, timeouts.enter);

      return () => {
        window.clearTimeout(timer);
      };
    }, [
      contentSize,
      inProp,
      isMounted,
      isReducedMotion,
      setWrapperOpacity,
      setWrapperOverflow,
      setWrapperSize,
      timeouts.enter,
    ]);

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
      overflow: "hidden",
      transitionProperty: animateOpacity
        ? `${sizeProperty}, opacity`
        : sizeProperty,
      transitionDuration: `${currentDuration}ms`,
      transitionTimingFunction: currentEasing,
      willChange: animateOpacity ? `${sizeProperty}, opacity` : sizeProperty,
    };

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
