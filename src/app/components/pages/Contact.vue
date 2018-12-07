<template>
  <div><!-- Main Container -->
    <div class="contact container">
      <div class="content inner-content">
        <display-content :events="events" :config="animationConfig" class="display-container">
          <h1 class="header">Contact</h1>
          <section class="info">
            <p>
              Feel free to reach out by email.
            </p>
            <ul>
                <li>
                  <a href="mailto:kyle.evan.p@gmail.com" class="link-btn">
                    kyle.evan.p@gmail.com
                  </a>
                </li>
            </ul>
          </section>
          <section class="info">
            <h2>Professional Resources</h2>
            <ul>
              <li>
                <a target="_blank" href="#" class="link-btn" type="button" disabled>
                  Letter of Reference
                </a>
                <a target="_blank" :href="resume" class="link-btn">
                  Resume
                </a>
              </li>
            </ul>
          </section>
          <section class="info">
            <h2>GitHub</h2>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/KyleEvan" class="link-btn">
                  github.com/KyleEvan
                </a>
              </li>
            </ul>
          </section>

        </display-content>
      </div>
    </div>
  </div>
</template>

<script>
  import resume_pdf from '../../../documents/kyle+resume_11-29-18.pdf';
  import displayContent from '../display-content.vue';

  export default {
    name: 'Contact',
    props: ['events'],

    data () {
      return {

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
          eventName: undefined
        }
      },
      resume: function(){
        return resume_pdf;
      }
    },

  }
</script>
<style lang="scss">
@import '../../../style/global.scss';

.contact{
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  .display-container{
    padding: $main-topBotPad 0;
    display: flex;
    flex-flow: column;
    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: $sm-header-fontSize;
      line-height: 1;
      span{
        display: inline-block;
        opacity: 0;
        transform: translateY(60%);
      }
    }
    section.info{
      opacity: 0;
      transform: translateY(20px);
      margin-top: 1em;
      h2{
        font-size: 1.2em;
      }
      ul{
        list-style: none;
        margin: 0;
        padding: 0;
        li{
          line-height: 2;
        }
      }
    }
  }
}

</style>
