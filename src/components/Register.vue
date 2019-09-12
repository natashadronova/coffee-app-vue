<template>
  <div class="container">
    <h2>Register</h2>
    <form class="col s12">
      <div class="input-field col s12">
        <i class="material-icons prefix">person</i>
        <input placeholder="Type your name" id="name" type="text" v-model="name" />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">person</i>
        <input placeholder="Type your last name" id="lastname" type="text" v-model="lastname" />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">email</i>
        <input placeholder="Email" id="email" type="text" v-model="email" />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">lock</i>
        <input placeholder="Password" id="password" type="password" v-model="password" />
      </div>

      <div class="field center-align">
        <button v-on:click="register" class="btn amber darken-3">Register</button>
      </div>
    </form>
  </div>
</template>

x
<script>
import db from "@/firebase/init";
//submit.prevent="Register"
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      lastname:''
    };
  },

  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)

        .then(
          cred => {
            console.log(cred.user.uid)
            this.$router.go({ path: this.$router.path });
            return db.collection('users').doc(cred.user.uid).set({
              name: this.name,
              lastname:this.lastname,
              email: this.email,
              // drink: 'Coffee',
              // extras:[],
              // orderActive:false,
              // orderTime:Date.now(),
              // orderedBy:'',
              // other:'',
              // size:''
            });
            
          },
          err => {
            alert(err.message);
          }
        );

      e.preventDefault();
    }
  }
};
</script>

<style>
</style>