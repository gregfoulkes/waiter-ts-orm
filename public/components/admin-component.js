Vue.component('admin', {

    data: function () {
        return {
            //days: [],
            shifts: []
        }
    },

    mounted: function () {
        this.showAllShifts()
    },

    methods: {

        showAllShifts: function () {
            let self = this
            return waiter.getShiftsForDaysApiRoute()
                .then(function (result) {
                    self.shifts = result.data.data
                    console.log(self.shifts)
                })
        }

    },

    template: `

    <div class = 'ui eight column centered grid' >

        <div class='sixteen wide column'>
            <h1 style='width:100%; margin-top:10px' class="ui  black inverted header">
            Login
            </h1>
        </div>

        <div v-for="shift in shifts"> 

            <div class = 'two wide column'>{{shift.day}} </div>

                <div v-for="waiter in shift.waiters" > 

                <div class = 'two wide column'>{{waiter}} </div>

                </div>

            </div>
   

    </div>

   
    `
})