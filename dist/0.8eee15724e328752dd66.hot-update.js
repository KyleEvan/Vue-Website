webpackHotUpdate(0,{

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gsap = __webpack_require__(147);

var _Nav = __webpack_require__(398);

var _Nav2 = _interopRequireDefault(_Nav);

var _Scene = __webpack_require__(401);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import router from './router.js'

// Components
exports.default = {
  name: 'app',
  data: function data() {
    return {
      tl: new _gsap.TimelineLite({ paused: true })
    };
  },

  components: {
    "navigation": _Nav2.default,
    "scene": _Scene2.default
  },
  methods: {
    beforeEnter: function beforeEnter(el) {},
    enter: function enter(el, done) {
      console.log("transition entering");
    },
    leave: function leave(el, done) {
      console.log("transition leaving");
      // this.tl.to({
      //
      // })
      // this.tl.onComplete = console.log("heyhey");
      done();
    }
  },
  mounted: function mounted() {
    this.tl.paused(true);
  },

  watch: {
    $route: function $route(to, from) {
      var toDepth = to.path.split('/').length;
      var fromDepth = from.path.split('/').length;
      console.log(toDepth);
      console.log(fromDepth);
      // if(toDepth < fromDepth) console.log('higher level');
      // if(toDepth > fromDepth) console.log('lower level');
      // if(toDepth == fromDepth) console.log('same level');
      toDepth < fromDepth ? console.log('higher level') : console.log('lower level');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("navigation"),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { css: false },
          on: {
            "before-enter": _vm.beforeEnter,
            enter: _vm.enter,
            leave: _vm.leave
          }
        },
        [_c("router-view", { staticClass: "main" })],
        1
      ),
      _vm._v(" "),
      _c("scene")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(10)      .rerender("data-v-1918dc5c", esExports)
  }
}

/***/ })

})
//# sourceMappingURL=0.8eee15724e328752dd66.hot-update.js.map