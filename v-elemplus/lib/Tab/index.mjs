import { defineComponent as N, resolveComponent as a, openBlock as t, createElementBlock as n, createVNode as k, withCtx as u, Fragment as m, renderList as y, createBlock as h, createCommentVNode as l, createElementVNode as p, toDisplayString as r, createTextVNode as V, normalizeClass as $, resolveDynamicComponent as z, unref as B } from "vue";
const T = (o) => o.replace(/(A-Z)g/, "-$1").toLocaleLowerCase(), w = { class: "list-tabs__item" }, D = ["onClick"], E = {
  key: 0,
  class: "avatar"
}, q = { class: "content" }, F = {
  key: 0,
  class: "title"
}, O = {
  key: 1,
  class: "time"
}, S = {
  key: 2,
  class: "time"
}, Z = { class: "actions" }, j = ["onClick"], G = {
  key: 0,
  class: "a-icon"
}, H = { class: "a-text" }, J = /* @__PURE__ */ N({
  __name: "index",
  props: {
    // 列表的内容
    list: {
      type: Array,
      required: !0
    },
    // 操作的内容
    actions: {
      type: Array,
      default: () => []
    }
  },
  emits: ["clickItem", "clickAction"],
  setup(o, { emit: _ }) {
    const i = (c, d) => {
      _("clickItem", { item: c, index: d });
    }, v = (c, d) => {
      _("clickAction", { item: c, index: d });
    };
    return (c, d) => {
      const b = a("el-avatar"), g = a("el-tag"), x = a("el-scrollbar"), C = a("el-tab-pane"), A = a("el-tabs");
      return t(), n("section", w, [
        k(A, null, {
          default: u(() => [
            (t(!0), n(m, null, y(o.list, (f, I) => (t(), h(C, {
              key: I,
              label: f.title
            }, {
              default: u(() => [
                k(x, { "max-height": "300px" }, {
                  default: u(() => [
                    (t(!0), n(m, null, y(f.content, (e, s) => (t(), n("div", {
                      class: "container",
                      onClick: (L) => i(e, s),
                      key: s
                    }, [
                      e.avatar ? (t(), n("div", E, [
                        k(b, {
                          size: "small",
                          src: e.avatar
                        }, null, 8, ["src"])
                      ])) : l("", !0),
                      p("div", q, [
                        e.title ? (t(), n("div", F, [
                          p("div", null, r(e.title), 1),
                          e.tag ? (t(), h(g, {
                            key: 0,
                            size: "small",
                            type: e.tagType
                          }, {
                            default: u(() => [
                              V(r(e.tag), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])) : l("", !0)
                        ])) : l("", !0),
                        e.desc ? (t(), n("div", O, r(e.desc), 1)) : l("", !0),
                        e.time ? (t(), n("div", S, r(e.time), 1)) : l("", !0)
                      ])
                    ], 8, D))), 128)),
                    p("div", Z, [
                      (t(!0), n(m, null, y(o.actions, (e, s) => (t(), n("div", {
                        class: $(["a-item", { border: s !== o.actions.length }]),
                        key: s,
                        onClick: (L) => v(e, s)
                      }, [
                        e.icon ? (t(), n("div", G, [
                          (t(), h(z(`el-icon-${B(T)(e.icon)}`)))
                        ])) : l("", !0),
                        p("div", H, r(e.text), 1)
                      ], 10, j))), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["label"]))), 128))
          ]),
          _: 1
        })
      ]);
    };
  }
});
const K = (o, _) => {
  const i = o.__vccOpts || o;
  for (const [v, c] of _)
    i[v] = c;
  return i;
}, M = /* @__PURE__ */ K(J, [["__scopeId", "data-v-ad72e285"]]), Q = {
  install(o) {
    o.component("f-tab", M);
  }
};
export {
  Q as default
};
