import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import health from './routes/health';
import { connect } from './db/database';

// init
const app = new koa();

// middlewares
app.use(cors());
app.use(loggerKoa());
app.use(bodyparser());
app.use(mount('/health', auth({
    name: 'user',
    pass: 'password',
})));

// routes
app.use(health.routes());

// db
connect();

// export server
export default app;