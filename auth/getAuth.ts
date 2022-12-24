import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { IAuth } from 'interfaces/auth/IAuth';

export const getAuth = (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): IAuth => {
    const auth : IAuth = {
        success: false,
    };
    if (!ctx || !ctx.request || !ctx.request.header) {
        ctx.status = 403;
        ctx.body = `
            Error.
            ctx: ${ctx ? 'OK' : 'ERR'};
            ctx.request: ${ctx.request ? 'OK' : 'ERR'};
            ctx.request.header: ${JSON.stringify(ctx.request.header)};
        `;
        return auth;
    }
    
    auth.success = true;
    auth.query = ctx.request.query;
    auth.header = ctx.request.header;

    return auth;
}