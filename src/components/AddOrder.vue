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
          <!-- <label for="first_name">Other:</label> -->
        </div>

        <div class="input-field col s12">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="defaultorder"/>
              <span>Save as default order?</span>
            </label>
          </p>
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
// import $ from 'jquery';
import M from "materialize-css";
import db from '@/firebase/init'

export default {
  name: "AddOrder",
  data() {
    return {
      drink:'',
      size:'',
      extras:[],
      other:'',
      defaultorder:''
    };
  },
  mounted() {
    M.AutoInit();
  },
  methods:{
    AddCoffee(){
      console.log(this.order)
      if (this.drink) {
        this.feedback=null
        db.collection('orders').add({
          drink:this.drink,
          size:this.size,
          extras:this.extras,
          other:this.other,
          defaultorder:this.defaultorder
        }).then(()=>{
          this.$router.push({name:'Index'})
        }).catch(err=>{
          console.log(err)
        })
      } else {
        this.feedback='You must add a coffee to your order'
      }
    }
  }
};
</script>

<style>
</style>

