<template>
  <div>

    <home-title class="content" :events="events" />

    <div class="container">
      <h2>Work</h2>

      <div class="content projects">
          <a
            :href="project.href"
            @click.prevent="handleClick"
            v-for="project in projects"
            :style="{background: project.primaryColor}"
            class="project">
            <div class="bg"></div>

            <!-- :style="{width: project.image.width}" -->
              <!-- :data-align="project.align" -->

            <div class="image">
              <img :src="images.sized[project.image.src]" />
            </div>
            <div class="info">
              <div class="name">{{project.name}}</div>
              <div class="tags">
                <span v-for="tag in project.tags" :class="tag.toLowerCase()">{{tag}}</span>
              </div>
              <!-- <p>
                {{trimCaption(project.caption)}}
                <span>...Read more »</span>
              </p> -->
            </div>
          </a>
      </div>

      <h2>Projects</h2>
    </div>


  </div>
</template>

<script>
  // Project Data
  import {projects} from '../../projects.js';

  // Components
  import home_title from '../Test/home-title.vue';

  // JS Libraries
  import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";
  import anime from 'animejs';

  export default {
    props: ['images', 'events'],
    name: 'home',

    data(){
      return{
        projects: projects,
        projects_el_arr: [],
        project: undefined,


        animate_hideElements: .35,
        animate_centerProject: .75,
        animate_projectTransition: 1,



        tl: new TimelineLite(),

        imageMaxHeight: .7, // 70% of vh



        transforms: undefined,

        transition_obj: undefined,
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
        let imageContainer = project.image.parentNode;
        let imageHeight = project.image.clientHeight;
        let padding = parseInt(window.getComputedStyle(imageContainer, null).getPropertyValue('padding-top'), 10);
        console.log(imageHeight);
        let height = window.innerWidth*project.data.image.newHeight;
        let maxHeight = window.innerHeight*this.imageMaxHeight;
        let newHeight = height > maxHeight? maxHeight : height;
        console.log(newHeight/imageHeight);
        // let scale = imageHeight/(container.height - (padding*2));
        let scale = newHeight/imageHeight;
        return scale;
      },
      animateOut: function(targets){
        TweenLite.to(targets, this.animate_hideElements,
        {
          y: '20%',
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
      determineViewport: function(){
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
        return {
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
        };
      },
      getProjectData: function(target){
        // const projects = document.querySelectorAll('.project');
        console.log(target);
        for (let i = this.projects_el_arr.length-1; i >= 0; i--){
          let project = this.projects_el_arr[i];

          if(project == target){
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
        let new_center = this.transition_obj.center;
        return {
          scale: this.getImageScale(project, container),
          translateX: new_center.x - container_center.x,
          translateY: new_center.y - container_center.y,
          newPoints: this.transition_obj.points
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

        color_bg.setAttribute('fill', project.data.primaryColor);
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
        transitionBg.setAttribute('points', this.getPoints(this.viewport.width, 0, this.viewport.width*2, this.viewport.cHeight));
        transitionBg.setAttribute('fill', project.data.lightColor);
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
          borderColor: 'transparent'
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
          x: -transitionBgObj.width,
          ease: Power2.easeIn
        });

      },
      handleClick: function(e){
        if(!this.transitioning){
          // Starting transition, transitioning = true
          this.transitioning = true;
          // Disable scroll
          this.bodyNoScroll();
          // Transition obj sets values used to execute transition
          this.transition_obj = this.determineViewport();
          // Get project data
          this.project = this.getProjectData(e.target);
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
    // beforeCreate(){
    //   console.log('before created');
    //
    // },
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
  h2{
    display: inline-block;
    margin-left: 5%;
    padding: 3% 0;
    font-size: 3.65vw;
    line-height: 1;
    font-family: 'Eksell Display';
    font-weight: 400;
  }
  .content{
    margin: 0 10% 0% 16%;
  }
  .projects{
    padding-bottom: 12vh;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    justify-content: space-between;

    .project{
      position: relative;
      display: flex;
      flex-flow: column;
      width: 90%;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid #CAD2C5;
      margin-bottom: 1.75em;
      text-decoration: none;
      opacity: 0;
      transform: translateY(15%);
      &>div{
        pointer-events: none;
      }
      @include md{
        width: 45%;
        margin-bottom: 2.75em;
      }
      @include lg{
        width: 28.33%;
      }

      .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
      }

      .image{
        padding: 1.5em;
        position: absolute;
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
          width: auto;
          height: auto;
          // height: 70%;
          max-width: 100%;
          max-height: 100%;
        }
      }
      .info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 1em;
        margin-top: 50%;
        z-index: 1;
        background: #fff;

        .name{
          padding: .5em;
          font-weight: 700;
          opacity: 1;
        }
        .tags{
          text-align: right;
          span{
            background: #f4f4f4;
            display: inline-block;
            padding: 1em;
            font-size: .7em;
            line-height: .7em;
            margin: .5em;
          }
        }
        // p{
        //   opacity: .75;
        //   margin: .5em 0;
        // }
      }
    }
  }
}

</style>
