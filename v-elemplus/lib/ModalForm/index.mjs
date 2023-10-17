import { defineComponent as y, ref as s, watch as d, resolveComponent as u, openBlock as b, createElementBlock as g, normalizeClass as O, createVNode as c, mergeProps as h, withCtx as l, renderSlot as t } from "vue";
const B = /* @__PURE__ */ y({
  __name: "index",
  props: {
    // 是否只在可视区域内滚动
    isScroll: {
      type: Boolean,
      default: !1
    },
    visible: {
      type: Boolean,
      default: !1
    },
    options: {
      type: Array,
      required: !0
    },
    onChange: {
      type: Function
    },
    beforeUpload: {
      type: Function
    },
    onPreview: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    beforeRemove: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onExceed: {
      type: Function
    }
  },
  emits: ["update:visible"],
  setup(e, { emit: m }) {
    const a = e, n = s(a.visible), i = s(null);
    return d(() => a.visible, (o) => {
      n.value = o;
    }), d(() => n.value, (o) => {
      m("update:visible", o);
    }), (o, r) => {
      const f = u("f-form"), p = u("el-dialog");
      return b(), g("div", {
        class: O({ "choose-icon-dialog-body-height": e.isScroll })
      }, [
        c(p, h({
          modelValue: n.value,
          "onUpdate:modelValue": r[0] || (r[0] = (v) => n.value = v)
        }, o.$attrs), {
          default: l(() => [
            c(f, {
              ref_key: "form",
              ref: i,
              options: e.options,
              "label-width": "100px",
              onOnChange: e.onChange,
              onBeforeUpload: e.beforeUpload,
              onOnPreview: e.onPreview,
              onOnRemove: e.onRemove,
              onBeforeRemove: e.beforeRemove,
              onOnSuccess: e.onSuccess,
              onOnExceed: e.onExceed
            }, {
              uploadArea: l(() => [
                t(o.$slots, "uploadArea")
              ]),
              uploadTip: l(() => [
                t(o.$slots, "uploadTip")
              ]),
              _: 3
            }, 8, ["options", "onOnChange", "onBeforeUpload", "onOnPreview", "onOnRemove", "onBeforeRemove", "onOnSuccess", "onOnExceed"])
          ]),
          footer: l(() => [
            t(o.$slots, "footer", { form: i.value })
          ]),
          _: 3
        }, 16, ["modelValue"])
      ], 2);
    };
  }
}), R = {
  install(e) {
    e.component("f-modal-form", B);
  }
};
export {
  R as default
};
