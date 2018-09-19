import { createConnection, Connection, getRepository } from "typeorm";

import { Days } from "./entity/days";
import { Waiter } from "./entity/waiter";

interface IWaiter {
    userName: string,
    fullName: string,
    position: string
}

export default class WaiterFunction {

    constructor(private connection: Connection) {

    }

    async addWeekdays() {
        try {
            let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for (let i = 0; i < dayList.length; i++) {
                const day = new Days();
                day.day_name = dayList[i];
                await day.save();
            }
        } catch (error) {
            console.log(error)
        }

    }

    async getWeekdays() {
        const days = await Days.find({});
        return days

    }

    async clearDays() {
        const day = new Days();
        const allDays = await Days.find({})
        Days.remove(allDays)
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

    async clearWaiters() {
        try {
            const waiter = new Waiter();
            const allWaiters = await Waiter.find({})
            Waiter.remove(allWaiters)
        } catch (error) {
            console.log(error)
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

  

}
