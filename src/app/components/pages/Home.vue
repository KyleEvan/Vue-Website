<template>
  <div>

    <div class="container">
      <h2>Work <span>&amp;</span> Projects</h2>

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
            <div class="caption">
              <span class="name">{{project.name}}</span>
              <p>
                {{trimCaption(project.caption)}}
                <span>...Read more »</span>
              </p>
            </div>
          </a>
      </div>
    </div>


  </div>
</template>

<script>
  // Project Data
  import {projects} from '../../projects.js';

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




        tl: new TimelineLite(),

        imageMaxHeight: .7, // 70% of vh



        transforms: undefined,

        transition_obj: undefined,
        transition:{
          bgPoints: '0 0 0 0 0 0 0 0',
          bgFill: 'transparent'
        },
        transitioning: false,
        transitionedProject: undefined
      }
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
            params: {project: project, images: this.images}
          });
        }
      },
      getPoints: function(l, t, r, b){
        return `${l} ${t} ${r} ${t} ${r} ${b} ${l} ${b}`;
      },
      getImageScale: function(project, container){
        let padding = parseInt(window.getComputedStyle(project.el, null).getPropertyValue('padding-top'), 10);
        let newHeight = window.innerWidth*project.data.image.newHeight;
        let newMaxHeight = window.innerHeight*this.imageMaxHeight;
        let imageHeight = newHeight > newMaxHeight? newMaxHeight : newHeight;
        let scale = imageHeight/(container.height - (padding*2));
        return scale;
      },
      animateOut: function(targets){
        console.log(targets);
        let dur = .3;
        this.tl.to(targets, dur,
        {
          y: '20%',
          opacity: 0,
          ease: Expo.easeIn,
          delay: .05,
          transformOrigin: '50% 50%'
        }, `-=${dur/2}`);
      },
      hideElements: function(target){
        let hide_els, current_caption, filtered_projects;
        hide_els = [];
        current_caption = target.querySelector('.caption');
        hide_els.push(current_caption);
        filtered_projects = this.projects_el_arr.filter( (el) => {
          return (el !== target);
        });
        hide_els = hide_els.concat(filtered_projects);
        this.animateOut(hide_els);
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
      createProjectBgs: function(project, transitionLayer){
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
        return imageBg;
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
      executeTransition: function(e, project, transforms){
        const transitionLayer = this.createTransitionLayer();
        const transitionBgObj = this.createTransitionBgObj(project, transitionLayer);
        const imageBgAnimDuration = 400;
        const projectAnimDuration = .7;
        const transitionBgAnimDur = 1.3;

        const animate_hideElements = .3;


        // Animate and hide other projects
        this.hideElements(e.target);
        //this.centerProject();

        // Animate Image Background
        const morphImageBg = () => {
          const project_bg = this.createProjectBgs(project, transitionLayer);
          console.log(project_bg);
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

        // Translate Project
        let background = project.el.querySelector('.bg');
        console.log(background);
        // increase z index val to bring project to top layer
        this.tl.set(project.el, {
          zIndex: 3
        })
        .to(project.el, projectAnimDuration, {
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
        .to(background, projectAnimDuration, {
          opacity: 0,
          ease: Power3.easeInOut
        })

        // Transition Bg, Cover Screen swipe left to right
        .to(transitionBgObj.el, transitionBgAnimDur, {
          x: -transitionBgObj.width,
          ease: Power4.easeInOut
        }, `-=${(projectAnimDuration*.9)}`)

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
          this.executeTransition(e, this.project, this.transforms);
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
            let caption = project.querySelector('.caption');
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
      console.log(this.projects_el_arr);
      console.log(this.$props.images);
      this.initScrollMagic();


    },
    updated(){

    }
  }

</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';

.main{
  padding-top: 120vh;

  .projects{
    padding-bottom: 12vh;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    justify-content: space-around;

    .project{
      position: relative;
      display: flex;
      flex-flow: column;
      width: 90%;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid #CAD2C5;
      text-decoration: none;
      opacity: 0;
      transform: translateY(15%);
      &>div{
        pointer-events: none;
      }
      @include medium{
        width: 45%;
      }
      @include large{
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
          transform: translateY(-20%);
          max-height: 70%;
          max-width: 100%;
        }
      }
      .caption{
        padding: 1em;
        margin-top: 50%;
        z-index: 1;
        background: #fff;

        .name{
          font-weight: 700;
          opacity: 1;
        }
        p{
          opacity: .75;
          margin: .5em 0;
        }
      }
    }
  }
}



.main{
  /* To accomodate scene */
  padding-top: 120vh;
  .container{

    .contsent{
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
              transform: translateX(3%) scale(1.05) !important;
            }
          }
          &:nth-child(3){
            margin-top: 5%;
            margin-right: 10%;
          }
          &:nth-child(4){
            margin-top: 5%;
          }
          &:nth-child(5){
            margin-right: 10%;
            margin-top: 17%;
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
            transition: transform 1s cubic-bezier(.17,.62,.4,1);
            transform-origin: 0 0;


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
}

</style>
