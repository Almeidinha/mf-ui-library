import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { Body, BodyLarge } from "components/typography";
import { Surface } from "foundation/colors";
import { Text } from "foundation/colors/color-guidelines";
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
    fill: ${Text.Critical};
  }
`;

const MainText = styled(Body)`
  margin: ${Margin.m} ${Margin.none} ${Margin.xs};
  text-align: center;
`;

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
import { Modal } from './index'

<Modal
  open={isOpen}
  closeButtonLabel="Close me"
  onClose={() => setIsOpen(false)}
>
  <Body>Modal text</Body>
</Modal>
\`\`\`

        `,
      },
    },
  },
  args: {
    open: false,
    closeOnEsc: true,
    title: "Modal Title",
    children: <p>This is the content of the modal.</p>,
    primaryButtonLabel: "Primary",
    closeButtonLabel: "Close",
    secondaryButtonLabel: "Secondary",
    modalSize: "default",
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
        defaultValue: { summary: "false" },
      },
    },
    closeOnEsc: {
      description:
        "Whether the modal should close when the Escape key is pressed.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    title: {
      description:
        "The title of the modal. If not provided, the modal will be labelled as 'Modal' for accessibility purposes.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    modalSize: {
      description: "The size of the modal.",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    usePortal: {
      description: "Whether the modal should be rendered in a portal.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    portalContainer: {
      description:
        "The DOM element where the portal should be rendered. If not provided, it will be rendered in the body element.",
      table: {
        defaultValue: { summary: "document.body" },
      },
    },
    children: {
      description: "Body content rendered inside the modal.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    onClose: {
      description: "Called when the modal requests to close.",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs<ModalProps>();
    return (
      <div style={{ height: 500 }}>
        <Button onClick={() => updateArgs({ open: !open })}>Open Modal</Button>
        <Modal {...args} onClose={() => updateArgs({ open: false })} />
      </div>
    );
  },
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
      <div style={{ height: 500 }}>
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
        ></ModalDestructive>
      </div>
    );
  },
  args: {
    children: (
      <Flex center column>
        <IconFrame center>
          <ExclamationIcon />
        </IconFrame>
        <BodyLarge strong>Delete Account</BodyLarge>
        <MainText subdued>
          Are you sure you want to delete your account? All of your data will be
          permanently removed. This action cannot be undone.
        </MainText>
      </Flex>
    ),
    closeButtonLabel: "Get me outta here",
    primaryButtonLabel: "Delete it!",
  },
};
