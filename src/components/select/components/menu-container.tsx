import { Borders, Surface } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { forwardRef } from "react";
import styled from "styled-components";

import { IMenuContainerProps, menuPositionType } from "../types";
import { topPosition } from "../utils";

interface IMenuWrapperProps {
  $label?: IMenuContainerProps["label"];
  $menuHeight?: IMenuContainerProps["menuHeight"];
  $menuPosition?: IMenuContainerProps["menuPosition"];
  $labelPosition?: IMenuContainerProps["labelPosition"];
  $invalid?: boolean;
  $disableInlinePosition?: boolean;
}

const MenuWrapper = styled.div<IMenuWrapperProps>`
  z-index: 1;
  position: relative;
  background: ${Surface.Default.Default};
  top: ${({ $disableInlinePosition, ...props }) =>
    $disableInlinePosition
      ? "auto"
      : topPosition({
          menuPosition: props.$menuPosition,
          menuHeight: props.$menuHeight,
          label: props.$label,
          labelPosition: props.$labelPosition,
        })};
  box-sizing: border-box;

  .menu-list {
    box-sizing: border-box;
    box-shadow: ${({ $menuPosition }) =>
      $menuPosition === menuPositionType.BOTTOM
        ? "0px 2px 10px 0px rgba(0, 0, 0, 0.10)"
        : "0px -2px 10px 0px rgba(0, 0, 0, 0.10)"};
    border: 1px solid ${Borders.Default.Subdued};
    background-color: ${Surface.Default.Default};
    border-radius: 6px;
    padding: ${Padding.xxs};

    &:focus {
      outline: none;
    }

    ::-webkit-scrollbar {
      width: 10px;
      height: 0;
    }

    ::-webkit-scrollbar-thumb {
      min-height: 50px;
      border: 2px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 1em;
      background-color: ${Surface.Neutral.Default};
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
`;

export const MenuContainer = forwardRef<HTMLDivElement, IMenuContainerProps>(
  function MenuContainer(
    {
      onClick,
      children,
      label,
      menuHeight,
      menuPosition,
      labelPosition,
      invalid,
      className,
      style,
      disableInlinePosition,
      ...rest
    },
    ref,
  ) {
    const composeClassName = ["select-menu", className]
      .filter(Boolean)
      .join(" ");

    return (
      <MenuWrapper
        ref={ref}
        $label={label}
        $menuHeight={menuHeight}
        $menuPosition={menuPosition}
        $labelPosition={labelPosition}
        $invalid={invalid}
        $disableInlinePosition={disableInlinePosition}
        data-role="menu"
        className={composeClassName}
        onClick={onClick}
        style={style}
        {...rest}
      >
        {children}
      </MenuWrapper>
    );
  },
);
