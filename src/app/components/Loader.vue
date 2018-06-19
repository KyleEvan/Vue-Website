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
        tl: new TimelineLite()
      }
    },
    // computed:{
    //
    // },
    methods: {
      doneLoading: function(){
        const loadingLayer = document.getElementById('loader');
        this.tl.to(loadingLayer, .3, {
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            console.log('loading complete');
            this.init();
            this.bodyRestoreScroll();
            loadingLayer.outerHTML = '';

          }
        })
        return loadingLayer;
      },
      async loadImages(){
        console.log(this.images);
        const assets = await load.any(this.images.sources, (progress) => {
          if(progress.count >= progress.total){
            console.log('All images loaded');
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
