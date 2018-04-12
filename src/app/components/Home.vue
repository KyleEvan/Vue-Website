<template>
  <div>

    <div class="container">
      <div class="content">

        <section v-for="project in projects" :class="project.align" class="project">
          <div class="text">
            <h2>{{project.title}}</h2>
            <p>
              {{project.summary}}
            </p>
            <a class="link" :href="project.href" @click.prevent="handleClick" :style="{color: project.secondaryColor, backgroundColor: project.primaryColor}">View Project</a>
          </div>
          <div class="image" :style="{width: project.image.width, background: project.primaryColor}">
            <img :src="project.image.src" />
            <!-- <svg :style="{width: project.image.style.width, height: project.image.style.height}">
              <rect class="background" x="0" y="0" width="100%" height="100%" :fill="project.primaryColor" />
              <image x="0" y="0" :width="project.image.width" :height="project.image.height" v-bind:xlink:href='project.image.src' />
            </svg> -->
          </div>
        </section>

      </div>
    </div>

    <svg id="transitionLayer" ref="transitionSVG" :width="transitionSVG.width" :height="transitionSVG.height" :viewBox="viewbox" v-show="transitioning">
      <defs>
        <clipPath id="polyClip">
          <polygon ref="transitionPolygon" :points="transitionSVG.polygon.points"></polygon>
        </clipPath>
      </defs>
      <rect :fill="transitionSVG.image.backgroundColor" :x="transitionSVG.x" :y="transitionSVG.y" :width="transitionSVG.width" :height="transitionSVG.height" clip-path="url(#polyClip)"></rect>
      <g clip-path="url(#polyClip)">
        <image ref="transitionImage" :x="transitionSVG.image.x" :y="transitionSVG.image.y" :width="transitionSVG.image.width" :height="transitionSVG.image.height" xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="transitionSVG.image.src"></image>
      </g>
    </svg>

    <div id="transitionImage">

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

  // Color Themes
  // https://coolors.co/616163-44ffd2-ffbfa0-87f6ff-f2545b
  const colors = {
    turquoise: '#44FFD2',
    darkTurquoise: '#2CA386',
    peach: '#FFBFA0',
    mediumPeach: '#E8AE92',
    darkPeach: '#A37A66',
    blue: '#87F6FF',
    darkBlue: '#569DA3'
  };

  export default {
    name: 'home',

    data () {
      return {
        bannerWidth: document.documentElement.clientWidth,
        bannerHeightVW: .3,   // 30vw
        bannerMinHeight: 400, // px

        images: [],
        projects: [
          {
            align: 'ltr',
            title: 'Careers Redesign',
            summary: 'Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.',
            href: 'Careers-Redesign',
            image:{
              width: '60%',
              // width: '100%',
              // height: '100%',
              src: careersScreensPNG,
              // style:{
              //   width: '42vw',
              //   height: '25.2vw'
              // }
            },
            primaryColor: colors.peach,
            mediumColor: colors.mediumPeach,
            secondaryColor: colors.darkPeach
          }
        ],



        tl: new TimelineLite(),
        transitioning: false,
        transitionSVG:{
          x: 0,
          y: 0,
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          polygon:{
            points: '0 0 0 0 0 0 0 0',
            pointsTransformed: '0 0 0 0 0 0 0 0'
          },
          image:{
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            src: '',
            backgroundColor: '#ffffff',
            transform:{
              translateX: undefined,
              translateY: undefined,
              scale: undefined
            },
            container: undefined
          },
        }

      }
    },
    computed:{
      viewbox(){
        return `${this.transitionSVG.x} ${this.transitionSVG.y} ${this.transitionSVG.width} ${this.transitionSVG.height}`;
      },
      bannerHeight(){
        // Check bannerHeight to make sure its not lower than the minimum height
        return (window.innerWidth*this.bannerHeightVW) >= this.bannerMinHeight ? (window.innerWidth*this.bannerHeightVW) : this.bannerMinHeight;
      }
    },
    methods:{
      getPoints: function(l, t, r, b){
        return `${l} ${t} ${r} ${t} ${r} ${b} ${l} ${b}`;
      },
      navigate: function(e, index){
        const href = e.target.getAttribute("href");
        if(href){
          this.$router.push({
            name: href,
            params: {project: this.projects[index]}
          });
        }
      },
      getProjectData: function(target){
        const projects = document.querySelectorAll('.project');
        for (var i = projects.length-1; i >= 0; i--){
          let project = projects[i];
          if( project.querySelector('.link') == target){
            return {
              el: projects[i],
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
      calcTransforms: function(data){
        const container = data.imageContainer.getBoundingClientRect();
        const containerCenter = {
          x: container.left + container.width/2,
          y: container.top + container.height/2
        };
        const newCenter = {
          x: this.bannerWidth/2,
          y: this.bannerHeight/2
        };
        // Translations
        return {
          scale: this.bannerHeight/container.height,
          translateX: newCenter.x - containerCenter.x,
          translateY: newCenter.y - containerCenter.y
        };
      },
      createBackground: function(data){
        const container = data.imageContainer.getBoundingClientRect();
        const SVGContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        SVGContainer.setAttribute('viewBox', `${0} ${0} ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);

        const background = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        background.setAttribute('fill', data.primaryColor);
        background.setAttribute('points', this.getPoints(container.left, container.top, container.right, container.bottom));
        SVGContainer.appendChild(background);
        document.querySelector('.main').insertBefore(SVGContainer, data.image);
        data.imageContainer.style.background = 'transparent';
      },
      setData: function(el){
        // Reference original project image
        const activeProject = el.closest('.project');
        const activeImage = activeProject.querySelector('image');
        // Filter images array to get image object
        let matchedImage = this.images.filter((image) => {
            return image.el === activeImage;
        })[0];
        // Combine matched image properties with transitionSVG data
        this.transitionSVG.image = Object.assign({}, this.transitionSVG.image, matchedImage);
        this.transitionSVG.el = this.$refs.transitionSVG;
        this.transitionSVG.image.el = this.$refs.transitionImage;
        // Assign image container bounding rect to data
        const containerClientRect = this.transitionSVG.image.referencedSVG.getBoundingClientRect();
        this.transitionSVG.image.container = containerClientRect;
        // Update transitionSVG data with bounding rect properties
        const imageClientRect = matchedImage.el.getBoundingClientRect();
        this.transitionSVG.image.x = imageClientRect.left;
        this.transitionSVG.image.y = imageClientRect.top;
        this.transitionSVG.image.width = imageClientRect.width;
        this.transitionSVG.image.height = imageClientRect.height;
        console.log(containerClientRect);
        console.log(imageClientRect);
      },
      calcImageTransforms: function(){
        const centers = {
          center: {
            x: this.transitionSVG.image.x + this.transitionSVG.image.width/2,
            y: this.transitionSVG.image.y + this.transitionSVG.image.height/2
          },
          newCenter: {
            x: this.transitionSVG.width/2,
            y: this.bannerHeight/2
          }
        };
        this.transitionSVG.image = Object.assign({}, this.transitionSVG.image, centers);
        const imageToContainer_Ratio = this.transitionSVG.image.height/this.transitionSVG.image.container.height;
        this.transitionSVG.image.transform = {
          scale: (this.bannerHeight*imageToContainer_Ratio)/this.transitionSVG.image.height,
          translateX: this.transitionSVG.image.newCenter.x - this.transitionSVG.image.center.x,
          translateY: this.transitionSVG.image.newCenter.y - this.transitionSVG.image.center.y
        };
      },
      calcBackgroundPoints: function(){
        this.transitionSVG.polygon.el = this.$refs.transitionPolygon;

        const polygon = this.transitionSVG.image.container;
        this.transitionSVG.polygon.points = this.getPoints(polygon.left, polygon.top, polygon.right, polygon.bottom);

        this.transitionSVG.polygon.pointsTransformed = this.getPoints(this.transitionSVG.x, this.transitionSVG.y, this.transitionSVG.width, this.bannerHeight);

        console.log(this.transitionSVG.polygon.pointsTransformed);
      },
      handleClick: function(e){
        this.transitioning = true;
        const project = this.getProjectData(e.target);
        const transforms = this.calcTransforms(project);
        console.log(project);
        console.log(transforms);
        this.createBackground(project);

        // console.log(transforms);

        // this.setData(e.target);
        // this.calcImageTransforms();
        // this.calcBackgroundPoints();

        const duration = 800; // temporary
        // const transitionSVG = this.transitionSVG;
        const vue = this;
        // const projectIndex = this.transitionSVG.image.index;
        setTimeout(() => {
          // let image = transitionSVG.image;
          // let polygon = transitionSVG.polygon;
          TweenLite.to(project.imageContainer, (duration/1000), {
            x: transforms.translateX,
            y: transforms.translateY,
            scale: transforms.scale,
            ease: Power2.easeInOut,
            transformOrigin: '50% 50%',
            onStart: () => {
              // Hide original image
              // image.referencedSVG.style.display = "none";
              console.log('starting animation');
            },
            onComplete: () => {
              // vue.navigate(e, projectIndex);

              // console.log("callback!");
              // console.log(svgTransition.innerHTML);
              // svgTransition.outerHTML = "";
              // svgTransition = null;
            }
          });


          // anime({
          //   targets: polygon.el,
          //   points: [
          //     { value: polygon.pointsTransformed }
          //   ],
          //   easing: 'easeInOutCubic',
          //   duration: duration - 80
          // });



        }, 900);
      }

    },
    mounted(){
      // Set transitionLayer data attributes (width and height) to window dimensions excluding scrollbar
      this.transitionSVG.width = document.documentElement.clientWidth;
      this.transitionSVG.height = document.documentElement.clientHeight;

      // Initialize Events
      const handleResize = this.debounce(() => {
        this.transitionSVG.width = document.documentElement.clientWidth;
        this.transitionSVG.height = document.documentElement.clientHeight;
      }, 50);
      window.addEventListener('resize', handleResize);


      const projects = document.querySelectorAll('.project');
      const controller = new ScrollMagic.Controller();
      const tl = new TimelineLite();

        for(let i = 0; i < projects.length; i++){
          let project = projects[i];
          const imageContainer = project.querySelector('.image');
          const image = project.querySelector('.image > img');
          // const imageSrc = image.getAttribute('src');
          // const svg = project.querySelector('.image > svg');
          // const background = imageContainer.style.background;
          // const background = project.querySelector('.background').getAttribute('fill');
          // let imageObject = {
          //   el: image,
          //   index: i,
          //   src: imageSrc,
            // referencedSVG: svg,
          //   backgroundColor: background
          // };
          // this.images.push(imageObject);



          // Convert classnames into array
          const classes = project.className.match(/\S+/g) || [];
          // Set initial values for transforms according to project alignment
          for(let name of classes){
            if(name == 'ltr'){
              // tl.set(svg, { x: '100%', opacity: 0 });
              tl.set(image, { x: '100%' });
              tl.set(imageContainer, { scale: 1.4 });
            }
            else if(name == 'rtl'){
              // tl.set(svg, { x: '-100%' });
              tl.set(image, { x: '-100%' });
            }
          }


          const projectScene = new ScrollMagic.Scene({
            triggerElement: project,
            triggerHook: .8,
            reverse: false
          })
          .on('start', () => {
            tl.to(imageContainer, 1,
            {
              scale: 1,
              ease: Power2.easeOut
            }, 0)
            // .to(svg, 1,
            // {
            //   opacity: 1,
            //   x: '0%',
            //   scale: 1,
            //   ease: Expo.easeOut
            // }, 0)
            .to(image, 1,
            {
              x: '0%',
              ease: Circ.easeOut
            }, 0)
          })
          .addTo(controller);
        }

      if(this.$data.devmode){
        console.log("********************");
        console.log("IMAGES: ");
        console.log(this.images);
        console.log("********************");
      }

      // ourScene.on("progress", function (event) {
        // let progress = event.progress
        // tl.progress(progress);
        // tl.progress(event.progress);
      // });
    // }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  .container{
    background: transparent;

    .content{
      padding: 100vh 8% 3em 8%;

      .project{
        position: relative;
        width: 100%;
        min-height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include small {
          flex-direction: column-reverse;
        }
        @include medium {
          min-height: 80vh;
          flex-direction: row;
        }
        .text{
          @include small {
            width: 100%;
            margin: 0%;
          }
          @include medium {
            width: 34%;
            margin: 0% 0% 0% 8%;
          }

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
        .image{
          display: flex;
          align-items: center;
          overflow: hidden;


          @include small {
            width: 100%;
            padding-bottom: 1.5rem;
          }
          @include medium {
            width: auto;
            padding-bottom: 0;
          }

          img{
            width: 100%
          }

          svg{
            position: relative;
            @include small {
              width: 100% !important;
              height: 34vw !important;
            }
            @include medium {
              width: auto;
              height: auto;
            }
          }
        }

      }
    }
  }


  svg#transitionLayer{
    position:fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

</style>
