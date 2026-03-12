import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField as InputFieldBase } from "components/input-field";
import { leftRightLayoutGenerator } from "components/layout";
import { Button } from "components/molecules";
import { Body, BodyLarge, Heading3 } from "components/typography";
import { Margin } from "foundation/spacing";
import styled from "styled-components";

import { Card } from "./card";
import { LeftRightCard } from "./molecules";

const InputField = styled(InputFieldBase)`
  margin-bottom: ${Margin.xxs};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const meta = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <CardWrapper>
        <Story />
      </CardWrapper>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Cards are used to group similar things together.

---

## How to use

\`\`\`tsx
import { Card } from './index'

<Card heading='Heading'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Card>
\`\`\`

---

## API

### Card

Extends HTMLAttributes<HTMLDivElement>

| Prop      | Type       | Description                |
| --------- | ---------- | -------------------------- |
|  heading  |  boolean?  | Adds a heading to the card |

### Card.Section

Extends HTMLAttributes<HTMLDivElement>

| Prop      | Type       | Description                     |
| --------- | ---------- | ------------------------------- |
|  heading  |  boolean?  | Adds a heading to the section   |

### Slots

| Slot            | Description                                                 |
| --------------- | ----------------------------------------------------------- |
|  Controls       | Adds controls to the bottom of the card                     |
|  HeadingAction  | Adds UI directly across from the card or sections's heading |
|  AlertBanner    | Adds an alert banner above the heading                      |
        `,
      },
    },
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    heading: "Card Heading",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: ({ ...args }) => {
    return (
      <>
        <BodyLarge>A simple card with a heading and content.</BodyLarge>
        <Card {...args}></Card>
      </>
    );
  },
};

export const SectionsExample: Story = {
  args: {
    heading: "Card Sections",
    children: (
      <>
        <Card.Section heading="Subheading 1">This is a section.</Card.Section>
        <Card.Section heading="Subheading 2">
          This is another section.
        </Card.Section>
      </>
    ),
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
  render: ({ ...args }) => {
    return (
      <>
        <BodyLarge>You can divide a card`s body up into sections.</BodyLarge>
        <Card {...args}></Card>
      </>
    );
  },
};

export const CardControlsExample: Story = {
  render: () => {
    const handleCancel = () => alert("Cancel");
    const handleConfirm = () => alert("Confirm");
    return (
      <>
        <BodyLarge>Primary controls go on the bottom of the card.</BodyLarge>
        <Body>
          Controls is a slot, so its children will always render in the same
          place regardless of where you use it.
        </Body>
        <Card heading="Card with Controls">
          <Card.Controls>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button primary onClick={handleConfirm}>
              Confirm
            </Button>
          </Card.Controls>
          Notice that the controls render below this text, even though they are
          above this text in the JSX. That`s because Controls is a slot, it is
          only telling Card what we want to render, not where we want to render
          it.
        </Card>
      </>
    );
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};

export const CardHeadingActionExample: Story = {
  args: {
    heading: "Card Heading Action",
    children: (
      <Card.HeadingAction>
        <Button>Deactivate</Button>
      </Card.HeadingAction>
    ),
  },
  argTypes: {
    children: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: { disable: true },
  },
};

export const SectionsHeadingActionsExample: Story = {
  args: {
    heading: "Card Heading Action",
    children: (
      <>
        <Card.HeadingAction>
          <Button>Action</Button>
        </Card.HeadingAction>

        <Card.Section heading="Subheading 1">
          This is a section.
          <Card.HeadingAction>
            <Button>Action</Button>
          </Card.HeadingAction>
        </Card.Section>

        <Card.Section heading="Subheading 2">
          This is another section.
          <Card.HeadingAction>
            <Button>Action</Button>
          </Card.HeadingAction>
        </Card.Section>
      </>
    ),
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
  render: ({ ...args }) => {
    return (
      <>
        <BodyLarge>Any heading in a Card can have an action.</BodyLarge>
        <Body>
          HeadingAction is a slot, so its children will always render in the
          same place regardless of where you use it.
        </Body>
        <Card {...args}></Card>
      </>
    );
  },
};

export const AlertBannerExample: Story = {
  args: {
    heading: "Card Heading",
    children: (
      <>
        Disaster can strike at any moment.
        <Card.AlertBanner info>
          Seriously though, do not try this at home...
        </Card.AlertBanner>
      </>
    ),
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
  render: ({ ...args }) => {
    return (
      <>
        <BodyLarge>You can grab the user`s attention with a banner.</BodyLarge>
        <Body>
          AlertBanner is a slot, so its children will always render in the same
          place regardless of where you use it.
        </Body>
        <Card {...args}></Card>
      </>
    );
  },
};

export const LeftRightLayoutExample: Story = {
  render: () => {
    const { Layout } = leftRightLayoutGenerator();

    return (
      <>
        <BodyLarge>
          You can add a layout to a card. In this case we`ve added a 1:2 ratio
          left/right layout.
        </BodyLarge>

        <Card heading="Layout Example">
          <Layout>
            <Layout.Left>
              <Heading3>Personal Information</Heading3>
              <Body subdued>
                This information will be seen by whoever is viewing this card.
              </Body>
            </Layout.Left>
            <Layout.Right>
              <form id="my-form" onSubmit={(e) => e.preventDefault()}>
                <InputField label="First name" />
                <InputField label="Last name" />
                <InputField type="email" required label="Email" />
              </form>
            </Layout.Right>
          </Layout>
          <Card.Controls>
            <Button>Cancel</Button>
            <Button form="my-form" type="submit" primary>
              Confirm
            </Button>
          </Card.Controls>
        </Card>
      </>
    );
  },
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};

export const LeftRightCardExample: Story = {
  render: () => (
    <>
      <BodyLarge>
        You can add a layout to a card. In this case we`ve added a 1:2 ratio
        left/right layout.
      </BodyLarge>
      <LeftRightCard
        heading="Personal Information"
        helpText="This information will be seen by whoever is viewing this card."
      >
        <LeftRightCard.Right>
          <form id="my-form-2" onSubmit={(e) => e.preventDefault()}>
            <InputField label="First name" />
            <InputField label="Last name" />
            <InputField type="email" required label="Email" />
          </form>
        </LeftRightCard.Right>
        <LeftRightCard.Controls>
          <Button>Cancel</Button>
          <Button form="my-form-2" type="submit" primary>
            Confirm
          </Button>
        </LeftRightCard.Controls>
      </LeftRightCard>
    </>
  ),
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};
