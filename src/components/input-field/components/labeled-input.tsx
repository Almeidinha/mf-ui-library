import { Margin } from "@foundations";
import { FC, If, PropsWithChildren, safeArray } from "@helpers";
import { ErrorMessage } from "components/molecules/error-message";
import { Body, Label } from "components/typography";
import styled from "styled-components";

const HTMLLabel = styled.div`
  all: unset;
`;

const LabelText = styled(Label)`
  margin-bottom: ${Margin.xxs};
`;

const HelpText = styled(Body)`
  margin: ${Margin.xxs} ${Margin.none};
`;

interface ILabeledInputProps extends PropsWithChildren {
  label?: string;
  helpText?: string;
  errors?: { message: string }[];
  className?: string;
  htmlFor?: string;
}

export const LabeledInput: FC<ILabeledInputProps> = (props) => {
  const { label, helpText, errors, className, htmlFor } = props;

  return (
    <HTMLLabel className={className}>
      <label htmlFor={htmlFor}>
        <If is={label}>
          <LabelText>{label}</LabelText>
        </If>
        {props.children}
      </label>
      {safeArray(errors).map((e) => (
        <ErrorMessage key={e.message} message={e.message} />
      ))}
      <If is={helpText}>
        <HelpText subdued>{helpText}</HelpText>
      </If>
    </HTMLLabel>
  );
};
