"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const serve = require("koa-static");
const middleware_1 = require("./middleware");
const cors = require('koa2-cors');
const historyApiFallback = require("koa2-history-api-fallback");
const index_1 = require("./routes/index");
var path = require('path');
let app = new Koa();
let port = process.env.PORT || 8080;
app.use(middleware_1.default());
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/chinaRoot').then((response) => {
    console.log('mongo connection created');
})
    .catch((err) => {
    console.log('error connecting to Mongo');
    console.log(err);
});
app.use(index_1.default());
// routes(app)//设置路由
app.use(historyApiFallback());
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目
app.use(function* (ctx, next) {
    ctx.body = "Invalid URL!!!";
});
app.listen(8000);
//# sourceMappingURL=app.js.map