<template>
  <div class="navbar">
    <nav class="nav-wrapper amber darken-3">
      <div class="container-fluid">
        <span class="logo">CoffeeQuest</span>
        <div
          v-if="vueRoot.userData"
          class="user-name"
        >{{vueRoot.userData.name}} {{vueRoot.userData.lastname}}</div>

        <ul class="right">
          <li v-if="isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'Index'}">All Orders</router-link>
          </li>
          <li v-if="isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'OrderSummary'}">Order Summary</router-link>
          </li>
          <li v-if="isLoggedIn && vueRoot.orderData " class="hidden-sm">
            <router-link :to="{ name: 'YourOrder'}">Edit Order</router-link>
          </li>
          <li v-if="isLoggedIn && !vueRoot.orderData " class="hidden-sm">
            <router-link :to="{ name: 'YourOrder'}">Add Order</router-link>
          </li>

          <li v-if="!isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'Login'}">Log In</router-link>
          </li>
          
          <li v-if="isLoggedIn" class="hidden-sm">
            <a v-on:click="Logout">Log Out</a>
          </li>
          <li class="hidden-md">
            <a class="dropdown-trigger btn" href="#" data-target="menu-dropdown">Menu</a>

            <ul id="menu-dropdown" class="dropdown-content">
              <li v-if="isLoggedIn">
                <router-link :to="{name: 'Index'}">All Orders</router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link :to="{name: 'OrderSummary'}">Order Summary</router-link>
              </li>
              <li v-if="isLoggedIn && vueRoot.orderData ">
                <router-link :to="{ name: 'YourOrder'}">Edit Order</router-link>
              </li>
              <li v-if="isLoggedIn && !vueRoot.orderData ">
                <router-link :to="{ name: 'YourOrder'}">Add Order</router-link>
              </li>

              <li v-if="!isLoggedIn">
                <router-link :to="{name: 'Login'}">Log In</router-link>
              </li>
              
              <li v-if="isLoggedIn">
                <a v-on:click="Logout">Log Out</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from "firebase";
import db from "@/firebase/init";
//import func from '../../vue-temp/vue-editor-bridge';

export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  computed: {
    // Just to make referencing to variables cleaner
    vueRoot() {
      return this.$root;
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      // gets uid of current user
      /* let currUser = firebase.auth().currentUser.uid;
      console.log(currUser)
      //query users collection to get user's name
      db.collection("users")
        .doc(currUser)
        .get()
        .then(doc => {
          console.log(doc)
          this.currentUser = doc.data().name + " " + doc.data().lastname;
        }); */
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
    },
    ClearOrders: function() {
      console.log("cleared");
    }
  },
  mounted() {
    M.AutoInit();
  }
};
</script>


<style>
.navbar nav {
  padding: 0 20px;
}
.user-name {
  position: absolute;
  bottom: -12px;
  font-size: 12px;
}
.logo {
  font-size: 20px;
  position: absolute;
  top: -8px;
  font-weight: bold;
}
.nav-wrapper {
  position: relative;
}
@media screen and (min-width: 768px) {
  .hidden-md {
    display: none !important;
  }
}
@media screen and (max-width: 768px) {
  .hidden-sm {
    display: none !important;
  }
}
</style>
