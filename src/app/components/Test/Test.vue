<template>
  <div><!-- Main Container -->
    <div class="container">

      <home-title />


      <!-- <div class="content">
        <h1>Test</h1>
        <div class="inner_content">
          <p>
            Farts
          </p>
        </div>
      </div> -->


    </div>
  </div>
</template>

<script>
  import Home_Title from './Home_Title.vue';

  export default {
    name: 'test',

    data(){
      return {

      }
    },
    components: {
      'home-title': Home_Title
    }
  }
</script>

<style lang="scss" scoped>

.container{
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-flow: wrap;

  .content{
    margin: 0 8%;
    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 6vw;
    }
    div{
      width: 60%;
      text-align: center;
      margin: 0 auto;
    }

  }
}

</style>
