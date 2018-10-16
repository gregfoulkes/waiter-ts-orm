import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

 import * as bcrypt from 'bcrypt-nodejs';

import { Waiter } from "../entity/Waiter";

import { ILogin,IRegister } from "../interfaces/interfaces";

let connection: Connection

export  default class UserAuth {

    async login(loginDetails:ILogin) {

        let foundUser = await Waiter.findOne({ username: loginDetails.username });
        console.log([foundUser].length == 1)

        let checkPassword = await bcrypt.compareSync(loginDetails.password, foundUser.password)
            if(checkPassword){
                if([foundUser].length == 0 || foundUser == undefined){
                    return 'Please enter a valid username or password'
                 }

             }
             foundUser['match']= Object.assign({'found':checkPassword})

            return foundUser
    }

    async logout() {

    }

    async registerUser(registrationDetails:IRegister) {

        const user = new Waiter();

        let hashPassword =  bcrypt.hashSync(registrationDetails.password)
        //console.log(hashPassword)
        user.username = registrationDetails.username;
        user.fullname = registrationDetails.fullname;
        user.email = registrationDetails.email;
        user.password = hashPassword
        return await user.save();

    }

}