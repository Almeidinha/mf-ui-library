import{j as y}from"./jsx-runtime-u17CrQMm.js";import{F as ne,b as ee,d as Ot,e as qe,a as $e,i as He}from"./button-sKft9pFr.js";import{I as U}from"./input-field-Dp6wjjTc.js";import{I as be}from"./input-number-CNAO7S9z.js";import{I as Ee}from"./input-text-uiXaQY7h.js";import{G as se,P as Rt}from"./shadows-CyjoGr4u.js";import{R as j,r as ce}from"./iframe-Co_0DYZM.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";import"./preload-helper-PPVm8Dsz.js";var we=e=>e.type==="checkbox",oe=e=>e instanceof Date,N=e=>e==null;const Ft=e=>typeof e=="object";var S=e=>!N(e)&&!Array.isArray(e)&&Ft(e)&&!oe(e),Ut=e=>S(e)&&e.target?we(e.target)?e.target.checked:e.target.value:e,Ht=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Wt=(e,n)=>e.has(Ht(n)),qt=e=>{const n=e.constructor&&e.constructor.prototype;return S(n)&&n.hasOwnProperty("isPrototypeOf")},Ze=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function D(e){if(e instanceof Date)return new Date(e);const n=typeof FileList<"u"&&e instanceof FileList;if(Ze&&(e instanceof Blob||n))return e;const t=Array.isArray(e);if(!t&&!(S(e)&&qt(e)))return e;const a=t?[]:Object.create(Object.getPrototypeOf(e));for(const l in e)Object.prototype.hasOwnProperty.call(e,l)&&(a[l]=D(e[l]));return a}var Me=e=>/^\w*$/.test(e),T=e=>e===void 0,Ye=e=>Array.isArray(e)?e.filter(Boolean):[],Je=e=>Ye(e.replace(/["|']|\]/g,"").split(/\.|\[/)),p=(e,n,t)=>{if(!n||!S(e))return t;const a=(Me(n)?[n]:Je(n)).reduce((l,i)=>N(l)?l:l[i],e);return T(a)||a===e?T(e[n])?t:e[n]:a},Y=e=>typeof e=="boolean",G=e=>typeof e=="function",A=(e,n,t)=>{let a=-1;const l=Me(n)?[n]:Je(n),i=l.length,u=i-1;for(;++a<i;){const f=l[a];let M=t;if(a!==u){const $=e[f];M=S($)||Array.isArray($)?$:isNaN(+l[a+1])?{}:[]}if(f==="__proto__"||f==="constructor"||f==="prototype")return;e[f]=M,e=e[f]}};const dt={BLUR:"blur",FOCUS_OUT:"focusout"},z={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},X={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Gt=j.createContext(null);Gt.displayName="HookFormControlContext";var zt=(e,n,t,a=!0)=>{const l={defaultValues:n._defaultValues};for(const i in e)Object.defineProperty(l,i,{get:()=>{const u=i;return n._proxyFormState[u]!==z.all&&(n._proxyFormState[u]=!a||z.all),e[u]}});return l};const $t=typeof window<"u"?j.useLayoutEffect:j.useEffect;var R=e=>typeof e=="string",Zt=(e,n,t,a,l)=>R(e)?(a&&n.watch.add(e),p(t,e,l)):Array.isArray(e)?e.map(i=>(a&&n.watch.add(i),p(t,i))):(a&&(n.watchAll=!0),t),Ge=e=>N(e)||!Ft(e);function re(e,n,t=new WeakSet){if(Ge(e)||Ge(n))return Object.is(e,n);if(oe(e)&&oe(n))return Object.is(e.getTime(),n.getTime());const a=Object.keys(e),l=Object.keys(n);if(a.length!==l.length)return!1;if(t.has(e)||t.has(n))return!0;t.add(e),t.add(n);for(const i of a){const u=e[i];if(!l.includes(i))return!1;if(i!=="ref"){const f=n[i];if(oe(u)&&oe(f)||S(u)&&S(f)||Array.isArray(u)&&Array.isArray(f)?!re(u,f,t):!Object.is(u,f))return!1}}return!0}const Yt=j.createContext(null);Yt.displayName="HookFormContext";var Jt=(e,n,t,a,l)=>n?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[a]:l||!0}}:{},xe=e=>Array.isArray(e)?e:[e],ct=()=>{let e=[];return{get observers(){return e},next:l=>{for(const i of e)i.next&&i.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(i=>i!==l)}}),unsubscribe:()=>{e=[]}}};function It(e,n){const t={};for(const a in e)if(e.hasOwnProperty(a)){const l=e[a],i=n[a];if(l&&S(l)&&i){const u=It(l,i);S(u)&&(t[a]=u)}else e[a]&&(t[a]=i)}return t}var P=e=>S(e)&&!Object.keys(e).length,Ke=e=>e.type==="file",je=e=>{if(!Ze)return!1;const n=e?e.ownerDocument:0;return e instanceof(n&&n.defaultView?n.defaultView.HTMLElement:HTMLElement)},At=e=>e.type==="select-multiple",Qe=e=>e.type==="radio",Kt=e=>Qe(e)||we(e),We=e=>je(e)&&e.isConnected;function Qt(e,n){const t=n.slice(0,-1).length;let a=0;for(;a<t;)e=T(e)?a++:e[n[a++]];return e}function Xt(e){for(const n in e)if(e.hasOwnProperty(n)&&!T(e[n]))return!1;return!0}function k(e,n){const t=Array.isArray(n)?n:Me(n)?[n]:Je(n),a=t.length===1?e:Qt(e,t),l=t.length-1,i=t[l];return a&&delete a[i],l!==0&&(S(a)&&P(a)||Array.isArray(a)&&Xt(a))&&k(e,t.slice(0,-1)),e}var er=e=>{for(const n in e)if(G(e[n]))return!0;return!1};function Tt(e){return Array.isArray(e)||S(e)&&!er(e)}function ze(e,n={}){for(const t in e){const a=e[t];Tt(a)?(n[t]=Array.isArray(a)?[]:{},ze(a,n[t])):T(a)||(n[t]=!0)}return n}function de(e,n,t){t||(t=ze(n));for(const a in e){const l=e[a];if(Tt(l))T(n)||Ge(t[a])?t[a]=ze(l,Array.isArray(l)?[]:{}):de(l,N(n)?{}:n[a],t[a]);else{const i=n[a];t[a]=!re(l,i)}}return t}const ft={value:!1,isValid:!1},ht={value:!0,isValid:!0};var kt=e=>{if(Array.isArray(e)){if(e.length>1){const n=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:n,isValid:!!n.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!T(e[0].attributes.value)?T(e[0].value)||e[0].value===""?ht:{value:e[0].value,isValid:!0}:ht:ft}return ft},St=(e,{valueAsNumber:n,valueAsDate:t,setValueAs:a})=>T(e)?e:n?e===""?NaN:e&&+e:t&&R(e)?new Date(e):a?a(e):e;const pt={isValid:!1,value:null};var _t=e=>Array.isArray(e)?e.reduce((n,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:n,pt):pt;function mt(e){const n=e.ref;return Ke(n)?n.files:Qe(n)?_t(e.refs).value:At(n)?[...n.selectedOptions].map(({value:t})=>t):we(n)?kt(e.refs).value:St(T(n.value)?e.ref.value:n.value,e)}var tr=(e,n,t,a)=>{const l={};for(const i of e){const u=p(n,i);u&&A(l,i,u._f)}return{criteriaMode:t,names:[...e],fields:l,shouldUseNativeValidation:a}},Pe=e=>e instanceof RegExp,ge=e=>T(e)?e:Pe(e)?e.source:S(e)?Pe(e.value)?e.value.source:e.value:e,yt=e=>({isOnSubmit:!e||e===z.onSubmit,isOnBlur:e===z.onBlur,isOnChange:e===z.onChange,isOnAll:e===z.all,isOnTouch:e===z.onTouched});const gt="AsyncFunction";var rr=e=>!!e&&!!e.validate&&!!(G(e.validate)&&e.validate.constructor.name===gt||S(e.validate)&&Object.values(e.validate).find(n=>n.constructor.name===gt)),nr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate),bt=(e,n,t)=>!t&&(n.watchAll||n.watch.has(e)||[...n.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length))));const ve=(e,n,t,a)=>{for(const l of t||Object.keys(e)){const i=p(e,l);if(i){const{_f:u,...f}=i;if(u){if(u.refs&&u.refs[0]&&n(u.refs[0],l)&&!a)return!0;if(u.ref&&n(u.ref,u.name)&&!a)return!0;if(ve(f,n))break}else if(S(f)&&ve(f,n))break}}};function xt(e,n,t){const a=p(e,t);if(a||Me(t))return{error:a,name:t};const l=t.split(".");for(;l.length;){const i=l.join("."),u=p(n,i),f=p(e,i);if(u&&!Array.isArray(u)&&t!==i)return{name:t};if(f&&f.type)return{name:i,error:f};if(f&&f.root&&f.root.type)return{name:`${i}.root`,error:f.root};l.pop()}return{name:t}}var sr=(e,n,t,a)=>{t(e);const{name:l,...i}=e;return P(i)||Object.keys(i).length>=Object.keys(n).length||Object.keys(i).find(u=>n[u]===(!a||z.all))},ar=(e,n,t)=>!e||!n||e===n||xe(e).some(a=>a&&(t?a===n:a.startsWith(n)||n.startsWith(a))),ir=(e,n,t,a,l)=>l.isOnAll?!1:!t&&l.isOnTouch?!(n||e):(t?a.isOnBlur:l.isOnBlur)?!e:(t?a.isOnChange:l.isOnChange)?e:!0,or=(e,n)=>!Ye(p(e,n)).length&&k(e,n),lr=(e,n,t)=>{const a=xe(p(e,t));return A(a,"root",n[t]),A(e,t,a),e};function vt(e,n,t="validate"){if(R(e)||Array.isArray(e)&&e.every(R)||Y(e)&&!e)return{type:t,message:R(e)?e:"",ref:n}}var ue=e=>S(e)&&!Pe(e)?e:{value:e,message:""},wt=async(e,n,t,a,l,i)=>{const{ref:u,refs:f,required:M,maxLength:$,minLength:fe,min:I,max:_,pattern:b,validate:J,name:B,valueAsNumber:Z,mount:H}=e._f,x=p(t,B);if(!H||n.has(B))return{};const K=f?f[0]:u,Q=g=>{l&&K.reportValidity&&(K.setCustomValidity(Y(g)?"":g||""),K.reportValidity())},L={},he=Qe(u),Fe=we(u),ae=he||Fe,le=(Z||Ke(u))&&T(u.value)&&T(x)||je(u)&&u.value===""||x===""||Array.isArray(x)&&!x.length,W=Jt.bind(null,B,a,L),Ie=(g,v,V,C=X.maxLength,q=X.minLength)=>{const O=g?v:V;L[B]={type:g?C:q,message:O,ref:u,...W(g?C:q,O)}};if(i?!Array.isArray(x)||!x.length:M&&(!ae&&(le||N(x))||Y(x)&&!x||Fe&&!kt(f).isValid||he&&!_t(f).isValid)){const{value:g,message:v}=R(M)?{value:!!M,message:M}:ue(M);if(g&&(L[B]={type:X.required,message:v,ref:K,...W(X.required,v)},!a))return Q(v),L}if(!le&&(!N(I)||!N(_))){let g,v;const V=ue(_),C=ue(I);if(!N(x)&&!isNaN(x)){const q=u.valueAsNumber||x&&+x;N(V.value)||(g=q>V.value),N(C.value)||(v=q<C.value)}else{const q=u.valueAsDate||new Date(x),O=ye=>new Date(new Date().toDateString()+" "+ye),pe=u.type=="time",me=u.type=="week";R(V.value)&&x&&(g=pe?O(x)>O(V.value):me?x>V.value:q>new Date(V.value)),R(C.value)&&x&&(v=pe?O(x)<O(C.value):me?x<C.value:q<new Date(C.value))}if((g||v)&&(Ie(!!g,V.message,C.message,X.max,X.min),!a))return Q(L[B].message),L}if(($||fe)&&!le&&(R(x)||i&&Array.isArray(x))){const g=ue($),v=ue(fe),V=!N(g.value)&&x.length>+g.value,C=!N(v.value)&&x.length<+v.value;if((V||C)&&(Ie(V,g.message,v.message),!a))return Q(L[B].message),L}if(b&&!le&&R(x)){const{value:g,message:v}=ue(b);if(Pe(g)&&!x.match(g)&&(L[B]={type:X.pattern,message:v,ref:u,...W(X.pattern,v)},!a))return Q(v),L}if(J){if(G(J)){const g=await J(x,t),v=vt(g,K);if(v&&(L[B]={...v,...W(X.validate,v.message)},!a))return Q(v.message),L}else if(S(J)){let g={};for(const v in J){if(!P(g)&&!a)break;const V=vt(await J[v](x,t),K,v);V&&(g={...V,...W(v,V.message)},Q(V.message),a&&(L[B]=g))}if(!P(g)&&(L[B]={ref:K,...g},!a))return L}}return Q(!0),L};const ur={mode:z.onSubmit,reValidateMode:z.onChange,shouldFocusError:!0};function dr(e={}){let n={...ur,...e},t={submitCount:0,isDirty:!1,isReady:!1,isLoading:G(n.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:n.errors||{},disabled:n.disabled||!1},a={},l=S(n.defaultValues)||S(n.values)?D(n.defaultValues||n.values)||{}:{},i=n.shouldUnregister?{}:D(l),u={action:!1,mount:!1,watch:!1,keepIsValid:!1},f={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},M,$=0;const fe={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},I={...fe};let _={...I};const b={array:ct(),state:ct()},J=n.criteriaMode===z.all,B=r=>s=>{clearTimeout($),$=setTimeout(r,s)},Z=async r=>{if(!u.keepIsValid&&!n.disabled&&(I.isValid||_.isValid||r)){let s;n.resolver?(s=P((await ae()).errors),H()):s=await W(a,!0),s!==t.isValid&&b.state.next({isValid:s})}},H=(r,s)=>{!n.disabled&&(I.isValidating||I.validatingFields||_.isValidating||_.validatingFields)&&((r||Array.from(f.mount)).forEach(o=>{o&&(s?A(t.validatingFields,o,s):k(t.validatingFields,o))}),b.state.next({validatingFields:t.validatingFields,isValidating:!P(t.validatingFields)}))},x=(r,s=[],o,h,c=!0,d=!0)=>{if(h&&o&&!n.disabled){if(u.action=!0,d&&Array.isArray(p(a,r))){const m=o(p(a,r),h.argA,h.argB);c&&A(a,r,m)}if(d&&Array.isArray(p(t.errors,r))){const m=o(p(t.errors,r),h.argA,h.argB);c&&A(t.errors,r,m),or(t.errors,r)}if((I.touchedFields||_.touchedFields)&&d&&Array.isArray(p(t.touchedFields,r))){const m=o(p(t.touchedFields,r),h.argA,h.argB);c&&A(t.touchedFields,r,m)}(I.dirtyFields||_.dirtyFields)&&(t.dirtyFields=de(l,i)),b.state.next({name:r,isDirty:g(r,s),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else A(i,r,s)},K=(r,s)=>{A(t.errors,r,s),b.state.next({errors:t.errors})},Q=r=>{t.errors=r,b.state.next({errors:t.errors,isValid:!1})},L=(r,s,o,h)=>{const c=p(a,r);if(c){const d=p(i,r,T(o)?p(l,r):o);T(d)||h&&h.defaultChecked||s?A(i,r,s?d:mt(c._f)):C(r,d),u.mount&&!u.action&&Z()}},he=(r,s,o,h,c)=>{let d=!1,m=!1;const w={name:r};if(!n.disabled){if(!o||h){(I.isDirty||_.isDirty)&&(m=t.isDirty,t.isDirty=w.isDirty=g(),d=m!==w.isDirty);const F=re(p(l,r),s);m=!!p(t.dirtyFields,r),F?k(t.dirtyFields,r):A(t.dirtyFields,r,!0),w.dirtyFields=t.dirtyFields,d=d||(I.dirtyFields||_.dirtyFields)&&m!==!F}if(o){const F=p(t.touchedFields,r);F||(A(t.touchedFields,r,o),w.touchedFields=t.touchedFields,d=d||(I.touchedFields||_.touchedFields)&&F!==o)}d&&c&&b.state.next(w)}return d?w:{}},Fe=(r,s,o,h)=>{const c=p(t.errors,r),d=(I.isValid||_.isValid)&&Y(s)&&t.isValid!==s;if(n.delayError&&o?(M=B(()=>K(r,o)),M(n.delayError)):(clearTimeout($),M=null,o?A(t.errors,r,o):k(t.errors,r)),(o?!re(c,o):c)||!P(h)||d){const m={...h,...d&&Y(s)?{isValid:s}:{},errors:t.errors,name:r};t={...t,...m},b.state.next(m)}},ae=async r=>(H(r,!0),await n.resolver(i,n.context,tr(r||f.mount,a,n.criteriaMode,n.shouldUseNativeValidation))),le=async r=>{const{errors:s}=await ae(r);if(H(r),r)for(const o of r){const h=p(s,o);h?A(t.errors,o,h):k(t.errors,o)}else t.errors=s;return s},W=async(r,s,o={valid:!0})=>{for(const h in r){const c=r[h];if(c){const{_f:d,...m}=c;if(d){const w=f.array.has(d.name),F=c._f&&rr(c._f);F&&I.validatingFields&&H([d.name],!0);const E=await wt(c,f.disabled,i,J,n.shouldUseNativeValidation&&!s,w);if(F&&I.validatingFields&&H([d.name]),E[d.name]&&(o.valid=!1,s||e.shouldUseNativeValidation))break;!s&&(p(E,d.name)?w?lr(t.errors,E,d.name):A(t.errors,d.name,E[d.name]):k(t.errors,d.name))}!P(m)&&await W(m,s,o)}}return o.valid},Ie=()=>{for(const r of f.unMount){const s=p(a,r);s&&(s._f.refs?s._f.refs.every(o=>!We(o)):!We(s._f.ref))&&Ne(r)}f.unMount=new Set},g=(r,s)=>!n.disabled&&(r&&s&&A(i,r,s),!re(Xe(),l)),v=(r,s,o)=>Zt(r,f,{...u.mount?i:T(s)?l:R(r)?{[r]:s}:s},o,s),V=r=>Ye(p(u.mount?i:l,r,n.shouldUnregister?p(l,r,[]):[])),C=(r,s,o={})=>{const h=p(a,r);let c=s;if(h){const d=h._f;d&&(!d.disabled&&A(i,r,St(s,d)),c=je(d.ref)&&N(s)?"":s,At(d.ref)?[...d.ref.options].forEach(m=>m.selected=c.includes(m.value)):d.refs?we(d.ref)?d.refs.forEach(m=>{(!m.defaultChecked||!m.disabled)&&(Array.isArray(c)?m.checked=!!c.find(w=>w===m.value):m.checked=c===m.value||!!c)}):d.refs.forEach(m=>m.checked=m.value===c):Ke(d.ref)?d.ref.value="":(d.ref.value=c,d.ref.type||b.state.next({name:r,values:D(i)})))}(o.shouldDirty||o.shouldTouch)&&he(r,c,o.shouldTouch,o.shouldDirty,!0),o.shouldValidate&&ye(r)},q=(r,s,o)=>{for(const h in s){if(!s.hasOwnProperty(h))return;const c=s[h],d=r+"."+h,m=p(a,d);(f.array.has(r)||S(c)||m&&!m._f)&&!oe(c)?q(d,c,o):C(d,c,o)}},O=(r,s,o={})=>{const h=p(a,r),c=f.array.has(r),d=D(s);A(i,r,d),c?(b.array.next({name:r,values:D(i)}),(I.isDirty||I.dirtyFields||_.isDirty||_.dirtyFields)&&o.shouldDirty&&b.state.next({name:r,dirtyFields:de(l,i),isDirty:g(r,d)})):h&&!h._f&&!N(d)?q(r,d,o):C(r,d,o),bt(r,f)?b.state.next({...t,name:r,values:D(i)}):b.state.next({name:u.mount?r:void 0,values:D(i)})},pe=async r=>{u.mount=!0;const s=r.target;let o=s.name,h=!0;const c=p(a,o),d=F=>{h=Number.isNaN(F)||oe(F)&&isNaN(F.getTime())||re(F,p(i,o,F))},m=yt(n.mode),w=yt(n.reValidateMode);if(c){let F,E;const ie=s.type?mt(c._f):Ut(r),te=r.type===dt.BLUR||r.type===dt.FOCUS_OUT,Mt=!nr(c._f)&&!n.resolver&&!p(t.errors,o)&&!c._f.deps||ir(te,p(t.touchedFields,o),t.isSubmitted,w,m),Re=bt(o,f,te);A(i,o,ie),te?(!s||!s.readOnly)&&(c._f.onBlur&&c._f.onBlur(r),M&&M(0)):c._f.onChange&&c._f.onChange(r);const Ue=he(o,ie,te),Nt=!P(Ue)||Re;if(!te&&b.state.next({name:o,type:r.type,values:D(i)}),Mt)return(I.isValid||_.isValid)&&(n.mode==="onBlur"?te&&Z():te||Z()),Nt&&b.state.next({name:o,...Re?{}:Ue});if(!te&&Re&&b.state.next({...t}),n.resolver){const{errors:lt}=await ae([o]);if(H([o]),d(ie),h){const Bt=xt(t.errors,a,o),ut=xt(lt,a,Bt.name||o);F=ut.error,o=ut.name,E=P(lt)}}else H([o],!0),F=(await wt(c,f.disabled,i,J,n.shouldUseNativeValidation))[o],H([o]),d(ie),h&&(F?E=!1:(I.isValid||_.isValid)&&(E=await W(a,!0)));h&&(c._f.deps&&(!Array.isArray(c._f.deps)||c._f.deps.length>0)&&ye(c._f.deps),Fe(o,E,F,Ue))}},me=(r,s)=>{if(p(t.errors,s)&&r.focus)return r.focus(),1},ye=async(r,s={})=>{let o,h;const c=xe(r);if(n.resolver){const d=await le(T(r)?r:c);o=P(d),h=r?!c.some(m=>p(d,m)):o}else r?(h=(await Promise.all(c.map(async d=>{const m=p(a,d);return await W(m&&m._f?{[d]:m}:m)}))).every(Boolean),!(!h&&!t.isValid)&&Z()):h=o=await W(a);return b.state.next({...!R(r)||(I.isValid||_.isValid)&&o!==t.isValid?{}:{name:r},...n.resolver||!r?{isValid:o}:{},errors:t.errors}),s.shouldFocus&&!h&&ve(a,me,r?c:f.mount),h},Xe=(r,s)=>{let o={...u.mount?i:l};return s&&(o=It(s.dirtyFields?t.dirtyFields:t.touchedFields,o)),T(r)?o:R(r)?p(o,r):r.map(h=>p(o,h))},et=(r,s)=>({invalid:!!p((s||t).errors,r),isDirty:!!p((s||t).dirtyFields,r),error:p((s||t).errors,r),isValidating:!!p(t.validatingFields,r),isTouched:!!p((s||t).touchedFields,r)}),Lt=r=>{r&&xe(r).forEach(s=>k(t.errors,s)),b.state.next({errors:r?t.errors:{}})},tt=(r,s,o)=>{const h=(p(a,r,{_f:{}})._f||{}).ref,c=p(t.errors,r)||{},{ref:d,message:m,type:w,...F}=c;A(t.errors,r,{...F,...s,ref:h}),b.state.next({name:r,errors:t.errors,isValid:!1}),o&&o.shouldFocus&&h&&h.focus&&h.focus()},Vt=(r,s)=>G(r)?b.state.subscribe({next:o=>"values"in o&&r(v(void 0,s),o)}):v(r,s,!0),rt=r=>b.state.subscribe({next:s=>{ar(r.name,s.name,r.exact)&&sr(s,r.formState||I,Pt,r.reRenderRoot)&&r.callback({values:{...i},...t,...s,defaultValues:l})}}).unsubscribe,Dt=r=>(u.mount=!0,_={..._,...r.formState},rt({...r,formState:{...fe,...r.formState}})),Ne=(r,s={})=>{for(const o of r?xe(r):f.mount)f.mount.delete(o),f.array.delete(o),s.keepValue||(k(a,o),k(i,o)),!s.keepError&&k(t.errors,o),!s.keepDirty&&k(t.dirtyFields,o),!s.keepTouched&&k(t.touchedFields,o),!s.keepIsValidating&&k(t.validatingFields,o),!n.shouldUnregister&&!s.keepDefaultValue&&k(l,o);b.state.next({values:D(i)}),b.state.next({...t,...s.keepDirty?{isDirty:g()}:{}}),!s.keepIsValid&&Z()},nt=({disabled:r,name:s})=>{if(Y(r)&&u.mount||r||f.disabled.has(s)){const c=f.disabled.has(s)!==!!r;r?f.disabled.add(s):f.disabled.delete(s),c&&u.mount&&!u.action&&Z()}},Be=(r,s={})=>{let o=p(a,r);const h=Y(s.disabled)||Y(n.disabled);return A(a,r,{...o||{},_f:{...o&&o._f?o._f:{ref:{name:r}},name:r,mount:!0,...s}}),f.mount.add(r),o?nt({disabled:Y(s.disabled)?s.disabled:n.disabled,name:r}):L(r,!0,s.value),{...h?{disabled:s.disabled||n.disabled}:{},...n.progressive?{required:!!s.required,min:ge(s.min),max:ge(s.max),minLength:ge(s.minLength),maxLength:ge(s.maxLength),pattern:ge(s.pattern)}:{},name:r,onChange:pe,onBlur:pe,ref:c=>{if(c){Be(r,s),o=p(a,r);const d=T(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,m=Kt(d),w=o._f.refs||[];if(m?w.find(F=>F===d):d===o._f.ref)return;A(a,r,{_f:{...o._f,...m?{refs:[...w.filter(We),d,...Array.isArray(p(l,r))?[{}]:[]],ref:{type:d.type,name:r}}:{ref:d}}}),L(r,!1,void 0,d)}else o=p(a,r,{}),o._f&&(o._f.mount=!1),(n.shouldUnregister||s.shouldUnregister)&&!(Wt(f.array,r)&&u.action)&&f.unMount.add(r)}}},Oe=()=>n.shouldFocusError&&ve(a,me,f.mount),Ct=r=>{Y(r)&&(b.state.next({disabled:r}),ve(a,(s,o)=>{const h=p(a,o);h&&(s.disabled=h._f.disabled||r,Array.isArray(h._f.refs)&&h._f.refs.forEach(c=>{c.disabled=h._f.disabled||r}))},0,!1))},st=(r,s)=>async o=>{let h;o&&(o.preventDefault&&o.preventDefault(),o.persist&&o.persist());let c=D(i);if(b.state.next({isSubmitting:!0}),n.resolver){const{errors:d,values:m}=await ae();H(),t.errors=d,c=D(m)}else await W(a);if(f.disabled.size)for(const d of f.disabled)k(c,d);if(k(t.errors,"root"),P(t.errors)){b.state.next({errors:{}});try{await r(c,o)}catch(d){h=d}}else s&&await s({...t.errors},o),Oe(),setTimeout(Oe);if(b.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:P(t.errors)&&!h,submitCount:t.submitCount+1,errors:t.errors}),h)throw h},Et=(r,s={})=>{p(a,r)&&(T(s.defaultValue)?O(r,D(p(l,r))):(O(r,s.defaultValue),A(l,r,D(s.defaultValue))),s.keepTouched||k(t.touchedFields,r),s.keepDirty||(k(t.dirtyFields,r),t.isDirty=s.defaultValue?g(r,D(p(l,r))):g()),s.keepError||(k(t.errors,r),I.isValid&&Z()),b.state.next({...t}))},at=(r,s={})=>{const o=r?D(r):l,h=D(o),c=P(r),d=c?l:h;if(s.keepDefaultValues||(l=o),!s.keepValues){if(s.keepDirtyValues){const m=new Set([...f.mount,...Object.keys(de(l,i))]);for(const w of Array.from(m)){const F=p(t.dirtyFields,w),E=p(i,w),ie=p(d,w);F&&!T(E)?A(d,w,E):!F&&!T(ie)&&O(w,ie)}}else{if(Ze&&T(r))for(const m of f.mount){const w=p(a,m);if(w&&w._f){const F=Array.isArray(w._f.refs)?w._f.refs[0]:w._f.ref;if(je(F)){const E=F.closest("form");if(E){E.reset();break}}}}if(s.keepFieldsRef)for(const m of f.mount)O(m,p(d,m));else a={}}i=n.shouldUnregister?s.keepDefaultValues?D(l):{}:D(d),b.array.next({values:{...d}}),b.state.next({values:{...d}})}f={mount:s.keepDirtyValues?f.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},u.mount=!I.isValid||!!s.keepIsValid||!!s.keepDirtyValues||!n.shouldUnregister&&!P(d),u.watch=!!n.shouldUnregister,u.keepIsValid=!!s.keepIsValid,u.action=!1,s.keepErrors||(t.errors={}),b.state.next({submitCount:s.keepSubmitCount?t.submitCount:0,isDirty:c?!1:s.keepDirty?t.isDirty:!!(s.keepDefaultValues&&!re(r,l)),isSubmitted:s.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:c?{}:s.keepDirtyValues?s.keepDefaultValues&&i?de(l,i):t.dirtyFields:s.keepDefaultValues&&r?de(l,r):s.keepDirty?t.dirtyFields:{},touchedFields:s.keepTouched?t.touchedFields:{},errors:s.keepErrors?t.errors:{},isSubmitSuccessful:s.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1,defaultValues:l})},it=(r,s)=>at(G(r)?r(i):r,{...n.resetOptions,...s}),jt=(r,s={})=>{const o=p(a,r),h=o&&o._f;if(h){const c=h.refs?h.refs[0]:h.ref;c.focus&&setTimeout(()=>{c.focus(),s.shouldSelect&&G(c.select)&&c.select()})}},Pt=r=>{t={...t,...r}},ot={control:{register:Be,unregister:Ne,getFieldState:et,handleSubmit:st,setError:tt,_subscribe:rt,_runSchema:ae,_updateIsValidating:H,_focusError:Oe,_getWatch:v,_getDirty:g,_setValid:Z,_setFieldArray:x,_setDisabledField:nt,_setErrors:Q,_getFieldArray:V,_reset:at,_resetDefaultValues:()=>G(n.defaultValues)&&n.defaultValues().then(r=>{it(r,n.resetOptions),b.state.next({isLoading:!1})}),_removeUnmounted:Ie,_disableForm:Ct,_subjects:b,_proxyFormState:I,get _fields(){return a},get _formValues(){return i},get _state(){return u},set _state(r){u=r},get _defaultValues(){return l},get _names(){return f},set _names(r){f=r},get _formState(){return t},get _options(){return n},set _options(r){n={...n,...r}}},subscribe:Dt,trigger:ye,register:Be,handleSubmit:st,watch:Vt,setValue:O,getValues:Xe,reset:it,resetField:Et,clearErrors:Lt,unregister:Ne,setError:tt,setFocus:jt,getFieldState:et};return{...ot,formControl:ot}}function cr(e={}){const n=j.useRef(void 0),t=j.useRef(void 0),[a,l]=j.useState({isDirty:!1,isValidating:!1,isLoading:G(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,isReady:!1,defaultValues:G(e.defaultValues)?void 0:e.defaultValues});if(!n.current)if(e.formControl)n.current={...e.formControl,formState:a},e.defaultValues&&!G(e.defaultValues)&&e.formControl.reset(e.defaultValues,e.resetOptions);else{const{formControl:u,...f}=dr(e);n.current={...f,formState:a}}const i=n.current.control;return i._options=e,$t(()=>{const u=i._subscribe({formState:i._proxyFormState,callback:()=>l({...i._formState}),reRenderRoot:!0});return l(f=>({...f,isReady:!0})),i._formState.isReady=!0,u},[i]),j.useEffect(()=>i._disableForm(e.disabled),[i,e.disabled]),j.useEffect(()=>{e.mode&&(i._options.mode=e.mode),e.reValidateMode&&(i._options.reValidateMode=e.reValidateMode)},[i,e.mode,e.reValidateMode]),j.useEffect(()=>{e.errors&&(i._setErrors(e.errors),i._focusError())},[i,e.errors]),j.useEffect(()=>{e.shouldUnregister&&i._subjects.state.next({values:i._getWatch()})},[i,e.shouldUnregister]),j.useEffect(()=>{if(i._proxyFormState.isDirty){const u=i._getDirty();u!==a.isDirty&&i._subjects.state.next({isDirty:u})}},[i,a.isDirty]),j.useEffect(()=>{var u;e.values&&!re(e.values,t.current)?(i._reset(e.values,{keepFieldsRef:!0,...i._options.resetOptions}),!((u=i._options.resetOptions)===null||u===void 0)&&u.keepIsValid||i._setValid(),t.current=e.values,l(f=>({...f}))):i._resetDefaultValues()},[i,e.values]),j.useEffect(()=>{i._state.mount||(i._setValid(),i._state.mount=!0),i._state.watch&&(i._state.watch=!1,i._subjects.state.next({...i._formState})),i._removeUnmounted()}),n.current.formState=j.useMemo(()=>zt(a,i),[i,a]),n.current}const Ir={title:"Components/InputField",component:U,parameters:{layout:"centered",docs:{description:{component:`
An Input Field is a component where users can enter text or numbers. It supports different input types and configurable options.

## Familiar HTML input API
The Input Field works just like a standard HTML input element.
It accepts all the usual input props, so you can use it the same way you would a normal HTML input.
It also includes a few extra properties for styling the component.

The available optional properties are as follows, try them out in the editable code sample below!

| Prop                | Type            | Description                                                              |
| --------------------| ----------------| ------------------------------------------------------------------------ |
| prefix?             |  string         | add a small text before the input                                        |
| suffix?             | string          | add a small text after the input                                         |
| label?              | string          | a label to be displayed inside the input element, above the input itself |
| labelPosition?      | top \\| side    | The position where the label should be rendered                          |
| invalid?            | boolean         | indicate that the input is invalid                                       |


## Simple Input API

The input-field module also provides simpler components for common use cases.
You can use these instead of the base InputField when you don’t need all the features of a standard HTML input,
or when you’re not working inside a form and just want to manage state with useState.
These components are designed to be straightforward: a string goes in, and a string comes out — no need to handle HTML events.
These simple components obey the following API. In addition they have all the same optional properties described above:

| Prop        | Type                  | Description                                                                       |
| ----------- | --------------------- | --------------------------------------------------------------------------------- |
|  value      |  T                    | The value of the controlled input                                                 |
|  onChange   |  (change: T) => void  | Called when the value changes                                                     |
|  required?  |  boolean              | Passed to the inner HTML element, renders an * (asterisk) next to the inner-label |


## Slots and sub-components

Using a combination of slots, sub-components, and the optional properties described above,
it is possible to customize the components quite a bit. The available components include:

| Slot                  | Type    | Description                                                                                       |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------- |
|  InputField.Icon      | Slot    | Places the children after the input, children should be icons                                     |
|  InputField.Controls  | Slot    | Places the children after the input, children should be small and interactive                     |
|  InputField.Label     | Wrapper | A wrapper for the input field that renders labels, help text, and error messages around the input |


## InputField.Label

The Label sub-component wraps the InputField and provides a label for it.
It can also display additional text, such as help messages or error messages, alongside the input.
As we move toward using inner labels, this outer Label will mainly be used for help text and errors.
Because it renders as an HTML <label> element, clicking the label will focus the input.

The Label's API is given below.

| Prop        | Type                    | Description                                                      |
| ----------- | ----------------------- | ---------------------------------------------------------------- |
|  label?     |  string                 | The primary label, title, or "name" of the wrapped input element |
|  helpText?  |  string                 | A string of help text to be displayed below the input            |
|  errors?    |  { message: string }[]  | An array of error messages to be displayed below the input.      |

Also note that some examples uses 'InputText.Label' rather than 'InputField.Label'. All of the sub-components and
slots available on the 'InputField' are also available on the simple inputs, unless otherwise mentioned.

\`\`\`
        `}}},tags:["autodocs"],args:{invalid:!1,disabled:!1,prefix:"",suffix:"",label:"Input Label",labelPosition:"top",required:!1},argTypes:{labelPosition:{options:["top","side"],control:{type:"radio"}}}},Ae={args:{name:"InputField"}},Te={args:{labelPosition:"side"},render:function(){const[n,t]=ce.useState(!1);return y.jsx("form",{onSubmit:a=>a.preventDefault(),children:y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"The input-field module also includes higher-level components with simpler, purpose-built APIs for common UI patterns. These components are lightweight alternatives to the base InputField when you don’t need the full control of a native HTML input. They’re especially useful outside traditional forms, such as when managing local state with useState and you don’t want to handle DOM events directly. Their main goal is to provide a simple, value-focused API — essentially “string in, string out” — so you don’t have to work with raw HTML event objects. They follow the API described below and support the same optional properties mentioned earlier."}),y.jsx(U,{label:"Country code",type:"text",placeholder:"Enter a country code...",id:"country_code",name:"country_code",pattern:"[A-Za-z]{3}",onInvalid:()=>t(!0),invalid:n,onChange:()=>t(!1),title:"Three letter country code",required:!0}),y.jsx($e,{type:"submit",primary:!0,children:"Submit"})]})})},parameters:{docs:{disable:!0}}},ke={render:function(){const{register:n,formState:{errors:t},handleSubmit:a}=cr(),l=i=>{alert(JSON.stringify(i))};return y.jsx("form",{onSubmit:i=>{a(l)(i)},children:y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"Because InputField is a drop-in replacement for a standard HTML input, it works smoothly with common state management and form libraries. For example, the implementation below shows how it can be used with react-hook-form to handle form state and validation. You can try the sample to see how the integration works in practice."}),y.jsx(U,{label:"First name",invalid:He(t.firstName),required:!0,...n("firstName",{required:!0,maxLength:20})}),y.jsx(U,{label:"Last name",invalid:He(t.lastName),...n("lastName",{pattern:/^[A-Za-z]+$/i})}),y.jsx(U,{label:"Age",type:"number",invalid:He(t.age),...n("age",{min:18,max:99})}),y.jsx($e,{primary:!0,type:"submit",children:"Submit"})]})})},parameters:{docs:{disable:!0}}},Se={render:function(){const[n,t]=ce.useState({firstName:"",lastName:"",age:18}),a=l=>t({...n,...l});return y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"The input-field module also provides higher-level components with simplified APIs for common UI patterns. These components are lightweight alternatives to the base InputField when you don’t need the full flexibility of a native HTML input, or when you’re working outside a form and only managing local state (for example, with useState). They are designed around a simple, value-focused API — essentially “string in, string out” — so you don’t have to handle low-level HTML events. They follow the API described below and support the same optional properties mentioned earlier."}),y.jsx(Ee,{label:"First name",value:n.firstName,onChange:l=>a({firstName:l})}),y.jsx(Ee,{label:"Last name",value:n.lastName,onChange:l=>a({lastName:l})}),y.jsx(be,{label:"Age",value:n.age,onChange:l=>a({age:l}),required:!0})]})},parameters:{docs:{disable:!0}}},_e={render:()=>y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"The Icon slot provides a standard way to display a small graphic (about 20×20 px) next to the input. It appears to the right of the suffix and just before any control elements. In the examples below, the icon shows a folder graphic, and the prefix is a 🍺 emoji."}),y.jsx(U,{label:"Search",type:"text",prefix:"🍺",children:y.jsx(U.Icon,{children:y.jsx(qe.FolderOpen,{title:"Icons render before the input"})})})]}),parameters:{docs:{disable:!0}}},Le={render:function(){const[n,t]=ce.useState(0),a=()=>t(n+1),l=()=>t(Math.max(n-1,0));return y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"The Controls slot lets you place a small interactive element to the right of the suffix. It’s commonly used for things like numeric steppers or a “clear” button (for example, an icon that clears the field when clicked). While you can pass any valid React node, it’s mainly intended for clickable controls. In the example below, the suffix is a 🍺 emoji. Notice that it aligns with the input and prefix on the left side, not with the controls on the right."}),y.jsx(U,{label:"Do you like this storybook?",value:n,onChange:()=>{},type:"number",children:y.jsx(U.Controls,{children:y.jsxs(Ot,{style:{width:Rt.xll},children:[y.jsx("div",{onClick:a,children:"️👍"}),y.jsx("div",{children:"/"}),y.jsx("div",{onClick:l,children:"👎️"})]})})})]})},parameters:{docs:{disable:!0}}},Ve={render:function(){const[n,t]=ce.useState(""),[a,l]=ce.useState([]),i=u=>{const f=[];u||f.push({message:"This field is required"}),u.match(/[A-Za-z]{3}/)||f.push({message:"Input was not a 3 letter country code"}),t(u),l(f)};return y.jsxs(ne,{column:!0,gap:se.m,style:{maxWidth:"720px"},children:[y.jsx(ee,{children:"The Label sub-component wraps the InputField and renders the corresponding HTML label element. In addition to providing an accessible label, it also displays supporting text such as help messages and validation errors. As we move to an inner-labeling approach, the outer Label is now mainly used for help and error text rather than the primary label itself. Because it renders a native label, clicking anywhere within it — including the help or error text — will focus the associated input."}),y.jsx(ee,{children:"The example below shows how to use InputText.Label instead of InputField.Label. All sub-components and slots available on InputField are also available on the simplified input components, unless noted otherwise."}),y.jsx(Ee.Label,{label:"Country Code",helpText:"Please enter a 3 letter country code",errors:a,children:y.jsx(Ee,{value:n,name:"country_code",invalid:a.length>0,placeholder:"e.g. AUD",onChange:i})})]})},parameters:{docs:{disable:!0}}},De={render:function(){const[n,t]=ce.useState(0),a=()=>t(u=>Math.min(u+1,99)),l=()=>t(u=>Math.max(u-1,0)),i=[];return(0>n||n>100)&&i.push({message:"Please choose an age between 0 and 99"}),y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{style:{maxWidth:"720px"},children:"This utility is provided as a sub-component of the InputNumber simple input, but it can be used with any input component, as shown in the example below."}),y.jsxs("form",{onSubmit:u=>u.preventDefault(),children:[y.jsx(be.Label,{helpText:"Age should be a number between 0 and 99",errors:i,children:y.jsx(be,{label:"Age",name:"age",onChange:u=>u&&t(u),value:n,invalid:i.length>0,placeholder:"Enter your age...",children:y.jsx(be.Controls,{children:y.jsx(be.Stepper,{onUpClick:a,onDownClick:l})})})}),y.jsx($e,{type:"submit",primary:!0,children:"Submit"})]})]})},parameters:{docs:{disable:!0}}},Ce={render:function(){return y.jsxs(ne,{column:!0,gap:se.m,children:[y.jsx(ee,{children:"Here is an example of an input with everything! Never actually do this..."}),y.jsx(U.Label,{label:"Price",helpText:"Enter a price in AUD",errors:[{message:"Too many UI decorations!"}],children:y.jsxs(U,{type:"number",label:"Price",prefix:"$",suffix:"AUD",step:.01,min:0,placeholder:"Enter an amount...",children:[y.jsx(U.Icon,{children:y.jsx(qe.CircleDollar,{title:"Icons render before the input"})}),y.jsx(U.Controls,{children:y.jsx(qe.FolderOpen,{title:"Controls render after the input"})})]})})]})},parameters:{docs:{disable:!0}}};Ae.parameters={...Ae.parameters,docs:{...Ae.parameters?.docs,source:{originalSource:`{
  args: {
    name: "InputField"
  }
}`,...Ae.parameters?.docs?.source}}};Te.parameters={...Te.parameters,docs:{...Te.parameters?.docs,source:{originalSource:`{
  args: {
    labelPosition: "side"
  },
  render: function Render() {
    const [invalid, setInvalid] = useState<boolean>(false);
    return <form onSubmit={e => e.preventDefault()}>
        <Flex column gap={Gap.m}>
          <BodyLarge style={{
          maxWidth: "720px"
        }}>
            The input-field module also includes higher-level components with
            simpler, purpose-built APIs for common UI patterns. These components
            are lightweight alternatives to the base InputField when you don’t
            need the full control of a native HTML input. They’re especially
            useful outside traditional forms, such as when managing local state
            with useState and you don’t want to handle DOM events directly.
            Their main goal is to provide a simple, value-focused API —
            essentially “string in, string out” — so you don’t have to work with
            raw HTML event objects. They follow the API described below and
            support the same optional properties mentioned earlier.
          </BodyLarge>
          <InputField label="Country code" type="text" placeholder="Enter a country code..." id="country_code" name="country_code" pattern="[A-Za-z]{3}" onInvalid={() => setInvalid(true)} invalid={invalid} onChange={() => setInvalid(false)} title="Three letter country code" required />
          <Button type="submit" primary>
            Submit
          </Button>
        </Flex>
      </form>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...Te.parameters?.docs?.source}}};ke.parameters={...ke.parameters,docs:{...ke.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const {
      register,
      formState: {
        errors
      },
      handleSubmit
    } = useForm<ReactFormHookExampleData>();
    const onSubmit = (data: ReactFormHookExampleData): void => {
      alert(JSON.stringify(data));
    };
    return <form onSubmit={event => {
      void handleSubmit(onSubmit)(event);
    }}>
        <Flex column gap={Gap.m}>
          <BodyLarge style={{
          maxWidth: "720px"
        }}>
            Because InputField is a drop-in replacement for a standard HTML
            input, it works smoothly with common state management and form
            libraries. For example, the implementation below shows how it can be
            used with react-hook-form to handle form state and validation. You
            can try the sample to see how the integration works in practice.
          </BodyLarge>
          <InputField label="First name" invalid={isDefined(errors.firstName)} required {...register("firstName", {
          required: true,
          maxLength: 20
        })} />
          <InputField label="Last name" invalid={isDefined(errors.lastName)} {...register("lastName", {
          pattern: /^[A-Za-z]+$/i
        })} />
          <InputField label="Age" type="number" invalid={isDefined(errors.age)} {...register("age", {
          min: 18,
          max: 99
        })} />
          <Button primary type="submit">
            Submit
          </Button>
        </Flex>
      </form>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...ke.parameters?.docs?.source}}};Se.parameters={...Se.parameters,docs:{...Se.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      age: 18
    });
    const onChange = (change: object) => setState({
      ...state,
      ...change
    });
    return <Flex column gap={Gap.m}>
        <BodyLarge style={{
        maxWidth: "720px"
      }}>
          The input-field module also provides higher-level components with
          simplified APIs for common UI patterns. These components are
          lightweight alternatives to the base InputField when you don’t need
          the full flexibility of a native HTML input, or when you’re working
          outside a form and only managing local state (for example, with
          useState). They are designed around a simple, value-focused API —
          essentially “string in, string out” — so you don’t have to handle
          low-level HTML events. They follow the API described below and support
          the same optional properties mentioned earlier.
        </BodyLarge>
        <InputText label="First name" value={state.firstName} onChange={firstName => onChange({
        firstName
      })} />
        <InputText label="Last name" value={state.lastName} onChange={lastName => onChange({
        lastName
      })} />
        <InputNumber label="Age" value={state.age} onChange={age => onChange({
        age
      })} required />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...Se.parameters?.docs?.source}}};_e.parameters={..._e.parameters,docs:{..._e.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <Flex column gap={Gap.m}>
        <BodyLarge style={{
        maxWidth: "720px"
      }}>
          The Icon slot provides a standard way to display a small graphic
          (about 20×20 px) next to the input. It appears to the right of the
          suffix and just before any control elements. In the examples below,
          the icon shows a folder graphic, and the prefix is a 🍺 emoji.
        </BodyLarge>
        <InputField label="Search" type="text" prefix="🍺">
          <InputField.Icon>
            <IconMinor.FolderOpen title="Icons render before the input" />
          </InputField.Icon>
        </InputField>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,..._e.parameters?.docs?.source}}};Le.parameters={...Le.parameters,docs:{...Le.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [likes, setLikes] = useState(0);
    const onLike = () => setLikes(likes + 1);
    const onDislike = () => setLikes(Math.max(likes - 1, 0));
    return <Flex column gap={Gap.m}>
        <BodyLarge style={{
        maxWidth: "720px"
      }}>
          The Controls slot lets you place a small interactive element to the
          right of the suffix. It’s commonly used for things like numeric
          steppers or a “clear” button (for example, an icon that clears the
          field when clicked). While you can pass any valid React node, it’s
          mainly intended for clickable controls. In the example below, the
          suffix is a 🍺 emoji. Notice that it aligns with the input and prefix
          on the left side, not with the controls on the right.
        </BodyLarge>
        <InputField label="Do you like this storybook?" value={likes} onChange={() => undefined} type="number">
          <InputField.Controls>
            <SpaceBetween style={{
            width: Padding.xll
          }}>
              <div onClick={onLike}>️👍</div>
              <div>/</div>
              <div onClick={onDislike}>👎️</div>
            </SpaceBetween>
          </InputField.Controls>
        </InputField>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...Le.parameters?.docs?.source}}};Ve.parameters={...Ve.parameters,docs:{...Ve.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<string>("");
    const [errors, setErrors] = useState<{
      message: string;
    }[]>([]);
    const handleChange = (change: string) => {
      const errors: {
        message: string;
      }[] = [];
      if (!change) {
        errors.push({
          message: "This field is required"
        });
      }
      if (!change.match(/[A-Za-z]{3}/)) {
        errors.push({
          message: "Input was not a 3 letter country code"
        });
      }
      setValue(change);
      setErrors(errors);
    };
    return <Flex column gap={Gap.m} style={{
      maxWidth: "720px"
    }}>
        <BodyLarge>
          The Label sub-component wraps the InputField and renders the
          corresponding HTML label element. In addition to providing an
          accessible label, it also displays supporting text such as help
          messages and validation errors. As we move to an inner-labeling
          approach, the outer Label is now mainly used for help and error text
          rather than the primary label itself. Because it renders a native
          label, clicking anywhere within it — including the help or error text
          — will focus the associated input.
        </BodyLarge>
        <BodyLarge>
          The example below shows how to use InputText.Label instead of
          InputField.Label. All sub-components and slots available on InputField
          are also available on the simplified input components, unless noted
          otherwise.
        </BodyLarge>
        <InputText.Label label="Country Code" helpText="Please enter a 3 letter country code" errors={errors}>
          <InputText value={value} name="country_code" invalid={errors.length > 0} placeholder="e.g. AUD" onChange={handleChange} />
        </InputText.Label>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...Ve.parameters?.docs?.source}}};De.parameters={...De.parameters,docs:{...De.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [age, setAge] = useState<number>(0);
    const onUp = () => setAge(prevAge => Math.min(prevAge + 1, 99));
    const onDown = () => setAge(prevAge => Math.max(prevAge - 1, 0));
    const errors = [];
    if (0 > age || age > 100) {
      errors.push({
        message: "Please choose an age between 0 and 99"
      });
    }
    return <Flex column gap={Gap.m}>
        <BodyLarge style={{
        maxWidth: "720px"
      }}>
          This utility is provided as a sub-component of the InputNumber simple
          input, but it can be used with any input component, as shown in the
          example below.
        </BodyLarge>
        <form onSubmit={e => e.preventDefault()}>
          <InputNumber.Label helpText="Age should be a number between 0 and 99" errors={errors}>
            <InputNumber label="Age" name="age" onChange={age => age && setAge(age)} value={age} invalid={errors.length > 0} placeholder="Enter your age...">
              <InputNumber.Controls>
                <InputNumber.Stepper onUpClick={onUp} onDownClick={onDown} />
              </InputNumber.Controls>
            </InputNumber>
          </InputNumber.Label>
          <Button type="submit" primary>
            Submit
          </Button>
        </form>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...De.parameters?.docs?.source}}};Ce.parameters={...Ce.parameters,docs:{...Ce.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    return <Flex column gap={Gap.m}>
        <BodyLarge>
          Here is an example of an input with everything! Never actually do
          this...
        </BodyLarge>
        <InputField.Label label="Price" helpText="Enter a price in AUD" errors={[{
        message: "Too many UI decorations!"
      }]}>
          <InputField type="number" label="Price" prefix="$" suffix="AUD" step={0.01} min={0.0} placeholder="Enter an amount...">
            <InputField.Icon>
              <IconMinor.CircleDollar title="Icons render before the input" />
            </InputField.Icon>
            <InputField.Controls>
              <IconMinor.FolderOpen title="Controls render after the input" />
            </InputField.Controls>
          </InputField>
        </InputField.Label>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...Ce.parameters?.docs?.source}}};const Ar=["Docs","PlainHTMLFormExample","ReactFormHookExample","SimpleInputExample","IconExample","ControlsExample","OuterLabelExample","StepperExample","FullyDressedExample"];export{Le as ControlsExample,Ae as Docs,Ce as FullyDressedExample,_e as IconExample,Ve as OuterLabelExample,Te as PlainHTMLFormExample,ke as ReactFormHookExample,Se as SimpleInputExample,De as StepperExample,Ar as __namedExportsOrder,Ir as default};
