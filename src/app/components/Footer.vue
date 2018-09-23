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
  footer{
    position: relative;
    background: #2F3E46;
    padding: 3rem;
    color: #84A98C;
    font-weight: 600;

    .footer_content{
      z-index: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;


      div{
        width: 40%;
        span{
          display: block;
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
