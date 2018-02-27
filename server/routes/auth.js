import auth from '../controllers/user.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/register',auth.registerUser)
router.post('/user', auth.postUserAuth) // 定义url的参数是id

export default router
