
// let waiterAxios = require('js/waiter-axios.js')

 let waiter = waiterAxiosFunction()

  var app = new Vue({
    el: '#dayLoop',
    data: {
      user: {
        username: '',
        days: []
      },
      day: []
    },
    mounted : function() {
        let self = this;
        waiter.getAllDays().then(function(results){
            self.day = results.data.data;
         })
    },
    methods: {
      waiterNameInput(value) {
        this.inputData = value;
      }
    }
  })



