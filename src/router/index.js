import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddOrder from '@/components/AddOrder'
import EditOrder from '@/components/EditOrder'
import Login from '@/components/Login'
import Register from '@/components/Register'
import OrderSummary from '@/components/OrderSummary'
import YourOrder from '@/components/YourOrder'
import firebase from 'firebase';

Vue.use(Router)

let router =  new Router({
  routes: [
   
    {
      path:'/add-order',
      name:'AddOrder',
      component: AddOrder,
      meta:{
        requiresAuth:true
      }
    },
   
   
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/order-summary',
      name: 'OrderSummary',
      component: OrderSummary,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/your-order',
      name: 'YourOrder',
      component: YourOrder,
      meta:{
        requiresAuth:true
      }
    },

    {
      path:'/edit-order/:order_slug',
      name:'EditOrder',
      component: EditOrder,
      meta:{
        requiresAuth:true
      }
    },

    {
      path:'/login',
      name:'Login',
      component: Login,
      meta:{
        requiresGuest:true
      }
    },

    {
      path:'/register',
      name:'Register',
      component: Register,
      meta:{
        requiresGuest:true
      }
    }



  ]
})


//NavGuards
router.beforeEach((to,from,next)=>{
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
})

export default router;