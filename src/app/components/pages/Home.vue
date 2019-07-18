<template>
  <div>

    <!-- <home-title class="content" :events="events" /> -->
    <!-- <home-title class="content inner-content" :events="events"/> -->

    <div class="container">

        <div class="content inner-content">
          <h1>Projects</h1>
          <div class="projects">
            <a v-for="(work, index) in projectsData" :key="index" 
              role="link"
              :href="work.href"
              :class="projectContainerClass"
              @mousedown.prevent="handleProjectMousedown"
              @mouseup.prevent="handleProjectMouseup"
              @click.prevent
            >
              <div :class="projectClass" tabindex="-1">
                <div class="image">
                  <img :src="work.featuredImage"/>
                </div>
                <div class="info">
                  <h3 class="name">
                    {{ work.name }}
                  </h3>
                  <ul class="tags">
                    <li v-for="(tag, index) in work.tags" :key="index" :class="tag.toLowerCase()">
                      {{ tag }}
                    </li>
                  </ul>
                  <div v-if="work.date" class="date">{{work.date}}</div>
                </div>
              </div>

            </a>
          </div>
        </div>

      <svg id="transition-overlay" class="out">
        <rect />
      </svg>

    </div><!-- End of works container -->


  </div>
</template>

<script>
  // var spinner = require('svg-inline-loader?classPrefix=my-prefix-!../../../images/spinner.svg');
  // import spinner from '../../../images/spinner.svg';

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
        // sections: {Projects: projects},
        projects: projects,
        pageImages: [],
        projectsElArr: [],
        project: undefined,
        // hideAnimDuration: .45,
        // projectAnimDuration: 1.1,
        // imageBgAnimDuration: 1100,
        // // animate_centerProject: .75,
        // transitionBgColor: colors.mainBg,
        // transforms: undefined,
        // transition: {
        //   bgPoints: '0 0 0 0 0 0 0 0',
        //   bgFill: 'transparent'
        // },
        // transitioning: false,
        // carouselTransitionConfig: {
        //   mobile: {
        //     width: 1,
        //     height: .5,
        //     minHeight: 400,
        //     width: 1,
        //     offsetX: 0,
        //     offsetY: 0,
        //     padding: '2em'
        //   },
        //   tablet: {
        //     width: .5,
        //     height: 1,
        //     minHeight: 0,
        //     offsetX: .5,
        //     offsetY: 0,
        //     padding: '2em'
        //   },
        //   desktop: {
        //     width: .5,
        //     height: 1,
        //     minHeight: 0,
        //     offsetX: .5,
        //     offsetY: '5em',
        //     padding: '3em'
        //   },
        // },

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
          // console.log('within element!');
          return;
        } else {
          // console.log('cancel select');
          this.removeRipple();
        }
      },
      handleProjectMousedown: function(e){
        let projectContainer = e.currentTarget;
        let projectEl = projectContainer.querySelector('.project');
        let projectImage = projectEl.querySelector('.image');
        this.project = this.getProjectData(projectEl);
        document.body.addEventListener('mousemove', this.mousemoveHandler);
        console.log(this.project);
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
              // console.log(activeProject);
              // this.navigate(e, project.data, transitionContainer);
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
        console.log(header);
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
        console.log('navigating!!!!!');
        console.log(el.getAttribute('href'));
        console.log(this.project);
        this.$router.push({
          name: el.getAttribute('href'),
          params: {project: this.project.data}
        });
      },
      
      getProjectData: function(target){
        console.log(target);
        console.log(this.projectContainers);
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


      // handleProjectClick: function(e){
      //   this.transitioning = true;
      //   this.project = this.getProjectData(e.target);
      //   let inactiveProjects = this.filterInactiveProjects(e.target);

      //   // console.log(e.clientX);
      //   // console.log(e.clientY);
        
      //   // let rect = this.initSvgOverlay('#transition-overlay.out', this.project.data.mainColor, 1);
      //   // this.animateToProject(rect, e.target, inactiveProjects);
      // },


      /**
       * use as reference for animating out inactive projects
       */
      // animateOutElements: function(target){
      //   let infoElsArr, parentClassName, info, inactiveProjects, activeProject, projectContainers;
      //   activeProject = target;
      //   parentClassName = 'project-container';
      //   projectContainers = [].slice.call(this.$el.querySelectorAll(`.${parentClassName}`));
      //   infoElsArr = [];
      //
      //   while ((activeProject = activeProject.parentNode) && activeProject.className.indexOf(parentClassName) < 0);
      //   info = activeProject.querySelector('.info');
      //   infoElsArr = [].slice.call(info.children);
      //   inactiveProjects = projectContainers.filter( (el) => {
      //     infoElsArr.push([].slice.call(el.querySelector('.info').children));
      //     return (el.querySelector('.project') !== target);
      //   });
      //   inactiveProjects.push(info);
      //   // hideElsArr = hideElsArr.concat(inactiveProjects);
      //   this.animateOut(inactiveProjects, infoElsArr, activeProject);
      // },



      //---------------< Helper Functions >---------------
      // trimCaption: function(caption){
      //   let word_limit = 16;
      //   caption = caption.split(" ").splice(0, word_limit).join(" ");
      //   return caption;
      // },

      redirectClick: function(e){
        e.target.previousElementSibling.click();
      },

      navigate: function(e, project, container){
        const href = e.target.getAttribute("href");
        if(href){
          // Cleanup transitionContainer
          // background.parentNode.outerHTML = "";
          // background = null;
          // console.log(container);
          // console.log(this.app);
          document.getElementById('app').removeChild(container);
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
        let pageImg, newImg, scale;
        pageImg = {
          width: project.image.clientWidth,
          height: project.image.clientHeight
        };
        newImg = {
          width: project.newImage.width,
          height: project.newImage.height,
          aspect: project.newImage.width/project.newImage.height,
        };

        // if(pageImg.width >= pageImg.height){
          let newWidth = project.data.width - (project.data.slidePadding*2);
          let newHeight = project.data.height - (project.data.slidePadding*2);
          // console.log(newWidth);
          // scale = newWidth/pageImg.width;
        // } else {
          if(newHeight > newImg.height){
            newHeight = newImg.height;
            let width = newHeight*newImg.aspect;
            if(width > newWidth) scale = newWidth/pageImg.width;
            else scale = newHeight/pageImg.height;
          }
          else if(newWidth > newImg.width) {
            newWidth = newImg.width;
            let height = newWidth/newImg.aspect;
            if(height > newHeight) scale = newHeight/pageImg.height;
            else scale = newWidth/pageImg.width;
          }
          else {
            scale = newHeight/pageImg.height;
          }
          // console.log(newHeight);
          // scale = newHeight/pageImg.height;
        // }

        // if new height of project is greater than the allowed max
        // finalImageHeight = (newHeight > maxHeight ? maxHeight : newHeight);
        // scale = finalImageHeight/imageH;
        return scale;
      },


      getOffset: function(el, val){
        if(typeof val === 'number') { return val*this.viewport.cWidth }
        else {
          if(typeof val === 'string') {
            let multiple = parseInt(val);
            let em = parseInt(getComputedStyle(el).fontSize);
            return multiple*em;
          }
        }
      },


      animateOut: function(inactiveProjects, info, container){
        TweenLite.set(container, {borderColor: 'transparent', boxShadow: 'none'});
        TweenLite.to(inactiveProjects, this.hideAnimDuration, { opacity: 0, ease: Power2.easeIn });
        TweenLite.to(info, this.hideAnimDuration, {transformOrigin: '50% 50%', y: '30%', opacity: 0, ease: Power2.easeIn});
      },
      animateOutElements: function(target){
        let infoElsArr, parentClassName, info, inactiveProjects, activeProject, projectContainers;
        activeProject = target;
        parentClassName = 'project-container';
        projectContainers = [].slice.call(this.$el.querySelectorAll(`.${parentClassName}`));
        infoElsArr = [];

        while ((activeProject = activeProject.parentNode) && activeProject.className.indexOf(parentClassName) < 0);
        info = activeProject.querySelector('.info');
        infoElsArr = [].slice.call(info.children);
        inactiveProjects = projectContainers.filter( (el) => {
          infoElsArr.push([].slice.call(el.querySelector('.info').children));
          return (el.querySelector('.project') !== target);
        });
        inactiveProjects.push(info);
        // hideElsArr = hideElsArr.concat(inactiveProjects);
        this.animateOut(inactiveProjects, infoElsArr, activeProject);
      },
      // animateCenterProject: function(target){
      //   let img = target.querySelector('img');
      //   TweenLite.to(img, this.animate_centerProject, {
      //     y: 0,
      //     ease: Power2.easeInOut,
      //   });
      // },


      // 1.)  Get the selected project,
      //      create and return object containing:
      //      - project element,
      //      - project image element,
      //      - sized img element used in template,
      //      - project.js data object
      

      // 2.)  Get the configuration for the project transition
      //      determined by viewport size and future layout of carousel in project page
      //      return object containing values (width, height, center, offset, ...)
      //      these values define the layout config/position of the project at the end transition
      getConfig: function(){
        const config = this.carouselTransitionConfig;
        let carousel, width, height, left, right, offsetX, offsetY, containerW, containerH;
        containerW = this.viewport.cWidth;
        containerH = this.viewport.cHeight;
        // depending on viewport set config
        carousel = config.mobile;
        if(this.viewport.width >= this.breakpoints.lg) {
          containerW = this.breakpoints.lg;
          carousel = config.desktop;
        }
        else if(this.viewport.width >= this.breakpoints.md){
          carousel = config.tablet;
        }

        offsetX = this.getOffset(this.project.el, carousel.offsetX);
        offsetY = this.getOffset(this.project.el, carousel.offsetY);
        width = carousel.width*containerW;
        containerH = containerH-(offsetY*2);
        height = (carousel.height*containerH) >= carousel.minHeight ? (carousel.height*containerH) : carousel.minHeight;
        left = offsetX;
        right = offsetX + width;

        return {
          config: carousel,
          width: width,
          height: height,
          offset: {
            x: offsetX,
            y: offsetY
          },
          center: {
            x: (width/2) + offsetX,
            y: (height/2) + offsetY
          },
          points: this.getPoints(left, offsetY, right, height+offsetY),
          slidePadding: this.getOffset(this.project.image, carousel.padding)
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
        }
      },




      showContent: function(){
        console.log('showing content in home');
        this.animateInProjects();
      },
      loadPage: function(){
        // this.loadPageImages('sm', this.$el);
      }
      // Gives placeholder imgs a src
      // loadPageImages: function(){
      //   // console.log(this.pageImages);
      //   let size = 'sm';
      //   let imgNames = [];
      //   let placeholders = [].slice.call(document.querySelectorAll('.img-placeholder'));
      //   for(var i = 0; i < placeholders.length; i++){
      //     imgNames[i] = placeholders[i].getAttribute('data-image-src');
      //     this.pageImages[i] = this.$props.images.all[imgNames[i]][size];
      //     if(i >= placeholders.length-1){
      //       let replacePlaceholders = function(images){
      //         for(var j = 0; j < images.length; j++){
      //           let img = placeholders[j];
      //           img.src = images[j].src;
      //           img.removeAttribute('class');
      //           img.removeAttribute('data-image-src');
      //         }
      //       }
      //       this.loadImages(this.pageImages, replacePlaceholders);
      //     }
      //   }
      // }

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
  // margin-top: 9em;
  padding: 1em 0;
  @include smmd {
    padding: 2em 0;
  }
  @include md {
    padding: 3em 0;
  }
  .container {
    
    div {
      // &#work {
      //   background: $lightOffWhite;
      // }
      // &#projects {
      //   background: $lightOffGreen;
      // }
      h1 {
        display: block;
        // padding: 1em 0;
        // font-size: $sm-header-fontSize;
        line-height: 1;
        // color: $mainColor;
        // font-family: 'Eksell Display';
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
          // overflow: hidden;
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
          // &:nth-child(odd){
          //   margin: 0em .5em 1em 1em;
          // }
          // &:nth-child(even){
          //   margin: 0em 1em 1em .5em;
          // }
          // width: 50%;
          // width: 100%;
          // &,
          // &:hover,
          // &:focus,
          // &:active {
          //   outline: 0;
          // }
          // 
          
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
          // @include sm {
            
            // flex-direction: row-reverse;
          // }
          @include smmd {
            width: calc(33.333333% - 2em);
            margin-top: unset;
            &:nth-child(even){
              margin-left: 1em;
            }
            // margin: 0 !important;
            margin: 1em;
            // padding: 1em;
            // width: 33.333333%;
            height: auto;
            border: none;
            
            // flex-flow: column;
          }
          @include md {
            width: calc(25% - 2em);
            // width: 25%;

            // margin-right: 10%;
          }
          @include lg {
            flex-flow: row;
            // flex-direction: row-reverse;
            // width: 48%;
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
            // transition-duration: .3s;
            transition-timing-function: ease-in-out;

            
            // &,
            // &:hover,
            // &:focus,
            // &:active {
            //   outline: 0;
            // }

           
            // @include sm {
            //   width: 60vw;
            //   height: 44vw;
            // }
            @include smmd {
              // border: 1px solid transparent;
              border: none;
              
            }
            @include md{
              &:hover,
              &:focus {
                // border: 1px solid $blue;
                box-shadow: 0px 12px 20px rgba(40,42,42,0.2);
                transform: translateY(0) scale(1.05) !important;
                z-index: 2;
                // .image{
                //   border-color: $lightBlue;
                // }
              }
            }
            // @include md {
            //   width: 25vw;
            //   height: 25vw;
            // }
            // @include lg {
            //   width: 300px;
            //   height: 300px;
            // }
            // overflow: hidden;
            text-decoration: none;
            &>div {
              pointer-events: none;
            }
            // .bg {
            //   position: absolute;
            //   top: 0;
            //   left: 0;
            //   width: 100%;
            //   height: 100%;
            //   background: transparent;
            //   opacity: 0;
            // }
            .image {
              // padding: 1.5em;
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
                // padding: .75em;
              }
              &>img,
              &>div {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                object-fit: cover;
                // min-width: 100px;
                // min-height: 100px;
                // max-width: 100%;
                // max-height: 100%;
              }
            }
          }
          .info {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-flow: column;
            padding: 0 0 .75em 1em;

            // color: $blue;
            z-index: 1;
            // padding: 1em;
            // color: $mainColorLight;
            // border-bottom: 1px solid $offWhite;
            // padding: 1em 0;
            width: 100%;
            // font-size: 1.2em;
            @include sm {
              // font-size: 1.4em;
              // width: 100%;
              // border-right: 1px solid $offWhite;
              border-bottom: none;
            }
            @include smmd {
              // width: 100%;
              border-right: none;
              // padding: 0;
              // border-top: 1px solid $offWhite;
              // padding: 1.2em;
            }
            @include md {
              // font-size: 1em;
            }
            @include lg {
              // border-right: 1px solid $offWhite;
              border-top: none;
              // width: 52%;
              // font-size: 1.25em;
            }
            &>div {
              width: 100%;
              pointer-events: none;
            }
            .name {
              // padding: 0 0 .5em 0;
              font-weight: 700;
              font-size: 1em;
              line-height: 1.5;
              // margin: 0 0 .5em 0;

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
            // .tags,
            // .date {
            //   font-size: .75em;
            //   line-height: .75em;
            //   @include sm {
            //     font-size: .65em;
            //     line-height: .5em;
            //   }
            // }
            // .tags {
            //   margin-left: -.75em;
            //   span {
            //     display: inline-block;
            //     padding: .75em;
            //     float: left;
            //   }
            // }
            // .date {
            //   padding: 1em 0;
            // }
          }
        }
        .project-container {
          // transition: all .3s ease-in-out;
          &:hover,
          &:active,
          &:focus {
            // border: 1px solid $mainColor;

            // border-width: 0px;
            // border-color: transparent;
            outline: none;
            @include smmd{
              
            }
            // transform: scale(1.008);
            // & .bg {
            //   opacity: 1;
            // }
            &>div {
              cursor: pointer;
              // color: $mainColor;
              // background: $mainBg;
              // border-bottom: 1px solid $mainColor;
              border-color: transparent;
              @include sm {
                border-bottom: none;
                // border-right: 1px solid $mainColor;
              }
            }
          }
        }
      }
    }
  }
}

</style>
