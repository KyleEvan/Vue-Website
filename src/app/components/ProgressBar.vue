<template>

  <svg :width="this.width" :height="this.height">
    <path :stroke="data.background" d="M0 10, 200 10"></path>
    <path :stroke="data.color" d="M0 10, 200 10" style="stroke-dasharray: 200; stroke-dashoffset: 200;"></path>
  </svg>

</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        width: 0,
        height: 50,
        progress: 0
      }
    },
    methods:{

    },
    mounted(){
      this.width = document.documentElement.clientWidth;


      console.log(this.$props.data);

      // let currentProgress;
      // let flkty = this.$props.data.carousel;
      //
      // flkty.on( 'scroll', ( progress ) => {
      //   progress = Math.max( 0, Math.min( 1, progress ) );
      //   currentProgress = ( progress * 100 );
      // });
      // console.log(currentProgress);
      // this.progressBar.progress = currentProgress;


    }
  }
</script>

<style lang="scss">
  #progressBar{
    position: absolute;
    top: 0;
    left: 0;

  }

</style>
