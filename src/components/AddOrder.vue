<template>
  <div class="add-coffee container">
    <h2 class="center-align pink-text">Order Coffee</h2>

    <div class="row">
      <form class="col s12" @submit.prevent="AddCoffee">
        <div class="row"></div>
        <div class="input-field col s12">
          <select v-model="drink">
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
          <select v-model="size">
            <option value disabled selected>Size</option>
            <option value="Small">Small</option>
            <option value="Medium" default>Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select multiple v-model="extras">
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
            v-model="other"
          />
        </div>

        <div class="input-field col s12">
          <div class="switch">
            <label>
              <input type="checkbox" v-model="orderActive" />
              <span>Make order active</span>
            </label>
          </div>
        </div>
        <div class="input-field col s12">
          <div class="field center-align">
            <button class="btn pink">Add Order</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "AddOrder",
  data() {
    return {
      drink: "",
      size: "",
      extras: [],
      other: "",
      orderActive: false,
      orderTime: null,
      orderedBy:  '',
      orderedByID:''
    };
  },
  mounted() {
    M.AutoInit();
  },

  created() {
     // gets uid of current user
      let curUser = firebase.auth().currentUser.uid 
      //query users collection to get user's name
      db.collection("users").doc(curUser).get().then((doc)=>{
        this.orderedBy = doc.data().name
        this.orderedByID = curUser
        });
      
  },

  methods: {
    AddCoffee() {
      if (this.drink) {
        this.feedback = null;
        db.collection("orders")
          .add({
            drink: this.drink,
            size: this.size,
            extras: this.extras,
            other: this.other,
            orderActive: this.orderActive,
            orderedBy: this.orderedBy,
            orderTime: Date.now(),
            orderedByID:this.orderedByID
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must add a coffee to your order";
      }
    }
  }
};
</script>

<style>
</style>

