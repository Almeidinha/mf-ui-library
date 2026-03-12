import { forwardRef } from "react";

import { Transition } from "./transition";
import { ZoomProps } from "./types";

export const Zoom = forwardRef<HTMLElement, ZoomProps>(
  function Zoom(props, ref) {
    const { origin = "center", ...rest } = props;

    return (
      <Transition
        ref={ref}
        {...rest}
        getStyles={({ status }) => ({
          opacity: status === "entering" || status === "entered" ? 1 : 0,
          transform:
            status === "entering" || status === "entered"
              ? "scale(1)"
              : "scale(0.5)",
          transformOrigin: origin,
        })}
        transitionProperty="opacity, transform"
      />
    );
  },
);
