<template>

  <work-template :project="project">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>


    <h2 slot="title">
    <!-- Title: -->
      Cycles
    </h2>
    <template slot="description">
      <!-- Project Description -->
      <!-- Synopsis -->
      <section>
        <p>
          A fast paced educational game pitting the player against the computer to see who can last the longest before crashing. It's a math learning game at it's core targetting primary school audience. It relies on the player's ability to readily calculate rudimentary arithmetic
        </p>
      </section>

      <!-- Skills -->
      <section>
        <ul>
          <li>JS</li>
          <li>More JS</li>
        </ul>
      </section>

      <!-- Links -->
      <section>
        <ul>
          <a href="#">A Link</a>
          <a href="#">A Link</a>
          <a href="#">A Link</a>
        </ul>
      </section>

    </template>




    <!-- Main Content -->
    <!-- <p>
      HTML5 canvas web game.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
    </p>
    <p>
      Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.
    </p>
    <p>
      Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
    </p> -->
  </work-template>


</template>

<script>
  import Work_Template from './Work_Template.vue';

  export default {
    props: ['project', 'images'],
    data () {
      return {
        gitHubLink: 'https://github.com/KyleEvan/Cycles',
        gitHubPagesLink: 'https://kyleevan.github.io/Cycles/'
      }
    },
    components:{
      'work-template': Work_Template
    },
    computed:{
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.cycles,
          images.cycles,
          images.cycles,
        ];
      }

    }
  }
</script>



<style lang="scss">
  // @import '../../style/global.scss';
  .carousel-cell{

    &:nth-child(1){
      img{
        height: 30vw;
        max-height: 70vh;
      }
    }
    img{
      height: 30vw;
    }
  }
</style>
