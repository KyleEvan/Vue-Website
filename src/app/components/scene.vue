<!--

HTML

-->
<template>

  <div>
    <Nav />
    <div class="bg-white" ref="bgWhite"></div>
    <div class="bg-black" ref="bgBlack"></div>
    <App />
    <div class="scene-placeholder"></div>

    <div id="scene" ref="scene">
      <h1 id="name" ref="name">{{ name }}</h1>
      <!-- <h2>Front End Developer</h2> -->
    </div>


  </div>

</template>


<!--

JS

-->
<script>
  import Nav from './Nav.vue';
  import App from './App.vue';
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";

  import { ShapeScene } from '../shapes.js';

  export default {
   data(){
     return{
       name: 'Kyle',
       scene: {},
       // initialized: false,
       showName: false,
       // bgBlack: 'bg-black',
       // bgWhite: 'bg-white'
     }
   },
   components:{
     Nav: Nav,
     App: App
   },
   // props: ['name', 'showName'],
   methods:{
     init: function(){
       const config = {
         scene: this.$refs.scene,
         name: this.$refs.name,
         devmode: this.devmode,
         showName: this.showName
       };
       this.scene = ShapeScene(config);
     },
     hideName: function(){
       this.scene.animations.hideLetters();
     }
   },
   created(){
     // Check if route displays the name
     this.showName = this.$route.meta.showName;
   },
   beforeMount(){

     // if(this.showName) document.body.setAttribute('class', 'bg-black');

     if(this.devmode){
       console.log(' ******************** ');
       console.log(` SHOW NAME: ${this.showName}`);
       console.log(' ******************** ');
     }

   },
   mounted(){
     this.init();
     const scene = document.querySelector('.scene-placeholder');
     const controller = new ScrollMagic.Controller();
     const sceneMagic = new ScrollMagic.Scene({
       triggerElement: '.scene-placeholder',
       triggerHook: 'onLeave',
       // duration: 100,
       offset: '80px',
       reverse: true
     })
     // .triggerElement('.scene-placeholder')
     .on('enter', () => {
       console.log("hide letters");
       console.log(this.showName);
       // if(this.showName){
         // console.log("hide letters");
       if(this.showName){
         this.scene.animations.hideLetters();
         TweenLite.to(this.$refs.bgBlack, .6,
         {
           opacity: 0,
           ease: Power4.easeIn
         });
       }

         // document.body.removeAttribute('class');
         // this.$refs.scene.setAttribute('class', 'bg-white');
       // }

     })
     .on('leave', () => {
       console.log('on leave');
       console.log(this.scene.showName);
       if(!this.showName){
         this.scene.animations.showLetters();
         TweenLite.to(this.$refs.bgBlack, .6,
         {
           opacity: 1,
           ease: Power4.easeOut
         });
       }
     })
     .addTo(controller);
   },
   watch: {
     $route: function(to, from){
       // console.log(this.$props);
       this.showName = this.$route.meta.showName;
       if(this.showName){
         console.log("showLetters!!!!!");
         this.scene.animations.showLetters();
         TweenLite.to(this.$refs.bgBlack, .6,
         {
           opacity: 1,
           ease: Power4.easeOut
         });
         // document.body.setAttribute('class', 'bg-black');

       }else{
         this.scene.animations.hideLetters();
         TweenLite.to(this.$refs.bgBlack, .6,
         {
           opacity: 0,
           ease: Power4.easeIn
         });
         // document.body.removeAttribute('class');
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

 .bg-black, .bg-white{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: -10;
 }
 .bg-black{
   background: #2D2D2D;
 }
 .bg-white{
   background: #fff;
 }

 .scene-placeholder{
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   z-index: -3;
 }

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
         // filter: blur(1px);

         * {
             opacity: 0;
         }
     }
     #name {
         // color: #FF9A91;
         color: #f9f9f9;
         margin: 0;
         font-size: 50px;
         text-transform: uppercase;
         font-size: 8vw;
         font-family: 'InterUI', sans-serif;
         font-weight: 700;
         user-select: none;
         // text-shadow: 0 0 20px rgba(45, 45, 45, 0.7);
         letter-spacing: 4px;

         span {
             display: inline-block;
             position: relative;
             // opacity: 0;
             line-height: 0.8;
             padding: 0 0.05em;
             // transform: translateY(100%);
         }
     }
     h2{
       font-family: "Noto Sans Japanese";
       font-size: 4vw;
       margin: 3% 0;
       color: #FACDCF;
       opacity: .8;
       // text-shadow: 0 0 20px rgba(45, 45, 45, 0.7);
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
