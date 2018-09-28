
// let waiterAxios = require('js/waiter-axios.js')

 let waiter = waiterAxiosFunction()

  var app = new Vue({
    el: '#dayLoop',
    data: {
      user: {
        username: 'greg',
        days: []
      },
      day: []
    },
    mounted : function() {
        let self = this;
        waiter.getAllDays().then(function(results){
            self.day = results.data.data;
         })
    }
  })



