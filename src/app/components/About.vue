<template>
  <div>
  <div class="container">
    <div class="content">
      <h1>About</h1>
      <p>
        Aspiring creative developer from Rochester, New York studied New Media & Interactive Development at RIT. I enjoy the challenge of developing interesting front end solutions for the web. I'm most curious about bleeding edge technologies, cool websites, and the near future of the web development space.
      </p>
    </div>
  </div>
</div>
</template>

<script>

  export default {
    name: 'about',

    data () {
      return {
        msg: 'about me and stuff'
      }
    }
  }
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 8%;
  flex-flow: wrap;

  .content{
    // padding: 0 8%;
    margin: 0 8%;


    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 6vw;

    }
  }
}

</style>
