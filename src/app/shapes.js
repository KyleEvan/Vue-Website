"use strict";

import { TimelineLite } from "gsap";
// import charming from 'charming';

/*

Special thanks to these resources:

  http://jsfiddle.net/m1erickson/CtsY3/


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



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIndex(length) {
  let item = Math.floor(Math.random() * length);
  return item;
}



/*

  Classes:
  Scene, Shape

*/

class Scene { // #scene
  constructor(config) {
    /*------------------< Scene Config Options >-------------------
      scene (element): where to inject scene,
      devmode (boolean): show console logs or not,
      totalShapes (number): total number of shapes created,
      shape_size (array): array with length of 2 numbers declaring min and max sizes of shape
                          must be decimals, represents percentage of window width ex: [min, max] => [.01, .5],
      shapes_colors (array): array of hex codes randomly selected for shape fills,
      shapes_delay (number): compounding decimal staggering the animation of each shape

      Ex:
             {
               scene: this.$refs.scene.$el,
               devmode: this.devmode,
               totalShapes: 20,
               shapes_size: [.03, .12],
               shapes_colors: [
                 colors.red,
                 colors.lightTurquoise,
                 colors.peach
               ],
               shapes_delay: .0018,
             }

    */
    // DEBUG mode
    this.devmode = config.devmode;

    //---------------------< Scene >-----------------------
    // ELEMENTS
    this.el = config.scene;
    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.parent = config.scene.parentNode;
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add('shapes');

    // STATES
    // Scene is ready after initial animation
    // When scene is interactive it responds to mouse events
    this.ready = false;
    this.interactive = false;

    // DIMENSIONS
    // size is relative to window size ( 1 = window size )
    this.sceneSize = {};
    this.size = 1;

    // EVENT vars
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.mouseX_update = undefined;
    this.mouseY_update = undefined;

    // RAF update loop properties
    this.update = this.update.bind(this);
    this.toggleScene = this.toggleScene.bind(this);
    this.stop = undefined;
    this.frameCount = 0;
    this.fps = 18;
    this.fpsInterval = undefined;
    this.startTime = undefined;
    this.now = undefined;
    this.then = undefined;
    this.elapsed = undefined;


    //-------------------< Shapes >---------------------
    // Shapes Properties
    this.shapes = [];
    this.shapes.length = config.totalShapes;
    this.shapes_size = config.shapes_size || [.04, .1];
    this.shapes_colors = config.shapes_colors || ['#000'];
    this.shapes_delay = config.shapes_delay || 0;
    this.shapes_moveDur = 4;


    //---------------------< Camera >----------------------
    // virtual camera of the scene,
    // used to calculate 3d location of each shape
    this.camera = {
      scene: this,
      maxZ: .9, // % of perspective
      perspective: 10,
      fov: {
        width: undefined,
        height: undefined
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
        this.fov.width = this.scene.width;
        this.fov.height = this.scene.height;
        this.center.x = this.fov.width / 2;
        this.center.y = this.fov.height / 2;
      }
    };
    // init on create
    // this.init();
  }
  // Gets the bounding client props of the svg #scene container
  // Sets the virtual props for the svg to fill 100% 100% of its container
  setSceneWH(){
    let el = this.el.getBoundingClientRect();
    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.sceneSize = {
      // width: this.el.clientWidth,
      // height: this.el.clientHeight,
      top: (el.bottom/-2)*this.size,
      right: (el.right/2)*this.size,
      bottom: (el.bottom/2)*this.size,
      left: (el.right/-2)*this.size
    };
  }
  // Assigns the passed element a new width and height attribute
  // equal to that of the window. After returns the element
  setAttrsWH(){
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewbox', `0 0 ${this.width} ${this.height}`);
  }
  configScene() {
    // Add svg layer to scene if it doesn't already exist
    if(!this.el.firstChild) this.el.appendChild(this.svg);
    // Set Scene projected size in relation to the window
    this.setSceneWH();
    // Set Width and Height Attrs on svg layer
    this.setAttrsWH();
    // Configure virtual camera for the scene
    this.camera.config();
  }

