<template>
  <div>

    <!-- <home-title class="content" :events="events" /> -->
    <home-title class="content inner-content" :events="events"/>

    <div class="container">


      <div v-for="(works, section) in sections" :id="section.toLowerCase()">
        <div class="content inner-content">
        <h2>{{section}}</h2>
        <div class="works">
          <div role="link" tabindex="0" v-for="work in works" class="project-container">
            <a
              role="link"
              :href="work.href"
              @click.prevent="handleClick"
              class="project"
              tabindex="-1"
              >
              <div class="bg" :style="{background: work.lightColor}"></div>

              <div class="image">
                <img :data-image-src="work.image.src" class="img-placeholder"/>
              </div>

            </a>
            <div role="link" class="info" @click.prevent="redirectClick">
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
  import {work} from '../../work.js';
  import {projects} from '../../projects.js';

  import homeTitle from '../home-title.vue';

  import anime from 'animejs';

  export default {
    props: ['images', 'events', 'assets'],
    name: 'home',

    data(){
      return{
        sections: {Work: work, Projects: projects},
        projects: work.concat(projects),
        pageImages: [],
        projectsElArr: [],
        project: undefined,
        hideAnimDuration: .35,
        projectAnimDuration: 1,
        imageBgAnimDuration: 800,
        // animate_centerProject: .75,
        transitionBgColor: colors.mainBg,
        transforms: undefined,
        transition: {
          bgPoints: '0 0 0 0 0 0 0 0',
          bgFill: 'transparent'
        },
        transitioning: false,
        carouselTransitionConfig: {
          mobile: {
            width: 1,
            height: .5,
            minHeight: 400,
            width: 1,
            offsetX: 0,
            offsetY: 0,
            padding: '2em'
          },
          tablet: {
            width: .5,
            height: 1,
            minHeight: 0,
            offsetX: .5,
            offsetY: 0,
            padding: '2em'
          },
          desktop: {
            width: .5,
            height: 1,
            minHeight: 0,
            offsetX: .5,
            offsetY: '5em',
            padding: '3em'
          },
        },

      }
    },
    components: {

      'home-title': homeTitle
    },
    methods:{
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
          this.app.removeChild(container);
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
      getProjectData: function(target){
        for (let i = this.projectsElArr.length-1; i >= 0; i--){
          let project = this.projectsElArr[i];
          if(project === target){
            let newImage = this.$props.assets[this.projects[i].image.src];
            // console.log(newImage);
            return {
              el: project,
              image: project.querySelector('img'),
              newImage: newImage,
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



      createTransitionContainer: function(){
        let transition_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let classname = 'transition-overlay';
        transition_el.setAttribute('viewBox', `${0} ${0} ${this.viewport.cWidth} ${this.viewport.cHeight}`);
        transition_el.classList.add(classname);
        document.getElementById('app').appendChild(transition_el);
        return transition_el;
      },
      createTransitionBg: function(project, transitionContainer){
        let transitionBgEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        transitionBgEl.setAttribute('points', this.getPoints(-this.viewport.width, 0, 0, this.viewport.cHeight));
        transitionBgEl.setAttribute('fill', this.transitionBgColor);
        transitionContainer.appendChild(transitionBgEl);
        let transitionBg = {
          el: transitionBgEl,
          width: this.viewport.width
        }
        return transitionBg;
      },
      createProjectBg: function(project, transitionContainer){
        let container = project.el.getBoundingClientRect();
        let colorBg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let points = this.getPoints(container.left, container.top, container.right, container.bottom);
        colorBg.setAttribute('fill', project.data.lightColor);
        colorBg.setAttribute('points', points);
        transitionContainer.appendChild(colorBg);
        // this.app.appendChild(transitionContainer);
        return colorBg;
      },

      // 4.) Animates project to future location.
      //     transition container
      //     - transition background
      //
      animateTransition: function(e, project, transforms){
        let app = this;
        let background = project.el.querySelector('.bg');
        let tl = new TimelineLite();
        let delay = this.hideAnimDuration*1.05;

        const transitionContainer = this.createTransitionContainer();
        const transitionBg = this.createTransitionBg(project, transitionContainer);
        const projectBg = this.createProjectBg(project, transitionContainer);


        // Animate and hide other projects
        this.animateOutElements(e.target);
        // if its not mobile, animate project
        // if(this.$props.images.currentBreakpoint === 'md' || this.$props.images.currentBreakpoint === "lg"){
        const morphImageBg = () => {
          anime({
            targets: projectBg,
            points: [
              { value: transforms.newPoints }
            ],
            easing: 'easeOutQuad',
            duration: app.imageBgAnimDuration,
            complete: () => {
              this.dev('Transition Completed');
              app.transitioning = false;
              app.navigate(e, project.data, transitionContainer);
            }
          });
        }

        // position active project above other elements
        tl.add( TweenLite.set(project.el, {zIndex: 3}) );
        tl.add( TweenLite.set(background, {opacity: 0}) );
        tl.add( TweenLite.to(project.el, this.projectAnimDuration, {
          x: transforms.translateX,
          y: transforms.translateY,
          scale: transforms.scale,
          ease: Power2.easeOut,
          delay: delay,
          transformOrigin: '50% 50%',
          onStart: () => {
            morphImageBg();
          }
        }), 0 );
        tl.add( TweenLite.to(transitionBg.el, this.projectAnimDuration, {x: transitionBg.width, delay: delay, ease: Power1.easeOut }), 0);
      // }
      // else {
      //   app.navigate(e, project.data, transitionContainer);
      // }


        // TweenLite.to(project.el, this.projectAnimDuration, {
        //   x: transforms.translateX,
        //   y: transforms.translateY,
        //   scale: transforms.scale,
        //   ease: Power2.easeOut,
        //   transformOrigin: '50% 50%',
        //   // onStart: () => {
        //   //   ...
        //   // },
        //   // onComplete: () => {
        //     // morphImageBg();
        //   // }
        // });

        // fade neutral background to colored bg
        // TweenLite.to(background, this.projectAnimDuration, {
        //   opacity: 0,
        //   ease: Power3.easeOut
        // });
        // transition Bg, cover screen swipe left to right
        // TweenLite.to(transitionBg.el, this.projectAnimDuration, {
        //   x: transitionBg.width,
        //   ease: Power1.easeOut
        // });


      },
      handleClick: function(e){
        if(!this.transitioning){
          // Starting transition
          // set transitioning to true to prevent being called again
          this.transitioning = true;

          // this.$route.meta.scroll = document.documentElement.scrollTop;

          // Disable scroll
          this.bodyNoScroll();

          // Get project data:
          // - project el,
          // - current img el,
          // - new sized img el,
          // - relevent project data from project.js
          this.project = this.getProjectData(e.target);
          this.project.data = Object.assign(this.getConfig(), this.project.data);
          this.transforms = this.calcProjectTransforms(this.project);
          this.animateTransition(e, this.project, this.transforms);
        }
      },


      // Gives placeholder imgs a src
      loadPageImages: function(){
        // console.log(this.pageImages);
        let size = 'sm';
        let imgNames = [];
        let placeholders = [].slice.call(document.querySelectorAll('.img-placeholder'));
        for(var i = 0; i < placeholders.length; i++){
          imgNames[i] = placeholders[i].getAttribute('data-image-src');
          this.pageImages[i] = this.$props.images.all[imgNames[i]][size];
          if(i >= placeholders.length-1){
            let replacePlaceholders = function(images){
              for(var j = 0; j < images.length; j++){
                let img = placeholders[j];
                img.src = images[j].src;
                img.removeAttribute('class');
                img.removeAttribute('data-image-src');
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

    // created(){
      // listen for app to load
      // this.events.$on('app-loaded', () => {
        // console.log('init home.vue');
      // });
    // },
    mounted(){
      this.loadPageImages();
      this.projectsElArr = [].slice.call(document.querySelectorAll('.project'));



    },
    updated(){

    }
  }

</script>

<style lang="scss" scoped>
@import '../../../style/global.scss';
.main {
  .container {
    div {
      &#work {
        background: $lightOffWhite;
      }
      &#projects {
        background: $lightOffGreen;
      }
      h2 {
        display: inline-block;
        padding: 3% 0;
        margin: 3em 0 1em 0;
        font-size: $sm-header-fontSize;
        line-height: 1;
        // color: $mainColor;
        // font-family: 'Eksell Display';
        font-weight: 900;
        opacity: .5;
      }
      .works {
        padding-bottom: 10vh;
        display: flex;
        align-items: flex-start;
        flex-flow: row wrap;
        justify-content: flex-start;
        width: 100%;
        @include smmd {
          justify-content: space-between;
        }
        .project-container {
          display: flex;
          flex-flow: column;
          flex-direction: column-reverse;
          border: 1px solid $offWhite;
          margin-bottom: 2.75em;
          max-width: 100%;
          &,
          &:hover,
          &:focus,
          &:active {
            outline: 0;
          }
          // overflow: hidden;
          // margin-right: 1.25em;
          // &:hover > div{
          //
          // }
          @include sm {
            flex-flow: row;
            flex-direction: row-reverse;
            // &:nth-child(2n + 2){
            //   margin-right: 0;
            // }
          }
          @include smmd {
            flex-flow: column;
            // flex-direction: column-reverse;
          }
          @include md {
            // margin-right: 10%;
          }
          @include lg {
            flex-flow: row;
            flex-direction: row-reverse;
            width: 48%;
            // &:nth-child(2n + 2){
            //   margin-right: unset;
            // }
            // &:nth-child(3n + 3){
            //   margin-right: 0;
            // }
          }
          .project {
            position: relative;
            display: flex;
            // flex-flow: column;
            // width: 100%;
            // height: 100%;
            width: 75vw;
            height: 75vw;
            max-width: 100%;
            &,
            &:hover,
            &:focus,
            &:active {
              outline: 0;
            }
            @include sm {
              width: 60vw;
              height: 44vw;
            }
            @include smmd {
              width: 38vw;
              height: 38vw;
            }
            @include md {
              width: 25vw;
              height: 25vw;
            }
            @include lg {
              width: 300px;
              height: 300px;
            }
            // border-radius: 3px;
            overflow: hidden;
            // border: 1px solid $offWhite;
            text-decoration: none;
            // opacity: 0;
            // transform: translateY(15%);
            &>div {
              pointer-events: none;
            }
            .bg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              opacity: 0;
            }
            // &:hover, &:active{
            //   .bg{
            //     // background: #CAD2C5;
            //     opacity: 1;
            //   }
            // }
            .image {
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
              @include lg {
                // padding: .75em;
              }
              &>img,
              &>div {
                // transform: translateY(-20%);
                position: relative;
                display: flex;
                width: auto;
                height: auto;
                min-width: 100px;
                min-height: 100px;
                max-width: 100%;
                max-height: 100%;
                // height: 70%;
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
            // padding: 1em;
            color: $mainColorLight;
            border-bottom: 1px solid $offWhite;
            padding: 1em;
            width: 100%;
            font-size: 1.2em;
            @include sm {
              font-size: 1.4em;
              width: 50%;
              border-right: 1px solid $offWhite;
              border-bottom: none;
            }
            @include smmd {
              width: 100%;
              border-right: none;
              border-top: 1px solid $offWhite;
              padding: 1.2em;
            }
            @include md {
              font-size: 1em;
            }
            @include lg {
              border-right: 1px solid $offWhite;
              border-top: none;
              width: 52%;
              font-size: 1.25em;
            }
            // border-top: none;
            // margin-top: 70%;
            // z-index: 1;
            // color: $mainColor;
            // background: #fff;
            &>div {
              pointer-events: none;
            }
            .name {
              // width: 70%;
              // color: $darkGreen;
              padding: 0 0 .5em 0;
              font-weight: 700;
              line-height: 1.5;
            }
            .tags,
            .date {
              // color: $mediumGreen;
              font-size: .75em;
              line-height: .75em;
              @include sm {
                font-size: .65em;
                line-height: .5em;
              }
            }
            .tags {
              // text-align: right;
              margin-left: -.75em;
              span {
                display: inline-block;
                // line-height: 1;
                padding: .75em;
                // margin-right: .5em;
                float: left;
                // border-radius: 4px;
                // border: 1px solid $offWhite;
              }
            }
            .date {
              padding: 1em 0;
            }
          }
        }
        .project-container {
          // transition: transform .2s ease-in-out;
          &:hover,
          &:active,
          &:focus {
            // border: 1px solid $mainColor;
            box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.08);
            // border-width: 0px;
            border-color: transparent;
            outline: none;
            // transform: scale(1.008);
            & .bg {
              opacity: 1;
            }
            &>div {
              cursor: pointer;
              // color: $mainColor;
              background: $mainBg;
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
