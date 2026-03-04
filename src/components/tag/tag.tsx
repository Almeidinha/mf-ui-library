import { Padding } from "@foundations";
import { FC, If } from "@helpers";
import { Flex } from "components/layout";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";

import { CloseButton, TagLabel } from "./components";

const TagFrame = styled(Flex)`
  display: inline-flex;
  flex-direction: row;
  align-items: stretch;
  padding: ${Padding.none};
`;

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  closable?: boolean;
  disabled?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tag: FC<TagProps> = ({
  disabled,
  closable,
  onClose,
  onClick,
  ...domProps
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClose?.(e);
  };

  return (
    <TagFrame
      {...domProps}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
    >
      <TagLabel disabled={disabled} closable={closable}>
        {domProps.children}
      </TagLabel>

      <If is={closable}>
        <CloseButton
          disabled={disabled}
          onClick={handleClose}
          ariaLabel="Remove tag"
        />
      </If>
    </TagFrame>
  );
};
