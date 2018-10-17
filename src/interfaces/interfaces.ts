export interface IUser {
    userName: string,
    fullName: string,
    position: string
}

export interface shiftDataInterface {
    username: string,
    days: any[]
}

export interface ILogin {
    username: string,
    password:string
}

export interface IRegister{
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    position: string
}