webpackHotUpdate(0,{

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "nav" } }, [
    _c("a", { staticClass: "nav-home", attrs: { tabindex: "1", href: "#" } }, [
      _vm._v("\n    home\n  ")
    ]),
    _vm._v(" "),
    _c("ul", { staticClass: "nav-items", class: { expanded: _vm.expanded } }, [
      _c(
        "li",
        [
          _c("router-link", { attrs: { to: "/" } }, [
            _vm._v("\n        work\n      ")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "li",
        [
          _c("router-link", { attrs: { to: "/about" } }, [
            _vm._v("\n        about\n      ")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "li",
        [
          _c("router-link", { attrs: { to: "/contact" } }, [
            _vm._v("\n        contact\n      ")
          ])
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("a", {
      staticClass: "nav-menu",
      attrs: { tabindex: "2", href: "#" },
      on: {
        click: function($event) {
          $event.preventDefault()
          _vm.handleToggle($event)
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(11)      .rerender("data-v-cbaa1fba", esExports)
  }
}

/***/ })

})
//# sourceMappingURL=0.2e1ae8c50265fb4a01af.hot-update.js.map