<!--

	HTML

-->
<template>
	<nav>
	  <ul class="nav-items" :class="{expanded}">
	    <li>
	      <router-link to="/">
	        work
	      </router-link>
	    </li>
	    <li>
				<router-link to="/about">
	        about
	      </router-link>
	    </li>
	    <li>
				<router-link to="/contact">
	        contact
	      </router-link>
	    </li>
	  </ul>

		<!-- Mobile Nav Menu -->
	  <a role="button" class="nav-menu" tabindex="2" href="#" @click.prevent="handleMenuToggle">
      <img v-show="!expanded" :src="menu_svg" alt="navigation menu" />
		</a>
	</nav>
</template>

<!--

	JS

-->
<script>
  import menu_svg from '../../images/menu.svg';

	export default{
		data(){
      return {
        expanded: false,
				menu_svg: menu_svg
      }
    },
    methods:{
			handleMenuToggle: function(e){
				this.expanded = !this.expanded;
		  }
		}
	}
</script>

<!--

	Styles

-->
<style lang="scss" scoped>
	@import '../../style/global.scss';



	nav{
      width: 100%;
      position: fixed;
			top: 0;
			left: 0;
      display: flex;
      align-items: center;
			z-index: 3;
      justify-content: flex-end;
      padding: 3%;
      font-size: 90%;
      font-family: 'InterUI', sans-serif;
			pointer-events: none;

			a, a:visited, a:active{
	      display: inline-block;
	      text-decoration: none;
				color: #645d54;
				padding: .1rem 1rem;
        font-weight: 600;
				pointer-events: auto;

				&:hover{
					color: #F69296;
				}
				&.router-link-exact-active{
					color: #F69296;
				}
	    }
			.nav-menu{
	      display: none;
	    }
			.nav-items{
	      list-style: none;
	      display:flex;
				align-items: flex-end;
        flex-direction: column;
	      margin: 0 -1rem 0 0;
	      padding:0;
	    }
			// .nav-items a,
	    // .nav-home {
	    //   padding:10px;
	    // }

			@media (max-width: $break-medium){
	      .nav-menu{
	        position: relative;
	        display:block;
					width: 2rem;
					height: 2rem;
	        padding:10px;
	        z-index: 1;
	      }
	      // .nav-menu::before{
	      //   content:'menu';
	      // }
	      // .nav-items.expanded + .nav-menu::before{
	      //   content:'close';
	      // }
	      .nav-items{
	        width:100%;
	        height:100vh;
					flex-direction: column;
					justify-content: center;
					align-items: unset;
	        background: #FFA69E;
					padding-left: 2.5rem;
    			font-size: 30px;
	        position:absolute;
	        top:0;
	        left:100%;
	        visibility: hidden;
	        transform: translateX(0%) translateZ(0);
					transition: visibility 0s linear 0.6s, transform .3s ease-in;
					will-change: transform;
	      }
	      .nav-items.expanded{
	        visibility: visible;
	        transform: translateX(-100%);
					transition: visibility 0s linear 0.8s, transform .6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
					transition-delay: 0s;
	      }
				.nav-items a{
					color: $primary-white;
				}
	    }
  }

</style>
