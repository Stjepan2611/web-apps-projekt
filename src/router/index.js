import Vue from 'vue'
import VueRouter from 'vue-router'
import Proba from '../components/Proba.vue'
import Recepti from '../components/Recepti.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/proba',
    name: 'Proba',
    component: Proba,
  },
  {
    path: '/recepti',
    name: 'Recepti',
    component: Recepti,
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
