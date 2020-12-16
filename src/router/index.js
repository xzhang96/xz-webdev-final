import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import SearchDishResult from '@/components/SearchDishResult'
import SearchIngredientsResult from '@/components/SearchIngredientsResult'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/searchDishResult',
      name: 'searchDishResult',
      component: SearchDishResult
    },
    {
      path: '/searchIngredientsResult',
      name: 'searchIngredientsResult',
      component: SearchIngredientsResult
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: Recipe
    }
  ]
})
