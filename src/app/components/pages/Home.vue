<template>
  <div>

    <div class="container">

        <div class="content inner-content">
          <h1>Projects</h1>
          <div class="projects">
            <a v-for="(proj, index) in projectsData" :key="index" 
              role="link"
              :href="proj.href"
              :class="projectContainerClass"
              @mousedown.prevent="handleProjectMousedown"
              @mouseup.prevent="handleProjectMouseup"
              @click.prevent
            >
              <div :class="projectClass" tabindex="-1">
                <div class="image">
                  <img :src="proj.featuredImage"/>
                </div>
                <div class="info">
                  <h3 class="name">
                    {{ proj.name }}
                  </h3>
                  <ul class="tags">
                    <li v-for="(tag, index) in proj.tags" :key="index" :class="tag.toLowerCase()">
                      {{ tag }}
                    </li>
                  </ul>
                  <div v-if="proj.date" class="date">{{proj.date}}</div>
                </div>
              </div>

            </a>
          </div>
        </div>

      <svg id="transition-overlay" class="out">
        <rect />
      </svg>

    </div>


  </div>
</template>

<script>
  import {colors} from '../../colors.js';
  import {projects} from '../../projects.js';
  import homeTitle from '../home-title.vue';
  import charmWord from '../charm-word.vue';
  import anime from 'animejs';

  export default {
    props: ['images', 'events', 'assets'],
    name: 'home',

    data(){
      return{
        projectClass: 'project',
        projectContainerClass: 'project-container',
        ripples: [],
        projectsData: projects,
        projects: projects,
        pageImages: [],
        projectsElArr: [],
        project: undefined,
      }
    },
    components: {
      // spinner,
      'home-title': homeTitle,
      'charm-word': charmWord,
    },
    methods:{
      mousemoveHandler: function(e){
        if(e.clientX > this.selectPosition.left && e.clientX < this.selectPosition.right && e.clientY > this.selectPosition.top && e.clientY < this.selectPosition.bottom){
          return;
        } else {
          this.removeRipple();
        }
      },
      handleProjectMousedown: function(e){
        let projectContainer = e.currentTarget;
        let projectEl = projectContainer.querySelector('.project');
        let projectImage = projectEl.querySelector('.image');
        this.project = this.getProjectData(projectEl);
        document.body.addEventListener('mousemove', this.mousemoveHandler);
        this.selectPosition = projectContainer.getBoundingClientRect();
        let width = this.selectPosition.right - this.selectPosition.left;
        let x = e.clientX - this.selectPosition.left;
        let y = e.clientY - this.selectPosition.top;
        let offset = 5;
        x = (Math.round(x*10)/10) - offset;
        y = (Math.round(y*10)/10) - offset;
        // console.log(x +', '+ y);
        // console.log(width);
        // console.log(this.selectPosition.width);
        let xmlns = 'http://www.w3.org/2000/svg';
        let svg = document.createElementNS(xmlns, 'svg');
        let circle = document.createElementNS(xmlns, 'circle');
        let diameter = width*2.5;
        svg.setAttribute('viewBox', `0 0 ${diameter} ${diameter}`);
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        circle.setAttribute('cx', diameter/2);
        circle.setAttribute('cy', diameter/2);
        circle.setAttribute('r', diameter/2);
        circle.setAttribute('fill', this.project.data.mainColor);
        svg.appendChild(circle);
        svg.style.position = 'absolute';
        svg.style.left = `${x - (diameter/2)}px`;
        svg.style.top = `${y - (diameter/2)}px`;
        svg.style.transform = 'scale(.05)';
        svg.style.opacity = 0.5;
        projectEl.insertBefore(svg, projectImage);
        this.ripples.push(svg);
        this.animateInRipple(svg);
      },
      handleProjectMouseup: function(e){
        if(this.ripples[0]){
          this.removeRipple();
          let inactiveProjects = this.filterInactiveProjects(this.project.el);
          let rect = this.initSvgOverlay('#transition-overlay.out', this.project.data.mainColor, 1);
          // this.project.el.parentElement.focus();
          this.animateToProject(rect, this.project.el.parentElement, inactiveProjects);
        }
      },
      removeRipple: function(){
        document.body.removeEventListener('mousemove', this.mousemoveHandler);
        this.animateOutRipple(this.ripples[0]);
        this.ripples.pop();
      },

      filterInactiveProjects: function(el){
        let inactiveProjects = this.projectContainers.filter( (projectContainer) => {
          return (projectContainer !== el.parentElement);
        });
        return inactiveProjects;
      },
      
      animateInRipple: function(el){
        let tl = new TimelineLite();
        tl.add( TweenLite.to(
          el,
          .4,
          {
            opacity: .75,
            ease: Power2.easeOut
          }
        ), 0);
        tl.add( TweenLite.to(
          el,
          1,
          {
            scale: 1,
            ease: Power2.easeOut
          }
        ), 0)
      },
      animateOutRipple: function(el){
        let tl = new TimelineLite();
        tl.add( TweenLite.to(
          el,
          1,
          {
            // scale: 1,
            opacity: 0,
            ease: Expo.easeOut,
            onComplete: () => {
              if(el){
                el.parentElement.removeChild(el);
              }
            }
          }
        ));
      },
      animateToProject: function(overlayRect, activeProject, inactiveProjects){
        this.bodyNoScroll();
        let tl = new TimelineLite();
        let header = this.$el.querySelector('h1');
        tl.set(activeProject, {transition: 'unset', zIndex: 2});
        tl.add( TweenLite.to(
          activeProject,
          1,
          {
            y: '-30%',
            // delay: 0.5,
            opacity: 0,
            ease: Power3.easeIn,
          }
        ));
        tl.add( TweenLite.to(
          header,
          0.5,
          {
            y: '10%',
            opacity: 0,
            ease: Power2.easeOut,
          }
        ), 0);
        tl.add( TweenLite.to(
          inactiveProjects,
          0.5,
          {
            y: '10%',
            opacity: 0,
            ease: Power2.easeOut,
          }
        ), 0);
        tl.add( TweenLite.to(
          overlayRect,
          1,
          {
            x: '100%',
            opacity: 1,
            ease: Power2.easeOut,
            onComplete: () => {
              this.navigateToProject(activeProject);
            }
          }
        ), '+=0.1');
      },
      
      animateInProjects: function(){
        let tl = new TimelineLite();
        let duration = 1;
        let offset = duration;
        let header = this.$el.querySelector('h1');
        TweenLite.to(header, 1.2,
        {
          opacity: 1,
          y: 0,
          ease: Power2.eastOut
        });
        this.projectContainers.forEach((el) => {
          tl.add( TweenLite.to(
            el,
            offset,
            {
              y: 0,
              opacity: 1,
              ease: Power2.easeOut,
              onComplete: () => {
                el.classList.add('animated-in');
              }
            }
          ), (duration - offset));
          offset *= .95;
        });
      },

      navigateToProject: function(el){
        // console.log('navigating!!!!!');
        // console.log(el.getAttribute('href'));
        // console.log(this.project);
        this.$router.push({
          name: el.getAttribute('href'),
          params: {project: this.project.data}
        });
      },
      
      getProjectData: function(target){
        // console.log(target);
        // console.log(this.projectContainers);
        for (let i = this.projectContainers.length-1; i >= 0; i--){
          let project = this.projectContainers[i].querySelector(`.${this.projectClass}`);
          if(project === target){
            return {
              el: project,
              data: this.projects[i]
            }
          }
        }
      },

      showContent: function(){
        // console.log('showing content in home');
        this.animateInProjects();
      }
    },

    created(){
      // this.events.$on('app-loaded', this.loadPage);
      this.events.$on('nav-loaded', this.showContent);
      this.events.$on('page-transitioned', this.showContent);
    },
    mounted(){
      // this.projectsElArr = [].slice.call(document.querySelectorAll('.project'));
      this.projectContainers = [].slice.call(this.$el.querySelectorAll(`.${this.projectContainerClass}`));
    },
    beforeDestroy(){
      // this.events.$off('app-loaded', this.loadPage);
      this.events.$off('nav-loaded', this.showContent);
      this.events.$off('page-transitioned', this.showContent);
    }
  }

