<template>
  <div class="site-message">
    <h1>
      {{messages.title[0]}}
    </h1>
    <p>
      {{messages.default}}
    </p>
    <p>
      {{messages.pageNotFound}}
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        messages:{
          title: ['Page not found', 'Browser not supported'],
          default: "The page you've requested does not exist.",
          pageNotFound: "404 page not found"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>




</style>
