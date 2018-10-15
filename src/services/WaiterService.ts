//import Models
import { User } from "../entity/User";


//Import Interfaces
import { IUser } from "../interfaces/interfaces";


export default class WaiterService {

    //Insert a single waiter
    //Used to reguster a new user.

    async insertWaiter(waiter: IUser) {

        const waiterModel = new User();
        waiterModel.username = waiter.userName;
        waiterModel.fullname = waiter.fullName;
        waiterModel.position = waiter.position;

        return await waiterModel.save();

    }

    //Inserts a list of predefined users
    //For testing purposes

    async insertWaiters() {

        let waiters: IUser[] = [
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
            const waiter = new User();
            waiter.username = waiters[i].userName;
            waiter.fullname = waiters[i].fullName;
            waiter.position = waiters[i].position;
            await waiter.save();
        }
    }

    //Returns a list of users
    async getWaiters() {

        try {
            const allWaiters = await User.find({});
            return allWaiters

        } catch (error) {
            console.log(error)
        }
    }

    //Clears users from database
    async clearWaiters() {
        try {
            const waiter = new User();
            const allWaiters = await User.find({})
            User.remove(allWaiters)
        } catch (error) {
            console.log(error)
        }
    }

}