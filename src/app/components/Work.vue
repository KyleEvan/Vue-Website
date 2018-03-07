<template>
  <div class="main">
    <project title="Careers Redesign" href="something.com">
      <p>
        {{ msg }}
      </p>
    </project>
  </div>
</template>

<script>
  import Project from './Project.vue';

  export default {
    name: 'work',
    data () {
      return {
        msg: 'hey im inner content'
      }
    },
    components: {
      "project": Project
    }
  }
</script>
