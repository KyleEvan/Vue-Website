<!--

	HTML

-->
<template>
  <div>
    <div :style="{background: primaryColor}" class="background"></div>

    <div class="main-container">

      <div ref="carouselAside" class="carousel-aside" :style="{background: lightColor}">
        <h2 :style="{color: darkColor}">
          <slot name="title"></slot>
        </h2>

        <slot name="description"></slot>

      </div>

      <carousel :progressColor="mediumColor">
        <slot name="slides"></slot>
      </carousel>

    </div>


    <div v-if="extraSlotPassed" class="container" :style="{background: lightColor}">
      <div ref="content">
        <slot name="extra"></slot>
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
  import Carousel from '../Carousel.vue';

  // import { globals } from '../globals.js';


	export default{
		props:['project'],
    data(){
      return{
        defaultPrimaryColor: colors.red,
        defaultLightColor: colors.lightRed,
        defaultMediumColor: colors.mediumRed,
        defaultDarkColor: colors.darkRed,
        // tl: new TimelineLite({paused: true})
      }
    },
    components:{
      carousel: Carousel
    },
    computed:{
      primaryColor: function(){
        return this.$props.project ? this.$props.project.primaryColor : this.defaultPrimaryColor;
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
      animateContent: function(){
        const tl = new TimelineLite();
        let sections = Array.from(this.$refs.carouselAside.children);
        let links = Array.from(this.$refs.carouselAside.querySelectorAll('i'));
        console.log(links);
        let duration = .4;
        tl.staggerTo(sections, duration,
        {
          x: '0',
          opacity: 1,
          delay: .25,
          ease: Power2.easeOut
        }, .1)
        .staggerTo(links, duration*2,{
          x: '10px',
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          ease: Back.easeOut.config(2)
        }, .1)
      },
      initPage: function(){
        this.initEvents();
        this.animateContent();
      }
    },

    mounted(){
      // this.animateScroll();
      // this.initScrollMagic();
      this.initPage();
    },
    updated(){
      // console.log('updated project template');


    },
  }
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../../style/global.scss';



  .carousel-aside,
  .content{
    color: rgba(66, 58, 47, .65);
  }

  .main-container{
    display: flex;
    flex-direction: column-reverse;

    @include medium{
      flex-direction: row;
    }

    .carousel-aside{
      width: 100%;
      height: auto;
      padding: 3%;
      &>*{
        opacity: 0;
        transform: translateX(50px);
      }
      @include medium{
        width: 50%;
        height: 60vh;
        min-height: 100vh;
      }
      h2{
        font-size: 5vw;
      }
      section{
        margin: 2em 0;
      }
      a{
        text-decoration: none;
        font-weight: 900;
        border-bottom: 2.4px solid;
      }

      ul{
        list-style: none;
        margin-top: 0;
        padding: 0;
        li{
          margin: .75em 0;
        }
      }

      section.links{
        li{
          display: flex;
          a{
            i{
              opacity: 0;
              transform: scale(.1);
              display: inline-block;
            }
          }
          // a + span{
          //   margin-left: .4em;
          //   font-size: 130%;
          //   line-height: 1.4;
          //   display: inline-block;
          // }
        }
      }
    }
  }

  .container{
    position: relative;
    color: #4B4742;
    background: #f9fff9;
    width: 100%;
    z-index: 2;

    div{
      padding: 3% 3% 10% 3%;
    }
  }

  .background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #F69296;
    z-index: -1;
  }
</style>
