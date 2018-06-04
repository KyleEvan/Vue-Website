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
			<font-awesome-icon :icon="icon" />
		</a>
	</nav>
</template>

<!--

	JS

-->
<script>
  // Libraries
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
	import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";


	export default{
		data(){
      return {
				menuIcon: ['fas', 'bars'],
				exitIcon: ['fas', 'times'],
        expanded: false,
        animDirection: -1
				// menu_svg: menu_svg
      }
    },
		computed:{
			icon(){
				return this.expanded? this.exitIcon : this.menuIcon;
			}
		},
    methods:{
			initMenuSVG: function(){
				const params = {
	        container: this.$refs.menu,
	        renderer: 'svg',
	        loop: false,
	        autoplay: false,
	        animationData: hamburger_json
	      };
	      let anim;
	      anim = hamburger.loadAnimation(params);
				return hamburger;
			},
			handleMenuToggle: function(e){
				this.expanded = !this.expanded;
				// this.animDirection *= -1;
				// if(this.menu){
				// 	this.menu.setDirection(this.animDirection);
				//   this.menu.play();
        // }
		  }

		},
		mounted(){
      // this.menu = this.initMenuSVG();
			// console.log(this.menu);



		},
		components:{
			FontAwesomeIcon
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
	      display: flex;
	      text-decoration: none;
				// padding: .1rem 1rem;
        font-weight: 600;
				pointer-events: visible;

				&:hover{
					color: #F69296;
				}
				&.router-link-exact-active{
					color: #F69296;
				}
	    }
			.nav-menu{
				line-height: 1;
	      display: none;

				svg{
					width: 6vw;
          height: 6vw;
          max-width: 36px;
          max-height: 36px;
          min-width: 24px;
          min-height: 24px;
					transform: scale(1);
					transition: transform .2s cubic-bezier(.17,.67,.59,1.23);
				}

				&:active{
					svg{
						transform: scale(.7);
					}
				}
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
	        display: block;
					// width: 10vw;
					// height: 10vw;
					// min-width: 5rem;
					// min-height: 5rem;
	        padding:10px;
	        z-index: 1;

	      }

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
