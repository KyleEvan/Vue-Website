<!--

	HTML

-->
<template>
  <div class="content">
    <!-- <div class="border"></div> -->

      <!-- <div class="template-main" > -->
        <!-- main work info -->
        
        <!-- main work images -->
        <carousel :progressColor="mainColor">
          <slot name="slides"></slot>
        </carousel>
        <!-- <div class="template-aside" >
          <div ref="carouselAside" class="inner-content">
            
            <slot name="asideContent"></slot>
          </div>
        </div> -->
      <!-- </div> -->
      <div class="inner-content">
        <h1 class="template-title">
          <slot name="title"></slot>
        </h1>
        <slot name="main-content"></slot>
      </div>

  </div>
</template>

<!--

	JS

-->
<script>
  // Color Palettes
  import {colors} from '../../colors.js';

  // Components
  import carousel from '../carousel.vue';

	export default{
		props:['project', 'events'],
    data(){
      return{
        tl: new TimelineLite({paused: true}),
        defaultLightColor: colors.templateLightColor,
        defaultMediumColor: colors.templateMedColor,
        defaultMainColor: colors.templateMainColor,
      }
    },
    components:{
      carousel: carousel
    },
    computed:{
      mainColor: function(){
        return this.$props.project ? this.$props.project.mainColor : this.defaultMainColor;
      },
      mediumColor: function(){
        return this.$props.project ? this.$props.project.mediumColor : this.defaultMediumColor;
      },
      lightColor: function(){
        return this.$props.project ? this.$props.project.lightColor : this.defaultLightColor;
      },
      extraSlotPassed: function(){
        return !!this.$slots['extra'];
      }
    },
    methods:{
      animateContent: function(){
        let dur = this.$props.project ? .6 : 0;
        // const aside = this.$refs.carouselAside;
        // const extra = this.$refs.extraContent;
        let tweenConfig = {
          x: 0,
          y: 0,
          opacity: 1,
          ease: Circ.easeOut
        };
        // TweenLite.to(aside, dur, tweenConfig);
        // if(extra) TweenLite.to(extra, dur+.25, tweenConfig);
      },
      initPage: function(){
        this.animateContent();
      }
    },
    created(){
        this.events.$on('app-loaded', () => {
          this.initPage();
        });
    },
    mounted(){
      this.initPage();
      console.log(this.$props.project);
    }
  }
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../../style/global.scss';



  .template-aside,
  .template-extra{
    color: $mainColorLight;
    background: $mainBg;
    z-index: 2;
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





  // .border{
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 1;
  //   pointer-events: none;

  //   @include lg{
  //     &::before{
  //       content: '';
  //       width: 100%;
  //       height: 100vh;
  //       position: absolute;
  //       top: 0;
  //       left: 0;
  //       box-sizing: border-box;
  //       border-top: solid 5em $mainBg;
  //       border-left: solid 650px $mainBg;
  //       border-bottom: solid 5em $mainBg;
  //     }
  //   }
  // }

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



    .template-extra{
      position: relative;
      padding: 2em;
      margin-top: -$lg-padding;
      opacity: 0;
      transform: translateY(8%);

      @include md {
        margin-top: 0;
      }
      @include lg{
        margin-top: -$main-topBotPad;
        padding: $main-topBotPad;

      }
      &>div {
        @include md{
          margin-top: $main-topBotPad;
        }
      }
    }


</style>
