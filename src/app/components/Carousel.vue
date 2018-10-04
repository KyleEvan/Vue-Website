<template>

  <div ref="carouselContainer" id="carousel">

    <div id="flickityContainer" ref="carousel" :style="minHeight">
      <slot></slot>
    </div>

    <!-- <svg id="progressBar" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" :style="{bottom: -.5*progressBar.height}"> -->
    <svg id="progressBar" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" >
      <path :stroke="progressBar.background" :stroke-width="progressBar.height*2" :d="path"></path>
      <path :stroke="progressColor" :stroke-width="progressBar.height*2" :d="path" :style="{strokeDasharray: progressBar.width, strokeDashoffset: progressBar.progress}"></path>
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
        flickityInit: false,
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
      },
    },
    methods: {
      updateProgress: function(progress){
        this.progressBar.progress = this.progressBar.width - (progress * this.progressBar.width);
        return this.progressBar.progress;
      },
      setProgressBar: function(){
        let width;
        if(window.innerWidth <= this.breakpoints.md){
          width = this.viewport.cWidth;
        } else {
          width = this.viewport.cWidth/2;
        }
        this.progressBar.width = this.progressBar.progress = width;
        this.progressBar.height = document.getElementById('carousel').offsetHeight;
      },
      initFlickity: function(){
        if(this.devmode) console.log('Init Flickity');
        const flkty = new Flickity( this.$refs.carousel, {
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
      }

    },
    mounted(){

      // console.log(this.images);

      // this.progressBar.height = this.$refs.carouselContainer.style.height;
      /*

        Initialize Carousel with flickity

      */
      // Promise.all(this.images).then(function(values) {
      //   console.log(values);
      //   console.log('init flickity in Carousel.vue');
      // });
      this.initFlickity();
      // this.setProgressBar = this.setProgressBar.bind(this);
      this.setProgressBar(this);


      /*

        Events

      */
      // console.log(this.$props);
      // this.initFlickity();
      // this.initFlickity();
      const vm = this;
      const handleResize = this.debounce(function() {
        vm.setProgressBar();
      }, 30);
      window.addEventListener('resize', handleResize);


    },
    updated(){
      // console.log('Updated in Carousel.vue');
      // console.log(this.viewport);
      // this.setProgressBar();
      // console.log(this.hassl);

      // if(this.images && !this.flickityInit){
      //   this.flickityInit = !this.flickityInit;
      // }
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';

  #carousel{
    position: relative;
    width: 100%;
    // z-index: 0;

    @include md{
      width: 50%;
    }

    #flickityContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 50vh;
      z-index: 1;

      @include md{
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
      top: 0;
      z-index: 0;
    }
  }




</style>
