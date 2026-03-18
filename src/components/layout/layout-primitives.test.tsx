import { render, screen } from "@testing-library/react";

import { Box, Container, Paper, Stack } from "./index";

describe("Layout primitives", () => {
  it("renders Box with a custom component and sx styles", () => {
    render(
      <Box component="section" sx={{ p: 2, bgcolor: "rgb(239, 246, 255)" }}>
        Box content
      </Box>,
    );

    const box = screen.getByText("Box content");

    expect(box.tagName).toBe("SECTION");
    expect(box).toHaveStyle({ padding: "16px" });
    expect(box).toHaveStyle({ backgroundColor: "rgb(239, 246, 255)" });
  });

  it("renders Container with gutter controls", () => {
    render(<Container disableGutters>Container content</Container>);

    expect(screen.getByText("Container content")).toHaveStyle({
      paddingLeft: "0px",
      paddingRight: "0px",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
    });
  });

  it("renders Paper variants", () => {
    const { rerender } = render(<Paper>Paper content</Paper>);

    expect(screen.getByText("Paper content")).toHaveStyle({
      borderRadius: "6px",
    });

    rerender(
      <Paper square variant="outlined">
        Paper content
      </Paper>,
    );

    expect(screen.getByText("Paper content")).toHaveStyle("border-radius: 0px");
    expect(screen.getByText("Paper content")).toHaveStyle("box-shadow: none");
    expect(screen.getByText("Paper content")).toHaveStyle("border-width: 1px");
    expect(screen.getByText("Paper content")).toHaveStyle(
      "border-style: solid",
    );
  });

  it("renders Stack spacing, direction and dividers", () => {
    render(
      <Stack
        direction="row"
        spacing={2}
        divider={<span data-testid="divider">|</span>}
      >
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </Stack>,
    );

    const stack = screen.getByText("One").parentElement;

    expect(stack).toHaveStyle({
      display: "flex",
      flexDirection: "row",
      gap: "16px",
    });
    expect(screen.getAllByTestId("divider")).toHaveLength(2);
  });
});
