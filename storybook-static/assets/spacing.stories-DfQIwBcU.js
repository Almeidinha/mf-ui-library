import{j as n}from"./jsx-runtime-u17CrQMm.js";import{C as c,L as t}from"./button-sKft9pFr.js";import{T as x,a as T,b as s,c as l,d as h,e}from"./table-VOkse6D7.js";import{B as i}from"./badge-BUzlPSeB.js";import{c as a}from"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";import"./useOnClickOutside-BSLQrXXa.js";import"./checkbox-Cf_FJ72f.js";import"./useMergedRefs-CBj2iGZS.js";const p=a.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,o=a.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,u=a.span`
  color: #9ca3af;
`,j=a.div`
  height: 20px;
  width: ${({width:r})=>r}px;
  background: #3b82f6;
  border-radius: 2px;
`,D=a.p`
  margin: 0 0 32px;
  color: #6b7280;
  max-width: 720px;
`,g=8,S=[2,4,8,12,16,24,32,48,64,96,128,192,256,384,512,640,768],L={title:"Foundations/Spacing",tags:["autodocs"],parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{description:{component:`
## How to use

\`\`\`ts
import SPACING from './spacing'

//get the token value
SPACING.['YOUR-VALUE-HERE']
\`\`\`

## When to use

You can set this values from this props:

- width
- heigth
- margin
- padding

        `}}}},d={render:()=>n.jsxs("div",{style:{padding:24},children:[n.jsx("h1",{children:"Spacing System"}),n.jsxs(c,{heading:"8 pixel base unit",children:[n.jsx(D,{children:"All spacing for components and typography is built around a base unit of 8 pixels. This base unit determines the spacing scale and ensures visual consistency across products."}),n.jsx(p,{children:S.map(r=>n.jsxs(o,{children:[n.jsxs(t,{style:{minWidth:"100px"},children:[r,"px ",n.jsxs(u,{children:["(8 × ",r/g,")"]})]}),n.jsx(j,{width:r})]},r))})]}),n.jsx("h2",{children:"List of Values"}),n.jsxs(x,{children:[n.jsx(T,{children:n.jsxs(s,{children:[n.jsx(l,{children:"Name"}),n.jsx(l,{children:"Value"})]})}),n.jsxs(h,{children:[n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size2"})}),n.jsx(e,{children:"2px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size4"})}),n.jsx(e,{children:"4px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size8"})}),n.jsx(e,{children:"8px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size12"})}),n.jsx(e,{children:"12px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size16"})}),n.jsx(e,{children:"16px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size24"})}),n.jsx(e,{children:"24px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size32"})}),n.jsx(e,{children:"32px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size64"})}),n.jsx(e,{children:"64px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size96"})}),n.jsx(e,{children:"96px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size128"})}),n.jsx(e,{children:"128px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size192"})}),n.jsx(e,{children:"192px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size256"})}),n.jsx(e,{children:"256px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size384"})}),n.jsx(e,{children:"384px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size512"})}),n.jsx(e,{children:"512px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size640"})}),n.jsx(e,{children:"640px"})]}),n.jsxs(s,{children:[n.jsx(e,{children:n.jsx(i,{neutral:!0,children:"Size768"})}),n.jsx(e,{children:"768px"})]})]})]})]})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24
  }}>
      <h1>Spacing System</h1>

      <Card heading="8 pixel base unit">
        <Description>
          All spacing for components and typography is built around a base unit
          of 8 pixels. This base unit determines the spacing scale and ensures
          visual consistency across products.
        </Description>
        <ScaleList>
          {spacingScale.map(value => <ScaleRow key={value}>
              <Label style={{
            minWidth: "100px"
          }}>
                {value}px <Multiplier>(8 × {value / BASE})</Multiplier>
              </Label>
              <Bar width={value} />
            </ScaleRow>)}
        </ScaleList>
      </Card>

      <h2>List of Values</h2>

      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Value</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>
              <Badge neutral>Size2</Badge>
            </TD>
            <TD>2px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size4</Badge>
            </TD>
            <TD>4px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size8</Badge>
            </TD>
            <TD>8px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size12</Badge>
            </TD>
            <TD>12px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size16</Badge>
            </TD>
            <TD>16px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size24</Badge>
            </TD>
            <TD>24px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size32</Badge>
            </TD>
            <TD>32px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size64</Badge>
            </TD>
            <TD>64px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size96</Badge>
            </TD>
            <TD>96px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size128</Badge>
            </TD>
            <TD>128px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size192</Badge>
            </TD>
            <TD>192px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size256</Badge>
            </TD>
            <TD>256px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size384</Badge>
            </TD>
            <TD>384px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size512</Badge>
            </TD>
            <TD>512px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size640</Badge>
            </TD>
            <TD>640px</TD>
          </TR>
          <TR>
            <TD>
              <Badge neutral>Size768</Badge>
            </TD>
            <TD>768px</TD>
          </TR>
        </TBody>
      </Table>
    </div>
}`,...d.parameters?.docs?.source}}};const A=["Docs"];export{d as Docs,A as __namedExportsOrder,L as default};
