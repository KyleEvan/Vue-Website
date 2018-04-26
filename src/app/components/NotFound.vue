<template>
  <div>
    <h1>Oops!</h1>
    <p>Something went wrong</p>
    <p>{{ messages.pageNotFound }}</p>
  </div>
</template>

<script>
  export default {
    // name: 'notFound',
    data () {
      return {
        messages:{
          pageNotFound: "404 page not found"
        }
      }
    }
  }
</script>
