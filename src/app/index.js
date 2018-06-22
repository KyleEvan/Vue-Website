import "babel-polyfill";
import "classlist-polyfill";
import '../style/app.scss';
import Vue from 'vue';
import router from './router.js'
import App from './components/App.vue';

import { getImages } from './images.js';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import faBars from '@fortawesome/fontawesome-free-solid/faBars'



fontawesome.library.add(solid, faBars);

// Vue.config.productionTip = false


Vue.mixin({
  data: function(){
    return {
      devmode: true,
      viewport: {
        width: window.innerWidth,
        cWidth: document.documentElement.clientWidth,
        cHeight: document.documentElement.clientHeight
      },
      // app: document.getElementById('app'),
      body: document.body,
      breakpoints: { // See global.scss for breakpoints MUST BE IN SYNC
        sm: 200,
        md: 800,
        lg: 1300,
        xl: 1600
      },
    }
  },
  computed:{
    // images: function(){
    //
    // }
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
    images: function(){
      return getImages(this.breakpoints, document.documentElement.clientWidth);
    },
    getWindow: function(){
      const viewport = {
        width: window.innerWidth,
        cWidth: document.documentElement.clientWidth,
        cHeight: document.documentElement.clientHeight
      }
      return viewport;
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
  template: '<App/>',
  components: { App },
  created(){
    console.log('app created');
  }
  // mixins: [mixins]
});
