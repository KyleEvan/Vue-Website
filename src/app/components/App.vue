<template>
  <div id="app">

    <Nav/>

    <!-- Main website content -->
    <transition mode="in-out"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main" ref="main" :images="images" :events="eventBus"></router-view>
    </transition>

    <Scene ref="scene" :scene="scene">
      <h1 id="name" style="opacity: 0;" ref="name">Kyle</h1>
    </Scene>

    <Footer/>

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
  import Nav from './Nav.vue';
  import Footer from './Footer.vue';
  import Scene from './Scene.vue';

  // JS
  import { ShapeScene } from '../shapes.js';


  export default {
    // inheritAttrs: false,
    props: ['images'],
    name: 'app',
    data(){
      return {
        loader: document.getElementById('loader'),
        scene: undefined,
        tl: new TimelineLite({ paused: true }),
        eventBus: new Vue()
      }
    },
    components:{
      Nav: Nav,
      Footer: Footer,
      Scene: Scene
    },
    computed:{
      sceneConfig: function(){
        return {
          scene: this.$refs.scene.$el,
          name: this.$refs.name,
          devmode: this.devmode,
          shapeColors: [
            // '#E3A9AB',
            // '#7CE8CE',
            // '#E8C3B1',
            // '#A2E3E8'
            // experimental palette

            // https://coolors.co/e9ede7-cddcd1-bac9c5-aeb9ba-acb2b5
            // https://colorleap.app/time/2000BC
            // https://coolors.co/cad2c5-84a98c-52796f-354f52-2f3e46
            '#CDDCD1',
            '#BAC9C5',
            '#AEB9BA'
          ],
          shapesPerLetter: 4
        };
      }
    },
    methods:{
      setTitle: function(){
        document.title = this.$route.meta.title;
      },
      appLoaded: function(){
        this.eventBus.$emit('app-loaded');
      },
      destroyLoader: function(){
        // while (this.el.firstChild) {
        //   this.el.removeChild(this.el.firstChild);
        // }
        this.body.removeChild(this.loader);
      },
      doneLoading: function(){
        TweenLite.to(this.loader, .3, {
          opacity: 0,
          ease: Power2.easeIn,
          onComplete: () => {
            this.destroyLoader();
            this.initApp();
          }
        });
      },
      async loadImages(images){
        const assets = await load.any(images, (progress) => {
          if(progress.count >= progress.total){
            console.log('All images loaded');
            this.doneLoading();
          }
        });
      },
      initScene: function(){
        // Init shape scene
        // this.scene = ShapeScene(this.sceneConfig);
      },
      initApp: function(){
        // Emits custom event handled by page component in router view
        this.appLoaded();
        // Plays shape scene
        this.initScene();
        this.bodyRestoreScroll();
      },
      beforeEnter: function(el){

      },
      enter: function(el, done){
          done();
      },
      beforeLeave: function(el){

      },
      leave: function(el, done){
          done();
      }
    },
    created(){
      console.log('creating app.vue');
      // Disable Scroll while app loads assets
      this.bodyNoScroll();
      // Initially set title when app is first created
      this.setTitle();

      this.loadImages(this.$props.images.sources);
    },
    mounted(){

    },
    updated(){

    },
    watch: {
      $route: function(to, from){
        // Change page title on route change
        this.setTitle();

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
