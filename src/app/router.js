import Vue from 'vue';
import Router from 'vue-router';

// Below syntax dynamically imports component when requested
// const Component = () => import('./file.ext');
const Home = () => import('./components/pages/Home.vue');
const About = () => import('./components/pages/About.vue');
const Contact = () => import('./components/pages/Contact.vue');
const NotFound = () => import('./components/pages/NotFound.vue');

import WorkCareers from './components/work/careers.vue';
import WorkCycles from './components/work/cycles.vue';
import WorkComboSmash from './components/work/combosmash.vue';

const Test = () => import('./components/test/test.vue');



Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    //-----------------------< Main Pages >--------------------------
    // In navigation menu
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Kyle Peterson' }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { title: 'About | Kyle P' }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: { title: 'Contact | Kyle P' }
    },

    //--------------------< Work/Projects >-----------------------
    {
      path: '/careers-redesign',
      name: 'Careers-Redesign',
      component: WorkCareers,
      props: true,
      meta: { title: 'Careers Redesign | Kyle P' }
    },
    {
      path: '/cycles',
      name: 'Cycles',
      component: WorkCycles,
      props: true,
      meta: { title: 'Cycles | Kyle P' }
    },
    {
      path: '/combo-smash',
      name: 'ComboSmash',
      component: WorkComboSmash,
      props: true,
      meta: { title: 'Combo Smash | Kyle P' }
    },

    //-----------------------< Other Pages >---------------------------
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: { title: 'Testing | Kyle P' }
    },

    //-----------------------< Test Pages >---------------------------
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: { title: 'Not Found | Kyle P' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      resolve({ x: 0, y: 0 })
    })
  }
})
