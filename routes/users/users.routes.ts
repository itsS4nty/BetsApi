import { postAuth } from '../../auth/postAuth';
import { IAuth } from 'interfaces/auth/IAuth';
import Router from 'koa-router';
import { setUser } from '../../controllers/user/user.controller';
import { IResponse } from 'interfaces/response/IResponse';

// init
const usersRoutes = new Router();
//#region Get
usersRoutes.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = 'Users route';
});
//#endregion Get
//#region Post
usersRoutes.post('/su', async (ctx) => {
    const auth: IAuth = postAuth(ctx);
    const user: IResponse = await setUser(auth.body, auth);
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
