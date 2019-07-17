<template>
  <div id="carouselMargin" class="inner-content">
    <div ref="carouselContainer" id="carousel">
      <div id="fixed-container" ref="carousel">
        <slot></slot>
      </div>
      <svg id="progressBar" :style="{backgroundColor: progressBar.background}" :width="progressBar.width" :height="progressBar.height" :viewBox="viewBox" >
        <polygon class="progress" ref="progressBar" :fill="progressColor" :points="points"></polygon>
      </svg>
      <!-- <div v-show="!oneSlide" class="btn-group mobile-no-highlight" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"> -->
        <a v-show="!oneSlide" role="button" class="prev" href="#" @click.prevent="nextPrevSlide">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </a>
        <a v-show="!oneSlide" role="button" class="next" href="#" @click.prevent="nextPrevSlide">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </a>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import { TimelineLite } from "gsap";
  import Flickity from 'flickity';
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';


  export default {
    props: ['events', 'progressColor'],
    data(){
      return {
        flckty: undefined,
        flickityInit: false,
        progressBar: {
          width: 0,
          height: 80,
          progress: 0,
          background: 'transparent'
        },
        points: undefined,
        viewBox: undefined,
        oneSlide: false
      }
    },
    components: {
      FontAwesomeIcon
    },
    methods: {
      handleMouseLeave:function(){
        this.flkty.unpausePlayer();
      },
      handleMouseOver: function(){
        this.flkty.pausePlayer();
      },
      nextPrevSlide: function(e){
        e.target.classList.contains('next') ? this.flkty.next(true, false) : this.flkty.previous(true, false);
      },
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
        let progress = Math.round(x*1000)/1000;     
        let progressEl = this.$refs.progressBar;
        if(progressEl){
          if(progress <= 0){
            progressEl.style.opacity = 0;
          } else {
            progressEl.style.opacity = 1;
          }
          TweenLite.to(progressEl, 0,
          {
            x: x,
            ease: Power0.easeNone
          });
        }
      },
      configCarousel: function(func){
        let slidesLength = this.$refs.carousel.querySelector('.flickity-slider').children.length;
        if(slidesLength > 1){
          window.addEventListener('resize', this.handleResize)
          func();
        } else {
          this.oneSlide = true;
        }
      },
      updateProgress: function(progress){
        this.animateProgressBar(progress*this.progressBar.width);
      },
      configProgressBar: function(){
        this.dev('configuring progressbar');
        // let container = ;
        let container = Object.assign(this.$refs.carouselContainer.getBoundingClientRect(), this.getContainerWH());
        this.setViewBox(container.width, container.height);
        this.progressBar.width = container.width;
        this.progressBar.height = container.height;
        this.points = this.getPoints(container.left, 0, container.right, container.bottom - container.top);
      },
      handleScroll: function(progress){
        progress = Math.max( 0, Math.min( 1, progress ) );
        this.updateProgress(progress);
      },
      initFlickity: function(){
        this.dev('Init Flickity');
        const carousel = this;
        this.flkty = new Flickity( this.$refs.carousel, {
          imagesLoaded: true,
          draggable: true,
          freeScroll: true,
          contain: true,
          setGallerySize: false,
          accessibility: true,
          pageDots: false,
          prevNextButtons: false,
          autoPlay: 2300,
          on: {
           ready: function() {
             carousel.configCarousel(carousel.configProgressBar);
           }
          }
        });
        this.flkty.on( 'scroll', this.handleScroll);
        this.flkty.stopPlayer();
      },
      handleResize: function(){
        const carousel = this;
        this.debounce(carousel.configProgressBar(), 40);
      },
      startCarousel: function(){
        this.flkty.playPlayer();
        console.log('starting carousel');    
      }
    },
    created(){
      this.events.$on('nav-loaded', this.startCarousel);
      this.events.$on('page-transitioned', this.startCarousel);
    },
    mounted(){
      this.initFlickity();
    },
    beforeDestroy(){
      this.events.$off('nav-loaded', this.startCarousel);
      this.events.$off('page-transitioned', this.startCarousel);
      this.flkty.off( 'scroll', this.handleScroll);
      this.flkty.destroy();
      if(!this.oneSlide) window.removeEventListener('resize', this.handleResize);
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';
  #carouselMargin{
    opacity: 0;
    transform: translateY(3em);

  #carousel{
    position: relative;
    align-self: flex-start;
    width: 100%;
    height: 40vh;
    max-height: 600px;
    z-index: 0;
    overflow: hidden;
    background-color: $lightGray;

    @include md{
      height: 50vh;
    }
    // @include lg{
    //   height: $main-height;
    //   max-height: $main-maxHeight;
    // }

    #fixed-container{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: inherit;
      z-index: 1;
      min-height: inherit;
      &,
      &:hover,
      &:focus,
      &:active {
        outline: 0;
      }

      @include md{
        position: relative;
        // top: 0;
        // left: 50%;
        // width: 50%;
      }
      // @include lg{
        // width: $carousel-width;
        // margin-top: $main-topBotPad;
      // }

      .flickity-viewport{
        width: 100%;
        height: 100%;
        overflow: hidden;
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
            // padding: 2em;
            width: 100%;
            height: 100%;
            overflow: hidden;

            @include lg{
              padding: $lg-padding;
            }
            &>img{
              position: absolute;
              // width: auto;
              // height: auto;
              // min-width: 100px;
              // min-height: 100px;
              // max-height: 100%;
              // max-width: 100%;
            }
          }
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
    .progress{
      opacity: 0;
    }
    /* Prev next buttons */
    // .btn-group{
    //   position: absolute;
    //   bottom: 0;
    //   display: flex;
    //   left: 0;
    //   width: 100%;
    //   justify-content: space-between;
    //   z-index: 1;
    //   font-size: 2em;
    //   @include md {
    //     font-size: 2.5em;
    //   }

      a.next,
      a.next:active,
      a.next:focus,
      a.prev,        
      a.prev:active,
      a.prev:focus{
        position: absolute;
        font-size: 2em;
        top: 50%;
        transform: translateY(-50%);
        padding: 1em;
        // width: 50%;
        color: $mainColorLight;
        opacity: .35;
        cursor: pointer;
        outline: none;
        z-index: 2;
        svg{
          pointer-events: none;
        }
      }
      a.next{
        right: 0;
        // svg{
        //   float: right;
        // }
      }
      a.prev{
        left: 0;
      }
      // a:hover, a:focus{
      //   opacity: .75;
      // }
    // }
  }
}



</style>
