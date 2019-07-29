<template>
<div class="index container">
  <table class="highlight responsive-table">
    <thead>
      <tr>
        <th>Order</th>
        <th>Size</th>
        <th>Extras</th>
        <th>Other</th>
        <th>Date Ordered</th>
        <th>Ordered by</th>
        <th>Edit / Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='order in orders' :key='order.id'>
        <td>{{order.drink}}</td>
        <td>{{order.size}}</td>
        <td >
          <span v-for='(extra,index) in order.extras' :key='index' class="chip extras">{{extra}}</span>
        </td>
        <td>{{order.other}}</td>
        <td>{{order.submitted}}</td>
        <td>{{order.ordered_by}}</td>
        <td><span><i class="material-icons edit" @click='editOrder()'>edit</i></span>  <span><i class="material-icons delete" @click='deleteOrder(order.id)'>delete</i></span></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import moment from 'moment'
import db from '@/firebase/init'

export default {
  name: "Index",
  data() {
    return {
      orders: [
      ]
    };
  },
  methods:{
    deleteOrder(id){
      this.orders=this.orders.filter(order=>{
        return order.id != id
      })
    },

    
  },
  created() {
      console.log('created')
      //fetch data from the firestore
      db.collection('orders').get()
        .then(snapshot=>{
          snapshot.forEach(doc => {
            console.log(doc)
          })
        })
    }

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.delete {
  cursor: pointer;
  color: red;
}

.edit {
  cursor: pointer;
  color: orange;
}
</style>
