// import "@babel/polyfill";
import "classlist-polyfill";
// import 'es7-object-polyfill';
import '../style/app.scss';

import Vue from 'vue';
import router from './router.js';
import App from './components/App.vue';
// var VueTouch = require('vue-touch');

// import { globals } from './globals.js';
import { images } from './images.js';

import { TimelineLite } from 'gsap';
import charming from 'charming';
import load from 'load-asset';

// import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
// fontawesome.library.add(solid, faBars);


document.addEventListener('readystatechange', (event) => {
  if(document.readyState == 'complete') {
    const loadingSVG = document.querySelector('.loading svg');
    loadingSVG.style.visibility = "visible";
  }
});


var compatibleBrowser = typeof Object['__defineSetter__'] === 'function';
if(!compatibleBrowser){
  console.warn('Browser not compatible with this website :(');
  var loader = document.querySelector('.loading');
  while (loader.firstChild) {
    loader.removeChild(loader.firstChild);
  }
  document.body.removeChild(loader);
}

Vue.config.productionTip = false;
// Vue.use(VueTouch, {name: 'v-touch'});


Vue.mixin({
  data: function(){
    return {
      devmode: false,
      body: document.body,
      app: document.getElementById('app'),
      breakpoints: {
        xs: 0,
        sm: 500,
        md: 1000,
        lg: 1200,
        xl: 1600
      },
    }
  },
  computed:{
    viewport: function(){
      return {
        width: window.innerWidth,
        cWidth: document.documentElement.clientWidth,
        cHeight: document.documentElement.clientHeight
      }
    }
  },
  methods:{
    // Used to log messages to the console
    // only when the app is in development mode
    dev: function(message) {
      if(this.devmode === true) {
        console.log(message);
      }
    },

    
    setMainMargin: function(el){
      let main;
      let marginBottom = document.querySelector('footer').offsetHeight;
      let marginTop = document.querySelector('nav').offsetHeight;
      if(el) main = el;
      else main = document.querySelector('div.main');
      let mainHeight = main.offsetHeight;
      // console.log(main.offsetHeight);
      // console.log(marginTop);
      let margins = marginTop + marginBottom;
      console.log(marginTop);
      let minHeight = document.documentElement.clientHeight - margins;
      console.log(minHeight)
      if(mainHeight < minHeight) main.style.height = `${minHeight}px`;
      main.style.marginTop = `${marginTop}px`;
    },


    /**
     * Creates svg used as overlay in transitions
     * svg element must exist on page with class 'transition-overlay'
     */
    initSvgOverlay: function(selector, color, direction){
      let overlay = document.querySelector(selector);
      let rect = overlay.querySelector('rect');
      let dir = direction ? -1 : 0;
      let width = this.viewport.cWidth + 17;
      console.log('init svg overlay');
      console.log(rect);
      overlay.style.display = 'block';
      overlay.setAttribute('width', `${width}`);
      overlay.setAttribute('height', `${document.documentElement.clientHeight}`);
      rect.setAttribute('x', `${width*dir}`);
      rect.setAttribute('y', 0);
      rect.setAttribute('width', `${width}`);
      rect.setAttribute('height', `${document.documentElement.clientHeight}`);
      rect.setAttribute('fill', color);
      return rect;
    },

    /**
     * Transforms header element
     * output: Array of span elements
     * wraps each letter in a span
     */ 
    charmWords: function(elements){
      let charm = [];
      let func = function(el){
        charming(el, {classPrefix: 'letter'});
        let letters = [].slice.call(el.childNodes);
        charm = charm.concat(letters);
      }
      if(Array.isArray(elements)){
        for(var i = 0; i < elements.length; i++){
          func(elements[i]);
        }
      } else {
        func(elements);
      }
      return charm;
    },

    loadImages: async function(imagesArr, func){
      return load.any(imagesArr, (progress) => {
        console.log(`${(progress.count/progress.total)*100}%`);
      }).then(assets => {
        if(func){
          func(assets);
        }
        return assets;
      });
    },

    // Helpers for loadPageImages
    imageDoneLoading: function(img){
      img.removeAttribute('class');
      img.removeAttribute('data-image-src');
    },
    removeEl: function(el){
      el.parentElement.removeChild(el);
    },


    // Working draft for loading page images mixin function
    // to be used on any page with images, ideally for the project pages to handle
    // fire this after page load to lazy load images to their respective locations
    // Gives placeholder imgs a src

    // Nothing is currently returned, should emit event on finish
    loadPageImages: function(breakpointSize, container){
      let app = this;
      let size = breakpointSize || this.$props.images.currentBreakpoint;
      let cont = container || document.getElementById('app');
      let pageImages = [];
      let imgNames = [];
      // image placeholders
      let placeholders = [].slice.call(cont.querySelectorAll('.img-placeholder, img[data-image-src]'));
      // image loading spinners
      // let spinners = [].slice.call(cont.querySelectorAll('.loading-spinner'));
      // console.log(placeholders);
      for(var i = 0; i < placeholders.length; i++){
        imgNames[i] = placeholders[i].getAttribute('data-image-src');
        pageImages[i] = this.$props.images.all[imgNames[i]][size];

        if(i >= placeholders.length-1){
          let replacePlaceholders = function(images){
            for(var j = 0; j < images.length; j++){
              let img = placeholders[j];
              img.src = images[j].src;
              app.imageDoneLoading(img)
              // TweenLite.to(spinners[j], .5,{ opacity: 0, scale: 0, ease: Power2.easeIn, onComplete: app.removeEl(spinners[j]) });
              // TweenLite.to(placeholders[j], 1, { opacity: 1, y: 0, ease: Power2.easeOut, onComplete:  });
            }
          }
          this.loadImages(pageImages, replacePlaceholders);
        }
      }
    },

    bodyNoScroll: function(){
      this.body.style.top = `${-(window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0))}px`;
      this.body.style.position = 'fixed';
      this.body.style.overflowY = "scroll";
    },
    bodyRestoreScroll: function(){
      this.body.removeAttribute("style");
    },
    debounce: function(func, wait, immediate){
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
    }
  },
});

