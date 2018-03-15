"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koaRouter = require("koa-router");
const router = new koaRouter();
router.get('/test/:id', async function (ctx) {
    const id = ctx.params.id;
    console.log('id');
    ctx.body = {
        success: true,
    };
});
exports.default = router;
//# sourceMappingURL=api.js.map