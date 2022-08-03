import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import health from './routes/health';
import { connect } from './db/database';
import jwt from 'koa-jwt';
import 'dotenv/config';

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

// jwt
// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: `${process.env.JWT_TOKEN}` }).unless({ path: [/^\/users/] }));

// routes
app.use(health.routes());

// db
connect();

// export server
export default app;