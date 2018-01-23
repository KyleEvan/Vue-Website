
import anime from 'animejs';
import charming from 'charming';

/*

	Color Palette

*/
const colors = [
	'#7EDAD4',
	'#FF9393',
	'#FFEC94'
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
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Assigns the passed element a new width and height attribute
// equal to that of the window. After returns the element
function setWindowDimensions(el){
  el.setAttribute('width', window.innerWidth);
  el.setAttribute('height', window.innerHeight);
  if(el.tagName === 'svg') el.setAttribute('viewbox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  return el;
}

function randomIndex(length){
  let item = Math.floor(Math.random()*length);
  return item;
}

/*

  Classes:
  Scene, Name, Letter, Shape

*/

class Scene{ // #scene
  constructor(scene, name){
    this.el = scene;
    this.children = {
      name: {
        el: name
      },
      svg: {
        el: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        class: "shapes"
      }
    }
    this.initEvents();
    this.init();
  }
  init(){
    this.createScene();
    // Initialize Name object
    new Name(this.children.name.el);
  }
  initEvents(){
    // Resize Event
    let svg = this.children.svg.el;
    // Debounces resize event every 50ms
    let handleResize = debounce(function(){
      setWindowDimensions(svg);
    }, 50);
    window.addEventListener('resize', handleResize);

		this.el.addEventListener('mouseenter', this.handleMouseEnter);
		this.el.addEventListener('mouseleave', this.handleMouseLeave);
  }
  createScene(){
    // Add class to svg
    // Insert svg scene before h1#name to ensure the name is layered on top
    this.children.svg.el.classList.add(this.children.svg.class);
    this.el.insertBefore(this.children.svg.el, this.children.name.el);
    setWindowDimensions(this.children.svg.el);
  }
	handleMouseEnter(){
		console.log('mousing over nigg');
	}
	handleMouseLeave(){
		console.log('mouse damn left');
	}
}

class Name { // #name
  constructor(el){
    this.el = el;
    this.letters = [];
		this.shapes = [];
    this.animations = {
      delay:1000,
      letters:{
        show:{
          duration: 1000,
  				delay: (t,i) => i*40,
  				easing: 'easeOutElastic',
  				opacity: [0,1],
  				translateY: ['100%', '0%'],
          offset:0
        },
        hide:{
          duration: 1000,
					delay: (t,i) => i*40,
					easing: 'easeOutExpo',
					opacity: {
						value: 0,
						duration: 100,
						delay: (t,i) => i*40,
						easing: 'linear'
					},
					translateY: ['0%', '100%']
        }
      },
			shapes: {
				duration: 400,
				delay: (t,i) => i*16+200,
				easing: 'easeOutQuad',
				translateY: () => [anime.random(-15,15),anime.random(-200,200)],
				offset:0,
				// scale: () => [0.2,randomBetween(0.5,1)],
				opacity: [
					{
						value: 1,
						duration:1,
						delay: (t,i) => i*16+200
					},
					{
						value: 0,
						duration: 200,
						delay:200,
						easing: 'linear'}
				]
			}
    }

    this.init();

  }
  init(){

    // Wraps each letter in a span with a new class 'letter#'
    charming(this.el, {
      classPrefix: 'letter'
    });


    const letters = [];
		let letterTargetsArray = { targets: [] };
    Array.from(this.el.querySelectorAll('span')).forEach(function(element){
			letterTargetsArray.targets.push(element);
      letters.push(new Letter(element));
    });
    // Update name.letters to equal new Letter array
    this.letters = letters;
    let letterAnimations = Object.assign(letterTargetsArray, this.animations.letters.show)


		const shapes = [];
		let shapeTargetsArray = { targets: [] };
		this.letters.forEach(function(letter){
			for(let i = 0; i < letter.shapes.length; i++){
				shapeTargetsArray.targets.push(letter.shapes[i].el);
				shapes.push(letter.shapes[i]);
			}
		});
		this.shapes = shapes;
		let shapeAnimations = Object.assign(shapeTargetsArray, this.animations.shapes);



    // Animate after timeout/this.animations.delay
    this.playAnimation(letterAnimations, shapeAnimations);

  }
  playAnimation(letterAnimations, shapeAnimations){
    setTimeout(function(){

      anime.timeline()
        .add(letterAnimations)
				.add(shapeAnimations);

    }, this.animations.delay);
  }
}

class Letter {
  constructor(el){
    this.el = el;
    this.shapes = [];
    this.totalShapes = 10;
    this.init();
  }
  init(){
    this.createShapes();
  }
  createShapes(){

    for(let i = 0; i < this.totalShapes; i++){
      this.shapes.push(new Shape(this.el, this.el.getBoundingClientRect()));
    }

  }
}

class Shape {
  constructor(letter, letterProps){
    this.el = undefined;
    this.parent = document.querySelector('.shapes');
    this.x = anime.random(letterProps.x, letterProps.x + letterProps.width);
    this.y = anime.random(letterProps.y - letterProps.height, letterProps.y);
    this.scale = anime.random(letterProps.width*.1, letterProps.width*.75);
    this.colors = colors;
    this.types = [
      {
        el: 'circle',
        cx: this.x,
        cy: this.y,
        r: this.scale*.5,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      },
      {
        el: 'polygon',
        points: `${this.x} ${this.y} ${this.x+this.scale*.5} ${this.y+this.scale} ${this.x-this.scale*.5} ${this.y+this.scale}`,
        stroke: undefined,
        strokeWidth: undefined,
        fill: this.colors[randomIndex(this.colors.length)]
      }
    ];
    this.init();
  }
  init(){
    // shape is randomly selected from the array of different shapes (this.types)
    let shape = this.types[randomIndex(this.types.length)];
    // Shape element is created and assigned attributes
    // corresponding to the props of the type of shape
    // if a prop is undefined it is not added to the element
    for( let prop in shape ){
      if(shape[prop]){
        if(prop === 'el'){
          this.el = document.createElementNS("http://www.w3.org/2000/svg", shape[prop]);
        }
        else{
          if(this.el){
            this.el.setAttribute(prop, shape[prop]);
          }else{
            console.log("Element is undefined");
          }
        }
      }
    }
    this.parent.appendChild(this.el);



  }
}




exports.initShapes = function(scene, name){
  new Scene(scene, name);
}
