import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { IAuth } from 'interfaces/auth/IAuth';

export const postAuth = (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): IAuth => {
    const auth : IAuth = {
        success: false,
    };
    if (!ctx || !ctx.request || !ctx.request.body || !Object.keys(ctx.request.body).length) {
        ctx.status = 403;
        ctx.body = `
            Error.
            ctx: ${ctx ? 'OK' : 'ERR'};
            ctx.request: ${ctx.request ? 'OK' : 'ERR'};
            ctx.request.body: ${JSON.stringify(ctx.request.body)};
        `;
        return auth;
    }
    auth.success = true;
    auth.body = ctx.request.body;

    return auth;
}