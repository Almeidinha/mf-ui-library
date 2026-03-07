import { Flex } from "components/layout";
import { Label } from "components/typography";
import { Surface, Text } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { is } from "helpers/safe-navigation";
import { HTMLAttributes } from "react";
import styled from "styled-components";

const LabelFrame = styled(Flex)<{
  $disabled: boolean;
  $closable: boolean;
}>`
  background: ${(props) =>
    props.$disabled ? Surface.Neutral.Subdued : Surface.Neutral.Default};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${Padding.xxxs} ${Padding.xs} ${Padding.xxxs} ${Padding.xs};
  width: 100%;
  border-radius: ${(props) => (props.$closable ? "4px 0px 0px 4px" : "4px")};
  word-break: break-all;
  ${Typography.Body}
`;

const LabelText = styled(Label)<{
  $disabled: boolean;
}>`
  color: ${(props) => (props.$disabled ? Text.Light : Text.Default)};
`;

interface IProps extends HTMLAttributes<HTMLLabelElement>, PropsWithChildren {
  closable?: boolean;
  disabled?: boolean;
}

export const TagLabel: FC<IProps> = (props) => {
  const disabled = is(props.disabled);
  const closable = is(props.closable);

  return (
    <LabelFrame $disabled={disabled} $closable={closable}>
      <LabelText $disabled={disabled}>{props.children}</LabelText>
    </LabelFrame>
  );
};
