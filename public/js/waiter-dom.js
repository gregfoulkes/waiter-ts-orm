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
        let shiftData = results.data.shifts
        self.selectedDays = shiftData.shifts;
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
      return waiter.waiterNameApiPostRoute(userShiftData)
        .then(function (results) {
          waiter.waiterNameApiGetRoute(self.username).then(function (results) {
            let shiftData = results.data.shifts
            self.selectedDays = shiftData.shifts;
          })
        })
    },

    setUsername: function (hash) {
      let parts = hash.split('#');
      if (parts.length === 2) {
        this.username = parts[1];
        this.loggedIn = true;
        console.log(this.loggedIn)
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

      return waiter.waiterNameLoginApiRoute(loginData)
        .then(function (results) {
          let userData = results.data
          console.log(userData.username)
          self.username = loginData.username
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