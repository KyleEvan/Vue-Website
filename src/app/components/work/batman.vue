<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">
    <!-- Aside content -->

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Carousel aside & slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="(image, index) in project_images" :key="index">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Extra lower content -->
    <template slot="main-content">
      <p>
        A final project for my Elements of Graphic Design in Media class. The subject was ours to choose and the main objective was to incorporate some principles of 2D graphic design learned during the semester. I chose to create a poster advertisement for a comic book store. I used Adobe Illustrator for the vector graphics, characters and text. Characters were created from reference images of old batman comic book covers. I post processed the result in Photoshop adjustmenting colors and layering a texture filter to create the distressed old finishing. At the end, the high resolution composition was printed on 11x18 foamcore.
      </p>
    </template>

  </work-template>
  <!-- End of Template -->

</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Batman Poster Design',
        className: 'batman-poster',
      }
    },
    components:{
      'work-template': workTemplate
    },
    computed: {
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.batman,
        ]
      }
    }
  }
</script>



<style lang="scss">
  // @import '../../style/global.scss';
  .batman-poster{
    div.flickity-slider{
      &>div.carousel-cell:nth-child(1) > img{
        width: auto;
        height: auto;
        max-width: 90%;
        max-height: 90%;
      }
    }
  }
</style>
