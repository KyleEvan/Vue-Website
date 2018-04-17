<!--

	HTML

-->
<template>
  <div>
    <carousel :progressColor="progressColor">
      <slot name="imageSlides"></slot>
    </carousel>
    <div class="container">
      <div class="content" ref="content">
        <slot></slot>
      </div>
    </div>
    <div :style="{background: backgroundColor}" class="background"></div>
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
        defaultProgressColor: '#E88278',
        defaultBackgroundColor: '#F69296'
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
  // @import '../../style/global.scss';

  .container{
    position: relative;
    color: #4B4742;
    background: #f9fff9;
    z-index: 1;

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
