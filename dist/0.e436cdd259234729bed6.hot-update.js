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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
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

// import router from './router.js'

// Components


exports.default = _defineProperty({
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
  created: function created() {},
  mounted: function mounted() {
    this.tl.paused(true);
  },

  watch: {
    $route: function $route(to, from) {
      document.title = to.meta.title;

      var toDepth = to.path.split('/').length;
      var fromDepth = from.path.split('/').length;
      console.log(to);
      // console.log(fromDepth);
      if (toDepth < fromDepth) console.log('higher level');
      if (toDepth > fromDepth) console.log('lower level');
      if (toDepth == fromDepth) console.log('same level');
      // toDepth < fromDepth ? console.log('higher level') : console.log('lower level');
    }
  }
}, 'created', function created() {
  console.log(this.$route);
  // document.title = $route
});

/***/ })

})
//# sourceMappingURL=0.e436cdd259234729bed6.hot-update.js.map