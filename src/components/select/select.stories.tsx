import type { Meta, StoryObj } from "@storybook/react";
import { Flag } from "components/flag";
import { CountryList } from "components/flag/helpers/country-codes";
import { CountryCodes } from "components/flag/types";
import { IconMinor } from "components/icon";
import { InputText } from "components/input-field";
import { Flex } from "components/layout";
import { Body, Heading4, Label } from "components/typography";
import { Borders, Icons, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Margin, Padding } from "foundation/spacing";
import { If } from "helpers/nothing";
import {
  is,
  isDefined,
  isEmpty,
  isNil,
  safeArray,
  toArray,
} from "helpers/safe-navigation";
import useDebounce from "hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useArgs } from "storybook/internal/preview-api";
import styled from "styled-components";

import { MenuList } from "./components/menu-list";
import { Select } from "./select";
import {
  IOption,
  ISelectProps,
  LabelComponentProps,
  MenuComponentProps,
  SelectLabelComponent,
  SelectMenuComponent,
} from "./types";

interface IValue {
  id: string;
  value: string;
}

type ICountryValue = {
  code: string;
  value: string;
};

const options1: IOption<string>[] = [
  {
    label: "Yu Yu Hakusho",
    value: "01",
    helperText: "A classic 90's anime",
    icon: <IconMinor.StarSolid />,
  },
  {
    label: "Neon Genesis Evangelion",
    value: "02",
    helperText: "A groundbreaking mecha anime",
    icon: <IconMinor.StarSolid />,
  },
  {
    label: "Dragon Ball Z",
    value: "03",
    helperText: "A popular action-packed anime",
    icon: <IconMinor.FireBurner />,
  },
  {
    label: "Legend of Heavenly Sphere Shurato",
    value: "04",
    helperText: "A lesser-known but intriguing anime",
    icon: <IconMinor.StarSolid />,
  },
  {
    label: "Ronin Warriors",
    value: "05",
    helperText: "A cult classic with samurai armor",
    icon: <IconMinor.StarSolid />,
  },
  {
    label: "Knights of the Zodiac",
    value: "06",
    helperText: "A beloved anime about mystical warriors",
    icon: <IconMinor.Heart />,
  },
  {
    label: "Rurouni Kenshin",
    value: "07",
    helperText: "A historical anime with a wandering swordsman",
    icon: <IconMinor.StarSolid />,
  },
  {
    label: "Avatar the Last Airbender",
    value: "08",
    helperText: "An acclaimed Western anime-inspired series",
    icon: <IconMinor.StarSolid />,
  },
];

const options2: IOption<IValue>[] = [
  {
    value: { id: "BR", value: "Brasil" },
    label: "Brasil",
    code: "BR",
  },
  {
    value: { id: "CA", value: "Canada" },
    label: "Canada",
    code: "CA",
  },
  {
    value: { id: "MX", value: "Mexico" },
    label: "Mexico",
    code: "MX",
  },
  {
    value: { id: "US", value: "United States" },
    label: "United States",
    code: "US",
  },
];

const options3: IOption<string>[] = [
  {
    value: "Brasil",
    label: "Brasil",
    icon: <IconMinor.MugTea color={Icons.Success} />,
    helperText: "Largest in the South America",
  },
  {
    value: "Canada",
    label: "Canada",
    icon: <IconMinor.FireBurner color={Icons.Highlight} />,
    helperText: "Very very cold",
  },
  {
    value: "Mexico",
    label: "Mexico",
    icon: <IconMinor.PersonPraying color={Icons.Warning} />,
    helperText: "Really hot food!",
  },
  {
    value: "United States",
    label: "United States",
    icon: <IconMinor.StarSolid color={Icons.Critical} />,
    helperText: "Land of the Free",
  },
];

