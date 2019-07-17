<template>
  <footer>
    <div class="footer-content content inner-content">

      <div>
        <span>Made with Vue &#10084;</span>
        <span>See the project on <a target="_blank" href="https://github.com/KyleEvan/Vue-Website">GitHub</a></span>
        <span>Kyle Peterson</span>
        <!-- <span>༼ つ ͡◕ _ ͡◕ ༽つ</span> -->
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        // message: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  footer{
    position: relative;
    background-color: $black;
    color: $white;
    padding: 5em 0;
    // font-weight: 600;
    z-index: 1;
    @include lg {
      padding: $main-topBotPad 0;
    }
    .footer-content{
      z-index: 0;
      display: flex;
      flex-flow: column;
      // text-align: center;
      // font-size: .8em;
      line-height: 1.6;
      // opacity: .6;


      @include md{
        flex-flow: row;
        // justify-content: center;
        // div{
        //   &:nth-child(2){
        //     text-align: center;
        //   }
        // }
        // div{
        //   &:nth-child(3){
        //     text-align: right;
        //   }
        // }
      }

      div{
        &:nth-child(2){
          padding: 2em 0;
          @include md {
            padding: 0;
          }
        }
        & > span{
          display: block;
          padding: .2em 0;
          a,
          a:hover,
          a:focus,
          a:active {
            text-decoration: underline;
            color: $white;
            font-weight: 900;
          }
          @include md{
            font-size: .85em;
            line-height: .85em;
            padding: .6em 0;
          }
        }
      }
    }
  }
</style>
