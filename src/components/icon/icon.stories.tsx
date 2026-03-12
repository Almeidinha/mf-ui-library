import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "components/input-field";
import { Button } from "components/molecules";
import { Body, Heading3 } from "components/typography";
import { Borders, Focused, Interactive, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";

import { Icon, IconMinor } from "./icon";

const Table = styled.div<{ children?: ReactNode }>`
  background: ${Surface.Default};
  border-radius: 6px;
  width: 100%;
`;

const Row = styled.div`
  width: 25%;
  flex-direction: row;
  display: inline-block;
  zoom: 1;
  background-color: ${Surface.Default};
`;

const Column = styled.div`
  ${Typography.Body}
  display: flex;
  padding: ${Padding.xxs};
  flex: 1;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${Padding.xs};
  gap: ${Margin.s};
  width: 100%;
  background: ${Surface.Default.Hover};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  &:hover {
    span {
      opacity: 1;
      z-index: 1;
    }
  }
`;

const Span = styled.span`
  opacity: 0;
  transition: opacity 1s;
  width: 120px;
  background-color: ${Interactive.Subtle.Disabled};
  color: ${Surface.Default.Default};
  text-align: center;
  padding: ${Padding.xxs} ${Padding.none};
  border-radius: 6px;
  position: absolute;
  z-index: -1;
  bottom: 105%;
  left: 50%;
  margin-left: -60px;
  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${Interactive.Subtle.Disabled} transparent transparent
      transparent;
  }
`;

const DivWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin: ${Margin.l} 0;
`;

const Select = styled.select`
  padding: ${Padding.xs} ${Padding.m};
  border: 1px solid ${Borders.Default.Default};
  border-radius: 6px;
  gap: 8px;
  background: ${Surface.Default.Default};
  width: 150px;
  font-family: "Inter";
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  margin: ${Margin.m};

  &:focus {
    outline: 1px solid ${Focused.Default};
  }

  &:focus-visible {
    border: 1px solid ${Focused.Default};
  }
`;

const getObjectKey = (o: Record<string, unknown>): string => Object.keys(o)[0];
const getObjectValue = (o: Record<string, unknown>): unknown =>
  Object.values(o)[0];
const getIconList = (o: Record<string, unknown>): Record<string, unknown>[] =>
  Object.entries(o).map(([key, value]) => ({ [key]: value }));

const meta = {
  title: "Foundations/Icon",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    const icons = getIconList(Icon);
    const minorIcons = getIconList(IconMinor);

    const copy = (text: string) => {
      navigator.clipboard?.writeText?.(text).catch(() => {});
    };

    const renderIcon = (iconObj: Record<string, unknown>) => {
      const Comp = getObjectValue(iconObj) as React.ElementType;
      return <Comp />;
    };
    return (
      <>
        <Heading3>Large Icons</Heading3>
        <Table>
          {icons.map((icon) => {
            const iconName = getObjectKey(icon);
            return (
              <Row key={iconName}>
                <Column>
                  <Wrapper onClick={() => copy(`<Icon.${iconName} />`)}>
                    <Span>Copy me!</Span>
                    {renderIcon(icon)}
                    <Body>{getObjectKey(icon)}</Body>
                  </Wrapper>
                </Column>
              </Row>
            );
          })}
        </Table>
        <Heading3 style={{ marginTop: Margin.xl }}>Minor Icons</Heading3>
        <Table>
          {minorIcons.map((icon) => {
            const iconName = getObjectKey(icon);
            return (
              <Row key={iconName}>
                <Column>
                  <Wrapper onClick={() => copy(`<Icon.${iconName} />`)}>
                    <Span>Copy me!</Span>
                    {renderIcon(icon)}
                    <Body>{iconName}</Body>
                  </Wrapper>
                </Column>
              </Row>
            );
          })}
        </Table>
      </>
    );
  },
};

export const IconButtonCodeExample: Story = {
  render: () => (
    <div>
      <DivWrapper>
        <Icon.BuildingColumns />
        <Icon.BullseyeArrow />
      </DivWrapper>
      <DivWrapper>
        <Button IconPrefix={IconMinor.CircleInfo}>Basic</Button>
        <Button primary IconPrefix={IconMinor.FolderOpen}>
          Primary
        </Button>
        <Button destructive IconPrefix={IconMinor.School}>
          Destructive
        </Button>
        <Button destructive primary IconPrefix={IconMinor.PlaneArrival}>
          Destructive Primary
        </Button>
        <Button outline IconPrefix={IconMinor.PlaneDeparture}>
          Outline
        </Button>
        <Button plain IconPrefix={IconMinor.BadgeCheck}>
          Plain
        </Button>
        <Button plain subtle IconPrefix={IconMinor.Fire}>
          Plain Subtle
        </Button>
      </DivWrapper>
      <InputField.Label label="I can have Icons too!" htmlFor="input_example">
        <InputField name="input_example">
          <InputField.Icon>
            <IconMinor.CreditCard title="Icons render before the input" />
          </InputField.Icon>
          <InputField.Controls>
            <IconMinor.CreditCard title="Controls render after the input" />
          </InputField.Controls>
        </InputField>
      </InputField.Label>
    </div>
  ),
  parameters: {
    docs: { disable: true },
  },
};

export const ChangeIconColorExample: Story = {
  render: function Render() {
    const [color, setColor] = useState("gray");

    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Select onChange={(e) => setColor(e.target.value)}>
          <option value="gray">Gray</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
          <option value="magenta">Magenta</option>
        </Select>
        <DivWrapper>
          <Icon.BuildingColumns color={color} />
          <Icon.BullseyeArrow color={color} />
          <IconMinor.Youtube color={color} />
          <IconMinor.Twitter color={color} />
          <Icon.TriangleExclamation color={color} />
        </DivWrapper>
      </div>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};
