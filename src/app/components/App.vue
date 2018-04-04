<template>
  <div id="app">

    <navigation />

    <!-- Main website content -->
    <transition mode="out-in"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main"></router-view>
    </transition>

    <!-- Background shapes scene -->
    <scene ref="scene" name="Kyle" />

  </div>
</template>

<script>
  import { TimelineLite } from "gsap";

  // Components
  import Nav from './Nav.vue';
  import Scene from './Scene.vue';

  export default {
    name: 'app',
    data(){
      return {
        scene: undefined,
        tl: new TimelineLite({ paused: true })
      }
    },
    components: {
      "navigation": Nav,
      "scene": Scene
    },
    created(){
      console.log("Hello App created!");
      console.log(this.$route);
      document.title = this.$route.meta.title;

    },
    mounted(){
      this.scene = this.$refs.scene;
      console.log(Scene);
      this.scene.init();
    },
    methods:{
      beforeEnter: function(el){
        console.log("before enter")
        console.log(this.scene);

      },
      enter: function(el, done){
        setTimeout(function(){
          console.log("transition entering");
        }, 1000)
        if(this.$route.meta.showName){
          console.log("Show Name");

        }
      },
      beforeLeave: function(el){
        console.log("before leaving");

        let body = document.body;
        body.style.top = `${-(window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0))}px`;
        body.style.position = 'fixed';
        body.style.overflowY = "scroll";

        let container = document.querySelector('.container');
        TweenLite.to(container, .5, { y: 50, opacity: 0, ease: Expo.easeIn });

      },
      leave: function(el, done){
        console.log("transition leaving");
        setTimeout(function(){
          let body = document.body;
          body.removeAttribute("style");
          done();
        }, 1600);


      }
    },
    watch: {
      $route: function(to, from){
        document.title = to.meta.title;

        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        console.log(to);
        if(toDepth < fromDepth) console.log('higher level');
        if(toDepth > fromDepth) console.log('lower level');
        if(toDepth == fromDepth) console.log('same level');
        // toDepth < fromDepth ? console.log('higher level') : console.log('lower level');
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/global.scss';

</style>
