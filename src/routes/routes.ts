import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
const Home = () => import('../views/Home.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - My Portfolio'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;