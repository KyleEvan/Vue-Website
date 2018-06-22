<template>
  <div style="display:none;">
    
  </div>
</template>

<script>
  import { TimelineLite } from "gsap";
  import load from 'load-asset';

  import { getImages } from '../images.js';


  export default {
    props: ['init'],
    data(){
      return {
        el: document.getElementById('loader'),
        tl: new TimelineLite()
      }
    },
    methods: {
      destroySelf: function(){
        // while (this.el.firstChild) {
        //   this.el.removeChild(this.el.firstChild);
        // }
        this.body.removeChild(this.el);
      },
      doneLoading: function(){
        // const this.el = document.getElementById('loader');
        this.tl.to(this.el, .3, {
          opacity: 0,
          ease: Power2.easeIn,
          onComplete: () => {
            console.log('Loading Finished');
            this.destroySelf();
            this.init();
          }
        });
        // return loadingLayer;
      },
      async loadImages(){
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
    // created(){
    //
    // },
    mounted(){
      // Preload and Initialize Scene
      this.preInit();
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';

  #loader{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }



</style>
