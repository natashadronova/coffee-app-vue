<template>
  <div class="edit-order container">
    <!-- v-if="order" -->
    <h2>Your Order</h2>
    <p v-if="exists">You have already submitted your order.</p>
    <!-- <h2 v-if="isLoggedIn && this.vueRoot.orderData ">Add Order</h2> -->
    <div class="row">
      <form class="col s12 selectEdit" @submit.prevent="EditCoffee" id="yourOrder">
        <!-- Drink -->
        <div class="input-field col s12">
          <multiselect v-model="order.drink" :options="options.drink"></multiselect>
        </div>

        <!-- Size -->
        <div class="input-field col s12">
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Small" checked>Small</md-checkbox>
          </div>
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Medium">Medium</md-checkbox>
          </div>
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Large">Large</md-checkbox>
          </div>
        </div>
        <!-- Milk -->
        <div class="input-field col s12">
          <div>
            <multiselect
              v-model="order.extras"
              :options="extras"
              :multiple="true"
              group-values="types"
              group-label="option"
              :group-select="true"
              placeholder="Extras"
              track-by="name"
              label="name"
            >
              <span slot="noResult">Oops! No extras found</span>
            </multiselect>
          </div>
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
          <div class="field center-align">
            <button class="btn amber darken-3">Submit</button>
            <!-- <button class="btn amber darken-3" v-if="isLoggedIn && !vueRoot.orderData ">Add </button> -->
            <!-- <button class="btn amber darken-3" v-if="isLoggedIn && vueRoot.orderData ">Edit </button> -->
          </div>
        </div>
      </form>
      <div class="field center-align">
        <button
          class="btn red darken-3"
          v-on:click="DeleteOrder"
          v-if="exists"
        >Delete</button>
        <!-- v-on:click="DeleteOrder" v-if="isLoggedIn && vueRoot.orderData" -->
      </div>
    </div>
  </div>
</template>


<script>
import M from "materialize-css";
import db from "@/firebase/init";
import firebase from "firebase";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";
import Multiselect from "vue-multiselect";
import _ from "lodash";

export default {
  name: "YourOrder",
  components: {
    // Autocomplete,
    Multiselect
  },
  data() {
    return {
      order: {
        drink: "",
        size: null,
        milk: null,
        extras: [],
        extras_list: null,
        other: null,
        geo: null
      },
      exists: false,
      options: {
        drink: [
          "Mocha",
          "Latte",
          "Hot Chocolate",
          "Flat White",
          "Long Black",
          "Chai Latte",
          "Dirty Chai Latte",
          "Piccolo",
          "Cappucino",
          "Orange Juice",
          "Other"
        ]
      },
      extras: [
        {
          option: "milk",
          types: [
            { name: "Soy" },
            { name: "Almond" },
            { name: "Skim" },
            { name: "Zymil" }
          ]
        },
        {
          option: "strength",
          types: [{ name: "Decaf" }, { name: "Extra shot" }]
        },
        {
          option: "topping",
          types: [
            { name: "Caramel" },
            { name: "Hazelnut" },
            { name: "Vanilla" }
          ]
        },
        {
          option: "sugar",
          types: [{ name: "1 Sugar" }, { name: "2 Sugars" }]
        }
      ]
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
      console.log(this.choice);
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
        let extras = this.order.extras.map(item => {
          return item["name"];
        });
        extras = _.orderBy(extras, [extras => extras.toLowerCase()], ["asc"]);
        console.log(extras);
        db.collection("orders")
          .doc(curUser)
          .set({
            name: this.vueRoot.userData.name,
            drink: this.order.drink,
            size: this.order.size,
            extras_list: extras, // for multiselect
            extras: this.order.extras, //list of items, readable
            other: this.order.other,
            geo: this.order.geo,

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
  created() {},
  mounted() {
    // console.log(isLoggedIn)
    console.log(this.vueRoot);
    if (this.vueRoot.orderData !== undefined && this.vueRoot.orderData) {
      /* if (this.vueRoot.orderData.orderActive) {
        this.order.orderActive = this.vueRoot.orderData.orderActive;
      } */

      if (this.vueRoot.orderData.drink) {
        this.order.drink = this.vueRoot.orderData.drink;
        this.exists=true
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

    console.log(this.vueRoot.isLoggedIn);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

