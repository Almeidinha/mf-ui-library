import{j as e}from"./jsx-runtime-u17CrQMm.js";import{F as a}from"./button-sKft9pFr.js";import{r as n}from"./iframe-Co_0DYZM.js";import{G as r}from"./shadows-CyjoGr4u.js";import{R as o}from"./radio-button-CpDa9ATV.js";import"./preload-helper-PPVm8Dsz.js";const b={title:"Components/RadioButton",component:o,parameters:{layout:"centered",docs:{description:{component:`
# RadioButton

RadioButton is "drop-in" compatible with an html input radio.

## How to use

\`\`\`tsx
import { RadioButton } from '/index'

<RadioButton />
\`\`\`

---

## API

Extends \`HTMLAttributes<HTMLInputElement>\`

| Name        | Type      | Description                                                             |
| ----------- | --------- | ----------------------------------------------------------------------- |
|  label      |  string   | The label for the radio button                                          |
|  checked?   |  boolean  | Set radio button as filled (only one can be filled)                     |
|  disabled?  |  boolean  | Set radio button as a disabled way (can't click or interact with that)  |
|  onChange?  |  event    | You can listen the changes from the component                           |

\`\`\`
        `}}},args:{label:"Radio Button label"},argTypes:{label:{table:{disable:!0}}},tags:["autodocs"]},t={render:()=>{const[s,i]=n.useState(!1);return e.jsxs(a,{column:!0,gap:r.xs,children:[e.jsx(o,{name:"radios",label:"option 1"}),e.jsx(o,{name:"radios",label:"option 2"}),e.jsx(o,{name:"radios",label:"option 3",disabled:!0}),e.jsx(o,{name:"radios",label:"option 4",readOnly:!0})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState<boolean>(false);
    return <Flex column gap={Gap.xs}>
        <RadioButton name="radios" label="option 1" />
        <RadioButton name="radios" label="option 2" />
        <RadioButton name="radios" label="option 3" disabled />
        <RadioButton name="radios" label="option 4" readOnly />
      </Flex>;
  }
}`,...t.parameters?.docs?.source}}};const x=["Radios"];export{t as Radios,x as __namedExportsOrder,b as default};
