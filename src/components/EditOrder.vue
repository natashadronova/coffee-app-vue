<template>
  <div class="edit-order container">
    <h2>Edit Order</h2>
    <p>{{this.$route.params.order_slug}}</p>
  </div>
</template>


<script>
import db from '@/firebase/init'

export default {
  name: 'EditOrder',
  data(){
    return {

    }
  }
}
</script>

<style>

</style>
