<template>

  <work-template :project="project">

    <template slot="imageSlides">
      <div class="carousel-cell" v-for="image in images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Title: -->
    <template slot="title">
      Careers Redesign
    </template>

    <!-- Project Description -->
    <p slot="description">
      An educational take on retro trails/snake-like see-how-long-you-can-last games. {{saying}}
    </p>

    <!-- Skills utilized -->
    <ul slot="skills">
      <li>JS</li>
      <li>More JS</li>
    </ul>

    <!-- Main Content -->
    <p>
      {{saying}}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
    </p>
    <p>
      Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.
    </p>
    <p>
      Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
    </p>

  </work-template>

</template>

<script>
  import Work_Template from './Work_Project_Template.vue';

  // Images
  import careersPNG from '../../images/career-areas-mobile.png';
  import careersScreensPNG from '../../images/careers_screens.png';


  export default {
    props: ['project'],
    data () {
      return {
        images: [careersScreensPNG, careersScreensPNG, careersScreensPNG, careersScreensPNG],
        saying: 'hey im content'
      }
    },
    components:{
      'work-template': Work_Template
    }

  }
</script>



<style lang="scss" scoped>
  // @import '../../style/global.scss';
  .carousel-cell{

    &:nth-child(1){
      img{
        height: 30vw;
      }
    }
    img{
      height: 30vw;
    }
  }
</style>
