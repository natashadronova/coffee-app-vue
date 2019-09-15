<template>
  <div class="container center-align">
    <h2>Log In</h2>
    
    <form class="col s12">
      <div class="input-field col s12">
        <i class="material-icons prefix">email</i>
        <input placeholder="Email" id="email" type="text" v-model="email" />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">lock</i>
        <input placeholder="Password" id="password" type="password" v-model="password" />
      </div>

      <div class="field center-align">
        <button v-on:click="Login" class="btn amber darken-3">Login</button>
      </div>
    </form>
    
    <div id="firebaseui-auth-container">
      <div class="content-wrapper ">
        <div class="logo-wrapper">
          <img src="https://developers.google.com/identity/images/g-logo.png" />
        </div>
        <span class="text-container">
          <span>Sign in with Google</span>
        </span>
      </div>
      </div>
    </div>
</template>


<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/success",
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ["profile", "email"]
        }
      ]
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },

  methods: {
    Login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user);
            alert(`You are logged in as ${user.email}`);
            this.$router.go({ path: this.$router.path });
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

<style scoped>
#firebaseui-auth-container {
  margin: 40px;
  display: inline-block;
  
  align-self: center;
  width: 240px;
  height: 50px;
  background-color: #4285f4;
  color: #fff;
  border-radius: 1px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
}

#firebaseui-auth-container .text-container {
  font-family: Roboto, arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.21px;
  font-size: 16px;
  line-height: 48px;
  vertical-align: top;
  border: none;
  display: inline-block;
  text-align: center;
  width: 180px;
}

#firebaseui-auth-container:hover {
  cursor: pointer;
  -webkit-box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
  box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
}
#firebaseui-auth-container:active {
  background-color: #3367D6;
  transition: background-color 0.2s;
}
 #firebaseui-auth-container .content-wrapper {
  height: 100%;
  width: 100%;
  border: 1px solid transparent;
}
#firebaseui-auth-container img {
    width: 18px;
    height: 18px;
}
#firebaseui-auth-container .logo-wrapper {
   padding: 15px;
   background:#fff;
   width: 48px;
   height: 100%;
   border-radius: 1px; 
   display: inline-block;
}

*, *:before, *:after {
  box-sizing: border-box;
}


</style>