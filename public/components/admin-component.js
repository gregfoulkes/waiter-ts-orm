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

    <div class = 'ui seven centered column grid' >

        <div v-for="shift in shifts"> 

            <div class = 'column'>{{shift.day}} </div>

                <div v-for="waiter in shift.waiters" > 

                <div class = 'column'>{{waiter}} </div>

                </div>

            </div>
   
        < /div>

    </div>
   
    `
})