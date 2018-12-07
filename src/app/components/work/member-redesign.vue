<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Aside main content -->
    <template slot="asideContent">
      <section>
        <p>
          Complete UI UX overhaul of Excellus BCBS and Univera Healthcare member sections. This was a massive redesign project manually switching over to a responsive theme introducing new coding and design standards to produce a fresh updated experience for our members.
        </p>
        <p>
          In its previous state, the websites were static fixed width with a mobile website maintained separately. The redesign solved many of these issues, it facilitated the creation and maintenance of content, retired the mobile site, increased usability accross all platforms, and updated the look and improved the design.
        </p>
        <p>
          I worked on migrating ui components and content, adding responsive functionality and accessibility according section 508 technical standards using modern WAI-ARIA specifications. Bootstrap 3 was adopted as part of our responsive theme to handle layout and ui components for the updated sections.
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

      <section class="img-center">
        <img id="exc-home" :src="excellus_home_image" alt="excellus bcbs home page"/>
      </section>

      <section>
          <h2>Careers</h2>
          <p>
            As part of the member redesign, the Human Resources department was looking to update the careers section of both websites. I worked with a small team as the developer with a content creator and ux designer. I created all the ui components and styling for the content of these sections. The responsive calendar web application to display upcoming recruitment events was the most fun and challenging component to develop. I used Google Calendar and Google Maps api's to pull in recruitment events from the HR Google Calendar and display a location and times if they are listed. The user can click on the events in the calendar or list view to see more details.
          </p>
          <div class="btn-group">
            <a target="_blank" :href="links.excellusCalendar" class="link-btn">Excellus Calendar</a>
            <a target="_blank" :href="links.univeraCalendar" class="link-btn">Univera Calendar</a>
          </div>

          <!-- <img :style="{background: lightColor}" :src="careerAreas_image"  alt="multiple mobile screens: redesigned excellus pages" class="image-a show-desktop"/> -->

      </section>
      <section class="img-center">
        <img :src="excellus_careers_calendar" alt="mobile careers upcoming recruiting events page" />
      </section>
      <section class="img-center">
        <img :src="excellus_careerAreas_image" :style="{background: lightColor}" alt="mobile screens of excellus bcbs career area pages" />
      </section>
        <!--

            Future implementation

        -->

        <!-- <h2>Code Samples</h2>
        <p>Custom components and other misc samples from my work at Excellus.</p> -->

        <!-- <div class="sample">
          <div>
            <h3>Recruitment events calendar</h3>
            <p>some extra little details about this fabulous project</p>
          </div>
          <div v-for="sample in codeSamples">
            <code-sample :samples="sample"></code-sample>
          </div>
        </div> -->
        <!--
        <ul>
          <li>Recruitment events calendar sample</li>
          <li>Wordpress blog feed sample</li>
        </ul> -->



      <!-- links -->
      <section>
        <h2>Links</h2>

        <ul class="links-list">
          <li>
            <h3>Production</h3>
            <p>
              View the redesign project's current state at the links below.
            </p>
            <a target="_blank" :href="links.excellusHome" class="link-btn">Excellus BCBS Home</a>
            <a target="_blank" :href="links.univeraHome" class="link-btn">Univera Healthcare Home</a>
          </li>
        </ul>
      </section>

    </template><!-- End of extra template content -->

  </work-template>

</template>

<script>
import {colors} from '../../colors.js';
  import workTemplate from './work-template.vue';
  // import codeSample from '../code-sample.vue';

  // code samples
  // import {calendarApp} from '../../../samples/calendarApp.js';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Member Redesign',
        className: 'member-redesign',
        links: {
          excellusHome: 'https://www.excellusbcbs.com/wps/portal/xl',
          univeraHome: 'https://www.univerahealthcare.com/wps/portal/uv',
          excellusCalendar: 'https://www.excellusbcbs.com/wps/portal/xl/careers/hiring-process/recruitment-events',
          univeraCalendar: 'https://www.univerahealthcare.com/wps/portal/uv/careers/hiring-process/recruitment-events',
        },
        // code samples are an array of objects containing file info
        // codeSamples: {
        //   calendarApp,
        // }
      }
    },
    components:{
      'work-template': workTemplate,
      // 'code-sample': codeSample
    },
    computed: {
      lightColor: function(){
        return this.$props.project ? this.$props.project.lightColor : colors.templateLightColor;
      },
      carousel_images: function(){
        let images = this.$props.images.sized;
        return [
          images.excellusbcbs_member,
          images.univera_perks,
          images.careers_screens,
        ]
      },
      excellus_careers_calendar: function(){
        return this.$props.images.all.excellusbcbs_careers_calendar[this.$props.images.currentBreakpoint];
      },
      excellus_home_image: function(){
        return this.$props.images.all.excellusbcbs_home_viewports[this.$props.images.currentBreakpoint];
      },
      excellus_careerAreas_image: function(){
        return this.$props.images.all.career_areas[this.$props.images.currentBreakpoint];
      },
    },
  }
</script>


<style lang="scss">
  @import '../../../style/global.scss';
  .member-redesign{
    #exc-home{
      @include lg {
        width: 60%;
      }
    }
  }
</style>
