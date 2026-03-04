import{j as o}from"./jsx-runtime-u17CrQMm.js";import{l as B,n,i as j,e as A,q as ye,B as Me,d as Ve,h as _e,F as se,p as Ke,T as We,N as pe,a as Ue,L as ge,m as ze,j as Ge}from"./button-sKft9pFr.js";import{u as He}from"./useOnClickOutside-BSLQrXXa.js";import{u as Xe}from"./useMergedRefs-CBj2iGZS.js";import{r}from"./iframe-Co_0DYZM.js";import{P as s,c as h,S as re,B as fe,F as le,e as be,M,a as Je,T as ue}from"./shadows-CyjoGr4u.js";import{S as ve,d as he,a as Qe,k as v,M as Ye}from"./menu-CZpM_CeP.js";import{l as F,i as J,D as Ze}from"./types-C3AmYhER.js";import{T as en}from"./tag-DifDEUaX.js";const nn=h(en)`
  div:first-child {
    min-height: auto;
    padding: ${s.none} ${s.none} ${s.none} ${s.xxs};
  }
  div:last-child {
    padding: ${s.none};
  }
`,xe=e=>{const{option:t,onRemove:u,labelComponent:g}=e,f=B(g,ve),x=["value-multi",e.className].filter(Boolean).join(" ");return o.jsx(nn,{className:x,closable:!0,onClose:()=>u(t.value),children:o.jsx(f,{value:t.value,type:"value-multi",active:!0,default:!0,disabled:t.disabled,label:t.label,icon:t.icon,children:t.label})})},tn=r.memo(xe);xe.__docgenInfo={description:"",methods:[],displayName:"ValueComponentMultiImpl",props:{className:{required:!1,tsType:{name:"string"},description:""},option:{required:!0,tsType:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
  [key in keyof E]: E[key];
}`,elements:[{name:"FunctionComponent",elements:[{name:"signature",type:"object",raw:`{
  value: T;
  active: boolean;
  type: "value-single" | "value-multi" | "option";
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}`,signature:{properties:[{key:"value",value:{name:"T",required:!0}},{key:"active",value:{name:"boolean",required:!0}},{key:"type",value:{name:"union",raw:'"value-single" | "value-multi" | "option"',elements:[{name:"literal",value:'"value-single"'},{name:"literal",value:'"value-multi"'},{name:"literal",value:'"option"'}],required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1}},{key:{name:"string"},value:{name:"any",required:!0}}]}}],raw:"FunctionComponent<P>"},{name:"signature",type:"object",raw:`{
  [key in keyof E]: E[key];
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"}],raw:"IOption<T>[]"},description:""}}};const Te=e=>{const{option:t,labelComponent:u}=e,g=B(u,ve),f=["value-single",e.className].filter(Boolean).join(" ");return o.jsx(g,{value:t.value,active:!0,type:"value-single",className:f,default:!0,disabled:t.disabled,label:t.label,icon:t.icon,style:{pointerEvents:"none"},children:t.label})},an=r.memo(Te);Te.__docgenInfo={description:"",methods:[],displayName:"ValueComponentSingleImpl",props:{className:{required:!1,tsType:{name:"string"},description:""},option:{required:!0,tsType:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
  [key in keyof E]: E[key];
}`,elements:[{name:"FunctionComponent",elements:[{name:"signature",type:"object",raw:`{
  value: T;
  active: boolean;
  type: "value-single" | "value-multi" | "option";
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}`,signature:{properties:[{key:"value",value:{name:"T",required:!0}},{key:"active",value:{name:"boolean",required:!0}},{key:"type",value:{name:"union",raw:'"value-single" | "value-multi" | "option"',elements:[{name:"literal",value:'"value-single"'},{name:"literal",value:'"value-multi"'},{name:"literal",value:'"option"'}],required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1}},{key:{name:"string"},value:{name:"any",required:!0}}]}}],raw:"FunctionComponent<P>"},{name:"signature",type:"object",raw:`{
  [key in keyof E]: E[key];
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""}}};const on=h(Ve)`
  pointer-events: ${({disabled:e})=>n(e)?"none":"auto"};
  padding: ${s.xs} ${s.none};
  background: ${({$invalid:e,disabled:t})=>n(e)?re.Critical.Subdued:n(t)?re.Default.Subdued:re.Default.Default};
  cursor: default;
  border: 1px solid
    ${({$invalid:e})=>n(e)?fe.Critical.Default:fe.Default.Default};
  border-radius: 6px;
  outline-offset: -2px;

  flex-direction: ${({$iconPosition:e})=>n(e===J.LEFT)?"row-reverse":"row"};

  ${({$menuIsOpen:e})=>n(e)&&be`
      outline: 2px solid ${le.Default};
    `}

  ${({disabled:e})=>n(e)&&`
    &:focus-visible {
      outline: none;
    }
  `}
  
  ${({disabled:e,$invalid:t})=>!n(e)&&!n(t)&&`
    &:focus  {
      outline: 2px solid ${le.Default}
    }

    &:focus-within {
      outline: 2px solid ${le.Default}
    }
  `}
`,rn=h(se)`
  width: 100%;
  padding-right: ${s.xs};
  display: ${({$label:e,$labelPosition:t})=>j(e)&&!_e(e)&&t===F.TOP?"block":"flex"};

  flex-direction: ${({$iconPosition:e})=>n(e===J.LEFT)?"row-reverse":"row"};
`,ln=h(ge)`
  padding-left: ${s.s};
  margin-bottom: ${({$labelPosition:e})=>e===F.TOP?M.xxs:M.none};
  display: flex;
  align-self: ${({$labelPosition:e})=>e===F.TOP?"flex-start":"center"};
  width: fit-content;
  white-space: pre;
  ${({$labelPosition:e})=>e===F.TOP&&be`
      flex-basis: 100%;
    `}
`,sn=h(se)`
  padding-left: ${s.s};
  width: 100%;
  flex-wrap: ${({$multi:e,$hasValue:t})=>n(e)&&n(t)?"wrap":"nowrap"};
  user-select: none;
  min-width: 0;
  min-height: 20px;
  box-sizing: border-box;
  gap: ${({$multi:e,$hasValue:t})=>n(e)&&n(t)?"4px":0};
  ${We.Body}
`,un=h(se)`
  padding-right: ${({$iconPosition:e})=>n(e!==J.LEFT)?`${s.xs}`:`${s.none}`};
  padding-left: ${({$iconPosition:e})=>n(e===J.LEFT)?`${s.xs}`:`${s.none}`};
  cursor: pointer;
`,cn=h(ge)`
  pointer-events: none;
  color: ${ue.Light};
`,dn=h(Ue).attrs({plain:!0,subtle:!0})`
  padding: ${s.none};
  margin-right: ${M.none};
  gap: 0;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: transparent;
  }
`,mn=h.div`
  display: ${({visible:e})=>n(e)?"flex":"none"};
  flex-direction: row;
  width: 100%;
  padding: ${s.xxs} ${s.none};
  & path {
    fill: ${Je.Critical};
  }
  div {
    color: ${ue.Critical};
    margin: ${M.none} ${M.xxs};
  }
`,pn=h.span`
  min-width: 1px;
  margin-left: -1px;
  user-select: text;
  opacity: ${({$canSearch:e})=>n(e)?1:0};
  position: ${({$canSearch:e})=>n(e)?"relative":"absolute"};
  left: ${({$canSearch:e})=>n(e)?"1px":"0"};
  outline: none;
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${ue.Default};
`,ke=e=>{const t=r.useRef(null),[u,g]=r.useState(""),{options:f=[],value:x,disabled:m,clearable:R,open:k,multi:y,multiLevel:V,focused:T,invalid:Q,errors:Y,label:N,searchable:b,labelPosition:O=F.TOP,iconPosition:q,customIcon:_,labelId:K}=e,S=e.getOptionKey??he,c=r.useMemo(()=>Qe(f,x,y,V,S),[f,x,y,V,S]);r.useEffect(()=>{!T&&t.current&&(t.current.innerText="",g(""))},[T]);const W=r.useCallback(()=>{t.current?.focus()},[]),Z=r.useCallback(()=>{n(m)||(n(b)&&W(),e.onClick())},[m,b,W,e]),ee=r.useCallback(l=>{l.stopPropagation(),e.onClear(),t.current&&(t.current.innerText=""),g("")},[e]),ne=r.useCallback(()=>{const l=(t.current?.innerText??"").trim();g(l),e.onInputChange?.(l),n(e.searchable)&&e.onSearch(l)},[e]),te=r.useCallback(l=>{if(!j(e.maxLength))return;const w=l?.inputType;if(w&&w.startsWith("delete"))return;const p=(t.current?.innerText??"").trim(),d=typeof l?.data=="string"?l.data:"";p.length+d.length>e.maxLength&&l.preventDefault?.()},[e.maxLength]),P=r.useCallback(l=>{(!n(b)&&l.key!==v.TAB||l.key===v.ENTER||l.key===v.ARROW_UP||l.key===v.ARROW_DOWN)&&l.preventDefault()},[b]),E=r.useMemo(()=>n(m)||!n(b)?!1:n(k)||n(T),[m,b,k,T]),U=()=>E?o.jsx(pn,{className:"search",contentEditable:!0,$canSearch:E,role:"textbox","aria-multiline":!1,"aria-label":"Search",spellCheck:!1,onInput:ne,onKeyDown:P,onBeforeInput:te,onBlur:e.onSearchBlur,ref:t}):o.jsx(pe,{}),z=()=>Ke(N,o.jsx(ln,{id:K,$labelPosition:O,subtle:!0,subdued:!0,children:N})),G=()=>{const{placeholder:l,labelComponent:w}=e;return n(b)&&n(k)&&!n(y)?o.jsx(pe,{}):c.length===0&&!T&&u.length===0?o.jsx(cn,{children:B(l,Ze)}):c.map(d=>n(y)?o.jsx(tn,{option:d,labelComponent:w,options:c,onRemove:e.onOptionRemove},S(d.value)):o.jsx(an,{option:d,labelComponent:w},S(d.value)))},H=n(R)&&c.length>0,ae=!n(y)||c.length===0,ie=n(y)&&c.length>0;return o.jsxs(o.Fragment,{children:[o.jsxs(on,{"data-role":"value",className:"select-value",disabled:m,$invalid:Q,$menuIsOpen:k,tabIndex:0,onClick:Z,center:!0,$iconPosition:q,onFocus:e.onSearchFocus,children:[o.jsxs(rn,{$label:N,$labelPosition:O,$iconPosition:q,children:[z(),o.jsxs(sn,{className:"value-left",$multi:y,$hasValue:c.length>0,children:[ae&&U(),G(),ie&&U()]})]}),H&&o.jsx(dn,{tabIndex:-1,className:"clearer",onClick:ee,IconPrefix:A.Xmark,plain:!0,subtle:!0}),o.jsx(un,{className:"value-right",center:!0,$iconPosition:q,children:j(_)?_:n(b)?o.jsx(A.MagnifyingGlass,{}):k?o.jsx(A.ChevronUpSolid,{}):o.jsx(A.ChevronDownSolid,{})})]}),ye(Y).map(l=>o.jsxs(mn,{visible:!k,children:[o.jsx(A.CircleExclamation,{}),o.jsx(Me,{children:l.message})]},l.message))]})},fn=r.memo(ke);ke.__docgenInfo={description:"",methods:[],displayName:"ValueImpl",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"}],raw:"IOption<T>[]"},description:""},value:{required:!0,tsType:{name:"union",raw:"T | T[] | undefined",elements:[{name:"T"},{name:"Array",elements:[{name:"T"}],raw:"T[]"},{name:"undefined"}]},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},clearable:{required:!1,tsType:{name:"boolean"},description:""},searchable:{required:!1,tsType:{name:"boolean"},description:""},iconPosition:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
  [key in keyof E]: E[key];
}`,elements:[{name:"FunctionComponent",elements:[{name:"signature",type:"object",raw:`{
  value: T;
  active: boolean;
  type: "value-single" | "value-multi" | "option";
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}`,signature:{properties:[{key:"value",value:{name:"T",required:!0}},{key:"active",value:{name:"boolean",required:!0}},{key:"type",value:{name:"union",raw:'"value-single" | "value-multi" | "option"',elements:[{name:"literal",value:'"value-single"'},{name:"literal",value:'"value-multi"'},{name:"literal",value:'"option"'}],required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1}},{key:{name:"string"},value:{name:"any",required:!0}}]}}],raw:"FunctionComponent<P>"},{name:"signature",type:"object",raw:`{
  [key in keyof E]: E[key];
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},errors:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ message: string }",signature:{properties:[{key:"message",value:{name:"string",required:!0}}]}}],raw:"{ message: string }[]"},description:""},search:{required:!1,tsType:{name:"string"},description:""},open:{required:!0,tsType:{name:"boolean"},description:""},focused:{required:!1,tsType:{name:"boolean"},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""},multiLevel:{required:!1,tsType:{name:"boolean"},description:""},labelId:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"union",raw:'"top" | "side"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"side"'}]},description:""},maxLength:{required:!1,tsType:{name:"number"},description:""},getOptionKey:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: T) => string",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"string"}}},description:""},onOptionRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},customIcon:{required:!1,tsType:{name:"unknown[IconNames]",raw:"(typeof IconFullList)[IconNames]"},description:""}}};const yn=h.div`
  position: relative;
  cursor: default;
  width: 100%;
  box-sizing: border-box;
  pointer-events: ${({disabled:e})=>n(e)?"none":"auto"};
  opacity: ${({disabled:e})=>n(e)?.75:1};
  user-select: none;
`,we=(e,t)=>{const[u,g]=r.useState(!1),[f,x]=r.useState(void 0),[m,R]=r.useState(void 0),[k,y]=r.useState(!1),{className:V,id:T,style:Q,clearable:Y,placeholder:N,value:b,disabled:O,invalid:q,errors:_,labelComponent:K,menuComponent:S,multi:c,emptyText:W,rowHeight:Z,menuHeight:ee,menuTitle:ne,menuPosition:te,label:P,labelPosition:E,customIcon:U,multiLevel:z,onOpen:G,onClose:H,ariaLabel:ae,ariaLabelledBy:ie,ariaDescribedBy:l,filterBehavior:w=(a,i)=>i.label.toLowerCase().includes(a.toLowerCase())}=e,p=n(c)?B(b,[]):b,d=e.getOptionKey??he,ce=j(e.onInputChange)||e.searchable,Ce=e.iconPosition,de=T?`${T}-label`:`label-${P?.replace(/\s+/g,"-").toLocaleLowerCase()}`,C=r.useMemo(()=>{const a=B(e.options,[]);return!j(m)||m===""?a:ye(a).filter(i=>w(m,i))},[e.options,m,w]),X=r.useCallback(()=>{g(!0),R(m);const a=Array.isArray(p)?void 0:p;x(a===void 0?void 0:C.findIndex(i=>d(i.value)===d(a))),G?.()},[p,m,C,d,G]),I=r.useCallback(()=>{g(!1),y(!1),R(void 0),x(void 0),H?.()},[H]),$e=He(a=>{a.target?.closest?.(".select-menu")||I()}),qe=Xe(t,$e),L=r.useCallback((a,i)=>{if(n(c)){Re(a,i);return}const $=Array.isArray(a)?void 0:a;Ie($,i),I()},[c,e,I]),Ie=(a,i)=>{e.multi!==!0&&e.onChange?.(a,i)},Re=(a,i)=>{e.multi===!0&&e.onChange?.(a,i)},Oe=r.useCallback(()=>{u?I():X()},[I,u,X]),Se=r.useCallback(a=>{if(C.length===0)return;if(Ge(f))return 0;let i=f;return a===v.ARROW_UP&&(i=i-1,i<0&&(i=C.length-1)),a===v.ARROW_DOWN&&(i=i===C.length-1?0:i+1),i},[C.length,f]);function je(a){const{key:i}=a;switch(i){case v.TAB:u&&I();break;case v.ARROW_UP:case v.ARROW_DOWN:a.preventDefault(),u?x(Se(i)):X();break}}function Ne(a){const{key:i}=a;switch(i){case v.ENTER:{if(!u){X();return}if(f===void 0)return;const $=C[f];if(!j($))return;const D=$.value;if(Array.isArray(p)&&n(c)){const me=d(D),Be=p.some(oe=>d(oe)===me)?p.filter(oe=>d(oe)!==me):[...p,D];L(Be,$)}else L(D,$);break}case v.ESC:u&&I();break}}function Pe(){y(!1),R(void 0),x(void 0),L(n(c)?[]:void 0)}function Ee(a){R(a),g(!0),x(0),e.onSearch?.(a)}function Le(){y(!0)}function De(){y(!1)}function Ae(a){if(Array.isArray(p)&&n(c)){const i=d(a),$=p.filter(D=>d(D)!==i);L($)}}const Fe=["select",V,u&&"open",n(q)&&"has-error"].filter(Boolean);return o.jsxs(yn,{id:T,style:Q,disabled:O,ref:qe,className:Fe.join(" "),onKeyUp:Ne,onKeyDown:je,role:"combobox","aria-expanded":u,"aria-disabled":O,"aria-label":ae,"aria-labelledby":ie??de,"aria-describedby":l,children:[o.jsx(fn,{clearable:Y,searchable:ce,iconPosition:Ce,open:u,disabled:O,multi:c,focused:k,options:e.options,placeholder:N,invalid:q,errors:_,value:p,search:m,label:P,labelPosition:E,labelComponent:K,onClear:Pe,onClick:Oe,onSearch:Ee,onSearchFocus:Le,onSearchBlur:De,onOptionRemove:Ae,onInputChange:e.onInputChange,maxLength:e.maxLength,customIcon:U,multiLevel:z,labelId:de}),o.jsx(Ye,{open:u,options:C,value:p,multi:c,invalid:q,search:m,label:P,labelPosition:E,selectedIndex:f,labelComponent:K,menuComponent:S,emptyText:W,rowHeight:Z,menuTitle:ne,menuHeight:ee,menuPosition:te,onSelect:L,multiLevel:z,getOptionKey:d})]})},qn=ze(we);we.__docgenInfo={description:"TODO: IMPLEMENT LOADING STATE",methods:[],displayName:"SelectImpl"};export{qn as S};
