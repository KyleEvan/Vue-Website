webpackHotUpdate(0,{

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gsap = __webpack_require__(395);

var _charming = __webpack_require__(396);

var _charming2 = _interopRequireDefault(_charming);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

Color Palette
  https://coolors.co/7edad4-ff9393-ffec94-f9fff9-63676c
  https://coolors.co/7edad4-ffa69e-ffec94-707c89-f9fff9

  https://coolors.co/85e5e0-ffa69e-ffeb93-7b8a96-ffe5e5
*/
var colors = ['#ACE7E3', '#FFC6C1', '#FFF2BA'
// '#F9FFF9' '#63676c' '#FFA69E'
];

/*

  Utility functions

*/
// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Assigns the passed element a new width and height attribute
// equal to that of the window. After returns the element
function setWindowDimensions(el) {

  // if (obj instanceof Element || obj.ownerDocument == document) {
  el.setAttribute('width', window.innerWidth);
  el.setAttribute('height', window.innerHeight);
  if (el.tagName === 'svg') el.setAttribute('viewbox', "0 0 " + window.innerWidth + " " + window.innerHeight);
  // }
  return el;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIndex(length) {
  var item = Math.floor(Math.random() * length);
  return item;
}

/*

  Classes:
  Scene, Name, Letter, Shape

*/

var Scene = function () {
  // #scene
  function Scene(scene, name) {
    _classCallCheck(this, Scene);

    // scene.ready is true after the initial animation has fully completed
    this.ready = false;
    // scene.interactive dictates whether mousemove events should be tracked for shape translations
    this.interactive = false;

    this.sceneSize = 2;
    this.bounds = undefined;

    this.name = undefined;
    // DOM element references
    this.DOM = {
      el: scene,
      children: {
        name: {
          el: name
        },
        svg: {
          el: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
          class: "shapes"
        }
      },
      parent: scene.parentNode
    };
    // virtual camera of the scene, used for calculating 3d perspectives
    this.camera = {
      perspective: 500,
      maxZ: 400,
      fov: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      center: {
        x: undefined,
        y: undefined
      },
      location: {
        x: undefined,
        y: undefined
      },
      config: function config() {
        this.updateFov();
        this.updateLoc(this.center.x, this.center.y);
      },
      updateLoc: function updateLoc(newX, newY) {
        this.location.x = newX;
        this.location.y = newY;
      },
      updateFov: function updateFov() {
        this.fov.width = window.innerWidth;
        this.fov.height = window.innerHeight;
        this.center.x = this.fov.width / 2;
        this.center.y = this.fov.height / 2;
      }
    };

    // GSAP TimelineLite
    this.animations = {
      scene: this,
      initDelay: 1000,
      tl: new _gsap.TimelineLite(), //{ paused: true }
      showLetters: function showLetters(targets) {
        // this.tl.eventCallback("onUpdate", this.update);
        this.tl.staggerFromTo(targets, 1, {
          opacity: 0,
          y: "100%"
        }, {
          opacity: 1,
          y: "0%",
          ease: Elastic.easeOut.config(1, 0.4)
        }, .1);
      },
      hideLetters: function hideLetters() {
        var targets = this.scene.name.letterEls;
        targets = Array.from(targets).reverse();
        this.tl.staggerTo(targets, .6, {
          opacity: 0,
          y: "100%",
          ease: Elastic.easeIn.config(1, 0.75)
        }, .1);
      },
      showShapes: function showShapes(targets) {
        var _this = this;

        for (var i = 0; i < targets.length; i++) {
          var target = targets[i];
          this.tl.to(target, .9, {
            opacity: .75,
            x: getRandomInt(this.scene.bounds.left, this.scene.bounds.right),
            y: getRandomInt(this.scene.bounds.top, this.scene.bounds.bottom),
            scale: 1,
            ease: Expo.easeOut
          }, "-=.89");
          if (i == targets.length - 1) {
            (function () {
              var scene = _this.scene;
              setTimeout(function () {
                scene.animationCompleted();
              }, 1000);
            })();
          }
        }
      },
      moveShapes: function moveShapes(mouseMove) {

        var scene = this.scene;
        var shapes = scene.name.shapes;
        shapes = Array.from(shapes).reverse();

        shapes.forEach(function (shape, index) {
          var projectedXY = void 0,
              newX = void 0,
              newY = void 0;
          if (mouseMove) {
            projectedXY = [shape.calc3DLocation(scene.camera)[0] - shape.projectedXY[0], shape.calc3DLocation(scene.camera)[1] - shape.projectedXY[1]];
            newX = shape.getsetTransform(projectedXY)[0];
            newY = shape.getsetTransform(projectedXY)[1];
          } else {
            newX = shape.getsetTransform([0, 0])[0];
            newY = shape.getsetTransform([0, 0])[1];
          }

          TweenLite.to(shape.el, 10, {
            opacity: 1,
            x: newX,
            y: newY,
            ease: Expo.easeOut
          }).delay(index * .02).smoothChildTiming = true;
        });
      },
      explodeShapes: function explodeShapes(targets) {
        for (var i = 0; i < targets.length; i++) {
          var target = targets[i];
          console.log(target);
        }
      }
    };

    this.init();
    this.initEvents();
  }

  _createClass(Scene, [{
    key: "init",
    value: function init() {
      this.createScene();
      this.name = new Name(this);
      console.log(this.name);
      this.playScene();
      console.log("Scene created");
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var scene = this;
      // Resize event:
      // Debounces event every 100ms, resizes scene element to window size
      var handleResize = debounce(function () {
        setWindowDimensions(scene.DOM.children.svg.el);
        scene.setBoundaries();
        scene.camera.config();
        scene.animations.moveShapes(false);
      }, 50);
      window.addEventListener('resize', handleResize);

      // Mousemove event:
      // Tracks mouse to calculate projection perspective of svg shapes
      var handleMouseMove = throttle(function (e) {
        if (scene.interactive) {
          scene.camera.updateLoc(e.clientX, e.clientY);
          scene.animations.moveShapes(true);
        }
      }, 150);
      window.addEventListener('mousemove', handleMouseMove, false);

      // Mouseenter event:
      // Toggle scene interactivity
      var handleMouseEnter = function handleMouseEnter(e) {
        if (scene.ready) {
          if (!scene.interactive) scene.toggleInteractive();
        }
      };
      this.DOM.parent.addEventListener('mouseenter', handleMouseEnter);

      // Mouseleave event:
      // Toggle scene interactivity and reset shapes to original positions
      var handleMouseLeave = function handleMouseLeave(e) {
        if (scene.ready) {
          if (scene.interactive) {
            scene.toggleInteractive();
            scene.camera.updateLoc(scene.camera.center.x, scene.camera.center.y);
            scene.animations.moveShapes(false);
          }
        }
      };
      this.DOM.parent.addEventListener('mouseleave', handleMouseLeave);

      // Click event:
      var handleClick = function handleClick(e) {
        if (scene.ready) {
          if (scene.interactive) {
            console.log("clicking!");
            scene.animations.hideLetters();
          }
        }
      };
      this.DOM.parent.addEventListener('click', handleClick);
    }
  }, {
    key: "setBoundaries",
    value: function setBoundaries() {
      var el = this.DOM.el;
      el = el.getBoundingClientRect();
      this.bounds = {
        top: el.bottom / -2,
        right: el.right / 2,
        bottom: el.bottom / 2,
        left: el.right / -2
      };
    }
  }, {
    key: "createScene",
    value: function createScene() {
      // Add class to svg
      // Insert svg scene before h1#name to ensure the name is layered on top
      var scene = this.DOM;
      scene.children.svg.el.classList.add(scene.children.svg.class);
      scene.el.insertBefore(scene.children.svg.el, scene.children.name.el);
      setWindowDimensions(scene.children.svg.el);
      this.setBoundaries();
      this.camera.config();
    }
  }, {
    key: "playScene",
    value: function playScene() {
      var scene = this;
      var name = this.name;
      var animations = this.animations;

      setTimeout(function () {

        animations.showLetters(name.letterEls);
        animations.showShapes(name.shapeEls);
      }, animations.initDelay);
    }
  }, {
    key: "animationCompleted",
    value: function animationCompleted() {
      console.log("scene animation completed");
      console.log(this);
      this.name.shapes.forEach(function (shape, i) {
        console.log("created: " + i);
        shape.getsetTransform();
      });
      this.toggleScene();
    }
  }, {
    key: "toggleInteractive",
    value: function toggleInteractive() {
      this.interactive = !this.interactive;
      if (this.interactive) {
        window.focus();
      } else {
        window.blur();
      }
    }
  }, {
    key: "toggleScene",
    value: function toggleScene() {
      this.toggleInteractive();
      this.ready = !this.ready;
      console.log("scene is ready");
    }
  }]);

  return Scene;
}();

var Name = function () {
  // #name
  function Name(scene) {
    _classCallCheck(this, Name);

    this.scene = scene;
    this.el = scene.DOM.children.name.el;
    this.letterEls = undefined;
    this.shapeEls = undefined;
    this.letters = [];
    this.shapes = [];

    this.init(this.scene);
  }

  _createClass(Name, [{
    key: "init",
    value: function init(scene) {
      // Wraps each letter in a span with a new class 'letter#'
      (0, _charming2.default)(this.el, { classPrefix: 'letter' });
      // Create letters and assign the elements to animations
      this.createLetters(scene);
    }
  }, {
    key: "createLetters",
    value: function createLetters(scene) {
      var letters = scene.DOM.children.name.el.childNodes;

      this.letterEls = letters;
      // animations.letters.show.targets = animations.letters.hide.targets = letters;

      letters = Array.from(letters);

      var shapes = [];
      letters.forEach(function (el, index) {
        letters[index] = new Letter(scene, el);

        var letter = letters[index];
        for (var i = 0; i < letter.totalShapes; i++) {
          shapes.push(letter.shapes[i]);
        }
      });

      this.shapeEls = shapes.map(function (s) {
        return s.el;
      });
      // animations.shapes.targets = shapes.map(s => s.el);


      this.letters = letters;
      this.shapes = shapes;

      // Sort shapes array order based on z axis location and add them to the dom
      this.shapes.sort(function (a, b) {
        return a.z - b.z;
      });
      this.shapes.forEach(function (shape) {
        shape.parent.appendChild(shape.el);
      });
    }
  }]);

  return Name;
}();

var Letter = function () {
  function Letter(scene, el) {
    _classCallCheck(this, Letter);

    this.el = el;
    this.scene = scene;
    this.shapes = [];
    this.totalShapes = 5;
    this.init(scene);
  }

  _createClass(Letter, [{
    key: "init",
    value: function init() {
      this.createShapes();
      console.log("Letter created");
    }
  }, {
    key: "createShapes",
    value: function createShapes() {
      for (var i = 0; i < this.totalShapes; i++) {
        this.shapes.push(new Shape(this.scene, this.el, this.el.getBoundingClientRect()));
      }
    }
  }]);

  return Letter;
}();

var Shape = function () {
  function Shape(scene, letter, letterProps) {
    _classCallCheck(this, Shape);

    this.scene = scene;
    this.el = undefined;
    this.parent = scene.DOM.children.svg.el;
    this.letter = {
      el: letter,
      props: letterProps
    };
    this.scale = getRandomInt(letterProps.width * .1, letterProps.width * .8); // scale will be 10% and 100% of the letter's width
    this.x = letterProps.left + letterProps.width / 2;
    this.y = letterProps.top - letterProps.height / 2;
    this.z = this.scale / letterProps.width;
    this.projectedXY = this.calc3DLocation(this.scene.camera);
    this.relationalValues = {
      // Properties relative to their associated letter, values are percentage based
      x: (this.x - letterProps.left) / letterProps.width,
      y: (this.y - (letterProps.top - letterProps.height)) / letterProps.height,
      scale: this.scale / letterProps.width,
      // Properties relative to the window window dimensions
      translateX: undefined,
      translateY: undefined
    };
    this.transforms = undefined;
    this.colors = colors;
    this.types = [{
      el: 'circle',
      cx: this.projectedXY[0],
      cy: this.projectedXY[1],
      r: this.scale / 2,
      stroke: undefined,
      strokeWidth: undefined,
      fill: this.colors[randomIndex(this.colors.length)]
    }, {
      el: 'polygon',
      points: this.getPoints(this.projectedXY[0], this.projectedXY[1], this.scale),
      stroke: undefined,
      strokeWidth: undefined,
      fill: this.colors[randomIndex(this.colors.length)]
      // {
      //   el: 'rect',
      //   x: this.x,
      //   y: this.y,
      //   width: this.scale,
      //   height: this.scale,
      //   stroke: undefined,
      //   strokeWidth: undefined,
      //   fill: this.colors[randomIndex(this.colors.length)]
      // },
    }];

    this.init();
    this.initEvents();
  }

  _createClass(Shape, [{
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      // Create an observer to monitor the parent svg container's attributes
      // In this case, the svg container updates its width and height attributes on window resize
      // This tells the Shape to updateShape() when that happens
      var callback = function callback() {
        return _this2.updateShape();
      };
      var observer = new MutationObserver(callback);
      observer.observe(this.parent, { attributes: true });
    }
  }, {
    key: "init",
    value: function init() {
      // shape is randomly selected from the array of different shapes (this.types)
      var shape = this.types[randomIndex(this.types.length)];
      // Shape element is created and assigned attributes
      // corresponding to the props of the type of shape
      // if a prop is undefined it is not added to the element
      for (var prop in shape) {
        if (shape[prop]) {
          if (prop === 'el') {
            this.el = document.createElementNS("http://www.w3.org/2000/svg", shape[prop]);
          } else {
            if (this.el) {
              this.el.setAttribute(prop, shape[prop]);
            } else {
              console.log("Element is undefined");
            }
          }
        }
      }
      // console.log("this.x = "+this.x +", projectedX = "+this.projectedXY.x+", Camera perspective = "+this.scene.camera.perspective+", this.z = "+(this.scene.camera.perspective - this.z*this.scene.camera.maxZ)+", Camera Location X = "+this.scene.camera.location.x);
      console.log("Shape created");
    }
  }, {
    key: "calc3DLocation",
    value: function calc3DLocation(camera) {
      /*
          Bx = Ax*(Bz/Az)
      */
      var Bx = void 0,
          Bz = void 0,
          Ax = void 0,
          Az = void 0,
          By = void 0,
          Ay = void 0,
          newX = void 0,
          newY = void 0;

      Bz = camera.perspective;
      Az = camera.perspective - this.z * camera.maxZ;

      Bx = this.x - camera.location.x;
      Ax = Bx / (Bz / Az);
      newX = camera.location.x + Ax;

      By = this.y - camera.location.y;
      Ay = By / (Bz / Az);
      newY = camera.location.y + Ay;

      return [newX, newY];
    }
  }, {
    key: "updateShape",
    value: function updateShape() {
      if (this.scene.ready) {
        var letter = this.letter.el.getBoundingClientRect();
        this.letter.props = letter;
        this.x = letter.left + letter.width * this.relationalValues.x;
        this.y = letter.top + letter.height * this.relationalValues.y;
        this.scale = letter.width * this.relationalValues.scale;
        this.transforms = [this.relationalValues.translateX * this.scene.bounds.right, this.relationalValues.translateY * this.scene.bounds.bottom];
        this.projectedXY = this.calc3DLocation(this.scene.camera);
        // If this Shape element has points, recalculate those values
        // Otherwise, its a circle and the attributes can be outright updated with
        // the Shape's new coordinates and scale values
        if (this.el.hasAttribute("points")) {
          var points = this.getPoints(this.projectedXY[0], this.projectedXY[1], this.scale);
          this.el.setAttribute("points", points);
        } else if (this.el.hasAttribute("cx", "cy")) {
          this.el.setAttribute("cx", this.projectedXY[0]);
          this.el.setAttribute("cy", this.projectedXY[1]);
          this.el.setAttribute("r", this.scale / 2);
        } else {
          this.el.setAttribute("x", this.projectedXY[0]);
          this.el.setAttribute("y", this.projectedXY[1]);
        }
        this.getsetTransform([0, 0]);
      } else {
        console.log("scene not ready");
      }
    }
  }, {
    key: "getPoints",
    value: function getPoints(x, y, scale) {
      // This configuration of points creates a triangle shape
      var points = x + " " + y + " " + (x + scale * .5) + " " + (y + scale) + " " + (x - scale * .5) + " " + (y + scale);
      return points;
    }
  }, {
    key: "getsetTransform",
    value: function getsetTransform(projectedXY) {
      if (!this.transforms) {

        // if(this.el.hasAttribute("transform")){
        var matrix = this.el.getAttribute("transform");
        if (matrix) {
          // let matrixCopy = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
          var _matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
          var _matrixValue = [];
          _matrixValue = _matrixCopy.split(/[ ,]+/).map(Number);
          this.transforms = _matrixValue.slice(4);
          this.relationalValues.translateX = this.transforms[0] / this.scene.bounds.right;
          this.relationalValues.translateY = this.transforms[1] / this.scene.bounds.bottom;
          // KEEP FOR REFERENCE & Potential future application
          // (Converts computedStyle of element and turns into translateX translateY values)
          // https://stackoverflow.com/questions/3432446/how-to-read-individual-transform-values-in-javascript
          // let computedStyle = window.getComputedStyle(this.el, null); // "null" means this is not a pesudo style.
          // You can retrieve the CSS3 matrix string by the following method.
          // let matrix = computedStyle.getPropertyValue('transform')
          // || computedStyle.getPropertyValue('-moz-transform')
          // || computedStyle.getPropertyValue('-webkit-transform')
          // || computedStyle.getPropertyValue('-ms-transform')
          // || computedStyle.getPropertyValue('-o-transform');
          // let matrixValue = [];
          // let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
          // matrixValue = matrixCopy.split(/\s*,\s*/).map(Number);
          // this.transforms = matrixValue.slice(4);
          // this.relationalValues.translateX = this.transforms[0]/(window.innerWidth*.45);
          // this.relationalValues.translateY = this.transforms[1]/(window.innerHeight*.45);
          //
        } else {
          console.log(matrix);
        }
        // let matrixCopy = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
        var matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
        var matrixValue = [];
        matrixValue = matrixCopy.split(/[ ,]+/).map(Number);
        this.transforms = matrixValue.slice(4);
        this.relationalValues.translateX = this.transforms[0] / this.scene.bounds.right;
        this.relationalValues.translateY = this.transforms[1] / this.scene.bounds.bottom;
        // KEEP FOR REFERENCE & Potential future application
        // (Converts computedStyle of element and turns into translateX translateY values)
        // https://stackoverflow.com/questions/3432446/how-to-read-individual-transform-values-in-javascript
        // let computedStyle = window.getComputedStyle(this.el, null); // "null" means this is not a pesudo style.
        // You can retrieve the CSS3 matrix string by the following method.
        // let matrix = computedStyle.getPropertyValue('transform')
        // || computedStyle.getPropertyValue('-moz-transform')
        // || computedStyle.getPropertyValue('-webkit-transform')
        // || computedStyle.getPropertyValue('-ms-transform')
        // || computedStyle.getPropertyValue('-o-transform');
        // let matrixValue = [];
        // let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
        // matrixValue = matrixCopy.split(/\s*,\s*/).map(Number);
        // this.transforms = matrixValue.slice(4);
        // this.relationalValues.translateX = this.transforms[0]/(window.innerWidth*.45);
        // this.relationalValues.translateY = this.transforms[1]/(window.innerHeight*.45);
        //
      }
      if (projectedXY) {
        var newProjectedXY = [];
        this.transforms.forEach(function (transform, index) {
          return newProjectedXY.push(transform + projectedXY[index]);
        });
        return newProjectedXY;
      }
    }
  }]);

  return Shape;
}();

exports.ShapeScene = function (scene, name) {
  var shapeScene = void 0;
  shapeScene = new Scene(scene, name);
  console.log(shapeScene);

  // document.addEventListener('readystatechange', function(){
  //   if (document.readyState == "interactive"){
  //     console.log("interactive");
  //   }
  //   else if (document.readyState == "complete"){
  //     console.log("document ready complete");
  //   }
  // });
  //
  // document.addEventListener('DOMContentLoaded', () => shapeScene = new Scene(scene, name));

  return shapeScene;
};

/***/ })

})
//# sourceMappingURL=0.66998023b32790fdd24a.hot-update.js.map