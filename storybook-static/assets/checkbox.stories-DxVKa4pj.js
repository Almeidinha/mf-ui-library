import{j as e}from"./jsx-runtime-u17CrQMm.js";import{F as x,L as b,C as u,a as m,I as C,c as g}from"./button-sKft9pFr.js";import{G as o}from"./shadows-CyjoGr4u.js";import{r as p}from"./iframe-Co_0DYZM.js";import{C as n}from"./checkbox-Cf_FJ72f.js";import"./preload-helper-PPVm8Dsz.js";import"./useMergedRefs-CBj2iGZS.js";const{useArgs:f}=__STORYBOOK_MODULE_PREVIEW_API__,A={title:"Components/Checkbox",component:n,parameters:{layout:"centered",docs:{description:{component:`
# Checkbox

Checkboxes are most commonly used to give users a way to make a range of selections (zero, one, or multiple).
They may also be used as a way to have users indicate they agree to specific terms and services.

## How to use

\`\`\`tsx
import { Checkbox } from './index'

<Checkbox />
\`\`\`

---

## API

Extends HTMLAttributes<HTMLInputElement>

| Name      | Type    | Description                                                         |
| --------- | ------- | ------------------------------------------------------------------- |
| checked?  | boolean | Set checkbox as filled                                              |
| disabled? | boolean | Set checkbox as a disabled way (can't click or interact with that)  |
| error?    | boolean | Useful to work inside a form or show some feedback from user action |
| onChange? | event   | You can listen the changes from the component                       |

\`\`\`
        `}}},tags:["autodocs"],args:{disabled:!1,error:!1,indeterminate:!1,checked:!1},argTypes:{indeterminate:{control:"boolean"}}},d={render:function(a){const[{checked:r},t]=f(),c=s=>{t({checked:s})};return e.jsxs(x,{style:{gap:o.m,alignItems:"center"},children:[e.jsx(b,{children:"Accept terms and conditions"}),e.jsx(n,{...a,checked:r,onChange:c})]})}},l={render:function(){const[a,r]=p.useState(!1);return e.jsxs(x,{style:{gap:o.m,alignItems:"center"},children:[e.jsx(n,{checked:a,onChange:t=>r(t)}),e.jsx(n,{}),e.jsx(n,{checked:a,readOnly:!0,onChange:r}),e.jsx(n,{disabled:!0}),e.jsx(n,{checked:a,disabled:!0,readOnly:!0,onChange:t=>r(t)}),e.jsx(n,{error:!0}),e.jsx(n,{checked:a,error:!0,readOnly:!0,onChange:t=>r(t)})]})},parameters:{docs:{disable:!0}}},i={render:function(){const[a,r]=p.useState(!1),[t,c]=p.useState(!1);return e.jsx("form",{onSubmit:s=>{s.preventDefault()},children:e.jsxs(u,{style:{width:"300px"},children:[e.jsxs(u.Controls,{children:[e.jsx(m,{type:"button",onClick:()=>c(!1),children:"Clear"}),e.jsx(m,{primary:!0,type:"submit",children:"Submit"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:o.xxs,padding:o.xs,height:"40px"},children:[e.jsxs("label",{htmlFor:"accept_terms",style:{display:"flex",alignItems:"center",gap:o.xs},children:[e.jsx(n,{id:"accept_terms",checked:t,onInvalid:()=>{r(!0)},error:a,onChange:s=>{c(s),r(!1)},required:!0}),e.jsx(b,{as:"span",children:"I accept these terms."})]}),e.jsx(C,{is:t===!0,children:e.jsx(g,{subdued:!0,children:"You have accepted the terms."})})]})]})})},parameters:{docs:{disable:!0}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: function Render(args: CheckboxProps) {
    const [{
      checked
    }, updateArgs] = useArgs<CheckboxProps>();
    const handleChange = (nextChecked: boolean | undefined) => {
      updateArgs({
        checked: nextChecked
      });
    };
    return <Flex style={{
      gap: Gap.m,
      alignItems: "center"
    }}>
        <Label>Accept terms and conditions</Label>
        <Checkbox {...args} checked={checked} onChange={handleChange} />
      </Flex>;
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [state, setState] = useState<boolean | undefined>(false);
    return <Flex style={{
      gap: Gap.m,
      alignItems: "center"
    }}>
        <Checkbox checked={state} onChange={nextState => setState(nextState)} />
        <Checkbox />
        <Checkbox checked={state} readOnly onChange={setState} />
        <Checkbox disabled />
        <Checkbox checked={state} disabled readOnly onChange={nextState => setState(nextState)} />
        <Checkbox error />
        <Checkbox checked={state} error readOnly onChange={nextState => setState(nextState)} />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [withError, setWithError] = useState(false);
    const [accepted, setAccepted] = useState<boolean | undefined>(false);
    return <form onSubmit={e => {
      e.preventDefault();
    }}>
        <Card style={{
        width: "300px"
      }}>
          <Card.Controls>
            <Button type="button" onClick={() => setAccepted(false)}>
              Clear
            </Button>
            <Button primary type="submit">
              Submit
            </Button>
          </Card.Controls>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: Gap.xxs,
          padding: Gap.xs,
          height: "40px"
        }}>
            <label htmlFor="accept_terms" style={{
            display: "flex",
            alignItems: "center",
            gap: Gap.xs
          }}>
              <Checkbox id="accept_terms" checked={accepted} onInvalid={() => {
              setWithError(true);
            }} error={withError} onChange={value => {
              setAccepted(value);
              setWithError(false);
            }} required />
              <Label as="span">I accept these terms.</Label>
            </label>
            <If is={accepted === true}>
              <Caption subdued>You have accepted the terms.</Caption>
            </If>
          </div>
        </Card>
      </form>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...i.parameters?.docs?.source}}};const _=["Docs","CheckBoxExamples","IntegratedExample"];export{l as CheckBoxExamples,d as Docs,i as IntegratedExample,_ as __namedExportsOrder,A as default};
