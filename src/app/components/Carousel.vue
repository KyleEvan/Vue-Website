<template>

  <div>

    <div id="flickityContainer" ref="carousel">
      <slot></slot>
    </div>

    <svg id="progressBar" :width="progressBar.width" :height="progressBar.height">
      <path :stroke="data.progressBar.background" d="M0 10, 200 10"></path>
      <path :stroke="data.progressBar.color" d="M0 10, 200 10" style="stroke-dasharray: 200; stroke-dashoffset: 200;"></path>
    </svg>

  </div>

</template>

<script>
  import { TimelineLite } from "gsap";
  import Flickity from 'flickity';


  export default {
    props: ['data'],
    data () {
      return {
        progressBar: {
          width: 0,
          height: 50,
          progress: 0
        }
      }
    },
    mounted() {
      this.progressBar.width = document.documentElement.clientWidth;
      console.log(this.$props.data);
      // console.log(this.$refs.carousel);
      // this.$refs.carousel.addEventListener("mousedown", this.handleMouseDown );

      // let carousel = document.getElementById('flickityContainer');
      let flkty = new Flickity( this.$refs.carousel, {
        imagesLoaded: true,
        draggable: true,
        freeScroll: true,
        contain: true,
        setGallerySize: false
      });

      let currentProgress;
      flkty.on( 'scroll', ( progress ) => {
        progress = Math.max( 0, Math.min( 1, progress ) );
        currentProgress = ( progress * 100 );
      });
      console.log(currentProgress);
      this.progressBar.progress = currentProgress;

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
  #progressBar{
    position: absolute;
  }
</style>
