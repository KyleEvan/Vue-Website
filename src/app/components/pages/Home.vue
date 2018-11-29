<template>
  <div>

    <!-- <home-title class="content" :events="events" /> -->

    <div class="container">


      <div v-for="(works, section) in sections" :id="section.toLowerCase()">
        <div class="content inner-content">
        <h2>{{section}}</h2>
        <div class="works">
          <div v-for="work in works" class="project-container">
            <a
              :href="work.href"
              @click.prevent="handleClick"
              class="project">
              <div class="bg" :style="{background: work.lightColor}"></div>

              <div class="image">
                <img :data-src="work.image.src" class="img-placeholder"/>
              </div>

            </a>
            <div class="info">
              <div class="name">{{work.name}}</div>
              <div class="tags">
                <span v-for="tag in work.tags" :class="tag.toLowerCase()">{{tag}}</span>
              </div>
              <div v-if="work.date" class="date">{{work.date}}</div>
            </div>
          </div>
        </div>
        </div>
      </div>


    </div><!-- End of works container -->


  </div>
</template>

<script>
  import {colors} from '../../colors.js';
  // Project Data
  import {work} from '../../work.js';
  import {projects} from '../../projects.js';

  // Components
  // import home_title from '../home-title.vue';

  // JS Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";
  import anime from 'animejs';

  export default {
    props: ['images', 'events'],
    name: 'home',

    data(){
      return{
        sections: {Work: work, Projects: projects},
        projects: work.concat(projects),

        pageImages: [],
        projectsElArr: [],

        project: undefined,


        animate_hideElements: .35,
        animate_centerProject: .75,
        animate_projectTransition: 1,



        // tl: new TimelineLite(),

        imageMaxHeight: .7, // 70% of vh

        carouselTransitionConfig: {
          mobile: {
            width: 1,
            height: .5,
            minHeight: 400,
            width: 1,
            offsetX: 0,
            offsetY: 0,
            imageHeight: .3,
            iamgeMaxHeight: .7
          },
          tablet: {
            width: .5,
            height: 1,
            minHeight: 0,
            offsetX: .5,
            offsetY: 0,
            imageHeight: .3,
            iamgeMaxHeight: .7
          },
          desktop: {
            width: .5,
            height: 1,
            minHeight: 0,
            offsetX: .5,
            offsetY: 0,
            imageHeight: .3,
            iamgeMaxHeight: .7
          },
        },

        transitionBgColor: colors.mainBg,
        transforms: undefined,
        transition:{
          bgPoints: '0 0 0 0 0 0 0 0',
          bgFill: 'transparent'
        },
        transitioning: false,
        // transitionedProject: undefined
      }
    },
    computed: {

      // 'home-title': home_title
    },
    methods:{
      //---------------< Helper Functions >---------------
      // trimCaption: function(caption){
      //   let word_limit = 16;
      //   caption = caption.split(" ").splice(0, word_limit).join(" ");
      //   return caption;
      // },
      smallImage: function(src){
        var output;
        if(src){
          src['md'] ? output = src['md'] : output = 'no sm image';
        } else {
          output = 'no src image'
        }
        return output;
      },


      navigate: function(e, project, background){
        const href = e.target.getAttribute("href");
        if(href){
          // Cleanup transitionContainer
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
      // Helper for calcProjectTransforms
      getImageScale: function(project, container){
        let imageH, maxHeight, newHeight, scale, finalImageHeight;
        imageH = project.image.clientHeight;
        // max-height is defined by vh units
        maxHeight = window.innerHeight*project.data.config.imageMaxHeight;
        // height is defined by vw units
        newHeight = window.innerWidth*project.data.config.imageHeight;
        // if new height of project is greater than the allowed max
        finalImageHeight = (newHeight > maxHeight ? maxHeight : newHeight);
        scale = finalImageHeight/imageH;
        return scale;
      },
      animateOut: function(targets){
        TweenLite.to(targets, this.animate_hideElements,
        {
          scale: .25,
          opacity: 0,
          ease: Expo.easeIn,
          delay: .05,
          transformOrigin: '50% 50%'
        });
      },
      animateHideElements: function(target){
        let hide_els, current_info, filtered_projects;
        hide_els = [];
        current_info = target.querySelector('.info');
        hide_els.push(current_info);
        filtered_projects = this.projectsElArr.filter( (el) => {
          return (el !== target);
        });
        hide_els = hide_els.concat(filtered_projects);
        this.animateOut(hide_els);
      },
      animateCenterProject: function(target){
        let img = target.querySelector('img');
        TweenLite.to(img, this.animate_centerProject, {
          y: 0,
          ease: Power2.easeInOut,
        });
      },


      // 1.)  Get the selected project,
      //      create and return object containing:
      //      - project element,
      //      - project image element,
      //      - project.js data object
      getProjectData: function(target){
        for (let i = this.projectsElArr.length-1; i >= 0; i--){
          let project = this.projectsElArr[i];
          if(project === target){
            return {
              el: project,
              image: project.querySelector('img'),
              data: this.projects[i]
            }
          }
        }
      },

      // 2.)  Get the configuration for the project transition
      //      determined by viewport size and future layout of carousel in project page
      //      return object containing values (width, height, center, offset, ...)
      //      these values define the layout config/position of the project at the end transition
      getConfig: function(){
        const config = this.carouselTransitionConfig;
        let carousel, width, height, containerW, containerH;
        containerW = this.viewport.cWidth;
        containerH = this.viewport.cHeight;
        // depending on viewport set config
        carousel = config.mobile;
        if(this.viewport.width >= this.breakpoints.md){
          carousel = config.tablet;
        }
        else if(this.viewport.width >= this.breakpoints.lg) {
          containerW = this.breakpoints.lg;
          carousel = config.desktop;
        }
        width = carousel.width*containerW;
        height = (carousel.height*containerH) >= carousel.minHeight ? (carousel.height*containerH) : carousel.minHeight;
        return {
          config: carousel,
          width: width,
          height: height,
          offset: {
            x: carousel.offsetX*this.viewport.cWidth,
            y: carousel.offsetY*this.viewport.cHeight
          },
          center: {
            x: (width/2) + (carousel.offsetX*this.viewport.cWidth),
            y: (height/2) + (carousel.offsetY*this.viewport.cHeight)
          },
          points: this.getPoints(carousel.offsetX*containerW, carousel.offsetY*containerH, this.viewport.cWidth, height)
        };
      },

      // 3.)  Calculate transformation values for project
      //      using the current project bounding rect properties
      //      and new layout config properties.
      //      return values as object
      calcProjectTransforms: function(project){
        let projectEl = project.el.getBoundingClientRect();
        let projectCenter = {
          x: projectEl.left + projectEl.width/2,
          y: projectEl.top + projectEl.height/2
        };
        let newProjectCenter = project.data.center;
        return {
          scale: this.getImageScale(project, projectEl),
          translateX: newProjectCenter.x - projectCenter.x,
          translateY: newProjectCenter.y - projectCenter.y,
          newPoints: project.data.points
        };
      },



      createTransitionContainer: function(){
        let transition_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let classname = 'transition-overlay';
        transition_el.setAttribute('viewBox', `${0} ${0} ${this.viewport.cWidth} ${this.viewport.cHeight}`);
        transition_el.classList.add(classname);
        this.app.appendChild(transition_el);
        return transition_el;
      },
      createTransitionBg: function(project, transitionContainer){
        let transitionBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        transitionBg.setAttribute('points', this.getPoints(-this.viewport.width, 0, 0, this.viewport.cHeight));
        transitionBg.setAttribute('fill', this.transitionBgColor);
        transitionContainer.appendChild(transitionBg);
        let transitionBgObj = {
          el: transitionBg,
          width: this.viewport.width
        }
        return transitionBgObj;
      },
      createProjectBg: function(project, transitionContainer){
        let container = project.el.getBoundingClientRect();
        let color_bg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let points = this.getPoints(container.left, container.top, container.right, container.bottom);

        color_bg.setAttribute('fill', project.data.lightColor);
        color_bg.setAttribute('points', points);

        transitionContainer.appendChild(color_bg);
        this.app.appendChild(transitionContainer);

        // Hide original background
        // project.el.style.background = 'transparent';
        return color_bg;
      },

      animateTransition: function(e, project, transforms){
        const transitionContainer = this.createTransitionContainer();
        const transitionBgObj = this.createTransitionBg(project, transitionContainer);
        const imageBgAnimDuration = 400;
        const projectAnimDuration = .7;
        const transitionBgAnimDur = 1.3;

        const animate_hideElements = .3;


        // Animate and hide other projects
        this.animateHideElements(e.target);
        // Vertically center the current project
        this.animateCenterProject(e.target);



        // Translate Project
        let background = project.el.querySelector('.bg');

        // Animate Image Background
        const morphImageBg = () => {
          const project_bg = this.createProjectBg(project, transitionContainer);
          TweenLite.set(background, {
            opacity: 0,
          });
          // console.log(project_bg);
          anime({
            targets: project_bg,
            points: [
              { value: transforms.newPoints }
            ],
            easing: 'easeInQuad',
            duration: imageBgAnimDuration,
            complete: () => {
              console.log("Transition Completed");
              this.transitioning = false;
              // this.bodyRestoreScroll();
              this.navigate(e, project.data, project_bg);

            }
          });
        };


        // increase z index val to bring project to top layer
        TweenLite.set(project.el, {
          zIndex: 3,
          // borderColor: 'transparent',
        });
        // fade neutral background to colored bg
        TweenLite.set(background, {
          opacity: 1,
        });
        TweenLite.to(project.el, this.animate_projectTransition, {
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
        });
        // fade neutral background to colored bg
        // TweenLite.to(background, this.animate_projectTransition, {
        //   opacity: 0,
        //   ease: Power3.easeOut
        // });
        // transition Bg, cover screen swipe left to right
        TweenLite.to(transitionBgObj.el, this.animate_projectTransition, {
          x: transitionBgObj.width,
          ease: Power2.easeIn
        });

      },
      handleClick: function(e){
        if(!this.transitioning){
          // Starting transition, transitioning = true
          this.transitioning = true;

          // this.$route.meta.scroll = document.documentElement.scrollTop;
          // Disable scroll
          this.bodyNoScroll();
          // Get project data
          this.project = this.getProjectData(e.target);


          this.project.data = Object.assign(this.getConfig(), this.project.data);
          this.transforms = this.calcProjectTransforms(this.project);
          this.animateTransition(e, this.project, this.transforms);
        }
        else{
          return;
        }
      },


      // Gives placeholder imgs a src
      loadPageImages: function(){
        let size = 'sm';
        let imgNames = [];
        let placeholders = [].slice.call(document.querySelectorAll('.img-placeholder'));
        for(var i = 0; i < placeholders.length; i++){
          imgNames[i] = placeholders[i].getAttribute('data-src');
          this.pageImages[i] = this.$props.images.all[imgNames[i]][size];
          if(i >= placeholders.length-1){
            let replacePlaceholders = function(images){
              for(var j = 0; j < images.length; j++){
                let img = placeholders[j];
                img.src = images[j].src;
                img.removeAttribute('class');
                img.removeAttribute('data-src');
              }
            }
            this.loadImages(this.pageImages, replacePlaceholders);
          }
        }
      }

      // Will add later if I have time

      // initScrollMagic: function(){
      //   // ScrollMagic Scene
      //   const controller = new ScrollMagic.Controller();
      //   const projectsContainer = document.querySelector('.projects');
      //   let offset = .065;
      //   let appearDur = .8;
      //     for(let i = 0; i < this.projectsElArr.length; i++){
      //       let project = this.projectsElArr[i];
      //       let image = project.querySelector('.image > img');
      //       let info = project.querySelector('.info');
      //       let projectScene = new ScrollMagic.Scene({
      //         triggerElement: projectsContainer,
      //         triggerHook: .6,
      //         reverse: false
      //       })
      //       .on('enter', () => {
      //         this.tl.to(project, appearDur+=offset,
      //         {
      //           y: '0',
      //           opacity: 1,
      //           ease: Power3.easeOut
      //         }, 0)
      //       })
      //       .addTo(controller);
      //     }
      // }
    },

    created(){
      // listen for app to load
      this.events.$on('app-loaded', () => {
        console.log('init home.vue');
      });
    },
    mounted(){
      this.loadPageImages();
      this.projectsElArr = Array.from(document.querySelectorAll('.project'));

      // this.initScrollMagic();


    },
    updated(){

    }
  }

</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';

.main{
  // padding-top: 120vh;
  // .content{
  //   margin: 0 10% 0% 16%;
  // }
  .container{

    div{
      &#work{
        background: $lightOffWhite;
      }
      &#projects{
        background: $lightOffGreen;
      }





  h2{
    display: inline-block;
    padding: 3% 0;
    margin: 3em 0 1em 0;
    font-size: 2.65em;
    line-height: 1;
    // color: $mainColor;
    // font-family: 'Eksell Display';
    font-weight: 900;
  }

  .works{
    padding-bottom: 10vh;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    justify-content: flex-start;

    .project-container {
      display: flex;
      flex-flow: column;
      flex-direction: column-reverse;
      border: 1px solid $offWhite;


      margin-bottom: 2.75em;
      margin-right: 1.25em;
      @include sm {
        flex-flow: row;
        flex-direction: row-reverse;

        margin-right: 10%;
        // &:nth-child(2n + 2){
        //   margin-right: 0;
        // }
      }
      @include md {
        // &:nth-child(2n + 2){
        //   margin-right: unset;
        // }
        // &:nth-child(3n + 3){
        //   margin-right: 0;
        // }
      }
    .project{
      position: relative;
      display: flex;
      // flex-flow: column;
      // width: 100%;
      // height: 100%;
      width: 74vw;
      height: 64vw;
      @include sm {
        width: 34vw;
        height: 34vw;
      }
      // @include smmd {
      //   width: 40vw;
      //   height: 40vw;
      // }
      @include md {
        width: 20vw;
        height: 20vw;
      }
      @include lg {
        width: 10em;
        height: 10em;
      }
      // border-radius: 3px;
      overflow: hidden;
      // border: 1px solid $offWhite;
      text-decoration: none;
      // opacity: 0;
      // transform: translateY(15%);
      &>div{
        pointer-events: none;
      }


      .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        opacity: 0;
      }
      &:hover, &:active{
        .bg{
          // background: #CAD2C5;
          opacity: 1;
        }
      }

      .image{
        padding: 1.5em;
        position: relative;
        overflow: hidden;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &>img,
        &.div{
          // transform: translateY(-20%);
          position: relative;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          // height: 70%;
          // max-width: 100%;
          // max-height: 100%;
        }
      }
    }
    .info{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-flow: column;
      // padding: 1em;
      color: $mainColorLight;
      border-bottom: 1px solid $offWhite;
      padding: 1em;
      @include sm{
        border-right: 1px solid $offWhite;
        border-bottom: none;
      }
      // border-top: none;
      // margin-top: 70%;
      // z-index: 1;
      // color: $mainColor;
      // background: #fff;

      .name{
        // width: 70%;
        // color: $darkGreen;

        padding: .5em 0;
        font-weight: 700;
      }
      .tags, .date {
        // color: $mediumGreen;
        font-size: .8em;
      }
      .tags{
        // text-align: right;
        margin-left: -.5em;
        span{
          display: inline-block;
          line-height: .7em;
          padding: 0 .5rem;
          float: left;
        }
      }
      .date{
        padding: .5rem 0;
      }
    }
  }

  }
}
}
}

</style>
