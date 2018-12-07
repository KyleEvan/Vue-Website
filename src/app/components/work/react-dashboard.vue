<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">
    <!-- Aside content -->

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Aside main content -->
    <template slot="asideContent">
      <section>
        <p>
          A proof of concept for an administrator dashboard developed from scratch using React, babel, webpack, and Chart js. My first personal project using one of the big three ui frameworks. After taking some Codeacademy courses on React, I wanted to familiarize myself a bit more with node and React to really understand how these tools facilitate the development process of an application. This application is purely for demonstration purposes and the data is static. It is a concept for a browser application that could integrate with a fitbit or apple watch.
        </p>
        <p>
          View the project on github
        </p>
        <a target="_blank" :href="links.github" class="link-btn">GitHub</a>
        <a target="_blank" :href="links.demo" class="link-btn">Live Demo</a>
      </section>
    </template>

    <!-- Carousel aside & slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Extra lower content -->
    <template slot="extra">
      <section class="img-center">
        <img :src="dashboard_image" alt="React dashboard mobile full screen"/>
      </section>
    </template>


  </work-template>
  <!-- End of Template -->

</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'React Dashboard',
        className: 'react-dashboard',
        links: {
          github: 'https://github.com/KyleEvan/Admin-Dashboard_React-web-app-demo',
          demo: 'https://kyleevan.github.io/Admin-Dashboard_React-web-app-demo/'
        }
      }
    },
    components:{
      'work-template': workTemplate
    },
    computed: {
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.react_view_today,
        ]
      },
      dashboard_image: function(){
        return this.$props.images.all.react_dashboard[this.$props.images.currentBreakpoint];
      }
    }
  }
</script>


<style lang="scss">
  // @import '../../style/global.scss';
  .react-dashboard{
    .template-aside{
      min-height: 50vh;
    }
  }

</style>
