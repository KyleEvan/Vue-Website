<template>
  <div>

    <div class="container">
      <div class="content">
        <section class="project" data-align="ltr" data-color="red">
          <div class="text">
            <h2>Careers Redesign</h2>
            <p>
              Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.
            </p>
            <a href="Careers-Redesign" @click.prevent="handleClick">View Project</a>
          </div>
          <div class="image">
            <svg>
              <rect class="background" x="0" y="0" width="100%" height="100%" :fill="projectColors[0]" />
              <image x="0" y="0" width="100%" height="115%" v-bind:xlink:href='img' />
            </svg>
          </div>
        </section>

        <section class="project" data-align="rtl">
          <div class="image">
            <svg>
              <rect class="background" x="0" y="0" width="100%" height="100%" :fill="projectColors[0]" />
              <image x="0" y="0" width="100%" height="100%" v-bind:xlink:href='img' />
            </svg>
          </div>
          <div class="text">
            <h2>Careers Redesign</h2>
            <p>
              Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.
            </p>
            <a href="#" @click.prevent="handleClick">View Project</a>
          </div>
        </section>
      </div>
    </div>


    <!-- <svg id="transitionLayer" ref="transitionSVG" width="{{ transitionSVG.width }}" height="{{ transitionSVG.height }}" viewBox="{{ transitionSVG.x transitionSVG.y transitionSVG.width transitionSVG.height }}"> -->
    <svg id="transitionLayer" ref="transitionSVG" :width="transitionSVG.width" :height="transitionSVG.height" :viewBox="viewbox">
      <defs>
        <clipPath id="polyClip">
          <polygon :points="transitionSVG.polygon.points"></polygon>
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
  import { TimelineLite } from "gsap";
  import ScrollMagic from "scrollmagic";
  import anime from 'animejs';

  // Images
  import careersPNG from '../../images/career-areas-mobile.png';
  import careersScreensPNG from '../../images/careers_screens.png';

  export default {
    name: 'home',

    data () {
      return {
        projectColors: ['#FF9A91'],
        bannerHeight: (window.innerWidth*.3),
        images: [],
        img: careersScreensPNG,
        tl: new TimelineLite(),

        transitioning: false,
        transitionSVG: {
          x: 0,
          y: 0,
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          polygon: {
            points: '0 0 0 0 0 0 0 0'
          },
          image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            src: '',
            backgroundColor: 'fff',
            transform: {
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
        console.log(this.$router);
        if(e.target.getAttribute("href")) this.$router.push({name: e.target.getAttribute("href"), params: { msg:'ello ello' }});
      },

      assignAttributes: function(el){

        // reference activated project image
        let activeProject = el.closest('.project');
        let activeImage = activeProject.querySelector('image');

        // Filter images array to get image object
        let matchedImage = this.images.filter((image) => {
            return image.el === activeImage;
        })[0];

        this.transitionSVG.image = Object.assign({}, this.transitionSVG.image, matchedImage);

        this.transitionSVG.el = this.$refs.transitionSVG;
        this.transitionSVG.image.el = this.$refs.transitionImage;

        let containerClientRect = this.transitionSVG.image.referencedSVG.getBoundingClientRect();
        this.transitionSVG.image.container = containerClientRect;
        console.log(containerClientRect);

        let imageClientRect = matchedImage.el.getBoundingClientRect();
        this.transitionSVG.image.x = imageClientRect.left;
        this.transitionSVG.image.y = imageClientRect.top;
        console.log(imageClientRect);

      },

      handleClick: function(e){
        console.log(this.transitionSVG);



        this.assignAttributes(e.target);

        // this.tl.set(this.transitionSVG.image.el, {transformOrigin: '50% 50%'});
        // const transitionImageCenter = this.transitionSVG.image.el.getAttribute('data-svg-origin').split(" ").map(Number);
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


        this.transitionSVG.polygon.el = this.transitionSVG.el.querySelector('polygon');

        const polygon = this.transitionSVG.image.container;
        this.transitionSVG.polygon.points = `${polygon.left} ${polygon.top} ${polygon.right} ${polygon.top} ${polygon.right} ${polygon.bottom} ${polygon.left} ${polygon.bottom}`;

        const polygonTransformedPoints = `${this.transitionSVG.x} ${this.transitionSVG.y} ${this.transitionSVG.width} ${this.transitionSVG.y} ${this.transitionSVG.width} ${this.bannerHeight} ${this.transitionSVG.x} ${this.bannerHeight}`;

        // Hide referenced image
        this.transitionSVG.image.referencedSVG.style.display = "none";








        const duration = 800; // temporary
        const transitionSVG = this.transitionSVG;
        const vue = this;
        setTimeout(() => {
          let image = transitionSVG.image;
          let polygon = transitionSVG.polygon
          TweenLite.to(image.el, (duration/1000), {
            x: image.transform.translateX,
            y: image.transform.translateY,
            scale: image.transform.scale,
            ease: Power2.easeOut,
            transformOrigin: '50% 50%',
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
              { value: polygonTransformedPoints }
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

      let projects = document.querySelectorAll('.project');

      // if(this.supportsSVGCSSTransforms){
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
          let alignment = project.getAttribute('data-align');
          let container = project.querySelector('.image');
          let svg = project.querySelector('.image > svg');
          let svgBounds = svg.getBoundingClientRect();
          let background = project.querySelector('.background').getAttribute('fill');
          let image = project.querySelector('.image > svg > image');
          let imageSrc = image.getAttribute('xlink:href');
          let imageBounds = image.getBoundingClientRect();

          let imageObject = {
            el: image,
            width: imageBounds.width,
            height: imageBounds.height,
            // clientRect: imageBounds,
            // containerClientRect: svgBounds,
            referencedSVG: svg,
            src: imageSrc,
            backgroundColor: background
          };
          this.images.push(imageObject);


          // if(svg || image){
          //   tl.set([svg, image], { opacity: 0 });
          // }
          // else{
          //   console.log("Project has no svg or image");
          // }

          if(alignment == 'ltr'){
            tl.set(container, { scale: 1.8 });
            tl.set(svg, { x: '100%', opacity: 0 });
            tl.set(image, { x: '100%' });
          }
          else if(alignment == 'rtl'){
            tl.set(svg, { x: '-100%' });
            tl.set(image, { x: '-100%' });
          }
          else{
            console.log("Project has no alignment");
          }


          let projectScene = new ScrollMagic.Scene({
            triggerElement: project,
            triggerHook: .4,
            reverse: false
          })
          .on('start', () => {
            tl.to(container, 1,
            {
              scale: 1,
              // opacity: 1,
              ease: Power2.easeOut
            }, 0)
            .to(svg, .9,
            {
              opacity: 1,
              x: '0%',
              scale: 1,
              ease: Expo.easeOut
            }, 0)
            .to(image, .9,
            {
              // opacity: 1,
              x: '0%',
              ease: Circ.easeOut
            }, 0)
          })
          .addTo(controller);
        }

        // ourScene.on("progress", function (event) {
          // let progress = event.progress
          // tl.progress(progress);
          // tl.progress(event.progress);
        // });
      // }
      // else{
      //   console.log("doesn't support svg transformations, no animation")
      // }
      if(this.$data.devmode){
        console.log("********************");
        console.log("Images: ");
        console.log(this.images);
        console.log("********************");

      }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  .content{
    padding: 100vh 8% 3em 8%;
  }

  .project a{
    display: inline-block;
    padding: 1rem;
    border-radius: 3px;
    font-weight: 600;
    letter-spacing: .5px;
    text-decoration: none;
  }

  .text p{
    color: #645D54;
  }

  .project[data-color="red"] a{
    background: #FF9A91;
    color: #F9FFF9;
  }


  .project[data-align="ltr"]{
    position: relative;
    width: 100%;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text{
      width:34%;
      margin-left:8%;
    }

    .image{
      display: flex;
      overflow: hidden;

      svg{
        position:relative;
        width: 42vw;
        height: 25.2vw;


      }
    }
  }

  .project[data-align="rtl"]{
    .text{
      width: 34%;
      margin-right: 8%;
    }
    .image{
      display: flex;
      overflow: hidden;

      svg{
        position:relative;
        width: 42vw;
        height: 31vw;
      }
    }
  }
  svg#transitionLayer{
    position:fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
  svg#transition{
    // width: 100%;
    // height:100vh;
    position:fixed;
    top: 0;
    left: 0;
  }
  // .project .text button{
  //   background: #FF9393;
  //   outline: none;
  //   border: none;
  //   padding: 15px;
  //   border-radius: 4px;
  //   color:inherit;
  //   font-weight: 600;
  //   font-size: 18px;
  //   cursor:pointer;
  // }
</style>
