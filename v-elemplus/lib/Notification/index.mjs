import { defineComponent as s, resolveComponent as l, openBlock as r, createBlock as i, withCtx as c, renderSlot as p, createVNode as d, resolveDynamicComponent as u, unref as _ } from "vue";
const f = (e) => e.replace(/(A-Z)g/, "-$1").toLocaleLowerCase(), m = /* @__PURE__ */ s({
  __name: "index",
  props: {
    // 显示的图标
    icon: {
      type: String,
      default: "Bell"
    },
    // 通知数量
    value: {
      type: [String, Number],
      default: ""
    },
    // 最大值
    max: {
      type: Number,
      default: 99
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, o) => {
      const n = l("el-badge"), a = l("el-popover");
      return r(), i(a, {
        "popper-class": "notification-popper-class",
        placement: "bottom",
        width: 300,
        trigger: "click"
      }, {
        default: c(() => [
          p(t.$slots, "default", {}, void 0, !0)
        ]),
        reference: c(() => [
          d(n, {
            style: { cursor: "pointer" },
            value: e.value,
            max: e.max,
            "is-dot": e.isDot
          }, {
            default: c(() => [
              (r(), i(u(`el-icon-${_(f)(e.icon)}`)))
            ]),
            _: 1
          }, 8, ["value", "max", "is-dot"])
        ]),
        _: 3
      });
    };
  }
});
const v = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, a] of t)
    o[n] = a;
  return o;
}, x = /* @__PURE__ */ v(m, [["__scopeId", "data-v-de9018c7"]]), y = {
  install(e) {
    e.component("notification", x);
  }
};
export {
  y as default
};
