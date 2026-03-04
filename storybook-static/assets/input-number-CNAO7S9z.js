import{j as e}from"./jsx-runtime-u17CrQMm.js";import{w as m,j as x}from"./button-sKft9pFr.js";import{I as n}from"./input-field-Dp6wjjTc.js";import{G as b,c as t,S as f,a as l}from"./shadows-CyjoGr4u.js";const g=t.div`
  display: flex;
  flex-direction: column;
  gap: ${b.xxs};
  align-self: center;
  box-sizing: border-box;
  :hover {
    cursor: pointer;
  }
`,p=t(m)`
  background: ${f.Neutral.Default};
  width: 18px;
  height: 14px;
  border-radius: 3px;
`,h=t.div`
  width: 0px;
  height: 0px;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-bottom: 3.5px solid ${l.Default};
`,v=t.div`
  width: 0px;
  height: 0px;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 3.5px solid ${l.Default};
`,d=o=>e.jsxs(g,{children:[e.jsx(p,{onClick:o.onUpClick,children:e.jsx(h,{})}),e.jsx(p,{onClick:o.onDownClick,children:e.jsx(v,{})})]});d.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{onUpClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onDownClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const r=o=>{const{onChange:u,value:s,...c}=o;return e.jsx(n,{...c,type:"number",value:x(s)||isNaN(s)?"":s,onChange:i=>{const a=i.target.value===""?void 0:i.target.valueAsNumber;u(Number.isNaN(a)?void 0:a)}})};r.Icon=n.Icon;r.Controls=n.Controls;r.Label=n.Label;r.Stepper=d;r.__docgenInfo={description:"",methods:[{name:"Label",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null},{name:"Stepper",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"IStepperProps",alias:"IStepperProps"}}],returns:null}],displayName:"InputNumber"};export{r as I};
