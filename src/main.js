// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase'
import './firebase/init'
import db from "@/firebase/init";
import 'firebaseui/dist/firebaseui.css'; 

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if (!app) {
    app =
      new Vue({
        el: '#app',
        router,
        components: {
          App
        },
        mounted() {

          if (user) {
            let that = this;

            // Get userData
            this.auth = user;
            console.log(this.auth.uid)
            console.log(user.uid)
            db.collection("users").doc(user.uid).set({ name: user.displayName.split(' ')[0], lastname: user.displayName.split(' ')[1], email: user.email}, { merge: true })
              .then(() => {
                console.log('success')
              });

            let userRef = db.collection('users').doc(user.uid)
            userRef.onSnapshot(function (doc) {
              const userData = doc.data();
              that.userData = userData;
              //admin is assigned from firebase - if it's not defined for the user, then he is not admin
              that.admin  = (typeof userData.admin === 'undefined') ? false :  userData.admin;
              //userData.admin;
              console.log("userdata " + that.userData)
            });

            let orderRef = db.collection("orders").doc(user.uid);
            orderRef.onSnapshot(function (doc) {
              const orderData = doc.data();
              that.orderData = orderData;
              console.log("order " + that.orderData)
            });
          }
        },
        data: function () {
          return {
            auth: null,
            userData: null,
            orderData: null,
            admin: false
          }
        },
        template: '<App/>'
      })
  }
})
