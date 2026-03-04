import{j as e}from"./jsx-runtime-u17CrQMm.js";import{F as o,b as t}from"./button-sKft9pFr.js";import{G as a}from"./shadows-CyjoGr4u.js";import{F as s,C as l}from"./country-codes-BL04zp7i.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const x={title:"Components/Flag",component:s,parameters:{layout:"centered"},tags:["autodocs"],args:{code:"BR"},argTypes:{code:{control:{type:"select",labels:Object.fromEntries(Object.entries(l))},options:Object.keys(l).map(r=>r)}}},n={render:r=>(console.log("code: ",r.code),e.jsxs(o,{gap:a.xl,children:[e.jsxs(o,{column:!0,style:{alignItems:"center"},children:[e.jsx(t,{children:"Small"}),e.jsx(s,{code:r.code,small:!0})]}),e.jsxs(o,{column:!0,style:{alignItems:"center"},children:[e.jsx(t,{children:"Medium"}),e.jsx(s,{code:r.code,medium:!0})]}),e.jsxs(o,{column:!0,style:{alignItems:"center"},children:[e.jsx(t,{children:"Large"}),e.jsx(s,{code:r.code,large:!0})]})]}))};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    console.log("code: ", args.code);
    return <Flex gap={Gap.xl}>
        <Flex column style={{
        alignItems: "center"
      }}>
          <BodyLarge>Small</BodyLarge>
          <Flag code={args.code} small />
        </Flex>
        <Flex column style={{
        alignItems: "center"
      }}>
          <BodyLarge>Medium</BodyLarge>
          <Flag code={args.code} medium />
        </Flex>
        <Flex column style={{
        alignItems: "center"
      }}>
          <BodyLarge>Large</BodyLarge>
          <Flag code={args.code} large />
        </Flex>
      </Flex>;
  }
}`,...n.parameters?.docs?.source}}};const p=["Primary"];export{n as Primary,p as __namedExportsOrder,x as default};
