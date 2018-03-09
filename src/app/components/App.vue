<template>
  <div id="app">

    <navigation></navigation>

    <!-- Top navigation -->

    <!-- Main website content -->
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main"></router-view>
    </transition>

    <!-- Background shapes scene -->
    <scene></scene>
  </div>
</template>

<script>
  import { TimelineLite } from "gsap";
  // import router from './router.js'

  // Components
  import Nav from './Nav.vue';
  import Scene from './Scene.vue';

  export default {
    name: 'app',
    data(){
      return {
        tl: new TimelineLite({ paused: true })
      }
    },
    components: {
      "navigation": Nav,
      "scene": Scene
    },
    methods:{
      beforeEnter: function (el){

      },
      enter: function(el, done){
        console.log("transition entering");
      },
      leave: function(el, done){
        console.log("transition leaving");
        // this.tl.to({
        //
        // })
        // this.tl.onComplete = console.log("heyhey");
        done();

      }
    },
    created(){
      console.log("Hello App created!");
      console.log(this.$route);
      document.title = this.$route.meta.title;

    },
    mounted(){
      this.tl.paused(true);
    },
    watch: {
      $route: function(to, from){
        document.title = to.meta.title;

        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        console.log(to);
        // console.log(fromDepth);
        if(toDepth < fromDepth) console.log('higher level');
        if(toDepth > fromDepth) console.log('lower level');
        if(toDepth == fromDepth) console.log('same level');
        // toDepth < fromDepth ? console.log('higher level') : console.log('lower level');
      }
    }
  }
</script>
