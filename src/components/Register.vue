<template>
  <div class="container">
    <h2>Register</h2>
    <form class="col s12" >
      <div class="input-field col s12">
        <i class="material-icons prefix">email</i>
        <input placeholder="Email" id="email" type="text" v-model="email" />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">lock</i>
        <input placeholder="Password" id="password" type="password" v-model="password" />
      </div>

      <div class="field center-align">
        <button v-on:click="register"  class="btn pink">Register</button>
      </div>
    </form>
  </div>
</template>

x
<script>
//import db from "@/firebase/init";
//submit.prevent="Register"
import firebase from 'firebase';

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    Register: function(e) {
      firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user)
            alert(`Account Created for ${user.email}`);
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
};
</script>

<style>
</style>