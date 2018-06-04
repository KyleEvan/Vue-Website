<template>
  <footer>
    <div class="footer-content">
      <div>
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
      </div>
      <div>
        Some footer text and stuff..<br />
        Thank You,<br />
        Kyle ༼ つ ͡◕ . ͡◕ ༽つ
      </div>
    </div>
    <div class="footer-bg"></div>
  </footer>
</template>

<script>
  // import handlerPHP from 'php-loader!../../forms/handler.php';
  // import fileContent from "../../forms/handler.php";
  export default {
    // name: 'footer',
    data () {
      return {
        message: false,
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  footer{
    position: relative;
    padding: 3rem;

    .footer-content{
      z-index: 0;
      display: flex;
      justify-content: space-between;

      ul{
        margin: 0;
        padding: 0;
        font-size: .75rem;
        line-height: 1.8;
        list-style: none;
      }
    }
    .footer-bg{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -4;
      width: 100%;
      height: 100%;
      background: #F5F5F5;
    }

  }
</style>
