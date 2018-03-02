"use strict";

import { TimelineLite } from "gsap";
import charming from 'charming';

/*

Color Palette
  https://coolors.co/7edad4-ff9393-ffec94-f9fff9-63676c

*/
const colors = [
  '#7EDAD4', '#FF9393', '#FFEC94'
  // '#F9FFF9' '#63676c'
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
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
      };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
    };
};

// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
    deferTimer;
  return function() {
    var context = scope || this;

    var now = + new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
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
function setWindowDimensions(obj) {

  // if (obj instanceof Element || obj.ownerDocument == document) {
    obj.setAttribute('width', window.innerWidth);
    obj.setAttribute('height', window.innerHeight);
    if (obj.tagName === 'svg')
      obj.setAttribute('viewbox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    // }
  return obj;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIndex(length) {
  let item = Math.floor(Math.random() * length);
  return item;
}

/*

  Classes:
  Scene, Name, Letter, Shape

*/

class Scene { // #scene
  constructor(scene, name) {
    // scene.ready is true after the initial animation has fully completed
    this.ready = false;
    // scene.interactive dictates whether mousemove events should be tracked for shape translations
    this.interactive = false;
    this.name = undefined;
    // DOM element references
    this.DOM = {
      el: scene,
      children:{
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
      config: function() {
        this.updateFov();
        this.updateLoc(this.center.x, this.center.y);
      },
      updateLoc: function(newX, newY) {
        this.location.x = newX;
        this.location.y = newY;
      },
      updateFov: function() {
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
      tl: new TimelineLite(), //{ paused: true }
      showLetters: function(targets){
        // this.tl.eventCallback("onUpdate", this.update);
        this.tl.staggerFromTo(targets, 1, {
          opacity: 0,
          y: "100%"
        },
        {
          opacity: 1,
          y: "0%",
          ease: Elastic.easeOut.config(1, 0.4)
        }, .1);
      },
      showShapes: function(targets){
        for(let i = 0; i < targets.length; i++){
          let target = targets[i];
          this.tl.to(target, .9, {
            opacity: .75,
            x: getRandomInt((window.innerWidth * -.5), (window.innerWidth * .5)),
            y: getRandomInt((window.innerHeight * -.5), (window.innerHeight * .5)),
            scale: 1,
            ease: Expo.easeOut
          }, "-=.895");
          if(i == (targets.length - 1)) {
            let scene = this.scene;
            setTimeout(function(){
              scene.animationCompleted();
            }, 900);
          }
        }
      },
      moveShapes: function(shapes){
        shapes.reverse();
        for(let i = 0; i < shapes.length; i++){
          let shape = shapes[i];

          TweenLite.to(shape.target, 7, {
            opacity: 1,
            x: shape.newX,
            y: shape.newY,
            ease: Expo.easeOut
          }).delay(i*.0085).smoothChildTiming = true;
        }
      },
      explodeShapes: function(targets){
        for(let i = 0; i < targets.length; i++){
          let target = targets[i];
          console.log(target);
        }
      }
    };

    this.init();
    this.initEvents();
  }

  init() {
    this.createScene();
    this.name = new Name(this);
    console.log(this.name);
    this.playScene();
    console.log("Scene created");
  }

  initEvents() {
    let scene = this;
    // Resize event:
    // Debounces event every 100ms, resizes scene element to window size
    let handleResize = debounce(function() {
      setWindowDimensions(scene.DOM.children.svg.el);
      scene.camera.config();
    }, 100);
    window.addEventListener('resize', handleResize);

    // Mousemove event:
    // Tracks mouse to calculate projection perspective of svg shapes
    let handleMouseMove = throttle(function(e) {
      if (scene.interactive) {
        scene.camera.updateLoc(e.clientX, e.clientY);

        let updatedShapes = [];
        scene.name.shapes.forEach(function(shape) {
          let projectedXY = [
            (shape.calc3DLocation(scene.camera)[0] - shape.projectedXY[0]),
            (shape.calc3DLocation(scene.camera)[1] - shape.projectedXY[1])
          ];
          updatedShapes.push({
            target: shape.el,
            newX: shape.getsetTransform(projectedXY)[0],
            newY: shape.getsetTransform(projectedXY)[1]
          });
        });

        scene.animations.moveShapes(updatedShapes);
      }
    }, 150);
    window.addEventListener('mousemove', handleMouseMove, false);

    // Mouseenter event:
    // Toggle scene interactivity
    let handleMouseEnter = function(e) {
      if (scene.ready) {
        if (!scene.interactive) scene.toggleInteractive();
      }
    }
    this.DOM.parent.addEventListener('mouseenter', handleMouseEnter);

    // Mouseleave event:
    // Toggle scene interactivity and reset shapes to original positions
    let handleMouseLeave = function(e) {
      if (scene.ready) {
        if (scene.interactive) {
          scene.toggleInteractive();
          scene.camera.updateLoc(scene.camera.center.x, scene.camera.center.y);
          scene.name.shapes.forEach(shape => shape.getsetTransform([0, 0]));
        }
      }
    }
    this.DOM.parent.addEventListener('mouseleave', handleMouseLeave);

    // Click event:
    let handleClick = function(e){
      if (scene.ready) {
        if (scene.interactive) {
          console.log("clicking!");
        }
      }
    }
  }
  createScene() {
    // Add class to svg
    // Insert svg scene before h1#name to ensure the name is layered on top
    let scene = this.DOM;
    scene.children.svg.el.classList.add(scene.children.svg.class);
    scene.el.insertBefore(scene.children.svg.el, scene.children.name.el);
    setWindowDimensions(scene.children.svg.el);
    this.camera.config();
  }
  playScene() {
    let scene = this;
    console.log(scene);
    let name = this.name;
    // let animation = anime.timeline();
    let animations = this.animations;

    setTimeout(function() {

      animations.showLetters(name.letterEls);
      animations.showShapes(name.shapeEls);

    }, animations.initDelay);
  }
  animationCompleted(){
    console.log("animation completed!");
    console.log(this);
    this.name.shapes.forEach(function(shape){
      shape.getsetTransform();
    });
    this.toggleScene();
  }
  toggleInteractive() {
    this.interactive = !this.interactive;
    if (this.interactive) {
      window.focus();
    } else {
      window.blur();
    }
  }
  toggleScene() {
    this.toggleInteractive();
    this.ready = !this.ready;
    console.log("scene is ready");
  }
}

class Name { // #name
  constructor(scene) {
    this.scene = scene;
    this.el = scene.DOM.children.name.el;
    this.letterEls = undefined;
    this.shapeEls = undefined;
    this.letters = [];
    this.shapes = [];

    this.init(this.scene);
  }
  init(scene) {
    // Wraps each letter in a span with a new class 'letter#'
    charming(this.el, {classPrefix: 'letter'});
    // Create letters and assign the elements to animations
    this.createLetters(scene);
  }
  createLetters(scene){
    let letters = scene.DOM.children.name.el.childNodes;

    this.letterEls = letters;
    // animations.letters.show.targets = animations.letters.hide.targets = letters;

    letters = Array.from(letters);

    let shapes = [];
    letters.forEach(function(el, index){
      letters[index] = new Letter(scene, el);

      let letter = letters[index];
      for(let i = 0; i < letter.totalShapes; i++){
        shapes.push(letter.shapes[i]);
      }
    });

    this.shapeEls = shapes.map(s => s.el);
    // animations.shapes.targets = shapes.map(s => s.el);


    this.letters = letters;
    this.shapes = shapes;

    // Sort shapes array order based on z axis location and add them to the dom
    this.shapes.sort(function(a, b) {
      return a.z - b.z;
    });
    this.shapes.forEach(function(shape) {
      shape.parent.appendChild(shape.el);
    });
  }
}

class Letter {
  constructor(scene, el) {
    this.el = el;
    this.scene = scene;
    this.shapes = [];
    this.totalShapes = 6;
    this.init(scene);
  }
  init() {
    this.createShapes();
    console.log("Letter created");
  }
  createShapes() {
    for (let i = 0; i < this.totalShapes; i++) {
      this.shapes.push(new Shape(this.scene, this.el, this.el.getBoundingClientRect()));
    }
  }
}

class Shape {
  constructor(scene, letter, letterProps) {
    this.scene = scene;
    this.el = undefined;
    this.parent = scene.DOM.children.svg.el;
    this.letter = {
      el: letter,
      props: letterProps
    };
    this.scale = getRandomInt(letterProps.width * .1, letterProps.width * .8); // scale will be 10% and 100% of the letter's width
    this.x = (letterProps.left + letterProps.width / 2);
    this.y = (letterProps.top - letterProps.height / 2);
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
    this.types = [
      {
        el: 'circle',
        cx: this.projectedXY[0],
        cy: this.projectedXY[1],
        r: this.scale / 2,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      },
      {
        el: 'polygon',
        points: this.getPoints(this.projectedXY[0], this.projectedXY[1], this.scale),
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      }
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
    ];

    this.init();
    this.initEvents();
  }
  initEvents() {
    // Create an observer to monitor the parent svg container's attributes
    // In this case, the svg container updates its width and height attributes on window resize
    // This tells the Shape to updateShape() when that happens
    let callback = () => this.updateShape();
    var observer = new MutationObserver(callback);
    observer.observe(this.parent, {attributes: true});
  }
  init() {
    // shape is randomly selected from the array of different shapes (this.types)
    let shape = this.types[randomIndex(this.types.length)];
    // Shape element is created and assigned attributes
    // corresponding to the props of the type of shape
    // if a prop is undefined it is not added to the element
    for (let prop in shape) {
      if (shape[prop]) {
        if (prop === 'el') {
          this.el = document.createElementNS("http://www.w3.org/2000/svg", shape[prop]);
        } else {
          if (this.el) {
            console.log(shape[prop]);
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
  calc3DLocation(camera) {
    /*
Bx = Ax*(Bz/Az)
*/
    let Bx,
      Bz,
      Ax,
      Az,
      By,
      Ay,
      newX,
      newY;

    Bz = camera.perspective;
    Az = camera.perspective - (this.z * camera.maxZ);

    Bx = this.x - camera.location.x;
    Ax = Bx / (Bz / Az);
    newX = camera.location.x + Ax;

    By = this.y - camera.location.y;
    Ay = By / (Bz / Az);
    newY = camera.location.y + Ay;

    return [newX, newY];
  }

  updateShape() {
    if(this.scene.ready){
      let letter = this.letter.el.getBoundingClientRect();
      this.letter.props = letter;
      this.x = letter.left + (letter.width * this.relationalValues.x);
      this.y = letter.top + (letter.height * this.relationalValues.y);
      this.scale = letter.width * this.relationalValues.scale;
      this.transforms = [this.relationalValues.translateX*(window.innerWidth*.45), this.relationalValues.translateY*(window.innerHeight*.45)];
      this.projectedXY = this.calc3DLocation(this.scene.camera);
      // If this Shape element has points, recalculate those values
      // Otherwise, its a circle and the attributes can be outright updated with
      // the Shape's new coordinates and scale values
      if (this.el.hasAttribute("points")) {
        let points = this.getPoints(this.projectedXY[0], this.projectedXY[1], this.scale);
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
    }else{
      console.log("scene not ready");
    }
  }
  getPoints(x, y, scale) {
    // This configuration of points creates a triangle shape
    let points = `${x} ${y} ${x + scale * .5} ${y + scale} ${x - scale * .5} ${y + scale}`;
    return points;
  }
  getsetTransform(projectedXY) {
    if (!this.transforms) {

      console.log("setting initial transform");

      // if(this.el.hasAttribute("transform")){
      let matrix = this.el.getAttribute("transform");

      // let matrixCopy = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
      let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
      let matrixValue = [];
      matrixValue = matrixCopy.split(/[ ,]+/).map(Number);
      this.transforms = matrixValue.slice(4);
      console.log(this.transforms);

      // KEEP FOR REFERENCE (Converts computedStyle of element and turns into translateX translateY values)
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
      let newProjectedXY = [];
      this.transforms.forEach((transform, index) => newProjectedXY.push(transform + projectedXY[index]));
      return newProjectedXY;

    }
  }
}

exports.ShapeScene = function(scene, name) {
  let shapeScene;
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
}
