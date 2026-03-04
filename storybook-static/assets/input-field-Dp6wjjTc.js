import{j as i}from"./jsx-runtime-u17CrQMm.js";import{c as n,M as o,S as b,B as j,P as s,F as y,e as B}from"./shadows-CyjoGr4u.js";import{I as r,q as E,L as m,B as k,m as M,n as l,d as N,F,T as I,i as H,h as _,g as T,S as L}from"./button-sKft9pFr.js";import{l as f}from"./types-C3AmYhER.js";import{E as O}from"./error-message-BdVgcHxy.js";const z=n.div`
  all: unset;
`,A=n(m)`
  margin-bottom: ${o.xxs};
`,R=n(k)`
  margin: ${o.xxs} ${o.none};
`,P=e=>{const{label:t,helpText:d,errors:u,className:c,htmlFor:a}=e;return i.jsxs(z,{className:c,children:[i.jsxs("label",{htmlFor:a,children:[i.jsx(r,{is:t,children:i.jsx(A,{children:t})}),e.children]}),E(u).map(x=>i.jsx(O,{message:x.message},x.message)),i.jsx(r,{is:d,children:i.jsx(R,{subdued:!0,children:d})})]})};P.__docgenInfo={description:"",methods:[],displayName:"LabeledInput"};const G=n(N)`
  background: ${({$invalid:e})=>l(e)?b.Critical.Subdued:b.Default.Default};
  border: 1px solid
    ${({$invalid:e})=>l(e)?j.Critical.Default:j.Default.Default};
  border-radius: 6px;
  box-sizing: border-box;
  padding: ${s.none} ${s.s};

  user-select: none;
  outline-offset: -2px;

  &:focus-within {
    outline: 2px solid
      ${({$invalid:e})=>l(e)?y.Critical:y.Default};
  }
  ${({$invalid:e,$disabled:t})=>l(t)?`
        background: ${l(e)?b.Critical.Subdued:b.Neutral.Subdued};
        cursor: default;
        opacity: 0.75;
      `:""}
`,J=n(F)`
  width: 100%;
  flex: 1 1 auto;
`,K=n.input.withConfig({shouldForwardProp:e=>!["invalid"].includes(e)})`
  border: 0;
  background: transparent;
  outline: none;
  font: inherit;
  color: inherit;
  cursor: auto;
  padding: ${s.xxs} ${s.none};
  width: 100%;

  /* Chrome, Safari, Edge, Opera */
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  ${I.Body}

  ::placeholder {
    ${I.LightText}
  }
`,Q=n(m)`
  margin-right: ${o.xs};
  align-self: center;
`,U=n(m)`
  margin-left: ${o.xs};
  align-self: center;
`;class w extends L{}class v extends L{}const V=n.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${s.xxs} ${s.none};

  ${e=>{const t=H(e.label)&&!_(e.label);return t&&e.$labelPosition===f.TOP?`
        padding: ${s.xs} ${s.none} ${s.xxs} ${s.none};
      `:t&&e.$labelPosition===f.SIDE?`
        flex-direction: row;
        align-items: center;
      `:""}}
`,S=n(F)`
  margin-left: ${o.s};
`,W=n(m)`
  ${({$labelPosition:e})=>e===f.SIDE&&B`
      margin-right: ${s.xs};
      flex: 0 0 auto;
    `}
`,p=M((e,t)=>{const{children:d,prefix:u,suffix:c,label:a,className:x,style:q,labelPosition:h=f.TOP,...C}=e,g=T(w,d),$=T(v,d),D=l(e.required)?"*":"";return i.jsxs(G,{$invalid:e.invalid,$disabled:e.disabled,className:x,style:q,children:[i.jsxs(V,{label:a,$labelPosition:h,htmlFor:a&&e.name,children:[i.jsx(r,{is:a,children:i.jsxs(W,{$labelPosition:h,subtle:!0,subdued:!0,children:[a,D]})}),i.jsxs(J,{children:[i.jsx(r,{is:u,children:i.jsx(Q,{subtle:!0,subdued:!0,children:u})}),i.jsx(K,{ref:t,"aria-invalid":e.invalid||void 0,"aria-required":e.required||void 0,...C}),i.jsx(r,{is:c,children:i.jsx(U,{subtle:!0,subdued:!0,children:c})})]})]}),i.jsx(r,{is:g,children:i.jsx(S,{center:!0,children:g})}),i.jsx(r,{is:$,children:i.jsx(S,{center:!0,children:$})})]})});p.Icon=w;p.Controls=v;p.Label=P;p.__docgenInfo={description:"",methods:[],displayName:"InputField",props:{invalid:{required:!1,tsType:{name:"boolean"},description:""},prefix:{required:!1,tsType:{name:"string"},description:""},suffix:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"union",raw:'"top" | "side"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"side"'}]},description:""}},composes:["InputHTMLAttributes"]};export{p as I};
