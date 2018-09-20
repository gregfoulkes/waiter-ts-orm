import * as assert from "assert";
import WaiterFunction from "../src/waiter_webapp";
import {createConnection, Connection} from "typeorm";
import { Day } from "../src/entity/Day";
import {Waiter} from "../src/entity/Waiter";
import {Shift} from "../src/entity/Shift";

import "reflect-metadata";
// import { constants } from "zlib";

describe('Waiter-Webbapp-Function', function () {

  let connection: Connection;

  before(async function () {

      try {
          connection = await createConnection({
            "name": "default",
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "coder",
            "password": "1234",
            "database": "waiter_webapp_test",
            "synchronize": true,
            "logging": false,
            "entities": [
                 "src/entity/**/*.ts"
            ],
            "migrations": [
                "src/migration/**/*.ts"
            ],
            "subscribers": [
                "src/subscriber/**/*.ts"
            ],
            "cli": {
                "entitiesDir": "src/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            }
        });

        const days = await Day.find({})
        const waiter = await Waiter.find({})
        const shift = await Shift.find({})
        await Shift.remove(shift);

        await Day.remove(days);
        await Waiter.remove(waiter) 
      }
      catch(err) {
          console.log(err);
      }
  

 });

  after(function() {
    connection.close();
  })

  it('should input day names into the database and return the days', async function () {

    let waiterFunc = new WaiterFunction()
    await waiterFunc.addWeekdays()

    let gotDays: any | Day[] = await waiterFunc.getWeekdays()
    let dayList = []
    for (let i = 0; i < gotDays.length; i++) {
      dayList.push(gotDays[i].dayname)
    }
    assert.deepEqual(dayList,
      ['Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday']
    );
  })

  it('should input a list of waiter names into the database and return the days', async function () {

    let waiterFunc = new WaiterFunction()
    await waiterFunc.insertWaiters()

    let waiterrepo = new Waiter()
 
    let result: any | Waiter[] = await waiterFunc.getWaiters()

    let waiterList = []

    for (let i = 0; i < result.length; i++) {
      waiterList.push(result[i].fullname)
    }

    assert.deepEqual(waiterList, [
      'Greg Foulkes' ,
      'Ayabonga Booi' ,
      'Luvuyo Sono' ,
      'Aviwe Mbekeni' 
    ]);
  })

  it('should input a waiter name and user name into the database and return the days', async function () {

    let waiterFunc = new WaiterFunction()
    
    let result = await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})

    assert.equal('gregfoulkes', result.username);
    assert.equal('Greg Foulkes', result.fullname);
    assert.equal('waiter', result.position);

  })

  it ('Should return all the shifts', async function () {
    let waiterFunc = new WaiterFunction()

    await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})
    
    await waiterFunc.assignShift('Greg Foulkes', 'Monday')

    // const days = await Day.find({})
    // const waiter = await Waiter.find({})
    // const shift = await Shift.find({})
    
    let allShifts = await Shift.find({})
    //let allWaiters = await Waiter.find({})

    //let allShifts: any | Shift[] = await waiterFunc.getShifts()
    console.log(allShifts)
    assert.deepEqual(allShifts,[{id:allShifts[0].id
  }])
  })

});


