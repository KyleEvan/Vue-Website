<!--

	HTML

-->
<template>
		<div id="navbar">
			<a href="#" tabindex="0">
				<h1>
					home
				</h1>
			</a>
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

<style lang="scss" scoped>
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

		h1{

		}
		ul{
			padding: 1rem;
			margin: 0 -1rem 0 0;
			list-style: none;
			font-family: 'DopeIcons';
			cursor:pointer;

			@media screen and (min-width: $break-medium) {
				cursor:default;
				margin: 0;
				padding: 0;
			}

			&:before{
				content: "\f00a";
				font-size: 24px;
				display: block;
				@media screen and (min-width: $break-medium) {
					display: none;
				}
			}
			li{
				font-family:'InterUI', sans-serif;
				display:none;
				@media screen and (min-width: $break-medium) {
					display:inline-block;
				}
			}
		}

	}
</style>
