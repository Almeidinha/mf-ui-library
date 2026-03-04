import { Gap, Margin } from "@foundations";
import { FC, If, isDefined, isEmpty, Nothing } from "@helpers";
import { Flex } from "components/layout";
import { ErrorMessage } from "components/molecules";
import { InputCheckbox } from "components/molecules/input-checkbox";
import { Label } from "components/typography";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

const HelpMessage = styled(Label)`
  margin-top: ${Margin.xxs};
  margin-left: ${Margin.xl};
  user-select: none;
`;

const Group = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: ${Gap.m};
  padding: ${Margin.s};
`;

export type MultiChoiceOption = {
  value: string;
  label: string;
  helpMessage?: string;
  disabled?: boolean;
  id?: string;
};

type BaseMultiChoiceListProps = {
  options: MultiChoiceOption[];
  className?: string;
  errorMessage?: string;
  name?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

type ControlledProps = {
  value: string[];
  onChange: (next: string[]) => void;
  defaultValue?: never;
};

type UncontrolledProps = {
  defaultValue?: string[];
  value?: never;
  onChange?: (next: string[]) => void; // optional listener
};

export type MultiChoiceListProps = BaseMultiChoiceListProps &
  (ControlledProps | UncontrolledProps);

export const MultiChoiceList: FC<MultiChoiceListProps> = ({
  options,
  className = "",
  errorMessage,
  value,
  onChange,
  defaultValue,
  name,
  ...a11y
}) => {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(() => defaultValue ?? []);

  const selected = value ?? internal;
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggleValue = useCallback(
    (optValue: string) => {
      const next = selectedSet.has(optValue)
        ? selected.filter((v) => v !== optValue)
        : [...selected, optValue];

      if (!controlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [controlled, onChange, selected, selectedSet],
  );

  if (isEmpty(options)) {
    return <Nothing />;
  }

  return (
    <Group role="group" className={className} {...a11y}>
      {options.map((opt) => {
        const id = opt.id ?? `mcl-${opt.value}`;
        const helpId = opt.helpMessage ? `${id}-help` : undefined;
        const checked = selectedSet.has(opt.value);

        return (
          <div key={opt.value}>
            <InputCheckbox
              id={id}
              label={opt.label}
              checked={checked}
              disabled={opt.disabled}
              aria-describedby={helpId}
              name={name}
              value={opt.value}
              onChange={() => toggleValue(opt.value)}
            />
            <If is={isDefined(opt.helpMessage)}>
              <HelpMessage subdued id={helpId}>
                {opt.helpMessage}
              </HelpMessage>
            </If>
          </div>
        );
      })}
      <If is={isDefined(errorMessage) && !isEmpty(errorMessage)}>
        <ErrorMessage message={errorMessage!} />
      </If>
    </Group>
  );
};
