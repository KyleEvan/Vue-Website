webpackHotUpdate(0,{

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(105);

__webpack_require__(375);

__webpack_require__(376);

var _vue = __webpack_require__(22);

var _vue2 = _interopRequireDefault(_vue);

var _router = __webpack_require__(379);

var _router2 = _interopRequireDefault(_router);

var _App = __webpack_require__(397);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Vue.config.productionTip = false

// SVG Feature Detection
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

_vue2.default.mixin({
  data: function data() {
    return {
      supportsSVGCSSTransforms: supportsCSSTransformsOnSVG
    };
  }
});

new _vue2.default({
  el: '#app',
  router: _router2.default,
  template: '<App/>',
  components: { App: _App2.default
    // mixins: [mixins]
  } });

/***/ })

})
//# sourceMappingURL=0.8a074f2b25c58459ccd0.hot-update.js.map