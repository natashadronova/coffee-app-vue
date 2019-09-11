<template>
  <div class="navbar">
    <nav class="nav-wrapper amber darken-3">
      <div class="container-fluid">
        <span v-if="isLoggedIn" class="left">{{currentUser}}</span>
        <span class="brand-logo left">CoffeeQuest</span>
        <ul class="right">
          <li v-if="isLoggedIn">
            <router-link :to="{name: 'Index'}">All Orders</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{name: 'OrderSummary'}">Order Summary</router-link>
          </li>
          <!-- <li v-if="isLoggedIn">
            <router-link :to="{name: 'YourOrder'}">Your Order</router-link>
          </li> -->
          <li v-if="!isLoggedIn">
            <router-link :to="{name: 'Login'}">Log In</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{name: 'Register'}">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <a v-on:click="Logout">Log Out</a>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'AddOrder'}">
              <a class="btn-floating btn-large waves-effect waves-light white">
                <i class="material-icons amber-text text-darken-3">add</i>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      // gets uid of current user
      let currUser = firebase.auth().currentUser.uid;
      //query users collection to get user's name
      db.collection("users")
        .doc(currUser)
        .get()
        .then(doc => {
          this.currentUser = doc.data().name + " " + doc.data().lastname;
        });
    }
  },
  methods: {
    Logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>


<style>
.navbar nav {
  padding: 0 20px;
}
</style>
