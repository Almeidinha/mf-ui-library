import { render, screen } from "@testing-library/react";

import { ProgressBar } from "./index";

describe("ProgressBar Tests", () => {
  describe("ProgressBar Tests", () => {
    it("should render the ProgressBar with default size", () => {
      render(<ProgressBar progress={10} />);

      const progressBar = screen.getByRole("progressbar");

      expect(progressBar).toBeInTheDocument();
    });

    it("should render the ProgressBar with large size", () => {
      render(<ProgressBar progress={4} large />);

      const progressBar = screen.getByRole("progressbar");

      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle("height: 32px");
    });

    it("should render the ProgressBar with small size", () => {
      render(<ProgressBar progress={4} small />);

      const progressBar = screen.getByRole("progressbar");

      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle("height: 8px");
    });

    it("should render the ProgressBar with medium size", () => {
      render(<ProgressBar progress={4} medium />);

      const progressBar = screen.getByRole("progressbar");

      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle("height: 16px");
    });

    it("should render the ProgressBar with its width reflecting the progress", () => {
      render(<ProgressBar progress={85} large />);

      const progressBar = screen.getByRole("progressbar");

      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle("width: 85%");
    });
  });
});
