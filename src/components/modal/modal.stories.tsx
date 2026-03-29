import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { Body, BodyLarge } from "components/typography";
import { Surface } from "foundation/colors";
import { TextColors } from "foundation/colors/color-guidelines";
import { Gap, Margin } from "foundation/spacing";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { Modal, ModalProps } from "./modal";
import { ModalDestructive } from "./modal-destructive";

const IconFrame = styled(Flex)`
  background-color: ${Surface.Critical.Pressed};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  justify-content: center;
  margin-bottom: ${Margin.m};
`;

const ExclamationIcon = styled(Icon.TriangleExclamation)`
  path {
    fill: ${TextColors.Critical};
  }
`;

const MainText = styled(Body)`
  margin: ${Margin.m} ${Margin.none} ${Margin.xs};
  text-align: center;
`;

const LongContent = () => (
  <Flex column gap={Gap.m}>
    {Array.from({ length: 18 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Body key={index}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        facilisis, nisl eu aliquam luctus, purus justo faucibus massa, vitae
        volutpat ipsum sem at velit. Section {index + 1}.
      </Body>
    ))}
  </Flex>
);

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `
Modals are overlays that prevent users from interacting with the rest of the platform until a specific action is taken.
It should be used thoughtfully.

---

## How to use

\`\`\`tsx
import { Modal } from "./index";

<Modal
  open={isOpen}
  title="Modal title"
  closeButtonLabel="Close"
  onClose={() => setIsOpen(false)}
>
  <Body>Modal text</Body>
</Modal>
\`\`\`

---

## Sizing

Use:

- \`maxWidth\`
- \`fullWidth\`
- \`fullScreen\`

\`\`\`tsx
<Modal open onClose={handleClose} maxWidth="sm" />
<Modal open onClose={handleClose} maxWidth="900px" />
<Modal open onClose={handleClose} fullWidth maxWidth="md" />
<Modal open onClose={handleClose} fullScreen />
\`\`\`

---

## Scroll behavior

- \`scroll="paper"\` keeps scrolling inside the modal content
- \`scroll="body"\` makes the overlay/container scroll instead

\`\`\`tsx
<Modal open onClose={handleClose} scroll="paper" />
<Modal open onClose={handleClose} scroll="body" />
\`\`\`
        `,
      },
    },
  },
  args: {
    open: false,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    title: "Modal Title",
    children: <p>This is the content of the modal.</p>,
    primaryButtonLabel: "Primary",
    closeButtonLabel: "Close",
    secondaryButtonLabel: "Secondary",
    fullWidth: false,
    fullScreen: false,
    maxWidth: "md",
    scroll: "paper",
    onClose: () => console.log("Modal closed"),
    onOverlayClick: () => console.log("Overlay clicked"),
    onPrimaryAction: () => console.log("Primary action clicked"),
    onSecondaryAction: () => console.log("Secondary action clicked"),
    isPrimaryButtonDisabled: false,
    isPrimaryActionLoading: false,
    customFooter: undefined,
    usePortal: false,
    portalContainer: undefined,
  },
  argTypes: {
    open: {
      description: "Controls whether the modal is open.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    closeOnEsc: {
      description:
        "Whether the modal should close when the Escape key is pressed.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    closeOnOverlayClick: {
      description: "Whether clicking the overlay should close the modal.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },
    title: {
      description:
        "The title of the modal. If not provided, the modal will be labelled as 'Modal' for accessibility purposes.",
      table: {
        category: "Content",
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      description: "Body content rendered inside the modal.",
      table: {
        category: "Content",
        defaultValue: { summary: "undefined" },
      },
    },
    maxWidth: {
      description:
        "Controls the modal max width. Accepts preset tokens, false, or any CSS width value.",
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "md" },
        type: {
          summary: `"xs" | "sm" | "md" | "lg" | "xl" | false | string`,
        },
      },
    },
    fullWidth: {
      description:
        "Makes the modal take the available width up to its maxWidth.",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    fullScreen: {
      description: "Makes the modal occupy the full viewport.",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    scroll: {
      description:
        "Controls where the scroll happens. 'paper' scrolls inside the modal. 'body' scrolls in the overlay/container.",
      control: "inline-radio",
      options: ["paper", "body"],
      table: {
        category: "Layout",
        defaultValue: { summary: "paper" },
      },
    },
    primaryButtonLabel: {
      description: "Label for the primary action button.",
      table: {
        category: "Actions",
        defaultValue: { summary: "undefined" },
      },
    },
    secondaryButtonLabel: {
      description: "Label for the secondary action button.",
      table: {
        category: "Actions",
        defaultValue: { summary: "undefined" },
      },
    },
    closeButtonLabel: {
      description: "Accessible label shown for the close button.",
      table: {
        category: "Actions",
        defaultValue: { summary: "undefined" },
      },
    },
    onPrimaryAction: {
      description: "Called when the primary action button is clicked.",
      table: {
        category: "Actions",
        defaultValue: { summary: "undefined" },
      },
    },
    onSecondaryAction: {
      description: "Called when the secondary action button is clicked.",
      table: {
        category: "Actions",
        defaultValue: { summary: "undefined" },
      },
    },
    isPrimaryButtonDisabled: {
      description: "Disables the primary action button.",
      table: {
        category: "Actions",
        defaultValue: { summary: "false" },
      },
    },
    isPrimaryActionLoading: {
      description: "Shows the loading state on the primary action button.",
      table: {
        category: "Actions",
        defaultValue: { summary: "false" },
      },
    },
    customFooter: {
      description:
        "Custom footer content. When provided, it replaces the default action button layout.",
      control: false,
      table: {
        category: "Footer",
        defaultValue: { summary: "undefined" },
      },
    },
    usePortal: {
      description: "Whether the modal should be rendered in a portal.",
      table: {
        category: "Portal",
        defaultValue: { summary: "false" },
      },
    },
    portalContainer: {
      description:
        "The DOM element where the portal should be rendered. If not provided, it will be rendered in the body element.",
      table: {
        category: "Portal",
        defaultValue: { summary: "document.body" },
      },
    },
    onClose: {
      description: "Called when the modal requests to close.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    onOverlayClick: {
      description: "Called when the overlay is clicked.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalStoryRenderer(args: ModalProps) {
  const [{ open }, updateArgs] = useArgs<ModalProps>();

  return (
    <div style={{ height: 350 }}>
      <Button onClick={() => updateArgs({ open: !open })}>Open Modal</Button>
      <Modal {...args} onClose={() => updateArgs({ open: false })} />
    </div>
  );
}

export const Docs: Story = {
  render: ModalStoryRenderer,
};

export const AsyncAction: Story = {
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs<ModalProps>();

    const triggerAsyncPrimaryAction = () => {
      updateArgs({ isPrimaryActionLoading: true });

      setTimeout(() => {
        updateArgs({ isPrimaryActionLoading: false });
        alert("Primary Action done (:");
      }, 3000);
    };

    return (
      <div style={{ height: 700 }}>
        <Button onClick={() => updateArgs({ open: !open })}>Open Modal</Button>
        <Modal
          {...args}
          onClose={() => updateArgs({ open: false })}
          onPrimaryAction={triggerAsyncPrimaryAction}
        />
      </div>
    );
  },
  args: {
    primaryButtonLabel: "Async Action",
    secondaryButtonLabel: undefined,
  },
};

export const FullWidth: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Full width modal",
    fullWidth: true,
    maxWidth: false,
    children: <LongContent />,
  },
};

