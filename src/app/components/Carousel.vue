<template>

  <div id="carousel">

    <div id="flickityContainer" ref="carousel">
      <slot></slot>
    </div>

    <svg id="progressBar" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" :style="{bottom: -progressBar.height}">
      <path :stroke="progressBar.background" :stroke-width="progressBar.height" :d="path"></path>
      <path :stroke="data.progressBar.color" :stroke-width="progressBar.height" :d="path" :style="{strokeDasharray: progressBar.width, strokeDashoffset: progressBar.progress}"></path>
    </svg>

    <div class="debug progressBar progress" v-if="devmode" style="color: red;">
      {{ progressBar.width - progressBar.progress }}
    </div>

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
          height: 10,
          progress: 0,
          background: '#E3E8E3'
        }
      }
    },
    computed: {
      viewBox: function(){
        return `0 0 ${this.progressBar.width} ${this.progressBar.height}`;
      },
      path: function(){
        return `M0 0, ${this.progressBar.width} 0`;
      }
    },
    methods: {
      updateProgress: function(progress){
        this.progressBar.progress = this.progressBar.width - (progress * this.progressBar.width);
        return this.progressBar.progress;
      },
      updateWidth: function(width){
        this.progressBar.width = width;
      }

    },
    mounted() {
      this.progressBar.width = this.progressBar.progress = document.documentElement.clientWidth;
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

      const carousel = this;
      flkty.on( 'scroll', ( progress ) => {
        progress = Math.max( 0, Math.min( 1, progress ) );
        carousel.updateProgress(progress);
      });

      const handleResize = this.debounce(function() {
        console.log("handling resize");
        carousel.updateWidth(document.documentElement.clientWidth);
      }, 50);
      window.addEventListener('resize', handleResize);


    }
  }

</script>

<style lang="scss">
  #carousel{
    position: relative;
    z-index: 2;

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

    #progressBar, .debug.progressBar.progress{
      width: 100%;
      position: absolute;
      left: 0;
    }
  }


</style>
