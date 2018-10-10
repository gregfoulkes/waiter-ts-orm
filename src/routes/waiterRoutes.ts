import * as express from "express";

import { Day } from "../entity/Day";
import WaiterFunction from "../services/waiter_webapp";



export default class DayRoutes {

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
        //let waiterName = req.params.waiterName
        //let waiterName = req.body.waiterName

        //let dayName = req.body.dayName
        try { 
            //await waiterFunc.insertWaiter(waiterName)
            //await waiterFunc.assignShift(shiftData)
            let oneWaitersShifts = await waiterFunc.getShiftByUserName(req.params.username)
            console.log(oneWaitersShifts)
            //const days = await waiterFunc.getWeekdays();
            res.json({
                status: 'success',
                //data: days,
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
        let shiftData = req.body.shift
        let waiterName = req.params.username
       // console.log(shiftData)
        try { 
            await waiterFunc.updateShiftsByUserName(shiftData)
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async getShiftsForDaysRoute (req : express.Request, res : express.Response) {
        let waiterFunc = new WaiterFunction()

        try { 
            let allShifts = await waiterFunc.getWeekdayShifts()
            res.json({
                status: 'success',
                data: allShifts
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }

    }

    
}