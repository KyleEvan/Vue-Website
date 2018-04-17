<template>
  <div class="container">
    <div class="content">
      <h1>Hi,</h1>
      <p>
        Welcome to my website, thank you for taking the time to check it out.
      </p>
      <p>
        My name is Kyle Peterson, I am an aspiring front end developer.
        Self-motivated to learn, create, and contribute my personal touch to the vast world wide web.
        I'm a front-end developer who wants to help make the web a more beautiful, rich and natural experience.
      </p>
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
    padding: 0 8%;

    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
    }
  }
}

</style>
