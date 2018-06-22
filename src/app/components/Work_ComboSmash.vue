<template>

  <work-template :project="project">
    <!-- Carousel images -->
    <template slot="image_slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Title: -->
    <template slot="title">
      Combo Smash
    </template>

    <!-- Project Description -->
    <template slot="description">
      <!-- Synopsis -->
      <section>
        <p>
          A webbrowser game made with HMTL5 Canvas. It's an arcade style top down horde survival game. I wrote it with Javascript as a final project for my New Media
        </p>
      </section>

      <!-- Skills -->
      <section>
        <p>
          Built with minimal HTML, lots of Javascript, and some CSS. Utilizing the HTML5 Canvas element developed a basic game loop with various states via the Javascript method requestAnimationFrame(). Basic linear algebra and trigonometry helped to construct the game's mechanics.
        </p>
      </section>

      <!-- Controls/Gameplay -->
      <section>
        <h3>Controls</h3>
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
      </section>

      <!-- Links -->
      <section class="links">
        <ul>
          <li>
            <a target="_blank" href="#">
              ComboSmash v.1
            </a>
            <span>
              <font-awesome-icon :icon="['fas','long-arrow-alt-right']" />
            </span>
          </li>
          <li>
            <a target="_blank" :href="gitHubLink">
              GitHub Repo
            </a>
            <span>
              <font-awesome-icon :icon="['fas','long-arrow-alt-right']" />
            </span>
          </li>
          <li>
            <a target="_blank" :href="gitHubPagesLink">
              Play in browser
            </a>
            <span>
              <font-awesome-icon :icon="['fas','long-arrow-alt-right']" />
            </span>
          </li>
        </ul>
      </section>


    </template>

    <template slot="extra"></template>


    <!-- Extra Content -->
    <!-- <section>
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
    </section> -->
  </work-template>


</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import Work_Template from './Work_Project_Template.vue';

  export default {
    props: ['project'],
    data () {
      return {
        project_images: undefined,
        gitHubLink: 'https://github.com/KyleEvan/ComboSmash-v2',
        gitHubPagesLink: 'https://kyleevan.github.io/ComboSmash-v2/',
      }
    },
    components:{
      'work-template': Work_Template,
      FontAwesomeIcon
    },
    methods:{
      initImages: function(){
        let image = this.images();
        this.project_images = [
          image.sized.comboSmash_preview,
          image.sized.comboSmash_death,
          image.sized.comboSmash_horde,
        ];
        console.log(this.project_images);
      }
    },
    created(){
      this.initImages();
    },
    updated(){
      this.initImages();
    },
    mounted(){
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
