import * as user from '../models/user'
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
const {
    wrap: async
} = require('co');
const getUserInfo = async function (ctx, next) {
    const id = ctx.params.id;
    let options = {
        criteria: {
            username: id
        }
    }
    let result = await user.getUserByName(id)
    if (result == undefined) {
        ctx.body = {
            success: false,
            info: '用户不存在'
        }
    } else {
        ctx.body = result;
    }
    // console.log('result',result);
}
const postUserAuth = async function (ctx) {
    const data = ctx.request.body;
    let username = data.username ? data.username : '';
    let password = data.password ? data.password : '';
    // ctx.body=data;
    if (username === '') {
        ctx.body = {
            success: false,
            info: '用户名不能为空'
        }
        return;
    }
    if (password === '') {
        ctx.body = {
            success: false,
            info: '密码不能为空'
        }
        return;
    }
    const userinfo = await user.getUserByName(username);
    if (userinfo != null) {
        console.log(1, userinfo['password'], password);
        if (!bcrypt.compareSync(password, bcrypt.hashSync(userinfo['password']))) {
            ctx.body = {
                success: false,
                info: '密码错误!',
            }
        } else {
            const userToken = {
                name: userinfo.username,
                id: userinfo.id
            }
            console.log(userToken);
            const secret = 'seatry';
            const token = jwt.sign(userToken, secret, {
                expiresIn: 3600
            });
            ctx.body = {
                success: true,
                token: token
            }
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户不存在'
        }
    }
}
const registerUser = async function (ctx) {
    let {
        username,
        password
    } = ctx.request.body;
    if (username === undefined || username === '') {
        ctx.body = {
            success: false,
            info: '用户名不能为空'
        };
        return;
    }
    if (password === undefined || password === '') {
        ctx.body = {
            success: false,
            info: '密码不能为空'
        };
        return;
    }
    const userinfo = await user.getUserByName(username);
    console.log('userinfo',userinfo);
    if (userinfo != null) {
        ctx.body = {
            success: false,
            info: '用户已存在'
        }
        return;
    }
    let newUser = new user({
        username: username,
        password: password,
    })
    newUser.save();
    ctx.body={
        success:true
    }

}
export default {
    getUserInfo,
    postUserAuth,
    registerUser
}