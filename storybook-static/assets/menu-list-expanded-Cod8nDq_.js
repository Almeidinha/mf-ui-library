import{j as u}from"./jsx-runtime-u17CrQMm.js";import{B as R,S as k,s as O,c as C}from"./shadows-CyjoGr4u.js";import{r as I,F as H,e as P,I as D,q,l as F,L as N}from"./button-sKft9pFr.js";import{r as t}from"./iframe-Co_0DYZM.js";import{O as $,g as K}from"./menu-CZpM_CeP.js";import{r as A}from"./index-AB_7CA6O.js";const x=50,_=C.div`
  border: 1px solid ${R.Default.Subdued};
  background-color: ${k.Default.Default};
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  top: ${({$top:e})=>e}px;
  left: ${({$left:e})=>e}px;
  max-height: ${({$maxHeight:e})=>e}px;

  ${O};
`;function z(e,i,a){return Math.max(i,Math.min(a,e))}function W(e){const{anchorEl:i,menuWidth:a,offset:n}=e,m=i.getBoundingClientRect(),d=window.innerWidth,r=window.innerHeight,s=m.right+n,l=m.left-n-a,v=s+a<=d-6?s:Math.max(6,l),g=6,c=Math.max(g,r-6-x),f=z(m.top,g,c),o=Math.max(x,r-f-6);return{top:f,left:v,maxHeight:o}}const M=e=>{const{selected:i,labelComponent:a,option:n,height:m,selectedValues:d,getOptionKey:r,expandedKeys:s,containerRef:l}=e,y=F(a,N),v=t.useMemo(()=>d.some(p=>r(p)===r(n.value)),[d,n.value,r]),g=t.useMemo(()=>r(n.value),[n.value,r]),c=s.has(g),f=t.useRef(null),[o,b]=t.useState({top:0,left:0,maxHeight:300}),T=!I(n?.options),j=t.useCallback(()=>{T?e.onExpand?.(n):e.onSelect(n.value,n)},[T,n,e]),w=t.useCallback(()=>{const p=f.current;if(!p)return;const h=l.current?.getBoundingClientRect().width??250;b(W({anchorEl:p,menuWidth:h,offset:6}))},[l]);return t.useLayoutEffect(()=>{c&&w()},[c,w]),t.useEffect(()=>{if(!c)return;const p=()=>w(),h=()=>w();window.addEventListener("scroll",p,!0),window.addEventListener("resize",h);const E=l.current;return E?.addEventListener("scroll",p,{passive:!0}),()=>{window.removeEventListener("scroll",p,!0),window.removeEventListener("resize",h),E?.removeEventListener("scroll",p)}},[c,w,l]),u.jsxs(u.Fragment,{children:[u.jsx("div",{ref:f,children:u.jsxs($,{"data-role":"option",center:!0,state:K(v,i),height:m,onClick:j,children:[u.jsx(y,{type:"option",active:v,...n,children:u.jsxs(H,{children:[n.icon,n.label]})}),T&&u.jsx(P.ChevronRightSolid,{})]})}),u.jsx(D,{is:c===!0&&T,children:A.createPortal(u.jsx(_,{$top:o.top,$left:o.left,$maxHeight:o.maxHeight,children:q(n?.options).map(p=>u.jsx(L,{option:p,labelComponent:a,height:m,selectedValues:d,onSelect:e.onSelect,onExpand:e.onExpand,onReturn:e.onReturn,getOptionKey:r,expandedKeys:s,containerRef:l},r(p.value)))}),document.body)})]})},L=t.memo(M);M.__docgenInfo={description:"",methods:[],displayName:"OptionMultiLevelExpandedComponentImpl",props:{option:{required:!0,tsType:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},description:""},selectedValues:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""},height:{required:!1,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
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
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},getOptionKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => string",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"string"}}},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T, option: IOption<T>) => void",signature:{arguments:[{type:{name:"T"},name:"value"},{type:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},name:"option"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(option: IOption<T>) => void",signature:{arguments:[{type:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},name:"option"}],return:{name:"void"}}},description:""},onReturn:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},expandedKeys:{required:!0,tsType:{name:"Set",elements:[{name:"string"}],raw:"Set<string>"},description:""},containerRef:{required:!0,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement | null>",elements:[{name:"union",raw:"HTMLDivElement | null",elements:[{name:"HTMLDivElement"},{name:"null"}]}]},description:""}}};const S=({index:e,data:i,expandedKeys:a,containerRef:n})=>{const{value:m,options:d,labelComponent:r,selectedIndex:s,rowHeight:l,onSelect:y,onExpand:v,onReturn:g,getOptionKey:c}=i,f=d[e];return u.jsx(L,{option:f,labelComponent:r,height:l,selectedValues:m,selected:s===e,onSelect:y,onExpand:v,onReturn:g,getOptionKey:c,expandedKeys:a,containerRef:n})},B=t.memo(S);S.__docgenInfo={description:"",methods:[],displayName:"RowMultiLevelsExpandedImp",props:{expandedKeys:{required:!0,tsType:{name:"Set",elements:[{name:"string"}],raw:"Set<string>"},description:""},containerRef:{required:!0,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement | null>",elements:[{name:"union",raw:"HTMLDivElement | null",elements:[{name:"HTMLDivElement"},{name:"null"}]}]},description:""}}};const V=C.div`
  border: 1px solid ${R.Default.Subdued};
  background-color: ${k.Default.Default};
  height: ${({height:e})=>e}px;
  max-height: ${({height:e})=>e}px;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    min-height: 50px;
    border: 2px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 1em;
    background-color: ${k.Neutral.Default};
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ${O};
`;function G(e,i){const a=new Map,n=(m,d)=>{for(const r of m){const s=i(r.value),l=[...d,s];a.set(s,l),I(r.options)||n(q(r.options),l)}};return n(e,[]),a}const J=e=>{const i=t.useMemo(()=>q(e.options),[e.options]),{value:a,getOptionKey:n}=e,m=t.useMemo(()=>{const o=i.length*x+2;return e.menuHeight??o},[e.menuHeight,i.length]),d=t.useRef(null),[r,s]=t.useState(()=>new Set);t.useEffect(()=>{s(new Set)},[i]);const l=t.useMemo(()=>G(i,n),[i,n]),y=t.useCallback(o=>{const b=n(o.value),T=l.get(b)??[];s(new Set(T))},[n,l]),v=t.useCallback(o=>{y(o),e.onExpand?.(o)},[y,e]),g=t.useCallback((o,b)=>{y(b),e.onSelect(o,b)},[y,e]),c=t.useMemo(()=>e.multi&&Array.isArray(a)?a:a==null||Array.isArray(a)?[]:[a],[a,e.multi]),f=t.useMemo(()=>({options:i,value:c,multi:e.multi,selectedIndex:e.selectedIndex,rowHeight:e.rowHeight,labelComponent:e.labelComponent,getOptionKey:n,onSelect:g,onExpand:v,onReturn:e.onReturn}),[i,c,e.multi,e.selectedIndex,e.rowHeight,e.labelComponent,e.onReturn,n,g,v]);return u.jsx(V,{ref:d,height:m,children:i.map((o,b)=>u.jsx(B,{data:f,expandedKeys:r,containerRef:d,index:b},n(o.value)))})};J.__docgenInfo={description:"",methods:[],displayName:"MenuListExpanded",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"}],raw:"IOption<T>[]"},description:""},value:{required:!1,tsType:{name:"union",raw:"T | T[]",elements:[{name:"T"},{name:"Array",elements:[{name:"T"}],raw:"T[]"}]},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
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
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},menuComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
  [key in keyof E]: E[key];
}`,elements:[{name:"FunctionComponent",elements:[{name:"signature",type:"object",raw:`{
  options?: IOption<T>[];
  value?: T | T[];

  labelComponent?: SelectLabelComponent<T>;
  menuComponent?: SelectMenuComponent<T>;
  emptyText?: string;

  multi?: boolean;
  rowHeight?: number;
  menuHeight?: number;
  menuPosition?: "top" | "bottom";

  invalid?: boolean;
  selectedIndex?: number;
  open: boolean;
  search?: string;

  labelPosition?: string;
  label?: string;
  menuTitle?: string;
  multiLevel?: boolean;
  className?: string;

  getOptionKey: (value: T) => string;
  onSelect(value: T | T[] | undefined, option?: IOption<T>): void;
  onExpand?(option: IOption<T>): void;
  onReturn?(): void;
}`,signature:{properties:[{key:"options",value:{name:"Array",elements:[{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"}],raw:"IOption<T>[]",required:!1}},{key:"value",value:{name:"union",raw:"T | T[]",elements:[{name:"T"},{name:"Array",elements:[{name:"T"}],raw:"T[]"}],required:!1}},{key:"labelComponent",value:{name:"FC",required:!1}},{key:"menuComponent",value:{name:"SelectMenuComponent",required:!1}},{key:"emptyText",value:{name:"string",required:!1}},{key:"multi",value:{name:"boolean",required:!1}},{key:"rowHeight",value:{name:"number",required:!1}},{key:"menuHeight",value:{name:"number",required:!1}},{key:"menuPosition",value:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}],required:!1}},{key:"invalid",value:{name:"boolean",required:!1}},{key:"selectedIndex",value:{name:"number",required:!1}},{key:"open",value:{name:"boolean",required:!0}},{key:"search",value:{name:"string",required:!1}},{key:"labelPosition",value:{name:"string",required:!1}},{key:"label",value:{name:"string",required:!1}},{key:"menuTitle",value:{name:"string",required:!1}},{key:"multiLevel",value:{name:"boolean",required:!1}},{key:"className",value:{name:"string",required:!1}},{key:"getOptionKey",value:{name:"signature",type:"function",raw:"(value: T) => string",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"string"}},required:!0}},{key:"onSelect",value:{name:"void",required:!0}},{key:"onExpand",value:{name:"void",required:!1}},{key:"onReturn",value:{name:"void",required:!1}}]}}],raw:"FunctionComponent<P>"},{name:"signature",type:"object",raw:`{
  [key in keyof E]: E[key];
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},emptyText:{required:!1,tsType:{name:"string"},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""},rowHeight:{required:!1,tsType:{name:"number"},description:""},menuHeight:{required:!1,tsType:{name:"number"},description:""},menuPosition:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},selectedIndex:{required:!1,tsType:{name:"number"},description:""},open:{required:!0,tsType:{name:"boolean"},description:""},search:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},menuTitle:{required:!1,tsType:{name:"string"},description:""},multiLevel:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},getOptionKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => string",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"string"}}},description:""}}};export{J as M,x as R};
