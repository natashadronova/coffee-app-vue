<template>
<div class="container">
  <h2>Register</h2>
     <form class="col s12" @submit.prevent="Register" >
        
        
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
            <button class="btn pink">Register</button>
          </div>
     
      </form>
    </div>
</template>


<script>
import db from "@/firebase/init";

export default {
  name:'Register',
  data(){
    return{
      email: '',
      password:''
    }
  },

  methods: {
    Register: function(e) {
      console.log('register')
      e.preventDefault();
    }
  }
}
</script>

<style>

</style>