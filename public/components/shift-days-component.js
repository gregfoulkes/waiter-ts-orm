Vue.component('shifts', {
  props: ['waitername'],
  data: function () {

    return {
      days: [],
      selectedDays: []
    }
  },

  computed: {
    // ?  
  },

  mounted: function () {
    // self = this;
    console.log(this.waitername)
    this.showDays();
    this.showUserShifts(this.waitername)
  },

  methods: {

    showDays: function () {
      waiter.getAllDays().then(function (results) {
        self.days = results.data.data;
        console.log(self.days)
      });
    },

    showUserShifts: function (username) {
      waiter.waiterNameApiGetRoute(username).then(function (results) {
        let shiftData = results.data.shifts
        console.log(shiftData)

        self.selectedDays = shiftData.shifts;
      });
    },

    setShifts: function () {

    },

    logout: function () {

      this.$emit('loggedout')
      //this.loggedIn = false;

      // this.username = '';
      // this.firstname = '';
      // this.lastname = '';
      // this.email = '';
      // this.password = '';
      // this.selectedDays = [];
      // location.hash = "";
    }

  },

  template: `
    <div>

    <div class="ui one column grid">

      <div class="column">

        <div class="ui segment">
          <h1 class="ui center aligned header">
            Select the days you would like to work
          </h1>
        </div>

      </div>

    </div>

    <div class='ui container'>

      <div class='ui center aligned stackable eight column  grid'>
        <!-- </div> -->

        <div v-for="day in days" :key="days.id" class='column'>
          <label style='width:80px;' class=" addMargins ui label">{{day.dayname}}</label>
          <input class='addMargins' type="checkbox" v-model="selectedDays" :value="day.id" />
        </div>

      </div>

      <div class='ui center aligned stackable one column grid'>

        <div class='  column'>
          <button style='width:100px;' class='addMargins ui button' type='submit' v-on:click="setShifts">Set shifts</button>
        </div>

        <div class=' column'>
          <button class=' ui button' v-on:click="logout">Logout</button>
        </div>

      </div>

    </div>


    </div>
    
    
    `

})