import { fireEvent, render, screen } from "@testing-library/react";

import { Thumbnail } from "./index";

const IMG_URL = "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";

describe("Thumbnail Tests", () => {
  it("renders nothing when no imageUrl or fallbackUrl is provided", () => {
    const { container } = render(<Thumbnail imageUrl="" fallbackUrl="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("uses fallbackUrl when imageUrl is empty", () => {
    render(
      <Thumbnail imageUrl="" fallbackUrl={IMG_URL} imageLabel="Preview" />,
    );
    const img = screen.getByRole("img", { name: "Preview" });
    expect(img).toHaveAttribute("src", IMG_URL);
  });

  it("defaults to a decorative image when imageLabel is omitted", () => {
    render(<Thumbnail imageUrl={IMG_URL} />);
    const img = screen.getByRole("presentation");
    expect(img).toHaveAttribute("alt", "");
  });

  it("renders with default size (medium)", () => {
    render(<Thumbnail imageUrl={IMG_URL} imageLabel="Thumbnail" />);
    const img = screen.getByRole("img", { name: "Thumbnail" });
    const box = img.parentElement;
    expect(box).toBeTruthy();
    expect(box).toHaveStyle("width: 60px");
    expect(box).toHaveStyle("height: 60px");
  });

  it.each([
    ["small", "40px"],
    ["medium", "60px"],
    ["large", "80px"],
  ] as const)("renders the Thumbnail with size %s", (size, px) => {
    render(<Thumbnail imageUrl={IMG_URL} size={size} imageLabel="Thumbnail" />);
    const img = screen.getByRole("img", { name: "Thumbnail" });
    const box = img.parentElement;
    expect(box).toBeTruthy();
    expect(box).toHaveStyle(`width: ${px}`);
    expect(box).toHaveStyle(`height: ${px}`);
  });

  it("sets alt text from imageLabel", () => {
    render(<Thumbnail imageUrl={IMG_URL} imageLabel="Avatar" />);
    expect(screen.getByRole("img", { name: "Avatar" })).toBeInTheDocument();
  });

  it("switches to fallbackUrl if the image fails to load", () => {
    render(
      <Thumbnail
        imageUrl="https://example.invalid/broken.svg"
        fallbackUrl={IMG_URL}
        imageLabel="Thumbnail"
      />,
    );

    const img = screen.getByRole("img", { name: "Thumbnail" });
    expect(img).toHaveAttribute("src", "https://example.invalid/broken.svg");

    fireEvent.error(img);
    expect(img).toHaveAttribute("src", IMG_URL);
  });
});
