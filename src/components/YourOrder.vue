<template>
  <div class="edit-order container">
    <!-- v-if="order" -->
    <h2 >Your Order</h2>
    <!-- <h2 v-if="isLoggedIn && this.vueRoot.orderData ">Add Order</h2> -->
    <div class="row">
      <form class="col s12 selectEdit" @submit.prevent="EditCoffee" id="yourOrder">
        <div class="input-field col s12">
        <!-- <Autocomplete/> -->
        </div>
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
            <option value="Other">Other (Juice / Tea - specify in text field)</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select v-model="order.size">
            <option value disabled>Size</option>
            <option value="Small" default selected>Small</option>
            <option value="Medium">Medium</option>
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
            <optgroup label="Sugar">
              <option value="1 sugar">1 sugar</option>
              <option value="2 sugars">2 sugars</option>
            </optgroup>
          </select>
        </div>

        <!-- <div class="input-field col s12">
          <select v-model="order.geo">
            <option value disabled default selected>GEO</option>
            <option value="BNE">Brisbane</option>
            <option value="SYD" >Sydney</option>
            <option value="MLB">Melbourne</option>
          </select>
        </div>-->

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
          <div class="field center-align">
            <button class="btn amber darken-3">Submit</button>
            <!-- <button class="btn amber darken-3" v-if="isLoggedIn && !vueRoot.orderData ">Add </button> -->
            <!-- <button class="btn amber darken-3" v-if="isLoggedIn && vueRoot.orderData ">Edit </button> -->
          </div>
        </div>
      </form>
      <div class="field center-align">
        <button class="btn red darken-3"  >Delete</button> 
        <!-- v-on:click="DeleteOrder" v-if="isLoggedIn && vueRoot.orderData" -->
      </div>
    </div>
  </div>
</template>


<script>
import M from "materialize-css";
import db from "@/firebase/init";
import firebase from "firebase";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Autocomplete from '@/components/AutoComplete'


export default {
  name: "YourOrder",
  components:{
    Autocomplete
  },
  data() {
    return {
      order: {
        drink: null,
        size: null,
        extras: [],
        other: null,
        geo: null
      }
    };
  },
  computed: {
    // Just to make referencing to variables cleaner
    vueRoot() {
      return this.$root;
    }
  },
  methods: {
    DeleteOrder() {
      let curUser = firebase.auth().currentUser.uid;
      db.collection("orders")
        .doc(curUser)
        .delete()
        .then(() => {
          this.$router.push({ name: "Index" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    EditCoffee() {
      let curUser = firebase.auth().currentUser.uid;
      if (this.order.drink) {
        this.feedback = null;
        db.collection("users")
          .doc(curUser)
          .update({
            drink: this.order.drink,
            size: this.order.size,
            extras: this.order.extras,
            other: this.order.other,
            geo: this.order.geo
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });

        db.collection("orders")
          .doc(curUser)
          .set({
            name: this.vueRoot.userData.name,
            drink: this.order.drink,
            size: this.order.size,
            extras: this.order.extras,
            other: this.order.other,
            geo: this.order.geo,
            //orderActive: this.order.orderActive,
            orderTime: Date.now()
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
  },

  mounted() {
    if (this.vueRoot.orderData !== undefined && this.vueRoot.orderData) {
      /* if (this.vueRoot.orderData.orderActive) {
        this.order.orderActive = this.vueRoot.orderData.orderActive;
      } */

      if (this.vueRoot.orderData.drink) {
        this.order.drink = this.vueRoot.orderData.drink;
      }

      if (this.vueRoot.orderData.size) {
        this.order.size = this.vueRoot.orderData.size;
      }

      if (this.vueRoot.orderData.extras) {
        this.order.extras = this.vueRoot.orderData.extras;
      }

      if (this.vueRoot.orderData.other) {
        this.order.other = this.vueRoot.orderData.other;
      }

      if (this.vueRoot.orderData.geo) {
        this.order.geo = this.vueRoot.orderData.geo;
      }
    } else {
      /* if (this.vueRoot.userData.orderActive) {
        this.order.orderActive = this.vueRoot.userData.orderActive;
      } */

      if (this.vueRoot.userData.drink) {
        this.order.drink = this.vueRoot.userData.drink;
      }

      if (this.vueRoot.userData.size) {
        this.order.size = this.vueRoot.userData.size;
      }

      if (this.vueRoot.userData.extras) {
        this.order.extras = this.vueRoot.userData.extras;
      }

      if (this.vueRoot.userData.other) {
        this.order.other = this.vueRoot.userData.other;
      }

      if (this.vueRoot.userData.geo) {
        this.order.geo = this.vueRoot.userData.geo;
      }
    }

    M.AutoInit();
    
  }
};



</script>