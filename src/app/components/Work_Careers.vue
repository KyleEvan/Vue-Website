<template>
  <div>
    <!-- <Carousel /> -->

    <carousel :data="carouselProps">

      <div class="carousel-cell" v-for="image in images">
        <img :src="image" alt="" />
      </div>

    </carousel>

    <div class="container">

      <div class="content" ref="content">
        <h2>Careers Redesign</h2>
        <p>
          {{msg}}
        </p>
        <p>
          {{saying}}
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. </p>

        <p>Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. </p>

        <p>Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. </p>
      </div>
    </div>
    <div id="bkg"></div>

  </div>
</template>

<script>
  // import Project from './Project.vue';
  import { TimelineLite } from "gsap";
  import careersPNG from '../../images/career-areas-mobile.png';
  import careersScreensPNG from '../../images/careers_screens.png';

  import Carousel from './Carousel.vue';

  export default {
    props: ['msg'],
    data () {
      return {
        imgA: careersPNG,
        imgB: careersScreensPNG,
        images: [careersScreensPNG, careersPNG, careersPNG, careersPNG],
        saying: 'hey im content',
        carouselProps:{
          progressBar: {
            color: '#6EE5DF',
            background: '#DCDBD9'
          }
        }

      }
    },
    components: {
      carousel: Carousel
    },
    mounted(){

      let tl = new TimelineLite();
      tl.fromTo(this.$refs.content, .6, {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        ease: Expo.easeOut
      })
    }

  }
</script>



<style lang="scss" scoped>
  // @import '../../style/global.scss';
  .container{
    color: #4B4742;
    background: #f9fff9;
    z-index: 1;

    .content{
      position:relative;
      padding: 5em 8% 3em 8%;
    }
  }

  #bkg{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FF9A91;
    z-index: -2;
  }
</style>
