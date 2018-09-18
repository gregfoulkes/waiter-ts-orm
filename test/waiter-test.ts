import * as assert from "assert";
import WaiterFunction from "../src/waiter_webapp";
import {createConnection, Connection, getConnection} from "typeorm";
import {Days} from "../src/entity/days";
import {Waiter} from "../src/entity/waiter";

import "reflect-metadata";
import { constants } from "zlib";

describe('Waiter-Webbapp-Function', function () {

  before(async function () {

  });

  it('should input day names into the database and return the days', async function () {

   const connection: Connection = await createConnection();

    let waiterFunc = new WaiterFunction(connection)
    await waiterFunc.clearDays()

    await waiterFunc.addWeekdays()

    let gotDays: any | Days[] = await waiterFunc.getWeekdays()
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
    await connection.close()
  })

  it('should input day names into the database and return the days', async function () {
    const connection: Connection = await createConnection();

    let waiterFunc = new WaiterFunction(connection)
    
    let result = await waiterFunc.insertWaiter({userName:'gregfoulkes', fullName:'Greg Foulkes', position:'waiter'})

    assert.equal('gregfoulkes', result.username);
    assert.equal('Greg Foulkes', result.fullname);
    assert.equal('waiter', result.position);

    await connection.close()

  })
});
