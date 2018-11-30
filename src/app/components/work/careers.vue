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
          Complete UI UX overhaul of Excellus BCBS and Univera Healthcare member experience. This was a massive redesign project manually switching over to a responsive theme introducing new coding and design standards to ensure a cohesive intuitive experience. In its previous state, the websites were static fixed width with a totally separate mobile website with its own source. The redesign solved many of these issues, it facilitated the creation and maintenance of content, increased user usability accross all platforms, and updated the look and feel to a more modern progressive design.
        </p>
        <p>
          I worked on migrating ui components and content, adding responsive functionality and accessibility according to modern WAI-ARIA specification standards. Bootstrap 3 was adopted as part of our responsive theme to handle layout and ui for the updated sections.
        </p>
      </section>


    </template>

    <!-- Carousel aside & slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="image in carousel_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <!-- Extra lower content -->
    <template slot="extra">

      <section class="content-image">
        <div>
          <h2>Careers</h2>
          <p>
            As part of the member redesign, the Human Resources department was looking to update the careers section of both websites. I worked with a small team as only developer alognside a content creator and a ux designer. I created all the ui components and styling for the content of these sections.
          </p>
        </div>
        <img :style="{background: lightColor}" role="presentation" :src="careerAreas_image"  alt="multiple mobile screens: redesigned excellus pages" class="image-a show-desktop"/>

      </section>
      <section>
        <h2>Code Samples</h2>
        <p>Custom components and other misc samples from my work at Excellus.</p>

        <!-- <div class="sample">
          <div>
            <h3>Recruitment events calendar</h3>
            <p>some extra little details about this fabulous project</p>
          </div>
          <div v-for="sample in codeSamples">
            <code-sample :samples="sample"></code-sample>
          </div>
        </div> -->

        <ul>
          <li>Recruitment events calendar sample</li>
          <li>Wordpress blog feed sample</li>
        </ul>

      </section>
      <section>
        <h2>Production Links</h2>
        <p>View the full site.</p>
        <ul>
          <li>
            <a target="_blank" :href="links.excellusHome">Excellus Careers Home</a>
          </li>
          <li>
            <a target="_blank" :href="links.univeraHome">Univera Careers Home</a>
          </li>
        </ul>
      </section>

    </template><!-- End of extra template content -->

  </work-template>

</template>

<script>
import {colors} from '../../colors.js';
  import workTemplate from './work-template.vue';
  import codeSample from '../code-sample.vue';

  // code samples
  import {calendarApp} from '../../../samples/calendarApp.js';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Member Redesign',
        className: 'member-redesign',
        links: {
          excellusHome: 'https://www.excellusbcbs.com/wps/portal/xl/careers/',
          univeraHome: 'https://www.univerahealthcare.com/wps/portal/uv/careers/',
        },
        // code samples are an array of objects containing file info
        codeSamples: {
          calendarApp,
        }
      }
    },
    components:{
      'work-template': workTemplate,
      'code-sample': codeSample
    },
    computed: {
      lightColor: function(){
        return this.$props.project ? this.$props.project.lightColor : colors.templateLightColor;
      },
      carousel_images: function(){
        let images = this.$props.images.sized;
        return [
          images.careers_screens,
          images.careers_screens,
          images.careers_screens,
        ]
      },
      // specific images
      careerAreas_image: function(){
        return this.$props.images.all.career_areas.xl;
      }
    },
    // methods: {
    //
    // },
    // created(){
    //
    // },
    // mounted(){
    //   console.log('mounted careers vue.');
    //   // this.fixTags();
    // }
  }
</script>



<style lang="scss">
  @import '../../../style/global.scss';
  .member-redesign{
    .image-a{
      width: 40%;
    }
    .content-image{
      display: flex;
      align-items: center;
      &>div{
        @include lg{
          padding: $lg-padding;
        }
      }
    }
  }

  // .carousel-cell{
  //   &:nth-child(1){
  //     img{
  //       width: auto;
  //       height: 30vw;
  //       max-height: 40vh;
  //     }
  //   }
  //   img{
  //     height: 40vh;
  //   }
  // }


</style>
