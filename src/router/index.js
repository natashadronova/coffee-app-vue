import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddOrder from '@/components/AddOrder'
import EditOrder from '@/components/EditOrder'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path:'/add-order',
      name:'AddOrder',
      component: AddOrder
    },
   
   
    {
      path: '/',
      name: 'Index',
      component: Index
    },

  

    {
      path:'/edit-order/:order_slug',
      name:'EditOrder',
      component: EditOrder
    },

    {
      path:'/login',
      name:'Login',
      component: Login
    },

    {
      path:'/register',
      name:'Register',
      component: Register
    }



  ]
})
