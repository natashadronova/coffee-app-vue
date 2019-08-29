<template>
<div class="container">
  <h2>Log In</h2>
     <form class="col s12" >
        
        
        <div class="input-field col s12">
          <i class="material-icons prefix">email</i>
          <input
            placeholder="Email"
            id="email"
            type="text"
            v-model="email"
          />

        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input
            placeholder="Password"
            id="password"
            type="password"
            v-model="password"
          />

        </div>
        
          <div class="field center-align">
            <button v-on:click="Login" class="btn pink">Login</button>
          </div>
     
      </form>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
  name:'Login',
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    Login: function(e) {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user)
            alert(`You are logged in as ${user.email}`);
            this.$router.go({path:this.$router.path});
          },
          err => {
            alert(err.message);
          }
        );
      console.log("register");
      e.preventDefault();
    }
  }
}
</script>

<style>

</style>