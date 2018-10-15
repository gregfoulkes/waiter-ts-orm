//import connections
import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

//import repository
import { getRepository } from "typeorm";

//import models
import { User } from "../entity/User";
import { Shift } from "../entity/Shift";
import {Day} from "../entity/Day";

//import interfaces
import { shiftDataInterface } from "../interfaces/interfaces";

//import Days services
import DayService from '../services/DayService'

//instantiate a new day service

let dayService = new DayService()

export default class ShiftService {

  //Get all the shifts for all users
    async getWeekdayShifts() {

        let days = await getConnection()
            .getRepository(Day)
            .createQueryBuilder('day')
            .leftJoinAndSelect('day.shifts', 'shift')
            .leftJoinAndSelect('shift.user', 'user')
            .getMany();

            let shiftsPerDay = days.map((day) => {
                return {
                    day: day.dayname,
                    waiters: day.shifts.map((shift) => shift.user.fullname)
                }
            })

        return shiftsPerDay
    }

    //Assign a shift to a user
    async assignShift(shiftData: shiftDataInterface) {
        let shiftDays = shiftData.days

        let foundWaiter = await User.findOne({ username: shiftData.username });
        for (let i = 0; i < shiftDays.length; i++) {
            let day = await Day.findOne({ id: shiftDays[i] });
            let shift = new Shift();
            shift.user = foundWaiter;
            shift.weekday = day
            let savedDays = await shift.save()
        }
    }

    async getShifts() {

        const shiftRepository = getRepository(Shift);

        let shifts = await shiftRepository.find({ relations: ["user", "weekday"] });

        return shifts;

    }

    async getDaysAndNames() {

        let allDays = await dayService.getWeekdays();
        let allShifts = await this.getShifts()

        interface WaitersForDay {
            day: string
            waiters: string[]
        }

        let shiftList: WaitersForDay[] = [];
        for (let i = 0; i < allDays.length; i++) {

            let waitersForDay: WaitersForDay = {
                day: allDays[i].dayname,
                waiters: []
            }

            for (let i = 0; i < allShifts.length; i++) {
                if (allDays[i].dayname == allShifts[i].weekday.dayname) {
                    waitersForDay.waiters.push(allShifts[i].user.fullname)

                }
            }
            shiftList.push(waitersForDay);
            return shiftList

        }

    }

    async getShiftByUserName(username: string) {
        try {

            const oneWaitersShifts = await getRepository(Shift)
                .createQueryBuilder("shift")
                .innerJoinAndSelect("shift.weekday", "weekday")
                .innerJoinAndSelect("shift.user", "user")
                .where("user.username = :username", { username: username })
                .getMany();

            let shiftData = {
                username: username,
                shifts: []
            };

            oneWaitersShifts.forEach((shift) => {
                let dayId = shift.weekday.id;
                shiftData.shifts.push(dayId);
            })
            console.log(shiftData)
            return shiftData;

        } catch (error) {
            console.log(error)
        }

    }

    async removeWaiterShiftsByUsername(username: string) {
        const waiterShifts = await
            getRepository(Shift)
                .createQueryBuilder("shift")
                .innerJoinAndSelect("shift.user", "user")
                .innerJoinAndSelect("shift.weekday", "weekday")
                .where("user.username = :username")
                .setParameter("username", username)
                .getMany();

        const removedShifts = waiterShifts.map((shift) => {
            return shift.remove()
        }
        );
        
        await Promise.all(removedShifts);
    }

    async updateShiftsByUserName(shiftData: shiftDataInterface) {
        let days = shiftData.days

        await this.removeWaiterShiftsByUsername(shiftData.username);
        await this.assignShift(shiftData);

    }

    async removeAllShifts() {

        try {
            const allShifts = await Shift.find({})
            Shift.remove(allShifts)
        } catch (error) {
            console.log(error)
        }

    }

}