export const FullScreen: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Full screen modal",
    fullScreen: true,
    children: <LongContent />,
  },
};

export const MaxWidthPresets: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Preset max width",
    maxWidth: "lg",
    children: <LongContent />,
  },
};

export const CustomMaxWidth: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Custom max width",
    maxWidth: "720px",
    children: <LongContent />,
  },
};

export const ScrollPaper: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Scroll inside the modal",
    scroll: "paper",
    children: <LongContent />,
  },
};

export const ScrollBody: Story = {
  render: ModalStoryRenderer,
  args: {
    title: "Scroll on the overlay/container",
    scroll: "body",
    children: <LongContent />,
  },
};

export const Destructive: Story = {
  render: function Render(args) {
    const [{ closeButtonLabel }, updateArgs] = useArgs<ModalProps>();

    return (
      <div>
        <Flex column gap={Gap.l}>
          <Body>
            This special type of modal is used to confirm destructive actions
            that cannot be undone.
          </Body>
          <Button onClick={() => updateArgs({ open: true })}>
            Open the modal!
          </Button>
        </Flex>

        <ModalDestructive
          {...args}
          closeButtonLabel={closeButtonLabel || "Close"}
          onPrimaryAction={() => {
            alert("Deleted :(");
            updateArgs({ open: false });
          }}
          onClose={() => updateArgs({ open: false })}
          onOverlayClick={() => updateArgs({ open: false })}
        />
      </div>
    );
  },
  args: {
    children: (
      <Flex align="center" column>
        <IconFrame align="center">
          <ExclamationIcon />
        </IconFrame>
        <BodyLarge strong>Delete Account</BodyLarge>
        <MainText muted>
          Are you sure you want to delete your account? All of your data will be
          permanently removed. This action cannot be undone.
        </MainText>
      </Flex>
    ),
    closeButtonLabel: "Get me outta here",
    primaryButtonLabel: "Delete it!",
  },
};
