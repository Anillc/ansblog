import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/articles',
    component: () => import('../views/Articles.vue')
  },
  {
    path: '/article/:id',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/edit/:id',
    meta: {
      auth: true
    },
    component: () => import('../views/MDEditor.vue')
  },
  {
    path: '/edit',
    meta: {
      auth: true
    },
    component: () => import('../views/MDEditor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
