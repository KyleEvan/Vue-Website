<!--

	HTML

-->
<template>
		<div id="navbar">
			<h1>
				home
			</h1>
			<ul>
				<li>
					work
				</li>
				<li>
					about
				</li>
				<li>
					contact
				</li>
			</ul>
		</div>
</template>

<script>
	export default{
		data(){
			// console.log(this);
			return this;
		}
	}
</script>

<style lang="scss">
	$break-small: 480px;
	$break-medium: 720px;
	$break-large: 1200px;

	#navbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 3% 6% 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: none;

		h1{

		}
		ul{
			margin:0;
			padding:0;
			list-style: none;
			font-family:'DopeIcons';

			&:before{
				content:"\f00a";
				font-size:24px;
				display:block;
				@media screen and (min-width: $break-medium) {
					display:none;
				}
			}
			li{
				display:none;
				@media screen and (min-width: $break-medium) {
					display:inline-block;
				}
			}
		}

	}
</style>
