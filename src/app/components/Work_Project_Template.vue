<!--

	HTML

-->
<template>
  <div>
    <div :style="{background: backgroundColor}" class="background"></div>

    <div class="main-container">
      <div class="carousel-aside" :style="{background: lightBackground}">
        <slot name="title"></slot>
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
  import { TimelineLite } from "gsap";
  import Carousel from './Carousel.vue';

	export default{
		props:['project'],
    data(){
      return{
        defaultProgressColor: '#CC989A',
        defaultBackgroundColor: '#F9B9BC',
        defaultLightBgColor: '#FCDFE0'
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
        let color = this.$props.project ? this.$props.project.primaryColor : this.defaultBackgroundColor;
        return color;
      },
      lightBackground: function(){
        let color = this.$props.project ? this.$props.project.lightColor : this.defaultLightBgColor;
        return color;
      }
    },
    mounted(){
      let tl = new TimelineLite();
      tl.fromTo(this.$refs.content, .6, {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        ease: Expo.easeOut
      })
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
    flex-direction: column;
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
