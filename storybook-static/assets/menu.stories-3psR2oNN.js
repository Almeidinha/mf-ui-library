import{j as r}from"./jsx-runtime-u17CrQMm.js";import{N as L,I as H,F as O,a as P,f as C,e as A}from"./button-sKft9pFr.js";import{c as T,G as B}from"./shadows-CyjoGr4u.js";import{r as i}from"./iframe-Co_0DYZM.js";import{M as F,d as _}from"./menu-CZpM_CeP.js";import{r as K}from"./index-AB_7CA6O.js";import{R as G,M as W}from"./menu-list-expanded-Cod8nDq_.js";import"./preload-helper-PPVm8Dsz.js";import"./types-C3AmYhER.js";import"./index-MAKt5DRM.js";function S(e,s,t){return Math.max(s,Math.min(t,e))}function $(e){const{anchorEl:s,placement:t,offset:l,panelWidth:m,panelHeight:p,viewportPadding:n=8}=e,u=s.getBoundingClientRect(),w=window.innerWidth,g=window.innerHeight;let d=0,c=0;const v=u.left,b=u.right-m,f=u.bottom+l,M=u.top-l-(p??0);switch(t){case"bottom-start":d=v,c=f;break;case"bottom-end":d=b,c=f;break;case"top-start":d=v,c=M;break;case"top-end":d=b,c=M;break;case"right-start":d=u.right+l,c=u.top;break;case"left-start":d=u.left-l-m,c=u.top;break}const o=S(d,n,w-n-m),a=n,y=p?g-n-p:g-n-40,h=S(c,a,Math.max(a,y));return{top:Math.round(h),left:Math.round(o)}}const z=T.div`
  z-index: 9999;
  position: fixed;
  top: ${({$top:e})=>e}px;
  left: ${({$left:e})=>e}px;
  overflow: hidden;
`,N=T(F)`
  top: 0;
`,k=e=>{const{items:s,open:t,anchorRef:l,placement:m="bottom-start",offset:p=8,viewportPadding:n=8,onSelect:u}=e,w=i.useRef(null),[g,d]=i.useState(null),[c,v]=i.useState(()=>({top:n,left:n})),b=i.useMemo(()=>{const o=s.length*G+2;return e.menuHeight??o},[s.length,e.menuHeight]),f=i.useCallback(()=>{if(!t)return;const o=l?.current??null;if(!o){v({top:n,left:n});return}const a=w.current,y=o.getBoundingClientRect(),h=Math.round(y.width)||1,I=a?.getBoundingClientRect(),q=(g?.width??Math.round(I?.width??0))||h,E=(g?.height??Math.round(I?.height??0))||void 0,j=$({anchorEl:o,placement:m,offset:p,panelWidth:q,panelHeight:E,viewportPadding:n});v(j)},[t,l,m,p,n,g]);if(i.useLayoutEffect(()=>{if(!t)return;const o=w.current;if(!o)return;const a=o.getBoundingClientRect(),y={width:Math.round(a.width),height:Math.round(a.height)};d(h=>h&&h.width===y.width&&h.height===y.height?h:y)},[t,s.length]),i.useLayoutEffect(()=>{t&&f()},[t,g,f]),i.useEffect(()=>{if(!t)return;const o=()=>f(),a=()=>f();return window.addEventListener("scroll",o,!0),window.addEventListener("resize",a),()=>{window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",a)}},[t,f]),!t)return r.jsx(L,{});const M=(o,a)=>{a?.onItemSelect?.(),u?.(a)};return K.createPortal(r.jsx(z,{ref:w,$top:c.top,$left:c.left,children:r.jsx(N,{options:s,value:[],menuComponent:W,emptyText:e.emptyText??"",multi:e.multi??!0,menuHeight:b,invalid:e.invalid??!1,open:t,search:e.search??"",label:e.label??"",menuTitle:e.menuTitle??"",multiLevel:e.multiLevel??!0,getOptionKey:e.getOptionKey,onSelect:M})}),document.body)};k.__docgenInfo={description:"",methods:[],displayName:"PortalMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:"IOption<unknown> & { onItemSelect?: () => void }",elements:[{name:"IOption",elements:[{name:"unknown"}],raw:"IOption<unknown>"},{name:"signature",type:"object",raw:"{ onItemSelect?: () => void }",signature:{properties:[{key:"onItemSelect",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]}],raw:"MenuItem[]"},description:""},open:{required:!0,tsType:{name:"boolean"},description:""},anchorRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLElement | null>",elements:[{name:"union",raw:"HTMLElement | null",elements:[{name:"HTMLElement"},{name:"null"}]}]},description:""},placement:{required:!1,tsType:{name:"union",raw:`| "bottom-start"
| "bottom-end"
| "top-start"
| "top-end"
| "right-start"
| "left-start"`,elements:[{name:"literal",value:'"bottom-start"'},{name:"literal",value:'"bottom-end"'},{name:"literal",value:'"top-start"'},{name:"literal",value:'"top-end"'},{name:"literal",value:'"right-start"'},{name:"literal",value:'"left-start"'}]},description:""},offset:{required:!1,tsType:{name:"number"},description:""},viewportPadding:{required:!1,tsType:{name:"number"},description:""},getOptionKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: unknown) => string",signature:{arguments:[{type:{name:"unknown"},name:"value"}],return:{name:"string"}}},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""},emptyText:{required:!1,tsType:{name:"string"},description:""},search:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},menuTitle:{required:!1,tsType:{name:"string"},description:""},multiLevel:{required:!1,tsType:{name:"boolean"},description:""},menuHeight:{required:!1,tsType:{name:"number"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: MenuItem) => void",signature:{arguments:[{type:{name:"intersection",raw:"IOption<unknown> & { onItemSelect?: () => void }",elements:[{name:"IOption",elements:[{name:"unknown"}],raw:"IOption<unknown>"},{name:"signature",type:"object",raw:"{ onItemSelect?: () => void }",signature:{properties:[{key:"onItemSelect",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},name:"item"}],return:{name:"void"}}},description:""}}};const D=T.span`
  display: inline-block;
  width: 0;
  height: 0;
`,x=e=>{const s=e.getOptionKey??_,t=i.useRef(null),l=i.useMemo(()=>e.anchorRef??t,[e.anchorRef]);return r.jsxs(r.Fragment,{children:[r.jsx(H,{is:!e.anchorRef,children:r.jsx(D,{ref:t})}),r.jsx(k,{items:e.items,open:e.open,getOptionKey:s,anchorRef:l,placement:"bottom-start",onSelect:e.onSelect,offset:8})]})};x.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
  onItemSelect?: () => void;
} & IOption<unknown>`,elements:[{name:"signature",type:"object",raw:`{
  onItemSelect?: () => void;
}`,signature:{properties:[{key:"onItemSelect",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}},{name:"IOption",elements:[{name:"unknown"}],raw:"IOption<unknown>"}]}],raw:"MenuItem[]"},description:""},open:{required:!0,tsType:{name:"boolean"},description:""},getOptionKey:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: unknown) => string",signature:{arguments:[{type:{name:"unknown"},name:"value"}],return:{name:"string"}}},description:""},anchorRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLElement | null>",elements:[{name:"union",raw:"HTMLElement | null",elements:[{name:"HTMLElement"},{name:"null"}]}]},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: MenuItem) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
  onItemSelect?: () => void;
} & IOption<unknown>`,elements:[{name:"signature",type:"object",raw:`{
  onItemSelect?: () => void;
}`,signature:{properties:[{key:"onItemSelect",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}},{name:"IOption",elements:[{name:"unknown"}],raw:"IOption<unknown>"}]},name:"item"}],return:{name:"void"}}},description:""}}};const re={title:"Components/Menu",component:x,parameters:{layout:"centered"},tags:["autodocs"],args:{items:V(),open:!1,anchor:void 0},argTypes:{anchor:{control:{type:"radio"},options:[void 0,"button","icon"],table:{defaultValue:{summary:"undefined"},type:{summary:"anchor",detail:"Story only prop to select the anchor element for the menu"}}}}},R={render:e=>{const[s,t]=i.useState(e.open),l=i.useRef(null),m=i.useRef(null),p=()=>{if(e.anchor==="button")return l;if(e.anchor==="icon")return m};return r.jsxs(O,{column:!0,children:[r.jsxs(O,{gap:B.xxl,children:[r.jsx(P,{ref:l,onClick:()=>t(n=>!n),children:"Open Menu"}),r.jsx(C.CommentLines,{ref:m})]}),r.jsx(x,{open:s,items:e.items,anchorRef:p(),onSelect:n=>{console.log("Menu item selected: ",n),t(!1)}})]})}};function V(){return[{value:"1",disabled:!1,label:"My option 1",icon:r.jsx(A.Clone,{}),options:[{value:"1.1",disabled:!1,label:"My option 1.1",onItemSelect:()=>{alert("Option 1.1 selected")}}]},{value:"2",disabled:!1,label:"My option 2",options:[{value:"2.1",disabled:!1,label:"My option 2.1",onItemSelect:()=>{alert("Option 2.1 selected")}},{value:"2.2",label:"My option 2.2",options:[{value:"2.2.1",label:"My option 2.2.1",onItemSelect:()=>{alert("Option 2.2.2 selected")}}]}]},{value:"3",disabled:!1,label:"My option 3",onItemSelect:()=>{alert("Option 3 selected")}}]}R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState<boolean>(args.open);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLElement>(null);
    const getAnchorRef = () => {
      if (args.anchor === "button") return buttonRef;
      if (args.anchor === "icon") return iconRef;
      return undefined;
    };
    return <Flex column>
        <Flex gap={Gap.xxl}>
          <Button ref={buttonRef} onClick={() => setOpen(op => !op)}>
            Open Menu
          </Button>
          <Icon.CommentLines ref={iconRef} />
        </Flex>
        <Menu open={open} items={args.items} anchorRef={getAnchorRef()} onSelect={item => {
        console.log("Menu item selected: ", item);
        setOpen(false);
      }} />
      </Flex>;
  }
}`,...R.parameters?.docs?.source}}};const ae=["Primary"];export{R as Primary,ae as __namedExportsOrder,re as default};
