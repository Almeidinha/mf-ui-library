import { is } from "@helpers";
import { Interactive } from "foundation/colors";
import { css } from "styled-components";

import {
  FontSize,
  FontSizeMobile,
  FontWeight,
  LineHeight,
  LineHeightMobile,
} from "./constants";
import { InterFontFace } from "./fonts";
import { getTextAspect, ITransientTextAspectProps } from "./text-aspect-flags";

export type ILabelProps = ITransientTextAspectProps & {
  default?: boolean;
  subtle?: boolean;
  strong?: boolean;
};

export type IBodyProps = ITransientTextAspectProps & {
  default?: boolean;
  strong?: boolean;
};

const LightText = css`
  color: ${getTextAspect({ light: true })};
`;

const Base = css<ITransientTextAspectProps>`
  color: ${(props) => getTextAspect(props)};
  ${InterFontFace}
  font-family: 'Inter';
`;

const Display = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.Regular};
  font-size: ${FontSizeMobile.g};
  line-height: ${LineHeightMobile.f};

  @media (min-width: 1039px) {
    font-size: ${FontSize.g};
    line-height: ${LineHeight.f};
  }
`;

const Heading1 = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSizeMobile.f};
  line-height: ${LineHeightMobile.e};

  @media (min-width: 1039px) {
    font-size: ${FontSize.f};
    line-height: ${LineHeight.e};
  }
`;

const Heading2 = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSizeMobile.e};
  line-height: ${LineHeightMobile.d};

  @media (min-width: 1039px) {
    font-size: ${FontSize.e};
    line-height: ${LineHeight.d};
  }
`;

const Heading3 = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSize.c};
  line-height: ${LineHeight.c};
`;

const Heading4 = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.SemiBold};
  font-size: ${FontSize.b};
  line-height: ${LineHeight.b};
`;

const Body = css<IBodyProps>`
  ${Base}
  font-weight: ${({ strong }) =>
    is(strong) ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSize.b};
  line-height: ${LineHeight.b};
`;

const BodyLarge = css<IBodyProps>`
  ${Base}
  font-weight: ${({ strong }) =>
    is(strong) ? FontWeight.SemiBold : FontWeight.Regular};
  font-size: ${FontSizeMobile.d};
  line-height: ${LineHeightMobile.d};

  @media (min-width: 1039px) {
    font-size: ${FontSize.d};
    line-height: ${LineHeight.d};
  }
`;

const Caption = css<ITransientTextAspectProps>`
  ${Base}
  font-weight: ${FontWeight.Regular};
  font-size: ${FontSize.a};
  line-height: ${LineHeight.a};
`;

const Label = css<ILabelProps>`
  ${Base}
  font-weight:  ${({ strong }) =>
    is(strong) ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${({ subtle }) => (is(subtle) ? FontSize.a : FontSize.b)};
  line-height: ${({ subtle }) => (is(subtle) ? LineHeight.a : LineHeight.b)};
`;

const Link = css<IBodyProps>`
  ${Base}
  font-weight: ${({ strong }) =>
    is(strong) ? FontWeight.Medium : FontWeight.Regular};
  font-size: ${FontSize.b};
  line-height: ${LineHeight.b};
  color: ${Interactive.Default.Default};

  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${Interactive.Default.Hover};
  }
  &:focus {
    outline: none;
    text-decoration: underline;
  }
  &:visited {
    color: ${Interactive.Default.Pressed};
  }
  &:active {
    opacity: 0.8;
  }
`;

export const Typography = {
  Display,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Body,
  BodyLarge,
  Caption,
  LightText,
  Label,
  Link,
};
