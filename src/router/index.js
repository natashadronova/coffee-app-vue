import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddOrder from '@/components/AddOrder'
import EditOrder from '@/components/EditOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path:'/add-order',
      name:'AddOrder',
      component: AddOrder
    },

    {
      path:'/edit-order/:order-slug',
      name:'EditOrder'
    }


  ]
})
