import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/users/create',
      name: 'createUsers',
      component: () => import('../views/UserCreationView.vue')
    },
    {
      path: '/users/view/:login',
      name: 'listUser',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/users/edit/:login',
      name: 'editUser',
      component: () => import('../views/UserEditView.vue')
    }
  ]
})

export default router