  moveShapes(bounds, update_xy, callback){
    let delay = 0;
    for(var s = 0; s < this.shapes.length; s++){
      let shape, moveX, moveY, func;
      shape = this.shapes[s];
      if(bounds){
        moveX = getRandomInt(bounds.minX, bounds.maxX);
        moveY = getRandomInt(bounds.minY, bounds.maxY);
      }
      else{
        moveX = shape.x;
        moveY = shape.y;
      }
      if(s == this.shapes.length-1 && callback) func = callback;
      delay += this.shapes_delay;
      shape.move(moveX, moveY, delay, update_xy, func);
    }
  }
  createShapes(shapes, props, destroy){
    let shapeProps = props;
    for (let s = shapes.length-1; s >= 0; s -= 1){
      if(!shapeProps) shapeProps = {};
      shapeProps.x ? shapeProps.x : shapeProps.x = this.width/2;
      shapeProps.y ? shapeProps.y : shapeProps.y = this.height/2;
      let size = getRandomInt(this.shapes_size[0]*100, this.shapes_size[1]*100)/100;
      shapeProps.size = size;
      shapeProps.width = this.width*size;
      shapeProps.height = this.width*size;
      shapeProps.moveDur = this.shapes_moveDur;
      shapes[s] = new Shape(this, shapeProps);
    }
    shapes.sort(function(a, b){
      return b.z - a.z;
    });
    shapes.forEach(function(shape){
      shape.parent.appendChild(shape.el);
    });
    if(destroy){
      // console.log('destroy shapes');
      this.moveShapes({
        minX: -70,
        maxX: 70,
        minY: -70,
        maxY: 70
      }, true, function(){
        console.log('destroy shapes!!!!!');
      });
      // this.animations.disappearShapes(shapes, this.destroyShapes(shapes));
    }else{
      return shapes;
    }
  }
  init() {
    console.log('scene init');
    console.log('createScene');
    // Configures the svg layer
    this.configScene();
    if(this.devmode) console.log('createShapes');
    this.createShapes(this.shapes, null, null);
    console.log('Shapes: ');
    console.log(this.shapes);
    this.init_events();
    //this.name = new Name(this);
    this.playScene(this.shapes);
  }
  updateMouseXY(newX, newY){
    this.mouseX = newX;
    this.mouseY = newY;
  }
  init_events(){
    let scene = this;

    // Mousemove event:
    // Update mouseX mouseY position
    const handleMouseMove = throttle(function(e){
      // if scene is interactable, update the mouse and camera locations
      if(scene.interactive){
        // scene.mouseY = e.clientY;
        scene.updateMouseXY(e.clientX, e.clientY);
        // scene.camera.updateLoc(e.clientX, e.clientY);
      }
    }, 50);
    window.addEventListener('mousemove', handleMouseMove);

    // Resize event:
    const handleResize = debounce(function() {
      scene.configScene();
    }, 100);
    window.addEventListener('resize', handleResize);

    // Click event:
    const handleClick = function(e){
      if (scene.ready) {
        if (scene.interactive) {
          console.log("clicking! create some shapes!!!!!!!!!");
          // scene.createShapes();
        }
      }
    }
    window.addEventListener('click', handleClick);
  }




  // initEvents() {
  //   let scene = this;
  //   // Resize event:
  //   // Debounces event every 50ms, resizes scene element to window size
  //   const handleResize = debounce(function() {
  //     setWindowDimensions(scene.DOM.children.svg.el);
  //     scene.setBoundaries();
  //     scene.camera.config();
  //     scene.animations.moveShapes(false);
  //
  //   }, 50);
  //   window.addEventListener('resize', handleResize);
  //
  //   // Mousemove event:
  //   // Tracks mouse to calculate projection perspective of svg shapes
  //   const handleMouseMove = throttle(function(e) {
  //     if (scene.interactive) {
  //       scene.camera.updateLoc(e.clientX, e.clientY);
  //       scene.animations.moveShapes(true);
  //     }
  //   }, 150);
  //   window.addEventListener('mousemove', handleMouseMove, false);
  //
  //   // Mouseenter event:
  //   // Toggle scene interactivity
  //   const handleMouseEnter = function(e) {
  //     if (scene.ready) {
  //       if (!scene.interactive) scene.toggleInteractive();
  //     }
  //   }
  //   this.DOM.parent.addEventListener('mouseenter', handleMouseEnter);
  //
  //   // Mouseleave event:
  //   // Toggle scene interactivity and reset shapes to original positions
  //   const handleMouseLeave = function(e) {
  //     if (scene.ready) {
  //       if (scene.interactive) {
  //         scene.toggleInteractive();
  //         scene.camera.updateLoc(scene.camera.center.x, scene.camera.center.y);
  //         scene.animations.moveShapes(false);
  //       }
  //     }
  //   }
  //   this.DOM.parent.addEventListener('mouseleave', handleMouseLeave);
  //
  //   // Click event:
  //   const handleClick = function(e){
  //     if (scene.ready) {
  //       if (scene.interactive) {
  //         console.log("clicking!");
  //         // scene.animations.explodeShapes(e);
  //         // scene.animations.hideLetters();
  //       }
  //     }
  //   }
  //   this.DOM.parent.addEventListener('click', handleClick);
  //
  // }



