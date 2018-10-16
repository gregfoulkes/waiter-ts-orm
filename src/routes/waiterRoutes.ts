import * as express from "express";

import { Day } from "../entity/Day";
//Import Services
import DayService from '../services/DayService'
import ShiftService from '../services/ShiftService'
import WaiterService from '../services/WaiterService'

//Instatiate new services
let waiterService = new WaiterService()
let dayService = new DayService()
let shiftService = new ShiftService()

export default class DayRoutes {

    async home(req: express.Request, res: express.Response) {

        try {
            const days = await dayService.getWeekdays();
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

    async waiterNameGetRoute(req: express.Request, res: express.Response) {

        try {

            let oneWaitersShifts = await shiftService.getShiftByUserName(req.params.username)
            res.json({
                status: 'success',
                shifts: oneWaitersShifts
            });

        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async waiterNamePostRoute(req: express.Request, res: express.Response) {

        let shiftData = req.body.shift
        let waiterName = req.params.username

        try {
            await shiftService.updateShiftsByUserName(shiftData)
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

    async getShiftsForDaysRoute(req: express.Request, res: express.Response) {

        try {
            let allShifts = await shiftService.getWeekdayShifts()
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