import {User} from "../entity/User"
import { Day } from "../entity/Day";
import { Shift } from "../entity/Shift";
import { createConnection, getConnection } from 'typeorm';

export default async function DbConnectionFactory(dbName:string, logging = []){
    try{
        let currentConnection = getConnection('default');
        if (currentConnection) {
            return currentConnection;
        }
    }
    catch {
        let connection = await createConnection({
            "type": "postgres",
            "username": "coder",
            "password": "1234",
            "host": "localhost",
            "database": dbName,
            "synchronize": true,
            "logging": logging,
            "entities": [
                Day,
                User,
                Shift
            ],
            "migrations": [
                "src/migration/**/*.ts"
            ],
            "subscribers": [
                "src/subscriber/**/*.ts"
            ]
        });
        
        return connection;
    }
}