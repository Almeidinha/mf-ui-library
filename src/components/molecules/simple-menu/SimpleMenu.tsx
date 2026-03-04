import { Button } from "components/molecules/button";
import { Gap, Margin, Padding } from "@foundations";
import { Card } from "components/card";
import { useOnClickOutside } from "hooks";
import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";

const grow = keyframes`
  from { transform: scale(.6) }
  to { transform: scale(1) }
`;

export const SimpleMenu = styled(Card).attrs({ role: "menu" })`
  section {
    padding: ${Padding.xxs};
    display: flex;
    flex-direction: column;
    gap: ${Gap.xxxs};
  }
  position: absolute;
  z-index: 1;
  top: calc(100% + 4px);
  right: 0;
  width: 240px;
  will-change: transform;
  transform-origin: top right;
  animation: ${grow} 0.12s ease-out;

  ul {
    margin: ${Margin.none};
    padding: ${Padding.none};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SimpleMenuItem = styled(Button).attrs({
  type: "button",
  role: "menuitem",
  large: true,
})<{
  destructive?: boolean;
}>`
  padding: ${Padding.s};
  border: none;
  width: 100%;
  justify-content: flex-start;
  border-radius: 6px;
  box-sizing: border-box;
`;

type UseSimpleMenuStateOptions = {
  closeOnItemSelect?: boolean;
};

export function useSimpleMenuState(options?: UseSimpleMenuStateOptions) {
  const { closeOnItemSelect = false } = options ?? {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const onItemSelect = useCallback(() => {
    if (closeOnItemSelect) {
      setIsOpen(false);
    }
  }, [closeOnItemSelect]);

  const withItemAction = useCallback(
    <T extends (...args: unknown[]) => void>(callback?: T) =>
      (...args: Parameters<T>) => {
        callback?.(...args);
        if (closeOnItemSelect) {
          setIsOpen(false);
        }
      },
    [closeOnItemSelect],
  );

  const ref = useOnClickOutside(() => {
    setIsOpen((prev) => (prev ? false : prev));
  });

  return {
    isOpen,
    toggle,
    open,
    close,
    onItemSelect,
    withItemAction,
    clickOutsideRef: ref,
  };
}
