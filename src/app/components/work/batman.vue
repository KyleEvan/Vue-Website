<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">
    <!-- Aside content -->

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Aside main content -->
    <template slot="asideContent">
      <section>
        <p>
          Final project for Elements of Graphic Design in Media class. The subject was ours to choose, the main objective was to incorporate some principles of 2D graphic design we had learned during the semester. I chose to create a poster advertisement for a comic book store. I used Adobe Illustrator for the vector graphics, characters and text. Characters were created from reference images of old batman comic book panels. After, I made small adjustments in Photoshop to the color and layered a texture filter to give it the old retro finishing. Finally, the high resolution composition was printed on 11x18 foamcore.
        </p>
      </section>
    </template>

    <!-- Carousel aside & slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Extra lower content -->
    <template slot="extra"></template>

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
  .carousel-cell{
    &:nth-child(1){
      img{
        width: auto;
        height: 30vw;
        max-height: 70vh;
      }
    }
    img{
      height: 30vw;
    }
  }
</style>
