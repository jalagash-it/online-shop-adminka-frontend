(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{316:function(t,e,n){"use strict";n.r(e);n(20),n(111),n(42),n(22),n(135),n(37);var o=n(40),l=n(130),r={data:function(){return{nameState:null,catState:null,updatingItem:{},showUpdateModal:!1,newItem:{fields:[]},items:[],dynamicKeys:[]}},mounted:function(){window.test=this;var t=this;this.$store.dispatch("categories/all"),this.$axios.$get("/products").then((function(e){t.items=e}))},methods:{addPropToNewItem:function(){this.newItem.fields.push({key:"",val:""})},removeDynamicProp:function(t){var e=this.newItem.fields.indexOf(t);e>=0&&this.newItem.fields.splice(e,1),(e=this.updatingItem.fields.indexOf(t))>=0&&this.updatingItem.fields.splice(e,1)},addPropToUpdatingItem:function(){this.updatingItem.fields.push({key:"",val:""})},checkFormValidity:function(){var t=this.$refs.form.checkValidity();return this.nameState=t,this.catState=t,t},resetModal:function(){this.newItem={fields:[]},this.updatingItem.fields=this.updatingItem.fields||[],this.nameState=null,this.catState=null},handleOk:function(t){t.preventDefault(),this.handleSubmit()},handleSubmit:function(){var t=this;this.checkFormValidity()&&this.$axios.$post("/products",this.newItem).then(console.log).then((function(){t.$nextTick((function(){t.$bvModal.hide("add-modal")}))}))},updateProduct:function(t){var e={};Object.assign(e,t),this.updatingItem=e,this.resetModal(),this.showUpdateModal=!0},handleUpdateOk:function(t){t.preventDefault(),this.handleUpdateSubmit()},handleUpdateSubmit:function(){var t=this;this.updatingItem.price-=0,this.$axios.$put("/products/".concat(this.updatingItem.id),this.updatingItem).then(console.log).then((function(){t.$nextTick((function(){var e=t.items.find((function(p){return p.id===t.updatingItem.id}));Object.assign(e,t.updatingItem),t.$bvModal.hide("update-modal"),t.showUpdateModal=!1}))}))},getCategoryName:function(t){var e=test.categoryOptions.find((function(e){return e.value==t}));return null!=e?e.text:"Нет категории"}},computed:{categories:function(){return this.$store.state.categories.tree},categoryOptions:function(){var t=this.$store.state.categories.tree;return null!=t?Object(l.d)(t).map((function(t){return{value:t.id,text:t.name}})):[]},fields:function(){return[{key:"name",label:"Название",sortable:!0},{key:"category_id",label:"Категория",sortable:!0},{key:"fields",label:"динамические поля"}].concat(Object(o.a)(this.dynamicKeys),[{key:"actions",label:""}])}}},d=n(82),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Товары")]),t._v(" "),n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-modal",modifiers:{"add-modal":!0}}],staticStyle:{"margin-bottom":"8px"}},[t._v("+")]),t._v(" "),n("b-table",{ref:"prodTable",attrs:{fields:t.fields,items:t.items},scopedSlots:t._u([{key:"cell(category_id)",fn:function(data){return[n("b",{staticClass:"text-info"},[t._v(t._s(t.getCategoryName(data.item.category_id)))])]}},{key:"cell(fields)",fn:function(data){return t._l(data.item.fields,(function(p,e){return n("b",{key:e},[t._v("\n        "+t._s(p.key)+":"+t._s(p.val)+" |\n      ")])}))}},{key:"cell(actions)",fn:function(data){return[n("b-button",{attrs:{variant:"outline-secondary"},on:{click:function(e){return t.updateProduct(data.item)}}},[t._v("\n        edit")])]}}])}),t._v(" "),n("b-modal",{ref:"modal",attrs:{id:"add-modal",title:"Добавить новый товар"},on:{show:t.resetModal,hidden:t.resetModal,ok:t.handleOk}},[n("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[n("b-form-group",{attrs:{label:"Название","label-for":"name-input","invalid-feedback":"Обязательное поле",state:t.nameState}},[n("b-form-input",{attrs:{id:"name-input",state:t.nameState,required:""},model:{value:t.newItem.name,callback:function(e){t.$set(t.newItem,"name",e)},expression:"newItem.name"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Категория","label-for":"category_id","invalid-feedback":"Обязательное поле",state:t.catState}},[n("b-form-select",{attrs:{options:t.categoryOptions},model:{value:t.newItem.category_id,callback:function(e){t.$set(t.newItem,"category_id",e)},expression:"newItem.category_id"}})],1),t._v(" "),n("p",[t._v("Динамические поля")]),t._v(" "),n("b-list-group",t._l(t.newItem.fields,(function(e,o){return n("b-list-group-item",{key:o,staticClass:"d-flex justify-content-between align-items-center"},[n("b-row",[n("b-col",{attrs:{cols:"5"}},[n("b-form-input",{model:{value:e.key,callback:function(n){t.$set(e,"key",n)},expression:"prop.key"}})],1),t._v(" "),n("b-col",{attrs:{cols:"5"}},[n("b-form-input",{model:{value:e.val,callback:function(n){t.$set(e,"val",n)},expression:"prop.val"}})],1),t._v(" "),n("b-col",{attrs:{cols:"2"}},[n("b-button",{attrs:{size:"sm",variant:"danger",pill:""},on:{click:function(n){return t.removeDynamicProp(e)}}},[n("b-badge",{attrs:{variant:"danger"}},[n("b-icon",{attrs:{icon:"trash"}})],1)],1)],1)],1)],1)})),1),t._v(" "),n("b-button",{attrs:{size:"sm"},on:{click:t.addPropToNewItem}},[t._v("добавить поле")])],1)]),t._v(" "),n("b-modal",{ref:"modal",attrs:{id:"update-modal",title:"Редактировать товар"},on:{show:t.resetModal,hidden:t.resetModal,ok:t.handleUpdateOk},model:{value:t.showUpdateModal,callback:function(e){t.showUpdateModal=e},expression:"showUpdateModal"}},[n("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleUpdateSubmit(e)}}},[n("b-form-group",{attrs:{label:"Название","label-for":"name-input","invalid-feedback":"Обязательное поле",state:t.nameState}},[n("b-form-input",{attrs:{id:"name-input",state:t.nameState,required:""},model:{value:t.updatingItem.name,callback:function(e){t.$set(t.updatingItem,"name",e)},expression:"updatingItem.name"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Категория","label-for":"category_id","invalid-feedback":"Обязательное поле",state:t.catState}},[n("b-form-select",{attrs:{options:t.categoryOptions},model:{value:t.updatingItem.category_id,callback:function(e){t.$set(t.updatingItem,"category_id",e)},expression:"updatingItem.category_id"}})],1),t._v(" "),n("p",[t._v("Динамические поля")]),t._v(" "),n("b-list-group",t._l(t.updatingItem.fields,(function(e,o){return n("b-list-group-item",{key:o,staticClass:"d-flex justify-content-between align-items-center"},[n("b-row",[n("b-col",{attrs:{cols:"5"}},[n("b-form-input",{model:{value:e.key,callback:function(n){t.$set(e,"key",n)},expression:"prop.key"}})],1),t._v(" "),n("b-col",{attrs:{cols:"5"}},[n("b-form-input",{model:{value:e.val,callback:function(n){t.$set(e,"val",n)},expression:"prop.val"}})],1),t._v(" "),n("b-col",{attrs:{cols:"2"}},[n("b-button",{attrs:{size:"sm",variant:"danger",pill:""},on:{click:function(n){return t.removeDynamicProp(e)}}},[n("b-badge",{attrs:{variant:"danger"}},[n("b-icon",{attrs:{icon:"trash"}})],1)],1)],1)],1)],1)})),1),t._v(" "),n("b-button",{attrs:{size:"sm"},on:{click:t.addPropToUpdatingItem}},[t._v("добавить поле")])],1)])],1)}),[],!1,null,null,null);e.default=component.exports}}]);