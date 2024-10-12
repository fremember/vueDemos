import { defineComponent as g, ref as i, watch as m, resolveComponent as y, openBlock as T, createElementBlock as S, createElementVNode as p, createVNode as c, mergeProps as f } from "vue";
const D = { style: { display: "flex" } }, V = { style: { "margin-right": "20px" } }, b = /* @__PURE__ */ g({
  __name: "Time",
  props: {
    // 开始时间的占位符
    startPlaceholder: {
      type: String,
      default: "请选择开始时间"
    },
    // 结束时间的占位符
    endPlaceholder: {
      type: String,
      default: "请选择结束时间"
    },
    // 开始时间的开始选择
    startTimeStart: {
      type: String,
      default: "08:00"
    },
    // 开始时间的步进
    startStep: {
      type: String,
      default: "00:30"
    },
    // 开始时间的结束选择
    startTimeEnd: {
      type: String,
      default: "24:00"
    },
    // 结束时间的开始选择
    endTimeStart: {
      type: String,
      default: "08:00"
    },
    // 结束时间的步进
    endStep: {
      type: String,
      default: "00:30"
    },
    // 结束时间的结束选择
    endTimeEnd: {
      type: String,
      default: "24:00"
    }
  },
  emits: ["startChange", "endChange"],
  setup(t, { emit: s }) {
    const n = i(""), l = i(""), d = i(!0);
    return m(() => n.value, (a) => {
      a ? (d.value = !1, s("startChange", a)) : (l.value = "", d.value = !0);
    }), m(() => l.value, (a) => {
      a && s("endChange", {
        startTime: n.value,
        endTime: a
      });
    }), (a, r) => {
      const o = y("el-time-select");
      return T(), S("div", D, [
        p("div", V, [
          c(o, f({
            modelValue: n.value,
            "onUpdate:modelValue": r[0] || (r[0] = (e) => n.value = e),
            placeholder: t.startPlaceholder,
            start: t.startTimeStart,
            step: t.startStep,
            end: t.startTimeEnd
          }, a.$attrs.startOptions), null, 16, ["modelValue", "placeholder", "start", "step", "end"])
        ]),
        p("div", null, [
          c(o, f({
            modelValue: l.value,
            "onUpdate:modelValue": r[1] || (r[1] = (e) => l.value = e),
            "min-time": n.value,
            placeholder: t.endPlaceholder,
            start: t.endTimeStart,
            step: t.endStep,
            end: t.endTimeEnd,
            disabled: d.value
          }, a.$attrs.endOptions), null, 16, ["modelValue", "min-time", "placeholder", "start", "step", "end", "disabled"])
        ])
      ]);
    };
  }
}), C = { style: { display: "flex" } }, P = { style: { "margin-right": "20px" } }, $ = /* @__PURE__ */ g({
  __name: "Date",
  props: {
    // 开始日期的占位符
    startPlaceholder: {
      type: String,
      default: "请选择开始日期"
    },
    // 结束日期的占位符
    endPlaceholder: {
      type: String,
      default: "请选择结束日期"
    },
    // 是否禁用选择今天之前的日期
    disableToday: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["startChange", "endChange"],
  setup(t, { emit: s }) {
    const n = t, l = i(null), d = i(null), a = i(!0), r = (e) => {
      if (n.disableToday)
        return e.getTime() < Date.now() - 1e3 * 60 * 60 * 24;
    }, o = (e) => {
      if (l.value)
        return e.getTime() < l.value.getTime() + 1e3 * 60 * 60 * 24;
    };
    return m(() => l.value, (e) => {
      e ? (s("startChange", e), a.value = !1) : (a.value = !0, d.value = null);
    }), m(() => d.value, (e) => {
      e && s("endChange", {
        startDate: l.value,
        endDate: e
      });
    }), (e, u) => {
      const h = y("el-date-picker");
      return T(), S("div", C, [
        p("div", P, [
          c(h, f({
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (v) => l.value = v),
            type: "date",
            placeholder: t.startPlaceholder,
            disabledDate: r
          }, e.$attrs.startOptions), null, 16, ["modelValue", "placeholder"])
        ]),
        p("div", null, [
          c(h, f({
            modelValue: d.value,
            "onUpdate:modelValue": u[1] || (u[1] = (v) => d.value = v),
            type: "date",
            placeholder: t.endPlaceholder,
            disabled: a.value,
            disabledDate: o
          }, e.$attrs.endOptions), null, 16, ["modelValue", "placeholder", "disabled"])
        ])
      ]);
    };
  }
}), k = {
  install(t) {
    t.component("f-choose-time", b), t.component("f-choose-date", $);
  }
};
export {
  k as default
};
