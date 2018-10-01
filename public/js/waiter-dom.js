
// let waiterAxios = require('js/waiter-axios.js')

 let waiter = waiterAxiosFunction()

  // Vue.component('list-of-days', {
  //   data: function() {
  //     return{ user: {
  //       username: '',
  //       days: []
  //     },
  //     day: []
  //   }
  // },
  //   mounted : function() {
  //       let self = this;
  //       waiter.getAllDays().then(function(results){
  //           self.day = results.data.data;
  //       })
  //   },
  //   methods: {
  //     waiterNameInput(value) {
  //       this.inputData = value;
  //     }
  //   } 
  // })

  var app = new Vue({
    el: '#dayLoop',
    data: {
      username : '',
      loggedIn : false,
      days : [],
      selectedDays : [],

      // user: {
      //   username: '',
      //   days: [],
      // },

      // day: []
    },
    mounted : function() {
        let self = this;

        waiter.getAllDays().then(function(results){
            self.days = results.data.data;
        });

        this.setUsername(location.hash);
        
        window.addEventListener("hashchange", function() {
          self.setUsername(location.hash);
        });


    },
    methods: {
      waiterNameInput(value) {
        this.inputData = value;
      },
      waiterShifts : function() {
        let waiterName = this.username;
        return axios.get();
      },
      setShifts : function() {

        let userShiftData = {
          username : this.username,
          shiftDays : this.selectedDayIds
        };

        alert('set!');
      },
      setUsername : function(hash) {
        let self = this; 
        let parts = hash.split('#');
        if (parts.length === 2) {
          this.username = parts[1];
          this.loggedIn = true;

          // this.waiterShifts()
          //   .then(function() {

          //   });

        }
        else {
          this.username = '';
          this.loggedIn = false;
        }
      },
      login : function() {
        location.hash = this.username
      },
      logout: function() {
        this.loggedIn = false;
        this.username = '';
        location.hash="";
      }

    }
  })



