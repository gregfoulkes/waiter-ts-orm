import * as assert from "assert";
import WaiterFunction from "../src/services/waiter_webapp";
import { createConnection, Connection, getRepository } from "typeorm";
import { Day } from "../src/entity/Day";
import { Waiter } from "../src/entity/Waiter";
import { Shift } from "../src/entity/Shift";

import "reflect-metadata";

let waiterFunc = new WaiterFunction()

describe('Waiter-Webbapp-Function', function () {

  let connection: Connection;

  before(async function () {

    try {
      let connectionUrl = process.env.DB || "postgresql://coder:1234@localhost:5432/waiter_webapp_test"
      connection = await createConnection({
        "name": "default",
        "type": "postgres",
        "url": connectionUrl,
        // "host": "localhost",
        // "port": 5432,
        // "username": "coder",
        // "password": "1234",
        // "database": "waiter_webapp_test",
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
    catch (err) {
      console.log(err);
    }


  });

  beforeEach(async function () {

    const days = await Day.find({})
    const waiter = await Waiter.find({})
    const shift = await Shift.find({})
    await Shift.remove(shift);

    await Day.remove(days);
    await Waiter.remove(waiter)
    await waiterFunc.addWeekdays()

  })

  after(async function () {

    // const waiter = await Waiter.find({})
    // const shift = await Shift.find({})
    // await Shift.remove(shift);

    // await Waiter.remove(waiter)
    connection.close();
  })

  it('should input day names into the database and return the days', async function () {

    let gotDays: Day[] = await waiterFunc.getWeekdays()

    let daymap = gotDays.map(day => day.dayname);

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
      'Greg Foulkes',
      'Ayabonga Booi',
      'Luvuyo Sono',
      'Aviwe Mbekeni'
    ]);
  })

  it('should input a waiter name and user name into the database and return the days', async function () {

    let result = await waiterFunc.insertWaiter({ userName: 'gregfoulkes', fullName: 'Greg Foulkes', position: 'waiter' })

    assert.equal('gregfoulkes', result.username);
    assert.equal('Greg Foulkes', result.fullname);
    assert.equal('waiter', result.position);

  })

  it('Should return the name and day of all the shifts', async function () {

    let day = new Day

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }

    await waiterFunc.insertWaiter({ userName: 'gregfoulkes', fullName: 'Greg Foulkes', position: 'waiter' })

    await waiterFunc.assignShift(shiftData)

    let allShifts = await waiterFunc.getShifts()

    let shiftList = []
    for (let list of allShifts) {
      shiftList.push({
        dayname: list.weekday.dayname,
        username: list.waiter.username
      })

    }

    assert.deepEqual(shiftList, [
      { dayname: 'Monday', username: 'gregfoulkes' },
      { dayname: 'Tuesday', username: 'gregfoulkes' }])

  })

  it('Should take in the name of a waiter and return thier shifts', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }
    let shiftData2 = { username: 'andrew', days: [foundId3.id] }

    await waiterFunc.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterFunc.insertWaiter({
      userName: 'andrew',
      fullName: 'Andrew Monamodi',
      position: 'waiter'
    })

    await waiterFunc.assignShift(shiftData)
    await waiterFunc.assignShift(shiftData2)


    let allShifts = await waiterFunc.getShiftByUserName('gregfoulkes')
    assert.equal(2, allShifts.shifts.length)

  })

  it('should update the days of a waiters shifts', async function () {

    let day = new Day

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }
    let shiftData2 = { username: 'gregfoulkes', days: [foundId1.id, foundId3.id] }

    await waiterFunc.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterFunc.assignShift(shiftData)
    await waiterFunc.updateShiftsByUserName(shiftData2)
    let allShifts = await waiterFunc.getShiftByUserName('gregfoulkes')

    assert.equal(2, allShifts.shifts.length)

  })

  it('Should get all days and the names of the waiters working on them', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }

    let shiftData2 = { username: 'andrew', days: [foundId1.id, foundId3.id] }

    await waiterFunc.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterFunc.insertWaiter({
      userName: 'andrew',
      fullName: 'Andrew Monamodi',
      position: 'waiter'
    })

    await waiterFunc.assignShift(shiftData)

    await waiterFunc.assignShift(shiftData2)


    let allShifts = await waiterFunc.getWeekdayShifts();

    //console.log(allShifts)



    // waiterFunc.getDaysAndNames()
  })


  it('Should add a waiters shifts and then clear them while returning an empty list', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }
    let shiftData2 = { username: 'gregfoulkes', days: [foundId1.id, foundId3.id] }

    await waiterFunc.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterFunc.assignShift(shiftData)

    //console.log(allShifts)
    await waiterFunc.removeWaiterShiftsByUsername('gregfoulkes')
    let allShifts = await waiterFunc.getShiftByUserName('gregfoulkes')

    assert.deepEqual([], allShifts.shifts)

  })
});


