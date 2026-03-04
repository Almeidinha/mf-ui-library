import{j as e}from"./jsx-runtime-u17CrQMm.js";import{u as r,F as a,b as c,a as i}from"./button-sKft9pFr.js";import{G as p}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const g={title:"Components/Spinner",component:r,parameters:{layout:"centered",docs:{description:{component:`
Spinners are used to notify users that their action is being processed.

## How to Use

\`\`\`tsx
import { Spinner } from './index'

<Spinner />
\`\`\`

\`\`\`
        `}}},tags:["autodocs"],args:{size:"medium"},argTypes:{size:{options:["small","medium","large"],control:{type:"radio"}}}},n={parameters:{previewTabs:{canvas:{hidden:!0}}},render:({...s})=>{const o=s.size?{[s.size]:!0}:{};return e.jsx(a,{style:{height:50,alignItems:"center"},children:e.jsx(r,{...s,...o})})}},t={render:()=>e.jsxs(a,{column:!0,gap:p.m,children:[e.jsx(c,{children:"When rendering the spinner on a primary or critical surface, use onPrimary or onCritical."}),e.jsx(i,{primary:!0,children:e.jsx(r,{onPrimary:!0})}),e.jsx(i,{destructive:!0,primary:!0,children:e.jsx(r,{onCritical:!0})}),e.jsx(i,{destructive:!0,children:e.jsx(r,{onCritical:!0})})]}),parameters:{docs:{disable:!0}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
  render: ({
    ...args
  }) => {
    const size = args.size ? {
      [args.size]: true
    } : {};
    return <Flex style={{
      height: 50,
      alignItems: "center"
    }}>
        <Spinner {...args} {...size} />
      </Flex>;
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Flex column gap={Gap.m}>
      <BodyLarge>
        When rendering the spinner on a primary or critical surface, use
        onPrimary or onCritical.
      </BodyLarge>
      <Button primary>
        <Spinner onPrimary />
      </Button>
      <Button destructive primary>
        <Spinner onCritical />
      </Button>
      <Button destructive>
        <Spinner onCritical />
      </Button>
    </Flex>,
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...t.parameters?.docs?.source}}};const y=["Docs","SpinnerCodeExample"];export{n as Docs,t as SpinnerCodeExample,y as __namedExportsOrder,g as default};
