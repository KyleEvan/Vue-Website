<template>

  <work-template :project="project" :events="events">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>


    <!-- Title -->
    <template slot="title">
      Batman Poster Design
    </template>

    <!-- Project Description -->
    <template slot="description">

      <!-- Synopsis -->
      <section>
        <p>
          UI and UX redesign for the member and careers sections of corporate healthcare websites (Excellus BCBS and Univera Healthcare). This project overhauled the entire front-end of these sites adding responsiveness, accessibility, and overall a better flow of content for a more consitent modern web experience accross devices.
        </p>
      </section>

      <!-- Skills -->
      <section>
        <p>
          For the main sections of content pages our team used bootstrap 3 for layout of elements, Javascript for API calls, handling data, conditional rendering, etc..
        </p>
      </section>

      <!-- Links -->
      <section>
        <ul>
          <li><a :href="link_excellus_home">Excellus Careers Home</a></li>
          <li><a :href="link_univera_home">Univera Careers Home</a></li>
        </ul>
      </section>
    </template>

    <!-- Main Content -->
    <template slot="extra">
      <!-- <p>
        {{saying}}
      </p> -->
      <!-- <img :class="" :src="images.sized.career_areas" :alt="" /> -->
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
      </p>
      <p>
        Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.
      </p>
      <p>
        Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
      </p>
    </template>
  </work-template>

</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        link_excellus_home: 'https://www.excellusbcbs.com/wps/portal/xl/careers/',
        link_univera_home: 'https://www.univerahealthcare.com/wps/portal/uv/careers/',
        link_univera_events: 'https://www.univerahealthcare.com/wps/portal/uv/careers/hiring-process/recruitment-events',
      }
    },
    components:{
      'work-template': workTemplate
    },
    computed: {
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.batman,
        ]
      }
    },
    created(){
      // console.log(this.$props.images);
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
