<template>
  <div>

    <div class="container">
      <div class="content">
        <h2>Work <span>&amp;</span> Projects</h2>
        <!-- <div class="grid"> -->
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
            </div>
            <div class="image" :style="{background: project.primaryColor}">
              <img :src="project.image.src" />
            </div>
          </a>
        <!-- </div> -->
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
        // viewport: undefined, // viewport object
        tl: new TimelineLite(),

        transitionedProject: undefined,
        // bannerWidth: undefined, // 0 - 1 value
        // bannerNewWidth: .5, // .5 of window width
        // bannerNewHeight: 1,   // 1 of window height
        // bannerMinHeight: 400, // px
        // bannerOffsetX: .5,

        imageMaxHeight: .7, // 70% of vh

        // background: undefined,
        project: undefined,
        text: [],
        transforms: undefined,

        transitioning: false,
        transition:{
          bgPoints: '0 0 0 0 0 0 0 0',
          bgFill: 'transparent'
        },

        projects:[
          {
            align: 'rtl',
            title: 'Member & Careers Redesign',
            summary: 'Complete UX/UI overhaul of member and careers sections of Excellus BCBS and Univera Healthcare',
            href: 'Careers-Redesign',
            image:{
              width: '54%',
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
              width: '36%',
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
              width: '42%',
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
              width: '42%',
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

    methods:{
      navigate: function(e, project, background){
        const href = e.target.getAttribute("href");
        if(href){
          // Cleanup transitionLayer
          background.parentNode.outerHTML = "";
          background = null;

          this.$router.push({
            name: href,
            params: {project: project}
          });
        }
      },
      getPoints: function(l, t, r, b){
        return `${l} ${t} ${r} ${t} ${r} ${b} ${l} ${b}`;
      },
      getImageScale: function(project, container){
        const padding = parseInt(window.getComputedStyle(project.imageContainer, null).getPropertyValue('padding-top'), 10);
        let newHeight = window.innerWidth*project.data.image.newHeight;
        let newMaxHeight = window.innerHeight*this.imageMaxHeight;
        let imageHeight = newHeight > newMaxHeight? newMaxHeight : newHeight;
        let scale = imageHeight/(container.height - (padding*2));
        return scale;
      },
      hideProjects: function(target){
        const projects = Array.from(document.querySelectorAll('.project'));
        // const text = document.querySelector('.text');
        const duration = .6;

        let filteredProjects = projects.filter( (el) => {
          return (el !== target);
        });
        this.tl.to(this.text, duration/2, {
          // y: '20px',
          opacity: 0,
          ease: Power4.easeOut
        })
        .to(filteredProjects, duration, {
          x: '-15%',
          scale: .88,
          opacity: 0,
          ease: Power4.easeIn,
          transformOrigin: '50% 50%',
        }, `-=${duration/2}`);
      },
      setTransitionedProject: function(){
        const minHeight = 400; // Carousel min-height
        let newWidth, newHeight, newOffset;
        // Mobile
        if(this.viewport.cWidth < this.breakpoints.md){
          newWidth = 1;
          newHeight = .5;
          newOffset = {
            x: 0,
            y: 0
          }
        }
        // Desktop
        else{
          newWidth = .5;
          newHeight = 1;
          newOffset = {
            x: .5,
            y: 0
          };
        }
        let width = newWidth*this.viewport.cWidth;
        let height = (newHeight*this.viewport.cHeight) >= minHeight ? (newHeight*this.viewport.cHeight) : minHeight;
        this.transitionedProject = {
          width: width,
          height: height,
          offset:{
            x: newOffset.x*this.viewport.cWidth,
            y: newOffset.y*this.viewport.cHeight
          },
          center:{
            x: (width/2) + (newOffset.x*this.viewport.cWidth),
            y: (height/2) + (newOffset.y*this.viewport.cHeight)
          },
          points: this.getPoints(newOffset.x*this.viewport.cWidth, newOffset.y*this.viewport.cHeight, this.viewport.cWidth, height)
        }
        console.log(this.transitionedProject);
      },
      getProjectData: function(target){
        const projects = document.querySelectorAll('.project');
        for (let i = projects.length-1; i >= 0; i--){
          let project = projects[i];
          if(project == target){
            return {
              el: project,
              image: project.querySelector('.image > img'),
              imageContainer: project.querySelector('.image'),
              data: this.projects[i]
            }
          }
        }
      },
      calcProjectTransforms: function(project){
        // console.log(project)
        const container = project.imageContainer.getBoundingClientRect();
        // console.log(container);
        const containerCenter = {
          x: container.left + container.width/2,
          y: container.top + container.height/2
        };

        const newProjectCenter = this.transitionedProject.center;

        return {
          scale: this.getImageScale(project, container),
          translateX: newProjectCenter.x - containerCenter.x,
          translateY: newProjectCenter.y - containerCenter.y,
          newPoints: this.transitionedProject.points
        };
      },
      createTransitionLayer: function(){
        const transitionContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        transitionContainer.setAttribute('viewBox', `${0} ${0} ${this.viewport.cWidth} ${this.viewport.cHeight}`);
        transitionContainer.setAttribute('style', `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -3;`
        );
        document.getElementById('app').appendChild(transitionContainer);
        return transitionContainer;
      },
      addImageBg: function(project, transitionLayer){
        const container = project.imageContainer.getBoundingClientRect();

        const imageBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        imageBg.setAttribute('fill', project.data.primaryColor);

        const points = this.getPoints(container.left, container.top, container.right, container.bottom);
        imageBg.setAttribute('points', points);

        transitionLayer.appendChild(imageBg);
        document.getElementById('app').appendChild(transitionLayer);

        // Hide original background
        project.imageContainer.style.background = 'transparent';

        return imageBg;
      },
      addTransitionBg: function(project, transitionLayer){
        const transitionBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const w = this.viewport.width; // viewport & height
        const h = this.viewport.cHeight;
        // transitionBg.setAttribute('points', `${w} 0 ${w*2} 0 ${w*2} ${h} ${w} ${h}`);
        transitionBg.setAttribute('points', this.getPoints(this.viewport.width, 0, this.viewport.width*2, this.viewport.cHeight));
        transitionBg.setAttribute('fill', project.data.lightColor);
        transitionLayer.appendChild(transitionBg);
        let transitionBgObj = {
          el: transitionBg,
          width: w
        }
        return transitionBgObj;
      },
      executeTransition: function(e, project, transforms){
        const transitionLayer = this.createTransitionLayer();
        const transitionBgObj = this.addTransitionBg(project, transitionLayer);

        const imageBgAnimDuration = 300;
        const projectAnimDuration = .7;
        const transitionBgAnimDur = 1.3;

        // Animate and hide other projects
        this.hideProjects(e.target);

        // Animate Image Background
        const morphImageBg = () => {
          const imageBgClone = this.addImageBg(project, transitionLayer);
          console.log(imageBgClone);
          anime({
            targets: imageBgClone,
            points: [
              { value: this.transitionedProject.points }
            ],
            easing: 'easeInQuad',
            duration: imageBgAnimDuration,
            complete: () => {
              console.log("Transition Completed");
              this.transitioning = false;
              this.bodyRestoreScroll();
              this.navigate(e, project.data, imageBgClone);
            }
          });
        };

        // Animate
        // Transition image background
        this.tl.to(project.imageContainer, projectAnimDuration, {
          x: transforms.translateX,
          y: transforms.translateY,
          scale: transforms.scale,
          ease: Power3.easeInOut,
          transformOrigin: '50% 50%',
          // onStart: () => {
          //   ...
          // },
          onComplete: () => {
            morphImageBg();
          }
        })

        // Transition Bg, Cover Screen swipe left to right
        .to(transitionBgObj.el, transitionBgAnimDur, {
          x: -transitionBgObj.width,
          ease: Power4.easeInOut
        }, `-=${(projectAnimDuration*.9)}`)

      },
      handleClick: function(e){
        if(!this.transitioning){
          this.bodyNoScroll();
          this.transitioning = true;
          this.project = this.getProjectData(e.target);
          this.transforms = this.calcProjectTransforms(this.project);
          this.executeTransition(e, this.project, this.transforms);
        }
        else{
          return;
        }
      }
    },
    // created(){
    //
    // },
    mounted(){
      // this.viewport = this.getWindow();
      this.setTransitionedProject();

      // Initialize Events
      const handleResize = this.debounce(() => {
        // this.viewport = this.getWindow();
        this.setTransitionedProject();
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
            this.tl.to(imageContainer, 1,
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
          this.text.push(text);
        }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  .container{

    .content{
      padding-top: 140vh;
      padding-bottom: 12vh;
      display: flex;
      align-items: flex-start;
      flex-flow: row wrap;
      justify-content: space-between;

      /* Work & Projects */
      h2{
        width: 100%;
        font-size: 5vw;
        line-height: 5vw;
        margin-bottom: 1.2em;
      }

      // .grid{

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
          &:hover{
            .text{
              color:blue;
              transform-origin: 0 0;
              transform: scale(1.2) !important;
            }
          }
          &:nth-child(3){
            margin-top: 5em;
          }
          &:nth-child(4){
            margin-top: 8em;
          }

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
            font-size: 80%;
            line-height: 1;

            @include small {
              width: 100%;
              // margin: 0%;
            }
            @include medium {
              width: 30%;
              // margin: 0% 0% 0% 8%;
            }
            @include large{
              width: 25%;

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
              width: 70%;
              // height: auto;
              margin-bottom: 0;
            }
            @include large{
              width: 75%;

            }

            img{
              width: 100%;
              transform: translateY(100px);
              opacity: 0;
            }
          }
        }
      // }

    }
  }


</style>
