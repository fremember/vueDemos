import { defineComponent as p, ref as s, onMounted as c, resolveComponent as l, openBlock as i, createBlock as m, mergeProps as u } from "vue";
const f = /* @__PURE__ */ p({
  __name: "index",
  props: {
    // 进度条进度
    percentage: {
      type: Number,
      required: !0
    },
    // 是否有动画效果
    isAnimate: {
      type: Boolean,
      default: !1
    },
    // 动画时长(毫秒)
    time: {
      type: Number,
      default: 3e3
    }
  },
  setup(n) {
    const e = n, t = s(0);
    return c(() => {
      if (e.isAnimate) {
        const r = Math.ceil(e.time / e.percentage), o = setInterval(() => {
          t.value += 1, t.value >= e.percentage && (t.value = e.percentage, clearInterval(o));
        }, r);
      }
    }), (r, o) => {
      const a = l("el-progress");
      return i(), m(a, u({ percentage: t.value }, r.$attrs), null, 16, ["percentage"]);
    };
  }
}), d = {
  install(n) {
    n.component("f-progress", f);
  }
};
export {
  d as default
};
