import{j as t}from"./jsx-runtime-u17CrQMm.js";import{C as O,a as j,n as f,F as H,L as E,e as $,N as v,I as T,i as D}from"./button-sKft9pFr.js";import{P as l,G as M,M as k,c as i,u as P,B as C,s as F,e as h,S as g,i as N}from"./shadows-CyjoGr4u.js";import{r as d}from"./iframe-Co_0DYZM.js";import{u as B}from"./useOnClickOutside-BSLQrXXa.js";import{C as w}from"./checkbox-Cf_FJ72f.js";const R=P`
  from { transform: scale(.6) }
  to { transform: scale(1) }
`,_=i(O).attrs({role:"menu"})`
  section {
    padding: ${l.xxs};
    display: flex;
    flex-direction: column;
    gap: ${M.xxxs};
  }
  position: absolute;
  z-index: 1;
  top: calc(100% + 4px);
  right: 0;
  width: 240px;
  will-change: transform;
  transform-origin: top right;
  animation: ${R} 0.12s ease-out;

  ul {
    margin: ${k.none};
    padding: ${l.none};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,z=i(j).attrs({type:"button",role:"menuitem",large:!0})`
  padding: ${l.s};
  border: none;
  width: 100%;
  justify-content: flex-start;
  border-radius: 6px;
  box-sizing: border-box;
`;function G(e){const{closeOnItemSelect:n=!1}=e??{},[o,s]=d.useState(!1),r=d.useCallback(()=>s(u=>!u),[]),c=d.useCallback(()=>s(!0),[]),a=d.useCallback(()=>s(!1),[]),p=d.useCallback(()=>{n&&s(!1)},[n]),m=d.useCallback(u=>(...I)=>{u?.(...I),n&&s(!1)},[n]),b=B(()=>{s(u=>u&&!1)});return{isOpen:o,toggle:r,open:c,close:a,onItemSelect:p,withItemAction:m,clickOutsideRef:b}}const le=i.table`
  width: 100%;
  border-spacing: 0;
  overflow: hidden;
  table-layout: fixed;
  word-break: break-word;
  border: ${({$bordered:e=!0})=>e?`1px solid ${C.Default.Default}`:"none"};

  ${({$bordered:e=!0})=>e?h`
          ${F}
        `:""}
`,ae=i.tbody`
  tr:nth-child(odd) {
    background-color: ${g.Default.Default};
  }
  tr:nth-child(even) {
    background-color: ${g.Default.Subdued};
  }
`,y=i.th.attrs({scope:"col"})`
  text-align: left;
  padding: ${l.m} ${l.l};
  border-top: ${({$bordered:e=!0})=>e?"none":`1px solid ${C.Default.Subdued}`};
  border-bottom: 1px solid ${C.Default.Subdued};
  background-color: ${g.Default.Subdued};
`,L=i.td`
  padding: ${l.none} ${l.s};
  height: 72px;

  ${({$fitContent:e})=>f(e)?h`
          white-space: nowrap;
          width: 1%;
        `:h`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`,ce=i.tr`
  ${({selected:e})=>f(e)?h`
          background-color: ${g.Selected.Default}!important;
        `:""}
`,de=i.thead``,V=i(y)`
  padding: ${l.m} ${l.none};
  padding-left: ${l.s};
`,U=i.td`
  padding-left: ${l.s};
  height: 72px;
`,q=i($.EllipsisVertical)`
  display: block;
`,J=i.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`,K=i(_)`
  position: absolute;
  top: ${k.xs};
  width: max-content;
  right: 0;
  margin: ${k.none};
  z-index: 10;
`,Q=i(j).attrs({type:"button",plain:!0,subtle:!0})`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: ${l.xs};
  cursor: pointer;
`;function W(e){return d.isValidElement(e)&&e.type===A}const S=function(n){const{sort:o,isPlaceholder:s,onSortClick:r,children:c,...a}=n,p=D(o)&&o!=="NONE",m=o==="DESC",b=t.jsxs(H,{children:[N(c)?t.jsx(E,{strong:!0,subdued:!0,children:c}):c,p?m?t.jsx($.ChevronDownSolid,{}):t.jsx($.ChevronUpSolid,{}):t.jsx(v,{})]});return t.jsx(y,{...a,"aria-sort":o==="ASC"?"ascending":o==="DESC"?"descending":"none",children:t.jsx(T,{is:!f(s),children:D(o)?t.jsx(Q,{onClick:r,children:b}):b})})},x=function({fitContent:e,...n}){return t.jsx(L,{...n,$fitContent:e})},X=function(n){return t.jsx(V,{children:t.jsx(w,{...n,indeterminate:!0})})},Y=function(e){const{selected:n,checked:o,...s}=e,r=f(o)||f(n);return t.jsx(U,{children:t.jsx(w,{...s,checked:r})})},Z=function(n){return t.jsx(S,{...n})},A=function(n){const{children:o,icon:s,disabled:r,onClick:c,destructive:a}=n;return t.jsx(z,{onClick:c,disabled:r,IconPrefix:s,destructive:a,children:o})},ee=function(n){const{children:o,...s}=n,r=G({closeOnItemSelect:!0}),c=d.Children.map(o,a=>{if(!W(a))return a;const{onClick:p,disabled:m}=a.props;return d.cloneElement(a,{onClick:()=>{m||(p?.(),r.onItemSelect())}})});return t.jsx(x,{...s,children:t.jsxs(J,{ref:r.clickOutsideRef,children:[t.jsx(j,{plain:!0,subtle:!0,type:"button","aria-haspopup":"menu","aria-expanded":r.isOpen,onClick:r.toggle,children:t.jsx(q,{})}),t.jsx(T,{is:r.isOpen,children:t.jsx(K,{children:c})})]})})};S.Select=X;S.Actions=Z;x.Select=Y;x.Actions=ee;x.Action=A;S.__docgenInfo={description:"",methods:[{name:"Select",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null},{name:"Actions",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null}],displayName:"TH"};x.__docgenInfo={description:"",methods:[{name:"Select",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null},{name:"Actions",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null},{name:"Action",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null}],displayName:"TD"};export{le as T,de as a,ce as b,S as c,ae as d,x as e};
