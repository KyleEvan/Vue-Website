<template>

  <work-template :project="project" :events="events">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>


    <!-- Title -->
    <template slot="title">
      Batman Poster Design
    </template>

    <!-- Project Description -->
    <template slot="description">

      <!-- Synopsis -->
      <section>
        <p>
          Final project for Elements of Graphic Design in Media class. The subject was ours to choose, the main objective was to incorporate some principles of 2D graphic design we had learned during the semester. I chose to create a poster advertisement for a comic book store. I used Adobe Illustrator for the vector graphics, characters and text. Characters were created from reference images of old batman comic book panels. After, I made small adjustments in Photoshop to the color and layered a texture filter to give it the old retro finishing. Finally, the high resolution composition was printed on 11x18 foamcore.
        </p>
      </section>

    </template>

    <!-- Main Content -->
    <template slot="extra">
      <!-- <p>
        {{saying}}
      </p> -->
      <!-- <img :class="" :src="images.sized.career_areas" :alt="" /> -->
      <!-- <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
      </p>
      <p>
        Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.
      </p>
      <p>
        Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
      </p> -->
    </template>
  </work-template>

</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {

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
    },
    created(){
      // console.log(this.$props.images);
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
