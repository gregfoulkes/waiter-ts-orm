
// let waiterAxios = require('js/waiter-axios.js')

 let waiter = waiterAxiosFunction()

  var app = new Vue({
    el: '#dayLoop',
    data: {
      username : '',
      fullname:'',
      position:'waiter',
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
  
      // waiterShifts : function() {
      //   let self = this;
      //   let waiterName = this.username;
      //   return waiterFunc.waiterNameApiGetRoute(waiterName).then(function(results){
      //     self.selectedDays = results.data.shifts
      //   })
      // },

      setShifts : function() {

        let userShiftData = {
          username : this.username,
          days : this.selectedDays
        };

        alert('set!');

          return waiter.waiterNameApiPostRoute(userShiftData)
          .then(function(results){
            alert('post: ' + results.data);

            //console.log(results)       
        })

       

      },
      
      setUsername : function(hash) {
        let self = this; 
        let parts = hash.split('#');
        if (parts.length === 2) {
          this.username = parts[1];
          this.loggedIn = true;

          // this.waiterNameApiGetRoute()
          // .then(function(result){ 
          //   alert(result)
          // })

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
        location.hash = this.username;
        let self = this;
        let waiterName = this.username;
        console.log(waiterName)
        return waiter.waiterNameApiGetRoute(waiterName).then(function(results){
          self.selectedDays = results.data.shifts
        })
      },

      logout: function() {
        this.loggedIn = false;
        // this.username = '';
        // this.selectedDays = [];
        location.hash="";
      }

    }
  })



