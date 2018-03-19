<template>
  <div>
    <div id="banner"></div>
    <div class="content">
      <h2>Careers Redesign</h2>
      <p>
        {{msg}}
      </p>
      <p>
        {{ saying }}
      </p>
    </div>
  </div>
</template>

<script>
  // import Project from './Project.vue';

  export default {
    props: ['msg'],
    data () {
      return {
        saying: 'hey im content'
      }
    }

  }
</script>

<style lang="scss" scoped>
  // @import '../../style/global.scss';
  #banner{
    height: 35vw;
    width: 100%;
    background: #FFA69E;
  }
  .content{
    padding: 5em 8% 3em 8%;
  }
</style>
