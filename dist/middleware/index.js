'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const compose = require("koa-compose");
const koaBodyparser = require("koa-bodyparser");
const checkAuth_1 = require("./checkAuth");
const jwt_1 = require("./jwt");
const json = require("koa-json");
const logger = require("koa-logger");
const log_1 = require("./log");
const cors = require('koa2-cors');
function middleware() {
    return compose([
        json(),
        logger(),
        koaBodyparser(),
        checkAuth_1.default(),
        jwt_1.default(),
        log_1.default(),
        cors({
            origin: function (ctx) {
                return '*';
            },
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        })
    ]);
}
exports.default = middleware;
//# sourceMappingURL=index.js.map