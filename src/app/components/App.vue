<template>
  <div id="app">

    <nav-content :events="eventBus"/>
    <home-title class="content inner-content" :events="eventBus"/>

    <transition mode="in-out"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >

      <!-- <home-title  class="content" /> -->

      <router-view class="main" ref="main" :images="images" :events="eventBus">

      <!-- Main View -->
      </router-view>
    </transition>

    <!-- <scene ref="scene" :events="eventBus" /> -->

    <footer-content/>

  </div>
</template>

<script>
  import Vue from 'vue';

  // Color Palette
  import {colors} from '../colors.js';

  // Libraries
  import { TimelineLite } from "gsap";
  // import load from 'load-asset';

  // Components
  import nav from './nav.vue';
  import footer from './footer.vue';
  // import scene from './scene.vue';
  import homeTitle from './home-title.vue';


  export default {
    // inheritAttrs: false,
    props: ['images'],
    name: 'app',
    data(){
      return {
        init: false,
        loading_el: document.querySelector('.loading'),
        // tl: new TimelineLite({ paused: true }),
        eventBus: new Vue()
      }
    },
    components:{
      'nav-content': nav,
      'footer-content': footer,
      'home-title': homeTitle,
      // scene: scene
    },
    // computed: {
    //   scene(){
    //     return scene;
    //   }
    // },
    methods:{
      destroyLoader: function(){
        // while (this.loading_el.firstChild) {
        //   this.el.removeChild(this.el.firstChild);
        // }
        this.body.removeChild(this.loading_el);
      },
      animateOutLoader: function(callback){
        const spinner = document.querySelector('.spinner');
        TweenLite.to(spinner, .6, {
          scale: .25,
          opacity: 0,
          ease: Power2.easeOut
        });
        TweenLite.to(this.loading_el, .6, {
          opacity: 0,
          ease: Power2.easeIn,
          // delay: 999,
          onComplete: () => {
            console.log('done loading images');
            this.destroyLoader();
            // this.initApp();
            callback();
          }
        });
      },
      setPageTitle: function(){
        document.title = this.$route.meta.title;
      },
      appLoaded: function(){
        this.eventBus.$emit('app-loaded');
        this.init = true;
        console.log('app loaded');
      },
      pageTransitioned: function(){
        if(this.init) {
          this.eventBus.$emit('page-transitioned');
          console.log('page transitioned');
        }
      },

      doneLoading: function(){
        // 1. animate out the loading screen and then remove elements from dom to clean it up
        // 2. initialize app and fire app-loaded event keying off child element animations
        //    - animate in title text and navigation synchronously
        // 3. child vue components fire event after animating
        //    - title-loaded keys off the scene initialization
        this.animateOutLoader(this.initApp);

      },
      // async loadImages(images){
      //   const app = this;
      //   const wait = 1000;
      //   console.log(images);
      //   const assets = await load.any(images, (progress) => {
      //     if(progress.count >= progress.total){
      //       setTimeout( function(){
      //         console.log('All images loaded');
      //         app.doneLoading();
      //       }, wait)
      //     }
      //   });
      //   console.log(assets);
      // },

      preInitApp: function(){
        this.dev('getting things reading in App.vue ...');

        // Initially set title when app is first created
        this.setPageTitle();

        // Add event listeners to recieve signals from child components
        this.eventBus.$on('title-loaded', () => {
          console.log('title loaded listener in App.vue');
        });

        // Disable Scroll while app loads assets
        this.bodyNoScroll();
        // loading sized images
        this.loadImages(this.$props.images.sources, this.doneLoading);
      },
      initApp: function(){
        // Emits custom event handled by page component in router view
        this.appLoaded();
        // console.log(this.initScene);
        this.bodyRestoreScroll();
      },
      beforeEnter: function(el){
        this.bodyRestoreScroll();

      },
      enter: function(el, done){
          // console.log(el);
          // if(this.$route.meta.scroll){
          //   let app = this;
          //   setTimeout(function(){
          //     console.log('enter');
          //     document.documentElement.scrollTop = app.$route.meta.scroll;
          //     app.pageTransitioned();
          //     done();
          //   }, 5);
          // }else {
            done();
          // }
      },
      afterEnter: function(el){
        this.pageTransitioned();

      },
      beforeLeave: function(el){
        console.log('this should happen before anything pretty mch');
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