  mouseUpdated(){
    let mouse_updated = false;
    if(this.mouseX_update != this.mouseX && this.mouseY_update != this.mouseX){
      this.mouseX_update = this.mouseX;
      this.mouseY_update = this.mouseY;
      mouse_updated = true;
    }
    return mouse_updated;
  }
  update(){
    // if stop, stop loop
    if (this.stop) {
        return;
    }
    // request another frame
    requestAnimationFrame(this.update);
    // calc elapsed time since last loop
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    // if enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
      // Do updates here:
      // if the mouse location has updated since last tick
      if(this.mouseUpdated()){

        this.camera.updateLoc(this.mouseX, this.mouseY);
        this.moveShapes();

      }



      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      this.then = this.now - (this.elapsed % this.fpsInterval);
      let sinceStart = this.now - this.startTime;
      let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
      // if(this.devmode) console.log(currentFps);
    }
  }
  playScene() {
    console.log('playing scene');
    // var callback = function(){
    //   console.log('fuuuuuuuuuck!!!!');
    // }
    let bounds = {
      minX: this.sceneSize.left,
      maxX: this.sceneSize.right,
      minY: this.sceneSize.top,
      maxY: this.sceneSize.bottom
    };
    this.moveShapes(bounds, true, this.toggleScene);

    // move to toggle interactive
    // toggle interactive will be a callback function
    // after the initial shapes move
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.update();


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

  destroyShapes(shapes){
    for (var s = shapes.length; s > 0; s -= 1){
      let shape = this.shapes[shapes.length - s];
      console.log('destroy this SHAPE!!!!!!');
      console.log(shape);
      // shape.el.outerHTML = '';
      // shape = null;
    }
  }
}



