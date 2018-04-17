<!--

HTML

-->
<template>
  <div id="scene" ref="scene">
    <h1 id="name" ref="name">{{ name }}</h1>
  </div>
</template>


<!--

JS

-->
<script>
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";

  import { ShapeScene } from '../shapes.js';

  export default {
   data(){
     return{
       name: 'Kyle',
       scene: {},
       // initialized: false,
       showname: false
     }
   },
   // props: ['name', 'showName'],
   methods:{
     init: function(){
       this.scene = ShapeScene(this.$refs.scene, this.$refs.name, this.devmode, this.showname);
     },
     hideName: function(){
       this.scene.animations.hideLetters();
     }
   },
   created(){
     // Check if route displays the name
     this.showname = this.$route.meta.showName;
   },
   beforeMount(){


     if(this.devmode){
       console.log(' ******************** ');
       console.log(` SHOW NAME: ${this.showname}`);
       console.log(' ******************** ');
     }
   },
   mounted(){
     this.init();
     const app = document.getElementById('app');
     const controller = new ScrollMagic.Controller();
     const sceneMagic = new ScrollMagic.Scene({
       triggerElement: app,
       triggerHook: .2,
       duration: 200,
       reverse: true
     })
     .on('leave', () => {
      // if(this.showName){

      // }

     })
     // .on('enter', () => {
     //   console.log('on enter');
     //   console.log(this.scene.showName);
     //
     // })
     .addTo(controller);
   },
   watch: {
     $route: function(to, from){
       this.showName = this.$route.meta.showName;
       if(this.showName){
         console.log("showLetters!!!!!")
         this.scene.animations.showLetters();
       }else{
         this.scene.animations.hideLetters();

       }
     }
   }
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
         color: #645D54;
         margin: 0;
         font-size: 50px;
         text-transform: uppercase;
         font-size: 12vw;
         font-family: 'InterUI', sans-serif;
         font-weight: 700;
         user-select: none;

         span {
             display: inline-block;
             position: relative;
             // opacity: 0;
             line-height: 0.8;
             padding: 0 0.05em;
             // transform: translateY(100%);
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
