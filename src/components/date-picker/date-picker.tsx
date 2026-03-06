import { FC } from "helpers/generic-types";
import { isDefined } from "helpers/safe-navigation";

import {
  datePickerFactory,
  IDatePickerProps as IBaseProps,
  IDatePickerSlots,
} from "./helpers/date-picker-factory";

export type IDatePickerProps = IBaseProps<string>;

function toLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateString(date: Date | undefined): string {
  if (!isDefined(date)) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
// TODO: implement range selection, multiple month view, etc.
export const DatePicker: FC<IDatePickerProps, IDatePickerSlots> =
  datePickerFactory({
    toDate: (str) => toLocalDate(str),
    fromDate: (date) => toDateString(date),
    empty: (str) => str === "",
  });
