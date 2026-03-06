import { Actions } from "foundation/colors";
import { Margin } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { Nothing } from "helpers/nothing";
import {
  defaultTo,
  first,
  is,
  isDefined,
  isFunction,
  isNil,
  isString,
  toArray,
} from "helpers/safe-navigation";
import { applyProps, getOtherChildren, getSlot, Slot } from "helpers/slots";
import { useInputControllableState } from "hooks";
import React, { InputHTMLAttributes } from "react";
import { DateObject } from "react-multi-date-picker";
import styled from "styled-components";

import { IconMinor } from "../../icon";
import { InputField as InputFieldBase } from "../../input-field";
import { CustomCalendar } from "../components";

const InputDatePicker = styled.div`
  position: relative;
`;

const Calendar = styled(CustomCalendar)`
  position: absolute;
`;

const InputField = styled(InputFieldBase)<{ $disabled: boolean }>`
  margin-bottom: ${Margin.xxs};

  ${({ $disabled }) =>
    $disabled
      ? `
      background-color: ${Actions.Primary.Disabled};
      &:active {
        outline: none;
      }
    `
      : ""}
`;

const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";

export type DateFormatterProps<T> = {
  date: T | undefined;
  defaultFormatter: (date: T, format?: string) => string;
};

export type DateFormatter<T> = (props: DateFormatterProps<T>) => string;

type HTMLProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange" | "onClick" | "min" | "max"
>;

type ControlChildProps = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  role?: string;
};

type ControlsSlotProps = {
  children?: React.ReactElement<ControlChildProps>;
};

export type isUnavailableParams<T> = {
  date: T;
  isSameDate: (date: T, other: T) => boolean;
};

export type IDatePickerProps<T> = PropsWithChildren &
  HTMLProps & {
    value?: T;
    defaultValue?: T;
    onChange?: (change: T) => void;
    onOpenChange?: (open: boolean) => void;

    isAvailable?: (props: isUnavailableParams<T>) => boolean;

    isOpen?: boolean;
    defaultOpen?: boolean;

    label?: string;
    format?: string | DateFormatter<T>;
    min?: T;
    max?: T;
  };

class ControlsSlot extends Slot {}

export type IDatePickerSlots = {
  Controls: typeof ControlsSlot;
};

export function datePickerFactory<T>({
  fromDate,
  toDate,
  empty,
}: {
  fromDate: (date: Date | undefined) => T;
  toDate: (obj: T) => Date;
  empty: (obj: T) => boolean;
}): FC<IDatePickerProps<T>, IDatePickerSlots> {
  const ConcreteDatePicker: FC<IDatePickerProps<T>, IDatePickerSlots> = (
    props,
  ) => {
    const {
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      onOpenChange,
      isAvailable = () => true,
      isOpen,
      defaultOpen,
      format,
      children,
      min,
      max,
      disabled,
      ...HTMLInputProps
    } = props;

    const calendarId = React.useId();

    const [value, onChange] = useInputControllableState<T>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const [open, setOpen] = useInputControllableState<boolean>({
      value: isOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    function hasValue(date: T | undefined): date is T {
      return !isNil(date) && !empty(date);
    }

    const handleChange = (selectedDates: DateObject | DateObject[] | null) => {
      const date = first(toArray(selectedDates));
      const change = fromDate(date?.toDate());

      onChange(change);

      if (isNil(isOpen)) {
        setOpen(false);
      }
    };

    const controls = getSlot<ControlsSlotProps>(ControlsSlot, children);
    const calendarChildren = getOtherChildren(children);
    const controlChild = controls?.props?.children;

    const renderedControl = controlChild ? (
      applyProps(controlChild, (childProps) => ({
        ...childProps,
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          childProps.onClick?.(event);
          setOpen(!is(open));
        },
        role: "combobox",
      }))
    ) : (
      <Nothing />
    );

    const displayValue = hasValue(value) ? formatDate(value, format) : "";
    const displayPlaceholder = hasValue(value)
      ? ""
      : isString(format)
        ? format
        : DEFAULT_DATE_FORMAT;

    return (
      <InputDatePicker>
        {isDefined(controls) ? (
          renderedControl
        ) : (
          <InputField
            role="combobox"
            aria-expanded={is(open)}
            aria-haspopup="dialog"
            aria-controls={calendarId}
            placeholder={displayPlaceholder}
            {...HTMLInputProps}
            readOnly={hasValue(value)}
            value={displayValue}
            onChange={() => undefined}
            onClick={() => setOpen(!is(open))}
            label={props.label}
            $disabled={Boolean(disabled)}
          >
            <InputField.Icon>
              <IconMinor.Calendar />
            </InputField.Icon>
          </InputField>
        )}
        {is(open) ? (
          <div
            role="dialog"
            id={calendarId}
            aria-label={props.label ?? "Choose date"}
          >
            <Calendar
              readOnly={isDefined(props.value) && isNil(props.onChange)}
              renderButton={renderArrows}
              mapDays={(day) => ({
                disabled: !isAvailable({
                  date: fromDate(day.date.toDate()),
                  isSameDate: (a, b) =>
                    day.isSameDate(toDateObject(a), toDateObject(b)),
                }),
              })}
              value={hasValue(value) ? toDateObject(value) : undefined}
              minDate={isDefined(min) ? toDate(min) : undefined}
              maxDate={isDefined(max) ? toDate(max) : undefined}
              onChange={handleChange}
              numberOfMonths={1}
            >
              {calendarChildren}
            </Calendar>
          </div>
        ) : (
          <Nothing />
        )}
      </InputDatePicker>
    );
  };

  ConcreteDatePicker.Controls = ControlsSlot;
  ConcreteDatePicker.displayName = "DatePicker";

  return ConcreteDatePicker;

  function toDateObject(date: T): DateObject {
    return new DateObject(toDate(date));
  }

  function defaultFormatter(date: T, format?: string): string {
    if (isNil(date)) {
      return "";
    }

    return toDateObject(date).format(defaultTo(format, DEFAULT_DATE_FORMAT));
  }

  function formatDate(
    date: T | undefined,
    format?: string | DateFormatter<T>,
  ): string {
    if (isFunction(format)) {
      return format({ date, defaultFormatter });
    }

    if (isNil(date) || empty(date)) {
      return isString(format) ? format : DEFAULT_DATE_FORMAT;
    }

    return toDateObject(date).format(defaultTo(format, DEFAULT_DATE_FORMAT));
  }
}

function renderArrows(direction: string, handleClick: () => void) {
  const isNext = direction === "right";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isNext ? "Next month" : "Previous month"}
    >
      {isNext ? <IconMinor.ArrowRight /> : <IconMinor.ArrowLeft />}
    </button>
  );
}
