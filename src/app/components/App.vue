<template>
  <div id="app">

    <navigation></navigation>

    <!-- Top navigation -->

    <!-- Main website content -->
    <transition :duration="1000" mode="out-in"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <router-view class="main"></router-view>
    </transition>

    <!-- Background shapes scene -->
    <!-- <scene></scene> -->

    <div id="scene" ref="scene">
      <h1 id="name" ref="name">{{ name }}</h1>
    </div>


  </div>
</template>

<script>
  import { TimelineLite } from "gsap";
  import { ShapeScene } from '../shapes.js';
  // Components
  import Nav from './Nav.vue';
  // import Scene from './Scene.vue';

  export default {
    name: 'app',
    data(){
      return {
        name: 'Kyle',
        displayName: true,
        scene: undefined,
        tl: new TimelineLite({ paused: true })
      }
    },
    components: {
      "navigation": Nav,
      // "scene": Scene
    },
    methods:{
      beforeEnter: function(el){
        console.log("before enter")
        console.log(this.scene);
      },
      enter: function(el, done){
        console.log("transition entering");
        // setTimeout(function(){
        //   done();
        // }, 1000);
      },
      beforeLeave: function(el){
        console.log("before leaving");
        let main = document.querySelector('.main');
        TweenLite.to(main, .5, { y: 50, opacity: 0, ease: Expo.easeIn });

      },
      leave: function(el, done){
        console.log("transition leaving");

        setTimeout(function(){

          done();
        }, 1200);


      }
    },
    created(){
      console.log("Hello App created!");
      console.log(this.$route);
      document.title = this.$route.meta.title;

    },
    mounted(){
      // this.tl.paused(true);
      this.scene = ShapeScene(this.$refs.scene, this.$refs.name);
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

#scene {
    position: fixed;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        * {
            opacity: 0;
        }
    }
    #name {
        // color: #FF9A91;
        color: #7B8A96;
        margin: 0;
        font-size: 50px;
        text-transform: uppercase;
        font-size: 12vw;
        // font-family: 'Montserrat', sans-serif;
        font-family: 'InterUI', sans-serif;
        font-weight: 700;
        user-select: none;

        span {
            display: inline-block;
            position: relative;
            opacity: 0;
            line-height: 0.8;
            padding: 0 0.05em;
            transform: translateY(100%);
        }
    }
    // .transition > * {
    //     transition: 5s cubic-bezier(0.02, 0.1, 0.15, 1);
    // }

}

/****************************************************************

Fallback:
If the broser doesn't support flexbox, don't display the scene

****************************************************************/
// @supports not (display:flex) {
//     #scene {
//         display: none;
//     }
// }
</style>
