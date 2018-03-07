<template>
  <div>
    <h1>Oops!</h1>
    <p>Something went wrong</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    // name: 'notFound',
    data () {
      return {
        message: "404 page not found",
      }
    }
  }
</script>
