<template>



    <div class="code-sample" ref="code_sample">

        <a :id="`tab-${index}`" :aria-controls="`file-${index}-${fileType(file)}`" v-for="(file, index) in files" role="tab" class="tab-button" :href="`#file-${index}-${fileType(file)}`">{{fileType(file)}}</a>
        <div class="code-view">
          <div :id="`file-${index}-${fileType(file)}`" :aria-labelledby="`tab-${index}`" v-for="(file, index) in files"  :class="`file ${fileType(file)}`">
            <pre>
              <ol class="line-numbers">{{numbers()}}</ol>
              <code v-html="file[fileType(file)]"></code>
            </pre>
          </div>
        </div>

    </div>






</template>

<script>

  export default {
    props: ['samples'],
    data(){
      return {
        activeTab: 0,
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
      },
      fileType: function(file){
        return Object.keys(file)[0];
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
      position: relative;
      width: 100%;
      height: 300px;
      overflow: scroll;
      border: 1px solid rgba(66, 58, 47, 0.35);
      background: #F5F6F4;

    }
    .file{
      position: absolute;
      top: 0;
      left: 0;
      padding: 2em 2em 0 0;
      .tab-button{

      }
      pre{
        margin: 0;
        color: rgba(66, 58, 47, 0.5);
        font-size: .8em;
        line-height: 1.65;
      }
    }
  }



</style>
