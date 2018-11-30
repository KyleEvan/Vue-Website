<template>
  <div>
    <h1>
      {{title[0]}}
    </h1>
    <p>
      Something went wrong
    </p>
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

  h1{
    font-size: 6vw;
  }


</style>
