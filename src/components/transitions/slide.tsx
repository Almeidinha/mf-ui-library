import { forwardRef } from "react";

import { Transition } from "./transition";
import { SlideProps } from "./types";
import { getSlideTransform } from "./utils";

export const Slide = forwardRef<HTMLElement, SlideProps>(
  function Slide(props, ref) {
    const { direction = "down", offset = 8, ...rest } = props;

    return (
      <Transition
        ref={ref}
        {...rest}
        getStyles={({ status }) => ({
          opacity: status === "entering" || status === "entered" ? 1 : 0,
          transform:
            status === "entering" || status === "entered"
              ? "translate(0, 0)"
              : getSlideTransform(direction, offset),
        })}
        transitionProperty="opacity, transform"
      />
    );
  },
);
