<template>
  <div>
    <md-autocomplete v-model="drink" :md-options="drinks">
      <label>Drink</label>
    </md-autocomplete>

    <!-- <md-autocomplete v-model="selectedEmployee" :md-options="employees" md-dense>
      <label>Employees</label>
    </md-autocomplete> -->
  </div>
  
</template>

<script>
import VueMaterial from 'vue-material';
import Vue from 'vue'
// Vue.use(VueMaterial)
  export default {
    name: 'Autocomplete',
    
    data: () => ({
      drink: null,
      selectedEmployee: null,
      drinks: [
        'Latte',
        'Mocha',
        'Hot Chocolate',
        'Flat White',
        'Long Black',
        'Chai Latte',
        'Dirty Chai Latte',
        'Piccolo',
        'Cappucino',
        'Other (Juice / Tea - specify in text field)',
      ],
      employees: [
        'Jim Halpert',
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Angela Martin',
        'Kelly Kapoor',
        'Ryan Howard',
        'Kevin Malone',
        'Creed Bratton',
        'Oscar Nunez',
        'Toby Flenderson',
        'Stanley Hudson',
        'Meredith Palmer',
        'Phyllis Lapin-Vance'
      ]
    })
  }
</script>