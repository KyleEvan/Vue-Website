<template>
  <div>

    <h2>Careers Redesign</h2>
    <p>
      {{msg}}
    </p>
    <p>
      {{ saying }}
    </p>

  </div>
</template>

<script>
  // import Project from './Project.vue';

  export default {
    props: ['msg'],
    data () {
      return {
        sayig: 'hey im content'
      }
    }

  }
</script>

<style lang="scss" scoped>
  // @import '../../style/global.scss';

</style>
