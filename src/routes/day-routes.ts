import * as express from "express";

import { Day } from "../entity/Day";
import WaiterFunction from "../waiter_webapp";



export default function DayRoutes() {

    async function home(req : express.Request, res : express.Response){
        try {
        
            let waiterFunc = new WaiterFunction()
            await waiterFunc.clearDays()
            await waiterFunc.addWeekdays()
            let gotDays: any | Day[] = await waiterFunc.getWeekdays()
            res.send(gotDays)
        
            } catch (err) {
                console.log(err)
            }
    }

    return {
        home
    }
}