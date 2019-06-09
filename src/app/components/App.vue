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
        loadingEl: document.querySelector('.loading'),
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
        if(this.loadingEl) this.body.removeChild(this.loadingEl);
      },
      animateOutLoader: function(callback){
        TweenLite.to(this.loadingEl.firstElementChild, .5, {
          scale: 0,
          opacity: 0,
          ease: Back.easeIn
        });
        TweenLite.to(this.loadingEl, .5, {
          opacity: 0,
          ease: Power2.easeIn,
          delay: .5,
          onComplete: () => {
            if(this.dev) console.log('done loading images');
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

        // minimum wait time
        let waitPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('2s min wait time achieved!!');
            resolve(true);
          }, 2000);
        });

        // image assets promise
        let imagesPromise = new Promise((resolve, reject) => {
          resolve(this.loadImages(Object.values(queuedImages)));
        });

        Promise.all([imagesPromise, waitPromise])
        .then((values) => {
          console.log(values);
          let assets = values[0];
          // update key values with returned img elements
          Object.keys(queuedImages).map((key, index) => {
            queuedImages[key] = assets[index];
          });
          app.setAssets(queuedImages);
          app.animateOutLoader(app.initApp);
        });
      },


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
        // this.loadSizedImages(this.animateOutLoader(this.initApp));
        this.loadSizedImages();
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
