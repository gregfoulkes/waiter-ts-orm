import * as express from "express";

import { Day } from "../entity/Day";
//Import Services
import DayService from '../services/DayService'
import ShiftService from '../services/ShiftService'
import WaiterService from '../services/WaiterService'
import UserAuth from "../services/AuthService";

//Instatiate new services
let waiterService = new WaiterService()
let dayService = new DayService()
let shiftService = new ShiftService()
let authService = new UserAuth()

export default class WaiterRoutes {

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
            // console.log(req.params.username)
            let oneWaitersShifts = await shiftService.getShiftByUserName(req.params.username)

            //console.log(oneWaitersShifts)
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
        // let waiterName = req.params.username
        // console.log(shiftData)
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

    async register(req: express.Request, res: express.Response) {

        try {
            let registerData = await authService.registerUser(req.body)
            res.json({
                status: 'success',
                data: registerData
            });
            
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }


    async login(req: express.Request, res: express.Response) {
        console.log(req.body)
        try {
            let loginData = await authService.login(req.body.login)
            //console.log(loginData)
            res.json({
                status: 'success',
                data: loginData
            });
        } catch (err) {
            res.json({
                status: 'error',
                error: err,
                stack: err.stack
            });
        }
        //sdafglfegwqahfwgelqhf
    }
}