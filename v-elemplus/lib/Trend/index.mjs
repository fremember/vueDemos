import { defineComponent as p, useSlots as f, computed as C, openBlock as n, createElementBlock as s, createElementVNode as a, normalizeStyle as d, unref as l, renderSlot as g, toDisplayString as v, createBlock as u, resolveDynamicComponent as i } from "vue";
const y = (e) => e.replace(/(A-Z)g/, "-$1").toLocaleLowerCase(), x = { class: "trend" }, m = { key: 1 }, S = { class: "icon" }, w = /* @__PURE__ */ p({
  __name: "index",
  props: {
    // 标记当前趋势是上升(up)还是下降(down)
    type: {
      type: String,
      default: "up"
    },
    // 上升趋势显示的图标
    upIcon: {
      type: String,
      default: "ArrowUp"
    },
    // 下降趋势显示的图标
    downIcon: {
      type: String,
      default: "ArrowDown"
    },
    // 趋势显示的文字：1:父组件传递过来的数据，2:插槽
    text: {
      type: String,
      default: "文字"
    },
    // 颜色翻转只在默认的颜色下生效 如果使用了自定义颜色 这个属性就不生效了
    reverseColor: {
      type: Boolean,
      default: !1
    },
    // 上升趋势图标颜色
    upIconColor: {
      type: String,
      default: "#f5222d"
    },
    // 下降趋势图标颜色
    downIconColor: {
      type: String,
      default: "#52c41a"
    },
    // 上升趋势文字颜色
    upTextColor: {
      type: String,
      default: "rgb(0,0,0)"
    },
    // 下降趋势的文字颜色
    downTextColor: {
      type: String,
      default: "rgb(0,0,0)"
    }
  },
  setup(e) {
    const t = e, o = f();
    let r = C(() => t.type == "up" ? t.upTextColor : t.downTextColor);
    return (c, k) => (n(), s("div", x, [
      a("div", {
        class: "text",
        style: d({ color: l(r) })
      }, [
        l(o).default ? g(c.$slots, "default", { key: 0 }, void 0, !0) : (n(), s("div", m, v(e.text), 1))
      ], 4),
      a("div", S, [
        e.type === "up" ? (n(), u(i(`el-icon-${l(y)(e.upIcon)}`), {
          key: 0,
          style: d({ color: e.reverseColor ? "#52c41a" : e.upIconColor })
        }, null, 8, ["style"])) : (n(), u(i(`el-icon-${l(y)(e.downIcon)}`), {
          key: 1,
          style: d({ color: e.reverseColor ? "#f5222d" : e.downIconColor })
        }, null, 8, ["style"]))
      ])
    ]));
  }
});
const _ = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, c] of t)
    o[r] = c;
  return o;
}, I = /* @__PURE__ */ _(w, [["__scopeId", "data-v-3d647567"]]), h = {
  install(e) {
    e.component("f-trend", I);
  }
};
export {
  h as default
};
