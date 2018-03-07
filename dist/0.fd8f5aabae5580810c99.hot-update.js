webpackHotUpdate(0,{

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(30);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(375);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Work = __webpack_require__(376);

var _Work2 = _interopRequireDefault(_Work);

var _About = __webpack_require__(382);

var _About2 = _interopRequireDefault(_About);

var _Contact = __webpack_require__(384);

var _Contact2 = _interopRequireDefault(_Contact);

var _NotFound = __webpack_require__(411);

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  mode: 'history',
  routes: [{
    path: '/work',
    name: 'Work',
    component: _Work2.default
  }, {
    path: '/about',
    name: 'About',
    component: _About2.default
  }, {
    path: '/contact',
    name: 'Contact',
    component: _Contact2.default
  }, {
    path: '*',
    name: 'NotFound',
    component: _NotFound2.default
  }],
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  // name: 'notFound',
  data: function data() {
    return {
      message: "404 page not found"
    };
  }
};

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bceabd78_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NotFound_vue__ = __webpack_require__(412);
var disposed = false
var normalizeComponent = __webpack_require__(45)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NotFound_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bceabd78_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NotFound_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\app\\components\\NotFound.vue"

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(11)
  hotAPI.install(__webpack_require__(30), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bceabd78", Component.options)
  } else {
    hotAPI.reload("data-v-bceabd78", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Oops!")]),
    _vm._v(" "),
    _c("p", [_vm._v("Something went wrong")]),
    _vm._v(" "),
    _c("p", [_vm._v(_vm._s(_vm.message))])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(11)      .rerender("data-v-bceabd78", esExports)
  }
}

/***/ })

})
//# sourceMappingURL=0.fd8f5aabae5580810c99.hot-update.js.map