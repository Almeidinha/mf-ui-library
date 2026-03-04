import{j as o}from"./jsx-runtime-u17CrQMm.js";import{F as d}from"./button-sKft9pFr.js";import{G as c}from"./shadows-CyjoGr4u.js";import{r as m}from"./iframe-Co_0DYZM.js";import{T as r}from"./tag-DifDEUaX.js";import"./preload-helper-PPVm8Dsz.js";const h={title:"Components/Tag",component:r,parameters:{layout:"centered",docs:{description:{component:"\n# Checkbox\n\nCheckboxes are most commonly used to give users a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have users indicate they agree to specific terms and services.\n\n## How to use\n\n```tsx\n\nimport { Tag } from './index'\n\n<Tag>Label</Tag>\n```\n\n### API\n\nThe available optional properties are as follows.\n\n| Prop         | Type           | Description                                          |\n| ------------ | -------------- | ---------------------------------------------------- |\n| `closable?`  | `boolean`  | Add a close button to the tag                        |\n| `disabled?`  | `boolean`  | Disabled the tag                                     |\n| `className?` | `string`   | Add the class to the tag                             |\n| `onClick?`   | `function` | Called when the close button is clicked              |\n| `onClose?`   | `function` | Called when the close button is clicked              |\n\n---\n\n```\n        "}}},tags:["autodocs"],args:{closable:!1,disabled:!1,className:"",children:"This is My TAG!"},argTypes:{}},a={render:t=>o.jsx(r,{...t,color:"red"})},s={render:()=>{const[t,n]=m.useState([{id:1,name:"Vancouver, BC",disabled:!0},{id:2,name:"Montreal, QC"},{id:3,name:"Toronto, ON"}]);return o.jsx(d,{gap:c.l,children:t.map(e=>o.jsx(r,{closable:!0,disabled:e.disabled,onClick:()=>{n(i=>i.filter(l=>l.id!==e.id))},children:e.name},e.id))})},parameters:{docs:{disable:!0}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <Tag {...args} color="red" />
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedCities, setSelected] = useState([{
      id: 1,
      name: "Vancouver, BC",
      disabled: true
    }, {
      id: 2,
      name: "Montreal, QC"
    }, {
      id: 3,
      name: "Toronto, ON"
    }]);
    return <Flex gap={Gap.l}>
        {selectedCities.map(city => {
        return <Tag closable disabled={city.disabled} key={city.id} onClick={() => {
          setSelected(prevCities => prevCities.filter(filteredCity => filteredCity.id !== city.id));
        }}>
              {city.name}
            </Tag>;
      })}
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...s.parameters?.docs?.source}}};const x=["Docs","Example"];export{a as Docs,s as Example,x as __namedExportsOrder,h as default};
