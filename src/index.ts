import "reflect-metadata";
import WaiterRoutes from './routes/waiterRoutes';

import * as express from "express";
import { Router, Request, Response } from 'express';
import * as bodyParser from "body-parser";

import { createConnection } from "typeorm";
//const connection =  DbConnectionFactory('default')

const router: Router = Router();

let waiterRoutes = new WaiterRoutes()

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/api", waiterRoutes.home)

app.get("/api/waiter/:username", waiterRoutes.waiterNameGetRoute)

app.post("/api/waiter/:username", waiterRoutes.waiterNamePostRoute)

app.get("/api/days", waiterRoutes.getShiftsForDaysRoute)

app.post("/api/login", waiterRoutes.login)

app.post("/api/register", waiterRoutes.register)

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

export const App: Router = router;
