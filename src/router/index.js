import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SmartphoneComparisonDetailView from '@/views/SmartphoneComparisonDetailView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:slug1/:slug2',
      name: 'smartphone-detail',
      component: SmartphoneComparisonDetailView,
      props: true,
    },
  ]
})


export default router

