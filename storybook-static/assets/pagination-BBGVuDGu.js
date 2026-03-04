import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as b}from"./iframe-Co_0DYZM.js";import{F as p,I as f,B as k,e as S,j as A,T as D,a as y}from"./button-sKft9pFr.js";import{G as F,c as r,B as G,S as M}from"./shadows-CyjoGr4u.js";import{I as R}from"./input-number-CNAO7S9z.js";import{S as O}from"./select-DfDUyGFp.js";const $=[5,10,20,50,100],K=10,s=1,V=r(R)`
  width: 60px;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
`,I=r(p)`
  height: 36px;
  align-items: center;
  padding: 0 12px;
  border: 1px solid ${G.Default.Default};
  border-radius: 6px;
  background-color: ${M.Neutral.Default};
  ${D.Body};
`,Z=r(I)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`,P=r(I)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`,H=r(y)`
  border-radius: 6px 0px 0px 6px;
  border-right: 0;
`,U=r(y).attrs({type:"button",subtle:!0})`
  border-radius: 0px 6px 6px 0px;
`,J=r(p)`
  align-items: center;
`,Q=r(O)`
  & .select-value {
    border-radius: 6px 0px 0px 6px;
    border-right: 0;
  }
  width: 70px;
`,l=(u,d)=>Math.min(Math.max(u,s),d),W=u=>{const{page:d=s,totalPages:T,onChange:c,showPageInfo:j=!0,previousLabel:m,nextLabel:x,pageSize:v=K,onPageSizeChange:C,showPageSizeSelector:w=!1,pageSizeOptions:z=$}=u,a=Math.max(T??0,s),n=l(d,a),[g,i]=b.useState(n);b.useEffect(()=>{i(n)},[n]);const h=e=>{if(A(e)||Number.isNaN(e)){i(n);return}const o=l(Math.trunc(e),a);i(o),o!==n&&c?.(o)},B=e=>{e.key==="Enter"&&h(g),e.key==="Escape"&&i(n)},N=()=>{const e=l(n-1,a);e!==n&&c?.(e)},E=()=>{const e=l(n+1,a);e!==n&&c?.(e)},q=e=>{const o=e;!Number.isFinite(o)||o<=0||C?.(o)},L=!!m,_=!!x;return t.jsxs(p,{center:!0,gap:F.l,children:[t.jsx(f,{is:j,children:t.jsx(k,{children:t.jsxs(p,{center:!0,children:[t.jsx(Z,{children:"Page"}),t.jsx(V,{"aria-label":"Current page",value:g,min:s,max:a,step:1,onChange:e=>i(e),onBlur:()=>h(g),onKeyDown:B}),t.jsx(P,{children:`/${a}`})]})})}),t.jsxs(p,{children:[t.jsx(H,{"aria-label":"Previous page",IconPrefix:S.ChevronLeftSolid,onClick:N,disabled:n<=s,type:"button",children:L?m:null}),t.jsx(U,{"aria-label":"Next page",IconSuffix:S.ChevronRightSolid,onClick:E,disabled:n>=a,type:"button",children:_?x:null})]}),t.jsx(f,{is:w,children:t.jsxs(J,{children:[t.jsx(Q,{ariaLabel:"Items per page",id:"items-per-page-label",ariaLabelledBy:"items-per-page-label",menuHeight:500,menuPosition:"top",value:v,options:z.map(e=>({label:String(e),value:e})),onChange:e=>q(Number(e))}),t.jsx(P,{children:"/Page"})]})})]})};W.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{page:{required:!0,tsType:{name:"number"},description:""},totalPages:{required:!0,tsType:{name:"number"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},showPageInfo:{required:!1,tsType:{name:"boolean"},description:""},previousLabel:{required:!1,tsType:{name:"string"},description:""},nextLabel:{required:!1,tsType:{name:"string"},description:""},pageSize:{required:!1,tsType:{name:"number"},description:""},onPageSizeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"pageSize"}],return:{name:"void"}}},description:""},showPageSizeSelector:{required:!1,tsType:{name:"boolean"},description:""},pageSizeOptions:{required:!1,tsType:{name:"unknown"},description:""}}};export{W as P};
