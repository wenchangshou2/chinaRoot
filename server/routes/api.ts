import * as koaRouter from 'koa-router';
const router = new koaRouter();

router.get('/test/:id',async function(ctx:any){
    const id=ctx.params.id;
    ctx.body={
        success: true,
    }
})
export default router;