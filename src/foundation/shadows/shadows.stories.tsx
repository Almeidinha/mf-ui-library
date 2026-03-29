import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card";
import { Flex } from "components/layout";
import { Body, Heading2, Heading3, Label } from "components/typography";
import { Borders, Surface, TextColors } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import type { ReactNode } from "react";
import styled, { type RuleSet } from "styled-components";
import { useTheme } from "styled-components";

import {
  shadow,
  shadow2Xl,
  shadowInner,
  shadowLg,
  shadowMd,
  shadowSm,
  shadowXl,
} from "./shadows";

const meta = {
  title: "Foundations/Colors/Shadows",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
Shadows communicate elevation, containment, and focus of attention.

Use lower elevations for inline surfaces and progressively larger elevations for overlays, panels, and modals.

\`\`\`ts
import styled from "styled-components";
import { shadowMd } from "foundation/shadows";

const Panel = styled.div\`
  \${shadowMd}
\`;
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type ShadowConfig = {
  name: string;
  shadowValue: string;
  cssMixin: RuleSet<object>;
  usage: string;
};

const StoryPage = () => {
  const theme = useTheme();

  const shadowConfigs: ShadowConfig[] = [
    {
      name: "shadowSm",
      shadowValue: theme.shadows.shadowSm,
      cssMixin: shadowSm,
      usage: "Subtle lift for chips, small cards, and compact controls.",
    },
    {
      name: "shadow",
      shadowValue: theme.shadows.shadow,
      cssMixin: shadow,
      usage:
        "Default surface elevation for cards and standard contained blocks.",
    },
    {
      name: "shadowMd",
      shadowValue: theme.shadows.shadowMd,
      cssMixin: shadowMd,
      usage: "Interactive panels and medium-prominence contained surfaces.",
    },
    {
      name: "shadowLg",
      shadowValue: theme.shadows.shadowLg,
      cssMixin: shadowLg,
      usage: "Menus, popovers, and hover-promoted surfaces.",
    },
    {
      name: "shadowXl",
      shadowValue: theme.shadows.shadowXl,
      cssMixin: shadowXl,
      usage: "Large overlays that need stronger depth separation.",
    },
    {
      name: "shadow2Xl",
      shadowValue: theme.shadows.shadow2Xl,
      cssMixin: shadow2Xl,
      usage: "High-emphasis overlays such as dialogs or spotlight surfaces.",
    },
    {
      name: "shadowInner",
      shadowValue: theme.shadows.shadowInner,
      cssMixin: shadowInner,
      usage: "Inset treatment for pressed, recessed, or embedded surfaces.",
    },
  ];

  return (
    <StoryRoot column>
      <Body style={{ marginBottom: 16 }}>
        Showing the <strong>{theme.mode}</strong> shadow set. Use the Storybook
        toolbar to compare how the same elevations behave in light and dark
        themes.
      </Body>

      <Heading2 style={{ marginTop: 24, marginBottom: 24 }}>
        Elevation Scale
      </Heading2>

      <Flex
        style={{
          gap: 24,
          flexWrap: "wrap",
          alignItems: "stretch",
          padding: 24,
          borderRadius: 12,
          background: Surface.Default.Muted,
        }}
      >
        {shadowConfigs.map((config) => (
          <ShadowSampleCard
            key={config.name}
            name={config.name}
            usage={config.usage}
            shadowValue={config.shadowValue}
            cssMixin={config.cssMixin}
          />
        ))}
      </Flex>

      <Heading2 style={{ marginTop: 48, marginBottom: 24 }}>
        Usage Examples
      </Heading2>

      <Flex style={{ gap: 24, flexWrap: "wrap" }}>
        <ExampleCard
          title="Contained Card"
          description="Default content surface using a medium shadow."
          preview={
            <ExamplePanel $shadow={shadowMd}>Analytics summary</ExamplePanel>
          }
        />
        <ExampleCard
          title="Menu / Popover"
          description="Floating UI wants a stronger edge against the page."
          preview={<ExamplePanel $shadow={shadowLg}>Actions menu</ExamplePanel>}
        />
        <ExampleCard
          title="Dialog"
          description="Higher emphasis overlay with deeper separation."
          preview={
            <ExamplePanel $shadow={shadow2Xl}>Confirm action</ExamplePanel>
          }
        />
        <ExampleCard
          title="Inset Surface"
          description="Useful for pressed or embedded controls."
          preview={<ExampleInsetPanel>Embedded panel</ExampleInsetPanel>}
        />
      </Flex>

      <Heading3 style={{ marginTop: 48, marginBottom: 16 }}>Guidance</Heading3>
      <Card>
        <Card.Section>
          <Body>
            Keep elevation steps intentional. Most product surfaces should live
            on one of three common levels: no shadow, <code>shadow</code> /{" "}
            <code>shadowMd</code>, or <code>shadowLg</code> for floating UI.
            Reserve the largest shadows for true overlays so the hierarchy stays
            readable.
          </Body>
        </Card.Section>
      </Card>
    </StoryRoot>
  );
};

const ShadowSampleCard = ({
  name,
  usage,
  shadowValue,
  cssMixin,
}: ShadowConfig) => {
  return (
    <Card style={{ width: 280, minWidth: 0 }}>
      <Card.Section>
        <Flex column style={{ gap: 16 }}>
          <Label strong>{name}</Label>
          <ShadowPreviewFrame>
            <PreviewSurface $shadow={cssMixin}>{name}</PreviewSurface>
          </ShadowPreviewFrame>
          <Body>{usage}</Body>
          <TokenValue>{shadowValue}</TokenValue>
        </Flex>
      </Card.Section>
    </Card>
  );
};

const ExampleCard = ({
  title,
  description,
  preview,
}: {
  title: string;
  description: string;
  preview: ReactNode;
}) => {
  return (
    <Card style={{ width: 300, minWidth: 0 }}>
      <Card.Section>
        <Flex column style={{ gap: 16 }}>
          <Flex column style={{ gap: 8 }}>
            <Label strong>{title}</Label>
            <Body>{description}</Body>
          </Flex>
          <ExampleCanvas>{preview}</ExampleCanvas>
        </Flex>
      </Card.Section>
    </Card>
  );
};

const ShadowPreviewFrame = styled(Flex)`
  min-height: 180px;
  border-radius: 12px;
  border: 1px solid ${Borders.Default.Muted};
  background:
    radial-gradient(
      circle at top left,
      ${Surface.Default.Default},
      transparent 50%
    ),
    linear-gradient(180deg, ${Surface.Default.Hover}, ${Surface.Default.Muted});
  align-items: center;
  justify-content: center;
  padding: ${Padding.l};
`;

const PreviewSurface = styled.div<{ $shadow: RuleSet<object> }>`
  ${({ $shadow }) => $shadow}
  width: 164px;
  height: 112px;
  border-radius: 12px;
  background: ${Surface.Default.Default};
  border: 1px solid ${Borders.Default.Muted};
  color: ${TextColors.Default};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Padding.m};
  text-align: center;
