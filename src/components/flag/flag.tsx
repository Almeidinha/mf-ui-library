import { FC } from "@helpers";
import styled from "styled-components";

import {
  FlagProps,
  FlagSize,
  getFlagSize,
  getHeightBySize,
  getWidthBySize,
} from "./flag-size-flags";
import {
  getFlagAssetByCode,
  getPositionByCode,
  getSheetDimensionByCode,
} from "./helpers";
import { CountryCodes, IFlagProperties } from "./types";

export type FlagIconProps = IFlagProperties & FlagProps;

const FlagIcon = styled.i<{ size: FlagSize; code: CountryCodes }>`
  width: ${({ size }) => getWidthBySize(size)}px;
  height: ${({ size }) => getHeightBySize(size)}px;
  flex: none;
  order: 0;
  flex-grow: 0;
  position: relative;
  background-image: ${({ size }) => `url(${getFlagAssetByCode(size)})`};
  background-size: ${({ size }) => getSheetDimensionByCode(size)};
  background-repeat: no-repeat;
  background-position: ${({ size, code }) => getPositionByCode(size, code)};
`;

export const Flag: FC<FlagIconProps> = ({
  style,
  className,
  code,
  ...props
}) => {
  return (
    <FlagIcon
      role="img"
      className={className}
      style={style}
      size={getFlagSize(props)}
      code={code}
    />
  );
};
