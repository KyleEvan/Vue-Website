<template>
  <footer>
    <div class="footer-content">
    <div>
      <h4>Resources</h4>
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
        <li>
          <a href="#">anime.js</a>
        </li>
        <li>
          <a href="#">Charming</a>
        </li>
        <li>
          <a target="_blank" href="https://www.Lordicons.com">Animated icons created by Lordicons.com</a>
        </li>
      </ul>
    </div>
    <div>
      Some footer text and stuff. Yeah, I made this website 0_0<br />
      ༼ つ ͡◕ . ͡◕ ༽つ
    </div>
    </div>
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
    padding: 3rem;
    background: #F5F5F5;

    .footer-content{
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

  }
</style>
