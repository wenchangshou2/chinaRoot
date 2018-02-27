var Router = require('koa-router');
import jwt from 'koa-jwt'
import auth from './auth';
import api from './api';
export default function routes(app) {
    var router = new Router();
    router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
    // router.use('/api', jwt({secret: 'seatry'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
    router.use('/api', jwt({
        secret: 'seatry'
    }), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
    app.use(router.routes());
    app.use(router.allowedMethods);
}