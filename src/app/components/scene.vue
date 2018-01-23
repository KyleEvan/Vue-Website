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
	import { initShapes } from '../shapes.js';
	export default{
		data(){
			console.log(this);
			return this;
		},
		mounted(){
			let scene = document.getElementById('scene');
			let name = document.getElementById('name');
			
			initShapes(scene, name);
		}
	}
</script>


<!--

	Styles/SCSS

 -->
<style lang="scss" scoped>

	$primary-color: #63676C;

	#scene{
		width: 100%;
		height: 100vh;
		background:#F9FFF9;
		display: none;
		align-items: center;
		justify-content: center;
		/deep/ svg{
			position:absolute;
			width:100%;
			height:100%;
			top:0;
			left:0;
			/deep/ *{
				opacity:0;
			}
		}
		#name{
			color:$primary-color;
			margin:0;
			font-size:50px;
			text-transform:uppercase;
			font-size:12vw;
			font-family: 'Montserrat', sans-serif;
			font-weight:700;
			/deep/ span{
				display:inline-block;
				position:relative;
				opacity:0;
				line-height:.8;
				padding: 0 .05em;
				transform:translateY(100%);
			}
		}
	}

	/****************************************************************

		Fallback:
		If the broser doesn't support flexbox, don't display the scene

	****************************************************************/
	@supports (display:flex){
		#scene{
			display:flex;
		}
	}
</style>
