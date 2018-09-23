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
    data(){
      return {

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
        let home_title = Array.from(container.querySelectorAll('li'));
        let begin = 0;
        home_title = home_title.slice(begin,lines);
        return home_title;
      },
      animateIn: function(els){
        let dur = 1;
        let inc = .052;
        for(var i = 0; i < els.length; i++){
          let letter = els[i];
          TweenLite.to(letter, dur,
          {
            opacity: 1,
            y: '0%',
            ease: Power4.easeOut
          });
          dur += inc;
        }
      }
    },
    mounted(){
      let name = this.getName();
      let charmedName = this.charmWords(name);
      let home = this;
      setTimeout(()=>{
        home.animateIn(charmedName);
      }, 500)
    }
  }
</script>

<style lang="scss">


  .home_title{
    display: flex;
    align-items: center;
    width: 50vw;
    height: 100vh;
    position: relative;
    user-select: none;

    ul{
      padding-left: 15%;
      list-style: none;

      li{
        &:nth-child(-n+2){
          font-family: 'Eksell Display';
          font-size: 7vw;
          line-height: 8vw;
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
