<template>
  <div>
    <!-- <div style="
      width: 100%;
      height: 30vw;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: blue;
      z-index: 2;
    ">
      <img :src="imgB" style="
        height: 100%;
      " />
    </div> -->
    <div id="flickityContainer" >
      <div class="carousel-cell"><img :src="imgB" alt="" /></div>
      <div class="carousel-cell"><img :src="imgA" alt="" /></div>
      <div class="carousel-cell"><img :src="imgA" alt="" /></div>
      <div class="carousel-cell"><img :src="imgA" alt="" /></div>
      <!-- <img :src="img" alt="" /> -->
    </div>
    <div class="container">
      <div ref="content">
        <h2>Careers Redesign</h2>
        <p>
          {{msg}}
        </p>
        <p>
          {{ saying }}
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

  import Flickity from 'flickity';

  export default {
    props: ['msg'],
    data () {
      return {
        imgA: careersPNG,
        imgB: careersScreensPNG,
        saying: 'hey im content'
      }
    },
    methods: {

    },
    created(){
    },
    mounted(){
      // console.log(this.$refs.carousel);
      // this.$refs.carousel.addEventListener("mousedown", this.handleMouseDown );

      let carousel = document.getElementById('flickityContainer');
      let flkty = new Flickity( carousel, {
        imagesLoaded: true,
        draggable: true,
        freeScroll: true,
        contain: true,
        setGallerySize: false
      });
      // flkty.on( 'pointerDown', ( event, pointer ) => {
      //   console.log('down');
      //   carousel.style.cursor = 'grabbing';
      //   carousel.style.cursor = '-moz-grabbing';
      //   carousel.style.cursor = '-webkit-grabbing';
      // });
      // flkty.on( 'pointerUp', ( event, pointer, moveVector ) => {
      //   console.log('up');
      //   carousel.removeAttribute("style");
      // });

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

<style lang="scss">
  #flickityContainer{
    position: relative;
    height: 30vw;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .flickity-viewport{
      width: 100%;
      height: 100%;
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;

      &.is-pointer-down {
        cursor: grabbing !important;
        cursor: -moz-grabbing !important;
        cursor: -webkit-grabbing !important;
      }

      .flickity-slider{
        width: 100%;
        height: 100%;

        .carousel-cell{
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;

          img{
            height:100%;
          }
        }
      }
    }
    .flickity-button{
      position: absolute;
      bottom: 0;
    }
    .flickity-page-dots{
      position: absolute;
      bottom: 0;
    }

  }
</style>

<style lang="scss" scoped>
  // @import '../../style/global.scss';
  .container{
    padding: 5em 8% 3em 8%;
    color: #4B4742;
    background: #f9fff9;
    z-index: 1;
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
