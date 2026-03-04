import{j as e}from"./jsx-runtime-u17CrQMm.js";import{F as c,o as H,j as $,L as v,e as x,p as K,i as Z,h as N,B as W,q as G,n as B}from"./button-sKft9pFr.js";import{G as C,M as k,B as U,S as h,s as z,c as m,P as O,a as M}from"./shadows-CyjoGr4u.js";import{r as i}from"./iframe-Co_0DYZM.js";import{C as A,F as R}from"./country-codes-BL04zp7i.js";import{u as ee}from"./useDebounce-DjXobQll.js";import{M as ne}from"./menu-list-expanded-Cod8nDq_.js";import{S as d}from"./select-DfDUyGFp.js";import"./preload-helper-PPVm8Dsz.js";import"./menu-CZpM_CeP.js";import"./types-C3AmYhER.js";import"./index-AB_7CA6O.js";import"./index-MAKt5DRM.js";import"./useOnClickOutside-BSLQrXXa.js";import"./useMergedRefs-CBj2iGZS.js";import"./tag-DifDEUaX.js";const{useArgs:te}=__STORYBOOK_MODULE_PREVIEW_API__,Ve={title:"Components/Select",component:d,parameters:{layout:"centered",docs:{description:{component:'\n[`Jump to Playground`](#anchor--primary--components-select--docs)\n## How to use\n\n```tsx\nimport { select } from \'./index\'\n\n<Select />\n```\n\n---\n\n## API\n### `Select : ISelectProps<T>`\n  \n| Prop                                   | Type                                                                | Description                                                           |\n| -------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |\n| `className?`                         | `string`                                                          | A Class name to be added to the wrapper                               |\n| [`options?`](#option)                | `IOption<T>[]`                                                    | A list of values to be selected                                       |\n| `value?`                             | `T` \\| `T[]`                                                    | The current value selected                                            |\n| `placeholder?`                       | `string`                                                          | The placeholder to be displayed                                       |\n| `emptyText?`                         | `string`                                                          | The text to be displayed when there are no values                     |\n| `clearable?`                         | `boolean`                                                         | Allow the selected value to be cleared                                |\n| `searchable?`                        | `boolean`                                                         | Enable search in the select (always true if onInputChange is defined) |\n| `iconPosition?`                      | `left` \\| `right`                                               | The position where the icon should be rendered                        |\n| `disabled?`                          | `boolean`                                                         | Disable the component                                                 |\n| `multi?`                             | `boolean`                                                         | Enable multi selection                                                |\n| `invalid?`                           | `boolean`                                                         | Indicate there\'s an error in the component                            |\n| `multiLevel?`                        | `boolean`                                                         | Indicates that the options in the select can have children options    |\n| `rowHeight?`                         | `number`                                                          | The height of the fields, defaults to 38px                            |\n| `menuHeight?`                        | `number`                                                          | The height of the menu, defaults to 190px                             |\n| `menuPosition?`                      | `top` \\| `bottom`                                               | The position where the menu should be rendered                        |\n| `menuTitle?`                         | `string`                                                          | Menu title when using the [Customized Menu](#fancy-menu)              |\n| `label?`                             | `string`                                                          | The Label of the select                                               |\n| `labelPosition?`                     | `top` \\| `side`                                                 | The position where the label should be rendered                       |\n| [`menuComponent?`](#menuComponent)   | `JSX.Element<IMenuComponentProps<T>>`                             | Replaces the default List Menu component                              |\n| [`labelComponent?`](#labelComponent) | `JSX.Element<SelectLabelComponent>`                             | Replaces the default Label component                                  |\n| `maxLength?`                         | `number`                                                          | The maxLength of the select                                           |\n| `onChange?`                          | `(value: T[]` \\| `T` `undefined, option?: IOption<T>) => void` | Called when an option is changed                                  |\n| `onSearch?`                          | `(value: string) => void`                                         | Called when the search is triggers                                    |\n| `onOpen?`                            | `() => void`                                                      | Called when the menu opens                                            |\n| `onClose?`                           | `() => void`                                                      | Called when the menu closes                                           |\n| `onInputChange?`                     | `() => string`                                                    | Called when the user types something, returns the value typed         |\n\n\n<div id="option"></div>\n### `option: IOption`\nThe options property expects an array of objects of a type:\n```tsx\n{\n    label: string,\n    value: T | T[],\n}\n```\n\n| Prop              | Type           | Description                                     |\n| ----------------- | -------------- | ----------------------------------------------- |\n| value             | T              | The Option value                                |\n| label             | string         | The Option label to be displayed                |\n| disabled?         | boolean        | Whether the option is disabled (not implemented)|\n| [key: string]     | any            | key to the custom properties                    |\n\n\n<div id="menuComponent"></div>\n### `menuComponent: IMenuComponentProps`\nWhen using the custom menuComponent, the select exposes this properties.\n\n| Prop              | Type                                                        | Description                                    |\n| ----------------- | ------------------------------------------------------------| --------------------------------------------- |\n| `options`         | `IOption<T>[]`                                          | The list of values of the selected            |\n| `value`           | `T` \\| `T[]`                                         | The Selected Value                           |\n| `labelComponent`  | `JSX.Element<SelectLabelComponent>`                   | The Select Label Component                    |\n| `emptyText`       | `string`                                                | Text displayed when there are no values       |\n| `multi`           | `boolean`                                               | Indicate multi selection is active            |\n| `rowHeight`       | `number`                                                | The height of the fields                      |\n| `menuHeight`      | `number`                                                | The height of the menu                        |\n| `menuPosition`    | `top` \\| `bottom`                                    | The position of the menu                     |\n| `invalid`         | `boolean`                                               | Indicate an error in the component            |\n| `selectedIndex?`  | `number`                                                | The index of the Selected Item                |\n| `open`            | `boolean`                                               | Indicates if the menu is open                 |\n| `search?`         | `string`                                                | The string typed in the search field          |\n| `labelPosition?`  | `string`                                                | The position where the label                  |\n| `label?`          | `string`                                                | The Label of the select                       |\n| `onSelect`        |`(value: T extends any[] ? T[] : T, option?: T) => void` | Triggers when the selected option changes     |\n\n<div id="labelComponent"></div>\n### `labelComponent: LabelComponentProps extends IOption`\n| Prop              | Type            | Description                                                   |\n| ----------------- | --------------- | ------------------------------------------------------------- |\n| `active`        | `boolean`     | indicates the option is active                                |\n| `type`          | `value-single` \\| `value-multi` \\| `option` | used to style accordingly |\n| `label`         | `string`     | The label of the option                                        |\n| `disabled`      | `boolean`    | Indicates if the option is disabled                            |\n| `icon`          | `React.ReactNode` | The icon of the option                                    |\n| [key: string]     | any            | key to the custom properties                                   |\n\n\n```\n        '}}},tags:["autodocs"],args:{options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}],value:[],label:"Select an option",onChange:n=>{console.log("Selected value:",n)},multi:!1,searchable:!1,clearable:!1,disabled:!1,invalid:!1,menuPosition:"bottom",labelPosition:"top",iconPosition:"right",placeholder:"Select something...",emptyText:"Nothing found here..."},argTypes:{onChange:{action:"changed",table:{disable:!0}},menuPosition:{control:"radio",options:["top","bottom"]},labelPosition:{control:"radio",options:["top","side"]},iconPosition:{control:"radio",options:["left","right"]}}},y={render:n=>{const[{value:a,multi:s},u]=te();i.useEffect(()=>{s&&!Array.isArray(a)&&u({value:a?[a]:[]}),!s&&Array.isArray(a)&&u({value:a[0]??void 0})},[s]);const r=o=>{u({value:o})};return e.jsx(c,{style:{minHeight:"250px",alignItems:"center"},children:e.jsx(d,{...n,value:a,multi:s,onChange:r,style:{width:"250px"}})})}},f={render:()=>{const[n,a]=i.useState(),s=r=>{a(r)},u=r=>e.jsxs(c,{gap:C.m,children:[e.jsx(R,{medium:!0,code:r.value.id,style:{right:"0"}}),e.jsx(W,{default:!0,style:{padding:"0"},children:r.label})]});return e.jsx(c,{style:{width:"250px"},children:e.jsx(d,{options:oe,onChange:s,labelComponent:u,value:n,label:"Select a Country"})})},parameters:{docs:{disable:!0}}},T={render:()=>{const[n,a]=i.useState(),s=Object.keys(A).map(o=>({label:A[o],value:{code:o,value:A[o]}})),u=o=>{a(o)},r=o=>e.jsxs("div",{style:{display:"flex",gap:"6px",pointerEvents:"none"},children:[e.jsx(R,{medium:!0,code:o.value.code}),e.jsx(W,{default:!0,children:o.children})]});return e.jsxs(c,{column:!0,gap:C.l,style:{width:"350px"},children:[e.jsx(d,{placeholder:"Please select...",options:s,onChange:u,labelComponent:r,value:n,searchable:!0,label:"Select a Country"}),e.jsxs(c,{column:!0,gap:C.m,children:[$(n?.code)?e.jsx(v,{children:"Select Something..."}):e.jsxs(v,{children:["You Selected: ",JSON.stringify(n)]}),K(n?.code,e.jsxs(c,{gap:C.m,style:{alignItems:"center"},children:[e.jsx(v,{style:{margin:k.xxs},children:"Flag: "}),e.jsx(R,{large:!0,code:n?.code})]}))]})]})},parameters:{docs:{disable:!0}}},L={render:()=>{const[n,a]=i.useState(),s=u=>{a(u)};return e.jsxs(c,{column:!0,gap:C.m,style:{width:"350px"},children:[e.jsx(d,{placeholder:"Please select...",options:ae,onChange:s,value:n,multiLevel:!0,label:"Select a Location"}),e.jsx("span",{children:Z(n)?e.jsxs(v,{children:["You Selected: ",e.jsx("code",{children:JSON.stringify(n)})]}):e.jsx(v,{children:"Select Something..."})})]})},parameters:{docs:{disable:!0}}},V={render:()=>{const[n,a]=i.useState(),[s,u]=i.useState(),r=o=>{a(o)};return e.jsxs(c,{column:!0,children:[e.jsxs(c,{column:!0,gap:C.s,style:{width:"350px"},children:[e.jsx(H,{children:"No Search, but you can type"}),e.jsx(d,{value:n,onChange:r,onSearch:o=>u(o),options:E,searchable:!0,filterBehavior:()=>!0}),e.jsxs("div",{children:["Searching: ",s]})]}),e.jsxs(c,{column:!0,gap:C.l,style:{width:"350px",marginTop:"40px"},children:[e.jsx(H,{children:"Case Sensitive Search"}),e.jsx(d,{value:n,onChange:r,options:E,searchable:!0,menuPosition:"top",filterBehavior:(o,p)=>p.label.includes(o)})]})]})},parameters:{docs:{disable:!0}}},j={render:()=>{const[n,a]=i.useState(),[s,u]=i.useState([]),r=i.useRef(!1);i.useEffect(()=>{if(!r.current){r.current=!0;return}l()},[n]);const o=t=>{a(t)},p=()=>{l()},l=()=>{const t=[];$(n)&&t.push({message:"This field is required"}),u(t)};return e.jsx(c,{style:{width:350},children:e.jsx(d,{value:n,onChange:o,onClose:p,options:E,clearable:!0,invalid:s.length>0,errors:s})})},parameters:{docs:{disable:!0}}},I={render:()=>{const[n,a]=i.useState(),[s,u]=i.useState(""),[r,o]=i.useState([]),[p,l]=i.useState("Type something to search"),t=ee(s.trim(),500);i.useEffect(()=>{N(t)||(l("Searching..."),fetch("https://dummyjson.com/users/search?q="+t).then(b=>b.json()).then(Q))},[t]);const g=b=>{o(r.filter(S=>S.value===b)),a(b)},Q=b=>{l(N(b.users)?"Nothing found":"Type something to search"),o(b.users.map(S=>({value:S.id,label:S.firstName})))};return e.jsx(c,{style:{width:350},children:e.jsx(d,{placeholder:"Please select...",emptyText:p,options:r,onChange:g,value:n,onInputChange:u,label:"Select an User",searchable:!0,maxLength:10})})},parameters:{docs:{disable:!0}}},w={render:()=>{const[n,a]=i.useState(),[s,u]=i.useState([]),r=(l,t)=>{alert(`You choose ${t.label}`),l.onSelect(t.value)},o=l=>{const t=[];a(l),l!=="Brasil"&&t.push({message:"Wrong one =("}),u(t)},p=l=>e.jsx(J,{children:G(l.options).map((t,g)=>e.jsxs(Y,{active:l.selectedIndex===g,onClick:()=>r(l,t),children:[e.jsx(X,{children:t.icon}),e.jsx(D,{children:t.label}),e.jsx(_,{subdued:!0,children:t.helperText})]},g))});return e.jsx(c,{style:{width:350},children:e.jsx(d,{invalid:s.length>0,errors:s,value:n,onChange:o,options:q,menuComponent:p,label:"Curiosities",labelPosition:"top"})})},parameters:{docs:{disable:!0}}},F={render:()=>{const[n,a]=i.useState(),[s,u]=i.useState([]),r=(l,t)=>{alert(`You choose ${t.label}`),l.onSelect(t.value)},o=l=>{const t=[];a(l),l!=="Brasil"&&t.push({message:"Wrong one =("}),u(t)},p=l=>e.jsx(J,{children:G(l.options).map((t,g)=>e.jsxs(Y,{active:l.selectedIndex===g,onClick:()=>r(l,t),children:[e.jsx(X,{children:t.icon}),e.jsx(D,{children:t.label}),e.jsx(_,{subdued:!0,children:t.helperText})]},g))});return e.jsxs(c,{column:!0,style:{width:350},children:[e.jsx(v,{children:"The Southernmost Country?"}),e.jsx(d,{invalid:s.length>0,errors:s,value:n,onChange:o,options:q,menuComponent:p,labelPosition:"top",customIcon:e.jsx(x.GlobeRegular,{})})]})},parameters:{docs:{disable:!0}}},P={render:()=>{const[n,a]=i.useState();return e.jsx(c,{column:!0,style:{width:350},children:e.jsx(d,{value:n,onChange:a,options:E,placeholder:"Select Something",menuHeight:250,menuComponent:ne,label:"Cool Label"})})},parameters:{docs:{disable:!0}}},E=[{label:"Yu Yu Hakusho",value:"01"},{label:"Neon Genesis Evangelion",value:"02"},{label:"Dragon Ball Z",value:"03"},{label:"Legend of Heavenly Sphere Shurato",value:"04"},{label:"Ronin Warriors",value:"05"},{label:"Knights of the Zodiac",value:"06"},{label:"Rurouni Kenshin",value:"07"},{label:"Avatar the Last Airbender",value:"08"}],oe=[{value:{id:"BR",value:"Brasil"},label:"Brasil",code:"BR"},{value:{id:"CA",value:"Canada"},label:"Canada",code:"CA"},{value:{id:"MX",value:"Mexico"},label:"Mexico",code:"MX"},{value:{id:"US",value:"United States"},label:"United States",code:"US"}],ae=[{value:{id:"BR",value:"Brasil"},label:"Brasil",code:"BR",options:[{value:{id:"MG",value:"Minas Gerais"},label:"Minas Gerais",code:"MG"},{value:{id:"SP",value:"São Paulo"},label:"São Paulo",code:"SP"},{value:{id:"RJ",value:"Rio de Janeiro"},label:"Rio de Janeiro",code:"RJ"},{value:{id:"ES",value:"Espírito Santo"},label:"Espírito Santo",code:"ES"},{value:{id:"BA",value:"Bahia"},label:"Bahia",code:"BA"}]},{value:{id:"CA",value:"Canada"},label:"Canada",code:"CA",options:[{value:{id:"AB",value:"Alberta"},label:"Alberta",code:"AB"},{value:{id:"BC",value:"British Columbia"},label:"British Columbia",code:"BC"},{value:{id:"ON",value:"Ontario"},label:"Ontario",code:"ON"},{value:{id:"QC",value:"Quebec"},label:"Quebec",code:"QC"}]},{value:{id:"IE",value:"Ireland"},label:"Ireland",code:"IE"},{value:{id:"MX",value:"Mexico"},label:"Mexico",code:"MX",options:[{value:{id:"AG",value:"Aguascalientes"},label:"Aguascalientes",code:"AG"},{value:{id:"BC",value:"Baja California"},label:"Baja California",code:"BC"},{value:{id:"BS",value:"Baja California Sur"},label:"Baja California Sur",code:"BS"}]},{value:{id:"PT",value:"Portugal"},label:"Portugal",code:"PT"},{value:{id:"US",value:"United States"},label:"United States",code:"US"}],se=m(x.StarSolid)`
  svg {
    path {
      fill: ${M.Critical};
    }
  }
`,le=m(x.MugTea)`
  svg {
    path {
      fill: ${M.Success};
    }
  }
`,re=m(x.FireBurner)`
  svg {
    path {
      fill: ${M.Highlight};
    }
  }
`,ie=m(x.PersonPraying)`
  svg {
    path {
      fill: ${M.Warning};
    }
  }
`,J=m.div`
  border: 1px solid ${U.Default.Subdued};
  background-color: ${h.Default.Default};
  position: absolute;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${h.Neutral.Default};
    min-height: 50px;
  }
  ${z};
`,Y=m.div`
  border: none;
  text-align: left;
  border: 1px solid ${U.Default.Subdued};
  margin: ${k.xxxs};
  border-radius: 6px;
  background-color: ${n=>B(n.active)?h.Selected.Default:h.Default.Default};

  &:hover {
    background-color: ${h.Default.Hover};
  }

  &:hover {
    background-color: ${n=>B(n.active)?h.Selected.Hover:h.Default.Hover};
  }

  &:active {
    background-color: ${n=>B(n.active)?h.Selected.Pressed:h.Default.Pressed};
  }
`,D=m(v)`
  cursor: pointer;
  padding: ${O.xxs} ${O.xs};
  margin-left: ${k.l};
`,_=m(D)`
  padding-top: ${O.none};
`,X=m.div`
  position: relative;
  top: 4px;
  left: 6px;
  & i {
    position: absolute;
  }
`,q=[{value:"Brasil",label:"Brasil",icon:e.jsx(le,{}),helperText:"Largest in the South America"},{value:"Canada",label:"Canada",icon:e.jsx(re,{}),helperText:"Very very cold"},{value:"Mexico",label:"Mexico",icon:e.jsx(ie,{}),helperText:"Really hot food!"},{value:"United States",label:"United States",icon:e.jsx(se,{}),helperText:"Land of the Free"}];y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [{
      value,
      multi
    }, updateArgs] = useArgs();
    useEffect(() => {
      if (multi && !Array.isArray(value)) {
        updateArgs({
          value: value ? [value] : []
        });
      }
      if (!multi && Array.isArray(value)) {
        updateArgs({
          value: value[0] ?? undefined
        });
      }
    }, [multi]);
    const handleChange = (newValue: string) => {
      updateArgs({
        value: newValue
      });
    };
    return <Flex style={{
      minHeight: "250px",
      alignItems: "center"
    }}>
        <Select {...args} value={value} multi={multi} onChange={handleChange} style={{
        width: "250px"
      }} />
      </Flex>;
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<IValue>();
    const onChange = (selectedValue: IValue) => {
      setValue(selectedValue);
    };
    const labelComponent: SelectLabelComponent<IValue> = (prop: LabelComponentProps<IValue>) => {
      return <Flex gap={Gap.m}>
          <Flag medium code={prop.value.id as CountryCodes} style={{
          right: "0"
        }} />
          <Body default style={{
          padding: "0"
        }}>
            {prop.label}
          </Body>
        </Flex>;
    };
    return <Flex style={{
      width: "250px"
    }}>
        <Select options={options2} onChange={onChange} labelComponent={labelComponent} value={value} label="Select a Country" />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...f.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    type ICountryValue = {
      code: string;
      value: string;
    };
    const [value, setValue] = useState<ICountryValue>();
    const countryList: IOption<ICountryValue>[] = (Object.keys(CountryList) as CountryCodes[]).map(code => ({
      label: CountryList[code],
      value: {
        code: code,
        value: CountryList[code]
      }
    }));
    const onChange = (selectedValue: ICountryValue) => {
      setValue(selectedValue);
    };
    const labelComponent: SelectLabelComponent<ICountryValue> = (props: LabelComponentProps<ICountryValue>) => <div style={{
      display: "flex",
      gap: "6px",
      pointerEvents: "none"
    }}>
        <Flag medium code={props["value"]["code"] as CountryCodes} />
        <Body default>{props["children"]}</Body>
      </div>;
    return <Flex column gap={Gap.l} style={{
      width: "350px"
    }}>
        <Select placeholder="Please select..." options={countryList} onChange={onChange} labelComponent={labelComponent} value={value} searchable label="Select a Country" />
        <Flex column gap={Gap.m}>
          {isNil(value?.code) ? <Label>Select Something...</Label> : <Label>You Selected: {JSON.stringify(value)}</Label>}
          {maybeRender(value?.code, <Flex gap={Gap.m} style={{
          alignItems: "center"
        }}>
              <Label style={{
            margin: Margin.xxs
          }}>Flag: </Label>
              <Flag large code={value?.code as CountryCodes} />
            </Flex>)}
        </Flex>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...T.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<IValue>();
    const onChange = (selectedValue: IValue) => {
      setValue(selectedValue);
    };
    return <Flex column gap={Gap.m} style={{
      width: "350px"
    }}>
        <Select placeholder="Please select..." options={options4} onChange={onChange} value={value} multiLevel label="Select a Location" />
        <span>
          {isDefined(value) ? <Label>
              You Selected: <code>{JSON.stringify(value)}</code>
            </Label> : <Label>Select Something...</Label>}
        </span>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...L.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>();
    const [searchString, setSearchString] = useState<string>();
    const onChange = (selectedValue: string) => {
      setValue(selectedValue);
    };
    return <Flex column>
        <Flex column gap={Gap.s} style={{
        width: "350px"
      }}>
          <Heading4>No Search, but you can type</Heading4>
          <Select value={value} onChange={onChange} onSearch={search => setSearchString(search)} options={options1} searchable filterBehavior={() => true} />
          <div>Searching: {searchString}</div>
        </Flex>
        <Flex column gap={Gap.l} style={{
        width: "350px",
        marginTop: "40px"
      }}>
          <Heading4>Case Sensitive Search</Heading4>
          <Select value={value} onChange={onChange} options={options1} searchable menuPosition="top" filterBehavior={(searchValue: string, option: IOption<string>) => option.label.includes(searchValue)} />
        </Flex>
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...V.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>();
    const [errorsList, setErrorsList] = useState<{
      message: string;
    }[]>([]);
    const isMounted = useRef(false);
    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      checkForErros();
    }, [value]);

    /*
      Use onChange and onClose
    */
    const onChange = (selectedValue: string) => {
      setValue(selectedValue);
    };
    const onClose = () => {
      checkForErros();
    };
    const checkForErros = () => {
      const errors = [];
      if (isNil(value)) {
        errors.push({
          message: "This field is required"
        });
      }
      setErrorsList(errors);
    };
    return <Flex style={{
      width: 350
    }}>
        <Select value={value} onChange={onChange} onClose={onClose} options={options1} clearable invalid={errorsList.length > 0} errors={errorsList} />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...j.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<IValue>();
    const [searchValue, setSearchValue] = useState<string>("");
    const [selOptions, setSelOptions] = useState<IOption<IValue>[]>([]);
    const [emptyText, setEmptyText] = useState<string>("Type something to search");
    const debouncedValue = useDebounce(searchValue.trim(), 500);
    useEffect(() => {
      if (isEmpty(debouncedValue)) {
        return;
      }
      setEmptyText("Searching...");
      fetch("https://dummyjson.com/users/search?q=" + debouncedValue).then(res => res.json()).then(handleResults);
    }, [debouncedValue]);
    const onChange = (selectedValue: IValue) => {
      // Reset the select list to have only the selected value, so we don't have a list when we click again.
      setSelOptions(selOptions.filter(option => option.value === selectedValue));
      setValue(selectedValue);
    };
    const handleResults = (results: {
      users: {
        id: any;
        firstName: any;
      }[];
    }) => {
      setEmptyText(isEmpty(results.users) ? "Nothing found" : "Type something to search");
      setSelOptions(results.users.map((user: {
        id: any;
        firstName: any;
      }): IOption<IValue> => {
        return {
          value: user.id,
          label: user.firstName
        };
      }));
    };
    return <Flex style={{
      width: 350
    }}>
        <Select placeholder="Please select..." emptyText={emptyText} options={selOptions} onChange={onChange} value={value} onInputChange={setSearchValue} label="Select an User" searchable maxLength={10} />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...I.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>();
    const [errors, setErrors] = useState<{
      message: string;
    }[]>([]);
    const handleClick = (props: MenuComponentProps<string>, option: IOption<string>) => {
      alert(\`You choose \${option.label}\`);
      props.onSelect(option.value);
    };
    const handleChange = (selected: string) => {
      const newErros = [];
      setValue(selected);
      if (selected !== "Brasil") {
        newErros.push({
          message: "Wrong one =("
        });
      }
      setErrors(newErros);
    };
    const menuComponent: SelectMenuComponent<string> = (props: MenuComponentProps<string>) => <CustomListFrame>
        {safeArray(props.options).map((option, i) => <CustomRow active={props.selectedIndex === i} key={i} onClick={() => handleClick(props, option)}>
            <IconWraper>{option["icon"]}</IconWraper>
            <LabelWrapper>{option.label}</LabelWrapper>
            <SupportText subdued>{option["helperText"]}</SupportText>
          </CustomRow>)}
      </CustomListFrame>;
    return <Flex style={{
      width: 350
    }}>
        <Select invalid={errors.length > 0} errors={errors} value={value} onChange={handleChange} options={options3} menuComponent={menuComponent} label="Curiosities" labelPosition="top" />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...w.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>();
    const [errors, setErrors] = useState<{
      message: string;
    }[]>([]);
    const handleClick = (props: MenuComponentProps<string>, option: IOption<string>) => {
      alert(\`You choose \${option.label}\`);
      props.onSelect(option.value);
    };
    const handleChange = (selected: string) => {
      const newErros = [];
      setValue(selected);
      if (selected !== "Brasil") {
        newErros.push({
          message: "Wrong one =("
        });
      }
      setErrors(newErros);
    };
    const menuComponent: SelectMenuComponent<string> = (props: MenuComponentProps<string>) => <CustomListFrame>
        {safeArray(props.options).map((option, i) => <CustomRow active={props.selectedIndex === i} key={i} onClick={() => handleClick(props, option)}>
            <IconWraper>{option["icon"]}</IconWraper>
            <LabelWrapper>{option.label}</LabelWrapper>
            <SupportText subdued>{option["helperText"]}</SupportText>
          </CustomRow>)}
      </CustomListFrame>;
    return <Flex column style={{
      width: 350
    }}>
        <Label>The Southernmost Country?</Label>
        <Select invalid={errors.length > 0} errors={errors} value={value} onChange={handleChange} options={options3} menuComponent={menuComponent} labelPosition="top" customIcon={<IconMinor.GlobeRegular />} />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...F.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>();
    return <Flex column style={{
      width: 350
    }}>
        <Select value={value} onChange={setValue} options={options1} placeholder="Select Something" menuHeight={250} menuComponent={MenuListExpanded} label="Cool Label" />
      </Flex>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...P.parameters?.docs?.source}}};const je=["Docs","CustomLabel","HugeListWithCustomLabel","MultiLevel","CustomFilter","CustomValidation","RemoteData","CustomMenu","FancyMenuCustomIcon","FancyMenu"];export{V as CustomFilter,f as CustomLabel,w as CustomMenu,j as CustomValidation,y as Docs,P as FancyMenu,F as FancyMenuCustomIcon,T as HugeListWithCustomLabel,L as MultiLevel,I as RemoteData,je as __namedExportsOrder,Ve as default};
