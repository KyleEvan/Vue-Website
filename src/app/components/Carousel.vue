<template>

  <div ref="carouselContainer" id="carousel">
    <div id="flickityContainer" ref="carousel">
      <slot></slot>
    </div>
    <svg id="progressBar" :style="{backgroundColor: progressBar.background}" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" >
      <polygon class="progress" ref="progressBar" :fill="progressColor" :points="points"></polygon>
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
        flckty: undefined,
        flickityInit: false,
        // minHeight: {
        //   'min-height': '400px'
        // },
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
        let progress = document.querySelector('.progress');
        TweenLite.to(progress, 0,
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
        this.points = this.getPoints(container.left, 0, container.right, container.bottom - container.top);
      },
      initFlickity: function(){
        this.dev('Init Flickity');

        this.flkty = new Flickity( this.$refs.carousel, {
          imagesLoaded: true,
          draggable: true,
          freeScroll: true,
          contain: true,
          setGallerySize: false,
          accessibility: true,
          pageDots: false,
          prevNextButtons: false
        });
        const carousel = this;
        this.flkty.on( 'scroll', ( progress ) => {
          progress = Math.max( 0, Math.min( 1, progress ) );
          carousel.updateProgress(progress);
        });
      },

      handleResize: function(){
        const carousel = this;
        this.debounce(carousel.configProgressBar(), 40);
        // resize();
      }
    },
    mounted(){
      window.addEventListener('resize', this.handleResize)

      this.initFlickity();
      let carousel = this;
      setTimeout(function(){
        carousel.configProgressBar();
      }, 200);
    },
    created(){
    },
    beforeDestroy(){
      console.log('before destory fired!!!*@*(@!(*@(*@S)))');
      this.flkty.destroy();
      window.removeEventListener('resize', this.handleResize);
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';
  #carousel{
    position: relative;
    align-self: flex-start;
    width: 100%;
    height: 50vh;
    z-index: 0;

    @include md{
      width: 50%;
      height: 100vh;
    }
    @include lg{
      height: calc(100vh - 6em);
    }

    #flickityContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: inherit;
      z-index: 1;
      min-height: 400px;

      @include md{
        position: fixed;
        top: 0;
        left: 50%;
        // height: inherit;
        width: 50%;
      }
      @include lg{
        width: $break-large/2;
        margin-top: $lg-padding;
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
            padding: 2em;
            width: 100%;
            height: 100%;

            @include lg{
              padding: $lg-padding;
            }
            &>img{
              width: auto;
              height: auto;
              max-height: 100%;
              max-width: 100%;
            }
          }
        }
      }
      .flickity-button{
        position: absolute;
        bottom: 0;

        svg{
          fill: #000000;
          height: 3rem;
        }
      }
      .flickity-prev-next-button{
        position: absolute;
        bottom: 0;
        width: 17%;
        height: 45%;
        background: none;
        outline: none;
        border: none;
        padding: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: .2;
        cursor: pointer;

        &:hover{
          opacity: .45;
        }
      }

      .flickity-button.previous{
        left: 5%;
      }
      .flickity-button.next{
        right: 5%;
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
