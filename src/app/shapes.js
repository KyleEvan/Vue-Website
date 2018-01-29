"use strict";

import anime from 'animejs';
import charming from 'charming';

/*

	Color Palette

*/
const colors = [
  '#7EDAD4', '#FF9393', '#FFEC94'
  // '#F9FFF9'
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

  if (obj instanceof Element || obj.ownerDocument == document) {
    obj.setAttribute('width', window.innerWidth);
    obj.setAttribute('height', window.innerHeight);
    if (obj.tagName === 'svg')
      obj.setAttribute('viewbox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    }

  return obj;
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
    this.el = scene;
    this.children = {
      name: {
        el: name,
        obj: undefined
      },
      svg: {
        el: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        class: "shapes"
      }
    };

    this.camera = {
			active:false,
      perspective: 500,
			maxZ: 100,
      fov: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      center: {
        x: undefined,
        y: undefined
      },
      location: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      init: function() {
        this.active = true;
				console.log("Camera is active"+ this.active);
      },
      updateLoc: function(newX, newY) {
        this.location.x = newX;
        this.location.y = newY;
      },
      updateFov: function() {
        this.fov.width = window.innerWidth;
        this.fov.height = window.innerHeight;
        this.center.x = window.innerWidth / 2;
        this.center.y = window.innerHeight / 2;
      }
    };

    this.init();
    this.initEvents(this.children.name.obj, this.children.svg.el, this.camera);
  }
  init() {
    this.createScene();
    // Initialize Name object
    this.children.name.obj = new Name(this.children.name.el, this);
    // console.log(this.children.name.obj);
  }
  initEvents(name, svg, camera) {
    // Resize Event
    // Debounces resize event every 50ms
    let handleResize = debounce(function() {
      setWindowDimensions(svg);
      camera.updateFov();
    }, 50);
    window.addEventListener('resize', handleResize);

    let handleMouseMove = throttle(function(e) {

			if(camera.active){
				camera.updateLoc(e.screenX, e.screenY);
				name.shapes.forEach(function(shape) {
					let newX = shape.x - shape.calc3DLocation(camera);

					shape.el.style.removeProperty("transform");
					shape.el.style.transform = `translateY(40px) translateX(${newX}px)`;
					// console.log(`${shape.el.style.transform} translateX(${newX})`);
	      });
			}

      // transition shapes ====> transition: 2s cubic-bezier(0.02, 0.1, 0.15, 1);
    }, 200);
    this.el.addEventListener('mousemove', handleMouseMove);
    // this.el.addEventListener('mouseenter', this.handleMouseEnter);
    // this.el.addEventListener('mouseleave', this.handleMouseLeave);
  }
  createScene() {
    // Add class to svg
    // Insert svg scene before h1#name to ensure the name is layered on top
    this.children.svg.el.classList.add(this.children.svg.class);
    this.el.insertBefore(this.children.svg.el, this.children.name.el);
    setWindowDimensions(this.children.svg.el);
    this.camera.updateFov();
  }
  handleMouseEnter() {
    console.log('mousing over nigg');
  }
  handleMouseLeave() {
    console.log('mouse damn left');
  }
}

class Name { // #name
  constructor(el, scene) {
    this.el = el;
		this.parent = scene;
    this.letters = [];
    this.shapes = [];
    this.animations = {
      delay: 1000,
      letters: {
        show: {
          duration: 1000,
          delay: (t, i) => i * 40,
          easing: 'easeOutElastic',
          opacity: [
            0, 1
          ],
          translateY: [
            '100%', '0%'
          ],
          offset: 0
        },
        hide: {
          duration: 1000,
          delay: (t, i) => i * 40,
          easing: 'easeOutExpo',
          opacity: {
            value: 0,
            duration: 100,
            delay: (t, i) => i * 40,
            easing: 'linear'
          },
          translateY: ['0%', '100%']
        }
      },
      shapes: {
        duration: 400,
        delay: (t, i) => i * 16 + 200,
        easing: 'easeOutQuad',
        translateY: () => [
          anime.random(-15, 15),
          anime.random(-200, 200)
        ],
        offset: 0,
        // scale: () => [0.2,randomBetween(0.5,1)],
        opacity: [
          {
            value: 1,
            duration: 1,
            delay: (t, i) => i * 16 + 200
          }, {
            value: .75,
            duration: 200,
            delay: 200,
            easing: 'linear'
          }
        ]
      }
    }

    this.init(this.parent);

  }
  init(parent) {
    // Wraps each letter in a span with a new class 'letter#'
    charming(this.el, {classPrefix: 'letter'});

		// Create array of letters and an array to store the dom elements to be used
		// as references for animations. Update this.letters to the newly created array
		// of letter dom references.  After, assign the appropriate animation to
		// the letterTargetsArray to create a valid anime object
    let letters = [];
    let letterTargetsArray = {
      targets: []
    };
    Array.from(this.el.querySelectorAll('span')).forEach(function(element) {
      letterTargetsArray.targets.push(element);
      letters.push(new Letter(element));
    });
    this.letters = letters;
    let letterAnimations = Object.assign(letterTargetsArray, this.animations.letters.show)

    let shapes = [];
    let shapeTargetsArray = {
      targets: []
    };
    this.letters.forEach(function(letter) {
      for (let i = 0; i < letter.shapes.length; i++) {
        shapeTargetsArray.targets.push(letter.shapes[i].el);
        shapes.push(letter.shapes[i]);
      }
    });
    this.shapes = shapes;
		let shapeAnimations = Object.assign(shapeTargetsArray, this.animations.shapes);

    this.shapes.sort(function(a, b) {
      return a.z - b.z;
    });


    this.shapes.forEach(function(shape) {
			let newX = shape.calc3DLocation(parent.camera);
			shape.updateShapeXY(newX);
			console.log("updating 3d location of shape");
      shape.parent.appendChild(shape.el);
    });

    // Animate after timeout/this.animations.delay
    this.playAnimation(parent, letterAnimations, shapeAnimations);
    console.log("Name created");
  }
  playAnimation(scene, letterAnimations, shapeAnimations) {
    setTimeout(function() {

      let animation = anime.timeline();

      animation.add(letterAnimations).add(shapeAnimations);

      animation.complete = function(anim) {
				scene.camera.init();
        console.log("animation completed");
      }

    }, this.animations.delay);
  }
}

class Letter {
  constructor(el) {
    this.el = el;
    this.shapes = [];
    this.totalShapes = 10;
    this.init();
  }
  init() {
    this.createShapes();
    console.log("Letter created");
  }
  createShapes() {

    for (let i = 0; i < this.totalShapes; i++) {
      this.shapes.push(new Shape(this.el, this.el.getBoundingClientRect()));
    }

  }
}

class Shape {
  constructor(letter, letterProps) {
    this.el = undefined;
    this.parent = document.querySelector('.shapes');
    this.letter = {
      el: letter,
      props: letterProps
    };
    this.scale = anime.random(letterProps.width * .1, letterProps.width * .75); // scale will be 10% and 75% of the letter's width
    this.x = anime.random(letterProps.x, letterProps.x + letterProps.width);
    this.y = anime.random(letterProps.y - letterProps.height, letterProps.y);
    this.z = this.scale / letterProps.width;
    this.relativeProps = { // Properties relative to their associated letter, values are percentage based
      x: (this.x - letterProps.x) / letterProps.width,
      y: (this.y - (letterProps.y - letterProps.height)) / letterProps.height,
      scale: this.scale / letterProps.width
    };
    this.colors = colors;
    this.types = [
      {
        el: 'circle',
        cx: this.x,
        cy: this.y,
        r: this.scale / 2,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      },
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
      {
        el: 'polygon',
        points: this.getPoints(this.x, this.y, this.scale),
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      }
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
    // this.parent.appendChild(this.el);
    console.log("shape created");

  }
	calc3DLocation(camera){
		/*
				Bx = Ax*(Bz/Az)
		*/
		let oldX = this.x;
		let Bx, Bz, Ax, Az, newX;
		Bx = this.x - camera.location.x;

		Bz = camera.perspective;

		Az = camera.perspective - (this.z*camera.maxZ);
		Ax = Bx/(Bz/Az);
		newX = camera.location.x + Ax;
		// let newX = this.x/(scene.camera.perspective/(scene.camera.perspective-(this.z*scene.camera.maxZ)));
		return newX;
	}
  updateShape() {
    let letter = this.letter.el.getBoundingClientRect();
    this.letter.props = letter;
    this.x = letter.x + (letter.width * this.relativeProps.x);
    this.y = letter.y + (letter.height * this.relativeProps.y);
    this.scale = letter.width * this.relativeProps.scale;

    // If this Shape element has points, recalculate those values
    // Otherwise, its a circle and the attributes can be outright updated with
    // the Shape's new coordinates and scale values
    if (this.el.hasAttribute("points")) {
      let points = this.getPoints(this.x, this.y, this.scale);
      this.el.setAttribute("points", points);
    } else if (this.el.hasAttribute("cx", "cy")) {
      this.el.setAttribute("cx", this.x);
      this.el.setAttribute("cy", this.y);
      this.el.setAttribute("r", this.scale / 2);
    } else {
      this.el.setAttribute("x", this.x);
      this.el.setAttribute("y", this.y);
    }
  }
  getPoints(x, y, scale) {
    // This configuration of points creates a triangle shape
    return `${x} ${y} ${x + scale * .5} ${y + scale} ${x - scale * .5} ${y + scale}`
  }
  updateShapeXY(x) {
		this.x = x;
		// this.y = y;
	}

}

exports.initShapes = function(scene, name) {
  let createScene = new Scene(scene, name);
  if (document.readyState === "complete") {
    console.log("document already loaded");
    createScene;
  } else {
    console.log("waiting for document to load");
    window.onload = () => createScene;
  }
}
