<template>
  <div class="index container">
    <div class="container-fluid" height="80px">
      <br>
      <br>
    </div>
    <table class="highlight responsive-table centered">
      <thead>
        <tr class="brown lighten-2 white-text">
          <th>Ordered?</th>
          <th>Order</th>
          <th>Size</th>
          <th>Extras</th>
          <th>Other</th>
          <th>Date Ordered</th>
          <th>Ordered by</th>
          <!-- <th>Edit / Delete</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <i v-if="order.orderActive === false"></i>
            <i v-if="order.orderActive === true" class="material-icons done light-green-text">check</i>
          </td>
          <td>{{order.drink}}</td>
          <td>{{order.size}}</td>
          <td>
            <span v-for="(extra,index) in order.extras" :key="index" class="chip extras">{{extra}}</span>
          </td>
          <td>{{order.other}}</td>
          <td>{{order.orderTime | moment }}</td>
          <td>{{order.name}}</td>
          <!-- <td>
            <span>
              <router-link :to="{name:'EditOrder', params:{order_slug:order.id}}">
                <i class="material-icons edit amber-text darken-3">edit</i>
              </router-link>
            </span>
            <span style="cursor:pointer;">
              <i class="material-icons delete deep-orange-text darken-2" @click="deleteOrder(order.id)">delete</i>
            </span>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Index",
  data() {
    return {
      orders: []
    };
  },
  computed: {
    // Just to make referencing to variables cleaner
    vueRoot() {
      return this.$root;
    },
  },
  filters: {
    moment: function(date) {
      return moment(date).calendar();
    }
  },
  mounted() {
    console.log(this.$root.userData);
  },
  methods: {
    deleteOrder(id) {
      // gets uid of current user
      let curUser = firebase.auth().currentUser.uid;
      console.log("cuUser = ", curUser);
      //get the order from db
      db.collection("orders")
        .doc(id)
        .get()
        .then(doc => {
          // check if current user submitted the order
          if (curUser == doc.data().orderedByID) {
            //delete the order if it's his
            db.collection("orders")
              .doc(id)
              .delete()
              .then(() => {
                this.orders = this.orders.filter(order => {
                  return order.id != id;
                });
              });
          } else {
            //display error message if it's not
            alert("This order is not yours");
          }
        });
    }
  },
  created() {
    
    //fetch data from the firestore
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data(), doc.id)
          let order = doc.data();
          order.id = doc.id;
          this.orders.push(order);
        });
      });

      console.log(this.orders)
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
