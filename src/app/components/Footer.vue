<template>
  <footer>
    <div class="footer_content">
      <div>
        <span>Check out this project on GitHub</span>
        <span>Thank you Vue</span>
        <span>༼ つ ͡◕ . ͡◕ ༽つ</span>
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
    padding: 3rem;
    // color: #84A98C;
    font-weight: 600;
    z-index: 1;

    .footer_content{
      z-index: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;


      div{
        width: 40%;
        span{
          display: block;
          opacity: .5;
        }
      }
    }
    // .footer-bg{
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   z-index: -4;
    //   width: 100%;
    //   height: 100%;
    //   background: #F5F5F5;
    // }

  }
</style>
