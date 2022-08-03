import { postAuth } from '../../auth/postAuth';
import { IAuth } from 'interfaces/auth/IAuth';
import Router from 'koa-router';
import { setUser } from '../../controllers/user/user.controller';
var jwt = require('jsonwebtoken');
import 'dotenv/config';
import { ISetUserResponse } from 'interfaces/user/ISetUser';

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

});
usersRoutes.post('/su', async (ctx) => {
    const auth: IAuth = postAuth(ctx);
    const user: ISetUserResponse = await setUser(auth.body, auth);
    if (!user.success) {
        ctx.status = user.status ?? 403;
        ctx.body = `auth: ${auth.success};\nbody: ${JSON.stringify(auth.body)};`;
        ctx.message = user.message;
        return;
    }
    ctx.status = 200;
    ctx.body = 'OK!';
});
//#endregion Post
export default usersRoutes;
