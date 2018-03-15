import * as Koa from 'koa';
import auto from './routes/auth';
import * as serve from 'koa-static'
import middleware from './middleware';

const cors = require('koa2-cors');

import * as historyApiFallback from 'koa2-history-api-fallback'
import routes from './routes/index';

var path = require('path');
let app = new Koa();
let port = process.env.PORT || 8080;
app.use(middleware());
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/chinaRoot').then((response:any) => {
    console.log('mongo connection created');
  })
  .catch((err:any) => {
    console.log('error connecting to Mongo');
    console.log(err);
  })

app.use(routes())

// routes(app)//设置路由
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目
app.use(function* (ctx, next) {
  ctx.body = "Invalid URL!!!";
})
app.listen(8000);