import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

import * as bcrypt from 'bcrypt-nodejs';

import { Waiter } from "../entity/Waiter";

import { ILogin, IRegister } from "../interfaces/interfaces";

let connection: Connection

export default class UserAuth {

    async login(loginDetails: ILogin) {

        let foundUser = await Waiter.findOne({ username: loginDetails.username });

        if(foundUser == undefined){
            return false
        }

        let checkPassword = await bcrypt.compareSync(loginDetails.password, foundUser.password)

        if (!checkPassword || checkPassword === undefined) {
            
            return false
        }

        if (checkPassword) {

            if ([foundUser].length == 0 || foundUser == undefined) {
                return false
            }

            foundUser['match'] = Object.assign({ 'found': checkPassword })
            return foundUser
        }
    }

    async logout() {

    }

    async registerUser(registrationDetails: IRegister) {


        const user = new Waiter();
        let foundUser = await Waiter.findOne({ username: registrationDetails.username });

        if (foundUser === undefined) {
            let hashPassword = bcrypt.hashSync(registrationDetails.password)
            user.username = registrationDetails.username;
            user.firstname = registrationDetails.firstname;
            user.lastname = registrationDetails.lastname
            user.email = registrationDetails.email;
            user.password = hashPassword;
            user.position = registrationDetails.position
            return await user.save();
        } else {
            return false
        }

    }

}