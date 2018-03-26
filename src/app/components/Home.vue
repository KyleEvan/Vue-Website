<template>
  <div class="home">


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
          <rect x="0" y="0" width="100%" height="100%" fill="#FFA69E" />
          <image x="0" y="0" width="100%" height="100%" v-bind:xlink:href='img' />
        </svg>
      </div>
    </section>

    <section class="project" data-align="rtl">
      <div class="image">
        <svg>
          <rect x="0" y="0" width="100%" height="100%" fill="#FFA69E" />
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
    <!-- <section class="project">

      <div class="image">
        <svg class="project-image">

        </svg>
      </div>
      <div class="text">
        <h2>Another Project</h2>
      </div>

    </section> -->


  </div>
</template>

<script>
  import { TimelineLite } from "gsap";
  import ScrollMagic from "scrollmagic";
  import anime from 'animejs';
  import BezierEasing from 'bezier-easing';

  // Images
  import careersPNG from '../../images/career-areas-mobile.png';

  export default {
    name: 'home',
    data () {
      return {
        img: careersPNG
      }
    },
    methods:{
      handleClick: function(e){


        // let body = document.body;





        // if(e.target.getAttribute("href")) this.$router.push({name: e.target.getAttribute("href"), params: { msg:'ello ello' }});


        // MDN Polyfill for closest() to support IE 11
        if (window.Element && !Element.prototype.closest) {
          Element.prototype.closest =
          function(s) {
              var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                  i,
                  el = this;
              do {
                  i = matches.length;
                  while (--i >= 0 && matches.item(i) !== el) {};
              } while ((i < 0) && (el = el.parentElement));
              return el;
          };
        }




        const xmlns = "http://www.w3.org/2000/svg";

        let svgTransition = document.createElementNS(xmlns, "svg");
        let scene = document.getElementById("scene");
        this.$root.$el.insertBefore(svgTransition, scene);


        svgTransition.setAttribute("id", "transition");
        svgTransition.setAttribute("width", window.innerWidth);
        svgTransition.setAttribute("height", window.innerHeight);
        svgTransition.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);


        // Get the currently selected project,
        // capture reference to its accompanying svg image,
        // and get the client rect bounds of the svg image
        let project = e.target.closest('.project');
        let svgTarget = project.querySelector('svg');
        let svgTargetBounds = svgTarget.getBoundingClientRect();


        // Create Transition SVG DOM structure and then append to svg#transition
        let fragment = document.createDocumentFragment();
        let defs = document.createElementNS (xmlns, "defs");
        let clipPath = document.createElementNS (xmlns, "clipPath");
        // clipPath.setAttributeNS(null, 'clipPathUnits', 'userSpaceOnUse');
        let clipPathID = 'polyClip';
        clipPath.setAttributeNS(null, 'id', clipPathID);
        let polygon = document.createElementNS(xmlns, 'polygon');
        polygon.setAttributeNS(null, 'points', `${svgTargetBounds.left} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.bottom} ${svgTargetBounds.left} ${svgTargetBounds.bottom}`);
        let rect = document.createElementNS(xmlns, 'rect');
        rect.setAttributeNS(null, "fill", "#FFA69E");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", window.innerWidth);
        rect.setAttributeNS(null, "height", window.innerHeight);
        rect.setAttributeNS(null, 'clip-path', `url(#${clipPathID})`);
        let g = document.createElementNS(xmlns, 'g');
        g.setAttributeNS(null, 'clip-path', `url(#${clipPathID})`);
        let image = svgTarget.querySelector('image');
        image.setAttributeNS(null, 'x', svgTargetBounds.left);
        image.setAttributeNS(null, 'y', svgTargetBounds.top);
        image.setAttributeNS(null, 'width', svgTargetBounds.width);
        image.setAttributeNS(null, 'height', svgTargetBounds.height);
        console.log(svgTargetBounds);
        console.log(image);

        clipPath.appendChild(polygon);
        defs.appendChild(clipPath);
        g.appendChild(image);
        fragment.appendChild(defs);
        fragment.appendChild(rect);
        fragment.appendChild(g);
        svgTransition.appendChild(fragment);

        // Hide the original svg image
        svgTarget.style.display = "none";

        // Set the transform origin for the image to the center of the element
        this.tl.set(image, {transformOrigin: '50% 50%'});
        let imageCenter = image.getAttribute('data-svg-origin').split(" ").map(Number);


        let polygonTransformed = {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerWidth*.35// 35vw essentially
        }

        let polygonTransformedPoints = `${polygonTransformed.x} ${polygonTransformed.y} ${polygonTransformed.width} ${polygonTransformed.y} ${polygonTransformed.width} ${polygonTransformed.height} ${polygonTransformed.x} ${polygonTransformed.height}`;


        let polygonCenterX = polygonTransformed.width/2;
        let polygonCenterY = polygonTransformed.height/2;
        let translateX = polygonCenterX - imageCenter[0];
        let translateY = polygonCenterY - imageCenter[1];
        let scale = (polygonTransformed.height/svgTargetBounds.height);

        // this.navigateToCareers();
        // let callback = this.navigateToCareers;

        let duration = 500;
        setTimeout(function(){
          let easing =  Power1.easeOut;

          TweenLite.to(image, (duration/1000), {
            x: translateX,
            y: translateY,
            scale: scale,
            ease: easing,
            onComplete: () => {
              // console.log("callback!");
              // callback();
              console.log(svgTransition.innerHTML);
              // svgTransition.outerHTML = "";
              // svgTransition = null;
            }
          });

          anime({
            targets: polygon,
            points: [
              { value: polygonTransformedPoints }
            ],
            easing: 'easeOutQuad',
            duration: duration
          });



        }, 700);
      }

    },
    mounted(){
      this.tl = new TimelineLite();
      let projects = document.querySelectorAll('.project');

      if(this.supportsSVGCSSTransforms){
        const controller = new ScrollMagic.Controller();
        const tl = new TimelineLite();
        for(let i = 0; i < projects.length; i++){
          let project = projects[i];
          let alignment = project.getAttribute('data-align');
          let svg = project.querySelector('.image > svg');
          let image = project.querySelector('.image > svg > image');

          if(svg || image){
            tl.set([svg, image], { opacity: 0 });
          }
          else{
            console.log("Project has no svg or image");
          }

          if(alignment == 'ltr'){
            tl.set(svg, { x: '100%' });
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
            tl.to(svg, 1,
            {
              opacity: 1,
              x: '0%',
              ease: Expo.easeInOut
            })
            .to(image, 1,
            {
              opacity: 1,
              x: '0%',
              ease: Circ.easeInOut
            }, 0)
          })
          .addTo(controller);
        }

        // ourScene.on("progress", function (event) {
          // let progress = event.progress
          // tl.progress(progress);
          // tl.progress(event.progress);
        // });
      }
      else{
        console.log("doesn't support svg transformations, no animation")
      }
    }
  }

</script>

<style lang="scss">
  @import '../../style/global.scss';
  .home{
    padding: 100vh 8% 3em 8% !important;
  }
  .project a{
    display: inline-block;
    padding: 1rem;
    border-radius: 3px;
    font-weight: 600;
    letter-spacing: .5px;
    text-decoration: none;
  }

  .project[data-color="red"] a{
    background: #FFA69E;
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
        height: 31vw;
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

  svg#transition{
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
