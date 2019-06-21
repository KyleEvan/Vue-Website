<template>
  <div>



    <display-content :events="events" :config="animationConfig" id="nav-title" ref="nav_title">
      <ul>
        <li class="header">Kyle</li>
        <li class="header">Peterson</li>
        <!-- <li>-</li> -->
        <li>Front End Developer</li>
        <!-- <li></li> -->
        <!-- <li>Developer</li> -->
      </ul>
    </display-content>




  </div>
</template>

<script>
  import displayContent from './display-content.vue';

  export default {
    props: ['events'],
    data(){
      return {
      }
    },
    components: {
      'display-content': displayContent,
    },
    computed: {

      animationConfig(){
        return {
          increment: .095,
          duration: .6,
          delay: .4,
          eventName: 'title-loaded'
        }
      }
    },
  }
</script>

<style lang="scss">
  @import '../../style/global.scss';

  #nav-title{
    display: flex;
    align-items: center;
    // width: 100%;
    // height: 75vh;
    max-height: $main-maxHeight;
    position: relative;
    user-select: none;
    padding: 1em 0;
      @include sm{
        padding: 2em 0;
      }
      @include smmd {
        padding: 3em 0;

        // font-size: 3.75em;
        // line-height: 1.25;
      }
      @include md{
      }
    ul{
      padding-left: 0;
      margin: 0;
      list-style: none;
      font-size: 2em;
      line-height: 1.25;
      
      @include lg{
        // font-size: 4em;
      }
      li{
        &:nth-child(-n+2){
          font-weight: 900;
          display: inline-block;
          span{
            display: inline-block;
            opacity: 0;
            transform: translateY(40%);
          }
        }
        // &:nth-child(3){
        //   margin-top: .4em;
        //   margin-bottom: .4em;
        //   border-bottom: .1em solid;
        //   transform: scaleY(0);
        //   opacity: 0;
        //   @include smmd {
        //     // border-bottom: 5px solid;

        //   }
        //   @include md {
        //     // border-bottom: 6px solid;

        //   }
        // }
        &:nth-child(3){
          font-weight: 700;
          opacity: 0;
          transform: translateY(-40%);
          font-size: .6em;
          line-height: 1.65;
        }
      }
    }
  }


</style>
