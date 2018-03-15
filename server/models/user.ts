import {IUser} from './interfaces/user';
const mongoose = require('mongoose');
import { Document, Schema, model } from 'mongoose';
const crypto = require('crypto');

export interface IUserModel extends IUser,Document{
    makeSalt(): string,
    encryptPassword(): string
}
// const Schema = mongoose.Schema;
export var UserSchema: Schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    provider: {
        type: String,
    },
    hashed_password: {
        type: String,
    },
    salt: {
        type: String,
    },
    authToken: {
        type: String,
    },
    password: {
        type: String,
    },
    nickname: {
        type: String,
    }
});
const validatePresenceOf = (value: any) => value && value.length;
UserSchema.methods.makeSalt=function():string{
        return Math.round((new Date().valueOf() * Math.random())) + '';
}
UserSchema.methods.encryptPassword = function (password: string): string {
        if (!password) return '';
        try {
            return crypto
                .createHmac('shal', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
}
UserSchema.statics = {
    load: function (options: any, cb: any) {
        options.select = options.select || 'username password';
        return this.find(options.criteria)
    },
    getUserByName: function (name: string) {
        return this.findOne({ username: name })
        // .select(options.select)
    },
    registerUser: function (username: string, password: string) {

    }
}
module.exports = model("User", UserSchema);;