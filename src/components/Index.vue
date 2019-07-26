<template>
<div class="index container">
  <table class="highlight responsive-table">
    <thead>
      <tr>
        <th>Order</th>
        <th>Size</th>
        <th>Extras</th>
        <th>Other</th>
        <th>Date Ordered</th>
        <th>Ordered by</th>
        <th>Edit / Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='order in orders' :key='order.id'>
        <td>{{order.drink}}</td>
        <td>{{order.size}}</td>
        <td >
          <span v-for='(extra,index) in order.extras' :key='index' class="chip extras">{{extra}}</span>
        </td>
        <td>{{order.other}}</td>
        <td>{{order.submitted}}</td>
        <td>{{order.ordered_by}}</td>
        <td><i class="material-icons">edit</i>  <i class="material-icons">delete</i></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: "Index",
  data() {
    return {
      orders: [
        {
          drink: "Chai Latte",
          size:'Large',
          extras:['Vanilla','Decaf'],
          other: '',
          slug: "chai-latte",
          submitted: '12/13/2018',
          ordered_by: 'Natasha Dronova',
          id: 1
        },
        {
          drink: "Chai Latte",
          size:'Large',
          extras:['Vanilla','Decaf'],
          other: '',
          slug: "chai-latte",
          submitted: '13/12/2018',
          id: 2,
          ordered_by:'NatDr'
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.extras{
  display: inline-block;

}
</style>
