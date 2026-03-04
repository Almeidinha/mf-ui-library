import{j as d}from"./jsx-runtime-u17CrQMm.js";import{n,c as o,o as a,s as i,p as h,q as r,r as c,t,S as l,P as w}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const s=o.div`
  width: 128px;
  height: 128px;
  background: ${l.Default};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${w.none};
`,x=o(s)`
  ${n}
`,m=o(s)`
  ${a}
`,S=o(s)`
  ${i}
`,p=o(s)`
  ${h}
`,v=o(s)`
  ${r}
`,j=o(s)`
  ${c}
`,g=o(s)`
  ${t}
`,u=o.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    text-align: center;
    border: 1px solid gray;
    border-bottom: none;
    padding: 8px 16px;
    width: 200px;
  }

  & > div:last-child {
    border-bottom: 1px solid gray;
  }
`,b={title:"Foundations/Shadows",tags:["autodocs"],parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{description:{component:`
# Shadows

## How to use

\`\`\`ts
// Import the shadow you'd like to use
import { shadowSm } from './shadows';

import styled from 'styled-components';

const ShadowSm = styled.div\`
  \${shadowSm}
\`
\`\`\`
        `}}}},e={render:()=>d.jsxs(d.Fragment,{children:[d.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:24},children:[d.jsx(x,{children:"shadowSm"}),d.jsx(m,{children:"shadow"}),d.jsx(S,{children:"shadowMd"}),d.jsx(p,{children:"shadowLg"}),d.jsx(v,{children:"shadowXl"}),d.jsx(j,{children:"shadow2Xl"}),d.jsx(g,{children:"shadowInner"})]}),d.jsxs(u,{children:[d.jsx("h3",{children:"List of Values"}),d.jsx("div",{children:"Name"}),d.jsx("div",{children:d.jsx("code",{children:"shadowSm"})}),d.jsx("div",{children:d.jsx("code",{children:"shadow"})}),d.jsx("div",{children:d.jsx("code",{children:"shadowMd"})}),d.jsx("div",{children:d.jsx("code",{children:"shadowLg"})}),d.jsx("div",{children:d.jsx("code",{children:"shadowXl"})}),d.jsx("div",{children:d.jsx("code",{children:"shadow2Xl"})}),d.jsx("div",{children:d.jsx("code",{children:"shadowInner"})})]})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24
    }}>
        <ShadowSm>shadowSm</ShadowSm>
        <Shadow>shadow</Shadow>
        <ShadowMd>shadowMd</ShadowMd>
        <ShadowLg>shadowLg</ShadowLg>
        <ShadowXl>shadowXl</ShadowXl>
        <Shadow2Xl>shadow2Xl</Shadow2Xl>
        <ShadowInner>shadowInner</ShadowInner>
      </div>
      <Table>
        <h3>List of Values</h3>
        <div>Name</div>
        <div>
          <code>shadowSm</code>
        </div>
        <div>
          <code>shadow</code>
        </div>
        <div>
          <code>shadowMd</code>
        </div>
        <div>
          <code>shadowLg</code>
        </div>
        <div>
          <code>shadowXl</code>
        </div>
        <div>
          <code>shadow2Xl</code>
        </div>
        <div>
          <code>shadowInner</code>
        </div>
      </Table>
    </>
}`,...e.parameters?.docs?.source}}};const L=["Docs"];export{e as Docs,L as __namedExportsOrder,b as default};
