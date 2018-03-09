<template>
  <div>


    <section class="project">
      <div class="text">
        <h2>Careers Redesign</h2>
        <p>
          Lorem Ipsum
        </p>
        <router-link to="/work/careers-redesign">View Project</router-link>
      </div>
      <div class="image">
        <svg>
          <defs>
            <clipPath id="clip">
              <rect class="animeRect" x="0" y="0" width="100%" height="100%"/>
            </clipPath>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#FF9393" clip-path="url(#clip)" />
          <image class="clipImage" x="0" y="0" width="100%" height="100%" v-bind:xlink:href='img' clip-path="url(#clip)" />
        </svg>
      </div>

    </section>
  </div>
</template>

<script>
  // import Project from './Project.vue';
  // import careerareasPNG from '../../images/career- areas-mobile.png';
  import careersPNG from '../../images/career-areas-mobile.png';

  export default {
    name: 'work',
    data () {
      return {
        img: careersPNG,
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
