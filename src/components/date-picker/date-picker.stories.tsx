import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { Body, BodyLarge, Label } from "components/typography";
import { Gap } from "foundation/spacing";
import { addDays, formatDate, getDay } from "helpers/date-functions";
import { isDefined } from "helpers/safe-navigation";
import { type ComponentProps, useState } from "react";
import { useArgs } from "storybook/internal/preview-api";

import { DatePicker } from "./date-picker";
import { DatePickerUTC } from "./date-picker-utc";
import {
  DateFormatterProps,
  datePickerFactory,
  isUnavailableParams,
} from "./helpers/date-picker-factory";

type DatePickerArgs = ComponentProps<typeof DatePicker>;

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "201-06-15",
    defaultValue: undefined,
    label: "Select a date",
    onChange: (date) => console.log("Selected date:", date),
    onOpenChange: (isOpen) =>
      console.log("DatePicker is now", isOpen ? "open" : "closed"),
    isOpen: false,
    defaultOpen: undefined,
    format: "DD/MM/YYYY",
    min: undefined,
    max: undefined,
  },
  argTypes: {
    value: {
      description: "Controlled selected date value.",
      table: {
        category: "Controlled state",
        defaultValue: { summary: "201-06-15" },
      },
    },
    defaultValue: {
      description: "Initial selected date for uncontrolled usage.",
      table: {
        category: "Uncontrolled state",
        defaultValue: { summary: "undefined" },
      },
    },
    label: {
      description: "Label displayed for the date picker input.",
      table: {
        category: "Content",
        defaultValue: { summary: "Select a date" },
      },
    },
    onChange: {
      description: "Called when the selected date changes.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    onOpenChange: {
      description: "Called when the calendar opens or closes.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    isOpen: {
      description: "Controlled open state for the calendar popover.",
      table: {
        category: "Controlled state",
        defaultValue: { summary: "false" },
      },
    },
    defaultOpen: {
      description: "Initial open state when the component is uncontrolled.",
      control: "boolean",
      table: {
        category: "Uncontrolled state",
        defaultValue: { summary: "undefined" },
      },
    },
    format: {
      description:
        "Date display format string or formatter function used in the input.",
      table: {
        category: "Formatting",
        defaultValue: { summary: "DD/MM/YYYY" },
      },
    },
    min: {
      description: "Minimum selectable date.",
      control: "date",
      table: {
        category: "Validation",
        defaultValue: { summary: "undefined" },
      },
    },
    max: {
      description: "Maximum selectable date.",
      control: "date",
      table: {
        category: "Validation",
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    const [{ value, isOpen }, updateArgs] = useArgs<DatePickerArgs>();

    return (
      <Flex style={{ height: 300 }}>
        <DatePicker
          {...args}
          onChange={(date) => updateArgs({ value: date, isOpen: false })}
          onOpenChange={(open) => updateArgs({ isOpen: open })}
          value={value}
          isOpen={isOpen}
        />
      </Flex>
    );
  },
  args: {
    isOpen: true,
  },
};

export const DatePickerForm: Story = {
  render: function Render(args) {
    const [{ min, max }, updateArgs] = useArgs<DatePickerArgs>();
    return (
      <Flex style={{ height: 300 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DatePicker
            max={max}
            label="min"
            value={min}
            onChange={(date) => updateArgs({ min: date })}
          />
          <DatePicker
            min={min}
            label="max"
            value={max}
            onChange={(date) => updateArgs({ max: date })}
          />
          <DatePicker
            {...args}
            onChange={(date) => updateArgs({ value: date, isOpen: false })}
            onOpenChange={(open) => updateArgs({ isOpen: open })}
          />
          <Button primary type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    );
  },
  args: {
    label: "Start Date",
    required: true,
  },
};

export const UTCDatePicker: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<DatePickerArgs>();
    return (
      <Flex style={{ height: 300 }} gap={Gap.xxl}>
        <DatePickerUTC
          {...args}
          label="Start Date without offset"
          onChange={(date) => updateArgs({ value: date, isOpen: false })}
          onOpenChange={(open) => updateArgs({ isOpen: open })}
        />
        <DatePicker
          {...args}
          label="Start Date with offset"
          onChange={(date) => updateArgs({ value: date, isOpen: false })}
          onOpenChange={(open) => updateArgs({ isOpen: open })}
        />
      </Flex>
    );
  },
  args: {
    value: "Tue Aug 08 2026 00:00:00 GMT+0000",
  },
};

export const AvailableDates: Story = {
  render: function Render() {
    const now = new Date();

    const today = formatDate(now, "YYYY-MM-DD", {
      outputTokens: "moment",
    });

    const tomorrowDate = addDays(new Date(now), 1);
    const tomorrow = formatDate(tomorrowDate, "YYYY-MM-DD", {
      outputTokens: "moment",
    });

    const isUnavailable = ({ date }: isUnavailableParams<string>) => {
      const day = getDay(date);
      return day === 0 || day === 6;
    };
    const isTomorrow = ({ date, isSameDate }: isUnavailableParams<string>) =>
      isSameDate(date, tomorrow);

    return (
      <Flex column gap={Gap.l} style={{ height: 300 }}>
        <BodyLarge>
          No weekends, and we can do same day but not next day.
        </BodyLarge>
        <DatePicker
          min={today}
          isAvailable={(props) => !isUnavailable(props) && !isTomorrow(props)}
        />
      </Flex>
    );
  },
};

export const ControlledOpen: Story = {
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<DatePickerArgs>();
    return (
      <Flex column gap={Gap.l} style={{ height: 300 }}>
        <Button onClick={() => updateArgs({ isOpen: !isOpen })}>
          {isOpen ? "Close" : "Open"} Sesame!
        </Button>
        <DatePicker
          {...args}
          isOpen={isOpen}
          onChange={(date) => updateArgs({ value: date, isOpen: false })}
          onOpenChange={(open) => updateArgs({ isOpen: open })}
        />
      </Flex>
    );
  },
  args: {
    label: "Start Date",
  },
};

