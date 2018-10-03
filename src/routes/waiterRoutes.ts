import * as express from "express";

import { Day } from "../entity/Day";
import WaiterFunction from "../services/waiter_webapp";



export default class DayRoutes {

    // async home(req : express.Request, res : express.Response){
    //     try {
        
    //         let waiterFunc = new WaiterFunction()
    //         //await waiterFunc.clearDays()
    //         //await waiterFunc.addWeekdays()
    //         let gotDays: any | Day[] = await waiterFunc.getWeekdays()
    //         res.send(gotDays)
        
    //         } catch (err) {
    //             console.log(err)
    //         }
    // }

    async home(req : express.Request, res : express.Response){
        let waiterFunc = new WaiterFunction()

        try {
            const days = await waiterFunc.getWeekdays();
            res.json({
                status: 'success',
                data: days
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async waiterNameGetRoute(req : express.Request, res : express.Response){
        
        let waiterFunc = new WaiterFunction()
        let waiterName = req.params.waiterName
        //let dayName = req.body.dayName

        try { 
            //await waiterFunc.insertWaiter(waiterName)
            //await waiterFunc.assignShift(shiftData)
            let oneWaitersShifts = await waiterFunc.getShiftByUserName(waiterName)

            const days = await waiterFunc.getWeekdays();
            res.json({
                status: 'success',
                data: days,
                shifts:oneWaitersShifts
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async waiterNamePostRoute(req : express.Request, res : express.Response){
        
        let waiterFunc = new WaiterFunction()
        let waiterName = req.params
        //let dayName = req.body.dayName

        try { 
            await waiterFunc.insertWaiter(waiterName)
            await waiterFunc.assignShift(shiftData)
            const days = await waiterFunc.getWeekdays();
            res.json({
                status: 'success',
                data: days
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    
}