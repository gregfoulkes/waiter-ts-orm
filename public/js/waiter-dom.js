// let waiterAxios = require('js/waiter-axios.js')

let waiter = waiterAxiosFunction()

var app = new Vue({
  el: '#selectDays',
  data: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
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

    self.setUsername(location.hash);

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
        username: self.username,
        days: self.selectedDays
      };
      console.log(userShiftData)
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
      } else {
        this.username = '';
        this.loggedIn = false;
      }
    },

    login: function () {
      let self = this;
      let waiterName = self.username;
      let password = self.password

      let loginData = {
        username: waiterName,
        password: password
      }

      return waiter.waiterNameLoginApiRoute(loginData)
        .then(function (results) {
            let responseData = results.data;

            if (responseData.status === 'success') {
              let userData = responseData.data;

              console.log(userData)

              //set the location hash to equal the username of the logged in user
              location.hash = self.username;

              //store user data in vue data object 
              console.log(userData.firstname)
              self.username = userData.username
              self.firstname = userData.firstname
              self.lastname = userData.lastname
              self.email = userData.email
              self.position = userData.position

              //get user shifts if user exists
              waiter.waiterNameApiGetRoute(waiterName).then(function (results) {
                let shiftData = results.data.shifts
                self.selectedDays = shiftData.shifts;
              })

            }
        });


    },

    register: function () {



    },

    logout: function () {
      this.loggedIn = false;
      this.username = '';
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.password = '';
      this.selectedDays = [];
      location.hash = "";
    }

  }
})