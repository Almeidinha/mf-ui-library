import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import {
  Shadow,
  Shadow2Xl,
  ShadowInner,
  ShadowLg,
  ShadowMd,
  ShadowSm,
  ShadowXl,
} from "./components";

const Table = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    text-align: center;
    border: 1px solid gray;
    border-bottom: none;
    padding: 8px 16px;
    width: 200px;
  }

  & > div:last-child {
    border-bottom: 1px solid gray;
  }
`;

const meta = {
  title: "Foundations/Shadows",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
# Shadows

## How to use

\`\`\`ts
// Import the shadow you'd like to use
import { shadowSm } from './shadows';

import styled from 'styled-components';

const ShadowSm = styled.div\`
  \${shadowSm}
\`
\`\`\`
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <ShadowSm>shadowSm</ShadowSm>
        <Shadow>shadow</Shadow>
        <ShadowMd>shadowMd</ShadowMd>
        <ShadowLg>shadowLg</ShadowLg>
        <ShadowXl>shadowXl</ShadowXl>
        <Shadow2Xl>shadow2Xl</Shadow2Xl>
        <ShadowInner>shadowInner</ShadowInner>
      </div>
      <Table>
        <h3>List of Values</h3>
        <div>Name</div>
        <div>
          <code>shadowSm</code>
        </div>
        <div>
          <code>shadow</code>
        </div>
        <div>
          <code>shadowMd</code>
        </div>
        <div>
          <code>shadowLg</code>
        </div>
        <div>
          <code>shadowXl</code>
        </div>
        <div>
          <code>shadow2Xl</code>
        </div>
        <div>
          <code>shadowInner</code>
        </div>
      </Table>
    </>
  ),
};
