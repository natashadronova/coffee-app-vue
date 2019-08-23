<template>
  <div class="add-coffee container">
    <h2 class="center-align indigo-text">Order Coffee</h2>

    <div class="row">
      <form class="col s12">
        <div class="row"></div>
        <div class="input-field col s12">
          <select>
            <option value disabled selected>Coffee</option>
            <option value="Latte">Latte</option>
            <option value="Mocha">Mocha</option>
            <option value="Hot Chocolate">Hot Chocolate</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select>
            <option value disabled selected>Size</option>
            <option value="Small">Small</option>
            <option value="Medium" default>Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div class="input-field col s12">
          <select multiple>
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
          />
          <!-- <label for="first_name">Other:</label> -->
        </div>

        <div class="input-field col s12">
          <label>
            <input type="checkbox" class="filled-in" />
            <span>Save as default order?</span>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import M from "materialize-css";

export default {
  name: "AddOrder",
  data() {
    return {};
  },
  mounted() {
    M.AutoInit();
  }
};
</script>

<style>
</style>

