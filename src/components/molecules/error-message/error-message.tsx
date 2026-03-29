import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Body } from "components/typography";
import { Icons, TextColors } from "foundation/colors";
import { Margin } from "foundation/spacing";
import React from "react";
import styled from "styled-components";

const ErrorMessageWrapper = styled(Flex)`
  margin: ${Margin.xxs} ${Margin.none} ${Margin.xxs};
  & path {
    fill: ${Icons.Critical};
  }
  div {
    margin-left: ${Margin.xs};
    color: ${TextColors.Critical};
  }
`;

export const ErrorMessage: React.FC<{
  message: string;
  className?: string;
}> = ({ message, className }) => {
  return (
    <ErrorMessageWrapper align="center" className={className}>
      <IconMinor.CircleExclamation />
      <Body>{message}</Body>
    </ErrorMessageWrapper>
  );
};
