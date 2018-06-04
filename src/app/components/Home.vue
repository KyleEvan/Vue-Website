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
        vp: undefined, // viewport object
        tl: new TimelineLite(),


        bannerWidth: undefined, // 0 - 1 value
        bannerNewWidth: .5, // .5 of window width
        bannerNewHeight: 1,   // 1 of window height
        bannerMinHeight: 400, // px
        bannerOffsetX: .5,

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
    // components:{
    //   'page-transition': PageTransition
    // },
    computed:{
      bannerHeight(){
        // Check bannerHeight to make sure its not lower than the minimum height
        let newBannerHeight = (window.innerHeight*this.bannerNewHeight);
        return newBannerHeight >= this.bannerMinHeight ? newBannerHeight : this.bannerMinHeight;
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
          // Cleanup transitionLayer
          background.parentNode.outerHTML = "";
          background = null;

          this.$router.push({
            name: href,
            params: {project: project}
          });
        }
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
        const duration = .4;
        // console.log(text);

        let filteredProjects = projects.filter( (el) => {
          return (el !== target);
        });
        this.tl.to(this.text, duration*.5, {
          y: '20px',
          opacity: 0,
          ease: Circ.easeIn
        })
        .to(filteredProjects, duration, {
          scale: .4,
          opacity: 0,
          ease: Circ.easeIn,
          transformOrigin: '50% 50%',
        });
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

        return {
          // scale: (window.innerWidth*project.data.image.newHeight)/(container.height - (padding*2)), imageMaxHeight
          scale: this.getImageScale(project, container),
          translateX: newCenter.x - containerCenter.x,
          translateY: newCenter.y - containerCenter.y,
          newPoints: this.newPoints
        };
      },
      createTransitionLayer: function(){
        const transitionContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        transitionContainer.setAttribute('viewBox', `${0} ${0} ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);
        transitionContainer.setAttribute('style',`
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
        // const SVGContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // SVGContainer.setAttribute('viewBox', `${0} ${0} ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);
        // SVGContainer.setAttribute('style',`
        //   position: fixed;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   z-index: -3;`
        // );


        const imageBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        imageBg.setAttribute('fill', project.data.primaryColor);
        // this.transition.bgFill = project.data.primaryColor;

        const points = this.getPoints(container.left, container.top, container.right, container.bottom);
        imageBg.setAttribute('points', points);
        // this.transition.bgPoints = points;

        console.log(this.$refs.transitionBg);

        // SVGContainer.appendChild(background);
        transitionLayer.appendChild(imageBg);
        // document.getElementById('app').appendChild(SVGContainer);
        document.getElementById('app').appendChild(transitionLayer);

        // Hide original background
        project.imageContainer.style.background = 'transparent';

        return imageBg;
      },
      addTransitionBg: function(project, transitionLayer){
        const transitionBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const w = this.vp.width; // viewport & height
        const h = this.vp.cHeight;
        transitionBg.setAttribute('points', `${w} 0 ${w*2} 0 ${w*2} ${h} ${w} ${h}`);
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
        // const tl = new TimelineLite();

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
              { value: this.newPoints }
            ],
            easing: 'easeInQuad',
            duration: imageBgAnimDuration,
            complete: () => {
              console.log("Transition Completed");
              this.transitioning = false;
              this.navigate(e, project.data, imageBgClone);
            }
          });
        };
        // Animate
        //
        this.tl.to(project.imageContainer, projectAnimDuration, {
          x: transforms.translateX,
          y: transforms.translateY,
          scale: transforms.scale,
          ease: Power3.easeInOut,
          transformOrigin: '50% 50%',
          onStart: () => {
            // console.log('starting animation');
          },
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
          this.transitioning = true;
          this.project = this.getProjectData(e.target);
          this.transforms = this.calcTransforms(this.project);
          this.executeTransition(e, this.project, this.transforms);
        }
        else{
          return;
        }
      }

    },
    mounted(){
      // Initially bannerWidth to window width
      this.bannerWidth = this.bannerNewWidth*document.documentElement.clientWidth;
      this.vp = this.getWindow();
      // Initialize Events
      const handleResize = this.debounce(() => {
        this.vp = getWindow();
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

      /* Work & Projects */
      h2{
        font-size: 5vw;
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
      }

    }
  }


</style>
