import{j as t}from"./jsx-runtime-u17CrQMm.js";import{F as p}from"./button-sKft9pFr.js";import{P as o}from"./pagination-BBGVuDGu.js";import"./shadows-CyjoGr4u.js";import"./iframe-Co_0DYZM.js";import"./preload-helper-PPVm8Dsz.js";import"./input-number-CNAO7S9z.js";import"./input-field-Dp6wjjTc.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";import"./select-DfDUyGFp.js";import"./useOnClickOutside-BSLQrXXa.js";import"./useMergedRefs-CBj2iGZS.js";import"./menu-CZpM_CeP.js";import"./tag-DifDEUaX.js";const{useArgs:g}=__STORYBOOK_MODULE_PREVIEW_API__,I={title:"Components/Pagination",component:o,parameters:{layout:"centered",docs:{description:{component:"\n\nPagination is a component that receives a page number, a total amount of pages, and a onChange function to act whenever the pagination changes.\n\n## How to use\n\n```javascript\nimport { Pagination } from './index'\n\n<Pagination />\n```\n\n## API\n\nExtends `InputHTMLAttributes<HTMLInputElement>`\n\n| Name                      | Type                          | Description                                     |\n| ------------------------- | ----------------------------- | ----------------------------------------------- |\n| `page`                  | `number`                    | The page currently selected on the pagination   |\n| `totalPages`            | `number`                    | The amount of pages that are available          |\n| `pageSize?`             | `number`                    | The number of items per page                    |\n| `showPageSizeSelector?` | `boolean`                   | Display a page size selector                    |\n| `pageSizeOptions?`      | `readonly number[]`         | The options available for page size selection   |\n| `showPageInfo?`         | `boolean`                   | Display a page indicator                        |\n| `onChange`              | `(page: number) => void`    | You can listen the changes from the component   |\n| `onPageSizeChange`     | `(pageSize: number) => void` | You can listen the changes from the component   |\n\n        "}}},tags:["autodocs"],args:{page:1,totalPages:100,showPageInfo:!0,previousLabel:"",nextLabel:"",pageSize:10,showPageSizeSelector:!1,pageSizeOptions:[5,10,20,50,100]},argTypes:{}},e={render:r=>{const[{page:i,pageSize:s},n]=g();return t.jsx(p,{style:{height:220,alignItems:"end"},children:t.jsx(o,{...r,page:i,pageSize:s,onChange:a=>n({page:a}),onPageSizeChange:a=>n({pageSize:a})})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [{
      page,
      pageSize
    }, updateArgs] = useArgs();
    return <Flex style={{
      height: 220,
      alignItems: "end"
    }}>
        <Pagination {...args} page={page} pageSize={pageSize} onChange={newPage => updateArgs({
        page: newPage
      })} onPageSizeChange={newPageSize => updateArgs({
        pageSize: newPageSize
      })} />
      </Flex>;
  }
}`,...e.parameters?.docs?.source}}};const T=["Primary"];export{e as Primary,T as __namedExportsOrder,I as default};
