import{j as e}from"./jsx-runtime-u17CrQMm.js";import{g as L,i as B,t as S,C as n,I as A,S as H,b as t,B as b,a,H as P}from"./button-sKft9pFr.js";import{l as v}from"./left-right-layout-UOxJcGv9.js";import{I as Y}from"./input-field-Dp6wjjTc.js";import{c as T,M as k}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";const{Layout:l}=v();class E extends H{}class I extends H{}const o=r=>{const{children:s,heading:c,helpText:h,className:R,...F}=r,W=L(E,s),D=L(I,s),j=B(c)?`left-right-card-heading-${S(c)}`:void 0,w=B(h)?`left-right-card-help-${S(h)}`:void 0;return e.jsxs(n,{className:R,...F,children:[e.jsx(n.Section,{"aria-labelledby":j,children:e.jsxs(l,{children:[e.jsxs(l.Left,{children:[e.jsx(A,{is:c,children:e.jsx(l.HeadingText,{id:j,children:c})}),e.jsx(A,{is:h,children:e.jsx(l.HelpText,{id:w,children:h})})]}),e.jsx(l.Right,{children:e.jsx("div",{"aria-describedby":w,children:W})})]})}),e.jsx(n.Controls,{children:D})]})};o.Right=E;o.Controls=I;o.__docgenInfo={description:"",methods:[],displayName:"LeftRightCard"};const d=T(Y)`
  margin-bottom: ${k.xxs};
`,O={title:"Components/Card",component:n,parameters:{layout:"centered",docs:{description:{component:`
# Card

Cards are used to group similar things together.

---

## How to use

