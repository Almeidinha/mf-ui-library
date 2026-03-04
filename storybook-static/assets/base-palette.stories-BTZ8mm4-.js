import{j as t}from"./jsx-runtime-u17CrQMm.js";import{c as m,f as x,g as h,h as g,O as j,R as G,j as y,k as B}from"./shadows-CyjoGr4u.js";import{C as p}from"./button-sKft9pFr.js";import{l as f}from"./left-right-layout-UOxJcGv9.js";import{C as P}from"./color-sample-BVzm5nc5.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";const d={columns:12,columnGutter:24,rowGutter:24},c=(e,o,s=1)=>{const a=typeof e=="number"?e:Number(e);return Number.isFinite(a)?Math.max(s,Math.floor(a)):o},u=(e,o)=>{const s=typeof e=="number"?e:Number(e);return Number.isFinite(s)?Math.max(0,s):o},$=m.div`
  display: grid;

  ${({columns:e})=>`grid-template-columns: repeat(${c(e,d.columns,1)}, minmax(0, 1fr));`}

  ${({rows:e})=>e==null?"":`grid-template-rows: repeat(${c(e,1,1)}, minmax(0, 1fr));`}

  ${({columnGutter:e})=>`column-gap: ${u(e,d.columnGutter)}px;`}
  ${({rowGutter:e})=>`row-gap: ${u(e,d.rowGutter)}px;`}
`,C=m.div`
  ${({colSpan:e})=>e?`grid-column: span ${c(e,1,1)};`:""}
  ${({rowSpan:e})=>e?`grid-row: span ${c(e,1,1)};`:""}
  ${({colStart:e})=>e?`grid-column-start: ${c(e,1,1)};`:""}
  ${({rowStart:e})=>e?`grid-row-start: ${c(e,1,1)};`:""}
`;function R(e={}){return{Grid:({children:s,...a})=>t.jsx($,{...e,...a,children:s}),Cell:C}}const r={Gray:{palette:x,description:"These colors are used as supporting colors in backgrounds, text colors, separators, modals, etc."},Blue:{palette:h,description:"These colors are used across interactive elements such as CTAs, links, active states, etc."},Green:{palette:g,description:"These colors depict positivity. Used across success states."},Orange:{palette:j,description:"These colors depict caution. Used across warning states."},Red:{palette:G,description:"These colors depict negativity. Used across destructive states."},Shades:{palette:y,description:"White for text on primary buttons. Black opacities for shadows."},Brand:{palette:B,description:"App brand color."}},n=({heading:e,colorName:o,colorPalette:s,description:a})=>t.jsx(p,{heading:e,children:t.jsx(p.Section,{children:t.jsx(A,{colorName:o,colorPalette:s,description:a})})}),N=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Gray",colorPalette:r.Gray.palette,description:r.Gray.description}),S=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Blue",colorPalette:r.Blue.palette,description:r.Blue.description}),b=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Green",colorPalette:r.Green.palette,description:r.Green.description}),O=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Orange",colorPalette:r.Orange.palette,description:r.Orange.description}),T=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Red",colorPalette:r.Red.palette,description:r.Red.description}),w=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Shades",colorPalette:r.Shades.palette,description:r.Shades.description}),E=()=>t.jsx(n,{heading:"Color System: Base Palette",colorName:"Brand",colorPalette:r.Brand.palette,description:r.Brand.description}),{Layout:i}=f(),A=e=>t.jsxs(i,{children:[t.jsxs(i.Left,{children:[t.jsx(i.HeadingText,{children:e.colorName}),t.jsx(i.HelpText,{subdued:!0,children:e.description})]}),t.jsx(i.Right,{children:t.jsx(L,{colors:e.colorPalette})})]}),{Grid:v,Cell:D}=R({columns:5,rows:2,columnGutter:16,rowGutter:24}),L=e=>t.jsx(v,{children:Object.entries(e.colors).map(([o,s])=>t.jsx(D,{children:t.jsx(P,{name:o,hex:s},s)}))}),W={title:"Foundations/Colors",tags:["autodocs"],parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}}}},l={render:()=>t.jsxs(t.Fragment,{children:[t.jsx(N,{}),t.jsx(S,{}),t.jsx(b,{}),t.jsx(O,{}),t.jsx(T,{}),t.jsx(w,{}),t.jsx(E,{})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Gray />
      <Blue />
      <Green />
      <Orange />
      <Red />
      <Shades />
      <Brand />
    </>
}`,...l.parameters?.docs?.source}}};const Y=["Docs"];export{l as Docs,Y as __namedExportsOrder,W as default};
