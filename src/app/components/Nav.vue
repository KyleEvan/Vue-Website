<!--

	HTML

-->
<template>
	<nav>
		<router-link to="/">
	    home
	  </router-link>
	  <ul class="nav-items" :class="{expanded}">
	    <li>
	      <router-link to="/work">
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
	  <a class="nav-menu" tabindex="2" href="#" @click.prevent="handleToggle"></a>
	</nav>
</template>

<!--

	JS

-->
<script>
	export default{
		data(){
      return {
        expanded: false
      }
    },
    methods:{
			handleToggle: function(e){
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
      justify-content: space-between;
      padding: 40px 6%;
      font-size: 18px;
      font-family: 'InterUI', sans-serif;
			pointer-events: none;
			a, a:visited, a:active{
	      display: inline-block;
	      text-decoration: none;
				color: #645d54;
				padding: 10px;
				pointer-events: auto;

				&:hover{
					color: #F69296;
				}
	    }
			.nav-menu{
	      display: none;
	    }
			.nav-items{
	      list-style: none;
	      display:flex;
	      align-items: center;
	      margin:0 -10px 0 0;
	      padding:0;
	    }
			.nav-items{
	      list-style: none;
	      display:flex;
	      align-items: center;
	      margin:0 -10px 0 0;
	      padding:0;
	    }
			// .nav-items a,
	    // .nav-home {
	    //   padding:10px;
	    // }

			@media (max-width:$break-medium){
	      .nav-menu{
	        position: relative;
	        display:block;
	        padding:10px;
	        z-index: 1;
	      }
	      .nav-menu::before{
	        content:'menu';
	      }
	      .nav-items.expanded + .nav-menu::before{
	        content:'close';
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
	        transform:translateX(0%) translateZ(0);
					transition: visibility 0s linear 0.6s, transform .3s ease-in;
					will-change: transform;
	      }
	      .nav-items.expanded{
	        visibility: visible;
	        transform:translateX(-100%);
					transition: visibility 0s linear 0.6s, transform .6s cubic-bezier(0,.86,1,1);
					transition-delay: 0s;
	      }
				.nav-items a{
					color: $primary-white;
				}
	    }
  }

</style>
