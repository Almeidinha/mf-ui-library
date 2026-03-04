import{j as T}from"./jsx-runtime-u17CrQMm.js";import{r as S}from"./iframe-Co_0DYZM.js";import{m as W,l as fe,a as ye,b as Ce,c as Re}from"./types-C3AmYhER.js";import{i as F,h as Pe,n as I,d as _e,L as Y,e as V,l as Q,r as ie,I as oe,T as Ne,q as D,j as Ee,p as Me}from"./button-sKft9pFr.js";import{S as q,B as he,P as H,c as z,M as ge,a as ze}from"./shadows-CyjoGr4u.js";function je(e){const t=new WeakSet,r=i=>{if(i==null||typeof i!=="object")return i;if(i instanceof Date)return{__type:"Date",value:i.getTime()};if(F(i.toJSON)&&typeof i.toJSON=="function")return r(i.toJSON());if(t.has(i))return{__type:"Circular"};if(t.add(i),Array.isArray(i))return i.map(r);if(i instanceof Map){const l=Array.from(i.entries()).map(([y,g])=>[r(y),r(g)]);return l.sort((y,g)=>JSON.stringify(y[0]).localeCompare(JSON.stringify(g[0]))),{__type:"Map",value:l}}if(i instanceof Set){const l=Array.from(i.values()).map(r);return l.sort((y,g)=>JSON.stringify(y).localeCompare(JSON.stringify(g))),{__type:"Set",value:l}}const f=Object.keys(i).sort(),m={};for(const l of f)m[l]=r(i[l]);return m};return JSON.stringify(r(e))}const De=e=>typeof e=="string"?e:typeof e=="number"?String(e):typeof e=="boolean"?e?"true":"false":e===null?"null":e===void 0?"undefined":je(e);function pt(e,t,r,i,o){const f=e??[];if(I(i))return Le(f,t,r,o);const m=new Map;for(const l of f)m.set(o(l.value),l);if(I(r)&&Array.isArray(t))return t.map(l=>m.get(o(l))).filter(Boolean);if(!Array.isArray(t)&&t!==void 0&&t!==null){const l=m.get(o(t));return l?[l]:[]}return[]}function Ae(e){const t=[],r=i=>{for(const o of i)t.push(o),Array.isArray(o.options)&&o.options.length>0&&r(o.options)};return r(e??[]),t}function Le(e,t,r,i){const o=Ae(e??[]),f=new Map;for(const m of o)f.set(i(m.value),m);if(I(r)&&Array.isArray(t))return t.map(m=>f.get(i(m))).filter(Boolean);if(!Array.isArray(t)&&t!==void 0&&t!==null){const m=f.get(i(t));return m?[m]:[]}return[]}const ft={ARROW_UP:"ArrowUp",ARROW_DOWN:"ArrowDown",ENTER:"Enter",TAB:"Tab",ESC:"Escape"},$e=({menuPosition:e,menuHeight:t,label:r,labelPosition:i})=>e===W.TOP&&F(t)&&typeof t=="number"?`${-(t+(F(r)&&!Pe(r)&&i===fe.TOP?60:42))}px`:"4px",ve=(e,t)=>e?"active":t?"selected":"default";function G(){return G=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)({}).hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},G.apply(null,arguments)}function ae(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function X(e,t){return X=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,i){return r.__proto__=i,r},X(e,t)}function Fe(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,X(e,t)}var se=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function He(e,t){return!!(e===t||se(e)&&se(t))}function We(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!He(e[r],t[r]))return!1;return!0}function K(e,t){t===void 0&&(t=We);var r,i=[],o,f=!1;function m(){for(var l=[],y=0;y<arguments.length;y++)l[y]=arguments[y];return f&&r===this&&t(l,i)||(o=e.apply(this,l),f=!0,r=this,i=l),o}return m}function le(e,t){if(e==null)return{};var r={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.indexOf(i)!==-1)continue;r[i]=e[i]}return r}var Ue=typeof performance=="object"&&typeof performance.now=="function",ue=Ue?function(){return performance.now()}:function(){return Date.now()};function ce(e){cancelAnimationFrame(e.id)}function Be(e,t){var r=ue();function i(){ue()-r>=t?e.call(null):o.id=requestAnimationFrame(i)}var o={id:requestAnimationFrame(i)};return o}var J=-1;function me(e){if(e===void 0&&(e=!1),J===-1||e){var t=document.createElement("div"),r=t.style;r.width="50px",r.height="50px",r.overflow="scroll",document.body.appendChild(t),J=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return J}var M=null;function de(e){if(e===void 0&&(e=!1),M===null||e){var t=document.createElement("div"),r=t.style;r.width="50px",r.height="50px",r.overflow="scroll",r.direction="rtl";var i=document.createElement("div"),o=i.style;return o.width="100px",o.height="100px",t.appendChild(i),document.body.appendChild(t),t.scrollLeft>0?M="positive-descending":(t.scrollLeft=1,t.scrollLeft===0?M="negative":M="positive-ascending"),document.body.removeChild(t),M}return M}var Ke=150,Je=function(t,r){return t};function Ve(e){var t,r=e.getItemOffset,i=e.getEstimatedTotalSize,o=e.getItemSize,f=e.getOffsetForIndexAndAlignment,m=e.getStartIndexForOffset,l=e.getStopIndexForStartIndex,y=e.initInstanceProps,g=e.shouldResetStyleCacheOnItemSizeChange,k=e.validateProps;return t=(function(C){Fe(x,C);function x(p){var n;return n=C.call(this,p)||this,n._instanceProps=y(n.props,ae(n)),n._outerRef=void 0,n._resetIsScrollingTimeoutId=null,n.state={instance:ae(n),isScrolling:!1,scrollDirection:"forward",scrollOffset:typeof n.props.initialScrollOffset=="number"?n.props.initialScrollOffset:0,scrollUpdateWasRequested:!1},n._callOnItemsRendered=void 0,n._callOnItemsRendered=K(function(s,a,u,d){return n.props.onItemsRendered({overscanStartIndex:s,overscanStopIndex:a,visibleStartIndex:u,visibleStopIndex:d})}),n._callOnScroll=void 0,n._callOnScroll=K(function(s,a,u){return n.props.onScroll({scrollDirection:s,scrollOffset:a,scrollUpdateWasRequested:u})}),n._getItemStyle=void 0,n._getItemStyle=function(s){var a=n.props,u=a.direction,d=a.itemSize,b=a.layout,c=n._getItemStyleCache(g&&d,g&&b,g&&u),h;if(c.hasOwnProperty(s))h=c[s];else{var w=r(n.props,s,n._instanceProps),R=o(n.props,s,n._instanceProps),P=u==="horizontal"||b==="horizontal",_=u==="rtl",E=P?w:0;c[s]=h={position:"absolute",left:_?void 0:E,right:_?E:void 0,top:P?0:w,height:P?"100%":R,width:P?R:"100%"}}return h},n._getItemStyleCache=void 0,n._getItemStyleCache=K(function(s,a,u){return{}}),n._onScrollHorizontal=function(s){var a=s.currentTarget,u=a.clientWidth,d=a.scrollLeft,b=a.scrollWidth;n.setState(function(c){if(c.scrollOffset===d)return null;var h=n.props.direction,w=d;if(h==="rtl")switch(de()){case"negative":w=-d;break;case"positive-descending":w=b-u-d;break}return w=Math.max(0,Math.min(w,b-u)),{isScrolling:!0,scrollDirection:c.scrollOffset<d?"forward":"backward",scrollOffset:w,scrollUpdateWasRequested:!1}},n._resetIsScrollingDebounced)},n._onScrollVertical=function(s){var a=s.currentTarget,u=a.clientHeight,d=a.scrollHeight,b=a.scrollTop;n.setState(function(c){if(c.scrollOffset===b)return null;var h=Math.max(0,Math.min(b,d-u));return{isScrolling:!0,scrollDirection:c.scrollOffset<h?"forward":"backward",scrollOffset:h,scrollUpdateWasRequested:!1}},n._resetIsScrollingDebounced)},n._outerRefSetter=function(s){var a=n.props.outerRef;n._outerRef=s,typeof a=="function"?a(s):a!=null&&typeof a=="object"&&a.hasOwnProperty("current")&&(a.current=s)},n._resetIsScrollingDebounced=function(){n._resetIsScrollingTimeoutId!==null&&ce(n._resetIsScrollingTimeoutId),n._resetIsScrollingTimeoutId=Be(n._resetIsScrolling,Ke)},n._resetIsScrolling=function(){n._resetIsScrollingTimeoutId=null,n.setState({isScrolling:!1},function(){n._getItemStyleCache(-1,null)})},n}x.getDerivedStateFromProps=function(n,s){return Ge(n,s),k(n),null};var v=x.prototype;return v.scrollTo=function(n){n=Math.max(0,n),this.setState(function(s){return s.scrollOffset===n?null:{scrollDirection:s.scrollOffset<n?"forward":"backward",scrollOffset:n,scrollUpdateWasRequested:!0}},this._resetIsScrollingDebounced)},v.scrollToItem=function(n,s){s===void 0&&(s="auto");var a=this.props,u=a.itemCount,d=a.layout,b=this.state.scrollOffset;n=Math.max(0,Math.min(n,u-1));var c=0;if(this._outerRef){var h=this._outerRef;d==="vertical"?c=h.scrollWidth>h.clientWidth?me():0:c=h.scrollHeight>h.clientHeight?me():0}this.scrollTo(f(this.props,n,s,b,this._instanceProps,c))},v.componentDidMount=function(){var n=this.props,s=n.direction,a=n.initialScrollOffset,u=n.layout;if(typeof a=="number"&&this._outerRef!=null){var d=this._outerRef;s==="horizontal"||u==="horizontal"?d.scrollLeft=a:d.scrollTop=a}this._callPropsCallbacks()},v.componentDidUpdate=function(){var n=this.props,s=n.direction,a=n.layout,u=this.state,d=u.scrollOffset,b=u.scrollUpdateWasRequested;if(b&&this._outerRef!=null){var c=this._outerRef;if(s==="horizontal"||a==="horizontal")if(s==="rtl")switch(de()){case"negative":c.scrollLeft=-d;break;case"positive-ascending":c.scrollLeft=d;break;default:var h=c.clientWidth,w=c.scrollWidth;c.scrollLeft=w-h-d;break}else c.scrollLeft=d;else c.scrollTop=d}this._callPropsCallbacks()},v.componentWillUnmount=function(){this._resetIsScrollingTimeoutId!==null&&ce(this._resetIsScrollingTimeoutId)},v.render=function(){var n=this.props,s=n.children,a=n.className,u=n.direction,d=n.height,b=n.innerRef,c=n.innerElementType,h=n.innerTagName,w=n.itemCount,R=n.itemData,P=n.itemKey,_=P===void 0?Je:P,E=n.layout,B=n.outerElementType,O=n.outerTagName,A=n.style,L=n.useIsScrolling,ee=n.width,$=this.state.isScrolling,N=u==="horizontal"||E==="horizontal",xe=N?this._onScrollHorizontal:this._onScrollVertical,te=this._getRangeToRender(),Oe=te[0],qe=te[1],ne=[];if(w>0)for(var j=Oe;j<=qe;j++)ne.push(S.createElement(s,{data:R,key:_(j,R),index:j,isScrolling:L?$:void 0,style:this._getItemStyle(j)}));var re=i(this.props,this._instanceProps);return S.createElement(B||O||"div",{className:a,onScroll:xe,ref:this._outerRefSetter,style:G({position:"relative",height:d,width:ee,overflow:"auto",WebkitOverflowScrolling:"touch",willChange:"transform",direction:u},A)},S.createElement(c||h||"div",{children:ne,ref:b,style:{height:N?"100%":re,pointerEvents:$?"none":void 0,width:N?re:"100%"}}))},v._callPropsCallbacks=function(){if(typeof this.props.onItemsRendered=="function"){var n=this.props.itemCount;if(n>0){var s=this._getRangeToRender(),a=s[0],u=s[1],d=s[2],b=s[3];this._callOnItemsRendered(a,u,d,b)}}if(typeof this.props.onScroll=="function"){var c=this.state,h=c.scrollDirection,w=c.scrollOffset,R=c.scrollUpdateWasRequested;this._callOnScroll(h,w,R)}},v._getRangeToRender=function(){var n=this.props,s=n.itemCount,a=n.overscanCount,u=this.state,d=u.isScrolling,b=u.scrollDirection,c=u.scrollOffset;if(s===0)return[0,0,0,0];var h=m(this.props,c,this._instanceProps),w=l(this.props,h,c,this._instanceProps),R=!d||b==="backward"?Math.max(1,a):1,P=!d||b==="forward"?Math.max(1,a):1;return[Math.max(0,h-R),Math.max(0,Math.min(s-1,w+P)),h,w]},x})(S.PureComponent),t.defaultProps={direction:"ltr",itemData:void 0,layout:"vertical",overscanCount:2,useIsScrolling:!1},t}var Ge=function(t,r){t.children,t.direction,t.height,t.layout,t.innerTagName,t.outerTagName,t.width,r.instance},Xe=Ve({getItemOffset:function(t,r){var i=t.itemSize;return r*i},getItemSize:function(t,r){var i=t.itemSize;return i},getEstimatedTotalSize:function(t){var r=t.itemCount,i=t.itemSize;return i*r},getOffsetForIndexAndAlignment:function(t,r,i,o,f,m){var l=t.direction,y=t.height,g=t.itemCount,k=t.itemSize,C=t.layout,x=t.width,v=l==="horizontal"||C==="horizontal",p=v?x:y,n=Math.max(0,g*k-p),s=Math.min(n,r*k),a=Math.max(0,r*k-p+k+m);switch(i==="smart"&&(o>=a-p&&o<=s+p?i="auto":i="center"),i){case"start":return s;case"end":return a;case"center":{var u=Math.round(a+(s-a)/2);return u<Math.ceil(p/2)?0:u>n+Math.floor(p/2)?n:u}default:return o>=a&&o<=s?o:o<a?a:s}},getStartIndexForOffset:function(t,r){var i=t.itemCount,o=t.itemSize;return Math.max(0,Math.min(i-1,Math.floor(r/o)))},getStopIndexForStartIndex:function(t,r,i){var o=t.direction,f=t.height,m=t.itemCount,l=t.itemSize,y=t.layout,g=t.width,k=o==="horizontal"||y==="horizontal",C=r*l,x=k?g:f,v=Math.ceil((x+i-C)/l);return Math.max(0,Math.min(m-1,r+v-1))},initInstanceProps:function(t){},shouldResetStyleCacheOnItemSizeChange:!0,validateProps:function(t){t.itemSize}});function pe(e,t){for(var r in e)if(!(r in t))return!0;for(var i in t)if(e[i]!==t[i])return!0;return!1}var Ye=["style"],Qe=["style"];function U(e,t){var r=e.style,i=le(e,Ye),o=t.style,f=le(t,Qe);return!pe(r,o)&&!pe(i,f)}const Ze=z.div`
  z-index: 1;
  position: relative;
  background: ${q.Default.Default};
  top: ${e=>$e({menuPosition:e.$menuPosition,menuHeight:e.$menuHeight,label:e.$label,labelPosition:e.$labelPosition})};
  box-sizing: border-box;
  .menu-list {
    box-sizing: border-box;
    box-shadow: ${({$menuPosition:e})=>e===W.BOTTOM?"0px 2px 10px 0px rgba(0, 0, 0, 0.10)":"0px -2px 10px 0px rgba(0, 0, 0, 0.10)"};
    border: 1px solid ${he.Default.Subdued};
    background-color: ${q.Default.Default};
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.1s ease;
    padding: ${H.xxs};

    &:focus {
      outline: none;
    }

    ::-webkit-scrollbar {
      width: 10px;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      min-height: 50px;
      border: 2px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 1em;
      background-color: ${q.Neutral.Default};
    }
    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
`,be=e=>{const{onClick:t,children:r,label:i,menuHeight:o,menuPosition:f,labelPosition:m,invalid:l}=e,y=["select-menu",e.className].filter(g=>g).join(" ");return T.jsx(Ze,{$label:i,$menuHeight:o,$menuPosition:f,$labelPosition:m,$invalid:l,"data-role":"menu",className:y,onClick:t,children:r})};be.__docgenInfo={description:"",methods:[],displayName:"MenuContainer",props:{className:{required:!1,tsType:{name:"string"},description:""},menuTop:{required:!1,tsType:{name:"number"},description:""},menuHeight:{required:!1,tsType:{name:"union",raw:'number | "auto"',elements:[{name:"number"},{name:"literal",value:'"auto"'}]},description:""},menuPosition:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},labelPosition:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Z=z(_e)`
  height: ${({height:e=ye})=>e}px;
  min-width: 0;
  cursor: pointer;
  box-sizing: border-box;
  margin: ${ge.xxs};
  border-radius: 4px;
  background-clip: content-box;

  background-color: ${({state:e})=>{switch(e){case"active":return q.Selected.Default;case"selected":return q.Default.Hover;default:return q.Default.Default}}};

  & > div {
    padding: ${H.none} ${H.xs};
  }

  &:hover {
    background-color: ${({state:e})=>{switch(e){case"active":return q.Selected.Hover;case"selected":return q.Default.Hover;default:return q.Default.Hover}}};
  }

  &:active {
    background-color: ${({state:e})=>{switch(e){case"active":return q.Selected.Pressed;case"selected":return q.Default.Pressed;default:return q.Default.Pressed}}};
  }
`,et=z(Z)`
  border: 1px solid ${he.Default.Subdued};
  background-color: ${q.Default.Default};
  position: absolute;
  margin: ${ge.none};
  width: 100%;
  height: 54px;
  box-shadow: ${({$menuPosition:e})=>e===W.BOTTOM?"0px 2px 10px 0px rgba(0, 0, 0, 0.10)":"0px -2px 10px 0px rgba(0, 0, 0, 0.10)"};
  &:hover {
    background-color: ${q.Default.Default};
  }
`,tt=z(Y)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  box-sizing: border-box;
`,Te=z(V.Check)`
  padding: 0 ${H.xs};
  color: ${ze.Highlight};
`,Se=e=>{const{active:t,selected:r,labelComponent:i,option:o,height:f,onSelect:m}=e,l=Q(i,Y),y=S.useCallback(()=>{m(o.value,o)},[m,o]),g=["option",e.className,I(r)?"selected":"",I(t)?"active":""].filter(Boolean);return T.jsxs(Z,{className:g.join(" "),"data-role":"option",center:!0,state:ve(t,r),height:f,onClick:y,children:[T.jsx(l,{value:o.value,type:"option",active:I(t),disabled:o.disabled,label:o.label,icon:o.icon,children:o.label}),I(t)&&T.jsx(Te,{})]})},nt=S.memo(Se,U);Se.__docgenInfo={description:"",methods:[],displayName:"OptionComponentImpl",props:{option:{required:!0,tsType:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},description:""},active:{required:!1,tsType:{name:"boolean"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""},height:{required:!1,tsType:{name:"number"},description:""},search:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
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
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T, option: IOption<T>) => void",signature:{arguments:[{type:{name:"T"},name:"value"},{type:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},name:"option"}],return:{name:"void"}}},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""}}};const rt=z.div`
  ${Ne.Label};
  text-align: left;
  width: 100%;
  font-weight: 700;
`,we=e=>{const{active:t,selected:r,labelComponent:i,option:o,height:f}=e,m=Q(i,Y),l=S.useCallback(()=>{I(o.isParent)?e.onReturn?.():ie(o?.options)?e.onSelect(o.value,o):e.onExpand?.(o)},[o,e]),y=["option",e.className,I(r)?"selected":"",I(t)?"active":""].filter(Boolean);return T.jsxs(Z,{className:y.join(" "),"data-role":"option",center:!0,state:ve(t,r),height:f,onClick:l,children:[T.jsxs(oe,{is:I(o.isParent),children:[T.jsx(V.ChevronLeftSolid,{}),T.jsx(rt,{children:o.label})]}),T.jsxs(oe,{is:!I(o.isParent),children:[T.jsx(m,{type:"option",active:I(t),...o,children:o.label}),I(t)&&T.jsx(Te,{}),!ie(o?.options)&&T.jsx(V.ChevronRightSolid,{})]})]})},it=S.memo(we,U);we.__docgenInfo={description:"",methods:[],displayName:"OptionMultiLevelComponentImp",props:{option:{required:!0,tsType:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},description:""},active:{required:!1,tsType:{name:"boolean"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:""},height:{required:!1,tsType:{name:"number"},description:""},search:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
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
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T, option: IOption<T>) => void",signature:{arguments:[{type:{name:"T"},name:"value"},{type:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},name:"option"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(option: IOption<T>) => void",signature:{arguments:[{type:{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"},name:"option"}],return:{name:"void"}}},description:""},onReturn:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""}}};const Ie=({index:e,style:t,data:r})=>{const{options:i,labelComponent:o,selectedIndex:f,rowHeight:m,search:l,onSelect:y,value:g,getOptionKey:k}=r,C=i[e];return T.jsx("div",{style:t,children:T.jsx(nt,{option:C,labelComponent:o,height:m,active:g.some(x=>k(x)===k(C.value)),selected:f===e,search:l,onSelect:y})})},ot=S.memo(Ie,U),ke=({index:e,style:t,data:r})=>{const{value:i,options:o,labelComponent:f,selectedIndex:m,rowHeight:l,search:y,onSelect:g,onExpand:k,onReturn:C,getOptionKey:x}=r,v=o[e];return T.jsx("div",{style:t,children:T.jsx(it,{option:v,labelComponent:f,height:l,active:i.some(p=>x(p)===x(v.value)),selected:m===e,search:y,onSelect:g,onExpand:k,onReturn:C})})},at=S.memo(ke,U);Ie.__docgenInfo={description:"",methods:[],displayName:"MenuRowInner",props:{index:{required:!0,tsType:{name:"number"},description:""},data:{required:!0,tsType:{name:"ItemData",elements:[{name:"T"}],raw:"ItemData<T>"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};ke.__docgenInfo={description:"",methods:[],displayName:"MenuRowWithMultiLevelsInner",props:{index:{required:!0,tsType:{name:"number"},description:""},data:{required:!0,tsType:{name:"ItemData",elements:[{name:"T"}],raw:"ItemData<T>"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const st=e=>{const{rowHeight:t=ye,selectedIndex:r,open:i,invalid:o,menuHeight:f=Ce,menuPosition:m=W.BOTTOM,labelPosition:l=fe.TOP,label:y,multiLevel:g,menuComponent:k,emptyText:C,search:x,multi:v,value:p,labelComponent:n,className:s}=e,[a,u]=S.useState(()=>D(e.options)),d=S.useRef(null),b=S.useRef(null),c=e.getOptionKey??De,h=Math.min(Math.max(a.length*t,t)+10,f);S.useEffect(()=>{u(D(e.options))},[e.options]),S.useEffect(()=>{I(i)&&d.current&&(r===void 0||r<0||d.current.scrollToItem(r,"center"))},[i,r]),S.useEffect(()=>{const O=b.current;O&&(I(i)&&a.length>0?O.style.opacity="1":O.style.opacity="0")},[i,a.length]);const w=S.useCallback((O,A)=>{if(I(g)&&u(D(e.options)),Array.isArray(p)&&I(v)){const L=c(O),$=p.some(N=>c(N)===L)?p.filter(N=>c(N)!==L):[...p,O];e.onSelect($,A);return}e.onSelect(O,A)},[g,e.options,v,p,e.onSelect,c]),R=S.useCallback(O=>{u([{...O,isParent:!0},...D(O.options)])},[]),P=S.useCallback(()=>{u(D(e.options))},[e.options]),_=S.useMemo(()=>I(v)&&Array.isArray(p)?p:Ee(p)||Array.isArray(p)?[]:[p],[p,v]),E=S.useMemo(()=>({options:a,value:_,multi:v,selectedIndex:r,rowHeight:t,search:x,labelComponent:n,getOptionKey:c,onSelect:w,onExpand:R,onReturn:P}),[a,_,v,r,t,x,n,c,w,R,P]),B=()=>{const O=a.length;return F(k)?T.jsx(k,{...e,options:a}):O===0?T.jsx(et,{$menuPosition:m,children:T.jsx(tt,{children:T.jsx("p",{children:Q(C,Re)})})}):T.jsx(Xe,{className:"menu-list",style:{position:"absolute"},ref:d,outerRef:b,width:"100%",height:h,itemSize:t,itemCount:O,itemData:E,children:I(g)?at:ot})};return Me(i,T.jsx(be,{className:s,invalid:o,label:y,menuHeight:h,menuPosition:m,labelPosition:l,children:B()}))};st.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"T"}],raw:"IOption<T>"}],raw:"IOption<T>[]"},description:""},value:{required:!1,tsType:{name:"union",raw:"T | T[]",elements:[{name:"T"},{name:"Array",elements:[{name:"T"}],raw:"T[]"}]},description:""},labelComponent:{required:!1,tsType:{name:"intersection",raw:`FunctionComponent<P> & {
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
}`,signature:{properties:[{key:{name:"signature",type:"object",raw:"{}",signature:{properties:[]},required:!0},value:{name:"unknown"}}]}}]},description:""},emptyText:{required:!1,tsType:{name:"string"},description:""},multi:{required:!1,tsType:{name:"boolean"},description:""},rowHeight:{required:!1,tsType:{name:"number"},description:""},menuHeight:{required:!1,tsType:{name:"number"},description:""},menuPosition:{required:!1,tsType:{name:"union",raw:'"top" | "bottom"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:""},invalid:{required:!1,tsType:{name:"boolean"},description:""},selectedIndex:{required:!1,tsType:{name:"number"},description:""},open:{required:!0,tsType:{name:"boolean"},description:""},search:{required:!1,tsType:{name:"string"},description:""},labelPosition:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},menuTitle:{required:!1,tsType:{name:"string"},description:""},multiLevel:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},getOptionKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => string",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"string"}}},description:""}}};export{st as M,Z as O,tt as S,pt as a,De as d,ve as g,ft as k};
