"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('koa-router');
const compose = require("koa-compose");
const jwt = require("koa-jwt");
const auth_1 = require("./auth");
const api_1 = require("./api");
var router = new Router();
router.use('/auth', auth_1.default.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
// router.use('/api', jwt({secret: 'seatry'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
router.use('/api', jwt({
    secret: 'seatry'
}), api_1.default.routes()); // 所有走/api/打头的请求都需要经过jwt验证。
function routes() {
    return compose([
        router.routes(),
        router.allowedMethods(),
    ]);
}
exports.default = routes;
//# sourceMappingURL=index.js.map