import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "components/card";
import {
  gridLayoutGenerator,
  leftRightLayoutGenerator,
} from "components/layout";
import { FC } from "helpers/generic-types";

import { ColorRectangle } from "../components";
import {
  BLUE,
  BRAND,
  ColorPalette,
  GRAY,
  GREEN,
  ORANGE,
  RED,
  SHADES,
} from "./base-palette";

const paletteConfig = {
  Gray: {
    palette: GRAY,
    description:
      "These colors are used as supporting colors in backgrounds, text colors, separators, modals, etc.",
  },
  Blue: {
    palette: BLUE,
    description:
      "These colors are used across interactive elements such as CTAs, links, active states, etc.",
  },
  Green: {
    palette: GREEN,
    description: "These colors depict positivity. Used across success states.",
  },
  Orange: {
    palette: ORANGE,
    description: "These colors depict caution. Used across warning states.",
  },
  Red: {
    palette: RED,
    description:
      "These colors depict negativity. Used across destructive states.",
  },
  Shades: {
    palette: SHADES,
    description:
      "White for text on primary buttons. Black opacities for shadows.",
  },
  Brand: {
    palette: BRAND,
    description: "App brand color.",
  },
} as const;

const PalleStory = ({
  heading,
  colorName,
  colorPalette,
  description,
}: {
  heading: string;
  colorName: string;
  colorPalette: ColorPalette;
  description: string;
}) => {
  return (
    <Card heading={heading}>
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

const Gray = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Gray"
      colorPalette={paletteConfig.Gray.palette}
      description={paletteConfig.Gray.description}
    />
  );
};

const Blue = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Blue"
      colorPalette={paletteConfig.Blue.palette}
      description={paletteConfig.Blue.description}
    />
  );
};

const Green = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Green"
      colorPalette={paletteConfig.Green.palette}
      description={paletteConfig.Green.description}
    />
  );
};

const Orange = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Orange"
      colorPalette={paletteConfig.Orange.palette}
      description={paletteConfig.Orange.description}
    />
  );
};

const Red = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Red"
      colorPalette={paletteConfig.Red.palette}
      description={paletteConfig.Red.description}
    />
  );
};

const Shades = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Shades"
      colorPalette={paletteConfig.Shades.palette}
      description={paletteConfig.Shades.description}
    />
  );
};

const Brand = () => {
  return (
    <PalleStory
      heading="Color System: Base Palette"
      colorName="Brand"
      colorPalette={paletteConfig.Brand.palette}
      description={paletteConfig.Brand.description}
    />
  );
};

const { Layout } = leftRightLayoutGenerator();

interface IHueProps {
  colorName: string;
  colorPalette: ColorPalette;
  description: string;
}

const Hue: FC<IHueProps> = (props) => {
  return (
    <Layout>
      <Layout.Left>
        <Layout.HeadingText>{props.colorName}</Layout.HeadingText>
        <Layout.HelpText subdued>{props.description}</Layout.HelpText>
      </Layout.Left>
      <Layout.Right>
        <Palette colors={props.colorPalette} />
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

const Palette: FC<IPaletteProps> = (props) => {
  return (
    <Grid>
      {Object.entries(props.colors).map(([name, hex]) => (
        <Cell key={hex}>
          <ColorRectangle name={name} hex={hex} />
        </Cell>
      ))}
    </Grid>
  );
};

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <>
      <Gray />
      <Blue />
      <Green />
      <Orange />
      <Red />
      <Shades />
      <Brand />
    </>
  ),
};
