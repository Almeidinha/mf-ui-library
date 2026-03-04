import{j as a}from"./jsx-runtime-u17CrQMm.js";import{P as l,c as t,M as c,B as e,F as i,a as s,S as r}from"./shadows-CyjoGr4u.js";import{n as g,T as k}from"./button-sKft9pFr.js";const m=t.input`
  -webkit-appearance: none;
  appearance: none;

  margin: ${c.none};
  width: 1.5em;
  height: 1.5em;

  border: 2px solid ${e.Default.Dark};
  border-radius: 50%;

  cursor: pointer;
  display: grid;
  place-items: center;

  /* Avoid transition: all (can animate things you don't want, and is heavier) */
  transition:
    border-color 0.1s ease-in-out,
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  /* Inner dot */
  &::after {
    content: "";
    display: block;
    width: 0.75em;
    height: 0.75em;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.1s ease-in-out;
  }

  /* Hover (unchecked): subtle feedback, no dot fill */
  &:hover {
    border-color: ${i.Default};
  }

  /* Checked */
  &:checked {
    border-color: ${e.Highlight.Default};
  }

  &:checked::after {
    background-color: ${s.Highlight};
  }

  /* Hover (checked): keep dot, adjust border/backplate */
  &:checked:hover {
    background-color: ${r.Default.Default};
    border-color: ${s.Highlight};
  }

  /* Focus ring: prefer focus-visible */
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px auto ${i.Default};
    outline-offset: 4px;
  }

  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    border-color: ${e.Default.Default};
    background-color: ${r.Default.Default};
  }

  &:disabled:hover {
    border-color: ${e.Default.Default};
  }

  &:disabled::after {
    background-color: transparent;
  }

  &:disabled:checked::after {
    background-color: ${e.Default.Default};
  }

  &:disabled:checked:hover {
    background-color: ${r.Default.Default};
    border-color: ${e.Default.Default};
  }
`,$=t.label`
  ${k.Label}
  padding: ${l.xxs} ${l.none};
  display: inline-flex;
  align-items: center;
  width: fit-content;
  cursor: ${o=>o.$disabled?"not-allowed":"pointer"};
`,D=t.span`
  margin-left: ${c.xs};
`,x=o=>{const{className:u,label:b,disabled:n,onChange:f,checked:h,id:d,...p}=o;return a.jsxs($,{htmlFor:d,$disabled:g(n),className:u,children:[a.jsx(m,{id:d,type:"radio",disabled:n,onChange:f,checked:h,...p}),a.jsx(D,{children:b})]})};x.__docgenInfo={description:"",methods:[],displayName:"RadioButton"};export{x as R};
