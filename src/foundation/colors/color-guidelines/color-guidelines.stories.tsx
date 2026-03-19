import type { Meta, StoryObj } from "@storybook/react";
import { AlertBanner } from "components/alert-banner";
import { Card } from "components/card";
import { Flex } from "components/layout";
import { Heading2, Heading3 } from "components/typography";
import { Margin } from "foundation/spacing";
import { Hex } from "helpers/numbers";
import styled from "styled-components";

import {
  BLACK,
  BLUE,
  BRAND,
  ColorPalette,
  GRAY,
  GREEN,
  ORANGE,
  RED,
  SHADES,
  WHITE,
} from "../base-palette";
import { ColorSquare } from "../components";
import {
  Actions,
  Background,
  Borders,
  Focus,
  Icons,
  Interactive,
  Surface,
  Text,
} from "./color-guidelines";

const COLOR_SYSTEM = { GRAY, BLUE, GREEN, ORANGE, RED, SHADES, BRAND } as const;

const SemanticCategoryHeading = styled(Heading2)`
  margin-bottom: ${Margin.xl};
`;

interface ISemanticCategoryProps {
  name: string;
  subCategories: {
    name: string;
    palette: ColorPalette;
    border?: string;
  }[];
}

const getColorId = (color: Hex) => {
  if (color === WHITE) {
    return "white";
  }
  if (color === BLACK) {
    return "black";
  }

  const colorHex = color.slice(0, 7);
  const fadeHex = color.slice(7, 9);

  const colorId = Object.keys(COLOR_SYSTEM).reduce(
    (acc, COLOR_NAME) => {
      const COLOR = COLOR_SYSTEM[COLOR_NAME as keyof typeof COLOR_SYSTEM];
      const id = Object.keys(COLOR).find(
        (_id) => COLOR[_id as keyof typeof COLOR] === colorHex,
      );
      if (id) {
        return `${COLOR_NAME.toLowerCase()}-${id}`;
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
};

const toPercentage = (hex: string) => {
  const dec = parseInt(hex, 16);
  return dec === 0 ? "" : `${Math.round((dec / 255) * 100)}%`;
};

const meta = {
  title: "Foundations/Color System",
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
(e.g. \`Background.Default\`, \`Surface.Critical\`).

\`\`\`ts
import { Background, Surface } from '@foundations'

const bg = Background.Default
const criticalSurface = Surface.Critical
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SemanticCategory = ({ name, subCategories }: ISemanticCategoryProps) => {
  return (
    <>
      <SemanticCategoryHeading style={{ marginTop: 24 }}>
        {name}
      </SemanticCategoryHeading>
      <Flex
        style={{
          backgroundColor: Background.Default,
          padding: 24,
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        {subCategories.map((subCategory) => (
          <div key={subCategory.name}>
            {Object.entries(subCategory.palette).map(([key, hex]) => (
              <ColorSquare
                key={`${subCategory.name}-${key}`}
                name={`${subCategory.name} ${key}`}
                hex={hex}
                colorId={getColorId(hex)}
                border={
                  subCategory.border
                    ? (subCategory.border as `#${string}`)
                    : undefined
                }
              />
            ))}
          </div>
        ))}
      </Flex>
    </>
  );
};

const BackgroundSection = () => (
  <SemanticCategory
    name="Background"
    subCategories={[{ name: "", palette: Background }]}
  />
);

const SurfaceSection = () => (
  <SemanticCategory
    name="Surface"
    subCategories={[
      { name: "", palette: Surface.Default },
      { name: "Selected", palette: Surface.Selected },
      { name: "Critical", palette: Surface.Critical },
      { name: "Warning", palette: Surface.Warning },
      { name: "Success", palette: Surface.Success },
      { name: "Highlight", palette: Surface.Highlight },
      { name: "Neutral", palette: Surface.Neutral },
    ]}
  />
);

const BordersSection = () => (
  <SemanticCategory
    name="Borders"
    subCategories={[
      { name: "", palette: Borders.Default },
      { name: "Critical", palette: Borders.Critical },
      { name: "Warning", palette: Borders.Warning },
      { name: "Success", palette: Borders.Success },
      { name: "Highlight", palette: Borders.Highlight },
    ]}
  />
);

const FocusSection = () => (
  <SemanticCategory
    name="Focus"
    subCategories={[{ name: "", palette: Focus, border: Background.Default }]}
  />
);

const TextSection = () => {
  const {
    Default,
    Muted,
    Soft,
    Disabled,
    Critical,
    Warning,
    Success,
    OnPrimary,
    OnCritical,
    OnInverse,
  } = Text;

  return (
    <SemanticCategory
      name="Text"
      subCategories={[
        { name: "", palette: { Default, Muted, Soft, Disabled } },
        { name: "", palette: { Critical, Warning, Success } },
        { name: "", palette: { OnPrimary, OnCritical, OnInverse } },
      ]}
    />
  );
};

const IconsSection = () => {
  const {
    Default,
    Muted,
    Hover,
    Pressed,
    Disabled,
    Critical,
    Success,
    Warning,
    Highlight,
    OnPrimary,
    OnCritical,
    OnInverse,
  } = Icons;

  return (
    <SemanticCategory
      name="Icons"
      subCategories={[
        { name: "", palette: { Default, Muted, Hover, Pressed, Disabled } },
        { name: "", palette: { Critical, Warning, Success, Highlight } },
        { name: "", palette: { OnPrimary, OnCritical, OnInverse } },
      ]}
    />
  );
};

const InteractionsSection = () => (
  <SemanticCategory
    name="Interactions"
    subCategories={[
      { name: "", palette: Interactive.Default },
      { name: "Subtle", palette: Interactive.Subtle },
    ]}
  />
);

const ActionsSection = () => (
  <SemanticCategory
    name="Actions"
    subCategories={[
      { name: "Primary", palette: Actions.Primary },
      { name: "Secondary", palette: Actions.Secondary },
      { name: "Critical", palette: Actions.Critical },
      { name: "Secondary Critical", palette: Actions.SecondaryCritical },
    ]}
  />
);

const ExampleSection = () => (
  <>
    <Heading2 style={{ marginTop: 48 }}>Examples</Heading2>
    <Heading3 style={{ marginTop: 48 }}>Background Example</Heading3>
    <div
      style={{ padding: 24, background: Background.Default, borderRadius: 8 }}
    >
      <Card heading="Heading">Body</Card>
    </div>

    <Heading3 style={{ marginTop: 48 }}>Surface Example</Heading3>
    <div
      style={{
        padding: 24,
        background: Background.Default,
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

export const Docs: Story = {
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: () => (
    <>
      <BackgroundSection />
      <SurfaceSection />
      <BordersSection />
      <FocusSection />
      <TextSection />
      <IconsSection />
      <InteractionsSection />
      <ActionsSection />

      {/* Examples */}
      <ExampleSection />
    </>
  ),
};
