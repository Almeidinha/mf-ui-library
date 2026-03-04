import{j as a}from"./jsx-runtime-u17CrQMm.js";import{l as p,F as h}from"./button-sKft9pFr.js";import{G as g,P as v,c as l}from"./shadows-CyjoGr4u.js";import{R as f}from"./radio-button-CpDa9ATV.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const y=l(h)`
  padding: ${v.s};
`,C=l(f)``,b=e=>a.jsx(a.Fragment,{children:e.options.map((t,n)=>{const r=p(e.name,"").replace(/\s+/g,""),o=`radio-option-${n}-${r}`;return a.jsx(C,{value:t.value,label:t.label,id:o,name:e.name,disabled:t.disabled,checked:t.value===e.selected,onChange:e.handleChange},o)})}),i=e=>{const{options:t,selected:n,name:r,className:o,direction:c="vertical",onChange:d}=e,m=u=>{d(u.target.value)};return a.jsx(y,{gap:g.s,column:c==="vertical",className:o,children:a.jsx(b,{options:t,selected:n,name:r,handleChange:m})})};i.__docgenInfo={description:"",methods:[],displayName:"ChoiceList",props:{selected:{required:!0,tsType:{name:"unknown"},description:""},direction:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:""},className:{required:!1,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"IRadioOption"}],raw:"IRadioOption[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},name:{required:!1,tsType:{name:"string"},description:""}}};const{useState:T}=__STORYBOOK_MODULE_PREVIEW_API__,O={title:"Components/ChoiceList",component:i,parameters:{layout:"centered",docs:{description:{component:`
# ChoiseList


This is a organism, composed by radio button molecule and some atoms.

## How to use

\`\`\`tsx
import { ChoiceList } from './index'

const [selected, setSelected] = useState('')
const handleChange = (value: string) => setSelected(value)
const options = [
  {
    label: 'My Awesome label',
    value: '1',
    id: '1',
  }
]

<ChoiceList
  options={options}
  onChange={handleChange}
  selected={selectedState}
/>
\`\`\`

---

## API
This component receive a list (\`options\` parameter) from N amount of Radio Buttons if you'd like to render.
So all the possible values from Radio Buttons component can be passed here.
Also, you can sen this parameters:

| Name | Type | Description | Required (Y/N)|
| ---- | ----- | ------ | ----- |
| \`options\` | \`IOption[]\` | The items that are going to be rendered inside the list | Y |
| \`onChange\` | \`function\` | Function that will return the value of the option that was chosen | Y |
| \`selected\` | \`string\` | Variable that contains the value of the selected item | Y |
| \`name\` | \`string\` | The name that will represent the group of radios, in order to render more instances and they not affect each other | N |

\`\`\`
        `}}},tags:["autodocs"],args:{direction:"vertical",name:"Choose your favorite fruit",options:[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"}],selected:"banana",onChange:e=>{}},argTypes:{direction:{table:{defaultValue:{summary:"vertical"}}}}},s={render:e=>{const[t,n]=T(e.selected);return a.jsx(i,{...e,selected:t,onChange:n})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<string>(args.selected as string);
    return <ChoiceList {...args} selected={selected} onChange={setSelected} />;
  }
}`,...s.parameters?.docs?.source}}};const I=["Primary"];export{s as Primary,I as __namedExportsOrder,O as default};
