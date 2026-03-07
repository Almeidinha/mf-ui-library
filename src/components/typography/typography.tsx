import { Margin } from "foundation/spacing";
import { BodyProps, LabelProps, Typography } from "foundation/typography";
import {
  ITransientTextAspectProps,
  TextAspectProps,
  TYPOGRAPHY_BLOCKED_PROPS,
} from "foundation/typography/text-aspect-flags";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { HTMLAttributes } from "react";
import styled from "styled-components";

export type ITextComponentProps = TextAspectProps & {
  emphasis?: boolean;
  as?: string;
} & HTMLAttributes<HTMLElement> &
  PropsWithChildren;
type ITransientTextComponentProps = ITransientTextAspectProps & {
  $emphasis?: boolean;
} & HTMLAttributes<HTMLElement>;

function toTransientProps(
  props: ITextComponentProps,
): ITransientTextComponentProps {
  // eslint-disable-next-line no-unused-vars
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
  ${Typography.Display};
`;

export const Display: FC<ITextComponentProps> = (props) => {
  return <DISPLAY {...toTransientProps(props)}>{props.children}</DISPLAY>;
};

export const HEADING1 = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${Typography.Heading1};
  margin: ${Margin.none};
  margin-bottom: ${Margin.l};
`;

export const Heading1: FC<ITextComponentProps> = (props) => {
  return <HEADING1 {...toTransientProps(props)}>{props.children}</HEADING1>;
};

export const HEADING2 = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${Typography.Heading2};
  margin: ${Margin.none};
  margin-bottom: ${Margin.m};
`;

export const Heading2: FC<ITextComponentProps> = (props) => {
  return <HEADING2 {...toTransientProps(props)}>{props.children}</HEADING2>;
};

export const HEADING3 = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${Typography.Heading3};
  margin: ${Margin.none};
  margin-bottom: ${Margin.l};
`;

export const Heading3: FC<ITextComponentProps> = (props) => {
  return <HEADING3 {...toTransientProps(props)}>{props.children}</HEADING3>;
};

export const HEADING4 = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${Typography.Heading4};
  margin: ${Margin.none};
  margin-bottom: ${Margin.m};
`;

export const Heading4: FC<ITextComponentProps> = (props) => {
  return <HEADING4 {...toTransientProps(props)}>{props.children}</HEADING4>;
};

export const BODY_LARGE = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${Typography.BodyLarge};
`;

export const BodyLarge: FC<ITextComponentProps & BodyProps> = (props) => {
  return <BODY_LARGE {...toTransientProps(props)}>{props.children}</BODY_LARGE>;
};

export const BODY = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${Typography.Body};
`;

export const Body: FC<ITextComponentProps & BodyProps> = (props) => {
  return <BODY {...toTransientProps(props)}>{props.children}</BODY>;
};

export const CAPTION = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps>`
  ${Typography.Caption};
`;

export const Caption: FC<ITextComponentProps> = (props) => {
  return <CAPTION {...toTransientProps(props)}>{props.children}</CAPTION>;
};

export const LABEL = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & LabelProps>`
  ${Typography.Label};
`;

export const Label: FC<ITextComponentProps & LabelProps> = (props) => {
  return <LABEL {...toTransientProps(props)}>{props.children}</LABEL>;
};

export const LINK = styled.div.withConfig({
  shouldForwardProp: (prop) => !TYPOGRAPHY_BLOCKED_PROPS.has(prop),
})<ITransientTextComponentProps & BodyProps>`
  ${Typography.Link};
`;

export const Link: FC<ITextComponentProps & BodyProps> = (props) => {
  return <LINK {...toTransientProps(props)}>{props.children}</LINK>;
};
