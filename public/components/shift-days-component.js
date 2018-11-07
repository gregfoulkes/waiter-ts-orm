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
    self = this;


    this.showDays();
    this.showUserShifts(self.waitername)
  },

  methods: {

    showDays: function () {
      // let self = this;
      waiter.getAllDays()
        .then((results) => {
          this.days = results.data.data;
          console.log('----Days-----')
          console.log(this.days)
          console.log('---------')

        });
    },

    showUserShifts: function (username) {
      console.log('---username---')
      console.log(username)
      return waiter.waiterNameApiGetRoute(username).then(function (results) {
        let shiftData = results.data.shifts

        console.log('---ShiftData---')
        console.log(shiftData)
        console.log('---------------')

        self.selectedDays = shiftData.shifts;

        console.log('---Selected Days----')
        console.log(self.selectedDays)
        console.log('--------------------')

      });
    },

    setShifts: function () {
      let self = this;
      let userShiftData = {
        username: self.waitername,
        days: self.selectedDays
      };

      console.log(userShiftData)

      return waiter.waiterNameApiPostRoute(userShiftData)
        .then(function (results) {
          waiter.waiterNameApiGetRoute(self.waitername)
            .then(function (results) {
              let shiftData = results.data.shifts
              self.selectedDays = shiftData.shifts;
            })
        })
    },

    logout: function () {

      this.$emit('loggedout')

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