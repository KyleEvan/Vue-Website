<template>
  <div>


    <section class="project" data-align="rtl">
      <div class="text">
        <h2>Careers Redesign</h2>
        <p>
          Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.
        </p>
        <router-link @click.native="handleClick" to="/work/careers-redesign">View Project</router-link>
      </div>
      <div class="image">
        <svg>
          <rect x="0" y="0" width="100%" height="100%" fill="#FFA69E" />
          <image x="0" y="0" width="100%" height="100%" v-bind:xlink:href='img' />
        </svg>
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

  export default {
    name: 'home',
    data () {
      return {
        img: careersPNG
      }
    },
    methods:{
      handleClick: function(e){

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





        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let scene = document.getElementById("scene");

        this.$root.$el.insertBefore(svg, scene);
        svg.setAttribute("id", "transition");
        svg.setAttribute("width", window.innerWidth);
        svg.setAttribute("height", window.innerHeight);
        svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
        // console.log(e.target);
        let project = e.target.closest('.project');
        let svgTarget = project.querySelector('svg');
        let svgTargetImage = svgTarget.querySelector('image');

        let svgTargetBounds = svgTarget.getBoundingClientRect();
        svgTargetImage.setAttribute('x', svgTargetBounds.x);
        svgTargetImage.setAttribute('y', svgTargetBounds.y);
        svgTargetImage.setAttribute('width', svgTargetBounds.width);
        svgTargetImage.setAttribute('height', svgTargetBounds.height);
        let transitionSVG = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        transitionSVG.setAttribute('points', `${svgTargetBounds.left} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.bottom} ${svgTargetBounds.left} ${svgTargetBounds.bottom}`);
        transitionSVG.setAttribute("fill", "#FFA69E");
        svg.appendChild(transitionSVG);
        svg.appendChild(svgTargetImage);
        svgTarget.style.display = "none";


        let height = window.innerWidth*.35;
        let finishedSVGPoints = `0 0 ${window.innerWidth} 0 ${window.innerWidth} ${height} 0 ${height}`;

        // let imageLoc = svgTargetImage.getAttribute('data-svg-origin').split(" ").map(Number);
        // imageLoc = [(imageLoc[0] + svgTargetBounds.x), (imageLoc[1] + svgTargetBounds.y) ];


        let scale = (height/svgTargetBounds.height);
        let newImageWidth = scale*svgTargetBounds.width;

        let imageLoc = {
          x: svgTargetBounds.x,
          y: svgTargetBounds.y
        }

        let newImageLoc = {
          x: (window.innerWidth/2) - (newImageWidth/2),
          y: 0
        }

        let transform = {
          x: (newImageLoc.x - imageLoc.x),
          y: (newImageLoc.y - imageLoc.y),
          scale: scale
        }
        console.log(transform);

        setTimeout(function(){

          anime.timeline()
          .add({
            targets: transitionSVG,
            points: [
              { value: finishedSVGPoints }
            ],
            easing: 'easeOutQuint',
            duration: 700
          })
          .add({
            targets: svgTargetImage,
            translateX: transform.x,
            translateY: transform.y,
            // scale: transform.scale,
            easing: 'easeOutQuint',
            duration: 700,
            offset: 0
          })

          // TweenLite.to(svgTargetImage, .5,
          // {
          //   x: transform.x,
          //   y: transform.y,
          //   scale: 1,
          //   ease: 'Sine.easeOut'
          // })
          // .add({
          //   targets: svgTargetImage,
          //   translateX: transform.x,
          //   translateY: transform.y,
          //   scale: transform.scale,
          //   easing: 'easeOutQuad',
          //   duration: 500,
          //   offset: 0
          // })

        }, 1000);
      }
    },
    mounted(){

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
            triggerHook: .55,
            reverse: false
          })
          .on('start', () => {
            console.log("starting animation " + i);
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

  .project a{
    display: inline-block;
    padding: 1rem;
    background: #FFA69E;
    color: $primary-white;
    border-radius: 3px;
    font-weight: 600;
    letter-spacing: .5px;
    text-decoration: none;
  }

  .project{
    position: relative;
    width: 100%;
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text{
      width:34%;
      margin-left:6rem;
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
