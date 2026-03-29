import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "components/card";
import {
  gridLayoutGenerator,
  leftRightLayoutGenerator,
} from "components/layout";
import { Body } from "components/typography";
import { Margin } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import styled from "styled-components";

import { ColorRectangle } from "../components";
import {
  BLUE,
  BRAND,
  ColorPalette,
  CYAN,
  GRAY,
  GREEN,
  ORANGE,
  RED,
  SHADES,
  VIOLET,
} from "./base-palette";

const STORY_HEADING = "Color System: Base Palette";

const paletteConfig = {
  Gray: {
    palette: GRAY,
    description:
      "Foundation neutrals used for surfaces, borders, muted text, overlays, and structural chrome.",
  },
  Blue: {
    palette: BLUE,
    description:
      "Primary interactive ramp used for actions, links, focus, and selected states.",
  },
  Violet: {
    palette: VIOLET,
    description:
      "Accent ramp used for expressive data visualization and supporting highlight treatments.",
  },
  Cyan: {
    palette: CYAN,
    description:
      "Secondary accent ramp used for charts and informational contrast where blue alone is not enough.",
  },
  Green: {
    palette: GREEN,
    description:
      "Positive ramp used for success surfaces, borders, and completion states.",
  },
  Orange: {
    palette: ORANGE,
    description: "Caution ramp used for warning feedback and attention states.",
  },
  Red: {
    palette: RED,
    description:
      "Critical ramp used for destructive actions, errors, and high-risk states.",
  },
  Shades: {
    palette: SHADES,
    description:
      "Absolute values used for high-contrast text, inverse content, and shadow composition.",
  },
  Brand: {
    palette: BRAND,
    description:
      "Reserved brand accent. Use sparingly and prefer semantic tokens in components.",
  },
} as const;

const paletteEntries = Object.entries(paletteConfig) as Array<
  [
    keyof typeof paletteConfig,
    (typeof paletteConfig)[keyof typeof paletteConfig],
  ]
>;

const IntroNote = styled(Body)`
  margin: ${Margin.none} ${Margin.none} ${Margin.l};
`;

const PaletteStory = ({
  colorName,
  colorPalette,
  description,
}: {
  colorName: string;
  colorPalette: ColorPalette;
  description: string;
}) => {
  return (
    <Card heading={STORY_HEADING}>
      <Card.Section>
        <Hue
          colorName={colorName}
          colorPalette={colorPalette}
          description={description}
        />
      </Card.Section>
    </Card>
  );
};

const { Layout } = leftRightLayoutGenerator();

interface IHueProps {
  colorName: string;
  colorPalette: ColorPalette;
  description: string;
}

const Hue: FC<IHueProps> = ({ colorName, colorPalette, description }) => {
  return (
    <Layout>
      <Layout.Left>
        <Layout.HeadingText>{colorName}</Layout.HeadingText>
        <Layout.HelpText muted>{description}</Layout.HelpText>
      </Layout.Left>
      <Layout.Right>
        <Palette colors={colorPalette} />
      </Layout.Right>
    </Layout>
  );
};

const { Grid, Cell } = gridLayoutGenerator({
  columns: 5,
  rows: 2,
  columnGutter: 16,
  rowGutter: 24,
});

interface IPaletteProps {
  colors: ColorPalette;
}

const Palette: FC<IPaletteProps> = ({ colors }) => {
  return (
    <Grid>
      {Object.entries(colors).map(([name, hex]) => (
        <Cell key={name}>
          <ColorRectangle name={name} hex={hex} />
        </Cell>
      ))}
    </Grid>
  );
};

const meta = {
  title: "Foundations/Colors/Base Palette",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
The base palette is the raw source color ramp for the library.

Components should generally consume semantic tokens from the color guidelines instead of using these values directly.

Use this page to inspect hue ramps, verify spacing between steps, and review which families exist before mapping them into semantic roles.

The chart accents introduced in the semantic layer are also represented here as the \`Violet\` and \`Cyan\` ramps.

This page answers “what raw ramps exist?”. Use the semantic Color System page to answer “which token should a component actually use?”.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <>
      <IntroNote>
        Use this page for raw ramps. Use <strong>Foundations/Color System</strong>{" "}
        for semantic tokens like <code>Surface.Default.Default</code> and{" "}
        <code>TextColors.Active</code>.
      </IntroNote>
      {paletteEntries.map(([name, config]) => (
        <PaletteStory
          key={name}
          colorName={name}
          colorPalette={config.palette}
          description={config.description}
        />
      ))}
    </>
  ),
};
