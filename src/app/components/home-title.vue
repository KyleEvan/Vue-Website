<template>
  <div>



    <div v-show="active" class="home_title" ref="home_title">
      <ul>
        <li>Kyle</li>
        <li>Peterson</li>
        <li>New Media</li>
        <li>&amp; Interactive</li>
        <li>Developer</li>
      </ul>
    </div>




  </div>
</template>

<script>

  export default {
    props: ['events'],
    data(){
      return {
        init: false,
        init_delay: .3,
        init_duration: .6,
        eventName: 'title-loaded',
        charmedName: undefined,
      }
    },
    computed: {
      el(){
        return this.$refs.home_title;
      },
      active(){
        return this.$route.name === 'Home'? 1 : 0;
      }
    },
    methods:{
      getName: function(){
        const container = this.el;
        const lines = 2;
        let title = Array.from(container.querySelectorAll('li'));
        let begin = 0;
        title = title.slice(begin,lines);
        return title;
      },
      animateIn: function(targets, increment, duration, delay, events, eventName){
        let tweenConfig, dur, inc, del;
        dur = duration || .6;
        inc = increment || 0.52;
        del = delay || 0;
        tweenConfig = {
          opacity: 1,
          x: '0%',
          y: '0%',
          scaleX: 1,
          scaleY: 1,
          ease: Power4.easeOut,
          delay: del
        }
        for(var i = 0; i < targets.length; i++){
          let el = targets[i];
          let config;
          // if last iteration & there's an event firing
          if(i>=(targets.length-1) && events) {
              let completeHandler = {
                onComplete: () => {
                  events.$emit(eventName);
                }
              }
              config = Object.assign(completeHandler, tweenConfig);
          } else {
            config = tweenConfig;
          }
          TweenLite.to(el, dur, config);
          dur += inc;
        }
      },
      animateTitle: function(name){
        const title = document.querySelector('.home_title');
        const subhead = Array.prototype.slice.call(title.querySelectorAll('li:nth-child(n+3)'));
        this.animateIn(name, .052, this.init_duration, this.init_delay);
        this.animateIn(subhead, .1, this.init_duration+.2, this.init_delay, this.events, this.eventName);
      },
      initTitle: function(){
        if(this.active) {
          if(!this.init){
          this.charmedName = this.charmWords(this.getName());
          this.animateTitle(this.charmedName);
          this.init = true;
          console.log(this.init)
          }
          else {
             // console.log(this.el.clientHeight);
             // document.documentElement.scrollTop = this.el.clientHeight;
          }
        }
      }
    },
    created(){
      this.initEventListeners(this.initTitle);
    },
    mounted(){
      // if(this.active) this.charmedName = this.charmWords(this.getName());
      // this.initTitle();
    },

  }
</script>

<style lang="scss">
  @import '../../style/global.scss';

  .home_title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    user-select: none;

    ul{
      padding-left: 0;
      margin: 0;
      list-style: none;

      li{
        &:nth-child(-n+2){
          // font-family: 'Eksell Display';
          font-size: 46px;
          line-height: 55px;
          font-weight: 900;
          @include smmd {
            font-size: 7vw;
            line-height: 8vw;
          }
          @include lg{
            font-size: 5em;
            line-height: 6rem;
          }
          span{
            display: inline-block;
            opacity: 0;
            transform: translateY(60%);
          }
        }
        &:nth-child(2){
          padding-bottom: .4em;
          margin-bottom: .4em;
          border-bottom: 3px solid;
        }
        &:nth-child(n+3){
          font-weight: 700;
          opacity: 0;
          transform: translateY(-60%);

          @include md {
            line-height: 3vw;
          }
        }

      }
    }
  }


</style>
