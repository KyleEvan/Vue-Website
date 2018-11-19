<!--

HTML

-->
<template>

    <div id="scene" ref="scene"></div>

</template>


<!--

JS

-->
<script>

  // Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";

  import {colors} from '../colors.js';

  import {Scene} from "../shapes.js";

  export default {
   props: ['events'],
   data(){
     return{
       scene: undefined,
       shapes: undefined,
       tl: new TimelineLite({paused: true})
     }
   },

   methods:{
     createShapes: function(){
       this.scene = new Scene({
         scene: this.$refs.scene,
         devmode: this.devmode,
         totalShapes: 12,
         shapes_size: [.0075, .35],
         shapes_colors: [
           '#CDDCD1',
           '#BAC9C5',
           '#AEB9BA'
         ],
         shapes_moveDur: 4,
         shapes_delay: .013,
       })
     },
     init: function(){
       console.log('init scene.vue');
       this.createShapes();
       this.scene.init();
       this.initScrollMagic();
     },

     initScrollMagic: function(){
       const app = document.getElementById('app');
       const controller = new ScrollMagic.Controller();
       const mainScene = new ScrollMagic.Scene({
         triggerElement: app,
         triggerHook: 0,
         duration: app.clientHeight*.5,
         reverse: true
       })
       .on("progress", (event) => {
         let progress = event.progress;
         this.tl.progress(progress);
         this.tl.progress(event.progress);
       })
       .addTo(controller);
       this.animateScene();
     },
     animateScene: function(){
       const scene = this.$refs.scene;
       this.tl.fromTo(scene, 1,
       {
         y: '0%',
         opacity: 1
       },
       {
         y: '-5%',
         opacity: .15,
         ease: Power3.easeIn
       })
     },

   },
   created(){
     const scene = this;
     this.events.$on('app-loaded', () => {
       scene.init();
     });
   },
   beforeMount(){

   },
   mounted(){

   },
   updated(){

   },

  }
</script>


<!--

  Styles/SCSS

 -->
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
     flex-direction: column;

     svg {
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         overflow: unset;
         transform: scale(.01, .01);
         opacity: 0;
         // * {
             // opacity: 0;
         // }
     }

 }

 </style>
