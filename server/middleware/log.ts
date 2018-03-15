'use strict';
export default function log() {
    return async function (ctx, next) {

        let start = new Date();
        await next();
        let ms = new Date() - start;
    }
}