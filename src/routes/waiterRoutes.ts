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
        console.log(req.params)
        try { 
            //await waiterFunc.insertWaiter(waiterName)
            //await waiterFunc.assignShift(shiftData)
            let oneWaitersShifts = await waiterFunc.getShiftByUserName(req.params.username)
            console.log('----')
            console.log(oneWaitersShifts)
            console.log('----')

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
        let shiftData = req.body.shift
        let waiterName = req.params.username

        console.log(shiftData)
        try { 
            await waiterFunc.assignShift(shiftData)
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

    
}