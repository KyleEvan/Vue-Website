<!--

	HTML

-->
<template>
	<nav>
	  <ul ref="navItems" class="nav-items" :class="{expanded}">
	    <li>
	      <a href="Home" @click.prevent="handleClick">
	        work
	      </a>
	    </li>
	    <li>
				<a href="About" @click.prevent="handleClick">
	        about
	      </a>
	    </li>
	    <li>
				<a href="Contact" @click.prevent="handleClick">
	        contact
	      </a>
	    </li>
	  </ul>

		<!-- Mobile Nav Menu -->
	  <a role="button" class="nav-menu" tabindex="2" href="#" @click.prevent="handleMenuClick">
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
	// import ScrollMagic from "scrollmagic";
  import { TimelineLite } from "gsap";


	export default{
		props: ['events'],
		data(){
      return {
				tl: new TimelineLite(),
				menuIcon: ['fas', 'bars'],
				exitIcon: ['fas', 'times'],
        expanded: false,
				expand_duration: 1,
				close_duration: .85,
				scroll: 0
      }
    },
		computed:{
			icon(){
				return this.expanded? this.exitIcon : this.menuIcon;
			}
		},
    methods:{
			toggleMenu: function(){
				this.expanded = !this.expanded;
				if(this.expanded){
					this.scroll = document.documentElement.scrollTop;
					this.bodyNoScroll();
				} else {
					setTimeout(()=>{
						this.bodyRestoreScroll();
						document.documentElement.scrollTop = this.scroll;
					}, this.close_duration);
				}
				this.animateMenu();
			},
			navigate: function(e){
        const href = e.target.getAttribute("href");
        if(href){
					this.scroll = 0;
          this.$router.push({
            name: href
          });
        }
      },
      handleClick: function(e){
				this.navigate(e);
			},
			handleMenuClick: function(e){
				this.toggleMenu();
		  },
			animateMenu: function(){
				let x;
				const navItems = this.$refs.navItems;
        const staggerDelay = .1;
				this.expanded ? x = '-100%' : x = '0%';
				TweenLite.to(navItems, this.expand_duration,
				{
					x: x,
					ease: Power3.easeOut
				});
			},
		},
		components:{
			FontAwesomeIcon
		},
		created(){
			this.events.$on('page-transitioned', () => {
				if(this.expanded) this.toggleMenu();
			});
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
			z-index: 99;
      justify-content: flex-end;
      padding: 1em 4%;
      font-size: 90%;
      font-family: 'InterUI', sans-serif;
			pointer-events: none;
			@include smmd{
				padding: 2em 3%;
			}
			@include lg{
				padding: $main-topBotPad 3%;
			}

			a, a:visited, a:active{
	      display: flex;
	      text-decoration: none;
				// padding: .1rem 1rem;
				color: $mainColor;
        font-weight: 600;
				pointer-events: visible;

				&:hover{
					color: $hoverGreen;
				}
				&.router-link-exact-active{
					color: $hoverGreen;
				}
	    }
			.nav-menu{
				line-height: 1;
	      display: none;

				svg{
					pointer-events: none;
					width: 6vw;
          height: 6vw;
					max-width: 40px;
					max-height: 40px;
					min-width: 30px;
					min-height: 30px;
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


			@media (max-width: $break-medium){
	      .nav-menu{
	        position: relative;
	        display: block;
					margin: 0 -1rem 0 0;
	        padding: 10px;
	        z-index: 99;

	      }

	      .nav-items{
	        width:100%;
	        height:100vh;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
	        background: $offDarkGreen;
					padding-left: 2.5rem;
    			font-size: 30px;
	        position:absolute;
	        top: 0;
	        left: 100%;
	        // visibility: hidden;
	        // transform: translateX(0%) translateZ(0);
					// transition: visibility 0s linear 0.6s, transform .6s ease-in;
	      }
	      // .nav-items.expanded{
	        // visibility: visible;
	        // transform: translateX(-100%);
					// transition: visibility 0s linear 1s, transform .6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
					// transition-delay: 0s;
	      // }
				.nav-items {
					li{
            margin: 1rem 0;
						a{
							color: $lightOffWhite;
						}
					}
				}
	    }
  }

</style>
