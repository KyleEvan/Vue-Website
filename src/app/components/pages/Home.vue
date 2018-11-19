<template>
  <div>

    <home-title class="content" :events="events" />

    <div class="container">


      <div v-for="(works, section) in sections" :class="section.toLowerCase()">
        <h2>{{section}}</h2>
        <div class="content projects">
          <div v-for="work in works" class="project-container">
            <a
              :href="work.href"
              @click.prevent="handleClick"
              class="project">
              <div class="bg" :style="{background: work.lightColor}"></div>

              <div class="image">
                <img :style="{transform: `translateY(${work.image.offsetY})`}" :src="images.sized[work.image.src]" />
              </div>

            </a>
            <div class="info">
              <div class="name">{{work.name}}</div>
              <div class="tags">
                <span v-for="tag in work.tags" :class="tag.toLowerCase()">{{tag}}</span>
              </div>
              <div v-if="work.date" class="date">{{work.date}}</div>
              <!-- <p>
                {{trimCaption(project.caption)}}
                <span>...Read more »</span>
              </p> -->
            </div>
          </div>
        </div>
      </div>


    </div><!-- End of works container -->


  </div>
</template>

<script>
  // Project Data
  import {work} from '../../work.js';
  import {projects} from '../../projects.js';

  // Components
  import home_title from '../home-title.vue';

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
        projects_el_arr: [],
        project: undefined,


        animate_hideElements: .35,
        animate_centerProject: .75,
        animate_projectTransition: 1,



        tl: new TimelineLite(),

        imageMaxHeight: .7, // 70% of vh

        carousel_mobile: {
          height: .5,
          minHeight: 400,
          width: 1,
          offsetX: 0,
          offsetY: 0
        },
        carousel_desktop: {
          height: 1,
          minHeight: 0,
          width: .5,
          offsetX: .5,
          offsetY: 0
        },

        transforms: undefined,
        transition:{
          bgPoints: '0 0 0 0 0 0 0 0',
          bgFill: 'transparent'
        },
        transitioning: false,
        // transitionedProject: undefined
      }
    },
    components: {
      'home-title': home_title
    },
    methods:{
      //---------------< Helper Functions >---------------
      trimCaption: function(caption){
        let word_limit = 16;
        caption = caption.split(" ").splice(0, word_limit).join(" ");
        return caption;
      },


      navigate: function(e, project, background){
        const href = e.target.getAttribute("href");
        if(href){
          // Cleanup transitionLayer
          console.log(project);
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
        let imageHeight = project.image.clientHeight;
        let imageWidth = project.image.clientWidth;
        let height = window.innerWidth*project.data.image.newHeight;
        let maxHeight = window.innerHeight*this.imageMaxHeight;
        let newHeight = height > maxHeight? maxHeight : height;
        let scale = newHeight/imageHeight;
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
        filtered_projects = this.projects_el_arr.filter( (el) => {
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
      getViewportData: function(){
        let carousel, width, height;
        carousel = this.carousel_mobile;
        if(this.viewport.cWidth >= this.breakpoints.md) carousel = this.carousel_desktop;
        width = carousel.width*this.viewport.cWidth;
        height = (carousel.height*this.viewport.cHeight) >= carousel.minHeight ? (carousel.height*this.viewport.cHeight) : carousel.minHeight;
        return {
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
          points: this.getPoints(carousel.offsetX*this.viewport.cWidth, carousel.offsetY*this.viewport.cHeight, this.viewport.cWidth, height)
        };
      },
      getProjectData: function(target){
        // const projects = document.querySelectorAll('.project');
        for (let i = this.projects_el_arr.length-1; i >= 0; i--){
          let project = this.projects_el_arr[i];

          if(project == target){
            console.log(target);
            console.log(project);

            return {
              el: project,
              image: project.querySelector('img'),
              data: this.projects[i]
            }
          }
        }
      },
      calcProjectTransforms: function(project){
        let container = project.el.getBoundingClientRect();
        let container_center = {
          x: container.left + container.width/2,
          y: container.top + container.height/2
        };
        let new_center = project.data.center;
        return {
          scale: this.getImageScale(project, container),
          translateX: new_center.x - container_center.x,
          translateY: new_center.y - container_center.y,
          newPoints: project.data.points
        };
      },
      createTransitionLayer: function(){
        let transition_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let classname = 'transition_overlay';
        transition_el.setAttribute('viewBox', `${0} ${0} ${this.viewport.cWidth} ${this.viewport.cHeight}`);
        transition_el.classList.add(classname);
        this.app.appendChild(transition_el);
        return transition_el;
      },
      createProjectBg: function(project, transitionLayer){
        let container = project.el.getBoundingClientRect();
        let color_bg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        // let overlay_bg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let points = this.getPoints(container.left, container.top, container.right, container.bottom);

        color_bg.setAttribute('fill', project.data.lightColor);
        // overlay_bg.setAttribute('fill', '#fff');
        color_bg.setAttribute('points', points);
        // overlay_bg.setAttribute('points', points);

        transitionLayer.appendChild(color_bg);
        // transitionLayer.appendChild(overlay_bg);
        this.app.appendChild(transitionLayer);

        // Hide original background
        project.el.style.background = 'transparent';
        return color_bg;
      },
      createTransitionBgObj: function(project, transitionLayer){
        let transitionBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        // let w = this.viewport.width; // viewport & height
        // let h = this.viewport.cHeight;
        transitionBg.setAttribute('points', this.getPoints(-this.viewport.width, 0, 0, this.viewport.cHeight));
        // transitionBg.setAttribute('points', this.getPoints(this.viewport.width, 0, this.viewport.width*2, this.viewport.cHeight));
        // transitionBg.setAttribute('fill', project.data.mainColor);
        transitionBg.setAttribute('fill', project.data.lightColor);
        // transitionBg.setAttribute('fill', '#fff');
        transitionLayer.appendChild(transitionBg);
        let transitionBgObj = {
          el: transitionBg,
          width: this.viewport.width
        }
        return transitionBgObj;
      },
      animateTransition: function(e, project, transforms){
        console.log(transforms);
        const transitionLayer = this.createTransitionLayer();
        const transitionBgObj = this.createTransitionBgObj(project, transitionLayer);
        const imageBgAnimDuration = 400;
        const projectAnimDuration = .7;
        const transitionBgAnimDur = 1.3;

        const animate_hideElements = .3;


        // Animate and hide other projects
        this.animateHideElements(e.target);
        // Vertically center the current project
        this.animateCenterProject(e.target);


        // Animate Image Background
        const morphImageBg = () => {
          const project_bg = this.createProjectBg(project, transitionLayer);
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

        // Translate Project
        let background = project.el.querySelector('.bg');
        // increase z index val to bring project to top layer
        TweenLite.set(project.el, {
          zIndex: 3,
          borderColor: 'transparent',
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
        TweenLite.to(background, this.animate_projectTransition, {
          opacity: 0,
          ease: Power3.easeInOut
        });
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
          this.$route.meta.scroll = document.documentElement.scrollTop;
          // Disable scroll
          this.bodyNoScroll();
          // Get project data
          console.log(e.target);
          this.project = this.getProjectData(e.target);
          this.project.data = Object.assign(this.getViewportData(), this.project.data);
          // console.log(this.project);
          this.transforms = this.calcProjectTransforms(this.project);
          this.animateTransition(e, this.project, this.transforms);
        }
        else{
          return;
        }
      },
      initScrollMagic: function(){
        // ScrollMagic Scene
        const controller = new ScrollMagic.Controller();
        const projectsContainer = document.querySelector('.projects');
        let offset = .065;
        let appearDur = .8;
          for(let i = 0; i < this.projects_el_arr.length; i++){
            let project = this.projects_el_arr[i];
            let image = project.querySelector('.image > img');
            let info = project.querySelector('.info');
            let projectScene = new ScrollMagic.Scene({
              triggerElement: projectsContainer,
              triggerHook: .6,
              reverse: false
            })
            .on('enter', () => {
              this.tl.to(project, appearDur+=offset,
              {
                y: '0',
                opacity: 1,
                ease: Power3.easeOut
              }, 0)
            })
            .addTo(controller);
          }
      }
    },

    created(){
      // listen for app to load
      this.events.$on('app-loaded', () => {
        console.log('init home.vue');
      });
    },
    mounted(){

      this.projects_el_arr = Array.from(document.querySelectorAll('.project'));
      this.initScrollMagic();


    },
    updated(){

    }
  }

</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';

.main{
  // padding-top: 120vh;
  .content{
    margin: 0 10% 0% 16%;
  }
  .container{

    div{
      &.work{
        background: $lightOffWhite;
      }
      &.projects{

      }





  h2{
    display: inline-block;
    margin-left: 5%;
    padding: 3% 0;
    font-size: 2.65em;
    line-height: 1;
    color: $mainColor;
    // font-family: 'Eksell Display';
    font-weight: 900;
  }

  .projects{
    padding-bottom: 10vh;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    justify-content: flex-start;
    .project-container {
      margin-bottom: 2.75em;
      margin-right: 1.25em;
      @include sm {
        margin-right: 10%;

      }
    .project{
      position: relative;
      display: flex;
      flex-flow: column;
      // width: 100%;
      // height: 100%;
      width: 74vw;
      height: 64vw;
      @include sm {
        width: 32vw;
        height: 32vw;
      }
      @include md {
        width: 232px;
        height: 216px;
      }
      @include lg {
        width: 22.33%;
        height: 270px;
      }
      // border-radius: 3px;
      overflow: hidden;
      // border: 1px solid $offWhite;
      text-decoration: none;
      opacity: 0;
      transform: translateY(15%);
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

        img{
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
      justify-content: flex-start;
      align-items: flex-start;
      flex-flow: column;
      // padding: 1em;
      border-top: 1px solid $offWhite;
      // border-top: none;
      // margin-top: 70%;
      z-index: 1;
      // color: $mainColor;
      // background: #fff;

      .name{
        // width: 70%;
        color: $darkGreen;

        padding: .5em 0;
        font-weight: 700;
      }
      .tags, .date {
        color: $mediumGreen;
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
