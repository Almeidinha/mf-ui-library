import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "components/input-field";
import { Button } from "components/molecules";
import { Body, Heading3 } from "components/typography";
import { Interactive, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { type ComponentType, createElement, type HTMLAttributes } from "react";
import styled from "styled-components";

import { Icon, IconMinor } from "./icon";

type IconRegistry = Record<string, ComponentType<HTMLAttributes<HTMLElement>>>;
type IconFamily = "major" | "minor";

type IconStoryArgs = {
  family: IconFamily;
  iconName: string;
  color?: string;
  ariaLabel: string;
};

const iconFamilies: Record<IconFamily, IconRegistry> = {
  major: Icon,
  minor: IconMinor,
};

const majorIconNames = Object.keys(Icon);
const minorIconNames = Object.keys(IconMinor);
const allIconNames = Array.from(
  new Set([...majorIconNames, ...minorIconNames]),
).sort();

const GalleryGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${Margin.s};

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const GalleryCard = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${Margin.s};
  padding: ${Padding.xs};
  border: 0;
  border-radius: 6px;
  background: ${Surface.Default.Hover};
  cursor: pointer;
  position: relative;
  text-align: left;

  &:hover span,
  &:focus-visible span {
    opacity: 1;
    z-index: 1;
  }
`;

const CopyHint = styled.span`
  opacity: 0;
  transition: opacity 160ms ease;
  width: 140px;
  background-color: ${Interactive.Subtle.Disabled};
  color: ${Surface.Default.Default};
  text-align: center;
  padding: ${Padding.xxs} ${Padding.none};
  border-radius: 6px;
  position: absolute;
  z-index: -1;
  bottom: 105%;
  left: 50%;
  margin-left: -70px;

  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${Interactive.Subtle.Disabled} transparent transparent
      transparent;
  }
`;

const ExampleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: ${Margin.l} 0;
`;

const PreviewPanel = styled.div`
  min-width: 320px;
  padding: ${Padding.m};
  border-radius: 8px;
  background: ${Surface.Default.Hover};
  display: grid;
  gap: ${Margin.s};
`;

const PreviewIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 96px;
`;

const Snippet = styled.code`
  display: block;
  padding: ${Padding.xs};
  border-radius: 6px;
  background: ${Surface.Default.Default};
  white-space: pre-wrap;
  word-break: break-word;
`;

function getDefaultIconName(family: IconFamily) {
  return family === "major" ? majorIconNames[0] : minorIconNames[0];
}

function resolveIconComponent(family: IconFamily, iconName: string) {
  const registry = iconFamilies[family];
  return registry[iconName] ?? registry[getDefaultIconName(family)];
}

function buildSnippet(family: IconFamily, iconName: string, color?: string) {
  const namespace = family === "major" ? "Icon" : "IconMinor";
  const colorProp = color ? ` color="${color}"` : "";
  return `<${namespace}.${iconName}${colorProp} />`;
}

function copySnippet(text: string) {
  navigator.clipboard?.writeText?.(text).catch(() => {});
}

function StoryIconPreview({
  family,
  iconName,
  color,
  ariaLabel,
}: IconStoryArgs) {
  const ResolvedIcon = resolveIconComponent(family, iconName);
  const resolvedName = iconFamilies[family][iconName]
    ? iconName
    : getDefaultIconName(family);

  return (
    <PreviewPanel>
      <Body>
        Use this playground to preview one icon at a time and copy the JSX you
        need.
      </Body>
      <PreviewIcon>
        {createElement(ResolvedIcon, { color, "aria-label": ariaLabel })}
      </PreviewIcon>
      <Body>
        {family === "major" ? "Large icon" : "Minor icon"}: {resolvedName}
      </Body>
      <Snippet>{buildSnippet(family, resolvedName, color)}</Snippet>
    </PreviewPanel>
  );
}

function IconGallerySection({
  title,
  family,
}: {
  title: string;
  family: IconFamily;
}) {
  const names = family === "major" ? majorIconNames : minorIconNames;
  const registry = iconFamilies[family];

  return (
    <>
      <Heading3 style={{ marginTop: title === "Large Icons" ? 0 : Margin.xl }}>
        {title}
      </Heading3>
      <GalleryGrid>
        {names.map((iconName) => {
          const IconComponent = registry[iconName];
          const snippet = buildSnippet(family, iconName);

          return (
            <GalleryCard
              key={`${family}-${iconName}`}
              onClick={() => copySnippet(snippet)}
              type="button"
            >
              <CopyHint>Copy JSX</CopyHint>
              {createElement(IconComponent)}
              <Body>{iconName}</Body>
            </GalleryCard>
          );
        })}
      </GalleryGrid>
    </>
  );
}

const meta = {
  title: "Foundations/Icon",
  component: StoryIconPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use the playground to preview a single icon with controls, and use the gallery stories to browse the full major and minor icon sets.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    family: "major",
    iconName: "BuildingColumns",
    color: undefined,
    ariaLabel: "icon",
  },
  argTypes: {
    family: {
      description: "Selects whether to preview a major or minor icon.",
      control: { type: "radio" },
      options: ["major", "minor"],
      table: {
        category: "Icon selection",
        defaultValue: { summary: "major" },
      },
    },
    iconName: {
      description:
        "Icon component name to preview. If the selected name does not exist in the chosen family, the first icon in that family is shown.",
      control: { type: "select" },
      options: allIconNames,
      table: {
        category: "Icon selection",
        defaultValue: { summary: "BuildingColumns" },
      },
    },
    color: {
      description:
        "Optional CSS color passed to the icon. Leave empty to use the default token color.",
      control: { type: "text" },
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
      },
    },
    ariaLabel: {
      description: "Accessible label applied to the rendered icon.",
      control: { type: "text" },
      table: {
        category: "Accessibility",
        defaultValue: { summary: "icon" },
      },
    },
  },
} satisfies Meta<IconStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render(args) {
    return <StoryIconPreview {...args} />;
  },
};

export const Gallery: Story = {
  render: function Render() {
    return (
      <>
        <IconGallerySection title="Large Icons" family="major" />
        <IconGallerySection title="Minor Icons" family="minor" />
      </>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

export const UsageExamples: Story = {
  render: function Render() {
    return (
      <div>
        <ExampleRow>
          <Icon.BuildingColumns />
          <Icon.BullseyeArrow />
        </ExampleRow>
        <ExampleRow>
          <Button IconPrefix={IconMinor.CircleInfo}>Basic</Button>
          <Button primary IconPrefix={IconMinor.FolderOpen}>
            Primary
          </Button>
          <Button destructive IconPrefix={IconMinor.School}>
            Destructive
          </Button>
          <Button destructive primary IconPrefix={IconMinor.PlaneArrival}>
            Destructive Primary
          </Button>
          <Button outline IconPrefix={IconMinor.PlaneDeparture}>
            Outline
          </Button>
          <Button plain IconPrefix={IconMinor.BadgeCheck}>
            Plain
          </Button>
          <Button plain subtle IconPrefix={IconMinor.Fire}>
            Plain Subtle
          </Button>
        </ExampleRow>
        <InputField.Label label="I can have Icons too!" htmlFor="input_example">
          <InputField name="input_example">
            <InputField.Icon>
              <IconMinor.CreditCard title="Icons render before the input" />
            </InputField.Icon>
            <InputField.Controls>
              <IconMinor.CreditCard title="Controls render after the input" />
            </InputField.Controls>
          </InputField>
        </InputField.Label>
      </div>
    );
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};
