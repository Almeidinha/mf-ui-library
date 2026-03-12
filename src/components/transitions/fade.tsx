import { forwardRef } from "react";

import { Transition } from "./transition";
import { FadeProps } from "./types";

export const Fade = forwardRef<HTMLElement, FadeProps>(
  function Fade(props, ref) {
    return (
      <Transition
        ref={ref}
        {...props}
        getStyles={({ status }) => ({
          opacity: status === "entering" || status === "entered" ? 1 : 0,
        })}
        transitionProperty="opacity"
      />
    );
  },
);
