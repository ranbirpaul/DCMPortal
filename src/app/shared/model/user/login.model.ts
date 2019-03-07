import { Role } from "../role/Role";

export interface LoginModel
{
    username:string,
    password:string,
    staySignedIn:boolean
}

export interface AuthenticationResult{
    username:string,
    firstName:string,
    token:string,
    expiry:Date,
    refreshToken:string,
    refreshExpiry:Date,
}

export interface AuthorizationResult{
    roles:string,
    //should have field for different authorizations
    //features and rights
}
export interface User{
    username:string,
    email:string,
    password:string,id:string,
    roles:Role[]
}

// export interface Role{
//     id:string;
//     name:string,
//     description:string
//     //should have field for different authorizations
//     //features and rights
// }