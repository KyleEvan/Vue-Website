<template>

  <work-template :project="project">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
      <!-- <div class="carousel-cell">
        <img :src="images_updated.sized.comboSmash_preview" alt="" />
      </div>
      <div class="carousel-cell">
        <img :src="images_updated.sized.comboSmash_death" alt="" />
      </div>
      <div class="carousel-cell">
        <img :src="images_updated.sized.comboSmash_horde" alt="" />
      </div> -->
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
          A web browser game made with HMTL5 Canvas. It's an arcade style top down horde survival game. I wrote it with Javascript as a final project for my Rich Media &amp; Web App Dev class.
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
              <i>
                <font-awesome-icon :icon="['fas','angle-right']" />
              </i>
            </a>
          </li>
          <li>
            <a target="_blank" :href="gitHubLink">
              GitHub Repo
              <i>
                <font-awesome-icon :icon="['fas','angle-right']" />
              </i>
            </a>
          </li>
          <li>
            <a target="_blank" :href="gitHubPagesLink">
              Play in browser
              <i>
                <font-awesome-icon :icon="['fas','angle-right']" />
              </i>
            </a>

          </li>
        </ul>
      </section>

    </template>

    <template slot="extra"></template>

  </work-template>


</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import Work_Template from './Work_Template.vue';

  export default {
    props: ['project', 'images'],
    data () {
      return {
        gitHubLink: 'https://github.com/KyleEvan/ComboSmash-v2',
        gitHubPagesLink: 'https://kyleevan.github.io/ComboSmash-v2/',
      }
    },
    components:{
      'work-template': Work_Template,
      FontAwesomeIcon
    },
    computed:{
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.comboSmash_preview,
          images.comboSmash_death,
          images.comboSmash_horde,
        ];

        // return [
        //   this.images.sized.comboSmash_preview,
        //   this.images.sized.comboSmash_death,
        //   this.images.sized.comboSmash_horde,
        // ];
      }
    },
    created(){

    },
    updated(){

    },
    mounted(){

    },
    updated(){

    }
  }
</script>



<style lang="scss">
  // @import '../../style/global.scss';
  .carousel-cell{

    &:nth-child(1){
      img{
        // height: 40vw;
        max-height: 70vh;
      }
    }
    img{
      height: 30vw;
    }
  }
  // .carousel-cell{
  //
  //   &:nth-child(1){
  //     img{
  //       height: 50vw;
  //       max-height: 70vh;
  //     }
  //   }
  //   img{
  //     height: 30vw;
  //   }
  // }
</style>
