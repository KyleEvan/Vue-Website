<template>
  <div>
    <div class="container">
      <div class="content">

        <h2>Work <span>&amp;</span> Projects</h2>

        <div class="grid">
          <a
            :href="project.href"
            @click.prevent="handleClick"
            v-for="project in projects"
            :data-align="project.align"
            :style="{width: project.image.width}"
            class="project">
            <div class="text">
              <h3>{{project.title}}</h3>
              <p>
                {{project.summary}}
              </p>
              <!-- <a class="link" :href="project.href" @click.prevent="handleClick" :style="{color: project.secondaryColor, backgroundColor: project.primaryColor}">View Project</a> -->
            </div>
            <div class="image" :style="{background: project.primaryColor}">
              <img :src="project.image.src" />
            </div>
          </a>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
  // Color Palette
  import {colors} from '../colors.js';

  // JS Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";
  import anime from 'animejs';

  // Images
  import careers_screens_lg_png from '../../images/careers_screens@lg.png';
  import cycles_lg_jpg from '../../images/cyclesTile@lg.jpg';
  import preview_lg_jpg from '../../images/comboSmash-preview@lg.jpg';
  import batmanPoster_lg_jpg from '../../images/batman@lg.jpg';
  // import careersPNG from '../../images/career-areas-mobile.png';


  export default {
    name: 'home',

    data(){
      return{
        bannerWidth: undefined, // 0 - 1 value
        bannerNewWidth: .5, // .5 of window width
        bannerNewHeight: 1,   // 1 of window height
        bannerMinHeight: 400, // px
        bannerOffsetX: .5,

        background: undefined,
        project: undefined,
        transforms: undefined,
        transitioning: false,

        projects:[
          {
            align: 'rtl',
            title: 'Member & Careers Redesign',
            summary: 'Complete UX/UI overhaul of member and careers sections of Excellus BCBS and Univera Healthcare',
            href: 'Careers-Redesign',
            image:{
              width: '52%',
              newHeight: .3,
              src: careers_screens_lg_png
            },
            primaryColor: colors.blue,
            lightColor: colors.lightBlue,
            mediumColor: colors.mediumBlue,
            darkColor: colors.darkBlue
          },
          {
            align: 'rtl',
            title: 'Combo Smash',
            summary: 'Lorem ipsum dolor sit',
            href: 'ComboSmash',
            image:{
              width: '40%',
              newHeight: .5,
              src: preview_lg_jpg
            },
            primaryColor: colors.red,
            lightColor: colors.lightRed,
            mediumColor: colors.mediumRed,
            darkColor: colors.darkRed
          },
          {
            align: 'rtl',
            title: 'Batman Comic Store Poster',
            summary: 'Lorem ipsum dolor sit',
            href: 'ComboSmash',
            image:{
              width: '32%',
              newHeight: .5,
              src: batmanPoster_lg_jpg
            },
            primaryColor: colors.peach,
            lightColor: colors.lightPeach,
            mediumColor: colors.mediumPeach,
            darkColor: colors.darkPeach
          },
          {
            align: 'rtl',
            title: 'Cycles',
            summary: 'Lorem ipsum dolor sit',
            href: 'Cycles',
            image:{
              width: '34%',
              newHeight: .3,
              src: cycles_lg_jpg
            },
            primaryColor: colors.turquoise,
            lightColor: colors.lightTurquoise,
            mediumColor: colors.mediumTurquoise,
            darkColor: colors.darkTurquoise
          },

        ],
      }
    },
    computed:{
      bannerHeight(){
        // Check bannerHeight to make sure its not lower than the minimum height
        return (window.innerHeight*this.bannerNewHeight) >= this.bannerMinHeight ? (window.innerHeight*this.bannerNewHeight) : this.bannerMinHeight;
      },
      bannerOffset(){
        return {
          x: this.bannerOffsetX*document.documentElement.clientWidth,
          y: 0
        }
      },
      newPoints(){
        let points = this.getPoints(this.bannerOffset.x, 0, document.documentElement.clientWidth, this.bannerHeight);
        return points;
      }
    },
    methods:{
      getPoints: function(l, t, r, b){
        return `${l} ${t} ${r} ${t} ${r} ${b} ${l} ${b}`;
      },
      navigate: function(e, project, background){
        const href = e.target.getAttribute("href");
        if(href){
          background.parentNode.outerHTML = "";
          background = null;

          this.$router.push({
            name: href,
            params: {project: project}
          });
        }
      },
      getProjectData: function(target){
        const projects = document.querySelectorAll('.project');
        for (let i = projects.length-1; i >= 0; i--){
          let project = projects[i];
          console.log(project);
          console.log(target);
          if(project == target){
            return {
              el: project,
              image: project.querySelector('.image > img'),
              imageContainer: project.querySelector('.image'),
              data: this.projects[i]
            }
          }
          else{
            // console.log('Something went wrong, no project matches');
          }
        }
      },
      calcTransforms: function(project){
        console.log(project)
        const container = project.imageContainer.getBoundingClientRect();
        console.log(container);
        const containerCenter = {
          x: container.left + container.width/2,
          y: container.top + container.height/2
        };
        const newCenter = {
          x: this.bannerOffset.x + (this.bannerWidth/2),
          y: this.bannerHeight/2
        };
        const padding = parseInt(window.getComputedStyle(project.imageContainer, null).getPropertyValue('padding-top'), 10);
        // if(!padding) padding = 0;
        return {
          scale: (window.innerWidth*project.data.image.newHeight)/(container.height - (padding*2)),
          translateX: newCenter.x - containerCenter.x,
          translateY: newCenter.y - containerCenter.y,
          newPoints: this.newPoints
        };
      },
      createBackground: function(project){
        const container = project.imageContainer.getBoundingClientRect();
        const SVGContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        SVGContainer.setAttribute('viewBox', `${0} ${0} ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);
        SVGContainer.setAttribute('style',`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -3;`
        );

        const background = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        background.setAttribute('fill', project.data.primaryColor);
        const points = this.getPoints(container.left, container.top, container.right, container.bottom);
        background.setAttribute('points', points);
        SVGContainer.appendChild(background);
        document.getElementById('app').appendChild(SVGContainer);
        project.imageContainer.style.background = 'transparent';
        return background;
      },
      animateImage: function(e, project, transforms){
        const tl = new TimelineLite();
        const duration = 700; // temporary

        // Hide other projects
        const projects = Array.from(document.querySelectorAll('.project'));
        let filteredProjects = projects.filter(function (el) {
          return (el !== e.target);
        });
        tl.to(filteredProjects, .4, {
          scale: 0,
          ease: Power1.easeInOut,
          transformOrigin: '50% 50%',
        });

        const morphBackground = () => {
          const background = this.createBackground(project);
          anime({
            targets: background,
            points: [
              { value: this.newPoints }
            ],
            easing: 'easeOutQuad',
            duration: 400,
            complete: () => {
              console.log("Transition Completed");
              this.transitioning = false;
              this.navigate(e, project.data, background);
            }
          });
        };
        // Animate
        tl.to(project.imageContainer, (duration/1000), {
          x: transforms.translateX,
          y: transforms.translateY,
          scale: transforms.scale,
          ease: Power1.easeInOut,
          transformOrigin: '50% 50%',
          onStart: () => {
            // console.log('starting animation');
          },
          onComplete: () => {
            morphBackground();
          }
        });
      },
      handleClick: function(e){
        this.transitioning = true;
        this.project = this.getProjectData(e.target);
        this.transforms = this.calcTransforms(this.project);
        this.animateImage(e, this.project, this.transforms);
      }

    },
    mounted(){
      // Initially bannerWidth to window width
      this.bannerWidth = this.bannerNewWidth*document.documentElement.clientWidth;

      // Initialize Events
      const handleResize = this.debounce(() => {
        this.bannerWidth = this.bannerNewWidth*document.documentElement.clientWidth;
        console.log(this.bannerWidth);
      }, 50);
      window.addEventListener('resize', handleResize);


      // ScrollMagic Scene
      const projects = document.querySelectorAll('.project');
      const controller = new ScrollMagic.Controller();

        for(let i = 0; i < projects.length; i++){
          let project = projects[i];
          const imageContainer = project.querySelector('.image');
          const image = project.querySelector('.image > img');
          const text = project.querySelector('.text');
          const delay = .2;
          const projectScene = new ScrollMagic.Scene({
            triggerElement: project,
            triggerHook: .9,
            reverse: false
          })
          .on('enter', () => {
            // console.log(project);
            // console.log(imageContainer);
            // console.log(image);
            const tl = new TimelineLite();
            tl.to(imageContainer, 1,
            {
              y: '0',
              opacity: 1,
              ease: Power3.easeOut
            }, i*delay)
            .to(image, 1,
            {
              y: '0',
              opacity: 1,
              ease: Circ.easeOut
            }, i*delay)
            .to(text, .6,
            {
              x: '0',
              opacity: 1,
              ease: Power2.easeOut
            }, (i*delay) + .55)
          })
          .addTo(controller);
        }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  .container{

    .content{
      padding-top: 140vh;

      /* Work & Projects */
      h2{
        font-size: 6vw;
        line-height: 5vw;
        margin-bottom: 1.2em;
      }

      .grid{
        display: flex;
        align-items: flex-start;
        flex-flow: row wrap;
        justify-content: space-between;
        // margin: 0 -1em 0 -1em;

        .project{
          position: relative;
          text-decoration: none;
          // margin: 1em;
          // width: 100%;
          // min-height: 60vh;
          display: flex;
          align-items: flex-start;
          // justify-content: center;
         &>*{
           pointer-events: none;
         }
          @include small {
            flex-direction: column-reverse;
          }
          @include medium {
            // min-height: 80vh;
            &[data-align="ltr"]{
              flex-direction: row;

              .text{
                transform: translateX(-20px);
              }
            }
            &[data-align="rtl"]{
              flex-direction: row-reverse;

              .text{
                transform: translateX(-20px);
              }
            }
          }
          // .image, .text{
          .image{
            opacity: 0;
          }
          .text{
            opacity: 0;
            color: #645D54;
            margin: 0 .75em;
            font-size: 70%;
            line-height: 1;

            @include small {
              width: 100%;
              // margin: 0%;
            }
            @include medium {
              width: 25%;
              // margin: 0% 0% 0% 8%;
            }
            @include large{
              width: 18%;

            }

            h3{
              margin-top: 0;
              margin-bottom: .75rem;
              line-height: 1.3;
            }
            p{
              margin-top: 0;
              // margin-bottom: 1.5rem;
              line-height: 1.5;
            }
            a{
              display: inline-block;
              padding: 1rem;
              border-radius: 6px;
              font-weight: 700;
              letter-spacing: .5px;
              text-decoration: none;
            }
          }

          .image{
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding: 1.5em;
            justify-content: center;
            overflow: hidden;
            transform: translateY(100px);

            @include small{
              // height: 34vw !important;
              margin-bottom: 1.5rem;
            }
            @include medium{
              width: 75%;
              // height: auto;
              margin-bottom: 0;
            }
            @include large{
              width: 82%;

            }

            img{
              width: 100%;
              transform: translateY(100px);
              opacity: 0;
            }
          }
        }
      }

    }
  }


</style>
