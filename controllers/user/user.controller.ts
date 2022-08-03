import { IAuth } from 'interfaces/auth/IAuth';
import { ISetUser, ISetUserResponse } from 'interfaces/user/ISetUser';
import { ILogin, ILoginResponse } from 'interfaces/user/ILogin';
import { getUserByMail, getUserByPasswd } from '../../models/user/user.methods';
import { User } from '../../models/user/user.model';
const jwt = require('jsonwebtoken');
import 'dotenv/config';

export async function login(filter: ILogin, auth: IAuth): Promise<ILoginResponse> {
    const response: ILoginResponse = {
        success: false,
        message: "",
        redirectUrl: "",
        token: ""
    };
    if(!auth.success || !filter.mail || !filter.passwd) {
        response.message = "Data left";
        return response;
    }

    if(!(await getUserByMail(filter.mail))) {
        response.message = "Email not valid";
        return response;
    }

    const user = await getUserByPasswd(filter.mail, filter.passwd);
    if(!user) {
        response.message = "Password doesn't match";
        return response;
    }

    response.token = jwt.sign(JSON.stringify(user), process.env.JWT_TOKEN);
    response.success = true;

    return response;
}

export async function setUser(filter: ISetUser, auth: IAuth): Promise<ISetUserResponse> {
    const response: ISetUserResponse = {
        success: false,
        message: "",
        redirectUrl: "",
    };
    if(!auth.success ||
       !filter.firstName ||
       !filter.lastName ||
       !filter.age ||
       !filter.mail ||
       !filter.passwd ||
       !filter.userName) {
           response.message = "Data left";
           return response;
       }
    
    if(await getUserByMail(filter.mail)) {
        response.message = "Mail duplicated";
        response.status = 409;
        return response;
    }

    try {
        await User.create({
            firstName: filter.firstName,
            lastName: filter.lastName,
            age: filter.age,
            mail: filter.mail,
            passwd: filter.passwd,
            userName: filter.userName
        });
        response.success = true;
        return response;
    } catch(err) {
        console.log(err);
        response.message = "General error.";
        return response;
    }
}