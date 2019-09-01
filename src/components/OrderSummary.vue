<template>
  <div>
    <i class="material-icons delete deep-orange-text darken-2" @click="Calculate()">add</i>
    <table class="highlight responsive-table centered">
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
        <tr v-for="order in orders" :key="order.id">
          <td>{{order.drink}}</td>
          <td>{{order.size}}</td>
          <td>
            <span v-for="(extra,index) in order.extras" :key="index" class="chip extras">{{extra}}</span>
          </td>
          <td>{{order.other}}</td>
          <td>{{order.length}}</td>
        </tr>
      </tbody>
    </table>
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
      orders: []
    };
  },

  methods: {
    Calculate() {
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

      //let result = _.chain(this.orders).filter((order) => order.orderActive).groupBy((order)=>`${order.drink}--${order.size}`)
      //let result = _.chain(this.orders).groupBy((order)=>`${order.drink}--${order.size}`)
      orders = _.chain(this.orders)._.groupBy(this.orders, "concatKey").forEach(order =>{
        //order.count = this.order.length
        console.log(order)
      });
      console.log(orders)
      let results = this.orders.forEach(order =>{
        //order.count = this.order.length
        console.log(order)
      });
      //let results = _.mapValues(_.groupBy(this.orders, "drink"), x => x.map(y => _.omit(y, "team") ));
      console.log(results);
      //console.log(result)
    }
    //   let helper = {};
    //   let result = this.orders.reduce(function(r, o) {
    //     let key = o.drink + "-" + o.size;
    //     console.log(key);

    //     if (!helper[key]) {
    //       helper[key] = Object.assign({}, o); // create a copy of o
    //       r.push(helper[key]);
    //     } else {
    //       helper[key].copies += 1;

    //     };

    //     console.log(r);
    //     return r;
    //   }, []);
    //   console.log(result)
    // }
  },

  created() {
    //get all orders
    db.collection("orders")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data(), doc.id)
          let order = doc.data();
          order.id = doc.id;
          this.orders.push(order);
        });
      });

    //console.log(groupedOrders);
  }
};
</script>

<style>
</style>