"use strict";

import { TimelineLite } from "gsap";
import charming from 'charming';

/*

Color Palette
  https://coolors.co/7edad4-ff9393-ffec94-f9fff9-63676c
  https://coolors.co/7edad4-ffa69e-ffec94-707c89-f9fff9

  https://coolors.co/85e5e0-ffa69e-ffeb93-7b8a96-ffe5e5
*/
// const colors = [
//   '#ACE7E3', '#FFC6C1', '#FFF2BA'
// ];
// const colors = [
//   '#7BE7E1', '#88E9E4', '#95ECE7', '#A2EEEA', '#AFF0ED', '#BDF3F0'
// ];
const colors = [
  '#E2E2E2', '#C5C5C6', '#F0F0F0', '#D3D3D4', '#B7B7B8'  //'#A8A8A9'
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
  threshhold || (threshhold = 100);
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
function setWindowDimensions(el) {

  // if (obj instanceof Element || obj.ownerDocument == document) {
    el.setAttribute('width', window.innerWidth);
    el.setAttribute('height', window.innerHeight);
    if (el.tagName === 'svg')
      el.setAttribute('viewbox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    // }
  return el;
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
  constructor(scene, name, devmode, showName) {
    this.devmode = devmode;
    this.devConfig = {
      console: {
        aquaText: 'color: #6FCAB1; background: #000000',
        yellowText: 'color: #fff589; background: #000000',
        greenText: 'color: green; background: #000000',
        redText: 'color: red; background: #000000',
        grayText: 'color: #6A706E; background: #000000'
      }
    }
    // this.devConsole = {
    //   color: '#fff589',
    //   background: '#000000'
    // };
    // this.devConsoleStyle = `color: ${this.devConsole.color}; background: ${this.devConsole.background}`;

    // scene.ready is true after the initial animation has fully completed
    this.ready = false;
    // scene.interactive, if true mousemove events will be tracked for shape translations
    this.interactive = false;
    // Max boundaries of the scene in relation to the window. 1 = window size
    this.sceneSize = 1.25;

    this.bounds = undefined;

    this.showName = showName || false;

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
      perspective: 1000,
      maxZ: 800,
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
      setLetters: function(targets){
        // let targets = this.scene.name.letterEls;
        this.tl.set(targets, {
          opacity: 0,
          y: '100%'
        });
      },
      showLetters: function(){
        let targets = this.scene.name.letterEls;
        this.tl.staggerTo(targets, 1,
        {
          opacity: 1,
          y: "0%",
          ease: Elastic.easeOut.config(1, 0.4)
        }, .1);
      },
      hideLetters: function(){
        let targets = this.scene.name.letterEls;
        targets = Array.from(targets).reverse();
        this.tl.staggerTo(targets, .333, {
          opacity: 0,
          y: "100%",
          ease: Elastic.easeIn.config(1, 0.75)
        }, .1);
      },
      showShapes: function(){
        let targets = this.scene.name.shapeEls;
        for(let i = 0; i < targets.length; i++){
          let target = targets[i];
          this.tl.to(target, 1, {
            opacity: .3,
            x: getRandomInt(this.scene.bounds.left, this.scene.bounds.right),
            y: getRandomInt(this.scene.bounds.top, this.scene.bounds.bottom),
            scale: 1,
            ease: Expo.easeOut
          }, "-=.998");
          if(i == (targets.length - 1)) {
            let scene = this.scene;
            setTimeout(() => {
              scene.animationCompleted();
            }, 1000);
          }
        }


      },
      moveShapes: function(mouseMove){

        let scene = this.scene;
        let shapes = scene.name.shapes;
        shapes = Array.from(shapes).reverse();

        shapes.forEach(function(shape, index) {
          let projectedXY, newX, newY;
          if(mouseMove){
            projectedXY = [
              (shape.calc3DLocation(scene.camera)[0] - shape.projectedXY[0]),
              (shape.calc3DLocation(scene.camera)[1] - shape.projectedXY[1])
            ];
            newX = shape.getsetTransform(projectedXY)[0];
            newY = shape.getsetTransform(projectedXY)[1];
          }
          else{
            newX = shape.getsetTransform([0,0])[0];
            newY = shape.getsetTransform([0,0])[1];
          }

          TweenLite.to(shape.el, 10, {
            opacity: .35,
            x: newX,
            y: newY,
            ease: Elastic.easeOut.config(1, 0.5)
          }).delay(index*.005).smoothChildTiming = true;

        });
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
    this.playScene();

    if(this.devmode){
      console.log('%c ---------------------------------------- ', this.devConfig.console.grayText);
      console.log('%c SCENE INITIALIZED: ', this.devConfig.console.aquaText);
      console.log(this);
      console.log('%c ---------------------------------------- ', this.devConfig.console.grayText);
    }
  }

  initEvents() {
    let scene = this;
    // Resize event:
    // Debounces event every 50ms, resizes scene element to window size
    const handleResize = debounce(function() {
      setWindowDimensions(scene.DOM.children.svg.el);
      scene.setBoundaries();
      scene.camera.config();
      scene.animations.moveShapes(false);

    }, 50);
    window.addEventListener('resize', handleResize);

    // Mousemove event:
    // Tracks mouse to calculate projection perspective of svg shapes
    const handleMouseMove = throttle(function(e) {
      if (scene.interactive) {
        scene.camera.updateLoc(e.clientX, e.clientY);
        scene.animations.moveShapes(true);
      }
    }, 150);
    window.addEventListener('mousemove', handleMouseMove, false);

    // Mouseenter event:
    // Toggle scene interactivity
    const handleMouseEnter = function(e) {
      if (scene.ready) {
        if (!scene.interactive) scene.toggleInteractive();
      }
    }
    this.DOM.parent.addEventListener('mouseenter', handleMouseEnter);

    // Mouseleave event:
    // Toggle scene interactivity and reset shapes to original positions
    const handleMouseLeave = function(e) {
      if (scene.ready) {
        if (scene.interactive) {
          scene.toggleInteractive();
          scene.camera.updateLoc(scene.camera.center.x, scene.camera.center.y);
          scene.animations.moveShapes(false);
        }
      }
    }
    this.DOM.parent.addEventListener('mouseleave', handleMouseLeave);

    // Click event:
    const handleClick = function(e){
      if (scene.ready) {
        if (scene.interactive) {
          // console.log("clicking!");
          // scene.animations.hideLetters();
        }
      }
    }
    this.DOM.parent.addEventListener('click', handleClick);

  }
  setBoundaries(){
    let el = this.DOM.el;
    el = el.getBoundingClientRect();
    this.bounds = {
      top: (el.bottom/-2)*this.sceneSize,
      right: (el.right/2)*this.sceneSize,
      bottom: (el.bottom/2)*this.sceneSize,
      left: (el.right/-2)*this.sceneSize
    };
  }
  createScene() {
    // Add class to svg
    // Insert svg scene before h1#name to ensure the name is layered on top
    let scene = this.DOM;
    scene.children.svg.el.classList.add(scene.children.svg.class);
    scene.el.insertBefore(scene.children.svg.el, scene.children.name.el);
    setWindowDimensions(scene.children.svg.el);
    this.setBoundaries();
    this.camera.config();
  }
  playScene() {
    let scene = this;
    let name = this.name;
    let animations = this.animations;

    setTimeout(function() {
      if(scene.showName) animations.showLetters();
      animations.showShapes(name.shapeEls);

    }, animations.initDelay);
  }
  animationCompleted(){
    console.log('%c ---------------------------- ', this.devConfig.console.grayText);
    console.log('%c SCENE ANIMATION COMPLETED ');
    console.log('%c ---------------------------- ', this.devConfig.console.grayText);


    this.name.shapes.forEach(function(shape, i){
      // console.log("created: "+i);
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

    if(this.devmode){
      let style;
      if(this.interactive){
        style = this.devConfig.console.greenText;
      }else{
        style = this.devConfig.console.redText;
      }
      console.log(`%c SCENE INTERACTIVE: %c${this.interactive} `, this.devConfig.console.aquaText, style);
    }
  }
  toggleScene() {
    this.toggleInteractive();
    this.ready = !this.ready;

    if(this.devmode){
      let style;
      console.log('%c ######################################## ', this.devConfig.console.grayText);
      if(this.ready){
        style = this.devConfig.console.greenText;
      }else{
        style = this.devConfig.console.redText;
      }
      console.log(`%c SCENE READY: %c${this.ready} `, this.devConfig.console.aquaText, style);
      console.log('%c ######################################## ', this.devConfig.console.grayText);
    }

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
    const letters = Array.from(scene.DOM.children.name.el.childNodes);

    // letters = Array.from(letters);

    let shapes = [];
    letters.forEach(function(el, index){
      letters[index] = new Letter(scene, el);

      let letter = letters[index];
      for(let i = 0; i < letter.totalShapes; i++){
        shapes.push(letter.shapes[i]);
      }
    });

    // Map letter and shape DOM elements to arrays for reference
    this.letterEls = letters.map(l => l.el);
    this.shapeEls = shapes.map(s => s.el);
    // Set initial animation attributes/styles
    this.scene.animations.setLetters(this.letterEls);

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
    this.totalShapes = 8;
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
    this.scale = getRandomInt(letterProps.width * .05, letterProps.width * .2); // scale will be 10% and 100% of the letter's width
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
      // {
      //   el: 'polygon',
      //   points: this.getPoints(this.projectedXY[0], this.projectedXY[1], this.scale),
      //   stroke: undefined,
      //   strokeWidth: undefined,
      //   fill: this.colors[randomIndex(this.colors.length)]
      // }
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
            this.el.setAttribute(prop, shape[prop]);
          } else {
            console.log("Element is undefined");
          }
        }
      }
    }

    if(this.scene.devmode){
      console.log('%c ---------------------------------------- ', this.scene.devConfig.console.grayText);
      console.log('%c SHAPE CREATED: ', this.scene.devConfig.console.aquaText)
      console.log(`%c X: %c${this.x} `, this.scene.devConfig.console.aquaText, this.scene.devConfig.console.yellowText);
      console.log(`%c Y: %c${this.y} `, this.scene.devConfig.console.aquaText, this.scene.devConfig.console.yellowText);
      console.log(`%c Z: %c${this.scene.camera.perspective - (this.z * this.scene.camera.maxZ)} `, this.scene.devConfig.console.aquaText, this.scene.devConfig.console.yellowText);
      console.log('%c ---------------------------------------- ', this.scene.devConfig.console.grayText);
    }

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
      this.transforms = [this.relationalValues.translateX*this.scene.bounds.right, this.relationalValues.translateY*this.scene.bounds.bottom];
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

      // if(this.el.hasAttribute("transform")){
      let matrix = this.el.getAttribute("transform");
      if(matrix){
        // let matrixCopy = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
        let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
        let matrixValue = [];
        matrixValue = matrixCopy.split(/[ ,]+/).map(Number);
        this.transforms = matrixValue.slice(4);
        this.relationalValues.translateX = this.transforms[0]/this.scene.bounds.right;
        this.relationalValues.translateY = this.transforms[1]/this.scene.bounds.bottom;
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
      else{
        console.log("! Error: Matrix Returned:")
        console.log(matrix);
      }

    }
    if (projectedXY) {
      let newProjectedXY = [];
      this.transforms.forEach((transform, index) => newProjectedXY.push(transform + projectedXY[index]));
      return newProjectedXY;

    }
  }
}

exports.ShapeScene = function(scene, name, devmode, showName) {
  let shapeScene;
  shapeScene = new Scene(scene, name, devmode, showName);
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
