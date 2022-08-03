import { postAuth } from '../../auth/postAuth';
import { IAuth } from 'interfaces/auth/IAuth';
import Router from 'koa-router';
import { login, setUser } from '../../controllers/user/user.controller';
const jwt = require('jsonwebtoken');
import 'dotenv/config';
import { ISetUserResponse } from 'interfaces/user/ISetUser';
import { ILoginResponse } from 'interfaces/user/ILogin';

// init
const usersRoutes = new Router();
//#region Get
usersRoutes.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        token: jwt.sign({ role: 'admin' }, process.env.JWT_TOKEN)
    }
});
//#endregion Get
//#region Post
usersRoutes.post('/login', async(ctx) => {
    const auth: IAuth = postAuth(ctx);
    const response: ILoginResponse = await login(auth.body, auth);
    if(!response.success) {
        ctx.status = 403;
        ctx.body = 'Access denied';
        ctx.message = response.message;
    }
    ctx.status = 200;
    ctx.body = response;
});
usersRoutes.post('/su', async (ctx) => {
    const auth: IAuth = postAuth(ctx);
    const response: ISetUserResponse = await setUser(auth.body, auth);
    if (!response.success) {
        ctx.status = response.status ?? 403;
        ctx.body = `auth: ${auth.success};\nbody: ${JSON.stringify(auth.body)};`;
        ctx.message = response.message;
        return;
    }
    ctx.status = 200;
    ctx.body = 'OK!';
});
//#endregion Post
export default usersRoutes;
