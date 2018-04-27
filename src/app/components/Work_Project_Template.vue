<!--

	HTML

-->
<template>
  <div>
    <div :style="{background: backgroundColor}" class="background"></div>

    <div class="main-container">
      <div class="carousel-aside" :style="{background: lightBackground}">
        <!-- <template slot="title"> -->
        <h2 :style="{color: darkColor}">
          <slot name="title"></slot>
        </h2>
        <!-- </template> -->
        <slot name="description"></slot>
        <slot name="skills"></slot>
      </div>
      <carousel :progressColor="progressColor">
        <slot name="imageSlides"></slot>
      </carousel>
    </div>


    <div class="container" :style="{background: lightBackground}">
      <div class="content" ref="content">
        <slot></slot>
      </div>

    </div>

  </div>
</template>

<!--

	JS

-->
<script>
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";
  import Carousel from './Carousel.vue';

	export default{
		props:['project'],
    data(){
      return{
        defaultProgressColor: '#E3A9AB',
        defaultBgColor: '#F9B9BC',
        defaultLightBgColor: '#FCDFE0',
        defaultDarkColor: '#CC989A'
      }
    },
    components:{
      carousel: Carousel
    },
    computed: {
      progressColor: function(){
        let color = this.$props.project ? this.$props.project.mediumColor : this.defaultProgressColor;
        return color;
      },
      backgroundColor: function(){
        let color = this.$props.project ? this.$props.project.primaryColor : this.defaultBgColor;
        return color;
      },
      lightBackground: function(){
        let color = this.$props.project ? this.$props.project.lightColor : this.defaultLightBgColor;
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
          ease: Power0.easeNone
        });
        return tl;
      }
    },
    mounted(){
      const tl = this.animateFlickity();
      this.initScrollMagic(tl);

    }
  }
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../style/global.scss';
  .main-container{
    display: flex;
    flex-direction: column-reverse;
    @include medium{
      flex-direction: row;
    }
    .carousel-aside{
      width: 100%;
      height: 50vh;
      padding: 3%;
      @include medium{
        width: 50%;
        height: 100vh;
      }
      h2{
        font-size: 5vw;
      }
    }
  }

  .container{
    position: relative;
    color: #4B4742;
    background: #f9fff9;
    width: 100%;
    z-index: 2;

    .content{
      padding: 5em 8% 3em 8%;
    }
  }

  // .carousel-aside{
  p, ul{
    opacity: .75;
  }

  // }

  .background{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #F69296;
    z-index: -2;
  }
</style>
