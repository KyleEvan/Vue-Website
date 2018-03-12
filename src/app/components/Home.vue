<template>
  <div>


    <section class="project">
      <div class="text">
        <h2>Careers Redesign</h2>
        <p>
          Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque.
        </p>
        <router-link @click.native="transitionToProject" to="/work/careers-redesign">View Project</router-link>
        <!-- <a href="#" @click.prevent="transitionToProject">View Project</a> -->
      </div>
      <div class="image">
        <svg>
          <defs>
            <clipPath id="clip">
              <rect class="clipRect" ref="clippedRect" x="0" y="0" width="100%" height="100%"/>
            </clipPath>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#FFA69E" clip-path="url(#clip)" />
          <image ref="img" x="0" y="0" width="100%" height="100%" v-bind:xlink:href='img' clip-path="url(#clip)" />
        </svg>
      </div>
    </section>

    <section class="project">

      <div class="image">
      </div>
      <div class="text">
        <h2>Another Project</h2>
      </div>

    </section>


  </div>
</template>

<script>
  // import Project from './Project.vue';
  import { TimelineLite } from "gsap";
  import ScrollMagic from "scrollmagic";
  import anime from 'animejs';
  import careersPNG from '../../images/career-areas-mobile.png';

  export default {
    name: 'home',
    data () {
      return {
        img: careersPNG
      }
    },
    methods:{
      transitionToProject: function(e){

        // MDN Polyfill for closest()
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
        console.log(this.$root.$el);
        // console.log(svg);
        // console.log(scene);
        this.$root.$el.insertBefore(svg, scene);
        svg.setAttribute("id", "transition");
        svg.setAttribute("width", window.innerWidth);
        svg.setAttribute("height", window.innerHeight);
        svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
        // console.log(e.target);
        let project = e.target.closest('.project');
        let svgTarget = project.querySelector('svg');
        console.log(svgTarget);
        let svgTargetClipRect = project.querySelector('.clipRect');
        let svgTargetBounds = svgTargetClipRect.getBoundingClientRect();
        console.log(svgTarget);
        console.log(svgTargetBounds);
        let transitionSVG = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        transitionSVG.setAttribute('points', `${svgTargetBounds.left} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.top} ${svgTargetBounds.right} ${svgTargetBounds.bottom} ${svgTargetBounds.left} ${svgTargetBounds.bottom}`);
        transitionSVG.setAttribute("fill", "#FFA69E");
        svg.appendChild(transitionSVG);
        svgTarget.style.display = "none";
        console.log(project.querySelector('image'));
        console.log(this.$data);

        // var fontSize = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
        // fontSize = parseFloat(fontSize);
        // let height = 20*fontSize;

        let height = window.innerWidth*.35;

        let finishedSVGPoints = `0 0 ${window.innerWidth} 0 ${window.innerWidth} ${height} 0 ${height}`;
        setTimeout(function(){

          anime({
            targets: transitionSVG,
            points: [
              { value: finishedSVGPoints }
            ],
            easing: 'easeOutQuad',
            duration: 500
          });
        }, 1000);
        // console.log(window.scrollY);



      }
    },
    mounted(){
      // console.log(this.supportsSVGCSSTransforms);
      let rect = this.$refs.clippedRect;
      let image = this.$refs.img;

      const tl = new TimelineLite({ paused:true });
      if(this.supportsSVGCSSTransforms){
        TweenLite.set(image, { transformOrigin:'50% 50%' });
        tl.fromTo(rect, 4, { scaleX: .075}, { scaleX: 1, ease: Circ.easeIn });
        tl.fromTo(rect, 4, { scaleY: .1 }, { scaleY: 1, ease: Circ.easeIn });
        tl.fromTo(image, 2, { opacity: 0, scale: 1.2, ease: Power4.easeOut }, { opacity: 1, scale: 1 });

        const controller = new ScrollMagic.Controller();
        const ourScene = new ScrollMagic.Scene({
          triggerElement: '.project',
          triggerHook: .7,
          duration: '30%',
          reverse: false,
        })
         // .setClassToggle('img', 'in-scene')
         // .setPin('.image')
        // .addIndicators({
        //   name: 'fade scene',
        //   colorTrigger: 'black',
        //   colorStart: '#756C95'
        // })
        .addTo(controller);

        ourScene.on("progress", function (event) {
          // let progress = event.progress
          // tl.progress(progress);
          tl.progress(event.progress);
        });
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
    // height: 80vh; /* ugly IE workaround.. */
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .project .text{
    width:32%;
    margin-left:5rem;
  }
  .project .image > svg{
    position:relative;
    width: 46vw;
    height:34vw;
  }
  rect{
    // transition: transform .3s;
    transition: transform .6s cubic-bezier(.34,.77,.51,1);
    transform-origin: 100% 0%;
  }
  svg#transition{
    position:fixed;
    top: 0;
    left: 0;
    // height: 100%;
    // z-index: -1;
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