const options4: IOption<IValue>[] = [
  {
    value: { id: "BR", value: "Brasil" },
    label: "Brasil",
    code: "BR",
    options: [
      {
        value: { id: "MG", value: "Minas Gerais" },
        label: "Minas Gerais",
        code: "MG",
      },
      {
        value: { id: "SP", value: "São Paulo" },
        label: "São Paulo",
        code: "SP",
      },
      {
        value: { id: "RJ", value: "Rio de Janeiro" },
        label: "Rio de Janeiro",
        code: "RJ",
      },
      {
        value: { id: "ES", value: "Espírito Santo" },
        label: "Espírito Santo",
        code: "ES",
      },
      {
        value: { id: "BA", value: "Bahia" },
        label: "Bahia",
        code: "BA",
      },
    ],
  },
  {
    value: { id: "CA", value: "Canada" },
    label: "Canada",
    code: "CA",
    options: [
      {
        value: { id: "AB", value: "Alberta" },
        label: "Alberta",
        code: "AB",
      },
      {
        value: { id: "BC", value: "British Columbia" },
        label: "British Columbia",
        code: "BC",
      },
      {
        value: { id: "ON", value: "Ontario" },
        label: "Ontario",
        code: "ON",
      },
      {
        value: { id: "QC", value: "Quebec" },
        label: "Quebec",
        code: "QC",
      },
    ],
  },
  {
    value: { id: "IE", value: "Ireland" },
    label: "Ireland",
    code: "IE",
  },
  {
    value: { id: "MX", value: "Mexico" },
    label: "Mexico",
    code: "MX",
    options: [
      {
        value: { id: "AG", value: "Aguascalientes" },
        label: "Aguascalientes",
        code: "AG",
      },
      {
        value: { id: "BC", value: "Baja California" },
        label: "Baja California",
        code: "BC",
      },
      {
        value: { id: "BS", value: "Baja California Sur" },
        label: "Baja California Sur",
        code: "BS",
      },
    ],
  },
  {
    value: { id: "PT", value: "Portugal" },
    label: "Portugal",
    code: "PT",
  },
  {
    value: { id: "US", value: "United States" },
    label: "United States",
    code: "US",
  },
];

const countryList: IOption<ICountryValue>[] = (
  Object.keys(CountryList) as CountryCodes[]
).map((code) => ({
  label: CountryList[code],
  value: {
    code: code,
    value: CountryList[code],
  },
}));

const CustomListFrame = styled.div`
  border: 1px solid ${Borders.Default.Subdued};
  background-color: ${Surface.Default.Default};
  position: absolute;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${Surface.Neutral.Default};
    min-height: 50px;
  }
  ${shadowMd};
`;

const CustomRow = styled.div<{ active?: boolean }>`
  border: none;
  text-align: left;
  border: 1px solid ${Borders.Default.Subdued};
  margin: ${Margin.xxxs};
  border-radius: 6px;
  background-color: ${(props) =>
    is(props.active) ? Surface.Selected.Default : Surface.Default.Default};

  &:hover {
    background-color: ${Surface.Default.Hover};
  }

  &:hover {
    background-color: ${(props) =>
      is(props.active) ? Surface.Selected.Hover : Surface.Default.Hover};
  }

  &:active {
    background-color: ${(props) =>
      is(props.active) ? Surface.Selected.Pressed : Surface.Default.Pressed};
  }
`;

const LabelWrapper = styled(Label)`
  cursor: pointer;
  padding: ${Padding.xxs} ${Padding.xs};
  margin-left: ${Margin.l};
`;

const SupportText = styled(LabelWrapper)`
  padding-top: ${Padding.none};
`;

