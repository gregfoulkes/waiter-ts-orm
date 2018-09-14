import "reflect-metadata";
// import {createConnection} from "typeorm";
// import { Days } from "./entity/days-model";



import Waiter_Functions from "../src/waiter_webapp";
import { User } from "./entity/User";

// await User.find({ name : "Andre" })

let waiter = new Waiter_Functions()

waiter.addWeekdays()
waiter.getWeekdays()
waiter.clearDatabase()