</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';
.main {
  padding: 1em 0;
  @include smmd {
    padding: 2em 0;
  }
  @include md {
    padding: 3em 0;
  }
  .container {
    
    div {
      h1 {
        display: block;
        line-height: 1;
        font-weight: 900;
        transform: translateY(3rem) scale(1);
        opacity: 0;
        font-size: 1.5em;
        @include smmd {
          text-align: center;
        }
      }
      .projects {
        padding-bottom: 10vh;
        display: flex;
        align-items: flex-start;
        flex-flow: row wrap;
        justify-content: flex-start;
        width: auto;
        margin-left: -1em;
        margin-right: -1em;

        .project-container {
          position: relative;
          display: flex;
          flex-flow: column;
          flex-direction: column-reverse;
          background-color: $white;
          flex-flow: row;
          width: calc(50% - 1.5em);
          margin: 1em;
          margin-top: 0;
          height: 30vh;
          border: 1px solid $lightGray;
          
          text-decoration: none;
          transform: translateY(5em) scale(1);
          opacity: 0;
          &:nth-child(even){
            margin-left: 0em;
          }
         
          &:hover,
          &:focus,
          &:active {
            outline: 0;
            .project{
              color: $darkBlue !important;
            }
          }

          @include sm {
            height: 34vh;
          }

          @include smmd {
            width: calc(33.333333% - 2em);
            margin-top: unset;
            &:nth-child(even){
              margin-left: 1em;
            }
            margin: 1em;
            height: auto;
            border: none;
          }
          @include md {
            width: calc(25% - 2em);
          }
          @include lg {
            flex-flow: row;
          }


          .project {
            color: $black;
            position: relative;
            display: flex;
            flex-flow: column;
            width: 100%;
            overflow: hidden;
            transition: box-shadow .5s ease-in-out, transform .5s ease-in-out;
            transition-property: width, height, transform, box-shadow;
            transition-timing-function: ease-in-out;
            @include smmd {
              border: none;
              
            }
            @include md{
              &:hover,
              &:focus {
                box-shadow: 0px 12px 20px rgba(40,42,42,0.2);
                transform: translateY(0) scale(1.05) !important;
                z-index: 2;
              }
            }
            
            text-decoration: none;
            &>div {
              pointer-events: none;
            }

            .image {
              position: relative;
              overflow: hidden;
              top: 0;
              left: 0;
              height: 22vh;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid $lightGray;
              @include md {
                height: 20vh;
                max-height: 240px;
              }
              &>img,
              &>div {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
          .info {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-flow: column;
            padding: 0 0 .75em 1em;
            z-index: 1;
            width: 100%;
            @include sm {

              border-bottom: none;
            }
            @include smmd {
              border-right: none;
            }
            @include md {
            }
            @include lg {
              border-top: none;
            }
            &>div {
              width: 100%;
              pointer-events: none;
            }
            .name {
              font-weight: 700;
              font-size: 1em;
              line-height: 1.5;
            }
            .tags{
              list-style: none;
              margin: 0;
              padding: 0;
              li{
                display: inline-block;
                padding: .5em;
                line-height: 0.8;
                font-size: 0.8em;
                margin-right: .5em;
                background-color: $lightGray;
              }
            }
            .date{
              font-size: 0.8em;
              padding: .5em 0;
            }
          }
        }
        .project-container {
          &:hover,
          &:active,
          &:focus {
            outline: none;
            @include smmd{
              
            }
            &>div {
              cursor: pointer;
              border-color: transparent;
              @include sm {
                border-bottom: none;
              }
            }
          }
        }
      }
    }
  }
}

</style>
