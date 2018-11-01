Vue.component('registration', {

  data: function () {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      position: '',
      registerPassword: ''
    }
  },
  
  methods: {

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
    }

  },

  template: `
    <div class='ui container' style="z-index:2;">
  
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
          <input type="text" name="password" v-model="password">
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