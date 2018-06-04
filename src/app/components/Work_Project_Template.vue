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
        <slot name="imageSlides"></slot>
      </carousel>

    </div>


    <div class="container" :style="{background: lightColor}">
      <div ref="content">
        <slot></slot>
      </div>

    </div>

  </div>
</template>

<!--

	JS

-->
<script>
  // Color Palettes
  import {colors} from '../colors.js';

  // Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";

  // Components
  import Carousel from './Carousel.vue';


	export default{
		props:['project'],
    data(){
      return{
        defaultPrimaryColor: colors.red,
        defaultLightColor: colors.lightRed,
        defaultMediumColor: colors.mediumRed,
        defaultDarkColor: colors.darkRed
      }
    },
    components:{
      carousel: Carousel
    },
    computed: {
      primaryColor: function(){
        let color = this.$props.project ? this.$props.project.primaryColor : this.defaultPrimaryColor;
        return color;
      },
      lightColor: function(){
        let color = this.$props.project ? this.$props.project.lightColor : this.defaultLightColor;
        return color;
      },
      mediumColor: function(){
        let color = this.$props.project ? this.$props.project.mediumColor : this.defaultMediumColor;
        return color;
      },
      darkColor: function(){
        let color = this.$props.project ? this.$props.project.darkColor : this.defaultDarkColor;
        return color;
      }
    },
    methods: {
      initScrollMagic: function(tl){
        const mainContainer = document.querySelector('.main-container');
        const controller = new ScrollMagic.Controller();
        const workScene = new ScrollMagic.Scene({
          triggerElement: mainContainer,
          triggerHook: 0,
          duration: '100%',
          reverse: true
        })
        .on("progress", (event) => {
          let progress = event.progress;
          tl.progress(progress);
          tl.progress(event.progress);
        })
        .addTo(controller);
      },
      animateFlickity: function(){
        const tl = new TimelineLite({paused: true});
        const flickity = document.getElementById('flickityContainer');
        tl.fromTo(flickity, .3,
        {
          y: '0%',
          opacity: 1
        },
        {
          y: '5%',
          opacity: 0,
          ease: Power4.easeOut
        });
        return tl;
      }
    },
    mounted(){
      const tl = this.animateFlickity();
      this.initScrollMagic(tl);

      console.log(this.$refs.carouselAside.children);
      // get children and animate them rtl on enter
    }
  }
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../style/global.scss';

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
      height: 60vh;
      padding: 3%;

      @include medium{
        width: 50%;
        height: auto;
        min-height: 100vh;
      }
      h2{
        font-size: 5vw;
        opacity: 1;
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

          a + span{
            margin-left: .4em;
            font-size: 130%;
            line-height: 1.4;
            display: inline-block;
          }
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
    z-index: -5;
  }
</style>