\`\`\`tsx
import { Card } from './index'

<Card heading='Heading'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Card>
\`\`\`

---

## API

### Card

Extends HTMLAttributes<HTMLDivElement>

| Prop      | Type       | Description                |
| --------- | ---------- | -------------------------- |
|  heading  |  boolean?  | Adds a heading to the card |

### Card.Section

Extends HTMLAttributes<HTMLDivElement>

| Prop      | Type       | Description                     |
| --------- | ---------- | ------------------------------- |
|  heading  |  boolean?  | Adds a heading to the section   |

### Slots

| Slot            | Description                                                 |
| --------------- | ----------------------------------------------------------- |
|  Controls       | Adds controls to the bottom of the card                     |
|  HeadingAction  | Adds UI directly across from the card or sections's heading |
|  AlertBanner    | Adds an alert banner above the heading                      |
        `}}},tags:["autodocs"],args:{},argTypes:{}},i=T.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`,m={args:{heading:"Card Heading",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},parameters:{previewTabs:{canvas:{hidden:!0}}},render:({...r})=>e.jsxs(i,{children:[e.jsx(t,{children:"A simple card with a heading and content."}),e.jsx(n,{...r})]})},u={args:{heading:"Card Sections",children:e.jsxs(e.Fragment,{children:[e.jsx(n.Section,{heading:"Subheading 1",children:"This is a section."}),e.jsx(n.Section,{heading:"Subheading 2",children:"This is another section."})]})},parameters:{docs:{disable:!0}},render:({...r})=>e.jsxs(i,{children:[e.jsx(t,{children:"You can divide a card`s body up into sections."}),e.jsx(n,{...r})]})},g={render:()=>{const r=()=>alert("Cancel"),s=()=>alert("Confirm");return e.jsxs(i,{children:[e.jsx(t,{children:"Primary controls go on the bottom of the card."}),e.jsx(b,{children:"Controls is a slot, so its children will always render in the same place regardless of where you use it."}),e.jsxs(n,{heading:"Card with Controls",children:[e.jsxs(n.Controls,{children:[e.jsx(a,{onClick:r,children:"Cancel"}),e.jsx(a,{primary:!0,onClick:s,children:"Confirm"})]}),"Notice that the controls render below this text, even though they are above this text in the JSX. That`s because Controls is a slot, it is only telling Card what we want to render, not where we want to render it."]})]})},parameters:{docs:{disable:!0}}},p={args:{heading:"Card Heading Action",children:e.jsx(e.Fragment,{children:e.jsx(n.HeadingAction,{children:e.jsx(a,{children:"Deactivate"})})})},parameters:{docs:{disable:!0}}},C={args:{heading:"Card Heading Action",children:e.jsxs(e.Fragment,{children:[e.jsxs(n.Section,{heading:"Subheading 1",children:["This is a section.",e.jsx(n.HeadingAction,{children:e.jsx(a,{children:"Action"})})]}),e.jsxs(n.Section,{heading:"Subheading 2",children:["This is another section.",e.jsx(n.HeadingAction,{children:e.jsx(a,{children:"Action"})})]})]})},parameters:{docs:{disable:!0}},render:({...r})=>e.jsxs(i,{children:[e.jsx(t,{children:"Any heading in a Card can have an action."}),e.jsx(b,{children:"HeadingAction is a slot, so its children will always render in the same place regardless of where you use it."}),e.jsx(n,{...r})]})},x={args:{heading:"Card Heading",children:e.jsxs(e.Fragment,{children:["Disaster can strike at any moment.",e.jsx(n.AlertBanner,{info:!0,children:"Seriously though, do not try this at home..."})]})},parameters:{docs:{disable:!0}},render:({...r})=>e.jsxs(i,{children:[e.jsx(t,{children:"You can grab the user`s attention with a banner."}),e.jsx(b,{children:"AlertBanner is a slot, so its children will always render in the same place regardless of where you use it."}),e.jsx(n,{...r})]})},y={render:()=>{const{Layout:r}=v();return e.jsxs(i,{children:[e.jsx(t,{children:"You can add a layout to a card. In this case we`ve added a 1:2 ratio left/right layout."}),e.jsxs(n,{heading:"Layout Example",children:[e.jsxs(r,{children:[e.jsxs(r.Left,{children:[e.jsx(P,{children:"Personal Information"}),e.jsx(b,{subdued:!0,children:"This information will be seen by whoever is viewing this card."})]}),e.jsx(r.Right,{children:e.jsxs("form",{id:"my-form",onSubmit:s=>s.preventDefault(),children:[e.jsx(d,{label:"First name"}),e.jsx(d,{label:"Last name"}),e.jsx(d,{type:"email",required:!0,label:"Email"})]})})]}),e.jsxs(n.Controls,{children:[e.jsx(a,{children:"Cancel"}),e.jsx(a,{form:"my-form",type:"submit",primary:!0,children:"Confirm"})]})]})]})},parameters:{docs:{disable:!0}}},f={render:()=>e.jsxs(i,{children:[e.jsx(t,{children:"You can add a layout to a card. In this case we`ve added a 1:2 ratio left/right layout."}),e.jsxs(o,{heading:"Personal Information",helpText:"This information will be seen by whoever is viewing this card.",children:[e.jsx(o.Right,{children:e.jsxs("form",{id:"my-form-2",onSubmit:r=>r.preventDefault(),children:[e.jsx(d,{label:"First name"}),e.jsx(d,{label:"Last name"}),e.jsx(d,{type:"email",required:!0,label:"Email"})]})}),e.jsxs(o.Controls,{children:[e.jsx(a,{children:"Cancel"}),e.jsx(a,{form:"my-form-2",type:"submit",primary:!0,children:"Confirm"})]})]})]}),parameters:{docs:{disable:!0}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    heading: "Card Heading",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
  render: ({
    ...args
  }) => {
    return <CardWrapper>
        <BodyLarge>A simple card with a heading and content.</BodyLarge>
        <Card {...args}></Card>
      </CardWrapper>;
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    heading: "Card Sections",
    children: <>
        <Card.Section heading="Subheading 1">This is a section.</Card.Section>
        <Card.Section heading="Subheading 2">
          This is another section.
        </Card.Section>
      </>
  },
  parameters: {
    docs: {
      disable: true
    }
  },
  render: ({
    ...args
  }) => {
    return <CardWrapper>
        <BodyLarge>You can divide a card\`s body up into sections.</BodyLarge>
        <Card {...args}></Card>
      </CardWrapper>;
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const handleCancel = () => alert("Cancel");
    const handleConfirm = () => alert("Confirm");
    return <CardWrapper>
        <BodyLarge>Primary controls go on the bottom of the card.</BodyLarge>
        <Body>
          Controls is a slot, so its children will always render in the same
          place regardless of where you use it.
        </Body>
        <Card heading="Card with Controls">
          <Card.Controls>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button primary onClick={handleConfirm}>
              Confirm
            </Button>
          </Card.Controls>
          Notice that the controls render below this text, even though they are
          above this text in the JSX. That\`s because Controls is a slot, it is
          only telling Card what we want to render, not where we want to render
          it.
        </Card>
      </CardWrapper>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    heading: "Card Heading Action",
    children: <>
        <Card.HeadingAction>
          <Button>Deactivate</Button>
        </Card.HeadingAction>
      </>
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...p.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    heading: "Card Heading Action",
    children: <>
        {/*         <Card.HeadingAction>
          <Button>Action</Button>
         </Card.HeadingAction> */}

        <Card.Section heading="Subheading 1">
          This is a section.
          <Card.HeadingAction>
            <Button>Action</Button>
          </Card.HeadingAction>
        </Card.Section>

        <Card.Section heading="Subheading 2">
          This is another section.
          <Card.HeadingAction>
            <Button>Action</Button>
          </Card.HeadingAction>
        </Card.Section>
      </>
  },
  parameters: {
    docs: {
      disable: true
    }
  },
  render: ({
    ...args
  }) => {
    return <CardWrapper>
        <BodyLarge>Any heading in a Card can have an action.</BodyLarge>
        <Body>
          HeadingAction is a slot, so its children will always render in the
          same place regardless of where you use it.
        </Body>
        <Card {...args}></Card>
      </CardWrapper>;
  }
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    heading: "Card Heading",
    children: <>
        Disaster can strike at any moment.
        <Card.AlertBanner info>
          Seriously though, do not try this at home...
        </Card.AlertBanner>
      </>
  },
  parameters: {
    docs: {
      disable: true
    }
  },
  render: ({
    ...args
  }) => {
    return <CardWrapper>
        <BodyLarge>You can grab the user\`s attention with a banner.</BodyLarge>
        <Body>
          AlertBanner is a slot, so its children will always render in the same
          place regardless of where you use it.
        </Body>
        <Card {...args}></Card>
      </CardWrapper>;
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Layout
    } = leftRightLayoutGenerator();
    return <CardWrapper>
        <BodyLarge>
          You can add a layout to a card. In this case we\`ve added a 1:2 ratio
          left/right layout.
        </BodyLarge>

        <Card heading="Layout Example">
          <Layout>
            <Layout.Left>
              <Heading3>Personal Information</Heading3>
              <Body subdued>
                This information will be seen by whoever is viewing this card.
              </Body>
            </Layout.Left>
            <Layout.Right>
              <form id="my-form" onSubmit={e => e.preventDefault()}>
                <InputField label="First name" />
                <InputField label="Last name" />
                <InputField type="email" required label="Email" />
              </form>
            </Layout.Right>
          </Layout>
          <Card.Controls>
            <Button>Cancel</Button>
            <Button form="my-form" type="submit" primary>
              Confirm
            </Button>
          </Card.Controls>
        </Card>
      </CardWrapper>;
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <CardWrapper>
      <BodyLarge>
        You can add a layout to a card. In this case we\`ve added a 1:2 ratio
        left/right layout.
      </BodyLarge>
      <LeftRightCard heading="Personal Information" helpText="This information will be seen by whoever is viewing this card.">
        <LeftRightCard.Right>
          <form id="my-form-2" onSubmit={e => e.preventDefault()}>
            <InputField label="First name" />
            <InputField label="Last name" />
            <InputField type="email" required label="Email" />
          </form>
        </LeftRightCard.Right>
        <LeftRightCard.Controls>
          <Button>Cancel</Button>
          <Button form="my-form-2" type="submit" primary>
            Confirm
          </Button>
        </LeftRightCard.Controls>
      </LeftRightCard>
    </CardWrapper>,
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...f.parameters?.docs?.source}}};const U=["CardExample","SectionsExample","CardControlsExample","CardHeadingActionExample","SectionsHeadingActionsExample","AlertBannerExample","LeftRightLayoutExample","LeftRightCardExample"];export{x as AlertBannerExample,g as CardControlsExample,m as CardExample,p as CardHeadingActionExample,f as LeftRightCardExample,y as LeftRightLayoutExample,u as SectionsExample,C as SectionsHeadingActionsExample,U as __namedExportsOrder,O as default};
