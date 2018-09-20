import * as assert from "assert";
import WaiterFunction from "../src/waiter_webapp";
import {createConnection} from "typeorm";
import { Day } from "../src/entity/Day";
import {Waiter} from "../src/entity/Waiter";
import "reflect-metadata";
// import { constants } from "zlib";

describe('Waiter-Webbapp-Function', function () {

  before(async function () {

      try {
          await createConnection({
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
      }
      catch(err) {
          console.log(err);
      }
  

 });

  it('should input day names into the database and return the days', async function () {

    let waiterFunc = new WaiterFunction()
    await waiterFunc.clearDays()
    await waiterFunc.addWeekdays()

    let gotDays: any | Day[] = await waiterFunc.getWeekdays()
    let dayList = []
    for (let i = 0; i < gotDays.length; i++) {
      dayList.push(gotDays[i].day_name)
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
    await waiterFunc.clearWaiters()
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
});


