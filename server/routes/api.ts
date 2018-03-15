import * as koaRouter from 'koa-router';
const router = new koaRouter();

router.get('/test/:id',async function(ctx){
    const id=ctx.params.id;
    console.log('id');
    ctx.body={
        success: true,
    }
})
export default router;