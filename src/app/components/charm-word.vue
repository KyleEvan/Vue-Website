<template>

  <span ref="word">
    <slot />
  </span>

</template>

<script>
  import charming from 'charming';
  
  export default {
    props: ['config'],
    data(){
      return {
        
      }
    },
    methods:{
      /**
       * Wraps the each letter of a word or phrase with span elements
       * returns created spans in an array
       */ 
      charmWords: function(){
        let word = this.$refs.word;
        charming(word, {classPrefix: 'letter'});
        let letters = [].slice.call(word.childNodes);
        for(let i = 0; i < letters.length; i++){
          console.log(letters[i]);
          if(this.config){
            if(this.config.hasOwnProperty('opacity')) letters[i].style.opacity = this.config.opacity;
            if(this.config.hasOwnProperty('display')) letters[i].style.display = this.config.display;
            if(this.config.hasOwnProperty('y')) letters[i].style.transform = `translateY(${this.config.y})`;
          }
        }
      },
    },
    mounted(){
      this.charmWords();
      console.log('word charmed!');
    }
    
  }

</script>
<style lang="scss" scoped>
  
</style>