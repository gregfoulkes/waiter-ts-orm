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

    async clearWaiters() {
        createConnection().then(async connection => {
            const waiter = new Waiter();
            const allWaiters = await Waiter.find(Waiter)
            const daysRepo = await connection.getRepository(Waiter);
            daysRepo.remove(allWaiters)
        }).catch(error => console.log(error));
    }



    async getWaiters() {

        try {
            const allWaiters = await Waiter.find({});
            console.log('These waiters are in the database ', allWaiters)
            return allWaiters

        } catch (error) {
            console.log(error)
        }
    }

    async insertWaiter(waiter: IWaiter) {

        const waiterModel = new Waiter();
        waiterModel.username = waiter.userName;
        waiterModel.fullname = waiter.fullName;
        waiterModel.position = waiter.position;

        return await waiterModel.save();

    }

    async insertWaiters(connection) {
        // createConnection().then(async connection => {
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
            console.log("Inserting a new user into the database...");
            let waiterIndex = waiters[i]

            const waiter = new Waiter();
            waiter.username = waiterIndex.userName;
            waiter.fullname = waiterIndex.fullName;
            waiter.position = waiterIndex.position;
            await waiter.save();
            // const days = await connection.manager.find(Waiter);
            console.log("Inserted waiters: ", waiter);
        }
        // }).catch(error => console.log(error));

    }

}

//export default Waiter_Functions

