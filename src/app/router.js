import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Work from './components/Work.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import NotFound from './components/NotFound.vue';
import WorkCareers from './components/Work_Careers.vue';
import WorkCycles from './components/Work_Cycles.vue';
import WorkComboSmash from './components/Work_ComboSmash.vue';
// import { transitions } from './transitions.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Kyle Peterson', showName: true }
    },

    // Possible future implementation
    // {
    //   path: '/work',
    //   name: 'Work',
    //   component: Work,
    //   meta: { title: 'Work | KP', showName: false }
    // },

    // Projects and Work
    {
      path: '/careers-redesign',
      name: 'Careers-Redesign',
      component: WorkCareers,
      props: true,
      meta: { title: 'Careers Redesign | KP', showName: false }
    },
    {
      path: '/cycles',
      name: 'Cycles',
      component: WorkCycles,
      props: true,
      meta: { title: 'Cycles | KP', showName: false }
    },
    {
      path: '/combo-smash',
      name: 'ComboSmash',
      component: WorkComboSmash,
      props: true,
      meta: { title: 'Combo Smash | KP', showName: false }
    },

    // Other Pages
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { title: 'About | KP', showName: false }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: { title: 'Contact | KP', showName: false }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: { title: 'Not Found | KP', showName: false }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      resolve({ x: 0, y: 0 })
      // }, transitions.duration)
    })
  }
})
