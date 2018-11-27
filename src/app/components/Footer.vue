<template>
  <footer>
    <div class="footer_content">
      <div>
        <span>Made from scratch with Vue &#10084;</span>
        <span>See the source on my <a href="#">github</a></span>
      </div>
      <div>
        <span><span>༼ つ ͡◕ _ ͡◕ ༽つ</span> Thank you for visiting!</span>
      </div>
      <div>
        <span>Made by</span>
        <span>Kyle Peterson</span>
        <span>Rochester, NY</span>
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
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  footer{
    position: relative;
    background: $offWhite;
    padding: 4rem;
    // color: #84A98C;
    font-weight: 600;
    z-index: 1;
    .footer_content{
      z-index: 0;
      display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      flex-flow: column;
      text-align: center;

      div{
        &:nth-child(2){
          padding: 1.6em 0;
        }
        & > span{
          display: block;
          opacity: .5;
          span{
            margin-right: .5em;
          }
        }
      }
    }

  }
</style>
