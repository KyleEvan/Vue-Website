<template>
  <footer>
    <div class="footer-content content inner-content">
      <div>
        <span>Made by</span>
        <span>Kyle Peterson</span>
        <span>Rochester, NY</span>
      </div>

      <div>
        <span>Find a bug? Fork the repo or contact me!</span>
        <span>Thank you for visiting</span>
      </div>

      <div>
        <span>Made with Vue &#10084;</span>
        <span>See the project on my <a target="_blank" href="https://github.com/KyleEvan/Vue-Website">GitHub</a></span>
        <span>༼ つ ͡◕ _ ͡◕ ༽つ</span>
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
    background: $offWhite;
    padding: $lg-padding 0;
    font-weight: 600;
    z-index: 1;
    @include lg {
      padding: $main-topBotPad 0;
    }
    .footer-content{
      z-index: 0;
      display: flex;
      flex-flow: column;
      text-align: left;

      @include md{
        flex-flow: row;
        justify-content: space-between;
        div{
          &:nth-child(2){
            text-align: center;
          }
        }
        div{
          &:nth-child(3){
            text-align: right;
          }
        }
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
          opacity: .6;
          padding: .2em 0;
          a,
          a:hover,
          a:focus,
          a:active {
            text-decoration: underline;
            color: $mainColor;
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
