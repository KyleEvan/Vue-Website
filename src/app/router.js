import Vue from 'vue';
import Router from 'vue-router';

// Below syntax dynamically imports component when requested
// const Component = () => import('./file.ext');
import Home from './components/pages/Home.vue';
import About from './components/pages/About.vue';
import Contact from './components/pages/Contact.vue';
import NotFound from './components/pages/NotFound.vue';

import WorkBatman from './components/work/batman.vue';
import WorkMember from './components/work/member-redesign.vue';
import WorkCycles from './components/work/cycles.vue';
import WorkComboSmash from './components/work/combosmash.vue';
import WorkReactDashboard from './components/work/react-dashboard.vue';

const Test = () => import('./components/test/test.vue');



Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: '/Vue-Website/',
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
      path: '/batman-poster',
      name: 'BatmanPoster',
      component: WorkBatman,
      props: true,
      meta: { title: 'Batman | Kyle P' }
    },
    {
      path: '/member-redesign',
      name: 'MemberRedesign',
      component: WorkMember,
      props: true,
      meta: { title: 'Member Redesign | Kyle P' }
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
    {
      path: '/react-dashboard',
      name: 'ReactDashboard',
      component: WorkReactDashboard,
      props: true,
      meta: { title: 'React Dashboard App | Kyle P'}
    },

    //-----------------------< Testing Pages >---------------------------
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: { title: 'Testing | Kyle P' }
    },

    //-----------------------< Other Pages >---------------------------
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: { title: 'Not Found | Kyle P' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      resolve({ x: 0, y: 0 });
    });
  }
})
