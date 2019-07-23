<template>
  <nav id="main-navigation" class="content inner-content">
    <a href="Home" @click.prevent="handleClick">
  	  <nav-title :events="events"/>
    </a>
    <div class="nav-wrapper">
      <ul ref="navItems" class="nav-items" :class="{expanded}">
        <li>
          <a href="Home" @click.prevent="handleClick">
            projects
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
    </div>
    <!-- Mobile Nav Menu -->
    <a role="button" class="nav-menu" tabindex="2" href="#" @click.prevent="handleMenuClick">
      <font-awesome-icon :icon="icon" />
    </a>
  </nav>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import navTitle from './nav-title.vue';
  import { TimelineLite } from "gsap";
  export default {
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
	    return this.expanded ? this.exitIcon : this.menuIcon;
	  }
	},
    methods:{
	  toggleMenu: function(){
		var navMenu = this.$el.querySelector('.nav-menu');
	    this.expanded = !this.expanded;
		if(this.expanded){
		  navMenu.style.color = '#fff';
		  this.scroll = document.documentElement.scrollTop;
		  this.bodyNoScroll();
		} else {
		  navMenu.style.color = 'inherit';		  
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
        // const staggerDelay = .1;
		this.expanded ? x = '-100%' : x = '0%';
		TweenLite.to(navItems, this.expand_duration,
		{
		  x: x,
		  ease: Power3.easeOut
		});
	  },
	  animateNavItems: function(){
		let tl = new TimelineLite();
		let duration = 0.4;
		let navItems = Array.from(this.$el.querySelectorAll('.nav-items:not(.expanded) a'));
		let navMenu = this.$el.querySelector('.nav-menu');
	    tl.add( TweenLite.to(
		  navMenu,
		  duration,
		  {
		    delay: 1.2,
		    opacity: 1,
		    y: 0,
		    ease: Power4.easeOut
		  }
		), 0)
		navItems.forEach((el,index) => {
		  let tween = {
		    delay: 1.2,
		    opacity: 1,
		    y: 0,
		    ease: Power4.easeOut
		  }
		  if(index >= (navItems.length-1)){
		    tween.onComplete = () => {
			  this.events.$emit('nav-loaded');
			  console.log('nav is finally done animating');
		    }
		  }
          tl.add( TweenLite.to(
			el,
			duration,
			tween
		  ), -duration);
		  duration *= 0.85;
		});
		
	  },
	  initNav: function(){
	    this.animateNavItems();
	  }
	},
	components:{
	  FontAwesomeIcon,
	  'nav-title': navTitle
	},

	created(){
	  this.events.$on('page-transitioned', () => {
	  	if(this.expanded) this.toggleMenu();
	  });
      this.events.$on('app-loaded', this.initNav);
	},
    beforeDestroy(){
      this.events.$off('app-loaded', this.initNav);
    },
	mounted(){
    //   this.animateNavItems();
	}
  }
</script>

<style lang="scss" scoped>
	@import '../../style/global.scss';
	nav#main-navigation{
      width: 100%;
      position: absolute;
	  top: 0;
	  left: 50%;
	  transform: translateX(-50%);
      display: flex;
      align-items: center;
	  z-index: 3;
	  justify-content: space-between;
	  padding-top: 1em;
	  padding-bottom: 1em;
	  //   overflow: hidden;
      //   padding: 1em 4%;
      //   font-size: 90%;
      font-family: 'InterUI', sans-serif;
	  pointer-events: none;
	  @include smmd{
		// padding: 2em 3%;
        padding-top: 2em;
        padding-bottom: 2em;
	  }
	  div.nav-wrapper{
	    position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
		overflow: hidden;
		@include smmd{
		  position: relative;
		  top: unset;
		  left: unset;
		  width: auto;
		  height: auto;
		}
	  }
	  a, a:visited, a:active{
        display: flex;
        text-decoration: none;
        color: $black;
        font-weight: 600;
	    pointer-events: visible;
      }
	  .nav-menu{
	    line-height: 1;
		display: none;
		outline: none;
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
		// &:hover,
		// &:focus{
        // //   color: $blue;
		// }
		&:active{
		  svg{
		    transform: scale(.7);
		  }
		}
	  }
	  .nav-items{
	    list-style: none;
	    display: flex;
		padding: 0;
		align-items: flex-end;
        // flex-direction: column;
		  margin: 0 -1em 0 0;
		  a{
		    padding: 1em;
			opacity: 0;
			transform: translateY(50%);
		  }
		  a:hover{
		    color: $blue;
		  }
	    }
			.nav-items.expanded .nav-menu{
				color: $white;
			}


			@media(max-width: $break-smallMed){
	      .nav-menu{
	        position: relative;
	        display: block;
			margin: 0 -1rem 0 0;
			padding: 10px;
			padding-right: 13px;
	        z-index: 99;
			opacity: 0;
			transform: translateY(50%);
	      }

	      .nav-items{
	        width: 100%;
	        height: 100vh;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
	        background-color: $black;
			padding-left: 2.5rem;
    		font-size: 30px;
	        position: absolute;
	        top: 0;
	        left: 100%;
			pointer-events: painted;
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
							color: $white;
						&:hover{
				// &.router-link-exact-active{
					// opacity: .75;
				}
						}
					}
				}
	    }
  }

</style>
