<template>
  <div ref="main" class="content">


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
          <rect x="0" y="0" width="100%" height="100%" fill="#FF9A91" />
          <image x="0" y="0" width="100%" height="120%" v-bind:xlink:href='img' />
        </svg>
      </div>
    </section>

    <section class="project" data-align="rtl">
      <div class="image">
        <svg>
          <rect x="0" y="0" width="100%" height="100%" fill="#FF9A91" />
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

  // Images
  import careersPNG from '../../images/career-areas-mobile.png';
  import careersScreensPNG from '../../images/careers_screens.png';

  export default {
    name: 'home',

    data () {
      return {
        bannerHeight: (window.innerWidth*.3),
        img: careersScreensPNG,
        tl: new TimelineLite()

      }
    },

    methods:{

      handleClick: function(e){

        if(e.target.getAttribute("href")) this.$router.push({name: e.target.getAttribute("href"), params: { msg:'ello ello' }});


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

        let imageTarget = svgTarget.querySelector('image');
        let imageTargetBounds = imageTarget.getBoundingClientRect();


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
        rect.setAttributeNS(null, "fill", "#FF9A91");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", window.innerWidth);
        rect.setAttributeNS(null, "height", window.innerHeight);
        rect.setAttributeNS(null, 'clip-path', `url(#${clipPathID})`);
        let g = document.createElementNS(xmlns, 'g');
        g.setAttributeNS(null, 'clip-path', `url(#${clipPathID})`);
        // let image = svgTarget.querySelector('image');
        imageTarget.setAttributeNS(null, 'x', imageTargetBounds.left);
        imageTarget.setAttributeNS(null, 'y', imageTargetBounds.top);
        imageTarget.setAttributeNS(null, 'width', imageTargetBounds.width);
        imageTarget.setAttributeNS(null, 'height', imageTargetBounds.height);

        clipPath.appendChild(polygon);
        defs.appendChild(clipPath);
        g.appendChild(imageTarget);
        fragment.appendChild(defs);
        fragment.appendChild(rect);
        fragment.appendChild(g);
        svgTransition.appendChild(fragment);

        // Hide the original svg image
        svgTarget.style.display = "none";

        // Set the transform origin for the image to the center of the element
        this.tl.set(imageTarget, {transformOrigin: '50% 50%'});
        let imageCenter = imageTarget.getAttribute('data-svg-origin').split(" ").map(Number);


        let polygonTransformed = {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: this.bannerHeight // 35vw essentially
        };

        let polygonTransformedPoints = `${polygonTransformed.x} ${polygonTransformed.y} ${polygonTransformed.width} ${polygonTransformed.y} ${polygonTransformed.width} ${polygonTransformed.height} ${polygonTransformed.x} ${polygonTransformed.height}`;


        let polygonCenterX = polygonTransformed.width/2;
        let polygonCenterY = polygonTransformed.height/2;
        console.log(polygonCenterX);
        console.log(polygonCenterY);
        let translateX = polygonCenterX - imageCenter[0];
        let translateY = polygonCenterY - imageCenter[1];
        console.log(imageCenter[0]);



        let scale = (this.bannerHeight*1.2)/imageTargetBounds.height;

        // console.log("w: "+polygonTransformed.width);
        // console.log("w: "+imageTargetBounds.width);
        //
        // console.log("h: "+polygonTransformed.height);
        // console.log("h: "+imageTargetBounds.height);

        // let scale = ( imageTargetBounds.height/polygonTransformed.height );



        let duration = 800;
        setTimeout(function(){
          let easing =  Power2.easeInOut;

          TweenLite.to(imageTarget, (duration/1000), {
            x: translateX,
            y: translateY,
            scale: scale,
            ease: easing,
            onComplete: () => {
              // console.log("callback!");
              console.log(svgTransition.innerHTML);
              // svgTransition.outerHTML = "";
              svgTransition = null;
            }
          });
          // TweenLite.to(rect, (duration/1000), {
          //   opacity: 0,
          //   ease: easing
          // })

          anime({
            targets: polygon,
            points: [
              { value: polygonTransformedPoints }
            ],
            easing: 'easeInOutCubic',
            duration: duration - 60
          });



        }, 900);
      }

    },
    mounted(){
      let projects = document.querySelectorAll('.project');

      if(this.supportsSVGCSSTransforms){
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
            tl.to(svg, 1.3,
            {
              opacity: 1,
              x: '0%',
              ease: Expo.easeInOut
            })
            .to(image, 1.3,
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
