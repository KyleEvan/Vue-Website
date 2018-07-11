import "babel-polyfill";
import "classlist-polyfill";
import '../style/app.scss';
import Vue from 'vue';
import router from './router.js'
import App from './components/App.vue';

import { globals } from './globals.js';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import faBars from '@fortawesome/fontawesome-free-solid/faBars'



fontawesome.library.add(solid, faBars);

var debounce = function(func, wait, immediate){
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


// Vue.config.productionTip = false



Vue.mixin({
  data: function(){
    return {
      devmode: true,
      body: document.body,
      breakpoints: globals.breakpoints,
      // images: undefined,
      // viewport: undefined,
    }
  },
  computed:{
    // viewport: function(){
    //   return this.setViewport();
    // },
    // images: function(){
    //   return this.setImages();
    // }
    viewport: () => globals.getViewport(),
    images: () => globals.getImages(),
  },
  methods: {
    bodyNoScroll: function(){
      this.body.style.top = `${-(window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0))}px`;
      this.body.style.position = 'fixed';
      this.body.style.overflowY = "scroll";
    },
    bodyRestoreScroll: function(){
      this.body.removeAttribute("style");
    },
    getViewport: function(){
      return globals.getViewport();
    },
    getImages: function(){
      return globals.getImages();
    },
    // setImages: function(){
    //   this.viewport = globals.getViewport();
    //   this.images = globals.getImages();
    //   console.log(this.viewport);
    //   console.log(this.images);
    // },
    // initEvents: function(){
    //   const handleResize = debounce(this.setImages, 25);
    //   window.addEventListener('resize', handleResize);
    // },
    debounce: debounce
  },
  updated(){
    // console.log('updated mixins')
  }
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created(){
    console.log('app created');
    // window.addEventListener('resize', this.handleResize);

    // globals.init();
    // this.initEvents();
    // console.log(this.images);
    // console.log(this.viewport);
    // console.log(globals);
  }
  // mixins: [mixins]
});
