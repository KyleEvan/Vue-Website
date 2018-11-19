<template>
  <div id="app">

    <nav-content/>

    <transition mode="in-out"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main" ref="main" :images="images" :events="eventBus">
      <!-- Main View -->
      </router-view>
    </transition>

    <scene ref="scene" :events="eventBus" />

    <footer-content/>

  </div>
</template>

<script>
  import Vue from 'vue';

  // Color Palette
  import {colors} from '../colors.js';

  // Libraries
  import { TimelineLite } from "gsap";
  import load from 'load-asset';

  // Components
  import nav from './nav.vue';
  import footer from './footer.vue';
  import scene from './scene.vue';


  export default {
    // inheritAttrs: false,
    props: ['images'],
    name: 'app',
    data(){
      return {
        loading_el: document.querySelector('.loading'),
        tl: new TimelineLite({ paused: true }),
        eventBus: new Vue()
      }
    },
    components:{
      'nav-content': nav,
      'footer-content': footer,
      scene: scene
    },
    methods:{
      setPageTitle: function(){
        document.title = this.$route.meta.title;
      },
      appLoaded: function(){
        this.eventBus.$emit('app-loaded');
      },
      destroyLoader: function(){
        // while (this.el.firstChild) {
        //   this.el.removeChild(this.el.firstChild);
        // }
        this.body.removeChild(this.loading_el);
      },
      doneLoading: function(){
        const spinner = this.loading_el.querySelector('.spinner');
        TweenLite.to(spinner, .3, {
          scale: .25,
          opacity: 0,
          ease: Power2.easeOut
        });
        TweenLite.to(this.loading_el, .3, {
          opacity: 0,
          ease: Power2.easeIn,
          // delay: 999,
          onComplete: () => {
            console.log('done loading images');
            this.destroyLoader();
            this.initApp();
          }
        });
      },
      async loadImages(images){
        const app = this;
        const wait = 1000;
        const assets = await load.any(images, (progress) => {
          if(progress.count >= progress.total){
            setTimeout( function(){
              console.log('All images loaded');
              app.doneLoading();
            }, wait)
          }
        });
      },

      preInitApp: function(){
        console.log('getting app.vue ready');
        // Disable Scroll while app loads assets
        this.bodyNoScroll();
        // Initially set title when app is first created
        this.setPageTitle();
        this.loadImages(this.$props.images.sources);
      },
      initApp: function(){
        // Emits custom event handled by page component in router view
        this.appLoaded();
        this.bodyRestoreScroll();
      },
      beforeEnter: function(el){

      },
      enter: function(el, done){
          this.bodyRestoreScroll();
          if(this.$route.meta.scroll){
            let app = this;
            setTimeout(function(){
              console.log('enter');
              document.documentElement.scrollTop = app.$route.meta.scroll;
            }, 5);
          }
          done();
      },
      beforeLeave: function(el){

      },
      leave: function(el, done){
          done();
      }
    },
    created(){
      this.preInitApp();
    },

    watch: {
      $route: function(to, from){
        // Change page title on route change
        this.setPageTitle();
        // console.log(to);
        // console.log(from);
        let toDepth = to.path.split('/').length;
        let fromDepth = from.path.split('/').length;
        if(toDepth < fromDepth) console.log('higher level');
        if(toDepth > fromDepth) console.log('lower level');
        if(toDepth == fromDepth) console.log('same level');
      }
    }
  }
</script>

<style lang="scss">
  // @import '../../style/global.scss';

</style>
