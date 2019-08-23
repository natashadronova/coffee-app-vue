import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddOrder from '@/components/AddOrder'

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
    }
  ]
})
