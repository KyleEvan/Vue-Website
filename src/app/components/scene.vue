<!--

	HTML

-->
<template>
	<div id="scene">
	  <h1 id="name">Kyle</h1>
	</div>
</template>


<!--

	JS

-->
<script>
	import {initShapes} from '../shapes.js';
	import '../../style/app.scss';

	console.log("imported the file");
	export default {
	  // data(){
	  // console.log(this);
	  // 	return this;
	  // },
	  mounted() {
	    let scene = document.getElementById('scene');
	    let name = document.getElementById('name');

	    let Shapes = initShapes(scene, name);
	    // console.log(initShapes(scene, name));
	  }
	}
</script>


<!--

	Styles/SCSS

 -->
<style lang="scss">
$primary-color: #63676C;

#scene {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        * {
            opacity: 0;
        }
    }
    #name {
        color: $primary-color;
        margin: 0;
        font-size: 50px;
        text-transform: uppercase;
        font-size: 12vw;
        // font-family: 'Montserrat', sans-serif;
        font-family: 'InterUI', sans-serif;
        font-weight: 700;
        user-select: none;

        span {
            display: inline-block;
            position: relative;
            opacity: 0;
            line-height: 0.8;
            padding: 0 0.05em;
            transform: translateY(100%);
        }
    }
    .transition > * {
        transition: 5s cubic-bezier(0.02, 0.1, 0.15, 1);
    }

}

/****************************************************************

		Fallback:
		If the broser doesn't support flexbox, don't display the scene

	****************************************************************/
@supports (display:flex) {
    #scene {
        display: flex;
    }
}
</style>
