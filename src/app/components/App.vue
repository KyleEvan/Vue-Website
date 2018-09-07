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
      <router-view class="main" ref="main" :images="images"></router-view>
    </transition>

    <Scene ref="scene" :scene="scene">
      <h1 id="name" style="opacity: 0;" ref="name">Kyle</h1>
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
  import { ShapeScene } from '../shapes.js';


  export default {
    props: ['images'],
    name: 'app',
    data(){
      return {
        loader: document.getElementById('loader'),
        scene: undefined,
        tl: new TimelineLite({ paused: true }),
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
            colors.red,
            colors.lightTurquoise,
            colors.peach
          ],
          shapesPerLetter: 4
        };
      }
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
      async loadImages(images){
        const assets = await load.any(images, (progress) => {
          if(progress.count >= progress.total){
            console.log('All images loaded');
            this.doneLoading();
          }
        });
      },
      initScene: function(){
        this.scene = ShapeScene(this.sceneConfig);
      },
      initApp: function(){
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
      document.title = this.$route.meta.title;

      this.loadImages(this.$props.images.sources);
    },
    mounted(){

    },
    updated(){

    },
    watch: {
      $route: function(to, from){
        // Change page title on route change
        document.title = to.meta.title;

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
