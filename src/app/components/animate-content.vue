<template>

  <span class="animate" ref="container">
    <slot></slot>
  </span>

</template>

<script>

  export default {
    /**
    * Props
    * @param {Object}    events            vue instance event bus
    * @param {Object}    config            contains key value pairs for the animation configuration  
    * @param {Number}    config.duration   total animation duration
    * @param {Array}     config.events     array of strings corresponding to the events that will trigger the animation
    * @param {Object}    config.transform  object of transform styles applied before the animation
    * @param {String}    config.display    display style of animated elements
    * @param {Function}  config.callback   callback function triggered after animation
    * @param {Number}    config.delay      animation delay
    * @param {Number}    config.opacity    opacity after animation
    */
    props: ['events', 'config'],
   
    data(){
      return {

      }
    },
    methods:{
      hasEvent: function(eventName){
        if( this.config.events.indexOf(eventName) >= 0 ) return true;
        else return false;
      },
      animateIn: function(){
        let tl = new TimelineLite();
        let contentContainer = this.$refs.container.children[0];
        let content = [].slice.call(contentContainer.children);
        let tweenConfig = {
          opacity: this.opacity,
          y: 0,
          delay: this.delay,
          ease: Power4.easeOut
        }
        if(content.length == 0) content = [contentContainer];
        tl.set(content, { opacity: 0, display: this.config.display, y: this.config.transform.y });
        this.$refs.container.style.opacity = 1;
        content.forEach((el, index) => {
          // console.log(index);
          // console.log(content.length);
          if(index >= content.length-1 && this.config.callback){
            tweenConfig.onComplete = () => {
              this.config.callback();
            }
          }
          tl.add(TweenLite.to(
            el,
            this.config.duration,
            tweenConfig
          ), -this.config.duration);
          this.config.duration *= .8;
        });
      },
    },
    created(){
      if(this.hasEvent('app-loaded')) this.events.$on('app-loaded', this.animateIn);
      if(this.hasEvent('page-transitioned')) this.events.$on('page-transitioned', this.animateIn);
    },
    mounted(){
      this.opacity = this.config.opacity || 1;
      this.delay = this.config.delay || 0;
    },
    beforeDestroy(){
      if(this.hasEvent('app-loaded')) this.events.$off('app-loaded', this.animateIn);
      if(this.hasEvent('page-transitioned')) this.events.$off('page-transitioned', this.animateIn);
    }

  }
</script>

<style lang="scss" scoped>
  // @import '../../style/global.scss';
  span.animate{
    opacity: 0;
    display: block;
  }
</style>
