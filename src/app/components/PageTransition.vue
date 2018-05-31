<!--

	HTML

-->
<template>
  <svg :viewBox="viewBox">
    <slot></slot>
  </svg>
</template>

<!--

	JS

-->
<script>
  // Libraries
	import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";


	export default{
		data(){
      return {

      }
    },
    computed:{
      viewBox(){
        return `0 0 ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`
      }
    },
    methods:{

		},
		mounted(){

		}
	}
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
	@import '../../style/global.scss';

 svg{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: -3
 }

</style>
