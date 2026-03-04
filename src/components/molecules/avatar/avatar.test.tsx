import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Avatar } from "./index";

describe("Avatar Tests", () => {
  describe("Avatar Tests", () => {
    it("should render the acronym name from user", () => {
      render(<Avatar name="Some Full Name" small />);

      expect(screen.getByText("SN")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(screen.queryByText("Some Full Name")).not.toBeInTheDocument();
    });
    it("should render the acronym name with just two parts of name", () => {
      render(<Avatar name="Some Name" small />);

      expect(screen.getByText("SN")).toBeInTheDocument();
    });
    it("should render the acronym name with just one parts of name", () => {
      render(<Avatar name="Name" small />);

      expect(screen.getByText("N")).toBeInTheDocument();
    });
    it("should not render the acronym with empty name", () => {
      render(<Avatar name="" small />);
      expect(screen.queryByText("Name")).not.toBeInTheDocument();
    });
  });

  it("should render the image from user", () => {
    render(
      <Avatar
        name="Some Full Name"
        imageUrl="https://blog.almeida.io/hubfs/Almeida%20Smi.png"
      />,
    );

    expect(screen.queryByText("SN")).not.toBeInTheDocument();
    expect(screen.queryByText("Some Full Name")).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should not have accessibility issues", async () => {
    const { container } = render(<Avatar name="Some Full Name" small />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("withLabel behavior Tests", () => {
    it("should render the full name and the acronym name from user", () => {
      render(<Avatar name="Some Full Name" withLabel />);

      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(screen.getByText("SN")).toBeInTheDocument();
      expect(screen.getByText("Some Full Name")).toBeInTheDocument();
    });

    it("should render the full name and the user image", () => {
      render(
        <Avatar
          name="Some Full Name"
          imageUrl="https://blog.almeida.io/hubfs/Almeida%20Smi.png"
          withLabel
        />,
      );

      expect(screen.queryByText("SN")).not.toBeInTheDocument();
      expect(screen.getByText("Some Full Name")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should not have accessibility issues", async () => {
      const { container } = render(
        <Avatar
          name="Some Full Name"
          imageUrl="https://blog.almeida.io/hubfs/Almeida%20Smi.png"
          withLabel
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
