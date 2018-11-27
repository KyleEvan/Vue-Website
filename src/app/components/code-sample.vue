<template>



    <div class="code-sample" ref="code_sample">

        <a role="button" href=".html">HTML</a>
        <a role="button" href=".css">CSS</a>
        <a role="button" href=".js">JavaScript</a>
        <div class="code-view">
          <div v-for="(file, index) in files" class="file">
            <div class="numbers">{{numbers()}}</div>
            <pre>
              <code :class="" v-html="file[Object.keys(file)[0]]"></code>
            </pre>
            <!-- <slot name="html"></slot> -->
            <!-- <pre class="html" v-html="calendarApp_sample[0].html"></pre> -->
          </div>



      <!-- <div class="file">
        <slot name="css"></slot>
      </div>
      <div class="file">
        <slot name="js"></slot>
      </div> -->
    </div>
  </div>






</template>

<script>

  export default {
    props: ['samples'],
    data(){
      return {
        // files: undefined,
      }
    },
    computed: {
      files: function(){
        return this.$props.samples;
      }
    },
    methods:{
      numbers: function(){
        console.log(this.files);
        console.log(this);
        return 1;
      }
    },
    created(){

    },
    mounted(){

    },

  }
</script>

<style lang="scss">
  .code-sample{

    .code-view{
      width: 100%;

      border: 1px solid rgba(66, 58, 47, 0.35);
      background: #F5F6F4;

    }
    .file{
      max-height: 300px;
      padding: 2em 2em 0 0;
      overflow: scroll;
      pre{
        margin: 0;
        color: rgba(66, 58, 47, 0.5);
        font-size: .8em;
        line-height: 1.65;
      }
    }
  }



</style>
