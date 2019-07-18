<template>
  <div class="project content">
        
    <!-- main project images -->
    <carousel :events="events" :progressColor="mainColor">
      <slot name="slides"></slot>
    </carousel>

    <!-- main project content --> 
    <div id="project-content" class="inner-content">
      <h1 class="template-title">
        <slot name="title"></slot>
      </h1>
      <slot name="main-content"></slot>
    </div>
    
    <svg id="transition-overlay" class="in">
      <rect />
    </svg>

  </div>
</template>


<script>
  import {colors} from '../../colors.js';
  import carousel from '../carousel.vue';

	export default {
		props:['project', 'events'],
    data(){
      return{
        // defaultLightColor: colors.templateLightColor,
        // defaultMediumColor: colors.templateMedColor,
        defaultMainColor: colors.blue,
        defaultDarkColor: colors.darkBlue,
        rect: undefined,
      }
    },
    components:{
      carousel: carousel
    },
    computed:{
      mainColor: function(){
        return this.$props.project ? this.$props.project.mainColor : this.defaultMainColor;
      },
      darkColor: function(){
        return this.$props.project ? this.$props.project.darkColor : this.defaultDarkColor;
      },
      // lightColor: function(){
      //   return this.$props.project ? this.$props.project.lightColor : this.defaultLightColor;
      // },
      // extraSlotPassed: function(){
      //   return !!this.$slots['extra'];
      // }
    },
    methods:{
      animateInProject: function(delay){
        /**
         * Animate out transition overlay
         */
        const tl = new TimelineLite();
        if(this.rect){
          tl.add( TweenLite.to(
            this.rect,
            0.5,
            {
              x: '100%',
              ease: Power2.easeIn,
            }
          ));
        }

        /**
         * Animate in content elements
         */
        let transitionEl;
        let pageElsArray = [].slice.call(document.querySelector('.main.content').children);
        let showPageEls = pageElsArray.filter((el) => {
          if(el.id === 'transition-overlay') transitionEl = el;
          return el.id !== 'transition-overlay';
        });
        let duration = .8;
        let durationFactor = .8;
        showPageEls.forEach((el, index) => {
          tl.add( TweenLite.to(
            el,
            duration,
            {
              y: '0',
              opacity: '1',
              delay: 1.5,
              ease: Expo.EaseOut,
              onComplete: () => {
                if(index >= (showPageEls.length-1)){
                  transitionEl.parentNode.removeChild(transitionEl);
                }
              }
            }
          ), -duration);
          duration *= durationFactor;
        });
      },
      initPage: function(){
        if(this.$props.project) this.rect = this.initSvgOverlay('#transition-overlay.in', this.mainColor, 0); 
        this.animateInProject();
      },
    },
    created(){
      this.events.$on('nav-loaded', this.initPage);
      this.events.$on('page-transitioned', this.initPage);
    },
    beforeDestroy(){
      this.events.$off('nav-loaded', this.initPage);
      this.events.$off('page-transitioned', this.initPage);
      this.css.deleteRule(this.css.cssRules.length-1);
      this.css.deleteRule(this.css.cssRules.length-1);
      // this.css.deleteRule(this.css.cssRules.length-2);
    },
    mounted(){
      let mainContent = document.getElementById('project-content');
      let headings = Array.from(mainContent.querySelectorAll('h1, h2, h3'));
      headings.forEach((el) => {
        el.style.color = this.mainColor;
      });
      this.css = window.document.styleSheets[0];
      this.css.insertRule(`
        body a.link-btn:hover,
        body a.link-btn:focus,
        body a.link-btn:active{
          background-color: ${this.darkColor};
        }
      `, this.css.cssRules.length);
      this.css.insertRule(`
        body a.link-btn{
          border-color: ${this.darkColor};
          color: ${this.darkColor};
        }
      `, this.css.cssRules.length);
      console.log(this.css);
    }
  }
</script>


<style lang="scss" scoped>
  @import '../../../style/global.scss';
  .project.content{
    padding-top: 1em;
  }
  #project-content{
    opacity: 0;
    transform: translateY(5em);
    padding: 1em 0;
  }

  section{
    // padding: 2em 0;

    @include md{
      // padding: 4em 0;
    }
    &.split{
      display: flex;
      flex-flow: column;
      flex-direction: column-reverse;
      align-items: center;
      @include md{
        flex-flow: row;
      }
      &>div:first-child{
          width: 100%;
          padding-top: $lg-padding;
          @include md{
            padding-top: 0;
            padding-right: 5em;
          }
      }
    }
    &.img-center{
      display: flex;
      justify-content: center;
      align-items: center;
      &>img{
        width: auto;
        height: auto;
        max-width: 100%;
        min-width: 100px;
        min-height: 100px;
      }
    }
    div.gif{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      @include md {
        min-width: 50%;
      }
      img{
        width: auto;
        height: auto;
        max-width: 100%;
        min-width: 100px;
        min-height: 100px;
      }
    }
  }
  .links-list{
    list-style: none;
    padding: 0;
    margin: 0;

    li{
      // margin-bottom: $lg-padding;
      // padding-top: 1em;
      &:last-child{
        border-bottom: none;
      }
    }
  }



    .template-main{
      display: flex;
      flex-direction: column-reverse;

      @include md{
        // flex-direction: row;

      }
      @include lg{
        padding: $main-topBotPad 0;
      }

      .template-aside{
        position: relative;
        width: 100%;
        height: auto;

        @include md{
          display: flex;
          align-items: flex-start;
        }
        // @include lg{
          // align-items: flex-start;
        // }

        &>div{
          opacity: 0;
          transform: translateY(8%);
          @include md {
            transform: translateX(-8%);
          }
        }


        @include md{
          // width: 50%;
          // height: 100vh;
        }
        @include lg{
          // height: $main-height;
          // max-height: $main-maxHeight;
        }
        .template-title{
          font-size: 2em;
          line-height: 1.5;
          margin-top: 2em;
          margin-bottom: 0;
          @include smmd{
            font-size: 2.5em;
          }
          @include md{
            // line-height: 1.5;
            // margin-top: $lg-padding;
            // margin-top: 0;

          }
          @include lg{
            margin-top: 0;
            line-height: 1;

          }
        }


      }
    }


</style>