class Shape {
  constructor(scene, props) {
    /*----------< props >----------
    x: coordinate of shape,
    y: coordinate of shape,
    size: represents percentage of scene's width (Number 1-100)

    */
    this.scene = scene;
    this.scene_sizedWidth = undefined;
    this.scene_sizedHeight = undefined;
    this.parent = scene.svg;
    this.props = props;
    this.el = undefined;
    this.x = props.x;
    this.y = props.y;
    this.scale = props.size;
    this.width = props.width;
    this.height = props.height;
    this.z = (this.scale/scene.shapes_size[1]) * (scene.camera.perspective*scene.camera.maxZ);
    // scene x & y are the shape's positions relative to the scene
    this.sceneX = props.x/scene.width;
    this.sceneY = props.y/scene.height;

    this.minOpacity = .35;
    this.moveX = 0;
    this.moveY = 0;
    this.moveDur = props.moveDur;
    this.projectedXY = this.calc3DLocation(scene.camera);
    // this.projectedXY = undefined;
    // console.log(this.projectedXY);


    // this.relativeProps = {
    //     // Properties relative to their associated letter, values are percentage based
    //     x: (this.x - props.left) / props.width,
    //     y: (this.y - (props.top - props.height)) / props.height,
    //     scale: this.scale / props.width,
    //     // Properties relative to the window window dimensions
    //     translateX: undefined,
    //     translateY: undefined
    // };


    // }
    // this.colors = scene.shapes_colors;
    this.color = scene.shapes_colors[randomIndex(scene.shapes_colors.length)];
    this.color_rgba = this.getRgbaColor(this.color, this.z, scene.camera.maxZ*scene.camera.perspective, this.minOpacity);

    this.types = [
      {
        el: 'circle',
        cx: this.x,
        cy: this.y,
        r: this.width/2,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.color_rgba
      },
      {
        el: 'polygon',
        // points: this.getPoints(this.projectedXY[0], (this.projectedXY[1]-(this.height/2)), this.scale),
        // points: this.projectedXY[0] && this.projected[1] ? this.getPoints(this.projectedXY[0], (this.projectedXY[1]-(this.height/2)), this.scale),
        points: this.getPoints(this.x, this.y-(this.height/2), this.width),
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.color_rgba
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
    this.setSizedScene();
    this.init();
    this.initEvents();
  }
  setXY(x, y){
    this.x = x;
    this.y = y;
    // console.log(this.x+', '+this.y);
  }
  setSizedScene(){
    this.scene_sizedWidth = Math.abs(this.scene.sceneSize.left - this.scene.sceneSize.right);
    this.scene_sizedHeight = Math.abs(this.scene.sceneSize.top - this.scene.sceneSize.bottom);
  }
  setSceneXY(){
    this.sceneX = this.x/this.scene_sizedWidth;
    this.sceneY = this.y/this.scene_sizedHeight;
  }
  getProjectedXY(){
    return [
      (this.calc3DLocation(this.scene.camera)[0] - this.projectedXY[0]),
      (this.calc3DLocation(this.scene.camera)[1] - this.projectedXY[1])
    ];
  }
  animateTranslate(delay, func){
    TweenLite.to(this.el, this.moveDur, {
      x: this.moveX,
      y: this.moveY,
      delay: delay,
      opacity: 1,
      ease: Power4.easeOut,
      onComplete: () => {
        if(func) func();
      }
    });
  }
  move(moveX, moveY, delay, update_xy, func){
    if(update_xy){
      this.setXY(moveX, moveY);
      this.setSceneXY();
    }
    this.moveX = moveX + this.getProjectedXY()[0];
    this.moveY = moveY + this.getProjectedXY()[1];
    this.animateTranslate(delay, func);
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
    // return shape;
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
      this.setSizedScene();
      let newX = this.sceneX*this.scene_sizedWidth;
      let newY = this.sceneY*this.scene_sizedHeight;
      this.move(newX, newY, 0, true, null);




      // this.move(this.sceneX*this.scene.sceneSize.width)

      /*if(this.letter){
        this.props = this.letter.getBoundingClientRect();
        this.x = this.props.left + (this.props.width * this.relativeProps.x);
        this.y = this.props.top + (this.props.height * this.relativeProps.y);
        this.scale = this.props.width * this.relativeProps.scale;
        this.transforms = [this.relativeProps.translateX*this.scene.bounds.right, this.relativeProps.translateY*this.scene.bounds.bottom];
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
    }*/
  }
    // else{
    //   if(this.devmode) console.log("ERROR: Scene not ready");
    // }
  }
  getPoints(x, y, width) {
    // This configuration of points creates a triangle shape
    let points = `${x} ${y} ${x + width * .5} ${y + width} ${x - width * .5} ${y + width}`;
    return points;
  }
  getRgbaColor(hex, z, maxZ, minOpacity){
    let rgb, a, rgba;
    rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    a = (1-(z/maxZ))*(1-minOpacity) + minOpacity;
    rgba = {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16),
        a: a
    };
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
  }
  // getsetTransform(projectedXY) {
  //   if (!this.transforms) {
  //
  //     // if(this.el.hasAttribute("transform")){
  //     let matrix = this.el.getAttribute("transform");
  //     if(matrix){
  //       // let matrixCopy = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
  //       let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
  //       let matrixValue = [];
  //       matrixValue = matrixCopy.split(/[ ,]+/).map(Number);
  //       this.transforms = matrixValue.slice(4);
  //       this.relativeProps.translateX = this.transforms[0]/this.scene.bounds.right;
  //       this.relativeProps.translateY = this.transforms[1]/this.scene.bounds.bottom;
  //       // KEEP FOR REFERENCE & Potential future application
  //       // (Converts computedStyle of element and turns into translateX translateY values)
  //             // https://stackoverflow.com/questions/3432446/how-to-read-individual-transform-values-in-javascript
  //             // let computedStyle = window.getComputedStyle(this.el, null); // "null" means this is not a pesudo style.
  //             // You can retrieve the CSS3 matrix string by the following method.
  //             // let matrix = computedStyle.getPropertyValue('transform')
  //             // || computedStyle.getPropertyValue('-moz-transform')
  //             // || computedStyle.getPropertyValue('-webkit-transform')
  //             // || computedStyle.getPropertyValue('-ms-transform')
  //             // || computedStyle.getPropertyValue('-o-transform');
  //             // let matrixValue = [];
  //             // let matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
  //             // matrixValue = matrixCopy.split(/\s*,\s*/).map(Number);
  //             // this.transforms = matrixValue.slice(4);
  //             // this.relativeProps.translateX = this.transforms[0]/(window.innerWidth*.45);
  //             // this.relativeProps.translateY = this.transforms[1]/(window.innerHeight*.45);
  //       //
  //     }
  //     else{
  //       console.log("! Error: Matrix Returned:")
  //       console.log(matrix);
  //     }
  //
  //   }
  //   if (projectedXY) {
  //     let newProjectedXY = [];
  //     this.transforms.forEach((transform, index) => newProjectedXY.push(transform + projectedXY[index]));
  //     return newProjectedXY;
  //
  //   }
  // }
}

exports.Shapes = function(config) {
  return new Scene(config);
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
