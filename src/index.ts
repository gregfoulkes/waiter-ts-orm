import "reflect-metadata";
import DayRoutes from './routes/waiterRoutes';

import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";

import { createConnection } from "typeorm";
//const connection =  DbConnectionFactory('default')

let dayRoutes = new DayRoutes()

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/api", dayRoutes.home)

app.get("/api/waiter/:username", dayRoutes.waiterNameGetRoute)

app.post("/api/waiter/:username", dayRoutes.waiterNamePostRoute)

app.get("/api/days", dayRoutes.getShiftsForDaysRoute)

app.post("/api/register")

app.get("/api/login")

async function start() {
    try {
        await createConnection();
        app.listen(7010)
    }
    catch (err) {
        console.log(err);
    }
}

start()

module.exports = app
