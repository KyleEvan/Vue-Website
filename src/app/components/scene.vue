<!--

HTML

-->
<template>

    <div id="scene" ref="scene">
      <slot ref="name"></slot>
    </div>

</template>


<!--

JS

-->
<script>

  // Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";


  export default {
   props: ["scene"],
   data(){
     return{
       initialized: false,
       tl: new TimelineLite({paused: true})
     }
   },

   methods:{

     initScrollMagic: function(){
       const app = document.getElementById('app');
       const controller = new ScrollMagic.Controller();
       const mainScene = new ScrollMagic.Scene({
         triggerElement: app,
         triggerHook: 0,
         duration: this.viewport.cHeight*.75,
         reverse: true
       })
       .on("progress", (event) => {
         let progress = event.progress;
         this.tl.progress(progress);
         this.tl.progress(event.progress);
       })
       .addTo(controller);
     },
     animateScene: function(){
       // const tl = new TimelineLite({paused: true});
       // console.log(this.$props.scene);
       // const scene = this.$props.scene.DOM.el;
       const scene = this.$refs.scene;
       // const scene = document.getElementById('scene');
       const name = document.getElementById('name');
       console.log(scene);
       console.log(name);
       // const name = this.$props.scene.DOM.children.name.el;
       this.tl.fromTo(name, .3,
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
         opacity: 0,
         ease: Power0.easeNone
       })
       // return tl;
     },

     hideName: function(){
       // this.scene.animations.hideLetters();
     },


   },
   created(){
     // Initially check if route displays the name
     // this.showName = this.$route.meta.showName;
   },
   beforeMount(){

   },
   mounted(){
     // ScrollMagic Scene
     // const tl = this.animateScene();
   },
   updated(){
     // if(this.$props.scene && !this.initialized){
       this.animateScene();
       this.initScrollMagic();
       this.initialized = !this.initialized;
     // }
   },
   watch:{
     $route: function(to, from){
       // console.log(this.$props);
       // this.showName = this.$route.meta.showName;
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
         color: #616163;
         margin: 0;
         font-size: 50px;
         text-transform: uppercase;
         font-size: 12vw;
         font-family: 'InterUI', sans-serif;
         font-weight: 700;
         user-select: none;
         letter-spacing: 4px;

         span {
             display: inline-block;
             position: relative;
             line-height: 0.8;
             padding: 0 0.05em;
         }
     }
     h2{
       font-family: "Noto Sans Japanese";
       font-size: 4vw;
       margin: 3% 0;
       color: #FACDCF;
       opacity: .8;
     }

 }

 </style>
