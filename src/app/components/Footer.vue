<template>
  <footer>
    <div class="footer_content">
      <div class="inner_content">
        <h4>Thank you developing community for these amazing technologies, without them this could not exist</h4>
        <ul>
          <li>
            <a href="#">Vue</a>
          </li>
          <li>
            <a href="#">Scrollmagic</a>
          </li>
          <li>
            <a href="#">Greensock</a>
          </li>
        </ul>
        Some footer text and stuff..<br />
        Thank You,<br />
        Kyle<br />
        ༼ つ ͡◕ . ͡◕ ༽つ
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    // name: 'footer',
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
    background: #616163;
    padding: 3rem;

    .footer_content{
      z-index: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      ul{
        margin: 0;
        padding: 0;
        font-size: .75rem;
        line-height: 1.8;
        list-style: none;
      }
      div{
        text-align: center;
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
