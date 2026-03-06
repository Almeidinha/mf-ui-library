import { FC } from "helpers/generic-types";
import { isDefined } from "helpers/safe-navigation";

import { IDatePickerProps } from "./date-picker";
import {
  datePickerFactory,
  IDatePickerSlots,
} from "./helpers/date-picker-factory";

export const DatePickerUTC: FC<IDatePickerProps, IDatePickerSlots> =
  datePickerFactory({
    toDate: (dateString: string) => {
      const onlyDate = new Date(dateString).toISOString().split("T")[0];
      const [year, month, day] = onlyDate.split("-").map(Number);
      return new Date(year, month - 1, day);
    },
    fromDate: (date) =>
      isDefined(date)
        ? new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
          ).toISOString()
        : "",
    empty: (str) => str === "",
  });
