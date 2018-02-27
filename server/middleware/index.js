'use strict';
import compose from 'koa-compose';
import koaBodyparser from 'koa-bodyparser';

import checkauth from './checkAuth';
import checkJwt from './jwt';
import json from 'koa-json';
import logger from 'koa-logger';
import log from './log'
const cors = require('koa2-cors');
export default function middleware() {
    return compose(
        [
            json(),
            logger(),
            koaBodyparser(),
            checkauth(),
            checkJwt(),
            log(),
            cors({
                origin: function (ctx) { //简单允许所有
                    return '*';
                },
                exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
                maxAge: 5,
                credentials: true,
                allowMethods: ['GET', 'POST', 'DELETE'],
                allowHeaders: ['Content-Type', 'Authorization', 'Accept'],

            })
        ]
    )
}