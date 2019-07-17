<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>
    <!-- Carousel slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="(image, index) in carousel_images" :key="index">
        <img :src="image" alt="" />
      </div>
    </template>
    <!-- Main Content -->
    <template slot="main-content">
      <p>
        A fun personal project I developed as a homepage concept using html, css, and js. The shapes animate using principles of projection and parallax in response to mouse movements.
      </p>

      <p>View the demo on GitHub:</p>
      <div>
        <a target="_blank" href="https://kyleevan.github.io/Moving-Shapes/" class="link-btn">Moving Shapes Demo</a>
      </div>

      </template>

  </work-template>

</template>

<script>
  import {colors} from '../../colors.js';
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Shapes',
        className: 'shapes',
        links: {

        },
      }
    },
    components:{
      'work-template': workTemplate,
    },
    computed: {
      lightColor: function(){
        return this.$props.project ? this.$props.project.lightColor : colors.templateLightColor;
      },
      carousel_images: function(){
        let images = this.$props.images.sized;
        return [
          images.shapes_preview,
        ]
      }
    },
    mounted(){

    }
  }
</script>


<style lang="scss">
  @import '../../../style/global.scss';
  div.shapes{
    div.flickity-slider{
      &>div.carousel-cell:nth-child(1) > img{
        width: auto;
        height: auto;
        max-width: 90%;
        max-height: 90%;
      }
    }
  }
//   div.member-redesign{
//     div.flickity-slider{
//       &>div.carousel-cell:nth-child(1) > img{
//         height: 100%;
//       }
//       &>div.carousel-cell:nth-child(2) > img{
//         width: auto;
//         height: auto;
//         max-width: 90%;
//         max-height: 90%;
//       }      
//       &>div.carousel-cell:nth-child(3) > img{
//         width: 70%;
//         height: auto;
//         top: 4%;
//       }
//     }
//     video{
//       width: 100%;
//       height: auto;
//     }
//   }
</style>
