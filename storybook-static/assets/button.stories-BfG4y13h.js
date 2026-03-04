import{j as e}from"./jsx-runtime-u17CrQMm.js";import{a as p,F as m,f as n}from"./button-sKft9pFr.js";import{I as f}from"./input-field-Dp6wjjTc.js";import{I as y}from"./input-text-uiXaQY7h.js";import{r as l}from"./iframe-Co_0DYZM.js";import{G as b}from"./shadows-CyjoGr4u.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";import"./preload-helper-PPVm8Dsz.js";const z={title:"Components/Button",component:p,parameters:{layout:"centered",docs:{description:{component:`

## How to use

\`\`\`javascript
import { Button } from './index'

<Button primary label="SOME-label-HERE" />
\`\`\`

## Properties 

The Buttons accepts the same properties as a normal button and has some additional ones.

The available optional properties are as follows, try them out in the editable code sample below!

| Prop          | Type           | Description                                                          |
| ----------    | ---------      | -------------------------------------------------------------------- |
|  IconPrefix?  |  Icon          | It will add the given Icon before the text                           |
|  IconSuffix?  |  Icon          | It will add the given Icon after the text                            |
|  loading?     |  boolean       | Replaces the text for a loading icon                                 |  
|  size ?       |  small / large | Changes the size of the button. Leave it empty for the default size  |
|  type ?       |  string        | Changes the type of the button. Leave it empty for the default type  |

The available types are: \`basic\`, \`primary\`, \`destructive\`, \`outline\`, \`plain\`.
Types primary and destructive can also be combined by passing \`primary destructive\` as the type.

        `}}},tags:["autodocs"],args:{type:void 0,size:"default",children:"Button",loading:!1,subtle:!1,disabled:!1,IconPrefix:void 0,IconSuffix:void 0},argTypes:{type:{control:{type:"select"},options:["basic","primary","destructive","primary destructive","outline","plain"],table:{defaultValue:{summary:"basic"}}},size:{control:{type:"radio"},options:["small","default","large"],table:{defaultValue:{summary:"default"}}},IconPrefix:{control:{type:"select"},options:["Bell","CircleInfo"],mapping:{Bell:()=>e.jsx(n.Bell,{}),CircleInfo:()=>e.jsx(n.CircleInfo,{})}},IconSuffix:{control:{type:"select"},options:["Bell","CircleInfo"],mapping:{Bell:()=>e.jsx(n.Bell,{}),CircleInfo:()=>e.jsx(n.CircleInfo,{})}}}},a={render:t=>{const o=t.type?Object.assign({},...t.type.split(" ").map(i=>({[i]:!0}))):{},s=t.size?{[t.size]:!0}:{};return e.jsx(p,{...t,...o,...s})}},r={render:()=>{const[t,o]=l.useState(!1),[s,i]=l.useState(!0),[c,d]=l.useState(!1);return e.jsx("form",{onSubmit:u=>{u.preventDefault(),d(!0),setTimeout(()=>d(!1),2e3)},children:e.jsxs(m,{column:!0,gap:b.xs,children:[e.jsx(y.Label,{label:"Country Code",htmlFor:"country_code",children:e.jsx(f,{type:"text",placeholder:"Enter a country code...",id:"country_code",name:"country_code",pattern:"[A-Za-z]{3}",onInvalid:()=>o(!0),invalid:t,onChange:()=>{o(!1),i(!1)},title:"Three letter country code",required:!0})}),e.jsx(p,{primary:!0,type:"submit",disabled:s,loading:c,children:"Send"})]})})},parameters:{docs:{disable:!0}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const typeProp = args.type ? Object.assign({}, ...(args.type as string).split(" ").map((type: string) => ({
      [type]: true
    }))) : {};
    const sizeProp = args.size ? {
      [args.size]: true
    } : {};
    return <Button {...args} {...typeProp} {...sizeProp} />;
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    return <form onSubmit={e => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }}>
        <Flex column gap={Gap.xs}>
          <InputText.Label label="Country Code" htmlFor="country_code">
            <InputField type="text" placeholder="Enter a country code..." id="country_code" name="country_code" pattern="[A-Za-z]{3}" onInvalid={() => setInvalid(true)} invalid={invalid} onChange={() => {
            setInvalid(false);
            setDisabled(false);
          }} title="Three letter country code" required />
          </InputText.Label>
          <Button primary type="submit" disabled={disabled} loading={loading}>
            Send
          </Button>
        </Flex>
      </form>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...r.parameters?.docs?.source}}};const T=["Docs","DisabledLoadingExample"];export{r as DisabledLoadingExample,a as Docs,T as __namedExportsOrder,z as default};
