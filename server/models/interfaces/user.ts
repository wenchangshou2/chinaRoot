export interface IUser{
    name?:string,
    email?:string,
    username?:string,
    provider?:string,
    hashed_password?:string,
    salt?:string,
    authToken?:string,
    password?:string,
    nickname?:string
}