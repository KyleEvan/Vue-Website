<template>

  <!-- <div id="loader" v-if="loading">
    <div class="spinner">
      Loading ...
    </div>
  </div> -->

</template>

<script>
  import { TimelineLite } from "gsap";
  import load from 'load-asset';

  import { getImages } from '../images.js';



  export default {
    props: ['init'],
    data(){
      return {
        viewport: undefined,

      }

    },
    computed:{

    },
    methods: {
      doneLoading: function(){
        const loadingLayer = document.getElementById('loader');
        loadingLayer.outerHTML = '';
        return loadingLayer;
      },
      async loadImages(){
        this.images = getImages(this.breakpoints, this.viewport.cWidth);
        const assets = await load.any(this.images.sources, (progress) => {
          if(progress.count >= progress.total){
            console.log('All images loaded');
            this.init();
            this.bodyRestoreScroll();
            this.doneLoading();
          }
        });
      },
      preInit: function(){
        this.bodyNoScroll();
        this.loadImages();
      },

    },
    created(){

    },
    mounted(){
      this.viewport = this.getWindow();
      // Preload and Initialize Scene
      this.preInit();
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';

  // #loader{
  //   position: fixed;
  //   width: 100%;
  //   height: 100%;
  //   background: #FFF;
  //   z-index: 4;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }



</style>
