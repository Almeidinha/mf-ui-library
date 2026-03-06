import { isNil } from "@helpers";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { DatePicker, DatePickerUTC } from "./index";

describe("DatePicker", () => {
  describe("Controls", () => {
    it("renders the controls you pass with the role button", () => {
      render(
        <DatePicker>
          <DatePicker.Controls>
            <div>Hello</div>
          </DatePicker.Controls>
        </DatePicker>,
      );

      const controls = screen.getByRole("combobox");

      expect(controls).toBeInTheDocument();
      expect(within(controls).getByText("Hello")).toBeInTheDocument();
    });

    it("clicking the controls you pass in opens the Calendar", async () => {
      render(
        <DatePicker>
          <DatePicker.Controls>
            <div>Hello</div>
          </DatePicker.Controls>
        </DatePicker>,
      );

      expect(
        screen.queryByRole("dialog", { name: /choose date/i }),
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole("combobox"));
      expect(
        screen.getByRole("dialog", { name: /choose date/i }),
      ).toBeInTheDocument();
    });

    it("calls the onClick you passed in to your controls", async () => {
      const handleClick = vi.fn();

      render(
        <DatePicker>
          <DatePicker.Controls>
            <div onClick={handleClick}>Hello</div>
          </DatePicker.Controls>
        </DatePicker>,
      );

      expect(
        screen.queryByRole("dialog", { name: /choose date/i }),
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole("combobox"));
      expect(handleClick).toHaveBeenCalled();
      // Clicking custom controls should still open the calendar.
      expect(
        screen.getByRole("dialog", { name: /choose date/i }),
      ).toBeInTheDocument();
    });

    it("renders an input by default with the role button", () => {
      render(<DatePicker label="Start Date" />);

      expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    describe("the default controls", () => {
      it("shows a placeholder when there is no value", () => {
        render(<DatePicker label="Start Date" />);

        expect(screen.getByLabelText("Start Date")).toHaveAttribute(
          "placeholder",
          "DD/MM/YYYY",
        );
      });

      it("shows a value when there is a value", () => {
        render(
          <DatePicker
            value="2022-12-03"
            onChange={() => undefined}
            label="Start Date"
          />,
        );

        expect(screen.getByLabelText("Start Date")).toHaveAttribute(
          "value",
          "03/12/2022",
        );
      });

      it("formats the value with the given format string", () => {
        const date = "2022-12-03";
        const formatted = "3/12/2022";

        render(
          <DatePicker
            value={date}
            format="D/MM/YYYY"
            onChange={() => undefined}
            label="Start Date"
          />,
        );

        expect(screen.getByLabelText("Start Date")).toHaveAttribute(
          "value",
          formatted,
        );
      });

      it("formats the value with the given format function", () => {
        const date = "2022-12-03";
        const formatted = "3/12/2022";

        render(
          <DatePicker
            value={date}
            onChange={() => undefined}
            format={({ date, defaultFormatter }) =>
              isNil(date)
                ? "Next Available"
                : `Date: ${defaultFormatter(date, "D/MM/YYYY")}`
            }
            label="Start Date"
          />,
        );

        expect(screen.getByLabelText("Start Date")).toHaveAttribute(
          "value",
          `Date: ${formatted}`,
        );
      });

      test.todo("formats the value with a default");

      it("opens the calendar on click", async () => {
        render(<DatePicker />);

        expect(
          screen.queryByRole("dialog", { name: /choose date/i }),
        ).not.toBeInTheDocument();
        expect(screen.queryByRole("combobox")).toBeInTheDocument();
        await userEvent.click(screen.getByRole("combobox"));
        expect(
          screen.queryByRole("dialog", { name: /choose date/i }),
        ).toBeInTheDocument();
      });

      test.todo("renders the given label");
      test.todo("you can override the placeholder");
      test.todo("you can mark the input required");
      test.todo("you can mark the input disabled");

      it("the input respects the required property", async () => {
        render(
          <form onSubmit={(e) => e.preventDefault()} data-testid="form">
            <DatePicker label="Start Date" required />
            <button type="submit">Click Me</button>
          </form>,
        );

        // it is initially empty
        expect(screen.getByLabelText("Start Date*")).toHaveAttribute(
          "value",
          "",
        );

        // try to submit
        await userEvent.click(screen.getByText("Click Me"));

        // we can't
        expect(document.querySelectorAll(":invalid").length).not.toBe(0);

        // click to open the dialog
        await userEvent.click(screen.getByLabelText("Start Date*"));

        // click the date... 12
        await userEvent.click(screen.getByText("12"));

        // now the inpupt has a value
        expect(screen.getByLabelText("Start Date*")).toHaveAttribute(
          "value",
          expect.stringContaining("12"),
        );

        // try to submit again
        await userEvent.click(screen.getByText("Click Me"));

        // we can!
        expect(document.querySelectorAll(":invalid").length).toBe(0);
      });
    });
  });

  it("renders a calendar when open", () => {
    render(<DatePicker defaultOpen label="Start Date" />);

    expect(
      screen.queryByRole("dialog", { name: "Start Date" }),
    ).toBeInTheDocument();
  });

  it("renders no calendar when closed", () => {
    render(<DatePicker label="Start Date" />);

    expect(
      screen.queryByRole("dialog", { name: "Start Date" }),
    ).not.toBeInTheDocument();
  });

  it("passes children to the Calendar", () => {
    render(
      <DatePicker defaultOpen>
        <div>WHOA</div>
      </DatePicker>,
    );

    const calendar = screen.getByRole("dialog", { name: /choose date/i });
    expect(within(calendar).getByText("WHOA")).toBeInTheDocument();
  });

  describe("Calendar", () => {
    test.todo("disables dates in the given min and max range");
    test.todo("disables dates when isAvailable is false for those dates");
    test.todo("calls onChange when the selected date changes");
  });

  it("formats keeps the same date regardless of timezone", () => {
    const date = "Tue Aug 08 2023 00:00:00 GMT+0000";

    render(
      <DatePickerUTC
        value={date}
        onChange={() => undefined}
        label="Start Date"
      />,
    );

    expect(screen.getByLabelText("Start Date")).toHaveAttribute(
      "value",
      "08/08/2023",
    );
  });
});
