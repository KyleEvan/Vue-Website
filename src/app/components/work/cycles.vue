<template>

  <work-template :project="project" :events="events">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>


    <template slot="title">
    <!-- Title: -->
      Cycles
    </template>
    <template slot="description">
      <!-- Project Description -->
      <!-- Summary -->
      <section>
        <p>
          The first game I ever developed <i>Cycles</i> is a simple desktop web game designed to help users practice and learn rudementary multiplication skills. It has an 8-bit theme and is a throwback to the scifi film Tron and old computer games. I worked on this as a personal project for my Rich Media in Web Applications class. It uses no libraries, has no dependencies and was created with plain Javascript, Canvas API, HTML, and CSS.
        </p>
        <p>
          Basically, the player must survive longer than the computer driving a vehicle(cycle) without crashing. The trails from the cycles create colored boundaries that quickly limit the available space for the computer and player as they navigate the map. Solving basic arithmetic problems controls the direction of the player's cycle.
        </p>
        <p>
          For more in depth how-to-play instructions, or to play the game go visit my github.
        </p>
      </section>

      <section>
        <h2>Challenges</h2>
      </section>
      <section>
        <h2>What I learned</h2>
      </section>
      <!-- Skills -->
      <!-- <section>
        <ul>
          <li>JS</li>
          <li>More JS</li>
        </ul>
      </section> -->

      <!-- Links -->
      <section>
        <ul>
          <a href="#">Instructions</a>
          <a href="#">github</a>
          <a href="#" class="showDesktop">play the game</a>
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
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        gitHubLink: 'https://github.com/KyleEvan/Cycles',
        gitHubPagesLink: 'https://kyleevan.github.io/Cycles/'
      }
    },
    components:{
      'work-template': workTemplate
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
