import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

import { Day } from "../entity/Day";
import { Waiter } from "../entity/Waiter";
import { Shift } from "../entity/Shift";

import { getRepository } from "typeorm";


interface IWaiter {
    userName: string,
    fullName: string,
    position: string
}

interface shiftDataInterface {
    username: string,
    days: any[]
}

let connection: Connection

export default class WaiterFunction {

    constructor() {

    }

    async addWeekdays() {
        try {
            let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for (let i = 0; i < dayList.length; i++) {
                const day = new Day();
                day.dayname = dayList[i];
                await day.save();
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getWeekdays() {
        const day = new Day();
        const days = await Day.find({});
        return days

    }

    async getWeekdayShifts() {

        let days = await getConnection()
            .getRepository(Day)
            .createQueryBuilder('day')
            .leftJoinAndSelect('day.shifts', 'shift')
            .leftJoinAndSelect('shift.waiter', 'waiter')
            .getMany();

            // days.forEach((day) => {
            //         let shiftDays = day.shifts
            //        // console.log(day)
            //         console.log(() )
            //     })
            // console.log(days)

            let shiftsPerDay = days.map((day) => {
                return {
                    day: day.dayname,
                    waiters: day.shifts.map((shift) => shift.waiter.fullname)
                }
            })


            // for (let day of days) {
            //     console.log(day.dayname)
            //     console.log(day.shifts.map((shift) => shift.waiter.fullname))
            //     console.log('---------------------');    
            // }


            // console.log(days[0].shifts.map((shift) => shift.waiter.fullname))

        return shiftsPerDay

    }


    async clearDays() {
        const day = new Day();
        const allDays = await Day.find({})
        Day.remove(allDays)
    }
    allShifts
    async insertWaiter(waiter: IWaiter) {

        // let foundWaiter = await Waiter.findOne({ username: waiter.userName });
        //console.log(foundWaiter)
        // if(foundWaiter == 0){
        const waiterModel = new Waiter();
        waiterModel.username = waiter.userName;
        waiterModel.fullname = waiter.fullName;
        waiterModel.position = waiter.position;

        return await waiterModel.save();

        // }else{
        //     return 'Please register with us'
        //}


    }

    async insertWaiters() {

        let waiters: { userName: string, fullName: string, position: string }[] = [
            {
                userName: 'greg',
                fullName: 'Greg Foulkes',
                position: 'admin'
            },
            {
                userName: 'aya',
                fullName: 'Ayabonga Booi',
                position: 'waiter'

            },
            {
                userName: 'luvuyo',
                fullName: 'Luvuyo Sono',
                position: 'waiter'

            },
            {
                userName: 'aviwe',
                fullName: 'Aviwe Mbekeni',
                position: 'waiter'

            }
        ]

        for (let i = 0; i < waiters.length; i++) {
            const waiter = new Waiter();
            waiter.username = waiters[i].userName;
            waiter.fullname = waiters[i].fullName;
            waiter.position = waiters[i].position;
            await waiter.save();
        }
    }

    async getWaiters() {

        try {
            const allWaiters = await Waiter.find({});
            return allWaiters

        } catch (error) {
            console.log(error)
        }
    }

    async clearWaiters() {
        try {
            const waiter = new Waiter();
            const allWaiters = await Waiter.find({})
            Waiter.remove(allWaiters)
        } catch (error) {
            console.log(error)
        }
    }

    async assignShift(shiftData: shiftDataInterface) {
        let shiftDays = shiftData.days

        let foundWaiter = await Waiter.findOne({ username: shiftData.username });
        for (let i = 0; i < shiftDays.length; i++) {
            let day = await Day.findOne({ id: shiftDays[i] });
            let shift = new Shift();
            shift.waiter = foundWaiter;
            shift.weekday = day
            let savedDays = await shift.save()
        }
    }

    async getShifts() {

        const shiftRepository = getRepository(Shift);

        let shifts = await shiftRepository.find({ relations: ["waiter", "weekday"] });

        return shifts;

    }

    async getDaysAndNames() {

        let allDays = await this.getWeekdays();
        let allShifts = await this.getShifts()

        interface WaitersForDay {
            day: string
            waiters: string[]
        }

        let shiftList: WaitersForDay[] = [];
        console.log(allDays)
        for (let i = 0; i < allDays.length; i++) {

            let waitersForDay: WaitersForDay = {
                day: allDays[i].dayname,
                waiters: []
            }

            for (let i = 0; i < allShifts.length; i++) {
                if (allDays[i].dayname == allShifts[i].weekday.dayname) {
                    waitersForDay.waiters.push(allShifts[i].waiter.fullname)

                }
            }
            shiftList.push(waitersForDay);
          //  console.log(shiftList)
            return shiftList

        }

    }

    async getShiftByUserName(waiterName: string) {
        try {

            const oneWaitersShifts = await getRepository(Shift)
                .createQueryBuilder("shift")
                .innerJoinAndSelect("shift.weekday", "weekday")
                .innerJoinAndSelect("shift.waiter", "waiter")
                .where("waiter.username = :username", { username: waiterName })
                .getMany();

            let shiftData = {
                userName: waiterName,
                shifts: []
            };

            oneWaitersShifts.forEach((shift) => {
                let day = shift.weekday.dayname;
                shiftData.shifts.push(day);
            })

            return shiftData;

        } catch (error) {
            console.log(error)
        }

    }

    async removeWaiterShiftsByUsername(username: string) {
        const waiterShifts = await
            getRepository(Shift)
                .createQueryBuilder("shift")
                .innerJoinAndSelect("shift.waiter", "waiter")
                .innerJoinAndSelect("shift.weekday", "weekday")
                .where("waiter.username = :username")
                .setParameter("username", username)
                .getMany();

        const removedShifts = waiterShifts.map((shift) => {
            return shift.remove()
           // console.log(shift)
        }
        );
        
        // console.log(removedShifts)
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
