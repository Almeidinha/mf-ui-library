import{j as w}from"./jsx-runtime-u17CrQMm.js";import{M as D,B as n,I as o,S as d,A as l,F as C,c as v}from"./shadows-CyjoGr4u.js";import{m as $,i as S}from"./button-sKft9pFr.js";import{u as R}from"./useMergedRefs-CBj2iGZS.js";import{r as s}from"./iframe-Co_0DYZM.js";const f=e=>`data:image/svg+xml;utf8,${encodeURIComponent(e)}`,I=f(`
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 10 8'>
    <rect fill='white' width='10' height='2' rx='1'/>
  </svg>
`),y=f(`
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 10 8'>
    <path d='M4.5 7.3L1 4l1.4-1.4 2.1 2.1L8.6 0l1.4 1.4z' fill='white'/>
  </svg>
`),B=v.input.withConfig({shouldForwardProp:e=>!["indeterminate"].includes(e)})`
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 22px;
  height: 22px;
  margin: ${D.none};
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid
      ${({$error:e})=>e?n.Critical.Default:o.Default.Disabled};
    background: ${({$error:e})=>e?d.Critical.Subdued:d.Default.Default};
  }

  &:checked::before,
  &:indeterminate::before {
    background: ${({$error:e})=>e?l.Critical.Default:o.Default.Default};
    border-color: ${({$error:e})=>e?l.Critical.Default:o.Default.Default};
  }

  &:checked::after {
    content: "";
    position: absolute;
    background-image: url("${y}");
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    left: 3px;
    top: 4px;
  }

  &:indeterminate::after {
    content: "";
    position: absolute;
    background-image: url("${I}");
    background-repeat: no-repeat;
    width: 14px;
    height: 16px;
    left: 4px;
    top: 8px;
  }

  &:focus-visible::before {
    outline: 2px solid ${C.Default};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled::before {
    background: ${d.Default.Subdued};
    border-color: ${n.Default.Default};
  }

  &:disabled:checked::before,
  &:disabled:indeterminate::before {
    background: ${o.Default.Disabled};
    border-color: ${n.Default.Dark};
  }

  &:disabled::after {
    opacity: 0.7;
  }
`;function u(e){return e.indeterminate===!0}const M=e=>{if(e===!1)return!0;if(e!==!0)return!1},h=(e,b)=>{const{error:g,disabled:a,checked:t,...p}=e,c=s.useRef(null),m=R(c,b),i=u(e);s.useEffect(()=>{const r=c.current;r&&(r.indeterminate=i&&t===void 0)},[t,i]);const x=s.useCallback(r=>{a||!S(e.onChange)||(u(e)?e.onChange(M(e.checked)):e.onChange(r.target.checked))},[a,e]),k=i&&t===void 0?"mixed":t?"true":"false";return w.jsx(B,{...p,ref:m,type:"checkbox",checked:t===!0,disabled:a,"aria-checked":k,$error:g,onChange:x})},j=$(h);j.displayName="Checkbox";h.__docgenInfo={description:"",methods:[],displayName:"CheckboxImpl"};export{j as C};
