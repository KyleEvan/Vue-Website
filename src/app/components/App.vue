<template>
  <div id="app">

    <nav-content :events="eventBus"/>

    <transition mode="in-out"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main" ref="main" :images="images" :assets="assets" :events="eventBus">
        <!-- Main View -->

      </router-view>
    </transition>

    <footer-content/>

  </div>
</template>

<script>
  import Vue from 'vue';

  // Color Palette
  import {colors} from '../colors.js';

  // Libraries
  import { TimelineLite } from "gsap";

  // Components
  import nav from './nav.vue';
  import footer from './footer.vue';


  export default {
    // inheritAttrs: false,
    props: ['images'],
    name: 'app',
    data(){
      return {
        init: false,
        loading_el: document.querySelector('.loading'),
        assets: undefined,
        eventBus: new Vue()
      }
    },
    components:{
      'nav-content': nav,
      'footer-content': footer,
    },
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
          delay: 1,
          onComplete: () => {
            this.dev('done loading images');
            this.destroyLoader();
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
        this.dev('app loaded');
      },
      pageTransitioned: function(){
        if(this.init) {
          this.eventBus.$emit('page-transitioned');
          this.dev('page transitioned');
        }
      },
      setAssets(updatedImages){
        this.assets = updatedImages;
        this.dev(this.assets);
      },
      loadSizedImages: function(func){
        let app = this;
        let queuedImages = {};
        let allImagesArr = Object.keys(this.$props.images.all);
        // set properties of queuedImages object
        for(var i = 0; i < allImagesArr.length; i++){
          let image = allImagesArr[i];
          if(this.$props.images.all[image].project === true){
            queuedImages[image] = this.$props.images.sized[image];
          }
        }
        // update key values with returned img elements
        let done = function(assets){
          Object.keys(queuedImages).map((key, index) => {
            queuedImages[key] = assets[index];
          });
          app.setAssets(queuedImages);
          if(func) func();
        }
        this.loadImages(Object.values(queuedImages), done);
      },
      // doneLoading: function(){
      //   // console.log(assets);
      //   // Object.keys(this.preloadedImages).map((key, index) => {
      //   //   this.preloadedImages[key] = assets[index];
      //   // });
      //   // console.log(this.preloadedImages);
      //   // this.assets = this.preloadedImages;
      //   // 1. animate out the loading screen and then remove elements from dom to clean it up
      //   // 2. initialize app and fire app-loaded event keying off child element animations
      //   //    - animate in title text and navigation synchronously
      //   // 3. child vue components fire event after animating
      //   //    - title-loaded keys off the scene initialization
      //   this.animateOutLoader(this.initApp);
      //
      // },
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
        // this.eventBus.$on('title-loaded', () => {
        //   console.log('title loaded listener in App.vue');
        // });

        // Disable Scroll while app loads assets
        this.bodyNoScroll();


        // after sized images are loaded animate out loader then init the app
        this.loadSizedImages(this.animateOutLoader(this.initApp));
      },
      initApp: function(){
        // Emits custom event handled by page component in router view
        this.appLoaded();
        this.bodyRestoreScroll();
      },
      beforeEnter: function(el){
        this.bodyRestoreScroll();
      },
      enter: function(el, done){
        done();
      },
      afterEnter: function(el){
        this.pageTransitioned();
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
      images: function(newVal, oldVal){
        this.loadSizedImages();
      },
      $route: function(to, from){
        // Change page title on route change
        this.setPageTitle();
        // let toDepth = to.path.split('/').length;
        // let fromDepth = from.path.split('/').length;
        // if(toDepth < fromDepth) console.log('higher level');
        // if(toDepth > fromDepth) console.log('lower level');
        // if(toDepth == fromDepth) console.log('same level');
      }
    }
  }
</script>

<style lang="scss">
  // @import '../../style/global.scss';

</style>
