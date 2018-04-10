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
            <a :href="project.href" @click.prevent="handleClick" :style="{color: project.secondaryColor, backgroundColor: project.primaryColor}">View Project</a>
          </div>
          <div class="image">
            <svg :style="{width: project.image.style.width, height: project.image.style.height}">
              <rect class="background" x="0" y="0" width="100%" height="100%" :fill="project.primaryColor" />
              <image x="0" y="0" :width="project.image.width" :height="project.image.height" v-bind:xlink:href='project.image.src' />
            </svg>
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
    darkPeach: '#A37A66',
    blue: '#87F6FF',
    darkBlue: '#569DA3'
  };

  export default {
    name: 'home',

    data () {
      return {
        images: [],
        projects: [
          {
            align: 'ltr',
            title: 'Careers Redesign',
            summary: 'Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.',
            href: 'Careers-Redesign',
            image: {
              width: '100%',
              height: '115%',
              src: careersScreensPNG,
              style: {
                width: '42vw',
                height: '25.2vw'
              }
            },
            primaryColor: colors.peach,
            secondaryColor: colors.darkPeach
          }
        ],



        bannerHeight: (window.innerWidth*.3) > 300 ? (window.innerWidth*.3) : 300,




        tl: new TimelineLite(),
        transitioning: false,
        transitionSVG:{
          x: 0,
          y: 0,
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          polygon:{
            points: '0 0 0 0 0 0 0 0',
            pointsTransformed: undefined
          },
          image:{
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            src: '',
            backgroundColor: 'fff',
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
      }
    },
    methods:{
      navigate: function(e){
        const href = e.target.getAttribute("href");
        if(href){
          this.$router.push({name: href, params: { msg:'ello ello' }});
        }
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
        this.transitionSVG.polygon.points = `${polygon.left} ${polygon.top} ${polygon.right} ${polygon.top} ${polygon.right} ${polygon.bottom} ${polygon.left} ${polygon.bottom}`;

        const polygonTransformedPoints = `${this.transitionSVG.x} ${this.transitionSVG.y} ${this.transitionSVG.width} ${this.transitionSVG.y} ${this.transitionSVG.width} ${this.bannerHeight} ${this.transitionSVG.x} ${this.bannerHeight}`;
        this.transitionSVG.polygon.pointsTransformed = polygonTransformedPoints;
      },
      handleClick: function(e){
        this.transitioning = true;
        this.setData(e.target);
        this.calcImageTransforms();
        this.calcBackgroundPoints();

        const duration = 800; // temporary
        const transitionSVG = this.transitionSVG;
        const vue = this;
        setTimeout(() => {
          let image = transitionSVG.image;
          let polygon = transitionSVG.polygon;
          TweenLite.to(image.el, (duration/1000), {
            x: image.transform.translateX,
            y: image.transform.translateY,
            scale: image.transform.scale,
            ease: Power2.easeOut,
            transformOrigin: '50% 50%',
            onStart: () => {
              // Hide original image
              image.referencedSVG.style.display = "none";
              console.log('starting animation');
            },
            onComplete: () => {
              vue.navigate(e);
              // console.log("callback!");
              // console.log(svgTransition.innerHTML);
              // svgTransition.outerHTML = "";
              // svgTransition = null;
            }
          });
          // TweenLite.to(rect, (duration/1000), {
          //   opacity: 0,
          //   ease: easing
          // })

          anime({
            targets: polygon.el,
            points: [
              { value: polygon.pointsTransformed }
            ],
            easing: 'easeOutCubic',
            duration: duration - 100
          });



        }, 900);
      }

    },
    mounted(){
      this.transitionSVG.width = document.documentElement.clientWidth;
      this.transitionSVG.height = document.documentElement.clientHeight;

      const projects = document.querySelectorAll('.project');
      const controller = new ScrollMagic.Controller();
      const tl = new TimelineLite();

        // let nameScene = new ScrollMagic.Scene({
        //   triggerElement: this.$refs.main,
        //   triggerHook: 0,
        //   duration: .05,
        //   reverse: true
        // })
        // .on('end', () => {
        //   console.log("name scene ended")
        // })
        // .addTo(controller);

        for(let i = 0; i < projects.length; i++){
          let project = projects[i];
          const imageContainer = project.querySelector('.image');
          const image = project.querySelector('.image > svg > image');
          const imageSrc = image.getAttribute('xlink:href');
          const svg = project.querySelector('.image > svg');
          const background = project.querySelector('.background').getAttribute('fill');

          let imageObject = {
            el: image,
            src: imageSrc,
            referencedSVG: svg,
            backgroundColor: background
          };
          this.images.push(imageObject);

          // Convert classnames into array
          const classes = project.className.match(/\S+/g) || [];
          // Set initial values for transforms according to project alignment
          for(let name of classes){
            if(name == 'ltr'){
              tl.set(svg, { x: '100%', opacity: 0 });
              tl.set(image, { x: '100%' });
              tl.set(imageContainer, { scale: 1.4 });
            }
            else if(name == 'rtl'){
              tl.set(svg, { x: '-100%' });
              tl.set(image, { x: '-100%' });
            }
          }


          const projectScene = new ScrollMagic.Scene({
            triggerElement: project,
            triggerHook: .4,
            reverse: false
          })
          .on('start', () => {
            tl.to(imageContainer, 1,
            {
              scale: 1,
              ease: Power2.easeOut
            }, 0)
            .to(svg, 1,
            {
              opacity: 1,
              x: '0%',
              scale: 1,
              ease: Expo.easeOut
            }, 0)
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
        console.log("Images: ");
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
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include small {
          flex-direction: column-reverse;
        }
        @include medium {
          flex-direction: row;
        }
        .text{
          width:34%;
          margin-left:8%;

          h2{
            margin-top: 0;
          }
          p{
            color: #645D54;
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
          overflow: hidden;
          svg{
            position:relative;
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
