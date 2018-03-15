"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const koaRouter = require("koa-router");
const router = new koaRouter();
router.get('/user/:id', user_1.default.getUserInfo); // 定义url的参数是id
router.post('/register', user_1.default.registerUser);
router.post('/user', user_1.default.postUserAuth); // 定义url的参数是id
exports.default = router;
//# sourceMappingURL=auth.js.map