import { IResponse } from "interfaces/response/IResponse";

export interface ISetUser {
    firstName: string;
    lastName: string;
    age: number;
    userName: string;
    mail: string;
    passwd: string;
}

export interface ISetUserResponse extends IResponse { }