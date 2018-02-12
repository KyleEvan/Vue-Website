import '../style/app.scss';
import Vue from 'vue';
import TopNav from './components/TopNav.vue';
import Scene from './components/Scene.vue';



var app = new Vue({
	el: '#app',
	components: {
		"top-nav": TopNav,
		"scene": Scene
	},
	template:`
		<div id="app">

			<!-- Top navigation -->
			<top-nav></top-nav>

			<!-- Main website content -->
			<div class="main">

				<div class="work work-1">
					<div>
						<h2>Careers Redesign</h2>
						<p>
							Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque. Ullamcorper morbi tincidunt ornare massa. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Duis convallis convallis tellus id interdum velit laoreet id. Consequat nisl vel pretium lectus quam id. Lectus quam id leo in vitae turpis massa. Iaculis nunc sed augue lacus viverra vitae. Amet dictum sit amet justo donec enim diam. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Enim diam vulputate ut pharetra sit amet aliquam id.
						</p>
					</div>
				</div>

			</div>

			<!-- Background shapes scene -->
			<scene></scene>

		</div>`
});
