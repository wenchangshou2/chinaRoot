import Koa from 'koa';
import auto from './server/routes/auth.js';
import serve from 'koa-static'
import middleware from './server/middleware';

const cors = require('koa2-cors');

import historyApiFallback from 'koa2-history-api-fallback'
import routes from './server/routes/index.js';

var path = require('path');
let app = new Koa();
let port = process.env.PORT || 8080;
app.use(middleware());
// app.on('error', function (err, ctx) {
//   console.log('server error', err)
// })
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

app.use(routes())

// routes(app)//设置路由
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目
app.use(function* (ctx, next) {
  ctx.body = "Invalid URL!!!";
})
app.listen(8000);