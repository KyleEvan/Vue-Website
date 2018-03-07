import Vue from 'vue';
import Router from 'vue-router';
import Work from './components/Work.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import NotFound from './components/NotFound.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Work',
      component: Work
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
