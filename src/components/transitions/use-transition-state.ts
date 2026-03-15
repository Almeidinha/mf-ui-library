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
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  const firstRenderRef = useRef(true);
  const runIdRef = useRef(0);
  const prevInRef = useRef(inProp);

  const [hasExited, setHasExited] = useState(() => !inProp);
  const [status, setStatus] = useState<TransitionStatus>(() => {
    if (inProp) {
      return appear ? "pre-enter" : "entered";
    }

    return "exited";
  });

  const isMounted = inProp || !hasExited || !mountOnEnter;

  const clearEnterScheduled = () => {
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    if (raf1Ref.current !== null) {
      window.cancelAnimationFrame(raf1Ref.current);
      raf1Ref.current = null;
    }

    if (raf2Ref.current !== null) {
      window.cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;
    }
  };

  const clearExitScheduled = () => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearEnterScheduled();
      clearExitScheduled();
      runIdRef.current += 1;
    };
  }, []);

  useEffect(() => {
    const prevIn = prevInRef.current;
    const inChanged = prevIn !== inProp;
    const isFirstRender = firstRenderRef.current;

    if (!inChanged && !isFirstRender) {
      return;
    }

    runIdRef.current += 1;
    const currentRun = runIdRef.current;

    const enterDuration = prefersReducedMotion
      ? 0
      : isFirstRender && appear
        ? timeouts.appear
        : timeouts.enter;

    const exitDuration = prefersReducedMotion ? 0 : timeouts.exit;

    if (inProp) {
      clearExitScheduled();

      if (!enter) {
        clearEnterScheduled();

        raf1Ref.current = window.requestAnimationFrame(() => {
          if (runIdRef.current !== currentRun) {
            return;
          }

          setStatus("entered");
          onEnter?.();
          onEntered?.();
        });

        firstRenderRef.current = false;
        prevInRef.current = inProp;
        return;
      }

      onEnter?.();
      clearEnterScheduled();

      raf1Ref.current = window.requestAnimationFrame(() => {
        if (runIdRef.current !== currentRun) {
          return;
        }

        raf2Ref.current = window.requestAnimationFrame(() => {
          if (runIdRef.current !== currentRun) {
            return;
          }

          setStatus("entering");

          if (enterDuration === 0) {
            setStatus("entered");
            onEntered?.();
            return;
          }

          enterTimerRef.current = window.setTimeout(() => {
            if (runIdRef.current !== currentRun) {
              return;
            }

            setStatus("entered");
            onEntered?.();
          }, enterDuration);
        });
      });

      firstRenderRef.current = false;
      prevInRef.current = inProp;
      return;
    }

    clearEnterScheduled();

    if (!exit) {
      clearExitScheduled();

      raf1Ref.current = window.requestAnimationFrame(() => {
        if (runIdRef.current !== currentRun) {
          return;
        }

        onExit?.();
        setStatus("exited");
        onExited?.();

        if (unmountOnExit) {
          setHasExited(true);
        }
      });

      firstRenderRef.current = false;
      prevInRef.current = inProp;
      return;
    }

    onExit?.();

    raf1Ref.current = window.requestAnimationFrame(() => {
      if (runIdRef.current !== currentRun) {
        return;
      }

      setStatus("exiting");

      if (exitDuration === 0) {
        setStatus("exited");
        onExited?.();

        if (unmountOnExit) {
          setHasExited(true);
        }
        return;
      }

      clearExitScheduled();

      exitTimerRef.current = window.setTimeout(() => {
        if (runIdRef.current !== currentRun) {
          return;
        }

        setStatus("exited");
        onExited?.();

        if (unmountOnExit) {
          setHasExited(true);
        }
      }, exitDuration);
    });

    firstRenderRef.current = false;
    prevInRef.current = inProp;
  }, [
    appear,
    enter,
    exit,
    inProp,
    mountOnEnter,
    onEnter,
    onEntered,
    onExit,
    onExited,
    prefersReducedMotion,
    timeouts.appear,
    timeouts.enter,
    timeouts.exit,
    unmountOnExit,
  ]);

  const currentDuration = prefersReducedMotion
    ? 0
    : status === "exiting"
      ? timeouts.exit
      : timeouts.enter;

  return {
    status,
    isMounted,
    currentDuration,
    isReducedMotion: prefersReducedMotion,
  };
}
