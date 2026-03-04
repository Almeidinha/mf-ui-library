import{j as r}from"./jsx-runtime-u17CrQMm.js";import{F as ge,L as te,I as fe,d as pe,e as ae}from"./button-sKft9pFr.js";import{c as ye,p as be,g as we,R as k}from"./chunk-6ZWNVZML-Cf6FaSul.js";import{T as he,a as Te,b as Z,c as re,d as Se,e as R}from"./table-VOkse6D7.js";import{I as ve}from"./input-text-uiXaQY7h.js";import{G as Ne}from"./shadows-CyjoGr4u.js";import{u as Ce}from"./useDebounce-DjXobQll.js";import{r as f}from"./iframe-Co_0DYZM.js";import{P as ke}from"./pagination-BBGVuDGu.js";import"./useOnClickOutside-BSLQrXXa.js";import"./checkbox-Cf_FJ72f.js";import"./useMergedRefs-CBj2iGZS.js";import"./input-field-Dp6wjjTc.js";import"./types-C3AmYhER.js";import"./error-message-BdVgcHxy.js";import"./preload-helper-PPVm8Dsz.js";import"./input-number-CNAO7S9z.js";import"./select-DfDUyGFp.js";import"./menu-CZpM_CeP.js";import"./tag-DifDEUaX.js";function V(n,a){return typeof a=="function"?a(n):n[a]}function oe(n){return n.type==="actions"}function Re(n,a){return n[a.field]}function I(n,a){const d=Re(n,a);return a.valueGetter?a.valueGetter(d,n):d}function xe(n){return n==null?"":typeof n=="string"?n.toLowerCase():typeof n=="number"||typeof n=="boolean"?String(n).toLowerCase():""}function qe(n){const{rows:a,columns:d,rowKey:g,paginated:i=!1,defaultPageSize:z=5,pageSizeOptions:G=[5,10,25,50],searchable:x=!1,searchDebounce:O=250,checkboxSelection:p=!1,selectedRows:q,onSelectedRowsChange:h,sortField:M,sortDirection:T,onSortChange:A}=n,[D,$]=f.useState(""),y=Ce(D,O),[_,P]=f.useState(null),[L,B]=f.useState("NONE"),[j,K]=f.useState(0),[S,H]=f.useState(z),[J,Q]=f.useState([]),t=M??_,c=T??L,u=q??J,s=(e,o)=>{if(A){A(e,o);return}P(e),B(o)},E=e=>{K(Math.max(0,e))},U=e=>{H(e),K(0)},v=e=>{q||Q(e),h?.(e,a.filter(o=>e.includes(V(o,g))))},m=f.useMemo(()=>{if(!x)return a;const e=y.trim().toLowerCase();return e?a.filter(o=>d.some(l=>{if(oe(l)||l.searchable===!1)return!1;const w=I(o,l);return xe(w).includes(e)})):a},[a,d,x,y]),b=f.useMemo(()=>{if(!t||c==="NONE")return m;const e=d.find(l=>String(l.field)===t);if(!e||oe(e))return m;const o=[...m].sort((l,w)=>{const Y=e.sortValueGetter?e.sortValueGetter(l):I(l,e),de=e.sortValueGetter?e.sortValueGetter(w):I(w,e);return ye(Y,de)});return c==="DESC"?o.reverse():o},[m,d,t,c]),N=f.useMemo(()=>i?be(b,j,S):{rows:b,pageIndex:0,pageCount:1},[b,i,j,S]),W=N.rows,le=N.pageIndex,ue=b.length,ce=N.pageCount,C=f.useMemo(()=>W.map(e=>V(e,g)),[W,g]),X=p&&C.length>0&&C.every(e=>u.includes(e)),me=p&&C.some(e=>u.includes(e))&&!X;return{search:D,setSearch:$,sortField:t,sortDirection:c,toggleSort:(e,o)=>{if(!o)return;if(t!==e){s(e,"ASC");return}const l=we(c);s(l==="NONE"?null:e,l)},page:le,setPage:E,pageSize:S,setPageSize:U,pageSizeOptions:G,paginated:i,totalRows:ue,totalPages:ce,visibleRows:W,selectedKeys:u,allVisibleSelected:X,someVisibleSelected:me,toggleRow:e=>{if(!p)return;const o=V(e,g),w=u.includes(o)?u.filter(Y=>Y!==o):[...u,o];v(w)},toggleAllVisible:()=>{if(!p)return;if(X){const o=u.filter(l=>!C.includes(l));v(o);return}const e=Array.from(new Set([...u,...C]));v(e)},getRowKey:e=>V(e,g),getColumnRawValue:(e,o)=>I(e,o)}}function ee(n){return n??"left"}function se(n){return n.type==="actions"}function ie(n,a){return typeof n=="function"?n(a):!!n}function ne(n){const{columns:a,searchable:d=!1,searchPlaceholder:g="Search...",checkboxSelection:i=!1,emptyMessage:z="No rows found."}=n,{search:G,setSearch:x,sortField:O,sortDirection:p,toggleSort:q,page:h,setPage:M,pageSize:T,setPageSize:A,pageSizeOptions:D,paginated:$,totalRows:y,totalPages:_,visibleRows:P,selectedKeys:L,allVisibleSelected:B,someVisibleSelected:j,toggleRow:K,toggleAllVisible:S,getRowKey:H,getColumnRawValue:J}=qe(n),Q=a.length+(i?1:0);return r.jsxs(ge,{column:!0,gap:Ne.l,children:[d?r.jsx(ve,{value:G,onChange:x,placeholder:g}):null,r.jsxs(he,{children:[r.jsx(Te,{children:r.jsxs(Z,{children:[i?r.jsx(re.Select,{checked:B?!0:j?void 0:!1,onChange:S}):null,a.map(t=>{const c=String(t.field),u=O===c?p:"NONE",s=!se(t)&&t.sortable;return r.jsx(re,{sort:s?u:void 0,onSortClick:()=>q(c,s),style:{width:t.width,textAlign:ee(t.align)},title:t.description,children:t.headerName??""},c)})]})}),r.jsx(Se,{children:P.length===0?r.jsx(Z,{children:r.jsx(R,{colSpan:Q,children:r.jsx(te,{subdued:!0,children:z})})}):P.map(t=>{const c=H(t),u=L.includes(c);return r.jsxs(Z,{selected:u,children:[i?r.jsx(R.Select,{selected:u,onChange:()=>K(t)}):null,a.map(s=>{if(se(s)){const v=s.getActions(t).filter(m=>!ie(m.hidden,t));return r.jsx(R.Actions,{fitContent:s.fitContent??!0,style:{textAlign:ee(s.align)},children:v.map((m,b)=>{const N=ie(m.disabled,t);return r.jsx(R.Action,{onClick:()=>m.onClick(t),disabled:N,destructive:m.destructive,icon:m.icon,children:m.label},`${String(s.field)}-${b}`)})},String(s.field))}const E=J(t,s),U=s.renderCell?s.renderCell(t,E):E;return r.jsx(R,{fitContent:s.fitContent,style:{textAlign:ee(s.align)},children:U},String(s.field))})]},c)})})]}),r.jsx(fe,{is:$,children:r.jsxs(pe,{align:"center",children:[r.jsx(te,{subdued:!0,children:y===0?"0 results":`${h*T+1}-${Math.min((h+1)*T,y)} of ${y}`}),r.jsx(ke,{page:h+1,totalPages:_,onChange:t=>M(t-1),pageSize:T,onPageSizeChange:A,showPageSizeSelector:!0,pageSizeOptions:D})]})})]})}ne.__docgenInfo={description:"",methods:[],displayName:"DataTable",props:{rows:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| DataTableRegularColumn<T>
| DataTableActionsColumn<T>`,elements:[{name:"intersection",raw:`DataTableBaseColumn<T> & {
  type?: "text" | "number";
}`,elements:[{name:"signature",type:"object",raw:`{
  field: keyof T | string;
  headerName: ReactNode;
  description?: string;

  width?: number | string;
  fitContent?: boolean;
  align?: DataTableAlign;

  sortable?: boolean;
  searchable?: boolean;

  valueGetter?: (value: unknown, row: T) => ReactNode;
  renderCell?: (row: T, value: ReactNode) => ReactNode;
  sortValueGetter?: (row: T) => string | number | null | undefined;
}`,signature:{properties:[{key:"field",value:{name:"union",raw:"keyof T | string",elements:[{name:"T"},{name:"string"}],required:!0}},{key:"headerName",value:{name:"ReactNode",required:!0}},{key:"description",value:{name:"string",required:!1}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"fitContent",value:{name:"boolean",required:!1}},{key:"align",value:{name:"union",raw:'"left" | "center" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"center"'},{name:"literal",value:'"right"'}],required:!1}},{key:"sortable",value:{name:"boolean",required:!1}},{key:"searchable",value:{name:"boolean",required:!1}},{key:"valueGetter",value:{name:"signature",type:"function",raw:"(value: unknown, row: T) => ReactNode",signature:{arguments:[{type:{name:"unknown"},name:"value"},{type:{name:"T"},name:"row"}],return:{name:"ReactNode"}},required:!1}},{key:"renderCell",value:{name:"signature",type:"function",raw:"(row: T, value: ReactNode) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"ReactNode"},name:"value"}],return:{name:"ReactNode"}},required:!1}},{key:"sortValueGetter",value:{name:"signature",type:"function",raw:"(row: T) => string | number | null | undefined",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"union",raw:"string | number | null | undefined",elements:[{name:"string"},{name:"number"},{name:"null"},{name:"undefined"}]}},required:!1}}]}},{name:"signature",type:"object",raw:`{
  type?: "text" | "number";
}`,signature:{properties:[{key:"type",value:{name:"union",raw:'"text" | "number"',elements:[{name:"literal",value:'"text"'},{name:"literal",value:'"number"'}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  field: string;
  headerName?: ReactNode;
  description?: string;

  type: "actions";
  width?: number | string;
  fitContent?: boolean;
  align?: DataTableAlign;

  sortable?: false;
  searchable?: false;

  getActions: (row: T) => DataTableAction<T>[];
}`,signature:{properties:[{key:"field",value:{name:"string",required:!0}},{key:"headerName",value:{name:"ReactNode",required:!1}},{key:"description",value:{name:"string",required:!1}},{key:"type",value:{name:"literal",value:'"actions"',required:!0}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"fitContent",value:{name:"boolean",required:!1}},{key:"align",value:{name:"union",raw:'"left" | "center" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"center"'},{name:"literal",value:'"right"'}],required:!1}},{key:"sortable",value:{name:"literal",value:"false",required:!1}},{key:"searchable",value:{name:"literal",value:"false",required:!1}},{key:"getActions",value:{name:"signature",type:"function",raw:"(row: T) => DataTableAction<T>[]",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: ReactNode;
  onClick: (row: T) => void;

  disabled?: boolean | ((row: T) => boolean);
  hidden?: boolean | ((row: T) => boolean);
  destructive?: boolean;
  icon?: ComponentType;
}`,signature:{properties:[{key:"label",value:{name:"ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"(row: T) => void",signature:{arguments:[{type:{name:"T"},name:"row"}],return:{name:"void"}},required:!0}},{key:"disabled",value:{name:"union",raw:"boolean | ((row: T) => boolean)",elements:[{name:"boolean"},{name:"unknown"}],required:!1}},{key:"hidden",value:{name:"union",raw:"boolean | ((row: T) => boolean)",elements:[{name:"boolean"},{name:"unknown"}],required:!1}},{key:"destructive",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ComponentType",required:!1}}]}}],raw:"DataTableAction<T>[]"}},required:!0}}]}}]}],raw:"DataTableColumn<T>[]"},description:""},rowKey:{required:!0,tsType:{name:"union",raw:"keyof T | ((row: T) => React.Key)",elements:[{name:"T"},{name:"unknown"}]},description:""},paginated:{required:!1,tsType:{name:"boolean"},description:""},defaultPageSize:{required:!1,tsType:{name:"number"},description:""},pageSizeOptions:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},searchable:{required:!1,tsType:{name:"boolean"},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:""},searchDebounce:{required:!1,tsType:{name:"number"},description:""},checkboxSelection:{required:!1,tsType:{name:"boolean"},description:""},selectedRows:{required:!1,tsType:{name:"Array",elements:[{name:"ReactKey",raw:"React.Key"}],raw:"React.Key[]"},description:""},onSelectedRowsChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(keys: React.Key[], rows: T[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"ReactKey",raw:"React.Key"}],raw:"React.Key[]"},name:"keys"},{type:{name:"Array",elements:[{name:"T"}],raw:"T[]"},name:"rows"}],return:{name:"void"}}},description:""},emptyMessage:{required:!1,tsType:{name:"ReactNode"},description:""},sortField:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},sortDirection:{required:!1,tsType:{name:"union",raw:'"ASC" | "DESC" | "NONE"',elements:[{name:"literal",value:'"ASC"'},{name:"literal",value:'"DESC"'},{name:"literal",value:'"NONE"'}]},description:""},onSortChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(sortField: string | null, direction: SortDirection) => void",signature:{arguments:[{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"sortField"},{type:{name:"union",raw:'"ASC" | "DESC" | "NONE"',elements:[{name:"literal",value:'"ASC"'},{name:"literal",value:'"DESC"'},{name:"literal",value:'"NONE"'}]},name:"direction"}],return:{name:"void"}}},description:""}}};const Ye={title:"Components/DataTable",component:ne,parameters:{layout:"centered"},tags:["autodocs"],args:{rows:[],columns:[],rowKey:"id",paginated:!0,pageSizeOptions:[5,10,25],searchable:!0,checkboxSelection:!0},argTypes:{}},F={render:n=>{const a=[{field:"id",headerName:"ID",width:70,fitContent:!0,sortable:!0},{field:"firstName",headerName:"First name",sortable:!0},{field:"lastName",headerName:"Last name",sortable:!0},{field:"age",headerName:"Age",sortable:!0,fitContent:!0,align:"right"},{field:"fullName",headerName:"Full name",sortable:!1,valueGetter:(g,i)=>`${i.firstName??""} ${i.lastName??""}`.trim()},{field:"actions",type:"actions",headerName:"",fitContent:!0,getActions:g=>[{label:"Edit",icon:ae.Pen,onClick:()=>console.log("Edit action clicked")},{label:"Delete",icon:ae.TrashCan,destructive:!0,disabled:g.role==="owner",onClick:()=>console.log("Delete action clicked")},{label:"Impersonate",hidden:i=>!i.isActive,onClick:()=>console.log("Impersonate action clicked")}]}],d=()=>Array.from({length:500},(g,i)=>({id:i+1,firstName:k.person.firstName(),lastName:k.person.lastName(),age:k.number.int({min:18,max:80}),role:k.helpers.arrayElement(["user","admin","owner"]),isActive:k.datatype.boolean()}));return r.jsx(ne,{...n,rows:d(),columns:a,rowKey:"id"})}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    type PersonRow = {
      id: number;
      firstName: string | null;
      lastName: string;
      age: number | null;
      role?: "user" | "admin" | "owner";
      isActive?: boolean;
    };
    const columns: DataTableColumn<PersonRow>[] = [{
      field: "id",
      headerName: "ID",
      width: 70,
      fitContent: true,
      sortable: true
    }, {
      field: "firstName",
      headerName: "First name",
      sortable: true
    }, {
      field: "lastName",
      headerName: "Last name",
      sortable: true
    }, {
      field: "age",
      headerName: "Age",
      sortable: true,
      fitContent: true,
      align: "right"
    }, {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      valueGetter: (_, row) => \`\${row.firstName ?? ""} \${row.lastName ?? ""}\`.trim()
    }, {
      field: "actions",
      type: "actions",
      headerName: "",
      fitContent: true,
      getActions: (row: PersonRow) => [{
        label: "Edit",
        icon: IconMinor.Pen,
        onClick: () => console.log("Edit action clicked")
      }, {
        label: "Delete",
        icon: IconMinor.TrashCan,
        destructive: true,
        disabled: row.role === "owner",
        onClick: () => console.log("Delete action clicked")
      }, {
        label: "Impersonate",
        hidden: (r: PersonRow) => !r.isActive,
        onClick: () => console.log("Impersonate action clicked")
      }]
    }];
    const getPersonRows = (): PersonRow[] => {
      return Array.from({
        length: 500
      }, (_, i) => ({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({
          min: 18,
          max: 80
        }),
        role: faker.helpers.arrayElement(["user", "admin", "owner"]),
        isActive: faker.datatype.boolean()
      }));
    };
    return <DataTable {...args} rows={getPersonRows()} columns={columns} rowKey="id" />;
  }
}`,...F.parameters?.docs?.source}}};const Ze=["Primary"];export{F as Primary,Ze as __namedExportsOrder,Ye as default};
