import { Gap, Padding } from "@foundations";
import { defaultTo, FC } from "@helpers";
import { Flex } from "components/layout";
import { RadioButton as RadioButtonBase } from "components/radio-button";
import React from "react";
import styled from "styled-components";

export interface IRadioOption {
  value: string;
  disabled?: boolean;
  label: string | React.ReactNode;
  [key: string]: unknown;
}

const Container = styled(Flex)`
  padding: ${Padding.s};
`;

const RadioButton = styled(RadioButtonBase)``;

export interface IOptionGroup {
  selected: unknown;
  direction?: "horizontal" | "vertical";
  className?: string;
  options: IRadioOption[];
  onChange: (value: string) => void;
  name?: string;
}

interface IRadioGroupProps {
  options: IRadioOption[];
  selected: unknown;
  name?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = (props: IRadioGroupProps) => {
  return (
    <>
      {props.options.map((option: IRadioOption, index: number) => {
        const shortenedOptionLabel = defaultTo(props.name, "").replace(
          /\s+/g,
          "",
        );
        const optionId = `radio-option-${index}-${shortenedOptionLabel}`;

        return (
          <RadioButton
            value={option.value}
            label={option.label}
            key={optionId}
            id={optionId}
            name={props.name}
            disabled={option.disabled}
            checked={option.value === props.selected}
            onChange={props.handleChange}
          />
        );
      })}
    </>
  );
};

export const ChoiceList: FC<IOptionGroup> = (props: IOptionGroup) => {
  const {
    options,
    selected,
    name,
    className,
    direction = "vertical",
    onChange,
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Container
      gap={Gap.s}
      column={direction === "vertical"}
      className={className}
    >
      <RadioGroup
        options={options}
        selected={selected}
        name={name}
        handleChange={handleChange}
      />
    </Container>
  );
};
