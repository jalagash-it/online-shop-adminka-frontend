(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{316:function(t,e,n){"use strict";n.r(e);n(111),n(22),n(37);var r=n(130),l={data:function(){return{nameState:null,catState:null,priceState:null,coveringState:null,depthState:null,widthState:null,heightState:null,wave_widthState:null,wave_heightState:null,guaranteeState:null,updatingItem:{},showUpdateModal:!1,newItem:{},fields:[{key:"name",label:"Название",sortable:!0},{key:"category_id",label:"Категория",sortable:!0},{key:"price",label:"Цена",sortable:!0},{key:"covering",label:"Покрытие",sortable:!0},{key:"depth",label:"Толщина",sortable:!0},{key:"width",label:"Ширина",sortable:!0},{key:"height",label:"Длина",sortable:!0},{key:"wave_width",label:"Ширина волны",sortable:!0},{key:"wave_height",label:"Высота волны",sortable:!0},{key:"guarantee",label:"Гарантие"},{key:"actions",label:""}],items:[]}},mounted:function(){window.test=this;var t=this;this.$store.dispatch("categories/all"),this.$axios.$get("/products").then((function(e){t.items=e}))},methods:{checkFormValidity:function(){var t=this.$refs.form.checkValidity();return this.nameState=t,this.catState=t,this.priceState=t,this.coveringState=t,this.depthState=t,this.widthState=t,this.heightState=t,this.wave_widthState=t,this.wave_heightState=t,this.guaranteeState=t,t},resetModal:function(){this.newItem={},this.nameState=null,this.catState=null,this.priceState=null,this.coveringState=null,this.depthState=null,this.widthState=null,this.heightState=null,this.wave_widthState=null,this.wave_heightState=null,this.guaranteeState=null},handleOk:function(t){t.preventDefault(),this.handleSubmit()},handleSubmit:function(){var t=this;this.checkFormValidity()&&this.$axios.$post("/products",this.newItem).then(console.log).then((function(){t.$nextTick((function(){t.$bvModal.hide("add-modal")}))}))},updateProduct:function(t){var e={};Object.assign(e,t),this.updatingItem=e,this.resetModal(),this.showUpdateModal=!0},handleUpdateOk:function(t){t.preventDefault(),this.handleUpdateSubmit()},handleUpdateSubmit:function(){var t=this;this.updatingItem.price-=0,this.$axios.$put("/products/".concat(this.updatingItem.id),this.updatingItem).then(console.log).then((function(){t.$nextTick((function(){var e=t.items.find((function(p){return p.id===t.updatingItem.id}));Object.assign(e,t.updatingItem),t.$bvModal.hide("update-modal"),t.showUpdateModal=!1}))}))},getCategoryName:function(t){var e=test.categoryOptions.find((function(e){return e.value==t}));return null!=e?e.text:"Нет категории"}},computed:{categories:function(){return this.$store.state.categories.tree},categoryOptions:function(){var t=this.$store.state.categories.tree;return null!=t?Object(r.d)(t).map((function(t){return{value:t.id,text:t.name}})):[]}}},o=n(82),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Товары")]),t._v(" "),n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-modal",modifiers:{"add-modal":!0}}],staticStyle:{"margin-bottom":"8px"}},[t._v("+")]),t._v(" "),n("b-table",{attrs:{fields:t.fields,items:t.items},scopedSlots:t._u([{key:"cell(category_id)",fn:function(data){return[n("b",{staticClass:"text-info"},[t._v(t._s(t.getCategoryName(data.item.category_id)))])]}},{key:"cell(actions)",fn:function(data){return[n("b-button",{attrs:{variant:"outline-secondary"},on:{click:function(e){return t.updateProduct(data.item)}}},[t._v("\n        edit")])]}}])}),t._v(" "),n("b-modal",{ref:"modal",attrs:{id:"add-modal",title:"Добавить новый товар"},on:{show:t.resetModal,hidden:t.resetModal,ok:t.handleOk}},[n("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[n("b-form-group",{attrs:{label:"Название","label-for":"name-input","invalid-feedback":"Обязательное поле",state:t.nameState}},[n("b-form-input",{attrs:{id:"name-input",state:t.nameState,required:""},model:{value:t.newItem.name,callback:function(e){t.$set(t.newItem,"name",e)},expression:"newItem.name"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Категория","label-for":"category_id","invalid-feedback":"Обязательное поле",state:t.catState}},[n("b-form-select",{attrs:{options:t.categoryOptions},model:{value:t.newItem.category_id,callback:function(e){t.$set(t.newItem,"category_id",e)},expression:"newItem.category_id"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Цена","label-for":"price-input","invalid-feedback":"Обязательное поле",state:t.priceState}},[n("b-form-input",{attrs:{id:"price-input",state:t.priceState,type:"number",required:""},model:{value:t.newItem.price,callback:function(e){t.$set(t.newItem,"price",e)},expression:"newItem.price"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Покрытие","label-for":"covering","invalid-feedback":"Обязательное поле",state:t.coveringState}},[n("b-form-input",{attrs:{id:"covering",state:t.coveringState,required:""},model:{value:t.newItem.covering,callback:function(e){t.$set(t.newItem,"covering",e)},expression:"newItem.covering"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Толщина","label-for":"depth","invalid-feedback":"Обязательное поле",state:t.depthState}},[n("b-form-input",{attrs:{id:"depth",state:t.depthState,type:"number",required:""},model:{value:t.newItem.depth,callback:function(e){t.$set(t.newItem,"depth",e)},expression:"newItem.depth"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Ширина","label-for":"width","invalid-feedback":"Обязательное поле",state:t.widthState}},[n("b-form-input",{attrs:{id:"width",state:t.widthState,type:"number",required:""},model:{value:t.newItem.width,callback:function(e){t.$set(t.newItem,"width",e)},expression:"newItem.width"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Длина","label-for":"height","invalid-feedback":"Обязательное поле",state:t.heightState}},[n("b-form-input",{attrs:{id:"height",state:t.heightState,type:"number",required:""},model:{value:t.newItem.height,callback:function(e){t.$set(t.newItem,"height",e)},expression:"newItem.height"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Ширина волны","label-for":"wave_width","invalid-feedback":"Обязательное поле",state:t.wave_widthState}},[n("b-form-input",{attrs:{id:"wave_width",state:t.wave_widthState,type:"number",required:""},model:{value:t.newItem.wave_width,callback:function(e){t.$set(t.newItem,"wave_width",e)},expression:"newItem.wave_width"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Высота волны","label-for":"wave_height","invalid-feedback":"Обязательное поле",state:t.wave_heightState}},[n("b-form-input",{attrs:{id:"wave_height",state:t.wave_heightState,type:"number",required:""},model:{value:t.newItem.wave_height,callback:function(e){t.$set(t.newItem,"wave_height",e)},expression:"newItem.wave_height"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Гарантие","label-for":"guarantee","invalid-feedback":"Обязательное поле",state:t.guaranteeState}},[n("b-form-input",{attrs:{id:"guarantee",state:t.guaranteeState,type:"number",required:""},model:{value:t.newItem.guarantee,callback:function(e){t.$set(t.newItem,"guarantee",e)},expression:"newItem.guarantee"}})],1)],1)]),t._v(" "),n("b-modal",{ref:"modal",attrs:{id:"update-modal",title:"Редактировать товар"},on:{show:t.resetModal,hidden:t.resetModal,ok:t.handleUpdateOk},model:{value:t.showUpdateModal,callback:function(e){t.showUpdateModal=e},expression:"showUpdateModal"}},[n("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleUpdateSubmit(e)}}},[n("b-form-group",{attrs:{label:"Название","label-for":"name-input","invalid-feedback":"Обязательное поле",state:t.nameState}},[n("b-form-input",{attrs:{id:"name-input",state:t.nameState,required:""},model:{value:t.updatingItem.name,callback:function(e){t.$set(t.updatingItem,"name",e)},expression:"updatingItem.name"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Категория","label-for":"category_id","invalid-feedback":"Обязательное поле",state:t.catState}},[n("b-form-select",{attrs:{options:t.categoryOptions},model:{value:t.updatingItem.category_id,callback:function(e){t.$set(t.updatingItem,"category_id",e)},expression:"updatingItem.category_id"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Цена","label-for":"price-input","invalid-feedback":"Обязательное поле",state:t.priceState}},[n("b-form-input",{attrs:{id:"price-input",type:"number",state:t.priceState,required:""},model:{value:t.updatingItem.price,callback:function(e){t.$set(t.updatingItem,"price",e)},expression:"updatingItem.price"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Покрытие","label-for":"covering","invalid-feedback":"Обязательное поле",state:t.coveringState}},[n("b-form-input",{attrs:{id:"covering",state:t.coveringState,required:""},model:{value:t.updatingItem.covering,callback:function(e){t.$set(t.updatingItem,"covering",e)},expression:"updatingItem.covering"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Толщина","label-for":"depth","invalid-feedback":"Обязательное поле",state:t.depthState}},[n("b-form-input",{attrs:{id:"depth",state:t.depthState,required:""},model:{value:t.updatingItem.depth,callback:function(e){t.$set(t.updatingItem,"depth",e)},expression:"updatingItem.depth"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Ширина","label-for":"width","invalid-feedback":"Обязательное поле",state:t.widthState}},[n("b-form-input",{attrs:{id:"width",state:t.widthState,required:""},model:{value:t.updatingItem.width,callback:function(e){t.$set(t.updatingItem,"width",e)},expression:"updatingItem.width"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Длина","label-for":"height","invalid-feedback":"Обязательное поле",state:t.heightState}},[n("b-form-input",{attrs:{id:"height",state:t.heightState,required:""},model:{value:t.updatingItem.height,callback:function(e){t.$set(t.updatingItem,"height",e)},expression:"updatingItem.height"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Ширина волны","label-for":"wave_width","invalid-feedback":"Обязательное поле",state:t.wave_widthState}},[n("b-form-input",{attrs:{id:"wave_width",state:t.wave_widthState,required:""},model:{value:t.updatingItem.wave_width,callback:function(e){t.$set(t.updatingItem,"wave_width",e)},expression:"updatingItem.wave_width"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Высота волны","label-for":"wave_height","invalid-feedback":"Обязательное поле",state:t.wave_heightState}},[n("b-form-input",{attrs:{id:"wave_height",state:t.wave_heightState,required:""},model:{value:t.updatingItem.wave_height,callback:function(e){t.$set(t.updatingItem,"wave_height",e)},expression:"updatingItem.wave_height"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Гарантие","label-for":"guarantee","invalid-feedback":"Обязательное поле",state:t.guaranteeState}},[n("b-form-input",{attrs:{id:"guarantee",state:t.guaranteeState,required:""},model:{value:t.updatingItem.guarantee,callback:function(e){t.$set(t.updatingItem,"guarantee",e)},expression:"updatingItem.guarantee"}})],1)],1)])],1)}),[],!1,null,null,null);e.default=component.exports}}]);