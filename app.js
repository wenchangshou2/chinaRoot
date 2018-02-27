import auth from './server/routes/auth.js';
import api from './server/routes/api.js';
import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';
import auto from './server/routes/auth.js';
import jwt from 'koa-jwt'
import serve from 'koa-static'

import historyApiFallback from 'koa2-history-api-fallback'
import koaBodyparser from 'koa-bodyparser';
var Router = require('koa-router');

var path = require('path');
let app = new Koa();
var router = new Router();
let port = process.env.PORT || 8080;
app.use(koaBodyparser());
app.use(json());
app.use(logger());
app.use(async function (ctx, next) {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log('%s %s -%s', ctx.method, ctx.url, ms);
})
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err;
    }
  }
})
app.on('error', function (err, ctx) {
  console.log('server error', err)
})
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
});
//mongo
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/chinaRoot').then((response) => {
    console.log('mongo connection created');
  })
  .catch((err) => {
    console.log('error connecting to Mongo');
    console.log(err);
  })
router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
// router.use('/api', jwt({secret: 'seatry'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
router.use('/api', jwt({
  secret: 'seatry'
}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目
app.use(function* (ctx, next) {
  ctx.body = "Invalid URL!!!";
})
app.listen(8000);