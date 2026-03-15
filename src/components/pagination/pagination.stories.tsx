import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { useArgs } from "storybook/internal/preview-api";

import { IPaginationProps, Pagination } from "./pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

Pagination is a component that receives a page number, a total amount of pages,
and a onChange function to act whenever the pagination changes.

## How to use

\`\`\`javascript
import { Pagination } from './index'

<Pagination />
\`\`\`

## API

Extends \`InputHTMLAttributes<HTMLInputElement>\`

| Name                      | Type                          | Description                                     |
| ------------------------- | ----------------------------- | ----------------------------------------------- |
| \`page\`                  | \`number\`                    | The page currently selected on the pagination   |
| \`totalPages\`            | \`number\`                    | The amount of pages that are available          |
| \`pageSize?\`             | \`number\`                    | The number of items per page                    |
| \`showPageSizeSelector?\` | \`boolean\`                   | Display a page size selector                    |
| \`pageSizeOptions?\`      | \`readonly number[]\`         | The options available for page size selection   |
| \`showPageInfo?\`         | \`boolean\`                   | Display a page indicator                        |
| \`onChange\`              | \`(page: number) => void\`    | You can listen the changes from the component   |
| \`onPageSizeChange\`     | \`(pageSize: number) => void\` | You can listen the changes from the component   |

        `,
      },
    },
  },
  args: {
    page: 1,
    totalPages: 100,
    showPageInfo: true,
    previousLabel: "",
    nextLabel: "",
    pageSize: 10,
    showPageSizeSelector: false,
    pageSizeOptions: [5, 10, 20, 50, 100],
  },
  argTypes: {
    page: {
      description: "Current page in the controlled pagination state.",
      table: {
        category: "Controlled state",
        defaultValue: {
          summary: "1",
        },
      },
    },
    totalPages: {
      description: "Total number of available pages.",
      table: {
        category: "Behavior",
        defaultValue: {
          summary: "100",
        },
      },
    },
    showPageInfo: {
      description: "Displays the current page indicator next to the controls.",
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "true",
        },
      },
    },
    previousLabel: {
      description: "Optional text label for the previous-page control.",
      table: {
        category: "Content",
        defaultValue: {
          summary: '""',
        },
      },
    },
    nextLabel: {
      description: "Optional text label for the next-page control.",
      table: {
        category: "Content",
        defaultValue: {
          summary: '""',
        },
      },
    },
    pageSize: {
      description: "Currently selected page size.",
      table: {
        category: "Page size",
        defaultValue: {
          summary: "10",
        },
      },
    },
    showPageSizeSelector: {
      description: "Shows a page size picker next to the pagination controls.",
      table: {
        category: "Page size",
        defaultValue: {
          summary: "false",
        },
      },
    },
    pageSizeOptions: {
      description: "Available options displayed in the page size selector.",
      table: {
        category: "Page size",
        defaultValue: {
          summary: "[5, 10, 20, 50, 100]",
        },
      },
    },
    onChange: {
      description: "Called when the current page changes.",
      table: {
        category: "Events",
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    onPageSizeChange: {
      description: "Called when the selected page size changes.",
      table: {
        category: "Events",
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ page, pageSize }, updateArgs] = useArgs<IPaginationProps>();

    return (
      <Flex style={{ height: 220, alignItems: "end" }}>
        <Pagination
          {...args}
          page={page}
          pageSize={pageSize}
          onChange={(newPage) => updateArgs({ page: newPage })}
          onPageSizeChange={(newPageSize) =>
            updateArgs({ pageSize: newPageSize })
          }
        />
      </Flex>
    );
  },
};
