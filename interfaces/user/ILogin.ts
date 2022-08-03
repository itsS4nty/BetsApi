import { IResponse } from "interfaces/response/IResponse";

export interface ILogin {
    mail: string;
    passwd: string;
}

export interface ILoginResponse extends IResponse {
    token: string;
}