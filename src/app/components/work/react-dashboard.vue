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
          A proof of concept for an administrator dashboard developed from scratch using React, babel, webpack, and Chart js.  This was my first personal project using a popular MVC framework.  This is an example for a sleep/energy monitoring application. In a real world use case this might integrate with a fitbit or apple watch.<br />
          Data is simulated for demonstration purposes.
        </p>
        <p>
          View the project on github
        </p>
        <ul>
          <li>
            <a target="_blank" :href="links.github">github</a>
          </li>
          <li>
            <a target="_blank" :href="links.demo">demo</a>
          </li>
        </ul>
      </section>
    </template>

    <!-- Carousel aside & slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Extra lower content -->
    <template slot="extra"></template>
    

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
      }
    }
  }
</script>


<style lang="scss">
  // @import '../../style/global.scss';
  .carousel-cell{
    &:nth-child(1){
      img{
        width: auto;
        height: 30vw;
        max-height: 70vh;
      }
    }
    img{
      height: 30vw;
    }
  }
</style>
