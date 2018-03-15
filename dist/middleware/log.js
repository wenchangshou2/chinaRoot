'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function log() {
    return async function (ctx, next) {
        let start = new Date();
        await next();
        let ms = new Date() - start;
    };
}
exports.default = log;
//# sourceMappingURL=log.js.map