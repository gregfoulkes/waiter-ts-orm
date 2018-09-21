import * as assert from "assert";
import WaiterFunction from "../src/waiter_webapp";
import {createConnection, Connection} from "typeorm";
import { Day } from "../src/entity/Day";
import {Waiter} from "../src/entity/Waiter";
import {Shift} from "../src/entity/Shift";

import "reflect-metadata";
// import { constants } from "zlib";
let waiterFunc = new WaiterFunction()

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
        // const waiter = await Waiter.find({})
        // const shift = await Shift.find({})
        // await Shift.remove(shift);

         //await Day.remove(days);
        // await Waiter.remove(waiter) 
      }
      catch(err) {
          console.log(err);
      }
  

 });

 beforeEach(async function(){

  const days = await Day.find({})
  const waiter = await Waiter.find({})
  const shift = await Shift.find({})
  await Shift.remove(shift);

   await Day.remove(days);
  await Waiter.remove(waiter) 
  await waiterFunc.addWeekdays()

 })

  after(function() {
    connection.close();
  })

  it('should input day names into the database and return the days', async function () {

    let gotDays: Day[] = await waiterFunc.getWeekdays()

    let daymap = gotDays.map( day => day.dayname);

    assert.deepEqual(daymap,
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

    await waiterFunc.insertWaiters()

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
    
    let result = await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})

    assert.equal('gregfoulkes', result.username);
    assert.equal('Greg Foulkes', result.fullname);
    assert.equal('waiter', result.position);

  })

  it ('Should return the name and day of all the shifts', async function () {

    await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})
    
    await waiterFunc.assignShift('Greg Foulkes', 'Monday')
    
    let allShifts = await waiterFunc.getShifts()

    let shiftList = []
    for (let list of allShifts){

      shiftList.push({dayname:list.weekday.dayname,
      fullname:list.waiter.fullname
      })

    }
     assert.deepEqual(shiftList, [{dayname: 'Monday', fullname:'Greg Foulkes'}])

  })

  it ('Should take in the name of a waiter and return thier shifts', async function () {

    await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})
    
    await waiterFunc.assignShift('Greg Foulkes', 'Monday')
    await waiterFunc.assignShift('Greg Foulkes', 'Tuesday')
    await waiterFunc.assignShift('Andrew Monamodi', 'Wednesday')

    let allShifts = await waiterFunc.getShift('Greg Foulkes')

    let shiftList = []
    for (let list of allShifts){

      shiftList.push({dayname:list.weekday.dayname,
      fullname:list.waiter.fullname
      })

    }

    console.log(allShifts)
     assert.deepEqual(shiftList, [{dayname: 'Monday', fullname:'Greg Foulkes'},
     {dayname: 'Tuesday', fullname:'Greg Foulkes'}])

  })
});