new Vue({
  el: '#app',
  router,
  template: `<App :images='images' />`,
  components: { App },
  data:{
    images: {},
    last_breakpoint: undefined
  },
  methods:{
    // get and set for images used throughout app
    getImages(arg){
      if(!arg){
        return this.images;
      }
      else{
        if(this.images.sized[arg]) return this.images.sized[arg];
        // else this.dev('image not in app');
      }
    },
    setImages(){
      this.images = images(this.breakpoints, window.innerWidth);
      console.log("App images updated");
    },

    // Used to determine current breakpoint,
    // returns breakpoint level in pixels
    // if no breakpoint is determined, lowest level breakpoint is returned
    currentBreakpoint(){
      let breakpoint = null;
      let bp_Sizes = null;
      bp_Sizes = Object.keys(this.breakpoints);
      for(let b = 0; b < bp_Sizes.length; b++){
        if(window.innerWidth >= this.breakpoints[bp_Sizes[b]]){
          breakpoint = this.breakpoints[bp_Sizes[b]];
        }
      }
      if(breakpoint == null){
        breakpoint = this.breakpoints[bp_Sizes[0]];
      }
      return breakpoint;
    },
    
    
    debounceResize(){
      this.setMainMargin();
      /**
       * If current breakpoint is not equal to the last break point
       * Then the viewport has broken the current breakpoint threshold
       * setImages is called to update the images mixin with appropriately sized images
       */
      if(this.currentBreakpoint() !== this.last_breakpoint){
        this.setImages();
      }
      this.last_breakpoint = this.currentBreakpoint();
    },
    handleResize(){
      this.debounce(this.debounceResize(), 500, false);
    },
  },
  created(){
    console.log('Initializing app');
    /**
     * Feature detection for object-fit css style
     */
    if('objectFit' in document.documentElement.style === false){
      console.log('no object fit');
    } else {
      console.log('object fit exists!');
    }
    

    /**
     * Add resize event handler to main Vue
     */
    window.addEventListener('resize', this.handleResize);

    this.setImages();
  },
  mounted(){
    this.setMainMargin();
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize);
  }
});
