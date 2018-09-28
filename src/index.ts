import "reflect-metadata";
import DayRoutes  from './routes/day-routes';

import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";

import  DbConnectionFactory  from "./config/config";
import { createConnection } from "typeorm";
import { log } from "util";
//const connection =  DbConnectionFactory('default')

let dayRoutes = new DayRoutes()

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/api", dayRoutes.home )

app.get("/waiters/:username", function(req: Request, res: Response) {
    // here we will have logic to send waiter name to db and input it
});

app.post("/waiters/:username", function(req: Request, res: Response) {
    // here we will have logic to get waiter name from db and select days and input it into shifts
});

app.get("/days", function(req: Request, res: Response) {
    // here we will have logic to return all days and people working on it
});

async function start () {
    try {
        await createConnection();
        app.listen(7008)
    }
    catch(err) {
        console.log(err);
    }
}

start()
