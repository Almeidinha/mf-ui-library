import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components/molecules";
import { Body, Heading3 } from "components/typography";
import { Margin } from "foundation/spacing";
import { safeCallback } from "helpers/safe-navigation";
import React from "react";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { AlertBanner } from "./alert-banner";

type Variant = "neutral" | "info" | "success" | "warning" | "critical";

type AlertBannerStoryArgs = React.ComponentProps<typeof AlertBanner> & {
  variant?: Variant;
};

const ToggleButton = styled(Button)`
  margin-bottom: ${Margin.s};
`;

const AlertBannerHeading = styled(Heading3)`
  margin-bottom: ${Margin.xs};
`;

const meta: Meta<AlertBannerStoryArgs> = {
  title: "Components/AlertBanner",
  component: AlertBanner,
  parameters: {
    docs: {
      description: {
        component: `
Alert Banners inform users about important changes or persistent conditions.  
Use this component if you need to communicate to users in a prominent way.

---

## How to use

\`\`\`tsx
import { AlertBanner } from './index'

<AlertBanner default>
  <div> Content </div>
</AlertBanner>
\`\`\`

---

### API

| Name | Type | Description |
|------|------|------------|
| dismissible? | boolean | Defines if the user can dismiss alert |
| className? | string | Class to be attached to the Container |
| open? | boolean | Defines if the alert is visible on screen |
| primaryButtonLabel? | string | Text on the primary button |
| secondaryButtonLabel? | string | Text on the secondary button |
| onPrimaryAction? | () => void | Primary button event handler |
| onSecondaryAction? | () => void | Secondary button event handler |
| onClose? | () => void | Callback function invoked to close the alert banner |
| neutral \\| info \\| success \\| warning \\| critical | boolean | Defines the color and icons of the alert |
        `,
      },
    },
  },
  args: {
    variant: "neutral",
    open: true,
    dismissible: false,
    primaryButtonLabel: "",
    secondaryButtonLabel: "",
    onPrimaryAction: () => alert("Primary action clicked"),
    onSecondaryAction: () => alert("Secondary action clicked"),
    onClose: () => alert("Alert closed"),
  },
  argTypes: {
    dismissible: {
      description:
        "Shows a dismiss action so the banner can be closed manually.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    open: {
      description: "Controls whether the alert banner is currently visible.",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    primaryButtonLabel: {
      description: "Label shown on the primary action button when provided.",
      control: "text",
      table: {
        defaultValue: { summary: '""' },
      },
    },
    secondaryButtonLabel: {
      description: "Label shown on the secondary action button when provided.",
      control: "text",
      table: {
        defaultValue: { summary: '""' },
      },
    },
    onPrimaryAction: {
      description: "Called when the primary action button is clicked.",
      action: "primary action",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    onSecondaryAction: {
      description: "Called when the secondary action button is clicked.",
      action: "secondary action",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    onClose: {
      description: "Called when the banner requests to close.",
      action: "close alert",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    variant: {
      description: "Semantic style applied to the banner.",
      control: { type: "select" },
      options: ["neutral", "info", "success", "warning", "critical"],
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    children: {
      description: "Banner body content rendered inside the alert.",
      control: false,
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<AlertBannerStoryArgs>;

export default meta;

type Story = StoryObj<AlertBannerStoryArgs>;

export const Docs: Story = {
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: function Render(args: AlertBannerStoryArgs) {
    const [{ open, onClose, variant }, updateArgs] =
      useArgs<AlertBannerStoryArgs>();

    const variantProp = variant ? { [variant]: true } : {};

    return (
      <AlertBanner
        {...args}
        {...variantProp}
        open={open}
        onClose={() => {
          updateArgs({ open: false });
          safeCallback(onClose);
        }}
      >
        Lorem ipsum dolor sit amet.
      </AlertBanner>
    );
  },
};

export const TypeVariant: Story = {
  render: () => (
    <>
      <AlertBanner>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner info>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner success>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner warning>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner critical>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
    </>
  ),
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};

export const Dismissible: Story = {
  render: function Render() {
    const [{ open, dismissible, variant }, updateArgs] =
      useArgs<AlertBannerStoryArgs>();

    return (
      <>
        <ToggleButton onClick={() => updateArgs({ open: !open })}>
          {`${open ? "Close" : "Open"} the alert banner!`}
        </ToggleButton>
        <AlertBanner
          {...(variant ? { [variant]: true } : {})}
          dismissible={dismissible}
          open={open}
          onClose={() => updateArgs({ open: false })}
        >
          <AlertBannerHeading>Info</AlertBannerHeading>
          <Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu mollis
            viverra duis in scelerisque condimentum aenean sit turpis. Donec
            dictum bibendum non tristique placerat aliquet massa, odi.
          </Body>
        </AlertBanner>
      </>
    );
  },
  args: {
    variant: "info",
  },
  argTypes: {
    onPrimaryAction: { control: false, table: { disable: true } },
    onSecondaryAction: { control: false, table: { disable: true } },
    primaryButtonLabel: { control: false, table: { disable: true } },
    secondaryButtonLabel: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: { disable: true },
  },
};

export const WithActions: Story = {
  render: function Render() {
    const [
      { open, dismissible, variant, primaryButtonLabel, secondaryButtonLabel },
      updateArgs,
    ] = useArgs<AlertBannerStoryArgs>();
    return (
      <AlertBanner
        {...(variant ? { [variant]: true } : {})}
        open={open}
        dismissible={dismissible}
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
        onClose={() => updateArgs({ open: false })}
        onPrimaryAction={() => alert("Nice choice")}
        onSecondaryAction={() => alert("Wrong choice")}
      >
        <AlertBannerHeading>Success</AlertBannerHeading>
        <Body>
          Bacon ipsum dolor amet tongue turducken frankfurter biltong meatloaf
          andouille bresaola jowl. Ham pastrami tongue capicola kielbasa
          prosciutto short ribs flank beef. Pastrami shank venison tri-tip,
          bresaola landjaeger chicken capicola swine kielbasa.
        </Body>
      </AlertBanner>
    );
  },
  args: {
    variant: "success",
    primaryButtonLabel: "Take the blue pill",
    secondaryButtonLabel: "Take the red pill",
  },
  argTypes: {
    onPrimaryAction: { control: false, table: { disable: true } },
    onSecondaryAction: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: { disable: true },
  },
};
