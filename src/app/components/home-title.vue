<template>
  <div>



    <display-content :events="events" :config="animationConfig" id="home-title" ref="home_title">
      <ul>
        <li class="header">Kyle</li>
        <li class="header">Peterson</li>
        <li><!--- --></li>
        <li>New Media</li>
        <li>&amp; Interactive</li>
        <li>Developer</li>
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
          increment: .055,
          duration: .6,
          delay: .3,
          eventName: 'title-loaded'
        }
      }
    },
  }
</script>

<style lang="scss">
  @import '../../style/global.scss';

  #home-title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 90vh;
    max-height: $main-maxHeight;
    position: relative;
    user-select: none;

    ul{
      padding-left: 0;
      margin: 0;
      list-style: none;
      font-size: 40px;
      line-height: 50px;
      @include smmd {
        font-size: 3.75em;
        line-height: 1.25;
      }
      @include lg{
        font-size: 4em;
      }
      li{
        &:nth-child(-n+2){
          font-weight: 900;

          span{
            display: inline-block;
            opacity: 0;
            transform: translateY(40%);
          }
        }
        &:nth-child(3){
          margin-top: .4em;
          margin-bottom: .4em;
          border-bottom: 4px solid;
          color: rgba(66, 58, 47, 0.5);
          transform: scaleY(0);
          opacity: 0;
          @include smmd {
            border-bottom: 5px solid;

          }
          @include md {
            border-bottom: 6px solid;

          }
        }
        &:nth-child(n+4){
          font-weight: 700;
          opacity: 0;
          transform: translateY(-40%);
          font-size: .34em;
          line-height: 1.65;
        }
      }
    }
  }


</style>
