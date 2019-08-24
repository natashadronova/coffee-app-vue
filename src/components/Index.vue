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
        <td>
          <span>
            <router-link :to="{name:'EditOrder', params:{order_slug:order.id}}">
              <i class="material-icons edit">edit</i>
              </router-link>
            </span>
          <span>
            <i class="material-icons delete" @click='deleteOrder(order.id)'>delete</i>
            </span>
        </td>
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
      // this.orders=this.orders.filter(order=>{
      //   return order.id != id
      // })
      console.log(id)
      db.collection('orders').doc(id).delete()
        .then(() => {
          this.orders=this.orders.filter(order =>{
            return order.id!=id
          })
        })
    }        
    
  },
  created() {
      console.log('created')
      //fetch data from the firestore
      db.collection('orders').get()
        .then(snapshot=>{
          snapshot.forEach(doc => {
            //console.log(doc.data(), doc.id)
            let order = doc.data()
            order.id = doc.id
            this.orders.push(order)
          })
        })
    }
// computed properties and lodash framework
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
