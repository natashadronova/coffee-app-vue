<template>
  <div class="navbar">
    <nav class="nav-wrapper brown lighten-3">
      <div class="container">
        <span class="brand-logo">Coffee App</span>
        <ul class="right">
          <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
          <li v-if="isLoggedIn">
            <router-link :to="{name: 'Index'}">Home</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{name: 'Login'}" >Log In</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{name: 'Register'}">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button class="btn black" v-on:click="Logout">Logout</button>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'AddOrder'}">
            <a href="#" class=" btn-large  pink btn-flat"><i class="material-icons">add</i></a>
          </router-link>
          </li>
        </ul>
       
      </div>

    
    </nav>
  </div>
</template>


<script>
import firebase from 'firebase';


export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn:false,
      currentUser:false
    };
  },
  created(){
    if(firebase.auth().currentUser) {
      this.isLoggedIn=true;
      this.currentUser=firebase.auth().currentUser.email;
    }
  },
  methods:{
    Logout: function(){
      firebase.auth().signOut().then(()=>{
       
        this.$router.go({path:this.$router.path});
      })
    }
  }
};
</script>


<style>
.navbar nav {
  padding: 0 20px;
}
</style>
