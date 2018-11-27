<template>

  <work-template :project="project" :events="events" class="member-redesign">

    <template slot="slides">
      <div class="carousel-cell" v-for="image in carousel_images">
        <img :src="image" alt="" />
      </div>
    </template>


    <!-- Title -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Project Description -->
    <template slot="description">

      <!-- Quick Summary -->
      <section>
        <p>
          Complete UI UX overhaul of Excellus BCBS and Univera Healthcare member experience. This was a massive redesign project manually switching over to a responsive theme introducing new coding and design standards to ensure a cohesive intuitive experience. In its previous state, the websites were static fixed width with a totally separate mobile website with its own source. The redesign solved many of these issues, it facilitated the creation and maintenance of content, increased user usability accross all platforms, and updated the look and feel to a more modern progressive design.
        </p>
        <p>
          I worked on migrating ui components and content, adding responsive functionality and accessibility according to modern WAI-ARIA specification standards. Bootstrap 3 was adopted as part of our responsive theme to handle layout and ui for the updated sections.
        </p>
        <img role="presentation" :src="careerAreas_image" alt="multiple mobile screens: redesigned excellus pages" class="image-a"/>
      </section>
      <section>
        <h2>Careers</h2>
        <p>
          As part of the member redesign, the Human Resources department was looking to update the careers section of both websites. I worked with a small team as only developer alognside a content creator and a ux designer. I created all the ui components and styling for the content of these sections.
        </p>
      </section>

      <!-- Links -->

    </template>

    <!-- Extra Content -->
    <template slot="extra">
      <section>
        <h2>Code Samples</h2>
        <p>Custom components and other misc samples from this project.</p>


        <div class="sample">
          <div>
            <h3>Recruitment events calendar</h3>
            <p>some extra little details about this fabulous project</p>
          </div>

          <div v-for="sample in codeSamples">
          <code-sample :samples="sample">
            <!-- <template slot="html">
              <pre class="html" v-html="calendarApp_sample[0].html"></pre>
            </template>
            <template slot="css">
              <pre class="css" v-html="calendarApp_sample[1].css"></pre>
            </template>
            <template slot="js">
              <pre class="js" v-html="calendarApp_sample[2].js"></pre>
            </template> -->
          </code-sample>
        </div>

        </div>



        <ul>
          <li>Wordpress blog feed</li>
        </ul>
      </section>
      <section>
        <h2>View the redesigned websites</h2>
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
  import workTemplate from './work-template.vue';
  import codeSample from '../code-sample.vue';

  // code samples
  import {calendarApp} from '../../../samples/calendarApp.js';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Member Redesign',

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

      carousel_images: function(){
        let images = this.$props.images.sized;
        return [
          images.careers_screens,
          images.careers_screens,
          images.careers_screens,
        ]
      },
      careerAreas_image: function(){
        return this.$props.images.all.career_areas.xl;
      }
      // fixTags: function(el){
      //   var text, openTag, date;
      //   text = String(el.textContent);
      //   // openTag = text.match(/<*<\s/g);
      //   // parenthesis ? date = isDate(parenthesis[1]) : date = 0;
      //   // return {
      //   //   el: el,
      //   //   date: date
      //   // };
      // }
    },
    methods: {
      // renderHTML: function(){
        // console.log(this.calendarApp_sample);
        // return this.html;
        // return String.raw[this.html];
      // },
      fixTags: function(string){
        console.log(this.calendarApp_sample[0].html);
        // console.log(this.calendarApp_sample[0].html.match(/\n/))
        // const html = this.$refs.code_sample.querySelector('pre[html]');
        // // let htmlText = html.textContent;
        // let rawHTML = String.raw`${string}`;
        // console.log(rawHTML);
        //
        // // let htmlText = html.getAttribute('html');
        // // let openTags = rawHTML.match();
        // // let openTags = RegExp(/</g);
        // let openTag = [/</g, '&lt;'];
        // let closeTag = [/>/g, '&gt;'];
        // let replaceCharacters = [openTag, closeTag];
        // for(var i = 0; i < replaceCharacters.length; i++){
        //   let character = replaceCharacters[i];
        //   rawHTML = rawHTML.replace(character[0], character[1]);
        // }
        // // console.log(openTags);
        // console.log(rawHTML);
        // // html.innerHTML = rawHTML;
        // return rawHTML;
        // let parsedHTML = htmlText.match(/<\/?/);
        // console.log(parsedHTML);
        // return 'message text test';

      },
    },
    created(){

      // console.log(this.$props.images);
    },
    mounted(){
      console.log('mounted careers vue.');
      // this.fixTags();
    }
  }
</script>



<style lang="scss">
  // @import '../../style/global.scss';
  .member-redesign{
    .image-a{
      width: 100%;
    }
  }
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
