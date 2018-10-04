<template>
  <div>



    <div class="home_title" ref="home_title">
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
  import charming from 'charming';

  export default {
    props: ['events'],
    data(){
      return {
        init: false,
        init_delay: .35,
        init_dur: .6,
        charmedName: undefined,
      }
    },
    methods:{
      charmWords: function(elements){
        let charm = [];
        for(var i = 0; i < elements.length; i++){
          charming(elements[i], {classPrefix: 'letter'});
          let letters = [].slice.call(elements[i].childNodes);
          charm = charm.concat(letters);
        }
        return charm;
      },
      getName: function(){
        const container = this.$refs.home_title;
        const lines = 2;
        let title = Array.from(container.querySelectorAll('li'));
        let begin = 0;
        title = title.slice(begin,lines);
        return title;
      },
      animateIn: function(els){
        console.log('animate in');
        let inc = .052;
        for(var i = 0; i < els.length; i++){
          let letter = els[i];
          TweenLite.to(letter, this.init_dur,
          {
            opacity: 1,
            y: '0%',
            ease: Power4.easeOut,
            delay: this.init_delay,
          });
          this.init_dur += inc;
        }
      },
      initTitle: function(){
        this.animateIn(this.charmedName);
        if(!this.init) this.init = true;
      }
    },
    created(){
      let vm = this;
      this.events.$on('app-loaded', () => {
        console.log('init Home_title.vue');
        vm.initTitle();
      });
    },
    mounted(){
      this.charmedName = this.charmWords(this.getName());
      if(!this.init) this.initTitle();
    }
  }
</script>

<style lang="scss">
  @import '../../../style/global.scss';

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
          font-family: 'Eksell Display';
          font-size: 7vw;
          line-height: 8vw;
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
          border-bottom: 3px solid #423A2F;
        }
        &:nth-child(n+3){
          line-height: 3vw;
          font-weight: 700;
        }

      }
    }
  }


</style>
