import "reflect-metadata";
import {createConnection, Connection, getConnection} from "typeorm";
import { Days } from "./entity/days";
import WaiterFunction from "../src/waiter_webapp";
//import   { DbConnectionFactory }  from "./config";

//const connection =  new DbConnectionFactory('default')

import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", async function(req: Request, res: Response) {
    try {
        
    const connection: Connection = await createConnection();
    let waiterFunc = new WaiterFunction(connection)
    await waiterFunc.clearDays()
    await waiterFunc.addWeekdays()
    let gotDays: any | Days[] = await waiterFunc.getWeekdays()
    res.send(gotDays)
    await connection.close()

    } catch (err) {
        console.log(err)
    }

    // here we will have logic to return all users
});

app.get("/waiters/:username", function(req: Request, res: Response) {
    // here we will have logic to return user by id
});

app.get("/days", function(req: Request, res: Response) {
    // here we will have logic to return user by id
});

app.listen(7000);
