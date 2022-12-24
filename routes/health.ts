import Router from 'koa-router';
import usersRoutes from './users/users.routes';

// init
const healthRouter = new Router();

healthRouter.get('/', async(ctx) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

healthRouter.get('/health', async(ctx) => {
    ctx.status = 200;
    ctx.body = {
        nodeVersion: process.version,
        service: 'TypeScriptNode',
        memory: process.memoryUsage(),
        pid: process.pid,
        uptime: process.uptime(),
        enviroment: 'dev',
        appVersionPackage: '1.0.0',
    }
});

healthRouter.use(usersRoutes.routes());

export default healthRouter;