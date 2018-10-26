// let waiterAxios = require('js/waiter-axios.js')

let waiter = waiterAxiosFunction()

Vue.component('login-error', {
  // props : ['msg'],
  // data: function () {
  //   return {
  //     count: 0
  //   }
  // },
  template: '<div  class="ui centered message"> <div class="header">Login Error</div><p>Please enter a valid username or password, or register.</p></div>'
})

Vue.component('registration', {

  template: `
  <div class='ui container'>

  <form class="ui form segment">

    <div class="two fields">

      <div class="field">
        <label>First Name</label>
        <input placeholder="First Name" name="firstname" type="text" v-model="firstname">
      </div>

      <div class="field">
          <label>Last Name</label>
          <input placeholder="Last Name" name="lastname" type="text" v-model="lastname">
        </div>

    </div>

    <div class="two fields">

      <div class="field">
        <label>Username</label>
        <input placeholder="Username" name="username" type="text" v-model="username">
      </div>

      <div class="field">
        <label>Password</label>
        <input type="password" name="password" v-model="password">
      </div>

    </div>

    <div class="two fields">

        <div class="field">
          <label>Email</label>
          <input placeholder="Email" name="email" type="text" v-model="email">
        </div>

        <div class="field">
          <label>Position</label>
          <input type="text" name="Position" v-model = "position">
        </div>

      </div>

    <div class="inline field">
      <div class="ui checkbox">
        <input type="checkbox" name="terms">
        <label>I agree to the terms and conditions</label>
      </div>
    </div>
    <button class=' ui button' v-on:click="submitRegistration">Submit</button>

    <!-- <div class="ui primary submit button">Submit</div> -->
    <div class="ui error message"></div>
  </form>

</div>
  `
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
    selectedDays: [],
    loginError: false

  },
  mounted: function () {
    let self = this;

    setTimeout(() => this.loginError = false, 3000);


    waiter.getAllDays().then(function (results) {
      self.days = results.data.data;
    });

    self.setUsername(location.hash);

    waiter.waiterNameApiGetRoute(self.username).then(function (results) {
      let shiftData = results.data.shifts
      self.selectedDays = shiftData.shifts;
    })
    // })

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
        console.log(this.userAuthenticated)
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
            self.loginError = false
            let userData = responseData.data;

            //set the location hash to equal the username of the logged in user
            location.hash = self.username;

            //store user data in vue data object 
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
          } else {
            self.loginError = true
          }
        });
    },

    submitRegistration: function () {

      let registerData = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.registerPassword,
        position: this.position
      }

      waiter.registerApiRoute(registerData)
        .then(function (results) {
          alert(results.data.register)
          if (results.data.register == false) {
            this.registerUser = false
            // this.loggedIn = false
          }
        })
    },

    register: function () {

      this.registerUser = true
      document.getElementById("myModal").style.display = "none";

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