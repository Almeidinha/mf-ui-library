import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { BodyLarge } from "components/typography";
import { Gap } from "foundation/spacing";

import { Flag } from "./flag";
import { CountryList } from "./helpers/country-codes";

const meta = {
  title: "Components/Flag",
  component: Flag,
  parameters: {
    layout: "centered",
  },
  args: {
    code: "BR",
  },
  argTypes: {
    code: {
      description: "ISO country code used to render the matching flag.",
      control: {
        type: "select",
        labels: Object.fromEntries(Object.entries(CountryList)),
      },
      options: Object.keys(CountryList).map((key) => key),
      table: {
        category: "Content",
        defaultValue: {
          summary: "BR",
        },
      },
    },
  },
} satisfies Meta<typeof Flag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <Flex gap={Gap.xl}>
        <Flex column style={{ alignItems: "center" }}>
          <BodyLarge>Small</BodyLarge>
          <Flag code={args.code} small />
        </Flex>
        <Flex column style={{ alignItems: "center" }}>
          <BodyLarge>Medium</BodyLarge>
          <Flag code={args.code} medium />
        </Flex>
        <Flex column style={{ alignItems: "center" }}>
          <BodyLarge>Large</BodyLarge>
          <Flag code={args.code} large />
        </Flex>
      </Flex>
    );
  },
};
