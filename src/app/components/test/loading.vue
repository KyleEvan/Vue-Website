<template>

  <div class="loading">
    <div class="spinner">
      <span>
        <span class="polygon"></span>
      </span>
      <span>
        <span class="polygon"></span>
      </span>
      <span>
        <span class="polygon"></span>
      </span>
      <span>
        <span class="polygon"></span>
      </span>
    </div>
  </div>

</template>

<script>

  export default {
    data(){
      return {

      }
    },
    methods:{

    },
    mounted(){

    }
  }

</script>

<style lang="scss" scoped>
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
    transform: translateX(25%) scale(0.22);
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: translateX(25%) scale(0.25);
  }
  100% {
    opacity: 0;
    transform: translateX(25%) scale(0.1);
  }
}

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
      // width: 14%;
      width: 8vw;
      height: 8vw;
      max-width: 100px;
      &>span{
        position: absolute;
        display: inline-block;
        animation-name: spin;
        &>span{
          width: 12vw;
          height: 12vw;
          // max-width: 100px;
          // max-height: 100px;
          display: inline-block;
          transform: translateX(33%) scale(.33);
          animation-name: size;
          transform-origin: 50% 50%;
          animation-duration: 2s;
          animation-timing-function: cubic-bezier(.15,.6,.93,.5);
          animation-iteration-count: infinite;
          background-color: transparent;
          opacity: 0;
        }
        &>span.circle{
          border-radius: 100%;
        }
        &>span.polygon{
          width: 0;
          height: 0;
          border-left: 4vw solid transparent;
          border-right: 4vw solid transparent;
          border-bottom: 8vw solid transparent;
        }
        &:nth-child(1)>span.circle{
          background-color: #E3A9AB;
        }
        &:nth-child(1)>span.polygon{
          border-bottom-color: #E3A9AB;
        }
        &:nth-child(2)>span.circle{
          background-color: #7CE8CE;
        }
        &:nth-child(2)>span.polygon{
          border-bottom-color: #7CE8CE;
        }
        &:nth-child(3)>span.circle{
          background-color: #E8C3B1;
        }
        &:nth-child(3)>span.polygon{
          border-bottom-color: #E8C3B1;
        }
        &:nth-child(4)>span.circle{
          background-color: #A2E3E8;
        }
        &:nth-child(4)>span.polygon{
          border-bottom-color: #A2E3E8;
        }
      }
      &>span,
      &>span>span{
        transform-origin: 50% 50%;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(.15,.6,.93,.5);
        animation-iteration-count: infinite;
      }
      &>span:nth-child(1),
      &>span:nth-child(1)>span{
        animation-delay: 0s;
      }
      &>span:nth-child(2),
      &>span:nth-child(2)>span{
        animation-delay: .25s;
      }
      &>span:nth-child(3),
      &>span:nth-child(3)>span{
        animation-delay: .45s;
      }
      &>span:nth-child(4),
      &>span:nth-child(4)>span{
        animation-delay: .75s;
      }

      // Implementation with all svg's
      // &>g{
      //   animation-name: spin;
      //   &>*{
      //     transform: translateX(33%) scale(.33);
      //     fill: #000;
      //     animation-name: size;
      //   }
      //   &:nth-child(1)>*{
      //     fill: #E3A9AB;
      //   }
      //   &:nth-child(2)>*{
      //     fill: #7CE8CE;
      //   }
      //   &:nth-child(3)>*{
      //     fill: #E8C3B1;
      //   }
      //   &:nth-child(4)>*{
      //     fill: #A2E3E8;
      //   }
      // }
      // &>g,
      // &>g>*{
      //   transform-origin: 50% 50%;
      //   animation-duration: 2s;
      //   animation-timing-function: cubic-bezier(.15,.6,.93,.5);
      //   animation-iteration-count: infinite;
      // }
      // &>g:nth-child(1),
      // &>g:nth-child(1)>*{
      //   animation-delay: 0s;
      // }
      // &>g:nth-child(2),
      // &>g:nth-child(2)>*{
      //   animation-delay: .25s;
      // }
      // &>g:nth-child(3),
      // &>g:nth-child(3)>*{
      //   animation-delay: .45s;
      // }
      // &>g:nth-child(4),
      // &>g:nth-child(4)>*{
      //   animation-delay: .75s;
      // }
    }
  }





</style>
