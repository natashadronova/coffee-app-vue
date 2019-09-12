<template>
  <div  class="edit-order container"> 
    <!-- v-if="order" -->
    
    <h2>Edit Order</h2>
    <!-- <div class="row">
      <form class="col s12 selectEdit" @submit.prevent="EditCoffee">
        <div class="input-field col s12">
          <select v-model="order.drink">
            <option value disabled selected>Coffee</option>
            <option value="Latte">Latte</option>
            <option value="Mocha">Mocha</option>
            <option value="Hot Chocolate">Hot Chocolate</option>
            <option value="Flat White">Flat White</option>
            <option value="Long Black">Long Black</option>
            <option value="Chai Latte">Chai Latte</option>
            <option value="Dirty Chai Latte">Dirty Chai Latte</option>
            <option value="Piccolo">Piccolo</option>
            <option value="Cappucino">Cappucino</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select v-model="order.size">
            <option value disabled selected>Size</option>
            <option value="Small">Small</option>
            <option value="Medium" default>Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select multiple v-model="order.extras">
            <option value disabled selected>Extras</option>
            <optgroup label="Toppings">
              <option value="Vanilla">Vanilla</option>
              <option value="Hazelnut">Hazelnut</option>
              <option value="Caramel">Caramel</option>
            </optgroup>
            <optgroup label="Milk">
              <option value="Soy">Soy Milk</option>
              <option value="Almond">Almond Milk</option>
              <option value="Skim">Skim Milk</option>
            </optgroup>
            <optgroup label="Strength">
              <option value="Decaf">Decaf</option>
              <option value="Extra Shot">Extra Shot</option>
            </optgroup>
          </select>
        </div>

        <div class="input-field col s12">
          <input
            placeholder="If not coffee, then what?"
            id="first_name"
            type="text"
            class="validate"
            v-model="order.other"
          />
        </div>

        <div class="input-field col s12">
          <div class="switch">
            <label>
              <input type="checkbox" v-model="order.orderActive" />
              <span>Make order active</span>
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div class="field center-align">
            <button class="btn amber darken-3">Update Order</button>
          </div>
        </div>
      </form>
    </div> -->
  </div>
</template>


<script>
import M from "materialize-css";
import db from "@/firebase/init";
import firebase from "firebase";


export default {
  name: "YourOrder",
  data() {
    return {
      order: null
    }
  },

  // methods: {
  //   EditCoffee() {
  //     console.log(this.order.drink);
  //     if (this.order.drink) {
  //       this.feedback = null;
  //       db.collection("orders")
  //         .doc(this.order.id)
  //         .update({
  //           drink: this.order.drink,
  //           size: this.order.size,
  //           extras: this.order.extras,
  //           other: this.order.other,
  //           orderActive: this.order.orderActive,
  //           orderTime: Date.now()
  //         })
  //         .then(() => {
  //           this.$router.push({ name: "Index" });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     } else {
  //       this.feedback = "You must add a coffee to your order";
  //     }
  //   }
  // },
  created() {
        console.log('created')
    
      let curUser = firebase.auth().currentUser.uid;
      console.log("curUser = ", curUser);
      //get the order from db
      db.collection("orders")
        .doc(id)
        .get()
        .then(doc => {
          // check if current user submitted the order
          // if (curUser == doc.data().orderedByID) {
              console.log(doc)
          // }
        })
  



    db.collection("orders")
      .doc(this.$route.params.order_slug)
      .get()
      .then(doc => {
        this.order = doc.data();
        this.order.id = doc.id;
      });
  },



  mounted() {
    M.AutoInit();
  }
}
</script>

<style>

</style>