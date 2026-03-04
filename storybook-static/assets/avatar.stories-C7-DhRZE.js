import{j as t}from"./jsx-runtime-u17CrQMm.js";import{D as h,B as f,L as c,i as n,N as x,h as v,I as N,j as y,k as j}from"./button-sKft9pFr.js";import{b as l,c as i,S as b,M as z}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";function m(e){switch(e){case 1:return 1;case 2:return 2;case 4:return 4;default:return 2}}const A={1:"32px",2:"40px",4:"60px"},S={1:c,2:f,4:h};function L(e){return A[m(l([e.small,e.medium,e.large]))]}function w(e){return S[m(l([e.small,e.medium,e.large]))]}const E=i(j)`
  align-items: center;
`,D=i.div`
  width: ${({size:e})=>e};
  height: ${({size:e})=>e};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${b.Neutral.Default};
`,I=i.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`,F=i(c)`
  margin-left: ${z.xs};
`,_=(e,a,s)=>n(e)&&a===0||a===s.length-1,$=e=>y(e)?"":e.charAt(0),M=e=>e.trim().split(" ").filter(_).map($).join(""),o=e=>{const{name:a,imageUrl:s,withLabel:u,imageLabel:d=`${a} avatar`}=e,g=L(e),p=w(e);return n(a)?t.jsxs(E,{className:e.className,children:[t.jsx(D,{size:g,children:n(s)&&!v(s)?t.jsx(I,{src:s,alt:d}):t.jsx(p,{children:M(a)})}),t.jsx(N,{is:u,children:t.jsx(F,{children:a})})]}):t.jsx(x,{})};o.__docgenInfo={description:"",methods:[],displayName:"Avatar"};const R={title:"Components/Avatar",component:o,parameters:{layout:"centered",docs:{description:{component:`

## How to use

\`\`\`javascript
import { Avatar } from './index'

<Avatar name="SOME-NAME-HERE" />
\`\`\`
## Good Practices
- You can send the 'imageLabel' propertie as and 'alt' propertie in order to set and alternative text to image
        `}}},tags:["autodocs"],args:{name:"Some Full Name",size:"large",imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png",imageLabel:"Some Full Name avatar",withLabel:!0,className:"custom-avatar"},argTypes:{size:{control:{type:"select"},options:["small","medium","large"],table:{defaultValue:{summary:"small"}}}}},r={render:({...e})=>{const a={[e.size]:!0};return t.jsx(o,{...e,...a})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const sizeProp = {
      [args.size]: true
    } as const;
    return <Avatar {...args} {...sizeProp} />;
  }
}`,...r.parameters?.docs?.source}}};const V=["Docs"];export{r as Docs,V as __namedExportsOrder,R as default};
