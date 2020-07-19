import Vue from 'vue';
import VueRouter from 'vue-router';
import ApodGenerator from '../components/ApodGenerator.vue'
import ApodFavorites from '../components/ApodFavorites.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/generator',
      name: 'generator',
      component: ApodGenerator
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: ApodFavorites
    }
  ]
});

export default router