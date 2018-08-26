<template>
  <div>

  <div class="loading">

    <svg class="spinner" viewBox="0 0 50 50">
      <g>
        <circle cx="25" cy="25" r="25" />
      </g>
      <g>
        <polygon points="0 50 25 0 50 50" />
      </g>
      <g>
        <circle cx="25" cy="25" r="25" />
      </g>
      <g>
        <polygon points="0 50 25 0 50 50" />
      </g>
    </svg>

  </div>

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
        for(var i = 0; i < elements.length; i++){
          charming(elements[i], {classPrefix: 'letter'});
        }
      },
      getName: function(){
        const container = this.$refs.home_title;
        const lines = 2;
        let home_title = Array.from(container.querySelectorAll('li'));
        let begin = 0;
        home_title = home_title.slice(begin,lines);
        return home_title;
      }
    },
    mounted(){
      const name = this.getName();
      this.charmWords(name);
    }
  }
</script>

<style lang="scss" scoped>

  .loading{
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    .spinner{
      overflow: unset;
      width: 14%;
      max-width: 100px;
      &>g{
        animation-name: spin;
        &>*{
          transform: translateX(33%) scale(.33);
          fill: #000;
          animation-name: size;
        }
        &:nth-child(1)>*{
          fill: #E3A9AB;
        }
        &:nth-child(2)>*{
          fill: #7CE8CE;
        }
        &:nth-child(3)>*{
          fill: #E8C3B1;
        }
        &:nth-child(4)>*{
          fill: #A2E3E8;
        }
      }
      &>g,
      &>g>*{
        transform-origin: 50% 50%;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(.15,.6,.93,.5);
        animation-iteration-count: infinite;
      }
      &>g:nth-child(1),
      &>g:nth-child(1)>*{
        animation-delay: 0s;
      }
      &>g:nth-child(2),
      &>g:nth-child(2)>*{
        animation-delay: .25s;
      }
      &>g:nth-child(3),
      &>g:nth-child(3)>*{
        animation-delay: .45s;
      }
      &>g:nth-child(4),
      &>g:nth-child(4)>*{
        animation-delay: .75s;
      }
    }
  }

  @keyframes spin{
    0% {
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  @keyframes size{
    0% {
      opacity: 0;
      transform: translateX(40%) scale(0.22);
    }
    20% {
      opacity: 1;
    }
    90% {
      opacity: 1;
      transform: translateX(40%) scale(0.25);
    }
    100% {
      opacity: 0;
      transform: translateX(40%) scale(0.1);
    }
  }









  .home_title{
    display: flex;
    align-items: center;
    width: 50vw;
    height: 200vh;
    position: relative;
    user-select: none;
    padding-top: 100vh;

    ul{
      padding-left: 15%;
      list-style: none;

      li{
        &:nth-child(-n+2){
          font-family: 'Eksell Display';
          font-size: 7vw;
          line-height: 8vw;
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
