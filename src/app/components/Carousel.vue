<template>

  <div id="carousel">

    <div id="flickityContainer" ref="carousel" :style="minHeight">
      <slot></slot>
    </div>

    <svg id="progressBar" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" :style="{bottom: -.5*progressBar.height}">
      <path :stroke="progressBar.background" :stroke-width="progressBar.height" :d="path"></path>
      <path :stroke="progressColor" :stroke-width="progressBar.height" :d="path" :style="{strokeDasharray: progressBar.width, strokeDashoffset: progressBar.progress}"></path>
    </svg>

    <!-- For Development -->
    <!-- <div class="debug progressBar progress" v-if="devmode" style="color: red;">
      {{progressBar.width - progressBar.progress}}
    </div> -->

  </div>

</template>

<script>
  import { TimelineLite } from "gsap";
  import Flickity from 'flickity';


  export default {
    props: ['progressColor'],
    data(){
      return {
        minHeight: {
          'min-height': '400px'
        },
        progressBar: {
          width: 0,
          height: 80,
          progress: 0,
          background: 'transparent'
        }
      }
    },
    computed:{
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
      setWidth: function(width){
        this.progressBar.width = width;
      }

    },
    mounted() {
      this.progressBar.width = this.progressBar.progress = document.documentElement.clientWidth;

      /*

        Initialize Carousel with flickity

      */
      let flkty = new Flickity( this.$refs.carousel, {
        imagesLoaded: true,
        draggable: true,
        freeScroll: true,
        contain: true,
        setGallerySize: false
      });


      /*

        Events

      */
      const carousel = this;
      flkty.on( 'scroll', ( progress ) => {
        progress = Math.max( 0, Math.min( 1, progress ) );
        carousel.updateProgress(progress);
      });

      const handleResize = this.debounce(function() {
        console.log("handling resize");
        carousel.setWidth(document.documentElement.clientWidth);
      }, 50);
      window.addEventListener('resize', handleResize);


    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';

  #carousel{
    position: relative;
    width: 100%;
    z-index: 2;
    @include medium{
      width: 50%;

    }

    #flickityContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 50vh;

      @include medium{
        position: fixed;
        top: 0;
        left: 50%;
        height: 100vh;
        width: 50%;
      }



      .flickity-viewport{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
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
            align-items: center;
            width: 100%;
            height: 100%;

            // img{
            //   height:100%;
            // }
          }
        }
      }
      .flickity-button{
        position: absolute;
        bottom: 0;

        svg{
          fill: #f9fff9;
          height: 3rem;
        }
      }
      .flickity-prev-next-button{
        position: absolute;
        top: 0;
        width: 6%;
        height: 100%;
        background: none;
        outline: none;
        border: none;
        padding: 0;
        display: flex;
        justify-content: center;
        opacity: .4;
        cursor: pointer;

        &:hover{
          opacity: 1;
        }
      }

      .flickity-button.previous{
        left: 0;
      }
      .flickity-button.next{
        right: 0;
      }
      .flickity-page-dots{
        position: absolute;
        bottom: -50px;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        height: auto;
      }
      .flickity-page-dots{
        .dot{
          display: inline-block;
          width: .5rem;
          height: .5rem;
          margin: .5rem;
          background: #E3E8E3;
          border-radius: 50%;
          z-index: 5;
          position: relative;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.52, 2, 0.33, 0.915);
        }
        .dot.is-selected{
          transform: scale(1.8);
        }
      }
    }

    #progressBar, .debug.progressBar.progress{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  /* Increase contrast of shapes in scene */
  @supports (filter: contrast(100%)){
    // #scene{
    //   filter: contrast(200%);
    // }
  }



</style>
