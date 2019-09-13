<template>
  <div class="container">
    <div class="container-fluid">
      <!-- <i class="material-icons delete deep-orange-text darken-2">add</i> -->
    
      <table class="highlight centered">
        <thead>
          <tr class="brown lighten-2 white-text">
            <th>Drink</th>
            <th>Size</th>
            <th>Extras</th>
            <th>Other</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in final_order_list" :key="order.concatKey">
            <!-- :key="order.id" -->
            <td>{{final_order_list[index].drink}}</td>
            <td>{{final_order_list[index].size}}</td>
            <td>
              <span
                v-for="(extra,index) in final_order_list[index].extras"
                :key="index"
                class="chip extras"
              >{{extra}}</span>
            </td>
            <td>{{final_order_list[index].other}}</td>
            <td>{{final_order_list[index].count}}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
    <div class="field center-align page-footer">
    <button v-if="vueRoot.admin" class="hidden-sm btn amber darken-3 centered" v-on:click="ClearOrders">
            Clear Orders Forever
          </button>
          </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import _ from "lodash";

export default {
  name: "OrderSummary",
  data() {
    return {
      orders: [],
      final_order_list: []
    };
  },
  computed: {
    // Just to make referencing to variables cleaner
    vueRoot() {
      return this.$root;
    }
  },

  methods: {
    Calculate() {
      // create concatenated key to identify same orders
      let orders = this.orders.forEach(order => {
        let key =
          order.drink +
          "-" +
          order.size +
          "-" +
          order.extras +
          "-" +
          order.other;
        order.concatKey = key;
      });

      /* this.orders = this.orders.filter(order => {
        return order.orderActive;
      }); */

      console.log(this.orders);
      this.orders.forEach(order => {
        let order_count = _.countBy(this.orders, "concatKey");
        order.count = order_count[order.concatKey];
      });

      let final_order_list = _.uniqBy(this.orders, "concatKey");
      this.final_order_list = _.orderBy(final_order_list, "count", "desc");

      return this.final_order_list;
    },

    ClearOrders: function() {
      console.log("cleared");
    }
  },
  mounted() {
    //this.Calculate();
    //get all orders
    db.collection("orders")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let order = doc.data();
          order.id = doc.id;
          this.orders.push(order);
        });
        this.Calculate();
      });

      console.log(this.$root.admin)
  }
};
</script>

<style scoped>
.page-footer{
position:fixed;
bottom:0;
left:0;
width:100%;
padding-bottom: 10px;
}

.container-fluid {
  margin-top: 20px;
}


</style>