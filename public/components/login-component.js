Vue.component('login', {

  data: function () {
    return {
      username: '',
      password: '',
      loginError: false,
      loginStatus: {}
    }
  },

  methods: {

    login: function () {

      let loginData = {
        username: this.username,
        password: this.password
      }

      var self = this;
      //console.log(loginData)
      return waiter.waiterNameLoginApiRoute(loginData)
        .then(function (results) {

          let responseData = results.data;
          //console.log(responseData)
          if (responseData.status === 'success') {

            let userData = responseData.data;
            //console.log(userData)
            if (!userData) {

              self.loginError = true
              alert('Enter a valid username or password')

              this.loginStatus = {
                logginState: false,
                errorStatus: self.loginError
              }

              self.$emit('loggedin', loginStatus);

            } else {

              //set the location hash to equal the username of the logged in user

              this.username = userData.username
              location.hash = this.username;

              this.loginStatus = {
                username: this.username,
                firstname: userData.firstname,
                loginState: true,
                errorStatus: self.loginError
              }

              //console.log(this.loginStatus)

              self.$emit('loggedin', loginStatus);
              //this.isWaiter = true
            }

          }
        });
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

          <button class="ui inverted black button" v-on:click="login" >Login</button>

        </div>

        <div class='column'>
          

          <button class="ui inverted black button" v-on:click="$emit('register')" >Register</button>

        </div>

        <div class='column'>
          

        <button class="ui inverted black button" v-on:click="$emit('admin')" >Admin</button>

      </div>

      </div>

    </div>

    <login-error v-if="loginError" ></login-error>

  </div>
    `
})