<template>

  <!-- Work/project Template Component -->
  <work-template :project="project" :events="events" :class="`${className}`">

    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>
    <!-- Carousel slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="(image, index) in carousel_images" :key="index">
        <img :src="image" alt="" />
      </div>
    </template>
    <!-- Main Content -->
    <template slot="main-content">
      <p>
        The member redesign project was a complete UI and UX overhaul of Excellus BCBS and Univera Healthcare member sections. This massive project required a manual transition to a responsive theme introducing new theme and coding standards to create a fresh modern experience for our members.
      </p>
      <p>
        Before the redesign, the websites were static fixed layout and a completely separate mobile website. This project solved many of the issues that plagued productivity by facilitating the creation and maintenance of content. It also greatly improved the website's usability, streamlined the member experience, and added new accessibility funcitonality.
      </p>
      <p>
        A majority of the project I worked on migrating ui components and content, adding responsive functionality and enforcing accessibility standards according section 508 technical to ensure compliance with WAI-ARIA specifications. Bootstrap 3 was the main framework we used in our responsive theme to handle layouts for different viewports. I also developed internal and external web applications trhoughout the duration of the redesign. 
      </p>
      <h2>Careers</h2>
      <p>
        I developed the entire Careers sections of these websites based on designs provided by a UX designer on my team. The web application I am most proud of was a calendar application for upcoming recruitment events for the Careers section of both Excellus and Univera websites. 
      </p>

      <video autoplay loop>
        <source :src="video" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <p>View the production applications:</p>
      <div>
        <a target="_blank" :href="links.excellusCalendar" class="link-btn">Excellus Calendar Application</a>
        <a target="_blank" :href="links.univeraCalendar" class="link-btn">Univera Calendar Application</a>
      </div>


      <!-- <section>
          <h2>Careers</h2>
          <p>
            As part of the member redesign, the Human Resources department was looking to update the careers section of both websites. I worked with a small team as the developer with a content creator and ux designer. I created all the ui components and styling for the content of these sections. The responsive calendar web application to display upcoming recruitment events was the most fun and challenging component to develop. I used Google Calendar and Google Maps api's to pull in recruitment events from the HR Google Calendar and display a location and times if they are listed. The user can click on the events in the calendar or list view to see more details.
          </p>
          <div class="btn-group">
            <a target="_blank" :href="links.excellusCalendar" class="link-btn">Excellus Calendar</a>
            <a target="_blank" :href="links.univeraCalendar" class="link-btn">Univera Calendar</a>
          </div>


      </section> -->
      <!-- <section class="img-center">
        <img :src="excellus_careers_calendar" alt="mobile careers upcoming recruiting events page" />
      </section>
      <section class="img-center">
        <img :src="excellus_careerAreas_image" :style="{background: lightColor}" alt="mobile screens of excellus bcbs career area pages" />
      </section> -->
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



      <!-- Links -->
      <ul class="links-list">
        <li>
          <h2>Production</h2>
          <p>
            View the production sites:
          </p>
          <a target="_blank" :href="links.excellusHome" class="link-btn">Excellus BCBS Home</a>
          <a target="_blank" :href="links.univeraHome" class="link-btn">Univera Healthcare Home</a>
        </li>
      </ul>
      </template>

  </work-template>

</template>

<script>
  import {colors} from '../../colors.js';
  import workTemplate from './work-template.vue';
  import excellusCareersDemo from '../../media/calendar-app-demo-exc.mp4';
  // import codeSample from '../code-sample.vue';

  // code samples
  // import {calendarApp} from '../../../samples/calendarApp.js';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Member Redesign',
        className: 'member-redesign',
        video: excellusCareersDemo,
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
          images.career_areas,
          images.careers_screens,
          images.excellusbcbs_home_viewports,
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
      excellus_wordpressFeed_image: function(){
        return this.$props.images.all.excellusbcbs_wordpressFeed[this.$props.images.currentBreakpoint];
      }
    },
    mounted(){
      console.log(excellusCareersDemo);
    }
  }
</script>


<style lang="scss">
  @import '../../../style/global.scss';
  div.member-redesign{
    div.flickity-slider{
      &>div.carousel-cell:nth-child(1) > img{
        height: 100%;
      }
      &>div.carousel-cell:nth-child(2) > img{
        width: auto;
        height: auto;
        max-width: 90%;
        max-height: 90%;
      }      
      &>div.carousel-cell:nth-child(3) > img{
        width: 70%;
        height: auto;
        top: 4%;
      }
    }
    video{
      width: 100%;
      height: auto;
    }
  }
</style>
