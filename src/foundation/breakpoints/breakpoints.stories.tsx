import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card";
import { Body, Heading3, Label } from "components/typography";
import { Margin, Padding } from "foundation/spacing";
import { useMediaQuery } from "hooks/useMediaQuery";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { type MfUITheme, theme } from "theme/theme";

const styledCodeExample = [
  "const Panel = styled.div`",
  "  padding: 16px;",
  "",
  '  ${({ theme }) => theme.breakpoints.up("md")} {',
  "    padding: 24px;",
  "  }",
  "`;",
].join("\n");

const docsDescription = [
  "## How to use",
  "",
  "```ts",
  "import { breakpoints, useMediaQuery } from '@almeidinha/mfui'",
  "",
  "const isTabletUp = useMediaQuery(breakpoints.up('md'))",
  "```",
  "",
  "## Styled-components",
  "",
  "```ts",
  "const Panel = styled.div`",
  '  ${({ theme }) => theme.breakpoints.up("md")} {',
  "    display: grid;",
  "    grid-template-columns: 1fr 1fr;",
  "  }",
  "`",
  "```",
].join("\n");

const Page = styled.div`
  display: grid;
  gap: ${Margin.xl};
  padding: ${Padding.l};
  max-width: 960px;
`;

const Section = styled.section`
  display: grid;
  gap: ${Margin.m};
`;

const CodeBlock = styled(Card)`
  background: #f3f4f6;
  overflow-x: auto;
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${Margin.s};
`;

const ValueCard = styled(Card)`
  background: #f9fafb;
`;

const ResponsiveCard = styled(Card)`
  background: #dbeafe;
  border: 1px solid #93c5fd;

  ${({ theme }: { theme: MfUITheme }) => theme.breakpoints.up("md")} {
    background: #dcfce7;
    border-color: #86efac;
  }

  ${({ theme }: { theme: MfUITheme }) => theme.breakpoints.up("xl")} {
    background: #fef3c7;
    border-color: #fcd34d;
  }
`;

function BreakpointValuesExample() {
  return (
    <ValueGrid>
      {theme.breakpoints.keys.map((key) => (
        <ValueCard key={key}>
          <Label>{key}</Label>
          <Body>{theme.breakpoints.values[key]}px</Body>
        </ValueCard>
      ))}
    </ValueGrid>
  );
}

function HookExample() {
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));
  const isDesktopOnly = useMediaQuery(theme.breakpoints.only("lg"));

  return (
    <ValueGrid>
      <ValueCard>
        <Label>useMediaQuery(theme.breakpoints.up(&quot;md&quot;))</Label>
        <Body>{String(isTabletUp)}</Body>
      </ValueCard>
      <ValueCard>
        <Label>useMediaQuery(theme.breakpoints.only(&quot;lg&quot;))</Label>
        <Body>{String(isDesktopOnly)}</Body>
      </ValueCard>
    </ValueGrid>
  );
}

const ThemeExample = () => {
  const resolvedTheme = useTheme() as MfUITheme;

  return (
    <Section>
      <Body>
        Current query for <code>theme.breakpoints.up(&quot;md&quot;)</code>:
        {resolvedTheme.breakpoints.up("md")}
      </Body>
      <ResponsiveCard>
        Resize the viewport. This card uses <code>theme.breakpoints.up()</code>
        inside styled-components.
      </ResponsiveCard>
      <CodeBlock>
        <pre>{styledCodeExample}</pre>
      </CodeBlock>
    </Section>
  );
};

const meta = {
  title: "Foundations/Breakpoints",
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
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <Page>
        <Section>
          <Heading3>Breakpoint values</Heading3>
          <Body>
            Breakpoints are shared between component code and styled-components
            so the same responsive rules can be reused everywhere.
          </Body>
          <BreakpointValuesExample />
        </Section>

        <Section>
          <Heading3>Hook usage</Heading3>
          <Body>
            Use <code>useMediaQuery</code> with the exported breakpoint helpers
            in React component code.
          </Body>
          <HookExample />
        </Section>

        <Section>
          <Heading3>Theme usage</Heading3>
          <Body>
            The same breakpoint helpers are exposed on the styled-components
            theme.
          </Body>
          <ThemeExample />
        </Section>
      </Page>
    </ThemeProvider>
  ),
};
