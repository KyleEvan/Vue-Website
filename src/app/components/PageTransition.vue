<!--

	HTML

-->
<template>
  <svg class="page-transition" :viewBox="x y w h">

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
    props: [viewbox],
		data(){
      return {
        x: this.$props.viewbox.x,
        y: this.$props.viewbox.y,
        w: this.$props.viewbox.w,
        h: this.$props.viewbox.h
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
