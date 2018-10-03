import { Connection, SelectQueryBuilder } from "typeorm";

import { Day } from "../entity/Day";
import { Waiter } from "../entity/Waiter";
import { Shift } from "../entity/Shift";

import {getRepository} from "typeorm";


interface IWaiter {
    userName: string,
    fullName: string,
    position: string
}

interface shiftDataInterface {
   username: string,
    days: any []
   
}

let connection:Connection

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
        //console.log(days)
        return days

    }

    async clearDays() {
        const day = new Day();
        const allDays = await Day.find({})
        Day.remove(allDays)
    }

    async insertWaiter(waiter: IWaiter) {

        const waiterModel = new Waiter();
        waiterModel.username = waiter.userName;
        waiterModel.fullname = waiter.fullName;
        waiterModel.position = waiter.position;

        return await waiterModel.save();

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

    // var shiftData = {
    //     waiterName,
    //     days
    // }

    

    async assignShift(shiftData:shiftDataInterface) {

        let shiftDays = shiftData.days
        //console.log(shiftDays)
        let shift = new Shift()
        
        let foundWaiter = await Waiter.findOne({username: shiftData.username});
        for(let i = 0; i<shiftDays.length; i++){
       //for(let oneDay of shiftDays){
           // console.log(shiftDays[i])
            let day = await Day.findOne({dayname: shiftDays[i]});
           // console.log(day)

            shift.waiter = foundWaiter;
            shift.weekday = day
            let savedDays = await shift.save()
            console.log(savedDays)
            }
            //await shift.save()

        //}
       

    }

    async getShifts() {
        try {

        const shiftRepository = getRepository(Shift); 
         const shiftRepoQuery = await shiftRepository.createQueryBuilder("Shift")
         return shiftRepository.find({ relations: ["waiter", "weekday"] });

        } catch (error) {
            console.log(error)
        }
       

    }

    // async getShiftByFullName(waiterName) {
    //     try {
    
    //         const oneWaitersShifts = getRepository(Shift)
    //             .createQueryBuilder("shift")
    //             .innerJoinAndSelect("shift.weekday", "weekday")
    //             .leftJoinAndSelect("shift.waiter", "waiter")
    //             .where("waiter.fullname = :fullname", { fullname: waiterName })
    //         //.andWhere("(.name = :photoName OR photo.name = :bearName)")

    //         .getMany();
    //         return oneWaitersShifts
            
    //     } catch (error) {
    //         console.log(error)
    //     }
     
    // }

    async getShiftByUserName(waiterName) {
        try {
    
            const oneWaitersShifts = getRepository(Shift)
                .createQueryBuilder("shift")
                .innerJoinAndSelect("shift.weekday", "weekday")
                .leftJoinAndSelect("shift.waiter", "waiter")
                .where("waiter.username = :username", { username: waiterName })
            //.andWhere("(.name = :photoName OR photo.name = :bearName)")

            .getMany();
            return oneWaitersShifts
           // console.log(oneWaitersShifts)

        } catch (error) {
            console.log(error)
        }
     
    }

    async clearShifts() {

        try {
            //const shift = new Waiter();
            const allShifts = await Shift.find({})
            Shift.remove(allShifts)
        } catch (error) {
            console.log(error)
        }

    }
  
}
