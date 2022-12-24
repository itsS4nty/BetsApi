import { IResponse } from "interfaces/response/IResponse";
import { IUser } from "models/user/user.interface";

export interface IGetUser { }

export interface IGetUserResponse extends IResponse {
    user: IUser | null
}