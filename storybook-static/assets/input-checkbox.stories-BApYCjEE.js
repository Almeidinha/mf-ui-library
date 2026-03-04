import{j as a}from"./jsx-runtime-u17CrQMm.js";import"./button-sKft9pFr.js";import{r as n}from"./iframe-Co_0DYZM.js";import{I as o}from"./input-checkbox-ft-M1p-9.js";import"./shadows-CyjoGr4u.js";import"./preload-helper-PPVm8Dsz.js";import"./checkbox-Cf_FJ72f.js";import"./useMergedRefs-CBj2iGZS.js";const b={title:"Components/InputCheckbox",component:o,parameters:{layout:"centered",docs:{description:{component:`
# Checkbox

This is a molecule, composed by the atoms checkbox input and typography as well.

## How to use

\`\`\`tsx
import { InputCheckbox } from './index'

<InputCheckbox label="MY-TEXT-HERE" />
\`\`\`

---

## API
You can send all the possible values from Checkbox component.
Also, you can sen this parameters:


| Name      | Type     | Description                   | Required (Y/N) |
| --------- | -------- | ----------------------------- | -------------- |
|  label    |  string  |  The label from the checkbox  |  Y             |
|  onChange |  event   |  Listen for changes           |  N             |

\`\`\`
        `}}},tags:["autodocs"],args:{label:"Checkbox label",error:!1,indeterminate:!1},argTypes:{}},e={render:t=>{const[r,s]=n.useState(!1);return a.jsx(o,{onChange:s,checked:r,...t})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState<boolean | undefined>(false);
    return <InputCheckbox onChange={setChecked} checked={checked} {...args} />;
  }
}`,...e.parameters?.docs?.source}}};const x=["Primary"];export{e as Primary,x as __namedExportsOrder,b as default};