`;

const ExampleCanvas = styled(Flex)`
  min-height: 180px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    ${Surface.Default.Muted},
    ${Surface.Default.Hover}
  );
  border: 1px solid ${Borders.Default.Muted};
  padding: ${Padding.xl};
  align-items: center;
  justify-content: center;
`;

const ExamplePanel = styled.div<{ $shadow: RuleSet<object> }>`
  ${({ $shadow }) => $shadow}
  min-width: 180px;
  border-radius: 12px;
  background: ${Surface.Default.Default};
  border: 1px solid ${Borders.Default.Muted};
  padding: ${Padding.l};
  color: ${TextColors.Default};
  text-align: center;
`;

const ExampleInsetPanel = styled.div`
  ${shadowInner}
  min-width: 180px;
  border-radius: 12px;
  background: ${Surface.Default.Muted};
  border: 1px solid ${Borders.Default.Muted};
  padding: ${Padding.l};
  color: ${TextColors.Default};
  text-align: center;
`;

const TokenValue = styled.code`
  display: block;
  margin-top: ${Margin.xs};
  padding: ${Padding.s};
  border-radius: 8px;
  background: ${Surface.Default.Muted};
  color: ${TextColors.Default};
  font-size: 12px;
  line-height: 1.5;
  word-break: break-word;
`;

const StoryRoot = styled(Flex)`
  color: ${TextColors.Default};
`;

export const Docs: Story = {
  render: () => <StoryPage />,
};
