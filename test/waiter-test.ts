//Import Mocha
import * as assert from "assert";

//import connections
import { createConnection, Connection, getRepository } from "typeorm";

//Import Models
import { Day } from "../src/entity/Day";
import { User } from "../src/entity/User";
import { Shift } from "../src/entity/Shift";

//Import Services
import DayService from '../src/services/DayService'
import ShiftService from '../src/services/ShiftService'
import WaiterService from '../src/services/WaiterService'


//??
import "reflect-metadata";

describe('Waiter-Webbapp-Function', function () {

  let connection: Connection;

//Instantiate each service
  let dayService = new DayService()
  let waiterService = new WaiterService()
  let shiftService = new ShiftService();


  before(async function () {

    try {
      let connectionUrl = process.env.DB || "postgresql://coder:1234@localhost:5432/waiter_webapp_test"
      connection = await createConnection({
        "name": "default",
        "type": "postgres",
        "url": connectionUrl,
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

  beforeEach(async function (next) {

    try {
      const days = await Day.find({})
    const user = await User.find({})
    const shift = await Shift.find({})
    
    await Shift.remove(shift);
    await Day.remove(days);
    await User.remove(user);

    await dayService.addWeekdays()
    await waiterService.insertWaiters()
    } catch (error) {
      console.log(error)
    }

  })

  after(async function () {
    connection.close();
  })

  it('should input day names into the database and return the days', async function () {

    let gotDays: Day[] = await dayService.getWeekdays()

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

    await waiterService.insertWaiters()

    let result: any | User[] = await waiterService.getWaiters()

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

    let result = await waiterService.insertWaiter({ userName: 'gregfoulkes', fullName: 'Greg Foulkes', position: 'waiter' })

    assert.equal('gregfoulkes', result.username);
    assert.equal('Greg Foulkes', result.fullname);
    assert.equal('waiter', result.position);

  })

  it('Should return the name and day of all the shifts', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }

    await waiterService.insertWaiter({ userName: 'gregfoulkes', fullName: 'Greg Foulkes', position: 'waiter' })

    await shiftService.assignShift(shiftData)

    let allShifts = await shiftService.getShifts()

    let shiftList = []
    for (let list of allShifts) {
      shiftList.push({
        dayname: list.weekday.dayname,
        username: list.user.username
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

    await waiterService.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterService.insertWaiter({
      userName: 'andrew',
      fullName: 'Andrew Monamodi',
      position: 'waiter'
    })

    await shiftService.assignShift(shiftData)
    await shiftService.assignShift(shiftData2)


    let allShifts = await shiftService.getShiftByUserName('gregfoulkes')
    assert.equal(2, allShifts.shifts.length)

  })

  it('should update the days of a waiters shifts', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }
    let shiftData2 = { username: 'gregfoulkes', days: [foundId1.id, foundId3.id] }

    await waiterService.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await shiftService.assignShift(shiftData)
    await shiftService.updateShiftsByUserName(shiftData2)
    let allShifts = await shiftService.getShiftByUserName('gregfoulkes')
    assert.equal(2, allShifts.shifts.length)

  })

  it('Should get all days and the names of the waiters working on them', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }

    let shiftData2 = { username: 'andrew', days: [foundId1.id, foundId3.id] }

    await waiterService.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await waiterService.insertWaiter({
      userName: 'andrew',
      fullName: 'Andrew Monamodi',
      position: 'waiter'
    })

    await shiftService.assignShift(shiftData)

    await shiftService.assignShift(shiftData2)

    let allShifts = await shiftService.getWeekdayShifts();

  })

  it('Should add a waiters shifts and then clear them while returning an empty list', async function () {

    let foundId1 = await Day.findOne({ dayname: 'Monday' })

    let foundId2 = await Day.findOne({ dayname: 'Tuesday' })

    let foundId3 = await Day.findOne({ dayname: 'Wednesday' })

    let shiftData = { username: 'gregfoulkes', days: [foundId1.id, foundId2.id] }
    let shiftData2 = { username: 'gregfoulkes', days: [foundId1.id, foundId3.id] }

    await waiterService.insertWaiter({
      userName: 'gregfoulkes',
      fullName: 'Greg Foulkes',
      position: 'waiter'
    })

    await shiftService.assignShift(shiftData)

    await shiftService.removeWaiterShiftsByUsername('gregfoulkes')

    let allShifts = await shiftService.getShiftByUserName('gregfoulkes')

    assert.deepEqual([], allShifts.shifts)

  })
  
});


