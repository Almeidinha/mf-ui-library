import { render, screen } from "@testing-library/react";

import { MultiChoiceList } from "./multi-choice-list";

describe("MultiChoiceList Tests", () => {
  it("should render the amount of checkbox matching with the options size", () => {
    render(
      <MultiChoiceList
        options={[
          {
            value: "My checkbox 1",
            label: "My Awesome label",
            id: "My checkbox 1",
            helpMessage: "Alternative text here",
          },
          {
            value: "My checkbox 2",
            label: "My Awesome label",
            id: "My checkbox 2",
          },
        ]}
        value={[]}
        onChange={() => void 0}
      />,
    );

    expect(screen.getByText("Alternative text here")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox").length).toBe(2);
  });
  it("should not render anything if dont send valid options", () => {
    render(<MultiChoiceList options={[]} />);
    expect(screen.queryAllByRole("checkbox").length).toBe(0);
  });
});
