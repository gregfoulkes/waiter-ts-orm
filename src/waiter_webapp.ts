import {createConnection} from "typeorm";

import {Days} from "./entity/days";

export default class Waiter_Functions {

    async addWeekdays() {

        createConnection().then(async connection => {
            let dayList: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for(let i = 0; i<dayList.length; i++){
                console.log("Inserting a new user into the database...");
                const day = new Days();
                day.day_name = dayList[i];
                await connection.manager.save(day);
                console.log("Saved a new day with id: " + day.id);
                console.log("Loading days from the database...");
                const days = await connection.manager.find(Days);
                console.log("Loaded users: ", days);
                console.log("Here you can setup and run express/koa/any other framework.");
            }
        }).catch(error => console.log(error));


    }

    async getWeekdays() {
          await createConnection().then(async connection => {
          const day = new Days();
          const days = await connection.manager.find(Days);
          console.log('These days are in your database ',days)
         }).catch(error => console.log(error));

    }

    // async clearDatabase() {
    //     createConnection().then(async connection => {
    //             const day = new Days();
    //             const days = await connection.manager.find(Days);
    //             const daysRepo = await connection.getRepository(Days);          
    //              daysRepo.remove(days)
    //     }).catch(error => console.log(error));
    // }

    async clearDatabase() {
        createConnection().then(async connection => {
            const day = new Days();
            const allDays = await Days.find()
            const daysRepo = await connection.getRepository(Days);          
            daysRepo.remove(allDays)
        }).catch(error => console.log(error));
    }


}

//export default Waiter_Functions