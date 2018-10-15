import { Connection, SelectQueryBuilder, getConnection } from "typeorm";

 import * as bcrypt from 'bcrypt-nodejs';

import { User } from "../entity/User";

import { ILogin,IRegister } from "../interfaces/interfaces";

let connection: Connection

export class UserAuth {

    async login(loginDetails:ILogin) {

        let foundUser = await User.findOne({ username: loginDetails.username });
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

        const user = new User();

        let hashPassword =  bcrypt.hashSync(registrationDetails.password)
        //console.log(hashPassword)
        user.username = registrationDetails.username;
        user.fullname = registrationDetails.fullname;
        user.email = registrationDetails.email;
        user.password = hashPassword
        return await user.save();

    }

}