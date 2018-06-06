<template>
  <div class="container">
    <div class="content">

      <h1>Contact</h1>
      <ul>
        <li>
          <a href="mailto:kyle.evan.p@gmail.com">
            kyle.evan.p@gmail.com
          </a>
        </li>
        <li>
          <a href="#">
            Resume
          </a>
        </li>
      </ul>


    </div>
  </div>
</template>

<script>

  export default {
    name: 'contact',
    data () {
      return {

      }
    },
    methods:{


    }
  }
</script>
<style lang="scss" scoped>
.container{
  min-height: 100vh;
  display: flex;
  align-items: center;

  .content{
    // padding: 0 8%;
    margin: 0 8%;


    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 6vw;
    }
    ul{
      padding: 0;
      list-style: none;

      li{
        font-size: 3vw;
        line-height: 1.6;
      }
    }
  }
}

</style>
