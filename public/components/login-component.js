

Vue.component('login', {

  // props: ['username'],
  data: function () {
    return {
      username: '',
      password: '',
      loginError: false,
    }
  },

  methods: {

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

    register: function () {

      this.registerUser = true
      document.getElementById("myModal").style.display = "none";

    },

  },

  template: `

    <div id="myModal" class="modal">

    <div class='ui center aligned three column grid'>

      <div class='sixteen wide column'>
        <h1 style='width:100%; margin-top:10px' class="ui  black inverted header">
          Login
        </h1>
      </div>
    </div>


    <div class=' ui container'>

      <div class="  ui center aligned  stackable one column grid">

        <div class="column">
          <div class="ui labeled inverted input">
            <div class="ui label">
              Username
            </div>
            <input class="ui input" type="text" v-model="username" />
          </div>

        </div>

        <div class="column">

          <div class="ui labeled inverted input">
            <div class="ui label">
              Password
            </div>
            <input class="" type="password" v-model="password" />
          </div>

        </div>

      </div>

      <div class='ui center aligned stackable one column grid'>


        <div class='column'>
          <button class="ui inverted black button" v-on:click="login ">Login</button>
        </div>

        <div class='column'>
          <button class="ui inverted black button" v-on:click="register" >Register</button>
          
        </div>

      </div>

    </div>

    <login-error v-if="loginError" ></login-error>

  </div>
    `
})