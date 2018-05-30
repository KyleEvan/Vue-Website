<!--

HTML

-->
<template>

  <div id="root">

    <Loader/>

    <Nav />
    <App />

    <div id="scene" ref="scene">
      <h1 id="name" ref="name">{{name}}</h1>
      <!-- <h2>Front End Developer</h2> -->
    </div>

    <Footer />

  </div>

</template>


<!--

JS

-->
<script>
  // Color Palette
  import {colors} from '../colors.js';

  // Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";
  import load from 'load-asset';

  // Components
  import Loader from './Loader.vue';
  import Nav from './Nav.vue';
  import App from './App.vue';
  import Footer from './Footer.vue';

  // JS files
  import { ShapeScene } from '../shapes.js';

  // Images
  import careers_screens_sm_png from '../../images/careers_screens@sm.png';
  import careers_screens_md_png from '../../images/careers_screens@md.png';
  import careers_screens_lg_png from '../../images/careers_screens@lg.png';
  import careers_screens_xl_png from '../../images/careers_screens@xl.png';

  import cycles_lg_jpg from '../../images/cyclesTile@lg.jpg';
  import preview_lg_jpg from '../../images/comboSmash-preview@lg.jpg';

  export default {
   data(){
     return{
       preloadImages: [
         careers_screens_sm_png,
         careers_screens_md_png,
         careers_screens_lg_png,
         careers_screens_xl_png,

         cycles_lg_jpg,
         preview_lg_jpg,
       ],


       scene: undefined,
       shapeColors: [
         colors.red,
         colors.lightTurquoise,
         colors.peach
       ],
       shapesPerLetter: 4,
       name: 'Kyle',
       showName: false,

     }
   },
   components:{
     Loader: Loader,
     Nav: Nav,
     App: App,
     Footer: Footer
   },

   methods:{
     // Utility Methods
     bodyNoScroll: function(){
       const body = document.body;
       body.style.top = `${-(window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0))}px`;
       body.style.position = 'fixed';
       body.style.overflowY = "scroll";
     },
     bodyRestoreScroll: function(){
       const body = document.body;
       body.removeAttribute("style");
     },

     initScene: function(){
       console.log('Scene Initialized in Scene.vue');
       const config = {
         scene: this.$refs.scene,
         name: this.$refs.name,
         devmode: this.devmode,
         showName: this.showName,
         shapeColors: this.shapeColors,
         shapesPerLetter: this.shapesPerLetter
       };
       this.scene = ShapeScene(config);
     },
     initScrollMagic: function(tl){
       const viewport = this.getWindow();
       const root = document.getElementById('root');
       const controller = new ScrollMagic.Controller();
       const mainScene = new ScrollMagic.Scene({
         triggerElement: root,
         triggerHook: 0,
         duration: viewport.clientHeight*.75,
         reverse: true
       })
       .on("progress", (event) => {
         let progress = event.progress;
         tl.progress(progress);
         tl.progress(event.progress);
       })
       .addTo(controller);
     },
     animateScene: function(){
       const tl = new TimelineLite({paused: true});
       const scene = this.$refs.scene;
       const name = this.$refs.name;
       tl.fromTo(name, .3,
       {
         y: '0%',
         opacity: 1
       },
       {
         y: '-50%',
         opacity: 0,
         ease: Power3.easeIn
       })
       .fromTo(scene, .3,
       {
         opacity: 1
       },
       {
         opacity: .25,
         ease: Power0.easeNone
       })
       return tl;
     },
     hideName: function(){
       this.scene.animations.hideLetters();
     },
     async loadImages(){
       const assets = await load.any(this.preloadImages, (progress) => {
         console.log(progress);
         if(progress.count >= progress.total){
           console.log('All images loaded');
           this.initScene();
           this.bodyRestoreScroll();
         }
       });
     },
     preload: function(){
       this.bodyNoScroll();
       // load images
       this.loadImages();
     },

   },
   created(){
     // Initially check if route displays the name
     this.showName = this.$route.meta.showName;
   },
   beforeMount(){
     if(this.devmode){
       console.log(` SHOW NAME: ${this.showName}`);
     }
   },
   mounted(){
     // Preload and Initialize Scene
     this.preload();

     // ScrollMagic Scene
     const tl = this.animateScene();
     this.initScrollMagic(tl);



     // ScrollMagic
     // const scene = document.querySelector('.scene-placeholder');
     // const controller = new ScrollMagic.Controller();
     // const sceneMagic = new ScrollMagic.Scene({
     //   triggerElement: '.scene-placeholder',
     //   triggerHook: 'onLeave',
     //   // duration: 100,
     //   offset: '80px',
     //   reverse: true
     // })
     // .triggerElement('.scene-placeholder')
     // .on('enter', () => {
     //   console.log("hide letters");
     //   console.log(this.showName);
     //   // if(this.showName){
     //     // console.log("hide letters");
     //   if(this.showName){
     //     this.scene.animations.hideLetters();
     //     // TweenLite.to(this.$refs.bgBlack, .6,
     //     // {
     //     //   opacity: 0,
     //     //   ease: Power4.easeIn
     //     // });
     //   }

         // document.body.removeAttribute('class');
         // this.$refs.scene.setAttribute('class', 'bg-white');
       // }

     // })
     // .on('leave', () => {
     //   console.log('on leave');
     //   console.log(this.scene.showName);
     //   if(!this.showName){
     //     this.scene.animations.showLetters();
     //     // TweenLite.to(this.$refs.bgBlack, .6,
     //     // {
     //     //   opacity: 1,
     //     //   ease: Power4.easeOut
     //     // });
     //   }
     // })
     // .addTo(controller);


   },
   watch:{
     $route: function(to, from){
       // console.log(this.$props);
       this.showName = this.$route.meta.showName;
       if(this.showName){
         console.log("showLetters!!!!!");
         this.scene.animations.showLetters();
         // TweenLite.to(this.$refs.bgBlack, .6,
         // {
         //   opacity: 1,
         //   ease: Power4.easeOut
         // });
         // document.body.setAttribute('class', 'bg-black');

       }else{
         this.scene.animations.hideLetters();
         // TweenLite.to(this.$refs.bgBlack, .6,
         // {
         //   opacity: 0,
         //   ease: Power4.easeIn
         // });
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
         height: 130%;
         top: 0;
         left: 0;
         overflow: auto;

         * {
             opacity: 0;
         }
     }
     #name {
         // color: #FF9A91;
         color: #616163;
         margin: 0;
         font-size: 50px;
         text-transform: uppercase;
         font-size: 12vw;
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
