// import "@babel/polyfill";
import "classlist-polyfill";
// import 'es7-object-polyfill';
import '../style/app.scss';

import Vue from 'vue';
import router from './router.js'
import App from './components/App.vue';

import { globals } from './globals.js';
import { images } from './images.js';

import { TimelineLite } from 'gsap';
import charming from 'charming';
import load from 'load-asset';

// import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
// fontawesome.library.add(solid, faBars);


Vue.config.productionTip = false;

var compatibleBrowser = typeof Object['__defineSetter__'] === 'function';

if(!compatibleBrowser){
  console.warn('Browser not compatible with this website :(');
  var loader = document.querySelector('.loading');
  while (loader.firstChild) {
    loader.removeChild(loader.firstChild);
  }
  document.body.removeChild(loader);
}


Vue.mixin({
  data: function(){
    return {
      devmode: false,
      body: document.body,
      app: document.getElementById('app'),
      breakpoints: globals.breakpoints,
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
    // Log messages to console if app is in development mode
    dev: function(message) {
      if(this.devmode === true) {
        console.log(message);
      }
    },
    loadImages: async function(imagesArr, func, wait){
      // console.log(imagesArr);
      return load.any(imagesArr, (progress) => {
        this.dev(`${(progress.count/progress.total)*100}%`);
        // if(progress.count >= progress.total){
        // }
      }).then(assets => {
        if(func){
          // console.log(assets);
          func(assets);
        }
      });
    },
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
      }
      else {
        func(elements);
      }
      return charm;
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
  }
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
      this.dev("App images updated");
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

    // If current breakpoint is not equal to the last break point
    // Then the viewport has broken the current breakpoint threshold
    // setImages is called to update the images mixin with appropriately sized images
    checkBreakpoint(){
      if(this.currentBreakpoint() !== this.last_breakpoint){
        this.setImages();
      }
      this.last_breakpoint = this.currentBreakpoint();
    },
    handleResize(){
      this.debounce(this.checkBreakpoint(), 500, false);
    },
  },
  created(){
    this.dev('Initializing app');
    this.setImages();
    // Add resize event handler to main Vue
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize);
  }
});
