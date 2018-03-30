<template>

  <div class="content">
    <h1>About</h1>
    <p> {{ msg }} </p>
  </div>
</template>

<script>

  export default {
    name: 'about',

    data () {
      return {
        msg: 'about me and shit'
      }
    }
  }
</script>
