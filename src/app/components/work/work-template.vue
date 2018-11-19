<!--

	HTML

-->
<template>
  <div>
    <div :style="{background: lightColor}" class="template_bg">
      <div class="template_main">
        <!-- main work info -->
        <!-- <div v-if="project" ref="aside_curtain" class="aside_curtain" style="#fff" ></div> -->
        <div class="template_aside" >
          <div ref="carouselAside">
            <h1 :style="{color: mainColor}" class="template_title">
              <slot name="title"></slot>
            </h1>
            <slot name="description"></slot>
          </div>
        </div>
        <!-- main work images -->
        <carousel :progressColor="mediumColor">
          <slot name="slides"></slot>
        </carousel>
      </div>

      <!-- extra work info -->
      <div v-if="extraSlotPassed" class="template_extra" >
        <div>
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<!--

	JS

-->
<script>
  // Color Palettes
  import {colors} from '../../colors.js';

  // Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";

  // Components
  import carousel from '../carousel.vue';

  // import { globals } from '../globals.js';


	export default{
		props:['project', 'events'],
    data(){
      return{
        defaultLightColor: colors.templateDefaultLightc1,
        defaultMediumColor: colors.templateDefaultMediumc1,
        defaultMainColor: colors.templateDefaultMediumc2,
        defaultDarkColor: colors.lightRed,
      }
    },
    components:{
      carousel: carousel
    },
    computed:{
      mainColor: function(){
        return this.$props.project ? this.$props.project.mainColor : this.defaultMainColor;
      },
      lightColor: function(){
        return this.$props.project ? this.$props.project.lightColor : this.defaultLightColor;
      },
      mediumColor: function(){
        return this.$props.project ? this.$props.project.mediumColor : this.defaultMediumColor;
      },
      darkColor: function(){
        return this.$props.project ? this.$props.project.darkColor : this.defaultDarkColor;
      },
      extraSlotPassed: function(){
        return !!this.$slots['extra'];
      }
    },
    methods:{
      // initScrollMagic: function(){
      //   const mainContainer = document.querySelector('.main-container');
      //   const controller = new ScrollMagic.Controller();
      //   const workScene = new ScrollMagic.Scene({
      //     triggerElement: mainContainer,
      //     triggerHook: 0,
      //     duration: '100%',
      //     reverse: true
      //   })
      //   .on("progress", (event) => {
      //     let progress = event.progress;
      //     this.tl.progress(progress);
      //     this.tl.progress(event.progress);
      //   })
      //   .addTo(controller);
      // },
      // animateScroll: function(){
      //   // const tl = new TimelineLite({paused: true});
      //   const flickity = document.getElementById('flickityContainer');
      //   this.tl.fromTo(flickity, .3,
      //   {
      //     y: '0%',
      //     opacity: 1
      //   },
      //   {
      //     y: '5%',
      //     opacity: 0,
      //     ease: Power4.easeOut
      //   });
      //   // return tl;
      // },
      initEvents: function(){
        // const template = this;
        // const handleResize = this.debounce(function() {
        //   this.images = globals.getImages();
        //   console.log(this.images);

          // te.setProgressBar();
        // }, 30);
        // window.addEventListener('resize', handleResize);
      },
      determineViewport: function(){
        return  this.viewport.cWidth < this.breakpoints.md ? 'mobile' : 'desktop';
      },
      animateContent: function(){
        let dur = this.$props.project ? .6 : 0;
        let aside = document.querySelector('.template_aside');
        TweenLite.to(aside, dur,
        {
          x: '0',
          ease: Power3.easeOut
        });
        TweenLite.to(this.$refs.carouselAside, dur*1.25,
        {
          x: '0',
          opacity: 1,
          ease: Power2.easeInOut
        });
      },
      // animateCurtain: function(func){
      //   TweenLite.to(aside, .45,
      //   {
      //     x: '0%',
      //     ease: Power4.easeIn,
      //     delay: .3,
      //     onComplete: () => {
      //       if(func) func();
      //     }
      //   });
      // },
      initPage: function(){
        // if(this.$props.project) {
          // if(this.determineViewport() == 'mobile') this.$refs.aside_curtain.classList.add('mobile');
        this.animateContent();
          // this.animateCurtain(this.animateContent);
        // }
      }
    },
    created(){
        this.events.$on('app-loaded', () => {
          console.log('init work template');
          this.initPage();
        });
    },
    mounted(){
      // this.animateScroll();
      // this.initScrollMagic();
      this.initPage();
      console.log('init work template');
      console.log(this.$props.project);

    }
  }
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../../style/global.scss';

  .template_aside,
  .template_extra{
    color: rgba(66, 58, 47, .65);
    background: #fff;
  }

  .template_bg{
    background: #F69296;

    .template_main{
      display: flex;
      flex-direction: column-reverse;
      @include md{
        flex-direction: row;
      }
      // .aside_curtain{
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 50%;
      //   height: 100vh;
      //   z-index: 99;
      //   &.mobile{
      //     width: 100%;
      //     height: 50vh;
      //     top: 400px;
      //   }
      // }

      .template_aside{
        position: relative;
        width: 100%;
        height: auto;
        padding: 2em;
        z-index: 2;
        transform: translateX(-100%);

        &>div{
          opacity: 0;
          transform: translateX(-10%);
        }

        // &>*{
        //   opacity: 0;
        //   transform: translateX(10%);
        // }
        @include md{
          width: 50%;
          height: 60vh;
          min-height: 100vh;
        }

        .template_title{
          font-size: 1.8em;
        }

        section{
          margin: 2em 0;
        }
      }
    }
    .template_extra{
      position: relative;
      z-index: 1;
      div {
        padding: 3% 3% 10% 3%;
      }
    }
  }


</style>
