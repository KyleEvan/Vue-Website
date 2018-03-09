webpackHotUpdate(0,{

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(22);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(380);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Home = __webpack_require__(381);

var _Home2 = _interopRequireDefault(_Home);

var _Work = __webpack_require__(385);

var _Work2 = _interopRequireDefault(_Work);

var _About = __webpack_require__(388);

var _About2 = _interopRequireDefault(_About);

var _Contact = __webpack_require__(390);

var _Contact2 = _interopRequireDefault(_Contact);

var _NotFound = __webpack_require__(392);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _WorkCareers = __webpack_require__(394);

var _WorkCareers2 = _interopRequireDefault(_WorkCareers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: _Home2.default,
    meta: { title: 'Home | KP' }
  }, {
    path: '/work',
    name: 'Work',
    component: _Work2.default,
    meta: { title: 'Work | KP' },
    children: [{
      path: 'careers-redesign',
      component: _WorkCareers2.default,
      meta: { title: 'Work | KP' }
    }]
  }, {
    path: '/about',
    name: 'About',
    component: _About2.default,
    meta: { title: 'About | KP' }
  }, {
    path: '/contact',
    name: 'Contact',
    component: _Contact2.default,
    meta: { title: 'Contact | KP' }
  }, {
    path: '*',
    name: 'NotFound',
    component: _NotFound2.default
  }],
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

/***/ })

})
//# sourceMappingURL=0.1608439abf9b63e75edb.hot-update.js.map