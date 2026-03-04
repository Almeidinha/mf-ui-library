import{j as e}from"./jsx-runtime-u17CrQMm.js";import{A as n,B as b,s as f,a as B,H as h}from"./button-sKft9pFr.js";import{M as g,c as A}from"./shadows-CyjoGr4u.js";import{T as v,D as L,P as x,C}from"./blocks-nz5tIO7C.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-AB_7CA6O.js";import"./index-MAKt5DRM.js";const{useArgs:m}=__STORYBOOK_MODULE_PREVIEW_API__,j=A(B)`
  margin-bottom: ${g.s};
`,y=A(h)`
  margin-bottom: ${g.xs};
`,_={title:"Components/AlertBanner",component:n,tags:["autodocs"],parameters:{docs:{codePanel:!0,page:()=>e.jsxs(e.Fragment,{children:[e.jsx(v,{}),e.jsx(L,{}),e.jsx(x,{}),e.jsx(C,{})]}),description:{component:`
Alert Banners inform users about important changes or persistent conditions.  
Use this component if you need to communicate to users in a prominent way.

---

## How to use

\`\`\`tsx
import { AlertBanner } from './index'

<AlertBanner default>
  <div> Content </div>
</AlertBanner>
\`\`\`

---

### API

| Name | Type | Description |
|------|------|------------|
| dismissible? | boolean | Defines if the user can dismiss alert |
| className? | string | Class to be attached to the Container |
| open? | boolean | Defines if the alert is visible on screen |
| primaryButtonLabel? | string | Text on the primary button |
| secondaryButtonLabel? | string | Text on the secondary button |
| onPrimaryAction? | () => void | Primary button event handler |
| onSecondaryAction? | () => void | Secondary button event handler |
| onClose? | () => void | Callback function invoked to close the alert banner |
| neutral \\| info \\| success \\| warning \\| critical | boolean | Defines the color and icons of the alert |
        `}}},args:{variant:"neutral",open:!0,dismissible:!1,primaryButtonLabel:"",secondaryButtonLabel:"",onPrimaryAction:()=>alert("Primary action clicked"),onSecondaryAction:()=>alert("Secondary action clicked"),onClose:()=>alert("Alert closed")},argTypes:{dismissible:{control:"boolean",table:{defaultValue:{summary:"false"}}},open:{control:"boolean"},primaryButtonLabel:{control:"text"},secondaryButtonLabel:{control:"text"},onPrimaryAction:{action:"primary action"},onSecondaryAction:{action:"secondary action"},onClose:{action:"close alert"},variant:{control:{type:"select"},options:["neutral","info","success","warning","critical"],table:{defaultValue:{summary:"neutral"}}}}},s={parameters:{previewTabs:{canvas:{hidden:!0}}},render:function(r){const[{open:o,onClose:t,variant:a},d]=m(),u=a?{[a]:!0}:{};return e.jsx(n,{...r,...u,open:o,onClose:()=>{d({open:!1}),f(t)},children:"Lorem ipsum dolor sit amet."})}},i={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(n,{info:!0,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(n,{success:!0,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(n,{warning:!0,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(n,{critical:!0,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})]}),parameters:{docs:{disable:!0},controls:{disable:!0}}},l={render:function(){const[{open:r,dismissible:o,variant:t},a]=m();return e.jsxs(e.Fragment,{children:[e.jsx(j,{onClick:()=>a({open:!r}),children:`${r?"Close":"Open"} the alert banner!`}),e.jsxs(n,{...t?{[t]:!0}:{},dismissible:o,open:r,onClose:()=>a({open:!1}),children:[e.jsx(y,{children:"Info"}),e.jsx(b,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu mollis viverra duis in scelerisque condimentum aenean sit turpis. Donec dictum bibendum non tristique placerat aliquet massa, odi."})]})]})},args:{variant:"info"},argTypes:{onPrimaryAction:{control:!1,table:{disable:!0}},onSecondaryAction:{control:!1,table:{disable:!0}},primaryButtonLabel:{control:!1,table:{disable:!0}},secondaryButtonLabel:{control:!1,table:{disable:!0}},onClose:{control:!1,table:{disable:!0}}},parameters:{docs:{disable:!0}}},c={render:function(){const[{open:r,dismissible:o,variant:t,primaryButtonLabel:a,secondaryButtonLabel:d},u]=m();return e.jsxs(n,{...t?{[t]:!0}:{},open:r,dismissible:o,primaryButtonLabel:a,secondaryButtonLabel:d,onClose:()=>u({open:!1}),onPrimaryAction:()=>alert("Nice choice"),onSecondaryAction:()=>alert("Wrong choice"),children:[e.jsx(y,{children:"Success"}),e.jsx(b,{children:"Bacon ipsum dolor amet tongue turducken frankfurter biltong meatloaf andouille bresaola jowl. Ham pastrami tongue capicola kielbasa prosciutto short ribs flank beef. Pastrami shank venison tri-tip, bresaola landjaeger chicken capicola swine kielbasa."})]})},args:{variant:"success",primaryButtonLabel:"Take the blue pill",secondaryButtonLabel:"Take the red pill"},argTypes:{onPrimaryAction:{control:!1,table:{disable:!0}},onSecondaryAction:{control:!1,table:{disable:!0}},onClose:{control:!1,table:{disable:!0}}},parameters:{docs:{disable:!0}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
  render: function Render(args: AlertBannerStoryArgs) {
    const [{
      open,
      onClose,
      variant
    }, updateArgs] = useArgs<AlertBannerStoryArgs>();
    const variantProp = variant ? {
      [variant]: true
    } : {};
    return <AlertBanner {...args} {...variantProp} open={open} onClose={() => {
      updateArgs({
        open: false
      });
      safeCallback(onClose);
    }}>
        Lorem ipsum dolor sit amet.
      </AlertBanner>;
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <AlertBanner>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner info>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner success>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner warning>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
      <AlertBanner critical>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AlertBanner>
    </>,
  parameters: {
    docs: {
      disable: true
    },
    controls: {
      disable: true
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [{
      open,
      dismissible,
      variant
    }, updateArgs] = useArgs<AlertBannerStoryArgs>();
    return <>
        <ToggleButton onClick={() => updateArgs({
        open: !open
      })}>
          {\`\${open ? "Close" : "Open"} the alert banner!\`}
        </ToggleButton>
        <AlertBanner {...variant ? {
        [variant]: true
      } : {}} dismissible={dismissible} open={open} onClose={() => updateArgs({
        open: false
      })}>
          <AlertBannerHeading>Info</AlertBannerHeading>
          <Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu mollis
            viverra duis in scelerisque condimentum aenean sit turpis. Donec
            dictum bibendum non tristique placerat aliquet massa, odi.
          </Body>
        </AlertBanner>
      </>;
  },
  args: {
    variant: "info"
  },
  argTypes: {
    onPrimaryAction: {
      control: false,
      table: {
        disable: true
      }
    },
    onSecondaryAction: {
      control: false,
      table: {
        disable: true
      }
    },
    primaryButtonLabel: {
      control: false,
      table: {
        disable: true
      }
    },
    secondaryButtonLabel: {
      control: false,
      table: {
        disable: true
      }
    },
    onClose: {
      control: false,
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [{
      open,
      dismissible,
      variant,
      primaryButtonLabel,
      secondaryButtonLabel
    }, updateArgs] = useArgs<AlertBannerStoryArgs>();
    return <AlertBanner {...variant ? {
      [variant]: true
    } : {}} open={open} dismissible={dismissible} primaryButtonLabel={primaryButtonLabel} secondaryButtonLabel={secondaryButtonLabel} onClose={() => updateArgs({
      open: false
    })} onPrimaryAction={() => alert("Nice choice")} onSecondaryAction={() => alert("Wrong choice")}>
        <AlertBannerHeading>Success</AlertBannerHeading>
        <Body>
          Bacon ipsum dolor amet tongue turducken frankfurter biltong meatloaf
          andouille bresaola jowl. Ham pastrami tongue capicola kielbasa
          prosciutto short ribs flank beef. Pastrami shank venison tri-tip,
          bresaola landjaeger chicken capicola swine kielbasa.
        </Body>
      </AlertBanner>;
  },
  args: {
    variant: "success",
    primaryButtonLabel: "Take the blue pill",
    secondaryButtonLabel: "Take the red pill"
  },
  argTypes: {
    onPrimaryAction: {
      control: false,
      table: {
        disable: true
      }
    },
    onSecondaryAction: {
      control: false,
      table: {
        disable: true
      }
    },
    onClose: {
      control: false,
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      disable: true
    }
  }
}`,...c.parameters?.docs?.source}}};const O=["Docs","TypeVariant","Dismissible","WithActions"];export{l as Dismissible,s as Docs,i as TypeVariant,c as WithActions,O as __namedExportsOrder,_ as default};
