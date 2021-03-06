let waiter = waiterAxiosFunction()

Vue.component('login-error', {

  template: '<div  class="ui centered message"> <div class="header">Login Error</div><p>Please enter a valid username or password, or register.</p></div>'
})

var app = new Vue({
  el: '#WaiterApp',
  data: {
    username: '',
    firstname: '',
    // lastname: '',
    // email: '',
    // position: '',
    // registerPassword: '',
    isAdmin: false,
    isWaiter: false,
    loginError: false,
    loggedIn: false,
    registerUser: false,
    // days: [],
    // selectedDays: []
  },

  mounted: function () {
    let self = this;

    document.addEventListener("DOMContentLoaded", function (event) {
      console.log("DOM fully loaded and parsed");
    });

    setTimeout(() => this.loginError = false, 3000);


    // waiter.getAllDays().then(function (results) {
    //   self.days = results.data.data;
    // });

    self.setUsername(location.hash);

    // if (self.username != '') {
    //   waiter.waiterNameApiGetRoute(self.username).then(function (results) {
    //     let shiftData = results.data.shifts
    //     self.selectedDays = shiftData.shifts;
    //   })
    // }

    window.addEventListener("hashchange", function () {
      self.setUsername(location.hash);
    });

    // self.$on('loggedIn', function(params){

    //   alert('Logged in');
    //   console.log(params);

    // });

  },

  computed: {

  },

  methods: {

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

    showAdmin() {
      let self = this;
      self.isAdmin = true;

      console.log(self.isAdmin)

    },

    isLoggedIn(loginData) {
      // alert('Wow!');

      if (loginData.loginState) {
        this.loggedIn = loginData.loginState;
        this.firstname = loginData.firstname;
        this.username = loginData.username;

        console.log('-----Username------')
        console.log(this.username)
        console.log('-----------')

        this.isWaiter = true

        //get user shifts if user exists
        // return waiter.waiterNameApiGetRoute(loginData.username)
        //   .then(function (results) {
        //     let shiftData = results.data.shifts
        //     console.log(shiftData)
        //     self.selectedDays = shiftData.shifts;

        //   })
      }
      if (loginData.errorStatus) {

        this.loggedIn = false
        this.loginError = true

      }
    },

    // isWaiter: function () {

    // },

    logoutUser:function() {
      this.loggedIn = false;
      this.isWaiter = false;
       this.username = '';
       this.firstname = '';
       location.hash = this.username
      // this.firstname = '';
      // this.lastname = '';
      // this.email = '';
      // this.password = '';
      // this.selectedDays = [];
      // location.hash = "";
    }
  }
})