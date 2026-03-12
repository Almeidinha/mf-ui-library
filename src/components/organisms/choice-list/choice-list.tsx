import { Flex } from "components/layout";
import { RadioButton as RadioButtonBase } from "components/radio-button";
import { Gap, Padding } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { defaultTo } from "helpers/safe-navigation";
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

const RadioGroup = ({
  options,
  name,
  selected,
  handleChange,
}: IRadioGroupProps) => {
  return (
    <>
      {options.map((option: IRadioOption, index: number) => {
        const shortenedOptionLabel = defaultTo(name, "").replace(/\s+/g, "");
        const optionId = `radio-option-${index}-${shortenedOptionLabel}`;

        return (
          <RadioButton
            value={option.value}
            label={option.label}
            key={optionId}
            id={optionId}
            name={name}
            disabled={option.disabled}
            checked={option.value === selected}
            onChange={handleChange}
          />
        );
      })}
    </>
  );
};

export const ChoiceList: FC<IOptionGroup> = ({
  options,
  selected,
  name,
  className,
  direction = "vertical",
  onChange,
}: IOptionGroup) => {
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
