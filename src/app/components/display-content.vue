<template>

  <div ref="container">
    <slot></slot>
  </div>

</template>

<script>

  export default {
    props: ['events', 'config'],
    /*

      config = {
        increment: Decimal,
        duration: Decimal,
        delay: Decimal,
        eventName: string
      }

    */
    data(){
      return {
        mainContent: [],
      }
    },
    methods:{
      animateIn: function(targets, increment, duration, delay, eventName){
        let tweenConfig, dur, inc, del;
        dur = duration || .6;
        inc = increment || 0.1;
        del = delay || .3;
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
          let displayComponent = this;
          let el = targets[i];
          let config;
          // if last iteration & there's an event firing
          if(i>=(targets.length-1) && eventName) {
              let completeHandler = {
                onComplete: () => {
                  displayComponent.events.$emit(eventName);
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
      animateContent: function(){
        this.toggleContainer(this.$refs.container);
        // Animate in header
        this.animateIn(this.charmedName, this.$props.config.increment, this.$props.config.duration, this.$props.config.delay, this.$props.config.eventName);
        // Animate in mainContent
        this.animateIn(this.mainContent, this.$props.config.increment+.25, this.$props.config.duration+.15, this.$props.config.delay + .1, this.$props.config.eventName);
      },
      initTitle: function(){
        let header = Array.from(this.$el.querySelectorAll('.header'));
        if(header[0]) {
          let sibling = header[header.length-1].nextElementSibling;
          while(sibling){
            this.mainContent.push(sibling);
            sibling = sibling.nextElementSibling;
          }
          this.charmedName = this.charmWords(header);
          this.animateContent();
        }
      },

      toggleContainer: function(container){
        let opacity = 0;
        if(container.style.opacity === '0') opacity = 1;
        TweenLite.set(container, {
          opacity: opacity
        });
      },

      initEventListeners: function(){
        this.events.$on('app-loaded', this.initTitle);
        this.events.$on('page-transitioned', this.initTitle);
      },
    },
    created(){
      // Initialize the event listeners for appLoaded and any page transition
      this.initEventListeners();
    },
    mounted(){
      // Initially hide the display content container
      this.toggleContainer(this.$refs.container);
    },
    beforeDestroy(){
      this.events.$off('app-loaded', this.initTitle);
      this.events.$off('page-transitioned', this.initTitle);
    }

  }
</script>

<style lang="scss">
  // @import '../../style/global.scss';




</style>
