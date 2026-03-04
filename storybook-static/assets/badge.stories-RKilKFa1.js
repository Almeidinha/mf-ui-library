import{j as e}from"./jsx-runtime-u17CrQMm.js";import"./button-sKft9pFr.js";import{B as r}from"./badge-BUzlPSeB.js";import{T as t,D as o,P as i,C as c}from"./blocks-nz5tIO7C.js";import{c as d}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-AB_7CA6O.js";import"./index-MAKt5DRM.js";const p=d.div`
  display: flex;
  gap: 16px;
`,j={title:"Components/Badge",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{page:()=>e.jsxs(e.Fragment,{children:[e.jsx(t,{}),e.jsx(o,{}),e.jsx(i,{}),e.jsx(c,{})]}),description:{component:`
This is an atom.

---

## How to use

\`\`\`tsx
import { Badge } from './index'

<Badge>Contents</Badge>
\`\`\`

---

### API

| Name        | Type      | Description                |
| ----------- | --------- | -------------------------- |
|  neutral?   |  boolean  | renders the neutral badge  |
|  info?      |  boolean  | renders the info badge     |
|  warning?   |  boolean  | renders the warning badge  |
|  success?   |  boolean  | renders the success badge  |
|  critical?  |  boolean  | renders the critical badge |
        `}}},args:{children:"Badge",variant:"neutral"},argTypes:{variant:{control:{type:"select"},options:["neutral","info","success","warning","critical"]}}},a={parameters:{previewTabs:{canvas:{hidden:!0}}},render:({...s})=>e.jsx(r,{...s,[s.variant]:!0,children:s.children})},n={render:()=>e.jsxs(p,{children:[e.jsx(r,{neutral:!0,children:"Neutral"}),e.jsx(r,{info:!0,children:"Info"}),e.jsx(r,{success:!0,children:"Success"}),e.jsx(r,{warning:!0,children:"Warning"}),e.jsx(r,{critical:!0,children:"Critical"})]}),parameters:{docs:{disable:!0},controls:{disable:!0}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
  render: ({
    ...args
  }) => <Badge {...args} {...{
    [args.variant]: true
  }}>
      {args.children}
    </Badge>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Wrapper>
      <Badge neutral>Neutral</Badge>
      <Badge info>Info</Badge>
      <Badge success>Success</Badge>
      <Badge warning>Warning</Badge>
      <Badge critical>Critical</Badge>
    </Wrapper>,
  parameters: {
    docs: {
      disable: true
    },
    controls: {
      disable: true
    }
  }
}`,...n.parameters?.docs?.source}}};const v=["Docs","TypeVariant"];export{a as Docs,n as TypeVariant,v as __namedExportsOrder,j as default};
