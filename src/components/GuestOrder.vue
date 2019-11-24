<template>
  <div class="edit-order container">
    <div class="container">
    <h2>GUEST ORDER</h2>
    <p>Ordering for someone else?</p>
    <p>By the way, currently you cannot delete guest orders through the app :) but... it's coming soon!</p>
    </div>
    <div class="row">
      <form class="col s12 selectEdit" @submit.prevent="EditCoffee" id="GuestOrder">
        <div class="input-field col s12 ">
          <input
            placeholder="Guest name"
            id="name"
            type="text"
            class="validate name-field"
            v-model="order.name"
          />
        </div>
        <!-- Drink -->
        <div class="input-field col s12">
          <multiselect v-model="order.drink" :options="options.drink"></multiselect>
        </div>

        <!-- Size -->
        <div class="input-field col s12">
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Small" checked><span class="check-style">Small</span></md-checkbox>
          </div>
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Medium"><span class="check-style">Medium</span></md-checkbox>
          </div>
          <div class="col s4">
            <md-checkbox v-model="order.size" value="Large" ><span class="check-style">Large</span></md-checkbox>
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
            class="validate name-field"
            v-model="order.other"
          />
        </div>

        <div class="input-field col s12">
          <div class="field center-align">
            <button class="btn brown darken-2 z-depth-0 brown-text text-lighten-4 submit-btn">Submit</button>
          </div>
        </div>
      </form>
      <div class="field center-align">
        <button class="btn red darken-3" v-on:click="DeleteOrder" v-if="exists">Delete</button>
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
  name: "GuestOrder",
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
          option: "Milk",
          types: [
            { name: "Soy" },
            { name: "Almond" },
            { name: "Skim" },
            { name: "Zymil" }
          ]
        },
        {
          option: "Topping",
          types: [
            { name: "Caramel" },
            { name: "Hazelnut" },
            { name: "Vanilla" }
          ]
        },
        {
          option: "Sugar",
          types: [{ name: "1 Sugar" }, { name: "2 Sugars" }]
        },
        {
          option:"Cold Coffee",
          types:[{name:"Iced"}]
        },
        {
          option: "Strength",
          types: [{ name: "Decaf" }, { name: "Extra shot" }]
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

      let extras = this.order.extras.map(item => {
        return item["name"];
      });
      extras = _.orderBy(extras, [extras => extras.toLowerCase()], ["asc"]);
      console.log(extras);
      db.collection("orders")
        .doc(this.order.name)
        .set({
          name: this.order.name + " (guest)",
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
    }
  },

  mounted() {
 
    M.AutoInit();

    console.log(this.vueRoot.isLoggedIn);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" ></style>
<style>
/* text */
h2 {
  color:#402C30 !important;
  font-family: "Raleway", sans-serif;
  text-align: center;
  padding-top: 20px;
}

p {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  font-size: 1.1em;
  color:#402C30 !important;
}

.submit-btn{
  font-family: "Open Sans", sans-serif;
  font-size:1.2em;
}

/* form */
.edit-order {
background-color: #d7ccc8  !important;
border-radius: 5px;
}

.name-field {
  padding: 40px;
}

.name-field::placeholder {
  color:#402C30;
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  padding-left: 20px;
}

.check-style{
  color: #402C30;
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  font-size: 1.2em;
}

.multiselect__tag {
  background-color:#d7ccc8;
  color: #402C30;
  font-style: italic;
  font-family: "Open Sans", sans-serif;

}
.multiselect__placeholder  {
  color: #402C30;
  font-family: "Open Sans", sans-serif;
}

.multiselect__option {
  color: #402C30;
  font-family: "Open Sans", sans-serif;
}


 .multiselect__option--selected {
    background: #402C30;
    color: #d7ccc8 ;
    font-weight: bold;
 }

/* inside multiselect menu, which color will the options appear */
.multiselect__option--selected.multiselect__option--highlight {
  background-color: #402C30;
  color: #d7ccc8;
  font-family: "Open Sans", sans-serif;
}

.namefield{
  color: red;
}
.input-field textarea {
  color:red;
}


 /* free text fields styling*/
 .row .input-field input:focus {
   border-bottom: 1px solid #617C38 !important;
   box-shadow: 0 1px 0 0 #617C38 !important;
   color: #402C30;
   font-family: "Open Sans", sans-serif;
   font-style: italic;
   /* padding-left: 20px; */
 } 

 .row .input-field input {
   color: #402C30;
   font-family: "Open Sans", sans-serif;
   font-style: italic;
   /* padding-left: 20px; */
   border-bottom: 1px solid #402C30 !important;
   box-shadow: 0 1px 0 0 #402C30 !important;
 } 

</style>

