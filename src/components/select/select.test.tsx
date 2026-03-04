import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconMinor } from "components/icon";
import { vi } from "vitest";

import { MenuList, Select } from "./index";

describe("Select Tests", () => {
  const options = [
    {
      label: "Brasil",
      value: "BR",
    },
    {
      label: "Canada",
      value: "CA",
    },
    {
      label: "Mexico",
      value: "MX",
    },
  ];

  it("should render the Select", () => {
    const { container } = render(
      <>
        <Select />
        <Select />
      </>,
    );

    const select = container.getElementsByClassName("select");
    expect(select.length).toBe(2);
  });

  it("should render the container value", () => {
    const { container } = render(<Select />);

    const valueContainer = container.getElementsByClassName("select-value");
    expect(valueContainer.length).toBe(1);
  });

  it("should render the Custom Label", () => {
    render(<Select label="Test Select" />);

    const select = screen.getByText("Test Select");
    expect(select).toBeInTheDocument();
  });

  it("should Open the menu on click", () => {
    render(<Select label="Test Select" options={options} />);

    const select = screen.getByText("Test Select");

    const optionBeforClick = screen.queryByText("Brasil");
    expect(optionBeforClick).not.toBeInTheDocument();

    fireEvent(
      select,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const optionBRAfterClick = screen.getByText("Brasil");
    const optionCAAfterClick = screen.getByText("Canada");
    const optionMXCAAfterClick = screen.getByText("Mexico");

    expect(optionBRAfterClick).toBeInTheDocument();
    expect(optionCAAfterClick).toBeInTheDocument();
    expect(optionMXCAAfterClick).toBeInTheDocument();
  });

  it("Should Set a value on change", () => {
    const handleChange = vi.fn();
    const handleClose = vi.fn();

    render(
      <Select
        label="Test Select"
        onChange={handleChange}
        onClose={handleClose}
        options={options}
      />,
    );

    const select = screen.getByText("Test Select");

    fireEvent(
      select,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const optionMX = screen.getByText("Mexico");

    fireEvent(
      optionMX,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleClose).toHaveBeenCalled();

    const optionMXAfterMenuClose = screen.queryByText("Mexico");
    expect(optionMXAfterMenuClose).toBeNull();

    expect(handleChange).toHaveBeenCalledWith("MX", {
      label: "Mexico",
      value: "MX",
    });
  });

  it("Should trigger the inputChange", async () => {
    const handleInputChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Select
        label="Test Select"
        searchable
        iconPosition="left"
        onInputChange={handleInputChange}
        options={options}
      />,
    );

    const selectValue = container.querySelector(".select-value") as HTMLElement;
    await user.click(selectValue);

    const search = await screen.findByRole("textbox", { name: "Search" });
    search.innerText = "mexico";
    fireEvent.input(search);

    expect(handleInputChange).toHaveBeenCalledWith("mexico");
  });

  it("should render the custom menu", () => {
    const setSelectOptions = options.map((opt, index) => ({
      ...opt,
      icon: <IconMinor.Clone />,
      helperText: `Lorem ipsum dolor sit amet - ${index}`,
    }));

    render(
      <Select
        menuComponent={MenuList}
        label="Test Select"
        options={setSelectOptions}
      />,
    );

    const select = screen.getByText("Test Select");

    fireEvent(
      select,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(screen.getByText("Lorem ipsum dolor sit amet - 0")).toBeTruthy();
    expect(screen.getByText("Lorem ipsum dolor sit amet - 1")).toBeTruthy();
    expect(screen.getByText("Lorem ipsum dolor sit amet - 2")).toBeTruthy();
  });

  it("Should not close the menu on select option if it is a multi select", () => {
    const handleChange = vi.fn();
    const handleClose = vi.fn();

    render(
      <Select
        label="Test Select"
        onChange={handleChange}
        onClose={handleClose}
        options={options}
        multi
      />,
    );

    const select = screen.getByText("Test Select");

    fireEvent(
      select,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const optionMX = screen.getByText("Mexico");

    fireEvent(
      optionMX,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleClose).toHaveBeenCalledTimes(0);
  });

  it("Should hide the placeholder when the user types", async () => {
    const handleInputChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Select
        label="Test Select"
        searchable
        iconPosition="left"
        onInputChange={handleInputChange}
        options={options}
        placeholder="Type something"
      />,
    );

    const placeHolder = screen.getByText("Type something");
    expect(placeHolder).toBeInTheDocument();

    const selectValue = container.querySelector(".select-value") as HTMLElement;
    await user.click(selectValue);

    const search = await screen.findByRole("textbox", { name: "Search" });
    search.innerText = "mexico";
    fireEvent.input(search);

    const newPlaceHolder = screen.queryByText("Type something");
    expect(newPlaceHolder).toBeNull();
  });
});
