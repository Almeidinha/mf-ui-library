import{j as e}from"./jsx-runtime-u17CrQMm.js";import{h as S,N,I as k,i as A,L as $,F as f,b as F,c as M,a as V}from"./button-sKft9pFr.js";import{G as x,M as w,c as I}from"./shadows-CyjoGr4u.js";import{r as i}from"./iframe-Co_0DYZM.js";import{I as B}from"./input-checkbox-ft-M1p-9.js";import{E as G}from"./error-message-BdVgcHxy.js";import"./preload-helper-PPVm8Dsz.js";import"./checkbox-Cf_FJ72f.js";import"./useMergedRefs-CBj2iGZS.js";const _=I($)`
  margin-top: ${w.xxs};
  margin-left: ${w.xl};
  user-select: none;
`,D=I(f)`
  width: 100%;
  flex-direction: column;
  gap: ${x.m};
  padding: ${w.s};
`,m=({options:l,className:s="",errorMessage:o,value:a,onChange:n,defaultValue:u,name:c,...y})=>{if(S(l))return e.jsx(N,{});const r=a!==void 0,[L,j]=i.useState(()=>u??[]),d=r?a:L;i.useEffect(()=>{r&&j(a??[])},[r,a]);const C=i.useMemo(()=>new Set(d),[d]),E=i.useCallback(t=>{const h=C.has(t)?d.filter(p=>p!==t):[...d,t];r||j(h),n?.(h)},[r,n,d,C]);return e.jsxs(D,{role:"group",className:s,...y,children:[l.map(t=>{const h=t.id??`mcl-${t.value}`,p=t.helpMessage?`${h}-help`:void 0,T=C.has(t.value);return e.jsxs("div",{children:[e.jsx(B,{id:h,label:t.label,checked:T,disabled:t.disabled,"aria-describedby":p,name:c,value:t.value,onChange:()=>E(t.value)}),e.jsx(k,{is:A(t.helpMessage),children:e.jsx(_,{subdued:!0,id:p,children:t.helpMessage})})]},t.value)}),e.jsx(k,{is:A(o)&&!S(o),children:e.jsx(G,{message:o})})]})};m.__docgenInfo={description:"",methods:[],displayName:"MultiChoiceList",props:{className:{defaultValue:{value:'""',computed:!1},required:!1}}};const J={title:"Components/MultiChoiceList",component:m,parameters:{layout:"centered",docs:{description:{component:`
This is a organism, composed by checkbox molecule and some atoms.

## How to use

\`\`\`javascript
import { MultiChoiceList } from './index'

<MultiChoiceList
  options={[
    {
      label: 'My Awesome label',
      value: 'my-awesome-label',
      id: '1',
    },
    {
      label: 'Another label',
      value: 'another-label',
      id: '2',
    },
  ]
  value={['my-awesome-label']}
  onChange={(next) => console.log(next)}
/>
\`\`\`

## API
This component receive a list (\`options\` parameter) from N amount of Checkbox if you'd like to render.
So all the possible values from Checkbox component can be passed here.
Also, you can sen this parameters:


| Name | Type | Description | Required (Y/N)|
| ---- | ----- | ------ | ----- |
| \`value\` | \`string\` | The value from each checkbox in the list | Y |
| \`label\` | \`string\` | The label from each checkbox in the list | Y |
| \`id\` | \`string\` | The id from each checkbox in the list | N |
| \`disabled\` | \`boolean\` | Whether the checkbox is disabled | N |
| \`helpMessage\` | \`string\` | Message that will be render bellow each checkbox field | N |



## Examples
        `}}},tags:["autodocs"],args:{options:[{label:"Apple",value:"apple",helpMessage:"This is a helpful message for Apple"},{label:"Banana",value:"banana",helpMessage:"This is a helpful message for Banana"},{label:"Cherry",value:"cherry",helpMessage:"This is a helpful message for Cherry"}],value:[],errorMessage:"",className:"",onChange:l=>{},defaultValue:void 0,name:void 0,"aria-label":void 0,"aria-labelledby":void 0},argTypes:{options:{table:{type:{summary:"MultiChoiceOption[]",detail:"Array of options to render, each with shape { value: string; label: string; helpMessage?: string; disabled?: boolean; id?: string }"}}},className:{table:{type:{summary:"string",detail:"Additional CSS class names to apply to the component"}}},onChange:{table:{type:{summary:"(next: string[]) => void",detail:"Function that receives the next selected values array when a change occurs, use for controlled mode. For uncontrolled mode, this is optional."}}},value:{table:{type:{summary:"string[]",detail:"Array<string> representing selected values, use for controlled mode"}}},defaultValue:{table:{type:{summary:"string[]",detail:"string representing the default selected values, use for uncontrolled mode"}}},name:{table:{type:{summary:"string"}},control:!1},"aria-label":{table:{type:{summary:"string"}},control:!1},"aria-labelledby":{table:{type:{summary:"string"}},control:!1}}},g={render:l=>{const[s,o]=i.useState([]),a=c=>{o(c)},{defaultValue:n,...u}=l;return e.jsxs(f,{column:!0,gap:x.m,children:[e.jsx(F,{children:"For the controlled version, the selected values are managed by the parent component. In this example, we display the currently selected values below the list."}),e.jsx(m,{...u,value:s,onChange:c=>a(c)}),e.jsx(M,{children:`Currently selected values: ${s.join(", ")}`})]})}},b={render:l=>{const s=n=>{alert(`Selected values: ${n.join(", ")}`)},{value:o,...a}=l;return e.jsxs(f,{column:!0,gap:x.m,children:[e.jsx(F,{children:"For the uncontrolled version, the component manages its own state internally. In this example, we show an alert with the selected values whenever a change occurs."}),e.jsx(m,{...a,defaultValue:[],onChange:n=>s(n)}),e.jsx(M,{children:"In uncontrolled mode, the component manages its own state. The onChange callback is optional and can be used to listen for changes, but the parent component does not control the selected values."})]})}},v={render:l=>{const[s,o]=i.useState([]),[a,n]=i.useState(""),u=()=>{n(s.length<2?"Please select at least two options":""),s.length>=2&&alert(`Form submitted with values: ${s.join(", ")}`)},{value:c,...y}=l;return e.jsx("form",{onSubmit:r=>r.preventDefault(),children:e.jsxs(f,{column:!0,gap:x.m,children:[e.jsx(m,{...y,defaultValue:[],onChange:r=>{n(""),o(r)},errorMessage:a}),e.jsx(V,{type:"submit",primary:!0,onClick:u,children:"Submit"}),e.jsx(M,{children:"In this example, we demonstrate how to display an error message when the user tries to submit the form without selecting at least two options. The error message will appear below the list if the validation fails."})]})})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    const handleChange = (values: string[]) => {
      setSelected(values);
    };
    const {
      defaultValue,
      ...restArgs
    } = args;
    return <Flex column gap={Gap.m}>
        <BodyLarge>
          For the controlled version, the selected values are managed by the
          parent component. In this example, we display the currently selected
          values below the list.
        </BodyLarge>
        <MultiChoiceList {...restArgs} value={selected} onChange={values => handleChange(values)} />
        <Caption>{\`Currently selected values: \${selected.join(", ")}\`}</Caption>
      </Flex>;
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const handleChange = (values: string[]) => {
      alert(\`Selected values: \${values.join(", ")}\`);
    };
    const {
      value,
      ...restArgs
    } = args;
    return <Flex column gap={Gap.m}>
        <BodyLarge>
          For the uncontrolled version, the component manages its own state
          internally. In this example, we show an alert with the selected values
          whenever a change occurs.
        </BodyLarge>
        <MultiChoiceList {...restArgs} defaultValue={[]} onChange={values => handleChange(values)} />
        <Caption>
          In uncontrolled mode, the component manages its own state. The
          onChange callback is optional and can be used to listen for changes,
          but the parent component does not control the selected values.
        </Caption>
      </Flex>;
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleClick = () => {
      setErrorMessage(value.length < 2 ? "Please select at least two options" : "");
      if (value.length >= 2) {
        alert(\`Form submitted with values: \${value.join(", ")}\`);
      }
    };
    const {
      value: _,
      ...restArgs
    } = args;
    return <form onSubmit={e => e.preventDefault()}>
        <Flex column gap={Gap.m}>
          <MultiChoiceList {...restArgs} defaultValue={[]} onChange={values => {
          setErrorMessage("");
          setValue(values);
        }} errorMessage={errorMessage} />
          <Button type="submit" primary onClick={handleClick}>
            Submit
          </Button>
          <Caption>
            In this example, we demonstrate how to display an error message when
            the user tries to submit the form without selecting at least two
            options. The error message will appear below the list if the
            validation fails.
          </Caption>
        </Flex>
      </form>;
  }
}`,...v.parameters?.docs?.source}}};const K=["Controlled","Uncontrolled","WithError"];export{g as Controlled,b as Uncontrolled,v as WithError,K as __namedExportsOrder,J as default};
