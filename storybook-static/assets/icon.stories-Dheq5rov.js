import{j as n}from"./jsx-runtime-u17CrQMm.js";import{f as s,e,H as b,B as y,a as i,T as M}from"./button-sKft9pFr.js";import{I as x}from"./input-field-Dp6wjjTc.js";import{M as j,P as l,B as F,S as p,F as v,c as a,I as C}from"./shadows-CyjoGr4u.js";import{r as O}from"./iframe-Co_0DYZM.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";import"./preload-helper-PPVm8Dsz.js";const B=a.div`
  background: ${p.Default};
  border-radius: 6px;
  width: 100%;
`,D=a.div`
  width: 25%;
  flex-direction: row;
  display: inline-block;
  zoom: 1;
  background-color: ${p.Default};
`,P=a.div`
  ${M.Body}
  display: flex;
  padding: ${l.xxs};
  flex: 1;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`,w=a.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${l.xs};
  gap: ${j.s};
  width: 100%;
  background: ${p.Default.Hover};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  &:hover {
    span {
      opacity: 1;
      z-index: 1;
    }
  }
`,$=a.span`
  opacity: 0;
  transition: opacity 1s;
  width: 120px;
  background-color: ${C.Subtle.Disabled};
  color: ${p.Default.Default};
  text-align: center;
  padding: ${l.xxs} ${l.none};
  border-radius: 6px;
  position: absolute;
  z-index: -1;
  bottom: 105%;
  left: 50%;
  margin-left: -60px;
  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${C.Subtle.Disabled} transparent transparent
      transparent;
  }
`,f=a.div`
  display: flex;
  gap: 15px;
  margin: ${j.l} 0;
`,T=a.select`
  padding: ${l.xs} ${l.m};
  border: 1px solid ${F.Default.Default};
  border-radius: 6px;
  gap: 8px;
  background: ${p.Default.Default};
  width: 150px;
  font-family: "Inter";
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  margin: ${j.m};

  &:focus {
    outline: 1px solid ${v.Default};
  }

  &:focus-visible {
    border: 1px solid ${v.Default};
  }
