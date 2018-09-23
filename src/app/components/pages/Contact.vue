<template>
  <div><!-- Main Container -->
    <div class="container">
      <div class="content">
        <h1>Contact</h1>
        <div class="inner_content">
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
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;

  .content{

    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 5vw;
    }
    .inner_content{
      padding: 4em 0;
      
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
}

</style>
