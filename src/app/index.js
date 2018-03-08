import "babel-polyfill";
import "classlist-polyfill";
import '../style/app.scss';
import Vue from 'vue';
import router from './router.js'
import App from './components/App.vue';



// Vue.config.productionTip = false

// Vue.mixin({
//   data: function () {
//     return {
//
//     }
//   }
// });

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // mixins: [mixins]
});
