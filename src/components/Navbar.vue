<template>
  <div class="navbar">
    <nav class="nav-wrapper brown darken-3 z-depth-0">
      <div class="container-fluid">
        <span class="logo">CoffeeQuest</span>
        <div
          v-if="vueRoot.userData"
          class="user-name"
        >{{vueRoot.userData.name}} {{vueRoot.userData.lastname}}</div>

        <ul class="right">
          <li v-if="isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'Index'}">
              <span class="brown-text text-lighten-3 menu-link">All Orders</span>
            </router-link>
          </li>
          <li v-if="isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'OrderSummary'}">
              <span class="brown-text text-lighten-3 menu-link">Order Summary</span>
            </router-link>
          </li>
          <li v-if="isLoggedIn && vueRoot.orderData " class="hidden-sm">
            <router-link :to="{ name: 'YourOrder'}">
              <span class="brown-text text-lighten-3 menu-link">Edit Order</span>
            </router-link>
          </li>
          <li v-if="isLoggedIn && !vueRoot.orderData " class="hidden-sm">
            <router-link :to="{ name: 'YourOrder'}">
              <span class="brown-text text-lighten-3 menu-link">Add Order</span>
            </router-link>
          </li>
          <li v-if="isLoggedIn " class="hidden-sm">
            <router-link :to="{ name: 'GuestOrder'}">
              <span class="brown-text text-lighten-3 menu-link">Guest Order</span>
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="hidden-sm">
            <router-link :to="{name: 'Login'}" class="menu-link">
              <span class="brown-text text-lighten-3 menu-link">Log In</span>
            </router-link>
          </li>

          <li v-if="isLoggedIn" class="hidden-sm">
            <a v-on:click="Logout">
              <span class="brown-text text-lighten-3 menu-link">Log Out</span>
            </a>
          </li>
          <li class="hidden-md">
            <a class="dropdown-trigger btn-flat" href="#" data-target="menu-dropdown "><i class="material-icons brown-text text-lighten-3">menu</i></a>

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
              <li v-if="isLoggedIn ">
                <router-link :to="{ name: 'GuestOrder'}">Guest Order</router-link>
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
  font-family: "Raleway", sans-serif;
}
.logo {
  font-size: 20px;
  position: absolute;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  top: -8px;
  font-weight: bold;
  color: #bcaaa4;
}

.user-name {
  color: #bcaaa4;
}

.menu-link {
  font-size: 1.2em !important;
  font-family: "Raleway", sans-serif;
}

.menu-link:hover {
  /* text-decoration: none !important; */
}

ul li a:hover {
  /* text-decoration: none !important; */
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
