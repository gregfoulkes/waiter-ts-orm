import * as assert from "assert";
import Waiter_Functions from "../src/waiter_webapp";
import {createConnection} from "typeorm";
import {Days} from "../src/models/days-model";
import "reflect-metadata";

describe('Waiter-Webbapp-Function', function () {

  before(async function () {
    await createConnection({
      type: "postgres",
      host: "localhost",
      // port: 5008,
      username: "coder",
      password: "pg123",
      database: "waiter_webapp_test",
      "entities": [
        "src/models/**/*.ts"
    ],
    });

  
  it('should pass one test', function(){
    assert.equal('one', 'one');
  });
  
  // it('should fail another', function(){
  //   assert.equal('one', 'two');
  // });

  it('should input day names into the database', function(){
    let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //let allDays = []
    //for (let i = 0; i < dayList.length; i++) {

        let days = new Days()
        days.day_name = 'Monday'
        await days.save();
        let allDays = await Days.find({})
    //}
    assert.equal(1, allDays.length);

  })
});
