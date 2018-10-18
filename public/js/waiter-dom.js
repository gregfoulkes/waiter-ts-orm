// let waiterAxios = require('js/waiter-axios.js')

let waiter = waiterAxiosFunction()

var app = new Vue({
  el: '#dayLoop',
  data: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    position: '',
    loggedIn: false,
    days: [],
    selectedDays: []
  },
  mounted: function () {
    let self = this;

    waiter.getAllDays().then(function (results) {
      self.days = results.data.data;
    });

    this.setUsername(location.hash);

    window.addEventListener('load', function () {

      waiter.waiterNameApiGetRoute(self.username).then(function (results) {
        // console.log(results.data)
        let shiftData = results.data.shifts
        self.selectedDays = shiftData.shifts;
        // console.log(shiftData.shifts)

      })

    })

    window.addEventListener("hashchange", function () {
      self.setUsername(location.hash);
    });
  },

  methods: {

    setShifts: function () {
      let self = this;

      let userShiftData = {
        username: this.username,
        days: this.selectedDays
      };
      //console.log(userShiftData)
      return waiter.waiterNameApiPostRoute(userShiftData)
        .then(function (results) {
          //console.log(results)
          //console.log(self.username)
          waiter.waiterNameApiGetRoute(self.username).then(function (results) {
            let shiftData = results.data.shifts
            console.log(results.data.shifts)

            self.selectedDays = shiftData.shifts;
          })
        })
    },

    setUsername: function (hash) {
      let self = this;
      let parts = hash.split('#');
      if (parts.length === 2) {
        this.username = parts[1];
        this.loggedIn = true;
      } else {
        this.username = '';
        this.loggedIn = false;
      }
    },

    // login: function () {
    //   location.hash = this.username;
    //   let self = this;
    //   let waiterName = self.username;
    //   return waiter.waiterNameApiGetRoute(waiterName).then(function (results) {
    //     let shiftData = results.data.shifts
    //     self.selectedDays = shiftData.shifts;
    //   })
    // },  

    login: function () {
      location.hash = this.username;
      let self = this;
      let waiterName = self.username;
      let password = this.password

      let loginData = {
        username: waiterName,
        password: password
      }
      console.log(loginData)
      return waiter.waiterNameLoginApiRoute(loginData)
        .then(function (results) {
          console.log(results)
          let userData = results.data
          self.username = userData.username
          self.firstname = userData.firstname
          self.lastname = userData.lastname
          self.email = userData.email
          self.password = userData.password
          self.position = userData.position

          waiter.waiterNameApiGetRoute(waiterName).then(function (results) {
            let shiftData = results.data.shifts
            self.selectedDays = shiftData.shifts;
          })
        })
    },

    register: function () {



    },

    logout: function () {
      this.loggedIn = false;
      this.username = '';
      this.selectedDays = [];
      location.hash = "";
    }

  }
})