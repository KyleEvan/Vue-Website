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
  import Nav from './Nav.vue';
  import Footer from './Footer.vue';
  import Scene from './Scene.vue';
  // JS
  import { getImages } from '../images.js';
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
          showName: this.showName,
          shapeColors: [
            colors.red,
            colors.lightTurquoise,
            colors.peach
          ],
          shapesPerLetter: 4
        };
      }
    },
    created(){
      // Initially set title when app is first created
      document.title = this.$route.meta.title;
      // Disable Scroll while app loads assets
      this.bodyNoScroll();
      this.images = getImages(this.breakpoints, this.viewport.cWidth);
      console.log(this.images);
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
      initEvents: function(){
        // Updates viewport and images data
        const handleResize = this.debounce(() => {
          this.viewport = this.getWindow();
          this.images = getImages(this.breakpoints, this.viewport.cWidth);
        }, 25);
        window.addEventListener('resize', handleResize);
      },
      initScene: function(){
        this.scene = ShapeScene(this.sceneConfig);
      },
      initApp: function(){
        this.initEvents();
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
    // mounted(){
    //   // initApp();
    // },
    updated(){
      console.log("app updated");
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
