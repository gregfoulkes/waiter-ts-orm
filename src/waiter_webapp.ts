import {createConnection} from "typeorm";

import {Days} from "./entity/days";
import {Waiter} from "./entity/waiter";


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
          return days
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

    async clearDays() {
        createConnection().then(async connection => {
            const day = new Days();
            const allDays = await Days.find()
            const daysRepo = await connection.getRepository(Days);          
            daysRepo.remove(allDays)
        }).catch(error => console.log(error));
    }

    async clearWaiters() {
        createConnection().then(async connection => {
            const waiter = new Waiter();
            const allWaiters = await Waiter.find()
            const daysRepo = await connection.getRepository(Waiter);          
            daysRepo.remove(allWaiters)
        }).catch(error => console.log(error));
    }

    async insertWaiters() {
        createConnection().then(async connection => {
            let waiters: { user_name: string , full_name: string, position: string}[] = [
                {
                user_name: 'greg',
                full_name: 'Greg Foulkes',
                position: 'admin'
              },
              {
                user_name: 'aya',
                full_name: 'Ayabonga Booi',
                position: 'waiter'
          
              },
              {
                user_name: 'luvuyo',
                full_name: 'Luvuyo Sono',
                position: 'waiter'
          
              },
              {
                user_name: 'aviwe',
                full_name: 'Aviwe Mbekeni',
                position: 'waiter'
          
              }
            ]
            
            for(let i = 0; i<waiters.length; i++){
                console.log("Inserting a new user into the database...");
                let waiterIndex = waiters[i]

                const waiter = new Waiter();
                waiter.username = waiterIndex.user_name;
                waiter.fullname = waiterIndex.full_name;
                waiter.position = waiterIndex.position;

                await connection.manager.save(waiter);
                console.log("Saved a new waiter with id: " + waiter.id);
                console.log("Loading waiters from the database...");
                const days = await connection.manager.find(Waiter);
                console.log("Loaded waiters: ", waiter);
                console.log("Here you can setup and run express/koa/any other framework.");
            }
        }).catch(error => console.log(error));
    
    }


}

//export default Waiter_Functions