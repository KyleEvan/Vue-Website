<!--

	HTML

-->
<template>
  <div class="work">
    <div>
      <h2>{{ title }}</h2>
      <slot></slot>
      <a v-bind:href="href">View Project</a>
    </div>
  </div>
</template>

<!--

	JS

-->
<script>
	export default{
		props:{
      title: String,
      href: String
    },
    data(){
      return{}
    }
	}
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
  @import '../../style/global.scss';

  .work{
    height:80vh;

    div:first-child{
      width: 46%;
      display: inline-block;
      padding: 2em;
      background: rgba(255,255,255,.5);

      h2{
        font-family: 'Roboto Slab', serif;
      }

      a{
        display: inline-block;
        padding: 1rem;
        background: $primary-red;
        color: $primary-white;
        border-radius: 3px;
        font-weight: 600;
        text-decoration: none;
      }
    }

  }


</style>
