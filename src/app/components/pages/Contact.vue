<template>
  <div><!-- Main Container -->
    <div class="contact container">
      <div class="content inner-content">
        <display-content :events="events" :config="animationConfig" class="display-container">
          <h1 class="header">Contact</h1>

          <a :href="links.email" class="link-btn">
            kyle.evan.p@gmail.com
          </a>
          <a target="_blank" :href="links.resume" class="link-btn">
            Resume
          </a>
          <a target="_blank" :href="links.github" class="link-btn">
            github.com/KyleEvan
          </a>

        </display-content>
      </div>
    </div>
  </div>
</template>

<script>
  import resume_pdf from '../../../documents/kyle+resume_2019-07-19.pdf';
  import displayContent from '../display-content.vue';

  export default {
    name: 'Contact',
    props: ['events'],

    data () {
      return {
        links: {
          email: 'mailto:kyle.evan.p@gmail.com',
          resume: resume_pdf,
          github: 'https://github.com/KyleEvan',
        }
      }
    },
    components: {
      'display-content': displayContent,
    },
    computed: {
      animationConfig: function(){
        return {
          increment: 0.052,
          duration: .4,
          delay: .3,
          eventName: undefined,
        }
      },

    },
    // mounted(){
    // }

  }
</script>
<style lang="scss">
@import '../../../style/global.scss';

.contact{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  
  .content{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;
    .display-container{
      padding: $main-topBotPad 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include smmd {
        flex-direction: row;
        flex-flow: wrap;
        align-items: center;
        justify-content: center;
      }
      h1{
        font-family: 'InterUI', sans-serif;
        font-weight: 700;
        font-size: 1.5em;
        line-height: 1;
        text-align: center;
        width: 100%;
        span{
          display: inline-block;
          opacity: 0;
          transform: translateY(60%);
        }
      }
      a.link-btn{
        opacity: 0;
        transform: translateY(20px);
        margin-top: 1em;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
}

</style>
