import '../style/app.scss';
import Vue from 'vue';
import TopNav from './components/TopNav.vue';
import Scene from './components/Scene.vue';



var app = new Vue({
	el: '#app',
	components: {
		"top-nav": TopNav,
		"scene": Scene
	}
});
