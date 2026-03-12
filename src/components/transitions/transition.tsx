import { useMergedRefs } from "hooks/useMergedRefs";
import {
  cloneElement,
  CSSProperties,
  forwardRef,
  ReactElement,
  Ref,
} from "react";

import { BaseTransitionProps, TransitionStatus } from "./types";
import { useTransitionState } from "./use-transition-state";
import { mergeStyles, normalizeEasing } from "./utils";

type StyleResolverArgs = {
  status: TransitionStatus;
};

type TransitionProps = BaseTransitionProps & {
  getStyles: (args: StyleResolverArgs) => CSSProperties;
  transitionProperty?: string;
};

type TransitionChildProps = {
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
};

function getCurrentEasing(
  status: TransitionStatus,
  easing: ReturnType<typeof normalizeEasing>,
) {
  return status === "exiting" || status === "exited"
    ? easing.exit
    : easing.enter;
}

export const Transition = forwardRef<HTMLElement, TransitionProps>(
  function Transition(props, forwardedRef) {
    const {
      in: inProp = false,
      appear = true,
      enter = true,
      exit = true,
      mountOnEnter = false,
      unmountOnExit = false,
      timeout = 200,
      easing = "ease-in-out",
      children,
      onEnter,
      onEntered,
      onExit,
      onExited,
      getStyles,
      transitionProperty = "opacity, transform",
    } = props;

    const { status, isMounted, isReducedMotion, currentDuration } =
      useTransitionState({
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

    const child = children as ReactElement<TransitionChildProps>;

    const mergedRef = useMergedRefs(child.props.ref, forwardedRef);

    if (!isMounted) {
      return null;
    }

    const easingByMode = normalizeEasing(easing);

    const baseTransitionStyle: CSSProperties = {
      transitionProperty,
      transitionDuration: `${currentDuration}ms`,
      transitionTimingFunction: getCurrentEasing(status, easingByMode),
      willChange: transitionProperty,
    };

    const phaseStyles = getStyles({ status });

    const visibilityStyle: CSSProperties =
      status === "exited" && !unmountOnExit
        ? {
            pointerEvents: "none",
            visibility: "hidden",
          }
        : {};

    const reducedMotionStyle: CSSProperties = isReducedMotion
      ? { transitionDuration: "0ms" }
      : {};

    return cloneElement<TransitionChildProps>(child, {
      ref: mergedRef,
      style: mergeStyles(
        child.props.style,
        baseTransitionStyle,
        phaseStyles,
        visibilityStyle,
        reducedMotionStyle,
      ),
    });
  },
);
