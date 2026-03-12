import { CSSProperties, ReactElement } from "react";

export type TransitionStatus =
  | "pre-enter"
  | "entering"
  | "entered"
  | "exiting"
  | "exited";

export type TransitionTimeout =
  | number
  | {
      appear?: number;
      enter?: number;
      exit?: number;
    };

export type TransitionEasing =
  | string
  | {
      appear?: string;
      enter?: string;
      exit?: string;
    };

export type TransitionLifecycleProps = {
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
};

export type BaseTransitionProps = TransitionLifecycleProps & {
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: TransitionTimeout;
  easing?: TransitionEasing;
  children: ReactElement;
};

export type FadeProps = BaseTransitionProps;

export type GrowProps = BaseTransitionProps & {
  origin?: CSSProperties["transformOrigin"];
};

export type ZoomProps = BaseTransitionProps & {
  origin?: CSSProperties["transformOrigin"];
};

export type SlideDirection = "up" | "down" | "left" | "right";

export type SlideProps = BaseTransitionProps & {
  direction?: SlideDirection;
  offset?: number | string;
};

export type CollapseOrientation = "vertical" | "horizontal";

export type CollapseProps = TransitionLifecycleProps & {
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: TransitionTimeout;
  easing?: TransitionEasing;
  collapsedSize?: number | string;
  orientation?: CollapseOrientation;
  children: ReactElement;
};
