import { Margin } from "foundation/spacing";
import {
  BodyProps,
  LabelProps,
  TypographyStyles as FoundationTypographyStyles,
} from "foundation/typography";
import {
  ITransientTextAspectProps,
  TextAspectProps,
  TYPOGRAPHY_BLOCKED_PROPS,
} from "foundation/typography/text-aspect-flags";
import { FC, PropsWithChildren } from "helpers/generic-types";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";

export type ITextComponentProps = TextAspectProps & {
  emphasis?: boolean;
  as?: string;
} & HTMLAttributes<HTMLElement> &
  PropsWithChildren;

export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-large"
  | "body"
  | "caption"
  | "label"
  | "link";

type SharedTypographyProps = ITextComponentProps;
type BodyTypographyProps = ITextComponentProps & BodyProps;
type LabelTypographyProps = ITextComponentProps & LabelProps;

export type TypographyProps =
  | ({
      variant?: "display" | "h1" | "h2" | "h3" | "h4" | "caption";
    } & SharedTypographyProps)
  | ({ variant: "body" | "body-large" | "link" } & BodyTypographyProps)
  | ({ variant: "label" } & LabelTypographyProps);

type ITransientTextComponentProps = ITransientTextAspectProps & {
  $emphasis?: boolean;
} & HTMLAttributes<HTMLElement>;

function toTransientProps(
  props: ITextComponentProps,
): ITransientTextComponentProps {
  const { onCritical, onPrimary, emphasis, children, as, ...rest } = props;

  return {
    ...rest,
    $onCritical: onCritical,
    $onPrimary: onPrimary,
    $emphasis: emphasis,
    as,
  } as unknown as ITransientTextComponentProps;
}

export const DISPLAY = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Display};
`;

export const Display: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <DISPLAY {...toTransientProps(props)}>{children}</DISPLAY>;
};

export const HEADING1 = styled.h1.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Heading1};
  margin: ${Margin.none};
  margin-bottom: ${Margin.l};
`;

export const Heading1: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <HEADING1 {...toTransientProps(props)}>{children}</HEADING1>;
};

export const HEADING2 = styled.h2.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Heading2};
  margin: ${Margin.none};
  margin-bottom: ${Margin.m};
`;

export const Heading2: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <HEADING2 {...toTransientProps(props)}>{children}</HEADING2>;
};

export const HEADING3 = styled.h3.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Heading3};
  margin: ${Margin.none};
  margin-bottom: ${Margin.l};
`;

export const Heading3: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <HEADING3 {...toTransientProps(props)}>{children}</HEADING3>;
};

export const HEADING4 = styled.h4.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Heading4};
  margin: ${Margin.none};
  margin-bottom: ${Margin.m};
`;

export const Heading4: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <HEADING4 {...toTransientProps(props)}>{children}</HEADING4>;
};

export const BODY_LARGE = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${FoundationTypographyStyles.BodyLarge};
`;

export const BodyLarge: FC<ITextComponentProps & BodyProps> = ({
  children,
  ...props
}) => {
  return <BODY_LARGE {...toTransientProps(props)}>{children}</BODY_LARGE>;
};

export const BODY = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${FoundationTypographyStyles.Body};
`;

export const Body: FC<ITextComponentProps & BodyProps> = ({
  children,
  ...props
}) => {
  return <BODY {...toTransientProps(props)}>{children}</BODY>;
};

export const CAPTION = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${FoundationTypographyStyles.Caption};
`;

export const Caption: FC<ITextComponentProps> = ({ children, ...props }) => {
  return <CAPTION {...toTransientProps(props)}>{children}</CAPTION>;
};

export const LABEL = styled.label.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & LabelProps>`
  ${FoundationTypographyStyles.Label};
`;

export const Label: FC<ITextComponentProps & LabelProps> = ({
  children,
  ...props
}) => {
  return <LABEL {...toTransientProps(props)}>{children}</LABEL>;
};

export const LINK = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${FoundationTypographyStyles.Link};
`;

export const Link: FC<ITextComponentProps & BodyProps> = ({
  children,
  ...props
}) => {
  return <LINK {...toTransientProps(props)}>{children}</LINK>;
};

const VARIANT_STYLES_MAP: Record<
  TypographyVariant,
  React.ComponentType<ITextComponentProps>
> = {
  display: Display,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  "body-large": BodyLarge,
  body: Body,
  caption: Caption,
  label: Label,
  link: Link,
};

export const Typography: FC<TypographyProps> = ({
  variant = "body",
  children,
  ...props
}) => {
  const Component = VARIANT_STYLES_MAP[variant];

  return <Component {...props}>{children}</Component>;
};
