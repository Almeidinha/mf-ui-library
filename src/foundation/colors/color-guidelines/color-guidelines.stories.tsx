import type { Meta, StoryObj } from "@storybook/react";
import { AlertBanner } from "components/alert-banner";
import { Card } from "components/card";
import { Flex } from "components/layout";
import { Body, Heading2, Heading3 } from "components/typography";
import { Margin } from "foundation/spacing";
import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import {
  BLACK,
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
  WHITE,
} from "../base-palette";
import { ColorSquare } from "../components";

const COLOR_SYSTEM = {
  GRAY,
  BLUE,
  VIOLET,
  CYAN,
  GREEN,
  ORANGE,
  RED,
  SHADES,
  BRAND,
} as const;

const SemanticCategoryHeading = styled(Heading2)`
  margin-bottom: ${Margin.xl};
`;

const ModeNote = styled(Body)`
  margin: ${Margin.none} ${Margin.none} ${Margin.l};
`;

const IntroNote = styled(Body)`
  margin: ${Margin.none} ${Margin.none} ${Margin.l};
`;

interface CategoryProps {
  name: string;
  subCategories: Array<{
    name: string;
    palette: ColorPalette;
    border?: string;
  }>;
  background?: string;
}

function getColorId(color: string) {
  if (!color.startsWith("#")) {
    return color;
  }

  if (color === WHITE) {
    return "white";
  }

  if (color === BLACK) {
    return "black";
  }

  const colorHex = color.slice(0, 7).toUpperCase();
  const fadeHex = color.slice(7, 9).toUpperCase();

  const colorId = Object.keys(COLOR_SYSTEM).reduce(
    (acc, colorName) => {
      const palette = COLOR_SYSTEM[colorName as keyof typeof COLOR_SYSTEM];
      const id = Object.keys(palette).find((paletteKey) => {
        const paletteValue = String(
          palette[paletteKey as keyof typeof palette],
        );
        return paletteValue.toUpperCase() === colorHex;
      });

      if (id) {
        return `${colorName.toLowerCase()}-${id}`;
      }

      return acc;
    },
    undefined as string | undefined,
  );

  if (!colorId) {
    return color;
  }

  if (!fadeHex) {
    return colorId;
  }

  return `${colorId} - ${toPercentage(fadeHex)}`;
}

function toPercentage(hex: string) {
  const decimal = parseInt(hex, 16);
  return decimal === 0 ? "" : `${Math.round((decimal / 255) * 100)}%`;
}

