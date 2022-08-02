import { IAuth } from 'interfaces/auth/IAuth';
import { IResponse } from 'interfaces/response/IResponse';
import { ISetUser } from 'interfaces/user/ISetUser';
import { getUserByMail } from '../../models/user/user.methods';
import { User } from '../../models/user/user.model';

export async function setUser(filter: ISetUser, auth: IAuth): Promise<IResponse> {
    const response: IResponse = {
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