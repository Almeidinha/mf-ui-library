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

export const Menu = (props: IMenuPros) => {
  const getOptionKey = props.getOptionKey ?? defaultGetOptionKey;
  const internalAnchorRef = useRef<HTMLSpanElement | null>(null);

  const resolvedAnchorRef = useMemo(
    () =>
      props.anchorRef ??
      (internalAnchorRef as React.RefObject<HTMLElement | null>),
    [props.anchorRef],
  );

  return (
    <>
      <If is={!props.anchorRef}>
        <AnchorRef ref={internalAnchorRef} />
      </If>
      <PortalMenu
        items={props.items}
        open={props.open}
        width={props.width}
        getOptionKey={getOptionKey}
        anchorRef={resolvedAnchorRef}
        placement={props.placement}
        onSelect={props.onSelect}
      />
    </>
  );
};