const meta = {
  title: "Foundations/Colors/Color System",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
The Color Guidelines give names and functions to the colors defined in our base palette.

All colors used in the app are namespaced according to their context
(e.g. \`Background.Default\`, \`Surface.Critical.Default\`).

Use the Storybook toolbar to switch between light and dark themes and inspect the semantic tokens in each mode.

This page answers “which token should a component use?”. Use the Base Palette page when you need to inspect the raw ramps behind those semantic roles.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Category = ({
  name,
  subCategories,
  background = "transparent",
}: CategoryProps) => {
  return (
    <>
      <SemanticCategoryHeading style={{ marginTop: 24 }}>
        {name}
      </SemanticCategoryHeading>
      <Flex
        style={{
          backgroundColor: background,
          padding: 24,
          borderRadius: 8,
          overflow: "auto",
          gap: 24,
        }}
      >
        {subCategories.map((subCategory) => (
          <div key={subCategory.name || "default"}>
            {Object.entries(subCategory.palette).map(([key, value]) => (
              <ColorSquare
                key={`${subCategory.name}-${key}`}
                name={`${subCategory.name} ${key}`.trim()}
                hex={value}
                colorId={getColorId(value)}
                border={subCategory.border}
              />
            ))}
          </div>
        ))}
      </Flex>
    </>
  );
};

const DocsContent = () => {
  const theme = useTheme();

  const semanticColors = theme.semanticColors;

  const textPalettes = useMemo(
    () => [
      {
        name: "Core",
        palette: {
          Default: semanticColors.Text.Default,
          Neutral: semanticColors.Text.Neutral,
          Muted: semanticColors.Text.Muted,
          Soft: semanticColors.Text.Soft,
          Disabled: semanticColors.Text.Disabled,
        },
      },
      {
        name: "Accent",
        palette: {
          Active: semanticColors.Text.Active,
          Highlight: semanticColors.Text.Highlight,
          Violet: semanticColors.Text.Violet,
          Cyan: semanticColors.Text.Cyan,
        },
      },
      {
        name: "Status",
        palette: {
          Critical: semanticColors.Text.Critical,
          Warning: semanticColors.Text.Warning,
          Success: semanticColors.Text.Success,
        },
      },
      {
        name: "On Surface",
        palette: {
          OnPrimary: semanticColors.Text.OnPrimary,
          OnCritical: semanticColors.Text.OnCritical,
          OnInverse: semanticColors.Text.OnInverse,
        },
      },
    ],
    [semanticColors.Text],
  );

  const iconPalettes = useMemo(
    () => [
      {
        name: "Core",
        palette: {
          Default: semanticColors.Icons.Default,
          Muted: semanticColors.Icons.Muted,
          Hover: semanticColors.Icons.Hover,
          Pressed: semanticColors.Icons.Pressed,
          Disabled: semanticColors.Icons.Disabled,
        },
      },
      {
        name: "Status",
        palette: {
          Critical: semanticColors.Icons.Critical,
          Warning: semanticColors.Icons.Warning,
          Success: semanticColors.Icons.Success,
          Highlight: semanticColors.Icons.Highlight,
        },
      },
      {
        name: "On Surface",
        palette: {
          OnPrimary: semanticColors.Icons.OnPrimary,
          OnCritical: semanticColors.Icons.OnCritical,
          OnInverse: semanticColors.Icons.OnInverse,
        },
      },
    ],
    [semanticColors.Icons],
  );

  return (
    <>
      <IntroNote>
        Use this page for semantic roles. Use{" "}
        <strong>Foundations/Colors/Base Palette</strong> when you need the raw
        hue ramps behind these tokens.
      </IntroNote>
      <ModeNote>
        Showing the <strong>{theme.mode}</strong> semantic color set.
      </ModeNote>

      <Category
        name="Base Palette"
        subCategories={[
          { name: "Gray", palette: GRAY },
          { name: "Blue", palette: BLUE },
          { name: "Violet", palette: VIOLET },
          { name: "Cyan", palette: CYAN },
          { name: "Green", palette: GREEN },
          { name: "Orange", palette: ORANGE },
          { name: "Red", palette: RED },
          { name: "Shades", palette: SHADES },
          { name: "Brand", palette: BRAND },
        ]}
      />

      <Category
        name="Background"
        background={semanticColors.Background.Default}
        subCategories={[
          {
            name: "Background",
            palette: semanticColors.Background,
            border: semanticColors.Borders.Default.Default,
          },
        ]}
      />

      <Category
        name="Surface"
        background={semanticColors.Background.Default}
        subCategories={[
          { name: "Default", palette: semanticColors.Surface.Default },
          { name: "Selected", palette: semanticColors.Surface.Selected },
          { name: "Critical", palette: semanticColors.Surface.Critical },
          { name: "Warning", palette: semanticColors.Surface.Warning },
          { name: "Success", palette: semanticColors.Surface.Success },
          { name: "Highlight", palette: semanticColors.Surface.Highlight },
          { name: "Neutral", palette: semanticColors.Surface.Neutral },
          { name: "Violet", palette: semanticColors.Surface.Violet },
          { name: "Cyan", palette: semanticColors.Surface.Cyan },
        ]}
      />

      <Category
        name="Borders"
        background={semanticColors.Background.Default}
        subCategories={[
          { name: "Default", palette: semanticColors.Borders.Default },
          { name: "Critical", palette: semanticColors.Borders.Critical },
          { name: "Warning", palette: semanticColors.Borders.Warning },
          { name: "Success", palette: semanticColors.Borders.Success },
          { name: "Highlight", palette: semanticColors.Borders.Highlight },
          { name: "Neutral", palette: semanticColors.Borders.Neutral },
          { name: "Violet", palette: semanticColors.Borders.Violet },
          { name: "Cyan", palette: semanticColors.Borders.Cyan },
        ]}
      />

      <Category
        name="Focus"
        background={semanticColors.Background.Default}
        subCategories={[
          {
            name: "Focus",
            palette: semanticColors.Focus,
            border: semanticColors.Borders.Default.Default,
          },
        ]}
      />

      <Category
        name="Text"
        background={semanticColors.Background.Default}
        subCategories={textPalettes}
      />

      <Category
        name="Icons"
        background={semanticColors.Background.Default}
        subCategories={iconPalettes}
      />

      <Category
        name="Interactive"
        background={semanticColors.Background.Default}
        subCategories={[
          { name: "Default", palette: semanticColors.Interactive.Default },
          { name: "Subtle", palette: semanticColors.Interactive.Subtle },
        ]}
      />

      <Category
        name="Actions"
        background={semanticColors.Background.Default}
        subCategories={[
          { name: "Primary", palette: semanticColors.Actions.Primary },
          { name: "Secondary", palette: semanticColors.Actions.Secondary },
          { name: "Critical", palette: semanticColors.Actions.Critical },
          {
            name: "Secondary Critical",
            palette: semanticColors.Actions.SecondaryCritical,
          },
        ]}
      />

      <Heading2 style={{ marginTop: 48 }}>Examples</Heading2>

      <Heading3 style={{ marginTop: 48 }}>Background Example</Heading3>
      <div
        style={{
          padding: 24,
          background: semanticColors.Background.Default,
          borderRadius: 8,
        }}
      >
        <Card heading="Heading">Body</Card>
      </div>

      <Heading3 style={{ marginTop: 48 }}>Surface Example</Heading3>
      <div
        style={{
          padding: 24,
          background: semanticColors.Background.Default,
          marginTop: 24,
          borderRadius: 8,
        }}
      >
        <Card heading="Heading">
          <Card.AlertBanner>Some helpful info</Card.AlertBanner>
          Body
        </Card>
      </div>

      <Heading3 style={{ marginTop: 48 }}>Alert Example</Heading3>
      <div style={{ marginTop: 24 }}>
        <AlertBanner>Default</AlertBanner>
        <AlertBanner info>Info</AlertBanner>
        <AlertBanner success>Success</AlertBanner>
        <AlertBanner warning>Warning</AlertBanner>
        <AlertBanner critical>Critical</AlertBanner>
      </div>
    </>
  );
};

export const Docs: Story = {
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: () => <DocsContent />,
};