export const CustomFormat: Story = {
  render: function Render(args) {
    const [{ isOpen, value }, updateArgs] = useArgs<DatePickerArgs>();
    return (
      <Flex column gap={Gap.m} style={{ height: 300 }}>
        <Body>You Chose: {value}</Body>
        <Flex gap={Gap.m}>
          <DatePicker
            {...args}
            isOpen={isOpen}
            onChange={(date) => updateArgs({ value: date, isOpen: false })}
            onOpenChange={(open) => updateArgs({ isOpen: open })}
            format={undefined}
          />
          <DatePicker
            {...args}
            isOpen={isOpen}
            onChange={(date) => updateArgs({ value: date, isOpen: false })}
            onOpenChange={(open) => updateArgs({ isOpen: open })}
            format="MMMM D, YYYY"
          />
          <DatePicker
            {...args}
            isOpen={isOpen}
            onChange={(date) => updateArgs({ value: date, isOpen: false })}
            onOpenChange={(open) => updateArgs({ isOpen: open })}
            format={({ date }) => "Today is: " + date}
          />
        </Flex>
      </Flex>
    );
  },
};

export const CustomHandler: Story = {
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<DatePickerArgs>();
    return (
      <DatePicker
        {...args}
        isOpen={isOpen}
        onChange={(date) => updateArgs({ value: date, isOpen: false })}
        onOpenChange={(open) => updateArgs({ isOpen: open })}
      >
        <DatePicker.Controls>
          <Label>Click Me</Label>
        </DatePicker.Controls>
      </DatePicker>
    );
  },
};

export const DatePickerFactory: Story = {
  render: function Render() {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(new Date().valueOf());
    const [draft, setDraft] = useState<number>(value);
    const publish = (date: number) => {
      setValue(date);
      setDraft(date);
    };

    const EpochDatePicker = datePickerFactory<number>({
      toDate: (n) => new Date(n),
      fromDate: (date) => (isDefined(date) ? date.valueOf() : 0),
      empty: (date) => date.valueOf() === 0,
    });

    const format = ({ date, defaultFormatter }: DateFormatterProps<number>) =>
      date === 0
        ? "Next Available"
        : defaultFormatter(Number(date), "MMMM D, YYYY");

    return (
      <Flex column gap={Gap.m} style={{ height: 300 }}>
        You Chose: {value}
        <EpochDatePicker
          format={format}
          value={draft}
          onChange={setDraft}
          label="Start Date"
          isOpen={open}
          onOpenChange={setOpen}
        >
          <Flex column gap={Gap.m} style={{ padding: "8px" }}>
            <Button onClick={() => publish(0)}>Next Available</Button>
            <Button
              onClick={() => {
                setDraft(value);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                publish(draft);
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </Flex>
        </EpochDatePicker>
      </Flex>
    );
  },
};
