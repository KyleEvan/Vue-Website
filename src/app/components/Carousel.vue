<template>

  <div ref="carouselContainer" id="carousel">
    <div id="flickityContainer" ref="carousel" :style="minHeight">
      <slot></slot>
    </div>
    <svg id="progressBar" :style="{backgroundColor: progressBar.background}" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" >
      <polygon ref="progressBar" :fill="progressColor" :points="points"></polygon>
    </svg>
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
        },
        points: undefined,
        viewBox: undefined
      }
    },
    methods: {
      getContainerWH: function(){
        return{
          width: this.$refs.carouselContainer.clientWidth,
          height: this.$refs.carouselContainer.clientHeight
        }
      },
      getPoints: function(l, t, r, b){
        return `${l-r} ${t} ${l-l} ${t} ${l-l} ${b} ${l-r} ${b}`;
      },
      setViewBox: function(width, height){
        this.viewBox = `0 0 ${width} ${height}`;
      },
      animateProgressBar(x){
        TweenLite.to(this.$refs.progressBar, 0,
        {
          x: x,
          ease: Power0.easeNone
        });
      },
      updateProgress: function(progress){
        this.animateProgressBar(progress*this.progressBar.width);
      },
      configProgressBar: function(){
        console.log('configuring progressbar')
        let container = this.getContainerWH();
        container = Object.assign(this.$refs.carouselContainer.getBoundingClientRect(), container);
        this.setViewBox(container.width, container.height);
        this.progressBar.width = container.width;
        this.progressBar.height = container.height;
        this.points = this.getPoints(container.left, container.top, container.right, container.bottom);
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
      },

      handleResize: function(){
        const carousel = this;
        const resize = this.debounce(function() {
          carousel.configProgressBar();
        }, 100);
        resize();
      }
    },
    mounted(){

      this.initFlickity();
      let carousel = this;
      setTimeout(function(){
        carousel.configProgressBar();
      }, 200);
    },
    created(){
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy(){
      window.removeEventListener('resize', this.handleResize)
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';

  #carousel{
    position: relative;
    width: 100%;
    z-index: 0;

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
        align-items: center;
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
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
  }




</style>