`,m=t=>Object.keys(t)[0],k=t=>Object.values(t)[0],S=t=>Object.entries(t).map(([r,c])=>({[r]:c})),z={title:"Foundations/Icon",parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},g={render:()=>{const t=S(s),r=S(e),c=o=>{navigator.clipboard?.writeText?.(o).catch(()=>{})},u=o=>{const d=k(o);return n.jsx(d,{})};return n.jsxs(n.Fragment,{children:[n.jsx(b,{children:"Large Icons"}),n.jsx(B,{children:t.map((o,d)=>n.jsx(D,{children:n.jsx(P,{children:n.jsxs(w,{onClick:()=>c(`<Icon.${m(o)} />`),children:[n.jsx($,{children:"Copy me!"}),u(o),n.jsx(y,{children:m(o)})]})})},d))}),n.jsx(b,{style:{marginTop:j.xl},children:"Minor Icons"}),n.jsx(B,{children:r.map((o,d)=>n.jsx(D,{children:n.jsx(P,{children:n.jsxs(w,{onClick:()=>c(`<Icon.${m(o)} />`),children:[n.jsx($,{children:"Copy me!"}),u(o),n.jsx(y,{children:m(o)})]})})},d))})]})}},I={render:()=>n.jsxs("div",{children:[n.jsxs(f,{children:[n.jsx(s.BuildingColumns,{}),n.jsx(s.BullseyeArrow,{})]}),n.jsxs(f,{children:[n.jsx(i,{IconPrefix:e.CircleInfo,children:"Basic"}),n.jsx(i,{primary:!0,IconPrefix:e.FolderOpen,children:"Primary"}),n.jsx(i,{destructive:!0,IconPrefix:e.School,children:"Destructive"}),n.jsx(i,{destructive:!0,primary:!0,IconPrefix:e.PlaneArrival,children:"Destructive Primary"}),n.jsx(i,{outline:!0,IconPrefix:e.PlaneDeparture,children:"Outline"}),n.jsx(i,{plain:!0,IconPrefix:e.BadgeCheck,children:"Plain"}),n.jsx(i,{plain:!0,subtle:!0,IconPrefix:e.Fire,children:"Plain Subtle"})]}),n.jsx(x.Label,{label:"I can have Icons too!",htmlFor:"input_example",children:n.jsxs(x,{name:"input_example",children:[n.jsx(x.Icon,{children:n.jsx(e.CreditCard,{title:"Icons render before the input"})}),n.jsx(x.Controls,{children:n.jsx(e.CreditCard,{title:"Controls render after the input"})})]})})]}),parameters:{docs:{disable:!0}}},h={render:function(){const[r,c]=O.useState("gray");return n.jsxs("div",{style:{display:"flex",gap:"8px"},children:[n.jsxs(T,{onChange:u=>c(u.target.value),children:[n.jsx("option",{value:"gray",children:"Gray"}),n.jsx("option",{value:"red",children:"Red"}),n.jsx("option",{value:"blue",children:"Blue"}),n.jsx("option",{value:"orange",children:"Orange"}),n.jsx("option",{value:"green",children:"Green"}),n.jsx("option",{value:"magenta",children:"Magenta"})]}),n.jsxs(f,{children:[n.jsx(s.BuildingColumns,{color:r}),n.jsx(s.BullseyeArrow,{color:r}),n.jsx(e.Youtube,{color:r}),n.jsx(e.Twitter,{color:r}),n.jsx(s.TriangleExclamation,{color:r})]})]})},parameters:{docs:{disable:!0}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const icons = getIconList(Icon);
    const minorIcons = getIconList(IconMinor);
    const copy = (text: string) => {
      navigator.clipboard?.writeText?.(text).catch(() => {});
    };
    const renderIcon = (iconObj: Record<string, unknown>) => {
      const Comp = getObjectValue(iconObj) as React.ElementType;
      return <Comp />;
    };
    return <>
        <Heading3>Large Icons</Heading3>
        <Table>
          {icons.map((icon, index) => <Row key={index}>
              <Column>
                <Wrapper onClick={() => copy(\`<Icon.\${getObjectKey(icon)} />\`)}>
                  <Span>Copy me!</Span>
                  {renderIcon(icon)}
                  <Body>{getObjectKey(icon)}</Body>
                </Wrapper>
              </Column>
            </Row>)}
        </Table>
        <Heading3 style={{
        marginTop: Margin.xl
      }}>Minor Icons</Heading3>
        <Table>
          {minorIcons.map((icon, index) => <Row key={index}>
              <Column>
                <Wrapper onClick={() => copy(\`<Icon.\${getObjectKey(icon)} />\`)}>
                  <Span>Copy me!</Span>
                  {renderIcon(icon)}
                  <Body>{getObjectKey(icon)}</Body>
                </Wrapper>
              </Column>
            </Row>)}
        </Table>
      </>;
  }
}`,...g.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <DivWrapper>
        <Icon.BuildingColumns />
        <Icon.BullseyeArrow />
      </DivWrapper>
      <DivWrapper>
        <Button IconPrefix={IconMinor.CircleInfo}>Basic</Button>
        <Button primary IconPrefix={IconMinor.FolderOpen}>
          Primary
        </Button>
        <Button destructive IconPrefix={IconMinor.School}>
          Destructive
        </Button>
        <Button destructive primary IconPrefix={IconMinor.PlaneArrival}>
          Destructive Primary
        </Button>
        <Button outline IconPrefix={IconMinor.PlaneDeparture}>
          Outline
        </Button>
        <Button plain IconPrefix={IconMinor.BadgeCheck}>
          Plain
        </Button>
        <Button plain subtle IconPrefix={IconMinor.Fire}>
          Plain Subtle
        </Button>
      </DivWrapper>
      <InputField.Label label="I can have Icons too!" htmlFor="input_example">
        <InputField name="input_example">
          <InputField.Icon>
            <IconMinor.CreditCard title="Icons render before the input" />
          </InputField.Icon>
          <InputField.Controls>
            <IconMinor.CreditCard title="Controls render after the input" />
          </InputField.Controls>
        </InputField>
      </InputField.Label>
    </div>,
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...I.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [color, setColor] = useState("gray");
    return <div style={{
      display: "flex",
      gap: "8px"
    }}>
        <Select onChange={e => setColor(e.target.value)}>
          <option value="gray">Gray</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
          <option value="magenta">Magenta</option>
        </Select>
        <DivWrapper>
          <Icon.BuildingColumns color={color} />
          <Icon.BullseyeArrow color={color} />
          <IconMinor.Youtube color={color} />
          <IconMinor.Twitter color={color} />
          <Icon.TriangleExclamation color={color} />
        </DivWrapper>
      </div>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...h.parameters?.docs?.source}}};const G=["Docs","IconButtonCodeExample","ChangeIconColorExample"];export{h as ChangeIconColorExample,g as Docs,I as IconButtonCodeExample,G as __namedExportsOrder,z as default};
