import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Pagination } from "./pagination";

type OptionalHTMLInputElement = HTMLInputElement | null;

describe("Pagination Input Tests", () => {
  const option = {
    page: 2,
    total: 10,
  };

  it("should render the pagination component and handle event after click", () => {
    const spyOnChange = vi.fn();
    render(
      <Pagination
        page={option.page}
        totalPages={option.total}
        onChange={spyOnChange}
      />,
    );

    const paginationInput: HTMLInputElement =
      screen.getByLabelText("Current page");
    const previousPage = screen.getByLabelText("Previous page");
    const nextPage = screen.getByLabelText("Next page");

    expect(spyOnChange).not.toHaveBeenCalled();
    expect(paginationInput.value).toBe("2");

    fireEvent.click(nextPage);
    expect(spyOnChange).toHaveBeenCalledWith(3);

    fireEvent.click(previousPage);
    expect(spyOnChange).toHaveBeenCalledWith(1);
  });

  it("should not render the pagination input if flag is on", () => {
    const spyOnChange = vi.fn();
    render(
      <Pagination
        showPageInfo={false}
        page={1}
        totalPages={option.total}
        onChange={spyOnChange}
      />,
    );

    expect(spyOnChange).not.toHaveBeenCalled();

    const paginationInput: OptionalHTMLInputElement =
      screen.queryByLabelText("Current page");
    expect(paginationInput).toBeNull();

    const previousPage = screen.getByLabelText("Previous page");
    const nextPage = screen.getByLabelText("Next page");

    fireEvent.click(nextPage);
    expect(spyOnChange).toHaveBeenCalledWith(2);

    fireEvent.click(previousPage);
    expect(spyOnChange).toHaveBeenCalledTimes(1);
  });
});
