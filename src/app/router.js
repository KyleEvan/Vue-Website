import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Work from './components/Work.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import NotFound from './components/NotFound.vue';
import WorkCareers from './components/Work-Careers.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Home',
      component: Home,
      meta: { title: 'Kyle Peterson' }
    },
    {
      path: '/work',
      name: 'Work',
      component: Work,
      meta: { title: 'Work | KP' },
      children:[
        {
          path: 'careers-redesign',
          component: WorkCareers,
          meta: { title: 'Careers Redesign | KP' }
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { title: 'About | KP' }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: { title: 'Contact | KP' }
    },
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: NotFound
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 1000)
    })
  }
})
