<template>
  <div class="content">


    <section>
      <h2>Careers Redesign</h2>
      <p>
        Lorem Ipsum Blurb
      </p>
      <router-link to="work/careers-redesign">View Project</router-link>
      <!-- <project title="Careers Redesign" href="something.com">
        <p>
          {{ msg }}
        </p>
      </project> -->

    </section>
  </div>
</template>

<script>
  // import Project from './Project.vue';

  export default {
    name: 'work',
    data () {
      return {
        msg: 'hey im inner content'
      }
    }
    // components: {
    //   "project": Project
    // }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  a{
    display: inline-block;
    padding: 1rem;
    background: $primary-red;
    color: $primary-white;
    border-radius: 3px;
    font-weight: 600;
    text-decoration: none;
  }
</style>
