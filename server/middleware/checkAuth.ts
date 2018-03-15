'use strict';

export default function checkauth() {
    return async function (ctx, next) {
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
    }
}