<template>
  <div>
  <div class="container">
    <div class="content">
      <h1>About</h1>
      <p>
        I'm an aspiring front-end developer trying to further my skills and push the boundaries of the web.
        Self-motivated to learn, I actively continue my education through sites like udemy and codeacademy to stay up to date with development techniques.
        create, and contribute my personal touch to the vast world wide web.
        I'm a front-end developer who wants to help make the web a more beautiful, rich and natural experience.
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
  }
}

</style>
