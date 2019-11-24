<template>
  <div class="index container">
    <div class="container-fluid" height="80px">
      <br />
      <br />
    </div>
    <table class="highlight centered">
      <thead>
        <tr class="brown darken-3 z-depth-0">
          <!-- <th>Ordered?</th> -->
          <th>Order</th>
          <th>Size</th>
          <th>Extras</th>
          <!-- <th>Geo</th> -->
          <th>Other</th>
          <th class="hidden-sm">Date Ordered</th>
          <th class="hidden-sm">Ordered by</th>
          <!-- <th>Edit / Delete</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          v-bind:class="[ (order.id==curUser) ? myOrderClass : '']"
        >
          <td>{{order.drink}}</td>

          <td>{{order.size}}</td>
          <td>
            <span
              v-for="(extra,index) in order.extras_list"
              :key="index"
              class="chip extras"
            >{{extra}}</span>
          </td>
          <!-- <td>{{order.geo}}</td> -->
          <td>{{order.other}}</td>
          <td class="hidden-sm">{{order.orderTime | moment }}</td>
          <td class="hidden-sm">{{order.name}}</td>
          <!-- <td>
            <span>
              <router-link :to="{name:'EditOrder', params:{order_slug:order.id}}">
                <i class="material-icons edit amber-text darken-3">edit</i>
              </router-link>
            </span>
            <span style="cursor:pointer;">
              <i class="material-icons delete deep-orange-text darken-2" @click="deleteOrder(order.id)">delete</i>
            </span>
          </td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init";
import firebase from "firebase";
import _ from "lodash";

export default {
  name: "Index",
  data() {
    return {
      orders: [],
      myOrderClass: "brown lighten-4",
      curUser: ""
    };
  },
  computed: {
    // Just to make referencing to variables cleaner
    vueRoot() {
      return this.$root;
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).calendar();
    }
  },

  methods: {
    // deleteOrder(id) {
    //   // gets uid of current user
    //   let curUser = firebase.auth().currentUser.uid;
    //   console.log("cuUser = ", curUser);
    //   //get the order from db
    //   db.collection("orders")
    //     .doc(id)
    //     .get()
    //     .then(doc => {
    //       // check if current user submitted the order
    //       if (curUser == doc.data().orderedByID) {
    //         //delete the order if it's his
    //         db.collection("orders")
    //           .doc(id)
    //           .delete()
    //           .then(() => {
    //             this.orders = this.orders.filter(order => {
    //               return order.id != id;
    //             });
    //           });
    //       } else {
    //         //display error message if it's not
    //         alert("This order is not yours");
    //       }
    //     });
    // }
  },
  created() {
    this.curUser = firebase.auth().currentUser.uid;
    //fetch data from the firestore
    db.collection("orders")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let order = doc.data();
          order.id = doc.id;
          this.orders.push(order);
        });

        const result = [];
        this.orders.forEach(order => {
          // console.log(order.extras)
          result.push(order.extras.map(({ name }) => name));

          // this.order.extras = order.extras
          // console.log(result)
        });
      })
      .then(() => {
        this.orders = _.orderBy(this.orders, "orderTime", "desc");
      });
  }
};
</script>


<style>
.delete {
  cursor: pointer;
  color: red;
}

.edit {
  cursor: pointer;
  color: orange;
}

.page-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 10px;
}

.container-fluid {
  margin-top: 20px;
}

h3 {
  color:#402C30 !important;
  font-family: "Raleway", sans-serif;
  text-align: center;
  padding-top: 20px;
}

thead tr {
  color: #d7ccc8;
  font-family: "Open Sans", sans-serif;
  font-size:1.2em;
}

tbody th, td {
  /* font-size: 1.2em !important; */
  font-family: "Raleway", sans-serif;
  color: #402C30;
}

.clear-btn{
  font-family: "Open Sans", sans-serif;
  font-size:1.2em;
}
</style>
