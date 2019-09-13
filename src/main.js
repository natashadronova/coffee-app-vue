// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase'
import './firebase/init'
import db from "@/firebase/init";

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {

  if (!app) {
    app =
      new Vue({
        el: '#app',
        router,
        components: {
          App
        },
        mounted() {
          // Get userData
          if (user) {
            let userRef = db.collection("users").doc(user.uid);
            let that = this;
            this.auth = user;
            userRef.onSnapshot(function (doc) {
              const userData = doc.data();
              that.userData = userData;
            });
          }
        },
        data: function () {
          return {
            auth: null,
            userData: null,
          }
        },
        template: '<App/>'
      })
  }
})
