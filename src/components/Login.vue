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
          />

        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input
            placeholder="Password"
            id="password"
            type="password"
          />

        </div>
        
          <div class="field center-align">
            <button class="btn pink">Login</button>
          </div>
     
      </form>
    </div>
</template>


<script>
export default {
  name:'Login',
  data(){
    return{

    }
  }
}
</script>

<style>

</style>