<template>
  <div><!-- Main Container -->
    <div class="about container">
      <div class="content inner-content">
        <display-content :events="events" :config="animationConfig" class="display-container">


            <h1 class="header">About</h1>
            <div class="me">
              <img :src="portrait_image" alt="picture of me with my diploma"/>
            </div>
            <div class="bio">
              <p>
                Currently based in Rochester, New York I'm an aspiring creative developer. Graduated from RIT with a bachelors of science in  New Media &amp; Interactive Development. I enjoy the challenge of developing beautiful front end solutions for the web, turning designs into interactions. I'm interested in learning more about 3D computer graphics, bleeding edge web technologies, UX and interaction design for media.
              </p>
            </div>



        </display-content>
      </div>
    </div>
  </div>
</template>

<script>
  import displayContent from '../display-content.vue';
  export default {
    name: 'About',
    props: ['events', 'images'],

    data(){
      return {
      }
    },
    components: {
      'display-content': displayContent,
    },
    computed: {
      animationConfig: function(){
        return {
          increment: 0.1,
          duration: .4,
          delay: .3,
          eventName: undefined
        }
      },
      portrait_image: function(){
        return this.$props.images.all.portrait.xs;
      }
    },
  }
</script>

<style lang="scss">
@import '../../../style/global.scss';

.about{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 5em 0;
  .content{
    width: 100%;
    height: auto;
    // min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: wrap;

  .display-container{
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    // padding: $main-topBotPad 0;

    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 1.5em;
      line-height: 1;
      margin-top: 0;
      span{
        display: inline-block;
        opacity: 0;
        transform: translateY(60%);
      }
    }
    div.me{
      border-radius: 100%;
      opacity: 0;
      transform: translateY(20px);
      margin: 1em 0;
      width: 9em;
      height: 9em;
      max-width: 50vw;
      max-height: 50vw;
      overflow: hidden;
      display: flex;
      align-items: flex-start;

      img{
        width: 100%;
        height: auto;
        max-width: 260px;
        // @include smmd {
        //   width: auto;
        //   // align-self: flex-start;
        // }
      }
    }
    div.bio{
      position: relative;
      opacity: 0;
      transform: translateY(20px);
      width: 90%;
      // &>div{
      //   width: 100%;
      //   margin-bottom: $main-topBotPad;
      //   // width: 50%;
      // }
      @include smmd {
        width: 50%;
        text-indent: 2em;
        &>div{
          margin-bottom: 0;
          padding-right: $main-topBotPad;
        }
      }
    }


   }
  }
}
</style>
