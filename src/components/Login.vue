<template>
  <div class="container center-align">
    <h2>Log In</h2>
    <p>Please, log in with your Aginic Google account.</p>
    <div id="firebaseui-auth-container">

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

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

   
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

</style>