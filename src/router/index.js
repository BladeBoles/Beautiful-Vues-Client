import Vue from 'vue';
import VueRouter from 'vue-router';
import ApodGenerator from '../components/ApodGenerator.vue'
import ApodFavorites from '../components/ApodFavorites.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/generator',
      name: 'generator',
      component: ApodGenerator,
      alias: '/'
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: ApodFavorites
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      component: () => import('../views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/BoardUser.vue')
    }
  ]
});

export default router