const IconWraper = styled.div`
  position: relative;
  top: 4px;
  left: 6px;
  & i {
    position: absolute;
  }
`;

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
[\`Jump to Playground\`](#anchor--primary--components-select--docs)
## How to use

\`\`\`tsx
import { select } from './index'

<Select />
\`\`\`

---

## API
### \`Select : ISelectProps<T>\`
  
| Prop                                   | Type                                                                | Description                                                           |
| -------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| \`className?\`                         | \`string\`                                                          | A Class name to be added to the wrapper                               |
| [\`options?\`](#option)                | \`IOption<T>[]\`                                                    | A list of values to be selected                                       |
| \`value?\`                             | \`T\` \\| \`T[]\`                                                    | The current value selected                                            |
| \`placeholder?\`                       | \`string\`                                                          | The placeholder to be displayed                                       |
| \`emptyText?\`                         | \`string\`                                                          | The text to be displayed when there are no values                     |
| \`clearable?\`                         | \`boolean\`                                                         | Allow the selected value to be cleared                                |
| \`searchable?\`                        | \`boolean\`                                                         | Enable search in the select (always true if onInputChange is defined) |
| \`iconPosition?\`                      | \`left\` \\| \`right\`                                               | The position where the icon should be rendered                        |
| \`disabled?\`                          | \`boolean\`                                                         | Disable the component                                                 |
| \`multi?\`                             | \`boolean\`                                                         | Enable multi selection                                                |
| \`invalid?\`                           | \`boolean\`                                                         | Indicate there's an error in the component                            |
| \`multiLevel?\`                        | \`boolean\`                                                         | Indicates that the options in the select can have children options    |
| \`rowHeight?\`                         | \`number\`                                                          | The height of the fields, defaults to 38px                            |
| \`menuHeight?\`                        | \`number\`                                                          | The height of the menu, defaults to 190px                             |
| \`menuPosition?\`                      | \`top\` \\| \`bottom\`                                               | The position where the menu should be rendered                        |
| \`menuTitle?\`                         | \`string\`                                                          | Menu title when using the [Customized Menu](#fancy-menu)              |
| \`label?\`                             | \`string\`                                                          | The Label of the select                                               |
| \`labelPosition?\`                     | \`top\` \\| \`side\`                                                 | The position where the label should be rendered                       |
| [\`menuComponent?\`](#menuComponent)   | \`JSX.Element<IMenuComponentProps<T>>\`                             | Replaces the default List Menu component                              |
| [\`labelComponent?\`](#labelComponent) | \`JSX.Element<SelectLabelComponent>\`                             | Replaces the default Label component                                  |
| \`maxLength?\`                         | \`number\`                                                          | The maxLength of the select                                           |
| \`onChange?\`                          | \`(value: T[]\` \\| \`T\` \`undefined, option?: IOption<T>) => void\` | Called when an option is changed                                  |
| \`onSearch?\`                          | \`(value: string) => void\`                                         | Called when the search is triggers                                    |
| \`onOpen?\`                            | \`() => void\`                                                      | Called when the menu opens                                            |
| \`onClose?\`                           | \`() => void\`                                                      | Called when the menu closes                                           |
| \`onInputChange?\`                     | \`() => string\`                                                    | Called when the user types something, returns the value typed         |


<div id="option"></div>
### \`option: IOption\`
The options property expects an array of objects of a type:
\`\`\`tsx
{
    label: string,
    value: T | T[],
}
\`\`\`

| Prop              | Type           | Description                                     |
| ----------------- | -------------- | ----------------------------------------------- |
| value             | T              | The Option value                                |
| label             | string         | The Option label to be displayed                |
| disabled?         | boolean        | Whether the option is disabled (not implemented)|
| [key: string]     | any            | key to the custom properties                    |


<div id="menuComponent"></div>
### \`menuComponent: IMenuComponentProps\`
When using the custom menuComponent, the select exposes this properties.

| Prop              | Type                                                        | Description                                    |
| ----------------- | ------------------------------------------------------------| --------------------------------------------- |
| \`options\`         | \`IOption<T>[]\`                                          | The list of values of the selected            |
| \`value\`           | \`T\` \\| \`T[]\`                                         | The Selected Value                           |
| \`labelComponent\`  | \`JSX.Element<SelectLabelComponent>\`                   | The Select Label Component                    |
| \`emptyText\`       | \`string\`                                                | Text displayed when there are no values       |
| \`multi\`           | \`boolean\`                                               | Indicate multi selection is active            |
| \`rowHeight\`       | \`number\`                                                | The height of the fields                      |
| \`menuHeight\`      | \`number\`                                                | The height of the menu                        |
| \`menuPosition\`    | \`top\` \\| \`bottom\`                                    | The position of the menu                     |
| \`invalid\`         | \`boolean\`                                               | Indicate an error in the component            |
| \`selectedIndex?\`  | \`number\`                                                | The index of the Selected Item                |
| \`open\`            | \`boolean\`                                               | Indicates if the menu is open                 |
| \`search?\`         | \`string\`                                                | The string typed in the search field          |
| \`labelPosition?\`  | \`string\`                                                | The position where the label                  |
| \`label?\`          | \`string\`                                                | The Label of the select                       |
| \`onSelect\`        |\`(value: T extends any[] ? T[] : T, option?: T) => void\` | Triggers when the selected option changes     |

<div id="labelComponent"></div>
### \`labelComponent: LabelComponentProps extends IOption\`
| Prop              | Type            | Description                                                   |
| ----------------- | --------------- | ------------------------------------------------------------- |
| \`active\`        | \`boolean\`     | indicates the option is active                                |
| \`type\`          | \`value-single\` \\| \`value-multi\` \\| \`option\` | used to style accordingly |
| \`label\`         | \`string\`     | The label of the option                                        |
| \`disabled\`      | \`boolean\`    | Indicates if the option is disabled                            |
| \`icon\`          | \`React.ReactNode\` | The icon of the option                                    |
| [key: string]     | any            | key to the custom properties                                   |


\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
      { label: "Option 4", value: "option4" },
    ],
    value: undefined,
    label: "Select an option",
    onChange: (value) => {
      console.log("Selected value:", value);
    },
    multi: false,
    searchable: false,
    clearable: false,
    disabled: false,
    invalid: false,
    menuPosition: "bottom",
    labelPosition: "top",
    iconPosition: "right",
    placeholder: "Select something...",
    emptyText: "Nothing found here...",
    disablePortal: true,
    portalContainer: undefined,
    portalPlacement: "bottom-start",
    portalOffset: 4,
    viewportPadding: 8,
    matchAnchorWidth: true,
  },
  argTypes: {
    onChange: {
      action: "changed",
      description: "Called when the selected value changes.",
      table: {
        category: "Events",
        disable: true,
      },
    },
    options: {
      description: "Options displayed in the select menu.",
      control: false,
      table: {
        category: "Data",
        defaultValue: {
          summary: "4 demo options",
        },
      },
    },
    value: {
      description:
        "Controlled selected value. Use a single value or an array when multi-select is enabled.",
      table: {
        category: "Controlled state",
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    label: {
      description: "Label displayed for the select field.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Select an option",
        },
      },
    },
    multi: {
      description: "Allows selecting more than one option.",
      table: {
        category: "Behavior",
        defaultValue: {
          summary: "false",
        },
      },
    },
    searchable: {
      description: "Adds a search input to filter the available options.",
      table: {
        category: "Behavior",
        defaultValue: {
          summary: "false",
        },
      },
    },
    clearable: {
      description: "Adds a control to clear the current selection.",
      table: {
        category: "Behavior",
        defaultValue: {
          summary: "false",
        },
      },
    },
    disabled: {
      description: "Disables the select and prevents interaction.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    invalid: {
      description: "Applies invalid styling to the select control.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },
    menuPosition: {
      description:
        "Preferred vertical position of the menu relative to the field.",
      control: "radio",
      options: ["top", "bottom"],
      table: {
        category: "Layout",
        defaultValue: {
          summary: "bottom",
        },
      },
    },
    labelPosition: {
      description: "Places the label above or beside the field.",
      control: "radio",
      options: ["top", "side"],
      table: {
        category: "Layout",
        defaultValue: {
          summary: "top",
        },
      },
    },
    iconPosition: {
      description: "Places the dropdown icon on the left or right side.",
      control: "radio",
      options: ["left", "right"],
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "right",
        },
      },
    },
    placeholder: {
      description: "Placeholder text shown when nothing is selected.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Select something...",
        },
      },
    },
    emptyText: {
      description: "Message shown when filtering returns no options.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Nothing found here...",
        },
      },
    },
    disablePortal: {
      description: "Renders the menu inline instead of using a portal.",
      table: {
        category: "Portal",
        defaultValue: {
          summary: "true",
        },
      },
    },
    portalPlacement: {
      description: "Placement used for the menu when it is portaled.",
      table: {
        category: "Portal",
        defaultValue: {
          summary: "bottom-start",
        },
      },
    },
    portalOffset: {
      description:
        "Offset in pixels between the trigger and the portaled menu.",
      table: {
        category: "Portal",
        defaultValue: {
          summary: "4",
        },
      },
    },
    viewportPadding: {
      description: "Minimum viewport padding preserved around a portaled menu.",
      table: {
        category: "Portal",
        defaultValue: {
          summary: "8",
        },
      },
    },
    matchAnchorWidth: {
      description:
        "Keeps the portaled menu width aligned to the trigger width.",
      table: {
        category: "Portal",
        defaultValue: {
          summary: "true",
        },
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    const [sbArgs, sbUpdateArgs] = useArgs();
    const { value, multi } = sbArgs as unknown as ISelectProps<string>;
    const updateArgs = sbUpdateArgs as unknown as (
      next: Partial<ISelectProps<string>>,
    ) => void;

    const normalizedValue: string[] = toArray<string>(value);
    const normalizedSingleValue: string | undefined =
      normalizedValue.length > 0 ? normalizedValue[0] : undefined;

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.multi;
      delete next.onChange;
      return next as Omit<ISelectProps<string>, "value" | "multi" | "onChange">;
    })();

    useEffect(() => {
      if (multi === true && !Array.isArray(value)) {
        updateArgs({ value: normalizedValue });
      }

      if (multi !== true && Array.isArray(value)) {
        updateArgs({ value: normalizedSingleValue });
      }
    }, [multi, normalizedSingleValue, normalizedValue, updateArgs, value]);

    return (
      <Flex style={{ minHeight: "250px", alignItems: "center" }}>
        {multi === true ? (
          <Select
            {...passthroughArgs}
            multi
            value={normalizedValue}
            onChange={(newValue) => updateArgs({ value: newValue })}
            style={{ width: "250px" }}
          />
        ) : (
          <Select
            {...passthroughArgs}
            multi={false}
            value={normalizedSingleValue}
            onChange={(newValue) => updateArgs({ value: newValue })}
            style={{ width: "250px" }}
          />
        )}
      </Flex>
    );
  },
};

export const CustomLabel: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<IValue>();

    const onChange = (selectedValue: IValue | undefined) => {
      setValue(selectedValue);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.labelComponent;
      return next as Omit<
        ISelectProps<IValue>,
        "value" | "onChange" | "labelComponent" | "multi" | "options"
      >;
    })();

    const labelComponent: SelectLabelComponent<IValue> = (
      prop: LabelComponentProps<IValue>,
    ) => {
      return (
        <Flex gap={Gap.m}>
          <Flag
            medium
            code={prop.value.id as CountryCodes}
            style={{ right: "0" }}
          />
          <Body default style={{ padding: "0" }}>
            {prop.label}
          </Body>
        </Flex>
      );
    };
    return (
      <Flex column gap={Gap.l} style={{ width: "100%" }}>
        <Body>
          You can provide a custom label component to render the selected value.
        </Body>
        <Select<IValue>
          {...passthroughArgs}
          onChange={onChange}
          labelComponent={labelComponent}
          value={value}
        />
      </Flex>
    );
  },
  args: {
    menuPosition: "top",
    labelPosition: "side",
    label: "Select a Country",
    options: options2,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
  },
};

export const HugeListWithCustomLabel: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ICountryValue>();

    const onChange = (selectedValue: ICountryValue) => {
      setValue(selectedValue);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.labelComponent;
      delete next.multi;
      return next as Omit<
        ISelectProps<ICountryValue>,
        "value" | "onChange" | "labelComponent" | "multi" | "options"
      >;
    })();

    const labelComponent: SelectLabelComponent<ICountryValue> = (
      props: LabelComponentProps<ICountryValue>,
    ) => (
      <Flex gap={Gap.m}>
        <Flag medium code={props.value.code as CountryCodes} />
        <Body default>{String(props.label)}</Body>
      </Flex>
    );

    return (
      <Flex column gap={Gap.l} style={{ width: "100%" }}>
        <Body>
          By default, the menu list render with react window, so it can handle
          huge lists with no performance issues.
          <br /> You can combine this with a custom label to render complex
          values.
        </Body>
        <Select<ICountryValue>
          {...passthroughArgs}
          onChange={onChange}
          labelComponent={labelComponent}
          value={value}
        />
        <Flex column gap={Gap.m}>
          {isNil(value?.code) ? (
            <Label>Select Something...</Label>
          ) : (
            <Label>You Selected: {JSON.stringify(value)}</Label>
          )}
          <If is={isDefined(value?.code)}>
            <Flex gap={Gap.m} style={{ alignItems: "center" }}>
              <Label style={{ margin: Margin.xxs }}>Flag: </Label>
              <Flag large code={value?.code as CountryCodes} />
            </Flex>
          </If>
        </Flex>
      </Flex>
    );
  },
  args: {
    options: countryList,
    label: "Select a Country",
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
  },
};

export const MultiLevel: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<IValue>();

    const onChange = (selectedValue: IValue) => {
      setValue(selectedValue);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.labelComponent;
      delete next.multi;
      return next as Omit<
        ISelectProps<IValue>,
        "value" | "onChange" | "labelComponent" | "multi"
      >;
    })();

    return (
      <Flex column gap={Gap.l} style={{ width: "100%" }}>
        <Body>
          The select can handle multi level options, just provide a options list
        </Body>
        <Select {...passthroughArgs} onChange={onChange} value={value} />
        <span>
          {isDefined(value) ? (
            <Label>
              You Selected: <code>{JSON.stringify(value)}</code>
            </Label>
          ) : (
            <Label>Select Something...</Label>
          )}
        </span>
      </Flex>
    );
  },
  args: {
    options: options4,
    label: "Select a Location",
    multiLevel: true,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const CustomFilter: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>();
    const [searchString, setSearchString] = useState<string>();

    const onChange = (selectedValue: string) => {
      setValue(selectedValue);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.filterBehavior;
      return next as Omit<
        ISelectProps<string>,
        "value" | "onChange" | "filterBehavior" | "multi"
      >;
    })();

    return (
      <Flex column>
        <Flex column gap={Gap.l} style={{ width: "100%" }}>
          <Heading4>No Search, but you can type</Heading4>
          <Select
            {...passthroughArgs}
            value={value}
            onChange={onChange}
            onSearch={(search) => setSearchString(search)}
            filterBehavior={() => true}
          />
          <div>Searching: {searchString}</div>
        </Flex>
        <Flex column gap={Gap.l} style={{ width: "350px", marginTop: "40px" }}>
          <Heading4>Case Sensitive Search</Heading4>
          <Select
            {...passthroughArgs}
            value={value}
            onChange={onChange}
            filterBehavior={(searchValue: string, option: IOption<string>) =>
              option.label.includes(searchValue)
            }
          />
        </Flex>
      </Flex>
    );
  },
  args: {
    options: options1,
    searchable: true,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const CustomValidation: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>();
    const [errorsList, setErrorsList] = useState<{ message: string }[]>([]);
    const isMounted = useRef(false);

    const checkForErros = useCallback(() => {
      const errors: { message: string }[] = [];
      if (isNil(value)) {
        errors.push({ message: "This field is required" });
      }
      setErrorsList(errors);
    }, [value]);

    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      checkForErros();
    }, [checkForErros]);

    const onChange = (selectedValue: string) => {
      setValue(selectedValue);
    };

    const onClose = () => {
      checkForErros();
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.filterBehavior;
      return next as Omit<
        ISelectProps<string>,
        "value" | "onChange" | "filterBehavior" | "multi"
      >;
    })();

    return (
      <Flex column gap={Gap.l} style={{ width: "100%" }}>
        <Body>
          You can use the onChange and onClose events to trigger your own
          validation <br />
          and pass the errors to the component.
        </Body>
        <Select
          {...passthroughArgs}
          value={value}
          onChange={onChange}
          onClose={onClose}
          invalid={errorsList.length > 0}
          errors={errorsList}
        />
      </Flex>
    );
  },
  args: {
    options: options1,
    clearable: true,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const RemoteData: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<IValue>();
    const [searchValue, setSearchValue] = useState("");
    const [options, setOptions] = useState<IOption<IValue>[]>([]);
    const [emptyText, setEmptyText] = useState("Type something to search");

    const debouncedValue = useDebounce(searchValue.trim(), 500);

    useEffect(() => {
      if (isEmpty(debouncedValue)) {
        setOptions([]);
        setEmptyText("Type something to search");
        return;
      }

      setEmptyText("Searching...");

      fetch(`https://dummyjson.com/users/search?q=${debouncedValue}`)
        .then((res) => res.json())
        .then((results: { users: { id: string; firstName: string }[] }) => {
          const nextOptions = results.users.map(
            (user): IOption<IValue> => ({
              value: { id: user.id, value: user.firstName },
              label: user.firstName,
            }),
          );

          setOptions(nextOptions);
          setEmptyText(
            isEmpty(results.users)
              ? "Nothing found"
              : "Type something to search",
          );
        })
        .catch(() => {
          setOptions([]);
          setEmptyText("Nothing found");
        });
    }, [debouncedValue]);

    const onChange = (selectedValue: IValue) => {
      setOptions((currentOptions) =>
        currentOptions.filter((option) => option.value === selectedValue),
      );
      setValue(selectedValue);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.filterBehavior;
      return next as Omit<
        ISelectProps<IValue>,
        "value" | "onChange" | "filterBehavior" | "multi"
      >;
    })();

    return (
      <Flex column gap={Gap.l} style={{ width: "100%" }}>
        <Body>
          You can use the onInputChange to trigger a search in your backend
          <br />
          and pass the results to the select component.
        </Body>

        <Select
          {...passthroughArgs}
          emptyText={emptyText}
          options={options}
          value={value}
          onChange={onChange}
          onInputChange={setSearchValue}
        />
      </Flex>
    );
  },
  args: {
    options: [],
    searchable: true,
    label: "Select an User",
    clearable: true,
    maxLength: 10,
    emptyText: "Type something to search",
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const CustomMenu: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>();
    const [errors, setErrors] = useState<{ message: string }[]>([]);

    const handleClick = (
      props: MenuComponentProps<string>,
      option: IOption<string>,
    ) => {
      alert(`You choose ${option.label}`);
      props.onSelect(option.value);
    };

    const handleChange = (selected: string) => {
      const newErros = [];
      setValue(selected);
      if (selected !== "Brasil") {
        newErros.push({ message: "Wrong one =(" });
      }
      setErrors(newErros);
    };

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.menuComponent;
      return next as Omit<
        ISelectProps<string>,
        "value" | "onChange" | "menuComponent" | "multi"
      >;
    })();

    const menuComponent: SelectMenuComponent<string> = (
      props: MenuComponentProps<string>,
    ) => (
      <CustomListFrame>
        {safeArray(props.options).map((option, i) => (
          <CustomRow
            active={props.selectedIndex === i}
            key={option.label}
            onClick={() => handleClick(props, option)}
          >
            <IconWraper>{option["icon"]}</IconWraper>
            <LabelWrapper>{option.label}</LabelWrapper>
            <SupportText subdued>{option["helperText"]}</SupportText>
          </CustomRow>
        ))}
      </CustomListFrame>
    );
    return (
      <Flex gap={Gap.l} column style={{ width: "100%" }}>
        <Body>
          You can provide a custom menu component to render the options list.
        </Body>
        <InputText.Label label={passthroughArgs.label} errors={errors}>
          <Select
            {...passthroughArgs}
            label=""
            invalid={errors.length > 0}
            value={value}
            onChange={handleChange}
            menuComponent={menuComponent}
          />
        </InputText.Label>
      </Flex>
    );
  },
  args: {
    label: "The Southernmost Country?",
    options: options3,
    customIcon: <IconMinor.GlobeRegular />,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const CustomMenuList: Story = {
  // or use MenuListExpanded
  render: function Render(args) {
    const [value, setValue] = useState<string>();

    const passthroughArgs = (() => {
      const next = { ...(args as unknown as Record<string, unknown>) };
      delete next.value;
      delete next.onChange;
      delete next.multi;
      delete next.menuComponent;
      delete next.options;
      return next as Omit<
        ISelectProps<string>,
        "value" | "onChange" | "menuComponent" | "multi" | "options"
      >;
    })();

    return (
      <Flex gap={Gap.l} column style={{ width: "100%" }}>
        <Body>
          MenuList is a ready to use menu component for displaying options in a
          dropdown menu. <br />
          This already handles help text and icons in in the options.
        </Body>
        <Select<string>
          {...passthroughArgs}
          options={options1}
          multi={false}
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          menuComponent={MenuList}
        />
      </Flex>
    );
  },
  args: {
    label: "Cool Label",
    placeholder: "Select Something",
    options: options1,
    menuHeight: 250,
  },
  argTypes: {
    value: { control: false, table: { disable: true } },
    multi: { control: false, table: { disable: true } },
    emptyText: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    multiLevel: { control: false, table: { disable: true } },
  },
};

export const PortalSelct: Story = {
  render: function Render(args) {
    return (
      <Flex style={{ minHeight: 250, width: 300, alignItems: "center" }}>
        <Select {...args} />
      </Flex>
    );
  },
  args: {
    disablePortal: false,
    options: options1,
  },
};
