<template>
  <div id="app">

    <!-- <Loader :init="initApp"/> -->
    <Nav/>

    <!-- Main website content -->
    <transition mode="in-out"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main" ref="main"></router-view>
    </transition>

    <Scene ref="scene" :scene="scene">
      <h1 id="name" style="opacity:0;" ref="name">Kyle</h1>
    </Scene>

    <Footer/>

  </div>
</template>

<script>
  // Color Palette
  import {colors} from '../colors.js';
  // Libraries
  import { TimelineLite } from "gsap";
  import load from 'load-asset';
  // Components
  // import Loader from './Loader.vue';
  import Nav from './Nav.vue';
  import App from './App.vue';
  import Footer from './Footer.vue';
  import Scene from './Scene.vue';
  // JS
  import { ShapeScene } from '../shapes.js';


  export default {
    name: 'app',
    data(){
      return {
        loader: document.getElementById('loader'),
        scene: undefined,
        tl: new TimelineLite({ paused: true }),
        showName: undefined,
      }
    },
    components:{
      // Loader: Loader,
      Nav: Nav,
      App: App,
      Footer: Footer,
      Scene: Scene
    },
    created(){
      // Initially set title when app is first created
      document.title = this.$route.meta.title;
      this.bodyNoScroll();
      this.loadImages();
    },
    methods:{
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
            console.log('Loading Finished');
            this.destroyLoader();
            this.initApp();
          }
        });
      },
      async loadImages(){
        const assets = await load.any(this.images.sources, (progress) => {
          if(progress.count >= progress.total){
            console.log('All images loaded');
            this.doneLoading();
          }
        });
      },
      initScene: function(){
        const config = {
          scene: this.$refs.scene.$el,
          name: this.$refs.name,
          devmode: this.devmode,
          showName: this.showName,
          shapeColors: [
            colors.red,
            colors.lightTurquoise,
            colors.peach
          ],
          shapesPerLetter: 4
        };
        this.scene = ShapeScene(config);
        console.log('Scene Initialized in Scene.vue');
      },
      initApp: function(){
        this.initScene();
        this.bodyRestoreScroll();

      },

      beforeEnter: function(el){
        // console.log("before enter")
      },
      enter: function(el, done){
        // console.log("transition entering");
        // setTimeout(function(){
          // console.log("transition entering");
          done();
        // }, 1000)
      },
      beforeLeave: function(el){
        // console.log("before leaving");
      },
      leave: function(el, done){
        console.log("transition leaving");
        // setTimeout(function(){
          // const body = document.body;
          // body.removeAttribute("style");
          done();
        // }, 1600);
      }
    },
    mounted(){
      // initApp();
    },
    updated(){
      // console.log(this.images);
    },
    watch: {
      $route: function(to, from){
        // Change page title on route change
        document.title = to.meta.title;
        this.showName = this.$route.meta.showName;

        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if(toDepth < fromDepth) console.log('higher level');
        if(toDepth > fromDepth) console.log('lower level');
        if(toDepth == fromDepth) console.log('same level');
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/global.scss';

</style>
