import { Connection, createConnection } from "typeorm";

import * as bcrypt from 'bcrypt-nodejs';

import { Waiter } from "../entity/Waiter";

// todo - generalize this
async function connect () {
    let connectionUrl = process.env.DB || "postgresql://coder:1234@localhost:5432/waiter_webapp"
    let connection = await createConnection({
      "name": "default",
      "type": "postgres",
      "url": connectionUrl,
      "synchronize": true,
      "logging": false,

      "entities": [
        "src/entity/**/*.ts"
      ],
      "migrations": [
        "src/migration/**/*.ts"
      ],
      "subscribers": [
        "src/subscriber/**/*.ts"
      ],
      "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
      }
    });
    return connection;
}

async function InsertUser() {

    // let hashed = bcrypt.hashSync('1234');
    // let result = bcrypt.compareSync('1234', hashed)
    // console.log(result);
    // return 

   try {
    let connection = await connect();

    let currentUser = await Waiter.findOne({ username: "gf" })

    if (!currentUser) {
        const user = new Waiter();
    
        let hashPassword = bcrypt.hashSync('1234')
        user.username = 'gf'
        user.firstname = 'Greg'
        user.lastname = 'Foulkes'
        user.email = 'gregfoulkes@gmail.com'
        user.password = hashPassword
        user.position = 'waiter'
        await user.save();
        console.log('User added.');

    } else {
        console.log('User already exists!');
    }
    connection.close();
   } catch(err) { 
      console.log(err);
   }

}

InsertUser()




