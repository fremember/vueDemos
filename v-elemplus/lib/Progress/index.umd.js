(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue")):typeof define=="function"&&define.amd?define(["vue"],n):(e=typeof globalThis<"u"?globalThis:e||self,e.index=n(e.Vue))})(this,function(e){"use strict";const n=e.defineComponent({__name:"index",props:{percentage:{type:Number,required:!0},isAnimate:{type:Boolean,default:!1},time:{type:Number,default:3e3}},setup(r){const t=r,o=e.ref(0);return e.onMounted(()=>{if(t.isAnimate){const s=Math.ceil(t.time/t.percentage),i=setInterval(()=>{o.value+=1,o.value>=t.percentage&&(o.value=t.percentage,clearInterval(i))},s)}}),(s,i)=>{const p=e.resolveComponent("el-progress");return e.openBlock(),e.createBlock(p,e.mergeProps({percentage:o.value},s.$attrs),null,16,["percentage"])}}});return{install(r){r.component("f-progress",n)}}});