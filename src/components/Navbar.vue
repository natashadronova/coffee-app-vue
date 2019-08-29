<template>
  <div class="navbar">
    <nav class="nav-wrapper brown lighten-3">
      <div class="container">
        <span class="brand-logo">Coffee App</span>
        <ul class="right">
          <li>
            <router-link :to="{name: 'Index'}">Home</router-link>
          </li>
          <li>
            <router-link :to="{name: 'Login'}" >Log In</router-link>
          </li>
          <li>
            <router-link :to="{name: 'Register'}">Register</router-link>
          </li>
          <li>
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
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>


<style>
.navbar nav {
  padding: 0 20px;
}
</style>
