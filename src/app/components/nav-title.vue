<template>

  <div id="nav-title">
      <h1 ref="name">
        <charm-word :config="nameConfig">Kyle</charm-word>
        <charm-word :config="nameConfig">Peterson</charm-word>
      </h1>
      <div ref="title">
        <span class="border"></span>
        <h2>
          Front End Developer
        </h2>
      </div>
  </div>

</template>

<script>
  // import displayContent from './display-content.vue';
  import charmWord from './charm-word.vue';
  // import animateContent from './animate-content.vue';

  export default {
    props: ['events'],
    data(){
      return {
        tl: new TimelineLite(),
        nameConfig: {
          opacity: 0,
          y: '50%',
          display: 'inline-block',
        },
        // titleAnimConf: {
        //   display: 'block',
        //   transform: {
        //     y: -10
        //   },
        //   duration: .5,
        //   events: ['app-loaded'],
        //   delay: 1.5,
        //   callback: () => {
        //     this.events.$emit('nav-loaded');
        //     console.log('nav loaded');
        //   }
        // }
      }
    },
    components: {
      // 'display-content': displayContent,
      'charm-word': charmWord,
      // 'animate-in': animateContent,
    },
    // computed: {
    //   animationConfig(){
    //     return {
    //       increment: .095,
    //       duration: .6,
    //       delay: .4,
    //       eventName: 'title-loaded',
    //       once: true,
    //     }
    //   }
    // },
    methods: {
      animateName: function(){
        let tl = new TimelineLite();
        let duration = 0.6;
        let stagger = 0.85;
        let names = Array.from(this.$refs.name.children);
        let letters = [];
        names.forEach((el, index) => {
          letters = letters.concat([].slice.call(el.children));
        });
        letters.forEach((el) => {
          tl.add( TweenLite.to(
            el,
            duration,
            {
              opacity: 1,
              y: 0,
              delay: 1,
              ease: Power4.easeOut
            }
          ), -duration);
          duration *= stagger;
        });
      },
      animateTitle: function(){
        let tl = new TimelineLite();
        let duration = 0.5;
        let stagger = 0.85;
        let title = Array.from(this.$refs.title.children);
        // console.log(title);
        title.forEach((el, index) => {
          let tween = {
            opacity: 1,
            y: 0,
            delay: 1.5,
            ease: Power4.easeOut
          }
          if(index >= (title.length-1)){
            tween.onComplete = () => {
              console.log('title loaded, tween completed')
              // this.events.$emit('title-loaded');
            } 
          }
          tl.add( TweenLite.to(
            el,
            duration,
            tween,
          ), -duration);
          duration *= stagger;
        });
      },
      initTitle: function(){
        this.animateName();
        this.animateTitle();
      }
    },
    created(){
      this.events.$on('app-loaded', this.initTitle);
    },
    beforeDestroy(){
      this.events.$off('app-loaded', this.initTitle);
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../style/global.scss';

  #nav-title{
    // display: flex;
    // align-items: center;
    // width: 100%;
    // height: 75vh;
    pointer-events: none;
    max-height: $main-maxHeight;
    position: relative;
    user-select: none;
    // padding: 1em 0;
      @include sm{
        // padding: 2em 0;
      }
      @include smmd {
        // padding: 3em 0;

        // font-size: 3.75em;
        // line-height: 1.25;
      }
      @include md{
        padding: 0;
      }
    // ul{
    //   padding-left: 0;
    //   margin: 0;
    //   list-style: none;
      
      
      // @include lg{
        // font-size: 4em;
      // }
      h1{
        font-size: 2em;
        line-height: 1.25;
        // &:nth-child(-n+2){
        font-weight: 900;
        margin: 0;
        display: block;
          & > span{
            display: block;
            // opacity: 0;
            // transform: translateY(40%);
            span{
              opacity: 0;
            }
          }
        }
        // &:nth-child(3){
        //   margin-top: .4em;
        //   margin-bottom: .4em;
        //   border-bottom: .1em solid;
        //   transform: scaleY(0);
        //   opacity: 0;
        //   @include smmd {
        //     // border-bottom: 5px solid;

        //   }
        //   @include md {
        //     // border-bottom: 6px solid;

        //   }
        // }
        .border{
          display: block;
          border: .12em solid $black;
          margin-top: .2em;
          margin-bottom: .4em;
          opacity: 0;
          transform: translateY(-30%);
        }
        h2{
          font-weight: 700;
          opacity: 0;
          transform: translateY(-40%);
          margin: 0;
          line-height: 1.25;
          font-size: .9em;
          // line-height: 1.65;
        }
      // }
    // }
  }


</style>
