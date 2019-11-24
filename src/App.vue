<template>
  <div id="app" class="whole-app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'


export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>

<style>
body, html {
  background:white;
}
</style>
