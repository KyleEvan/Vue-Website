import "babel-polyfill";
import "classlist-polyfill";
import '../style/app.scss';
import Vue from 'vue';
import TopNav from './components/TopNav.vue';
import Scene from './components/Scene.vue';
import Project from './components/Project.vue';

var app = new Vue({
  el: '#app',
  components: {
    "top-nav": TopNav,
    "scene": Scene,
    "project": Project
  },
  template: `
		<div id="app">

			<!-- Top navigation -->
			<top-nav></top-nav>

			<!-- Main website content -->
			<div class="main">

        <project title="Careers Redesign" href="something.com">
          <p>
            Inner content
          </p>
        </project>
				<!--<div class="work work-1">
					<div>
						<h2>Careers Redesign</h2>
						<p>
							Careers Website Redesign for Excellus BCBS and Univera Healthcare. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam vel quam elementum pulvinar. Purus ut faucibus pulvinar elementum integer enim neque. Ullamcorper morbi tincidunt ornare massa.
						</p>
					</div>
				</div>-->

			</div>

			<!-- Background shapes scene -->
			<scene></scene>

		</div>`
});
