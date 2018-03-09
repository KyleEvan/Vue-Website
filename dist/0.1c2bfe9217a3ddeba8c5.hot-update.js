webpackHotUpdate(0,{

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gsap = __webpack_require__(143);

var _TopNav = __webpack_require__(388);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _Scene = __webpack_require__(391);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
exports.default = {
  name: 'app',
  data: function data() {
    return {
      tl: new _gsap.TimelineLite({ paused: true })
    };
  },

  components: {
    "top-nav": _TopNav2.default,
    "scene": _Scene2.default
  },
  methods: {
    beforeEnter: function beforeEnter(el) {},
    enter: function enter(el, done) {
      var to = this.$route;
      console.log(to);
      console.log("transition entering");
    },
    leave: function leave(el, done) {
      var from = this.$route;
      console.log(from);
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

/***/ })

})
//# sourceMappingURL=0.1c2bfe9217a3ddeba8c5.hot-update.js.map