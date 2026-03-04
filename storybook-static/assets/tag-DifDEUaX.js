import{j as t}from"./jsx-runtime-u17CrQMm.js";import{e as m,n as u,F as g,L as $,I as v}from"./button-sKft9pFr.js";import{P as s,S as o,a as p,F as j,c as d,T as f}from"./shadows-CyjoGr4u.js";const k=d.button`
  appearance: none;
  border: 0;
  margin: 0;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${s.xxxs} ${s.xxs};
  gap: 8px;
  width: 28px;

  background: ${({$disabled:e})=>e?o.Neutral.Subdued:o.Neutral.Default};
  border-radius: 0px 4px 4px 0px;

  ${({$disabled:e})=>e?`
        cursor: default;
        svg path { fill: ${p.Disabled}; }
      `:`
        cursor: pointer;

        &:hover {
          background: ${o.Neutral.Hover};
          svg path { fill: ${p.Hover}; }
        }

        &:active {
          background: ${o.Neutral.Pressed};
          svg path { fill: ${p.Pressed}; }
        }

        &:focus {
          outline: 2px solid ${j.Default};
          outline-offset: -2px;
        }
      `}
`,b=({disabled:e,ariaLabel:n,type:r,onClick:c,...l})=>{const i=u(e),x=a=>{a.preventDefault(),a.stopPropagation(),!i&&c?.(a)};return t.jsx(k,{...l,type:r??"button",disabled:i,$disabled:i,"aria-label":n??"Remove",onClick:x,children:t.jsx(m.Xmark,{})})};b.__docgenInfo={description:"",methods:[],displayName:"CloseButton"};const C=d(g)`
  background: ${e=>e.disabled?o.Neutral.Subdued:o.Neutral.Default};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${s.xxxs} ${s.xs} ${s.xxxs} ${s.xs};
  width: 100%;
  min-height: 24px;
  border-radius: ${e=>e.closable?"4px 0px 0px 4px":"4px"};
  word-break: break-all;
`,D=d($)`
  color: ${e=>e.disabled?f.Light:f.Default};
`,h=e=>{const n=u(e.disabled),r=u(e.closable);return t.jsx(C,{disabled:n,closable:r,children:t.jsx(D,{disabled:n,children:e.children})})};h.__docgenInfo={description:"",methods:[],displayName:"TagLabel"};const N=d(g)`
  display: inline-flex;
  flex-direction: row;
  align-items: stretch;
  padding: ${s.none};
`,T=({disabled:e,closable:n,onClose:r,onClick:c,...l})=>{const i=a=>{if(e){a.preventDefault(),a.stopPropagation();return}c?.(a)},x=a=>{if(a.stopPropagation(),e){a.preventDefault();return}r?.(a)};return t.jsxs(N,{...l,onClick:i,"aria-disabled":e||void 0,children:[t.jsx(h,{disabled:e,closable:n,children:l.children}),t.jsx(v,{is:n,children:t.jsx(b,{disabled:e,onClick:x,ariaLabel:"Remove tag"})})]})};T.__docgenInfo={description:"",methods:[],displayName:"Tag"};export{T};
