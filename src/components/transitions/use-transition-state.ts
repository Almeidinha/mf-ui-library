import { useEffect, useMemo, useRef, useState } from "react";

import { BaseTransitionProps, TransitionStatus } from "./types";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { normalizeTimeout } from "./utils";

type UseTransitionStateArgs = Pick<
  BaseTransitionProps,
  | "in"
  | "appear"
  | "enter"
  | "exit"
  | "mountOnEnter"
  | "unmountOnExit"
  | "timeout"
  | "onEnter"
  | "onEntered"
  | "onExit"
  | "onExited"
>;

type UseTransitionStateResult = {
  status: TransitionStatus;
  isMounted: boolean;
  currentDuration: number;
  isReducedMotion: boolean;
};

export function useTransitionState(
  args: UseTransitionStateArgs,
): UseTransitionStateResult {
  const {
    in: inProp = false,
    appear = true,
    enter = true,
    exit = true,
    mountOnEnter = false,
    unmountOnExit = false,
    timeout = 200,
    onEnter,
    onEntered,
    onExit,
    onExited,
  } = args;

  const prefersReducedMotion = usePrefersReducedMotion();
  const timeouts = useMemo(() => normalizeTimeout(timeout), [timeout]);

  const enterTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isFirstRenderRef = useRef(true);

  const [isMounted, setIsMounted] = useState(() => inProp || !mountOnEnter);

  const [status, setStatus] = useState<TransitionStatus>(() => {
    if (inProp) {
      if (appear) {
        return "pre-enter";
      }
      return "entered";
    }

    return "exited";
  });

  useEffect(() => {
    return () => {
      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current);
      }
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const isFirstRender = isFirstRenderRef.current;
    const enterDuration = prefersReducedMotion
      ? 0
      : isFirstRender && appear
        ? timeouts.appear
        : timeouts.enter;
    const exitDuration = prefersReducedMotion ? 0 : timeouts.exit;

    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (inProp) {
      if (!isMounted) {
        setIsMounted(true);
      }

      if (!enter) {
        setStatus("entered");
        onEnter?.();
        onEntered?.();
        isFirstRenderRef.current = false;
        return;
      }

      if (status === "entered" || status === "entering") {
        isFirstRenderRef.current = false;
        return;
      }

      onEnter?.();
      setStatus("pre-enter");

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = window.requestAnimationFrame(() => {
          setStatus("entering");

          if (enterDuration === 0) {
            setStatus("entered");
            onEntered?.();
            return;
          }

          enterTimerRef.current = window.setTimeout(() => {
            setStatus("entered");
            onEntered?.();
          }, enterDuration);
        });
      });

      isFirstRenderRef.current = false;
      return;
    }

    if (!exit) {
      onExit?.();
      setStatus("exited");
      onExited?.();
      if (unmountOnExit) {
        setIsMounted(false);
      }
      isFirstRenderRef.current = false;
      return;
    }

    if (status === "exited" || status === "exiting") {
      if (status === "exited" && unmountOnExit) {
        setIsMounted(false);
      }
      isFirstRenderRef.current = false;
      return;
    }

    onExit?.();
    setStatus("exiting");

    if (exitDuration === 0) {
      setStatus("exited");
      onExited?.();
      if (unmountOnExit) {
        setIsMounted(false);
      }
      isFirstRenderRef.current = false;
      return;
    }

    exitTimerRef.current = window.setTimeout(() => {
      setStatus("exited");
      onExited?.();
      if (unmountOnExit) {
        setIsMounted(false);
      }
    }, exitDuration);

    isFirstRenderRef.current = false;
  }, [
    appear,
    enter,
    exit,
    inProp,
    isMounted,
    onEnter,
    onEntered,
    onExit,
    onExited,
    prefersReducedMotion,
    status,
    timeouts.appear,
    timeouts.enter,
    timeouts.exit,
    unmountOnExit,
  ]);

  const currentDuration =
    status === "exiting"
      ? prefersReducedMotion
        ? 0
        : timeouts.exit
      : prefersReducedMotion
        ? 0
        : isFirstRenderRef.current && appear
          ? timeouts.appear
          : timeouts.enter;

  return {
    status,
    isMounted,
    currentDuration,
    isReducedMotion: prefersReducedMotion,
  };
}
