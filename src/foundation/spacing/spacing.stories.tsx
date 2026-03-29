import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card";
import { Flex } from "components/layout";
import { Body, Heading2, Label } from "components/typography";
import { Borders, Surface, TextColors } from "foundation/colors";
import { Gap, Margin, Padding } from "foundation/spacing";
import styled from "styled-components";

import { SPACING } from "./spacing";

const docsDescription = `
Spacing tokens are built around an 8px rhythm and are reused across padding,
margin, gap, width, and height decisions.

\`\`\`ts
import { Gap, Padding } from "foundation/spacing";

const Stack = styled.div\`
  gap: \${Gap.m};
  padding: \${Padding.l};
\`;
\`\`\`

Prefer semantic aliases like \`Padding.m\` or \`Gap.l\` in components instead of
reaching for raw pixel strings directly.
`;

const meta = {
  title: "Foundations/Layout/Spacing",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const scaleEntries = Object.entries(SPACING);

const semanticGroups = [
  { title: "Padding", tokens: Padding },
  { title: "Margin", tokens: Margin },
  { title: "Gap", tokens: Gap },
] as const;

const DocsContent = () => {
  return (
    <Page column>
      <Body>
        The spacing scale is grounded on an 8px rhythm, with a few smaller steps
        for tighter UI density.
      </Body>

      <Section>
        <Heading2>Scale</Heading2>
        <Body>
          Raw spacing tokens are useful for reference. In most components, prefer
          semantic aliases like <code>Padding.m</code> and <code>Gap.s</code>.
        </Body>
        <ScaleList>
          {scaleEntries.map(([name, value]) => (
            <ScaleRow key={name}>
              <TokenLabel>
                <Label strong>{name}</Label>
                <Body>{value}</Body>
              </TokenLabel>
              <BarFrame>
                <ScaleBar $width={parseInt(value, 10)} />
              </BarFrame>
            </ScaleRow>
          ))}
        </ScaleList>
      </Section>

      <Section>
        <Heading2>Semantic Aliases</Heading2>
        <Body>
          These aliases keep spacing intent readable in component code.
        </Body>
        <AliasGrid>
          {semanticGroups.map((group) => (
            <Card key={group.title}>
              <Card.Section>
                <Flex column style={{ gap: 12 }}>
                  <Label strong>{group.title}</Label>
                  {Object.entries(group.tokens).map(([token, value]) => (
                    <AliasRow key={`${group.title}-${token}`}>
                      <code>{token}</code>
                      <span>{String(value)}px</span>
                    </AliasRow>
                  ))}
                </Flex>
              </Card.Section>
            </Card>
          ))}
        </AliasGrid>
      </Section>

      <Section>
        <Heading2>Usage Examples</Heading2>
        <ExampleGrid>
          <Card>
            <Card.Section>
              <Flex column style={{ gap: 16 }}>
                <Label strong>Stack With Gap</Label>
                <Body>
                  Good for vertical groups where the relationship between items
                  matters more than container padding.
                </Body>
                <StackExample>
                  <ExampleTile>First</ExampleTile>
                  <ExampleTile>Second</ExampleTile>
                  <ExampleTile>Third</ExampleTile>
                </StackExample>
              </Flex>
            </Card.Section>
          </Card>

          <Card>
            <Card.Section>
              <Flex column style={{ gap: 16 }}>
                <Label strong>Padded Surface</Label>
                <Body>
                  Use padding to create interior breathing room for content inside
                  a card or panel.
                </Body>
                <PaddedExample>
                  <Label strong>Card content</Label>
                  <Body>Padding uses the same shared spacing scale.</Body>
                </PaddedExample>
              </Flex>
            </Card.Section>
          </Card>
        </ExampleGrid>
      </Section>
    </Page>
  );
};

const Page = styled(Flex)`
  max-width: 1100px;
  gap: ${Margin.xl};
  padding: ${Padding.l};
  color: ${TextColors.Default};
`;

const Section = styled.section`
  display: grid;
  gap: ${Margin.m};
`;

const ScaleList = styled.div`
  display: grid;
  gap: ${Margin.s};
`;

const ScaleRow = styled.div`
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: ${Margin.m};
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`;

const TokenLabel = styled.div`
  display: grid;
  gap: 4px;
`;

const BarFrame = styled.div`
  min-height: 28px;
  display: flex;
  align-items: center;
  padding: 0 ${Padding.s};
  border-radius: 999px;
  background: ${Surface.Default.Muted};
  border: 1px solid ${Borders.Default.Muted};
`;

const ScaleBar = styled.div<{ $width: number }>`
  height: 14px;
  width: ${({ $width }) => `${$width}px`};
  min-width: 2px;
  border-radius: 999px;
  background: ${Surface.Highlight.Active};
`;

const AliasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${Margin.m};
`;

const AliasRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${Margin.s};
  padding: ${Padding.s} 0;
  border-bottom: 1px solid ${Borders.Default.Muted};
  color: ${TextColors.Default};

  &:last-child {
    border-bottom: none;
  }

  span {
    color: ${TextColors.Muted};
  }
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${Margin.l};
`;

const StackExample = styled.div`
  display: grid;
  gap: ${Gap.m};
`;

const ExampleTile = styled.div`
  padding: ${Padding.m};
  border-radius: 12px;
  border: 1px solid ${Borders.Default.Muted};
  background: ${Surface.Default.Muted};
  color: ${TextColors.Default};
`;

const PaddedExample = styled.div`
  display: grid;
  gap: ${Gap.s};
  padding: ${Padding.l};
  border-radius: 16px;
  border: 1px solid ${Borders.Default.Default};
  background: ${Surface.Default.Muted};
`;

export const Docs: Story = {
  render: () => <DocsContent />,
};
