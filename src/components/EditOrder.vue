<template>
  <div v-if="order" class="edit-order container">
    <h2>Edit Order</h2>
      <div class="row">
        <form class="col s12 selectEdit" @submit.prevent="EditCoffee">
          <!--  -->
          <div class="input-field col s12">
            <select v-model="order.drink" >
              <option value disabled selected>Coffee</option>
              <option value="Latte">Latte</option>
              <option value="Mocha">Mocha</option>
              <option value="Hot Chocolate">Hot Chocolate</option>
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
            <!-- <label for="first_name">Other:</label> -->
          </div>

          <div class="input-field col s12">
            <p>
              <label>
                <input type="checkbox" class="filled-in" v-model="order.orderActive" />
                <span>Save as default order?</span>
              </label>
            </p>
          </div>
          <div class="input-field col s12">
            <div class="field center-align">
              <button class="btn pink">Update Order</button>
            </div>
          </div>
        </form>
      </div>
  
  </div>
</template>


<script>
import M from "materialize-css";
import db from "@/firebase/init";


export default {
  name: "EditOrder",
  data() {
    return {
      order: null
    };
  },
  methods:{
    EditCoffee(){
      console.log(this.order.drink)
      if (this.order.drink) {
        this.feedback=null
        db.collection('orders').doc(this.order.id).update({
          drink:this.order.drink,
          size:this.order.size,
          extras:this.order.extras,
          other:this.order.other,
          orderActive:this.order.orderActive,
          orderTime:Date.now()
     
          // firebase.firestore.timestamp (to group based on time?)
        }).then(()=>{
          this.$router.push({name:'Index'})
        }).catch(err=>{
          console.log(err)
        })
      } else {
        this.feedback='You must add a coffee to your order'
      }
    }
  },
  created() {
    // M.AutoInit();
    // console.log(this.$route.params.order_slug);
    db.collection("orders")
      .doc(this.$route.params.order_slug)
      .get()
      .then(doc => {
        // console.log(doc.id);
        this.order = doc.data();
        this.order.id = doc.id;
      });
  },
    mounted() {
    M.AutoInit();
    // console.log('done')
  }
};
</script>

<style scoped>

/* otherwise this select is not appearing */
select {
  display:  inline-block;
}
</style>
