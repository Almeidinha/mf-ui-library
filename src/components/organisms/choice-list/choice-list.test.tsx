import { render, screen } from "@testing-library/react";

import { ChoiceList } from "./choice-list";

describe("ChoiceList Tests", () => {
  it("should render the amount of radio buttons matching with the options size", () => {
    render(
      <ChoiceList
        options={[
          {
            label: "My Awesome label",
            value: "1",
            id: "My radio 1",
            checked: true,
          },
          {
            label: "My Awesome label",
            value: "2",
            id: "My radio 2",
          },
        ]}
        selected={undefined}
        onChange={() => undefined}
      />,
    );

    expect(screen.getAllByRole("radio").length).toBe(2);
  });
  it("should not render anything if dont send valid options", () => {
    render(
      <ChoiceList
        options={[]}
        selected={undefined}
        onChange={() => undefined}
      />,
    );
    expect(screen.queryAllByRole("radio").length).toBe(0);
  });
});
