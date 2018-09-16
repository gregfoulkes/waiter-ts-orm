import * as assert from "assert";
import Waiter_Functions from "../src/waiter_webapp";
import {createConnection} from "typeorm";
import {Days} from "../src/entity/days";
import {Waiter} from "../src/entity/waiter";

import "reflect-metadata";

describe('Waiter-Webbapp-Function', function () {

  before(async function () {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "gregorybrianfoulkes",
      password: "",
      database: "waiter_webapp_test",
      "entities": [
        "src/models/**/*.ts"
    ]
    });
  });
  
  // it('should pass one test', function(){
  //   assert.equal('one', 'one');
  // });
  
  // it('should fail another', function(){
  //   assert.equal('one', 'two');
  // });

  // it('should input day names into the database', async function(){
    
  //   let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //   let allDays = []
  //   for (let i = 0; i < dayList.length; i++) {

  //       let days = new Days()
  //       days.day_name = 'Monday'
  //       await days.save();
  //       let gotDays = await Days.find({})
  //       allDays.push(gotDays)
  //   }
  //   assert.equal(7, allDays.length);

  // })

  it('should input day names into the database', async function(){
    
    // let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // let allDays = []
    // for (let i = 0; i < dayList.length; i++) {

        let waiterFunc = new Waiter_Functions()
        let gotDays = await waiterFunc.getWeekdays()
        //let allDays = gotDays.rows
    //}
    console.log(gotDays)
    assert.equal(gotDays, 
      [ { id: 1, day_name: 'Monday' },
       { id: 2, day_name: 'Tuesday' },
      { id: 3, day_name: 'Wednesday' },
       { id: 4, day_name: 'Thursday' },
       { id: 5, day_name: 'Friday' },
      { id: 6, day_name: 'Saturday' },
      { id: 7, day_name: 'Sunday' } ]
    );

  })
});
