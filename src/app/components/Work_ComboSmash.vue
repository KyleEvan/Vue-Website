<template>

  <work-template :project="project">

    <template slot="imageSlides">
      <div class="carousel-cell" v-for="image in images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Title: -->
    <template slot="title">
      Combo Smash
    </template>

    <!-- Project Description -->
    <template slot="description">
      <p>
        A webbrowser game made with HMTL5 Canvas. It's an arcade style top down horde survival game. I wrote it with Javascript as a final project for my New Media
      </p>

      <h3>Requirements &amp; Constraints</h3>
      <ul>
        <li>
          <b>Move:</b> keyboard (WASD Controls)
        </li>
        <li>
          <b>Attack:</b> Mouse, trackpad or touchscreen
        </li>
        <li>
          No mobile support
        </li>
      </ul>
    </template>


    <!-- Skills -->
    <ul slot="skills">
      <li>JS</li>
      <li>Tons of JS</li>
    </ul>

    <!-- Links -- >
    <ul slot="links">
      <li><a :href="gitHubLink">GitHub Repo</a></li>
      <li><a :href="gitHubPagesLink">Play in browser</a></li>
    </ul>



    <!-- Extra Content -->
    <p>
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
    </p>

  </work-template>


</template>

<script>
  import Work_Template from './Work_Project_Template.vue';

  // Images
  import death_lg_jpg from '../../images/comboSmash-death@lg.jpg';
  import death_md_jpg from '../../images/comboSmash-death@md.jpg';
  import death_sm_jpg from '../../images/comboSmash-death@sm.jpg';
  import horde_lg_jpg from '../../images/comboSmash-horde@lg.jpg';
  import horde_md_jpg from '../../images/comboSmash-horde@md.jpg';
  import horde_sm_jpg from '../../images/comboSmash-horde@sm.jpg';
  import preview_lg_jpg from '../../images/comboSmash-preview@lg.jpg';
  import highScores_lg_jpg from '../../images/comboSmash-highScores@lg.jpg';

  export default {
    props: ['project'],
    data () {
      return {
        images: [preview_lg_jpg, horde_md_jpg, death_md_jpg, highScores_lg_jpg],
        gitHubLink: 'https://github.com/KyleEvan/ComboSmash-v2',
        gitHubPagesLink: 'https://kyleevan.github.io/ComboSmash-v2/',
        saying: 'hey im content',

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
        height: 50vw;
        max-height: 70vh;
      }
    }
    img{
      height: 30vw;
    }
  }
</style>
