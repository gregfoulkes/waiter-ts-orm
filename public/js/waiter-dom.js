let waiter = waiterAxiosFunction()

Vue.component('login-error', {

  template: '<div  class="ui centered message"> <div class="header">Login Error</div><p>Please enter a valid username or password, or register.</p></div>'
})

var app = new Vue({
  el: '#WaiterApp',
  data: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    registerPassword: '',
    loggedIn: false,
    registerUser: false,
    days: [],
    selectedDays: []
  },

  mounted: function () {
    let self = this;

    document.addEventListener("DOMContentLoaded", function (event) {
      console.log("DOM fully loaded and parsed");
    });

    setTimeout(() => this.loginError = false, 3000);


    waiter.getAllDays().then(function (results) {
      self.days = results.data.data;
    });

    self.setUsername(location.hash);

    if (self.username != '') {
      waiter.waiterNameApiGetRoute(self.username).then(function (results) {
        let shiftData = results.data.shifts
        self.selectedDays = shiftData.shifts;
      })
    }

    window.addEventListener("hashchange", function () {
      self.setUsername(location.hash);
    });
  },

  computed: {

  },

  methods: {

    setShifts: function () {
      let self = this;
      let userShiftData = {
        username: self.username,
        days: self.selectedDays
      };

      return waiter.waiterNameApiPostRoute(userShiftData)
        .then(function (results) {
          waiter.waiterNameApiGetRoute(self.username)
            .then(function (results) {
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
        this.userAuthenticated = true
      } else {
        this.username = '';
        this.loggedIn = false;
      }
    },

    showRegisterUser() {
      this.registerUser = true;
    },

    isLoggedIn() {

      this.loggedIn = true;

    },

    // setDays() {
    
    //   return selectedDays
    
    // },

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