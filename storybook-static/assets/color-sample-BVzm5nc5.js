import{j as o}from"./jsx-runtime-u17CrQMm.js";import{M as a,c as s,W as d,f as t}from"./shadows-CyjoGr4u.js";import{i as n,d as x,c as i,F as l,L as m}from"./button-sKft9pFr.js";function u(r){return r===d||r===t[50]||r===t[100]}const c=s.div`
  ${({border:r,color:e})=>n(r)?"":`background-color: ${e};`}
  ${({border:r,color:e})=>n(r)?`border: 1px solid ${e};`:""}
  ${({border:r,color:e})=>!n(r)&&u(e)?`border: 1px solid ${t[200]};`:""}

  height: 40px;
  border-radius: 4px;
`,h=s(c)`
  max-width: 122px;
  margin-bottom: ${a.xxs};
`,b=s(c)`
  width: 40px;
  flex-shrink: 0;
  margin-right: ${a.s};
  border-radius: 6px;

  ${({border:r,color:e})=>n(r)?`background-color: ${r};`:`background-color: ${e};`}
  ${({border:r,color:e})=>n(r)?`border: 1px solid ${e};`:`border: 2px solid ${d};`}
`,g=r=>o.jsxs("div",{children:[o.jsx(h,{color:r.hex,border:r.border}),o.jsxs(x,{children:[o.jsx(i,{children:r.name}),o.jsx(i,{subdued:!0,children:r.hex})]})]}),$=s(l)`
  margin-bottom: ${a.l};
  margin-right: ${a.xxl};
`,p=s(l)`
  justify-content: center;
`,j=s(m)`
  white-space: nowrap;
  margin-bottom: ${a.xxxs};
`,C=s(i)`
  white-space: nowrap;
`,f=r=>o.jsxs($,{children:[o.jsx(b,{color:r.hex,border:r.border}),o.jsxs(p,{column:!0,children:[o.jsx(j,{strong:!0,children:r.name}),o.jsx(C,{subdued:!0,children:r.colorId})]})]});g.__docgenInfo={description:"",methods:[],displayName:"ColorRectangle"};f.__docgenInfo={description:"",methods:[],displayName:"ColorSquare"};export{g as C,f as a};
