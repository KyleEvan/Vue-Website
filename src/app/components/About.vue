<template>
  <div class="container">
    <div class="content">
      <h1>About</h1>
      <p> {{ msg }} </p>
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
