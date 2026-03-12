import { forwardRef } from "react";

import { Transition } from "./transition";
import { GrowProps } from "./types";

export const Grow = forwardRef<HTMLElement, GrowProps>(
  function Grow(props, ref) {
    const { origin = "top center", ...rest } = props;

    return (
      <Transition
        ref={ref}
        {...rest}
        getStyles={({ status }) => ({
          opacity: status === "entering" || status === "entered" ? 1 : 0,
          transform:
            status === "entering" || status === "entered"
              ? "scale(1)"
              : "scale(0.75)",
          transformOrigin: origin,
        })}
        transitionProperty="opacity, transform"
      />
    );
  },
);
