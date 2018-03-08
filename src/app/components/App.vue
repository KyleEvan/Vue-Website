<template>
  <div id="app">

    <top-nav></top-nav>

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
  // Components
  import TopNav from './TopNav.vue';
  import Scene from './Scene.vue';

  export default {
    name: 'app',
    data(){
      return {
        tl: new TimelineLite({ paused: true })
      }
    },
    components: {
      "top-nav": TopNav,
      "scene": Scene
    },
    methods:{
      beforeEnter: function (el){
        console.log(this.$route)
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
    mounted(){
      this.tl.paused(true);
    }
  }
</script>
