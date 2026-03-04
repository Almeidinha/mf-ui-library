import{j as e}from"./jsx-runtime-u17CrQMm.js";import{l,S as m,B as p,F as D,T,a as v,I as h,A as x,M as E,c as I,W as k,m as A,k as H,j as O,R as F,O as R,h as $,g as W,f as w}from"./shadows-CyjoGr4u.js";import{x as b,H as j,C as f,A as d,F as P}from"./button-sKft9pFr.js";import{a as L}from"./color-sample-BVzm5nc5.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const C={GRAY:w,BLUE:W,GREEN:$,ORANGE:R,RED:F,SHADES:O,BRAND:H},G=I(b)`
  margin-bottom: ${E.xl};
`,M=a=>{if(a===k)return"white";if(a===A)return"black";const t=a.slice(0,7),n=a.slice(7,9),r=Object.keys(C).reduce((i,s)=>{const o=C[s],u=Object.keys(o).find(S=>o[S]===t);return u?`${s.toLowerCase()}-${u}`:i},void 0);return r?n?`${r} - ${N(n)}`:r:a},N=a=>{const t=parseInt(a,16);return t===0?"":`${Math.round(t/255*100)}%`},re={title:"Foundations/Color System",tags:["autodocs"],parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{description:{component:`
The Color Guidelines give names and functions to the colors defined in our base palette.

All colors used in the app are namespaced according to their context
(e.g. \`Background.Default\`, \`Surface.Critical\`).

\`\`\`ts
import { Background, Surface } from '@foundations'

const bg = Background.Default
const criticalSurface = Surface.Critical
\`\`\`
        `}}}},c=({name:a,subCategories:t})=>e.jsxs(e.Fragment,{children:[e.jsx(G,{style:{marginTop:24},children:a}),e.jsx(P,{style:{backgroundColor:l.Default,padding:24,borderRadius:8,overflow:"auto"},children:t.map((n,r)=>e.jsx("div",{children:Object.entries(n.palette).map(([i,s])=>e.jsx(L,{name:`${n.name} ${i}`,hex:s,colorId:M(s),border:n.border?n.border:void 0},`${n.name}-${i}`))},r))})]}),Y=()=>e.jsx(c,{name:"Background",subCategories:[{name:"",palette:l}]}),_=()=>e.jsx(c,{name:"Surface",subCategories:[{name:"",palette:m.Default},{name:"Critical",palette:m.Critical},{name:"Warning",palette:m.Warning},{name:"Success",palette:m.Success}]}),q=()=>e.jsx(c,{name:"Borders",subCategories:[{name:"",palette:p.Default},{name:"Critical",palette:p.Critical},{name:"Warning",palette:p.Warning},{name:"Success",palette:p.Success}]}),K=()=>e.jsx(c,{name:"Focused",subCategories:[{name:"",palette:D,border:l.Default}]}),U=()=>{const{Default:a,Subdued:t,Light:n,Critical:r,Success:i,OnPrimary:s,OnCritical:o}=T;return e.jsx(c,{name:"Text",subCategories:[{name:"",palette:{Default:a,Subdued:t,Light:n}},{name:"",palette:{Critical:r,Success:i}},{name:"",palette:{OnPrimary:s,OnCritical:o}}]})},z=()=>{const{Default:a,Subdued:t,Hover:n,Pressed:r,Disabled:i,Critical:s,Success:o,Warning:u,Highlight:S,OnPrimary:B,OnCritical:y}=v;return e.jsx(c,{name:"Icons",subCategories:[{name:"",palette:{Default:a,Subdued:t,Hover:n,Pressed:r,Disabled:i}},{name:"",palette:{Critical:s,Warning:u,Success:o,Highlight:S}},{name:"",palette:{OnPrimary:B,OnCritical:y}}]})},J=()=>e.jsx(c,{name:"Interactions",subCategories:[{name:"",palette:h.Default},{name:"Subtle",palette:h.Subtle}]}),Q=()=>e.jsx(c,{name:"Actions",subCategories:[{name:"Primary",palette:x.Primary},{name:"Secondary",palette:x.Secondary},{name:"Critical",palette:x.Critical},{name:"Secondary Critical",palette:x.SecondaryCritical}]}),V=()=>e.jsxs(e.Fragment,{children:[e.jsx(b,{style:{marginTop:48},children:"Examples"}),e.jsx(j,{style:{marginTop:48},children:"Background Example"}),e.jsx("div",{style:{padding:24,background:l.Default,borderRadius:8},children:e.jsx(f,{heading:"Heading",children:"Body"})}),e.jsx(j,{style:{marginTop:48},children:"Surface Example"}),e.jsx("div",{style:{padding:24,background:l.Default,marginTop:24,borderRadius:8},children:e.jsxs(f,{heading:"Heading",children:[e.jsx(f.AlertBanner,{children:"Some helpful info"}),"Body"]})}),e.jsx(j,{style:{marginTop:48},children:"Alert Example"}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(d,{children:"Default"}),e.jsx(d,{Info:!0,children:"Info"}),e.jsx(d,{Success:!0,children:"Success"}),e.jsx(d,{Warning:!0,children:"Warning"}),e.jsx(d,{Critical:!0,children:"Critical"})]})]}),g={parameters:{previewTabs:{canvas:{hidden:!0}}},render:()=>e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(_,{}),e.jsx(q,{}),e.jsx(K,{}),e.jsx(U,{}),e.jsx(z,{}),e.jsx(J,{}),e.jsx(Q,{}),e.jsx(V,{})]})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
  render: () => <>
      <BackgroundSection />
      <SurfaceSection />
      <BordersSection />
      <FocusedSection />
      <TextSection />
      <IconsSection />
      <InteractionsSection />
      <ActionsSection />

      {/* Examples */}
      <ExampleSection />
    </>
}`,...g.parameters?.docs?.source}}};const se=["Docs"];export{g as Docs,se as __namedExportsOrder,re as default};
