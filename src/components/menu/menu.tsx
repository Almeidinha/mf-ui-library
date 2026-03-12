import { If } from "@helpers";
import { IOption } from "components/select";
import { defaultGetOptionKey } from "components/select/utils";
import React, { useMemo, useRef } from "react";
import styled from "styled-components";

import { Placement } from "./portal-position";
import { PortalMenu } from "./PortalMenu";

type MenuItem = {
  onItemSelect?: () => void;
} & IOption<unknown>;

export interface IMenuPros {
  items: MenuItem[];
  open: boolean;
  placement?: Placement;
  getOptionKey?: (value: unknown) => string;
  anchorRef?: React.RefObject<HTMLElement | null>;
  onSelect?: (item: MenuItem) => void;
  width?: number;
}

const AnchorRef = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
`;

export const Menu = ({
  getOptionKey = defaultGetOptionKey,
  anchorRef,
  items,
  open,
  placement,
  onSelect,
  width,
}: IMenuPros) => {
  const internalAnchorRef = useRef<HTMLSpanElement | null>(null);

  const resolvedAnchorRef = useMemo(
    () =>
      anchorRef ?? (internalAnchorRef as React.RefObject<HTMLElement | null>),
    [anchorRef],
  );

  return (
    <>
      <If is={!anchorRef}>
        <AnchorRef ref={internalAnchorRef} />
      </If>
      <PortalMenu
        items={items}
        open={open}
        width={width}
        getOptionKey={getOptionKey}
        anchorRef={resolvedAnchorRef}
        placement={placement}
        onSelect={onSelect}
      />
    </>
  );
};
