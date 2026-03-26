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

const FlagIcon = styled.i.attrs<{ $size: FlagSize; $code: CountryCodes }>(
  ({ $size, $code }) => ({
    style: {
      width: `${getWidthBySize($size)}px`,
      height: `${getHeightBySize($size)}px`,
      backgroundImage: `url(${getFlagAssetByCode($size)})`,
      backgroundSize: getSheetDimensionByCode($size),
      backgroundPosition: getPositionByCode($size, $code),
    },
  }),
)<{ $size: FlagSize; $code: CountryCodes }>`
  flex: none;
  order: 0;
  flex-grow: 0;
  position: relative;
  background-repeat: no-repeat;
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
      $size={getFlagSize(props)}
      $code={code}
    />
  );
};
