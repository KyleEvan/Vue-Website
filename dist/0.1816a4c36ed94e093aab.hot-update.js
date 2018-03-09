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
  created: function created() {

    //  SVG Feature Detection
    var supportsCSSTransformsOnSVG = function () {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 2 2');
      Object.assign(svg.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '2px',
        height: '2px'
      });
      svg.innerHTML = '<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';
      document.body.appendChild(svg);
      var result = document.elementFromPoint(1, 1) !== svg;
      svg.parentNode.removeChild(svg);
      console.log("SVG feature detection:");
      console.log(result);
      return result;
    }();
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
      if (toDepth < fromDepth) console.log('higher level');
      if (toDepth > fromDepth) console.log('lower level');
      if (toDepth == fromDepth) console.log('same level');
      // toDepth < fromDepth ? console.log('higher level') : console.log('lower level');
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

/***/ })

})
//# sourceMappingURL=0.1816a4c36ed94e093aab.hot-update.js.map