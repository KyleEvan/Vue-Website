"use strict";

import { TimelineLite } from "gsap";
import charming from 'charming';




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
  constructor(config) {
    // scene, name, devmode, showName, color
    console.log(config);
    this.devmode = config.devmode;

    this.shapeColors = config.shapeColors || ['#fff'];
    this.shapesPerLetter = config.shapesPerLetter || 3;

    // scene.ready is true after the initial animation has fully completed
    this.ready = false;
    // scene.interactive, if true mousemove events will be tracked for shape translations
    this.interactive = false;
    // Max boundaries of the scene in relation to the window. 1 = window size
    this.sceneSize = 1.4;

    this.bounds = undefined;

    this.showName = config.showName || false;

    this.name = undefined;
    // DOM element references
    this.DOM = {
      el: config.scene,
      children:{
        name: {
          el: config.name
        },
        svg: {
          el: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
          class: "shapes"
        }
      },
      parent: config.scene.parentNode
    };
    // virtual camera of the scene, used for calculating 3d perspectives
    this.camera = {
      perspective: 10,
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
      initDelay: 0,
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
        // let targets = this.scene.name.shapeEls;
        let shapes = this.scene.name.shapes;
        console.log(shapes);
        for(let i = 0; i < shapes.length; i++){
          let shape = shapes[i];
          // console.log(target);
          TweenLite.to(shape.el, 1.5, {
            opacity: 1,
            // opacity: shape.scale*.018,
            x: getRandomInt(this.scene.bounds.left, this.scene.bounds.right),
            y: getRandomInt(this.scene.bounds.top, this.scene.bounds.bottom),
            scale: 1,
            delay: (i*.005),
            ease: Expo.easeOut
          });
          if(i == (shapes.length - 1)) {
            let scene = this.scene;
            setTimeout(() => {
              scene.animationCompleted();
            }, 1500);
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
            TweenLite.to(shape.el, 6, {
              x: newX,
              y: newY,
              delay: 0,
              ease: Expo.easeOut
            })
          });
      },
      explodeShapes: function(e){
        let scene = this.scene;
        const dur = 1;
        let shapes = scene.createShapes({
          length: 10,
          width: 50,
          height: 50,
          dist: 70,
          e: e
        });
        for (let s = shapes.props.length; s > 0; s -= 1){
          let shape = shapes.array[shapes.props.length-s];
          TweenLite.to(shape.el, dur, {
            opacity: 1,
            x: getRandomInt(-70, 70),
            y: getRandomInt(-70, 70),
            scale: 1.5,
            delay: (s*.008),
            ease: Expo.easeOut
          });
          TweenLite.to(shape.el, dur-.6, {
            opacity: 0,
            y: Math.abs(shape.size*1),
            scale: .6,
            ease: Power1.easeIn,
            delay: .25,
            onComplete: () => {
              if(s <= 1){
                scene.destroyShapes(shapes);
              }
            }
          });
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

    if(this.devmode) console.log('SCENE INITIALIZED');
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
          console.log("clicking!");
          scene.animations.explodeShapes(e);
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
    if(this.devmode) console.log('Animation Complete');
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
    console.log(`SCENE INTERACTIVE: ${this.interactive}`);
  }
  toggleScene(){
    this.toggleInteractive();
    this.ready = !this.ready;
    console.log(`SCENE READY: ${this.ready}`);
  }
  createShapes(shapes){
    const shapesArray = [];
    for (let s = shapes.length; s > 0; s -= 1){
      shapesArray.push(new Shape(this, false, {
        top: shapes.e.clientY,
        left: shapes.e.clientX,
        width: shapes.width,
        height: shapes.height
      }))
    }
    shapesArray.sort(function(a, b) {
      return a.z - b.z;
    });
    shapesArray.forEach(function(shape) {
      shape.parent.appendChild(shape.el);
    });
    return {
      props: shapes,
      array: shapesArray
    }
  }
  destroyShapes(shapes){
    console.log(shapes);
    for (var s = shapes.props.length; s > 0; s -= 1){
      let shape = shapes.array[shapes.props.length - s];
      shape.el.outerHTML = '';
      shape = null;
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
      return b.z - a.z;
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
    this.totalShapes = scene.shapesPerLetter;
    this.init(scene);
  }
  init() {
    this.createShapes();
    console.log("Letter created");
  }
  createShapes() {
    for (let i = 0; i < this.totalShapes; i++) {
      this.shapes.push(new Shape(this.scene, this.el, this.el.getBoundingClientRect(), true));
    }
  }
}

class Shape {
  constructor(scene, letter, props, perspective) {
    this.scene = scene;
    this.el = undefined;
    this.parent = scene.DOM.children.svg.el;
    this.props = props;
    this.scale = getRandomInt(0, 1*props.width); // scale will be 10% and 100% of the letter's width
    // this.x = (props.left + props.width / 2);
    // this.y = (props.top - props.height / 2);
    this.x = props.left;
    this.y = props.top;
    // this.x = document.documentElement.clientWidth/2;
    // this.y = document.documentElement.clientHeight/2;
    // console.log(this.x);
    // console.log(this.y);
    this.z = (this.scale/props.width) * scene.camera.perspective;


    if(letter) this.letter = letter;
    if(perspective){
      this.transforms = undefined;
      this.projectedXY = this.calc3DLocation(this.scene.camera);
      this.relationalValues = {
        // Properties relative to their associated letter, values are percentage based
        x: (this.x - props.left) / props.width,
        y: (this.y - (props.top - props.height)) / props.height,
        scale: this.scale / props.width,
        // Properties relative to the window window dimensions
        translateX: undefined,
        translateY: undefined
      };
    }

    this.colors = scene.shapeColors;
    this.types = [
      {
        el: 'circle',
        cx: perspective ? this.projectedXY[0] : this.x,
        cy: perspective ? this.projectedXY[1] : this.y,
        r: this.scale / 2,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      },
      {
        el: 'polygon',
        points: perspective ? this.getPoints(this.projectedXY[0], (this.projectedXY[1]-(this.props.height/2)), this.scale) : this.getPoints(this.x, (this.y-(this.props.height/2)), this.scale),
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
            this.el.setAttribute(prop, shape[prop]);
          } else {
            console.log("Element is undefined");
          }
        }
      }
    }
    // if(this.scene.devmode){
    //   console.log('SHAPE CREATED:');
    //   console.log(this.el);
    //   console.log(`X: ${this.x}`);
    //   console.log(`Y: ${this.y}`);
    //   console.log(`Z: ${this.scene.camera.perspective - (this.z * this.scene.camera.maxZ)}`);
    // }
  }

  calc3DLocation(camera){
    /*
        Projection Equation
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
    // Az = camera.perspective - (this.z * camera.perspective);
    // Az = camera.perspective - this.z;
    Az = this.z;

    Bx = this.x - camera.location.x;
    Ax = Bx / (Bz / Az);
    newX = camera.location.x + Ax;

    By = this.y - camera.location.y;
    Ay = By / (Bz / Az);
    newY = camera.location.y + Ay;

    return [newX, newY];
  }

  updateShape(){
    if(this.scene.ready){

      if(this.letter){
        this.props = this.letter.getBoundingClientRect();
        this.x = this.props.left + (this.props.width * this.relationalValues.x);
        this.y = this.props.top + (this.props.height * this.relationalValues.y);
        this.scale = this.props.width * this.relationalValues.scale;
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
      }
    }
    else{
      if(this.devmode) console.log("ERROR: Scene not ready");
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

exports.ShapeScene = function(config) {
  let shapeScene;
  shapeScene = new Scene(config);
  return shapeScene;
}

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
