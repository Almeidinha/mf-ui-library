import{j as n}from"./jsx-runtime-u17CrQMm.js";import{S as t,P as r,c as i}from"./shadows-CyjoGr4u.js";import{L as o}from"./button-sKft9pFr.js";const c={1:t.Neutral.Default,2:t.Highlight.Default,4:t.Success.Default,8:t.Warning.Default,16:t.Critical.Default};function s(e){return e.info?2:e.success?4:e.warning?8:e.critical?16:1}function l(e){return c[s(e)]}const u=i(o)`
  background: ${e=>e.color};
  display: flex;
  align-items: center;
  padding: ${r.xxxs} ${r.xs};
  border-radius: 10px;
  height: fit-content;
  max-width: fit-content;
  white-space: nowrap;
`,f=e=>{const a=l(e);return n.jsx(u,{className:e.className,color:a,children:e.children})};f.__docgenInfo={description:"",methods:[],displayName:"Badge"};export{f as B};
