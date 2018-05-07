<template>
  <div>
    <div class="container">
      <div class="content">

        <a
          :href="project.href"
          @click.prevent="handleClick"
          v-for="project in projects"
          :data-align="project.align"
          :style="{width: project.image.width}"
          class="project">
          <div class="text">
            <!-- <h2>{{project.title}}</h2>
            <p>
              {{project.summary}}
            </p>
            <a class="link" :href="project.href" @click.prevent="handleClick" :style="{color: project.secondaryColor, backgroundColor: project.primaryColor}">View Project</a> -->
          </div>
          <div class="image" :style="{height: project.image.height, background: project.primaryColor}">
            <img :src="project.image.src" />
          </div>
        </a>

      </div>
    </div>


  </div>
</template>

<script>
  import ScrollMagic from "scrollmagic";

  import { TimelineLite } from "gsap";
  import anime from 'animejs';

  // Images:
  import careersPNG from '../../images/career-areas-mobile.png';
  import careersScreensPNG from '../../images/careers_screens.png';
  import cycles_lg_jpg from '../../images/cyclesTile@lg.jpg';
  import preview_lg_jpg from '../../images/comboSmash-preview@lg.jpg';


  // Color Themes
  // https://coolors.co/616163-44ffd2-ffbfa0-87f6ff-f2545b
  const colors = {
    red: '#F9B9BC',
    lightRed: '#FCDFE0',
    mediumRed: '#E3A9AB',
    darkRed: '#CC989A',

    turquoise: '#88FFE2',
    lightTurquoise: '#C8FFF1',
    mediumTurquoise: '#7CE8CE',
    darkTurquoise: '#70D1B9',

    peach: '#FFD6C2',
    lightPeach: '#FFECE3',
    mediumPeach: '#E8C3B1',
    darkPeach: '#D1B09F',

    blue: '#B2F9FF',
    lightBlue: '#DCFCFF',
    mediumBlue: '#A2E3E8',
    darkBlue: '#92CCD1'
  };

  export default {
    name: 'home',

    data () {
      return {
        bannerWidth: .5, // 0 - 1 value
        bannerHeightVH: 1,   // 30vw
        bannerMinHeight: 400, // px
        bannerOffsetX: .5,

        background: undefined,
        project: undefined,
        transforms: undefined,
        transitioning: false,

        projects: [
          {
            align: 'ltr',
            title: 'Careers Redesign',
            summary: 'Careers Website Redesign',
            href: 'Careers-Redesign',
            image:{
              width: '34%',
              height: '20vw',
              newHeight: .3,
              src: careersScreensPNG
            },
            primaryColor: colors.blue,
            lightColor: colors.lightBlue,
            mediumColor: colors.mediumBlue,
            darkColor: colors.darkBlue
          },
          {
            align: 'rtl',
            title: 'Cycles',
            summary: 'Lorem ipsum dolor sit',
            href: 'Cycles',
            image:{
              width: '30%',
              height: '25vw',
              newHeight: .3,
              src: cycles_lg_jpg
            },
            primaryColor: colors.turquoise,
            lightColor: colors.lightTurquoise,
            mediumColor: colors.mediumTurquoise,
            darkColor: colors.darkTurquoise
          },
          {
            align: 'ltr',
            title: 'Combo Smash',
            summary: 'Lorem ipsum dolor sit',
            href: 'ComboSmash',
            image:{
              width: '30%',
              height: '22vw',
              newHeight: .5,
              src: preview_lg_jpg
            },
            primaryColor: colors.red,
            lightColor: colors.lightRed,
            mediumColor: colors.mediumRed,
            darkColor: colors.darkRed
          }
        ],


      }
    },
    computed:{
      bannerHeight(){
        // Check bannerHeight to make sure its not lower than the minimum height
        return (window.innerHeight*this.bannerHeightVH) >= this.bannerMinHeight ? (window.innerHeight*this.bannerHeightVH) : this.bannerMinHeight;
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
        // console.log(projects);
        for (let i = projects.length-1; i >= 0; i--){
          let project = projects[i];
          // console.log(target);
          // console.log(project);
          if(project == target){
            // console.log(project);
            return {
              el: project,
              image: project.querySelector('.image > img'),
              imageContainer: project.querySelector('.image'),
              data: this.projects[i]
            }
          }
          else{
            console.log('Something went wrong, no project matches');
          }
        }
      },
      calcTransforms: function(project){
        const container = project.imageContainer.getBoundingClientRect();
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
          console.log(background);
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
            console.log('starting animation');
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
      this.bannerWidth = this.bannerWidth*document.documentElement.clientWidth;

      // Initialize Events
      const handleResize = this.debounce(() => {
        this.bannerWidth = this.bannerWidth*document.documentElement.clientWidth;
      }, 50);
      window.addEventListener('resize', handleResize);

      const projects = document.querySelectorAll('.project');
      const controller = new ScrollMagic.Controller();

        for(let i = 0; i < projects.length; i++){
          let project = projects[i];
          const imageContainer = project.querySelector('.image');
          const image = project.querySelector('.image > img');
          const text = project.querySelector('.text');

          const projectScene = new ScrollMagic.Scene({
            triggerElement: project,
            triggerHook: .7,
            reverse: false
          })
          .on('enter', () => {
            console.log(project);
            console.log(imageContainer);
            console.log(image);
            const tl = new TimelineLite();
            tl.to(imageContainer, 1,
            {
              y: '0%',
              opacity: 1,
              ease: Power4.easeOut
            }, 0)
            .to(image, 1,
            {
              y: '0%',
              opacity: 1,
              ease: Circ.easeOut
            }, 0)
            // .to(text, .6,
            // {
            //   x: '0%',
            //   opacity: 1,
            //   ease: Power2.easeOut
            // }, .55)
          })
          .addTo(controller);
        }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  .container{
    background: transparent;

    .content{
      display: flex;
      margin: 100vh 8% 3em 8%;

      .project{
        position: relative;
        margin: 1em;
        // width: 100%;
        // min-height: 60vh;
        display: flex;
        // align-items: center;
        // justify-content: center;
       &>*{
         pointer-events: none;
       }
        @include small {
          // flex-direction: column-reverse;
        }
        @include medium {
          // min-height: 80vh;
          &[data-align="ltr"]{
            // flex-direction: row;

            // .text{
            //   transform: translateX(30%);
            // }
          }
          &[data-align="rtl"]{
            // flex-direction: row-reverse;

            // .text{
            //   transform: translateX(-30%);
            // }
          }
        }
        .text{
          // @include small {
          //   width: 100%;
          //   margin: 0%;
          // }
          // @include medium {
          //   width: 34%;
          //   margin: 0% 0% 0% 8%;
          // }

          h2{
            margin-top: 0;
            margin-bottom: .75rem;
          }
          p{
            color: #645D54;
            margin-top: 0;
            margin-bottom: 1.5rem;
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
        .image, .text{
          opacity: 0;
        }
        .image{
          width: 100%;
          display: flex;
          padding: 1.5em;
          justify-content: center;
          overflow: hidden;
          transform: translateY(30%);

          @include small{
            // height: 34vw !important;
            margin-bottom: 1.5rem;
          }
          @include medium{
            // width: auto;
            // height: auto;
            margin-bottom: 0;
          }

          img{
            height: 100%;
            transform: translateY(30%);
            opacity: 0;
          }


        }

      }
    }
  }


</style>
