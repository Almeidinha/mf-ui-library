import{j as c}from"./jsx-runtime-u17CrQMm.js";import{c as r,M as a}from"./shadows-CyjoGr4u.js";import{B as i,H as l}from"./button-sKft9pFr.js";const m={columns:12,columnGutter:24,rowGutter:0},g=r.div.withConfig({shouldForwardProp:t=>!["columns","columnGutter","rowGutter"].includes(t)})`
  display: grid;
  grid-template-columns: repeat(${({columns:t})=>t}, 1fr);
  grid-column-gap: ${({columnGutter:t})=>t}px;
  grid-row-gap: ${({rowGutter:t})=>t}px;
`,s=r.div`
  grid-column: 1 / span 4;
  grid-row: third-line / 4;
`,u=r.div`
  grid-column: 5 / span 8;
  grid-row: third-line / 4;
`,p=r(l)`
  margin-bottom: ${a.m};
`;function y(t={}){const e={...m,...t},n={HeadingText:p,HelpText:i,BodyText:i},o=(d=>c.jsx(g,{columns:e.columns,columnGutter:e.columnGutter,rowGutter:e.rowGutter,children:d.children}));return o.Left=s,o.Right=u,o.HeadingText=n.HeadingText,o.BodyText=n.BodyText,o.HelpText=n.HelpText,{LeftRightLayout:o,Layout:o,Left:s,Right:u}}export{y as l};
